using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ParkingLot.Shared.Entity;
using ParkingLot.Shared.Interface.DAL;
using ParkingLot.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLotDLL.Repository
{
    public class AuthenticationRepo : IAuthenticationRepo
    {
        public readonly IMongoCollection<SignUp> _authCollection;
        public readonly IMongoCollection<BookSlot> _bookSlotCollection;
        public AuthenticationRepo(IOptions<ParkingLotDatabaseSettings> parkingLotDbSetting)
        {
            var mongoClient = new MongoClient(
            parkingLotDbSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                parkingLotDbSetting.Value.DatabaseName);
            _authCollection = mongoDatabase.GetCollection<SignUp>(
                parkingLotDbSetting.Value.AuthenticationCollectionName);
            _bookSlotCollection = mongoDatabase.GetCollection<BookSlot>(
                parkingLotDbSetting.Value.BookSlotCollectionName);
        }

        public async Task<RegisterMessage> Register(SignUp signUp)
        {
            RegisterMessage result = new RegisterMessage();
            try
            {
                var isEmailPresent = await _authCollection.Find(x => x.Email == signUp.Email).CountDocumentsAsync();
                if (isEmailPresent == (long)0)
                {
                    signUp.Password = this.EncodeTo64(signUp.Password);
                    await _authCollection.InsertOneAsync(signUp);
                    result.IsSuccess = true;
                    result.Message = "SignedUp successfully!";
                    return result;
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "Email is taken";
                    return result;
                }
            }catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<LoginMessage> Login(string email, string password)
        {
            LoginMessage loginMessage = new LoginMessage();
            try
            {
                password = this.EncodeTo64(password);
                var result = await _authCollection.Find(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
                if (result == null)
                {
                    loginMessage.IsAuth = false;
                    loginMessage.IsAdmin = false;
                    loginMessage.UserSlot = null;
                }
                else
                {
                    loginMessage.IsAuth = true;
                    loginMessage.IsAdmin = (result.IsAdmin) ? true : false;
                    if (result.IsAdmin == true)
                    {
                        loginMessage.UserSlot = null;
                    }
                    else
                    {
                        var userSlot = await _bookSlotCollection.Find(x => x.Email == email && x.Status == true).FirstOrDefaultAsync();
                        loginMessage.UserSlot = (BookSlot)userSlot;

                    }
                }
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return loginMessage;
        }
        private string EncodeTo64(string toEncode)
        {
            byte[] toEncodeAsBytes
                  = System.Text.ASCIIEncoding.ASCII.GetBytes(toEncode);
            string returnValue
                  = System.Convert.ToBase64String(toEncodeAsBytes);
            return returnValue;
        }
    }
}
