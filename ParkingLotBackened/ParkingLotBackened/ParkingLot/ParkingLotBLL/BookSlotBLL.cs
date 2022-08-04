using AutoMapper;
using ParkingLot.Shared.DTO;
using ParkingLot.Shared.Entity;
using ParkingLot.Shared.Interface.BLL;
using ParkingLot.Shared.Interface.DAL;
using ParkingLotDLL.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ParkingLotBLL
{
    public class BookSlotBLL : IBookSlotBLL
    {
        private readonly IBookSlotRepo _bookSlotRepo;
        private readonly IMapper _mapper;
        public BookSlotBLL(IBookSlotRepo bookSlotRepo, IMapper mapper)
        {
            _bookSlotRepo = bookSlotRepo;
            _mapper = mapper;
        }

        public async Task<List<BookSlotDTO>> GetSlots()
        {
            var listBookSlot = await _bookSlotRepo.GetSlots();
            return _mapper.Map<List<BookSlotDTO>>(listBookSlot);
        }

        public async Task<bool> AddSlot(BookSlotDTO bookSlotDTO)
        {
            var bookSlot = _mapper.Map<BookSlot>(bookSlotDTO);
            return await _bookSlotRepo.AddSlot(bookSlot);
        }

        public async Task<BookSlotDTO> GetUserSlot(int slotNumber)
        {
            BookSlot bookSlot = await _bookSlotRepo.GetUserSlot(slotNumber);
            return _mapper.Map<BookSlotDTO>(bookSlot);
        }

        public async Task<bool> UpdateUserBookedSlot(string id, BookSlotDTO bookSlotDTO, int previousSlotNumber)
        {
            BookSlot bookSlot = _mapper.Map<BookSlot>(bookSlotDTO);
            return await _bookSlotRepo.UpdateUserBookedSlot(id, bookSlot, previousSlotNumber);
        }

        public async Task<bool> DeleteSlot(string id)
        {
            return await _bookSlotRepo.DeleteSlot(id);
        }

        public async Task<BookSlotDTO> Authentication(string name, string vehicleNumber)
        {
            var userSlot = await _bookSlotRepo.Authentication(name, vehicleNumber); 
            return _mapper.Map<BookSlotDTO>(userSlot);
        }
        public async Task<List<BookSlotDTO>> BookedSlotsList()
        {
            List<BookSlot> bookslotlist = await _bookSlotRepo.BookedSlotsList();
            return  _mapper.Map<List<BookSlotDTO>>(bookslotlist);
        }
    }
}
