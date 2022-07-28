using AutoMapper;
using ParkingLot.Shared.DTO;
using ParkingLot.Shared.Entity;
using ParkingLot.Shared.Interface.BLL;
using ParkingLot.Shared.Interface.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLotBLL
{
    public class AuthenticationBLL : IAuthenticationBLL
    {
        private readonly IAuthenticationRepo _authenticaionRepo;
        private readonly IMapper _mapper;
        public AuthenticationBLL(IAuthenticationRepo authenticaionRepo, IMapper mapper)
        {
            _authenticaionRepo = authenticaionRepo;
            _mapper = mapper;
        }

        public async Task<RegisterMessageDTO> Register(SignUpDTO signUpDTO)
        {
            var signUp = _mapper.Map<SignUp>(signUpDTO);
            var result =  await _authenticaionRepo.Register(signUp);
            return _mapper.Map<RegisterMessageDTO>(result);
        }

        public async Task<LoginMessageDTO> Login(string email, string password)
        {
            var login = await _authenticaionRepo.Login(email, password);
            return _mapper.Map<LoginMessageDTO>(login);
        }
    }
}
