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
    public class SlotRepo : ISlotRepo
    {
        private readonly IMongoCollection<Slot> _slotCollection;
        public SlotRepo(IOptions<ParkingLotDatabaseSettings> parkingLotDbSetting)
        {
            var mongoClient = new MongoClient(
            parkingLotDbSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                parkingLotDbSetting.Value.DatabaseName);
            _slotCollection = mongoDatabase.GetCollection<Slot>(
                parkingLotDbSetting.Value.SlotCollectionName);
            
        }

        public async Task<long> CountAvailableSlot()
        {
            var availableSlots = await _slotCollection.Find(x => x.IsAvailable == true).CountDocumentsAsync(); 
            return availableSlots;
        }

        public async Task<bool> CreateSlot()
        {
            try
            {
                var totalslots = await TotalCountSlots();
                Slot slot = new Slot();
                slot.IsAvailable = true;
                slot.SlotNumber = (int)totalslots + 1;
                await _slotCollection.InsertOneAsync(slot);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return false;
        }

        public async Task<int> UpdateSlot()
        {
            try
            {
                Slot availableSlot = await _slotCollection.Find(x => x.IsAvailable == true).FirstOrDefaultAsync();
                Slot updatedSlot = new Slot
                {
                    Id = availableSlot.Id,
                    SlotNumber = availableSlot.SlotNumber,
                    IsAvailable = false
                };
                await _slotCollection.ReplaceOneAsync(x => x.Id==availableSlot.Id , updatedSlot);
                return updatedSlot.SlotNumber;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return -1;
        }

        public async Task<bool> UpdateDeleteSlot(int slotNumber)
        {
            try
            {
                var toBedeletedSlot = await _slotCollection.Find(x => x.SlotNumber == slotNumber).FirstOrDefaultAsync();
                if(toBedeletedSlot != null)
                {
                    toBedeletedSlot.IsAvailable = true;
                    await _slotCollection.ReplaceOneAsync(x => x.SlotNumber==slotNumber, toBedeletedSlot);
                    return true;
                }
                else
                {
                    return false;
                }
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<long> TotalCountSlots()
        {
            var totalSlots =  await _slotCollection.Find(x => x.Id != null).CountDocumentsAsync();
            return totalSlots;
        }

        public async Task<bool> CheckSlot(int slotNumber)
        {
            var slotNumberDetails = await _slotCollection.Find(x => x.SlotNumber == slotNumber && x.IsAvailable == true).FirstOrDefaultAsync();
            if(slotNumberDetails != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task DeleteSlot(int slotNumber)
        {
            await _slotCollection.DeleteOneAsync(x => x.SlotNumber == slotNumber);
        }


    }
}
