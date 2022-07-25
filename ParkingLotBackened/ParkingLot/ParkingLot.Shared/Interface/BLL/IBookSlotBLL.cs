using ParkingLot.Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Interface.BLL
{
    public interface IBookSlotBLL
    {
        Task<List<BookSlotDTO>> GetSlots();
        Task<bool> AddSlot(BookSlotDTO bookSlotDTO);
        Task<BookSlotDTO> GetUserSlot(int slotNumber);
        Task<bool> UpdateUserBookedSlot(string id, BookSlotDTO bookSlotDTO);
        Task<bool> DeleteSlot(string id);
        Task<BookSlotDTO> Authentication(string name, string vehicleNumber);
    }
}
