using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.DTO
{
    public class LoginMessageDTO
    {
        public bool IsAuth { get; set; }
        public bool IsAdmin { get; set; }
        public BookSlotDTO UserSlot { get; set; }
    }
}
