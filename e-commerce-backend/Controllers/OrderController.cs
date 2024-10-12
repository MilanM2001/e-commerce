using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models.DTOs.OrderDto;
using e_commerce_backend.Services.OrderService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("myOrders")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> GetMyOrders()
        {
            try
            {
                List<OrderResponseDto> orders = await _orderService.GetMyOrders();

                return Ok(orders);
            }
            catch (SecurityTokenException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder(OrderRequestDto orderRequestDto)
        {
            try
            {
                await _orderService.AddOrder(orderRequestDto);

                return Ok("Order Added");
            }
            catch (SecurityTokenException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
