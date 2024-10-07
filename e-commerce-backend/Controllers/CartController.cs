using e_commerce_backend.Exceptions;
using e_commerce_backend.Models.DTOs.CartDto;
using e_commerce_backend.Services.CartService;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetCartByUserEmail(string email)
        {
            try
            {
                var cart = await _cartService.GetCartByUserEmail(email);
                if (cart == null) return NotFound("Cart not found");
                return Ok(cart);
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddCart([FromBody] CartRequestDto cartRequestDto)
        {
            try
            {
                await _cartService.AddCart(cartRequestDto);
                return Ok("Cart created successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCart([FromBody] CartUpdateDto cartUpdateDto)
        {
            try
            {
                await _cartService.UpdateCart(cartUpdateDto);
                return Ok("Cart updated successfully");
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } 
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  
            }
        }

        [HttpDelete("{cartId}")]
        public async Task<IActionResult> DeleteCart(int cartId)
        {
            try
            {
                await _cartService.DeleteCart(cartId);
                return Ok("Cart deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
