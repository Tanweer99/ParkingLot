using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.DTO
{
    public class SlotDTO
    {
        public string Id { get; set; }
        public int SlotNumber { get; set; }
        public bool IsAvailable { get; set; }
    }
}
