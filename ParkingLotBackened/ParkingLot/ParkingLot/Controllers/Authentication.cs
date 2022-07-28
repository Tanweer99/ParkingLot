using Microsoft.AspNetCore.Mvc;
using ParkingLot.Shared.DTO;
using ParkingLot.Shared.Interface.BLL;
using System;
using System.Threading.Tasks;

namespace ParkingLot.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Authentication : Controller
    {
        private readonly IAuthenticationBLL _authenticationBLL;
        public Authentication(IAuthenticationBLL authenticationBLL)
        {
            _authenticationBLL = authenticationBLL; 
        }

        [HttpPost]
        public async Task<IActionResult> Register(SignUpDTO signUpDTO)
        {
            RegisterMessageDTO result = new RegisterMessageDTO();
            result = await _authenticationBLL.Register(signUpDTO);   
            if (result.IsSuccess == true)
            {
                return Ok(true);
            }
            else if(result.IsSuccess == false && result.Message == "Email is taken")
            {
                return Ok(false);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }

        [HttpGet]
        [Route("Login/{email}/{password}")]
        public async Task<IActionResult> Login(string email, string password)
        {
            var result = await _authenticationBLL.Login(email, password);
            if(result.IsAdmin == false && result.IsAuth == false && result.UserSlot == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
    }
}
