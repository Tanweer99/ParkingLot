using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ParkingLot.Shared.DTO;
using ParkingLot.Shared.Interface.BLL;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Authentication : Controller
    {
        private readonly IAuthenticationBLL _authenticationBLL;
        private readonly IConfiguration _configuration;
        public Authentication(IAuthenticationBLL authenticationBLL, IConfiguration configuration)
        {
            _authenticationBLL = authenticationBLL;
            _configuration = configuration;
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
                return Ok(new { result = result});
            }

            var role = result.IsAdmin == true ? "Admin" : "User" ;

            var key = Encoding.UTF8.GetBytes(_configuration["ApplicationSettings:JWT_Secret"].ToString());

            var tokenhandler = new JwtSecurityTokenHandler();
     
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {

                          new Claim(ClaimTypes.Role, role),
                          new Claim(ClaimTypes.Email, email)
            }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var Genratedtoken = tokenhandler.CreateToken(tokenDescriptor);
            var token = tokenhandler.WriteToken(Genratedtoken);

            return Ok(new { 
                result = result,
                token = token
            });
        }

        [HttpGet]
        [Route("OldPasswordMatch/{email}/{oldpassword}")]
        public async Task<IActionResult> OldPasswordMatch(string email, string oldpassword)
        {
            var result =  await _authenticationBLL.OldPasswordMatch(oldpassword, email);
            return Ok(result);
        }

        [HttpPut]
        [Route("UpdateNewPassword/{email}")]
        public async Task<IActionResult> UpdateNewPassword( UpdatePasswordDTO updatePasswordDTO, string email)
        {
            var result = await _authenticationBLL.UpdateNewPassword(email, updatePasswordDTO.NewPassword);
            return Ok(result);
        }
    }
}
