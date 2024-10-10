using e_commerce_backend.Exceptions;
using e_commerce_backend.Models.DTOs.CartDto;
using e_commerce_backend.Services.CartService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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

        [HttpGet("getMyCart")]
        [Authorize(Roles ="User, Admin")]
        public async Task<IActionResult> GetMyCart()
        {
            try
            {
                CartResponseDto cart = await _cartService.GetMyCart();

                return Ok(cart);
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
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

        
        [HttpPut("updateCart")]
        [Authorize(Roles = "User, Admin")]
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
