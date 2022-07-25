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
        Task<bool> CreateSlot(Slot slot);
        Task<int> UpdateSlot();
        Task<bool> UpdateDeleteSlot(int slotNumber);
    }
}
