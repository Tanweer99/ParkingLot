using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Entity
{
    public class SignUp
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("fullName")]
        public string FullName { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("bank")]
        public string Bank { get; set; }

        [BsonElement("accountNumber")]
        public string AccountNUmber { get; set; }

        [BsonElement("password")]

        public string Password { get; set; }

        [BsonElement("isAdmin")]
        public bool IsAdmin { get; set; }
    }
}
