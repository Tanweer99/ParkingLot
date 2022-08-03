using ParkingLot.Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.Interface.BLL
{
    public interface IAuthenticationBLL
    {
        Task<RegisterMessageDTO> Register(SignUpDTO signUpDTO);
        Task<LoginMessageDTO> Login(string email, string password);
        Task<bool> OldPasswordMatch(string oldPassword, string email);
        Task<bool> UpdateNewPassword(string email, string newpassword);
    }
}
