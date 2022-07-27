using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ParkingLot.Shared.DTO;
using ParkingLot.Shared.Interface.BLL;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ParkingLot.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookSlotController : Controller
    {
        private readonly IBookSlotBLL _bookSlotBLL;
        private readonly ISlotBLL _slotBLL;
        public BookSlotController(IBookSlotBLL bookSlotBLL, ISlotBLL slotBLL)
        {
            _bookSlotBLL = bookSlotBLL;
            _slotBLL = slotBLL; 
        }

        [HttpGet]
        public async Task<List<BookSlotDTO>> GetSlots()
        {
            return await _bookSlotBLL.GetSlots();
        }

        [HttpPost]
        [Route("AddSlot/{email}")]
        public async Task<IActionResult> AddSlot([FromBody] BookSlotDTO bookSlotDTO, string email)
        {
            var slotNumber = await _slotBLL.UpdateSlot();
            if(slotNumber != -1)
            {
                bookSlotDTO.Email = email;
                bookSlotDTO.SlotNumber = slotNumber;
                bookSlotDTO.Status = true;
                var result = await _bookSlotBLL.AddSlot(bookSlotDTO);
                return Ok(new { SlotNumber = slotNumber});
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetUserSlot/{slotNumber}")]
        public async Task<IActionResult> GetUserSlot(int slotNumber)
        {
            BookSlotDTO bookSlotDTO =  await _bookSlotBLL.GetUserSlot(slotNumber);
            if(bookSlotDTO != null)
            {
                return Ok(new { UserBookedDetails = bookSlotDTO });
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut]
        [Route("UpdateUserBookedSlot/{id}")]
        public async Task<IActionResult> UpdateUserBookedSlot([FromBody] BookSlotDTO bookSlotDTO, string id)
        {
            bookSlotDTO.Id = id;
            var result = await _bookSlotBLL.UpdateUserBookedSlot(id, bookSlotDTO);
            if (result)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("DeleteSlot/{id}")]
        public async Task<IActionResult> DeleteSlot(string id)
        {
            var result = await _bookSlotBLL.DeleteSlot(id);
            if (result)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("Authentication/{name}/{vehicleNumber}")]
        public async Task<IActionResult> Authentication(string name, string vehicleNumber)
        {
            var userSlot = await _bookSlotBLL.Authentication(name, vehicleNumber);
            return Ok(new { UserSlot = userSlot });
        }
    }
}
