using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ParkingLot.Shared.Entity;
using ParkingLot.Shared.Interface.DAL;
using ParkingLot.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLotDLL.Repository
{
    public class BookSlotRepo : IBookSlotRepo
    {
        private readonly IMongoCollection<BookSlot> _bookSlotCollection;
        private readonly ISlotRepo _slotRepo;
        public BookSlotRepo(IOptions<ParkingLotDatabaseSettings> parkingLotDbSetting, ISlotRepo slotRepo)
        {
            var mongoClient = new MongoClient(
            parkingLotDbSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                parkingLotDbSetting.Value.DatabaseName);
            _bookSlotCollection = mongoDatabase.GetCollection<BookSlot>(
                parkingLotDbSetting.Value.BookSlotCollectionName);

            _slotRepo = slotRepo;
        }

        public async Task<List<BookSlot>> GetSlots()
        {
            List<BookSlot> book = new List<BookSlot>();
            try
            {
                book = await _bookSlotCollection.Find(x => x.Name != null).ToListAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return book;

        }

        public async Task<bool> AddSlot(BookSlot bookSlot)
        {
            try
            {
                await _bookSlotCollection.InsertOneAsync(bookSlot);
                return true;
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return false;
        }

        public async Task<BookSlot> GetUserSlot(int slotNumber)
        {
            BookSlot bookSlot = await _bookSlotCollection.Find(x => x.SlotNumber == slotNumber).FirstOrDefaultAsync();
            if(bookSlot == null)
            {
                return null;
            }
            return bookSlot;
        }

        public async Task<bool> UpdateUserBookedSlot(string id, BookSlot updatetedBookSlot)
        {
            try
            {
                await _bookSlotCollection.ReplaceOneAsync(x => x.Id == id, updatetedBookSlot);
                return true;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

        }

        public async Task<bool> DeleteSlot(string id)
        {
            try
            {
                var toBeDeletedSlot = await _bookSlotCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
                var slotNumber = toBeDeletedSlot.SlotNumber;
                toBeDeletedSlot.SlotNumber = 0;
                toBeDeletedSlot.Status = false;
                await _bookSlotCollection.ReplaceOneAsync(x => x.Id == id, toBeDeletedSlot);
                var result = await _slotRepo.UpdateDeleteSlot(slotNumber);
                if (result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<BookSlot> Authentication(string name, string vehicleNumber)
        {
            try 
            { 
                var userSlot = await _bookSlotCollection.Find(x => x.VehicleNumber == vehicleNumber && x.Name == name).FirstOrDefaultAsync();
                if(userSlot != null)
                {
                    return userSlot;
                }
                else
                {
                    return null;
                }
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
            

        }
    }
}
