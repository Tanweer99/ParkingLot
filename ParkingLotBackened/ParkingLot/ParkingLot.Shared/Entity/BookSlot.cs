using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Entity
{
    public class BookSlot
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("vehicleNumber")]
        public string VehicleNumber { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("slotNumber")]
        public int SlotNumber { get; set; }

        [BsonElement("entryTime")]
        public string EntryTime { get; set; }

        [BsonElement("exitTime")]
        public string ExitTime { get; set; }

    }
}
