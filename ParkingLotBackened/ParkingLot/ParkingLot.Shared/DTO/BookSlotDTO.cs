using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.DTO
{
    public class BookSlotDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string VehicleNumber { get; set; }
        public int SlotNumber { get; set; }
        public string EntryTime { get; set; }
        public string ExitTime { get; set; }
    }
}
