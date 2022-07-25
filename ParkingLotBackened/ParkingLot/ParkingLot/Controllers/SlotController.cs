using Microsoft.AspNetCore.Mvc;
using ParkingLot.Shared.DTO;
using ParkingLot.Shared.Interface.BLL;
using System.Threading.Tasks;

namespace ParkingLot.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlotController : Controller
    {
        private readonly ISlotBLL _slotBLL;
        public SlotController(ISlotBLL slotBLL)
        {
            _slotBLL = slotBLL;
        }

        [HttpGet]
        public async Task<IActionResult> CountAvailableSlot()
        {
            var countSlot = await _slotBLL.CountAvailableSlot();
            if (countSlot >= 0)
            {
                return Ok(new { count = countSlot });
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateSlot(SlotDTO slotDto)
        {
            var result = await _slotBLL.CreateSlot(slotDto);
            if(result)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        
    }
}
