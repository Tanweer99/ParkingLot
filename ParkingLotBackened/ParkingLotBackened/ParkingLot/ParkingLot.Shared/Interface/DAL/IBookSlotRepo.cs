using ParkingLot.Shared.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Interface.DAL
{
    public interface IBookSlotRepo
    {
        Task<List<BookSlot>> GetSlots();
        Task<bool> AddSlot(BookSlot bookSlot);
        Task<BookSlot> GetUserSlot(int slotNumber);
        Task<bool> UpdateUserBookedSlot(string id, BookSlot updatetedBookSlot, int previousSlotNumber);
        Task<bool> DeleteSlot(string id);
        Task<BookSlot> Authentication(string name, string vehicleNumber);
        Task<List<BookSlot>> BookedSlotsList();
    }
}
