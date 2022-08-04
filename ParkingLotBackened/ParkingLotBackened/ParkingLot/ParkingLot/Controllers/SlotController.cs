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

        [HttpGet]
        [Route("CreateSlot")]
        public async Task<IActionResult> CreateSlot()
        {
            var result = await _slotBLL.CreateSlot();
            if(result)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("TotalSlots")]
        public async Task<IActionResult> TotalSlots()
        {
            var result = await _slotBLL.TotalCountSlots();
            return Ok(new { totalSlots = result});
        }

        [HttpGet]
        [Route("CheckSlot/{slotNumber}")]
        public async Task<IActionResult> CheckSlot(int slotNumber)
        {
            var result =  await _slotBLL.CheckSlot(slotNumber);
            return Ok(result);
        }

        [HttpDelete]
        [Route("DeleteSlot/{slotNumber}")]
        public async Task<IActionResult> DeleteSlot(int slotNumber)
        {
            try
            {
                await _slotBLL.DeleteSlot(slotNumber);
                return Ok(true);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
