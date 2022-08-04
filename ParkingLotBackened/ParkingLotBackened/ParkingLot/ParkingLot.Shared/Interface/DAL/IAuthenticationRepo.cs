using ParkingLot.Shared.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Interface.DAL
{
    public interface IAuthenticationRepo
    {
        Task<RegisterMessage> Register(SignUp signUp);
        Task<LoginMessage> Login(string email, string password);
        Task<bool> OldPasswordMatch(string oldPassword, string email);
        Task<bool> UpdateNewPassword(string email, string newpassword);
    }
}
