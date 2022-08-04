using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Model
{
    public class ParkingLotDatabaseSettings : IParkingLotDatabaseSettings
    {
        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

        public string BookSlotCollectionName { get; set; }
        public string SlotCollectionName { get; set; }
        public string AuthenticationCollectionName { get; set; }
    }
}
