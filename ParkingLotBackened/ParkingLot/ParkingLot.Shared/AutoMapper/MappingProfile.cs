using AutoMapper;
using ParkingLot.Shared.DTO;
using ParkingLot.Shared.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot.Shared.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookSlot, BookSlotDTO>().ReverseMap();
            CreateMap<Slot, SlotDTO>().ReverseMap();
            CreateMap<SignUp, SignUpDTO>().ReverseMap();
            CreateMap<RegisterMessage, RegisterMessageDTO>().ReverseMap();
            CreateMap<LoginMessage, LoginMessageDTO>().ReverseMap();
        }
    }
}
