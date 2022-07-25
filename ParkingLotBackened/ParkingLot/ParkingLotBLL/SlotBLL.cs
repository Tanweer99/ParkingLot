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
    public class SlotBLL : ISlotBLL
    {
        private readonly ISlotRepo _slotRepo;
        private readonly IMapper _mapper;
        public SlotBLL(ISlotRepo slotRepo, IMapper mapper)
        {
            _slotRepo = slotRepo;
            _mapper = mapper;
        }

        public async Task<long> CountAvailableSlot()
        {
            return await _slotRepo.CountAvailableSlot();
        }

        public async Task<bool> CreateSlot(SlotDTO slotDto)
        {
            var slot = _mapper.Map<Slot>(slotDto);
            return await _slotRepo.CreateSlot(slot);
        }

        public async Task<int> UpdateSlot()
        {
            return await _slotRepo.UpdateSlot();
        }
    }
}
