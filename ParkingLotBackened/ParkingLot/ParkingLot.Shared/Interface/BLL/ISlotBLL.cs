using ParkingLot.Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Interface.BLL
{
    public interface ISlotBLL
    {
        Task<long> CountAvailableSlot();
        Task<bool> CreateSlot();
        Task<int> UpdateSlot();
        Task<long> TotalCountSlots();
        Task<bool> CheckSlot(int slotNumber);
        Task DeleteSlot(int slotNumber);
    }
}
