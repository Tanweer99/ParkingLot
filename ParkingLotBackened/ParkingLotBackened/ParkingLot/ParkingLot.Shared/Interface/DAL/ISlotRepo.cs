using ParkingLot.Shared.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Interface.DAL
{
    public interface ISlotRepo
    {
        Task<long> CountAvailableSlot();
        Task<bool> CreateSlot();
        Task<int> UpdateSlot();
        Task<bool> UpdateDeleteSlot(int slotNumber);
        Task<long> TotalCountSlots();
        Task<bool> CheckSlot(int slotNumber);
        Task DeleteSlot(int slotNumber);
    }
}
