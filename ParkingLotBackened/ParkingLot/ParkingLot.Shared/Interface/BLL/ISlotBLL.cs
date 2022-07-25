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
        Task<bool> CreateSlot(SlotDTO slotDto);
        Task<int> UpdateSlot();
    }
}
