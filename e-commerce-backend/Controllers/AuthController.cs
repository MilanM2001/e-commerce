using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Services.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            await _authService.RegisterUserAsync(registerDto);
            return Ok("User Registered");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            return Ok(result);
        }

        // This method only allows access to users with the role "User"
        [HttpGet("test")]
        [Authorize(Roles = "Admin")]
        public IActionResult Test()
        {
            return Ok("Hello, User!");
        }

        // Refresh token endpoint
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                // Call the AuthService to validate the refresh token and generate a new access token
                var newAccessToken = await _authService.RefreshAccessTokenAsync(refreshTokenDto.RefreshToken);
                return Ok(new { AccessToken = newAccessToken });
            }
            catch (SecurityTokenException ex)
            {
                // Handle invalid refresh token
                return Unauthorized(new { message = "Invalid refresh token", details = ex.Message });
            } 
            catch (Exception ex)
            {
                return BadRequest(new { message = "something went wrong", details = ex.Message });
            }
        }

    }
}
