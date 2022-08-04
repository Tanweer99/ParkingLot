using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Entity
{
    public class LoginMessage
    {
        public bool IsAuth { get; set; }
        public bool IsAdmin { get; set; }
        public BookSlot UserSlot { get; set; }
    }
}
