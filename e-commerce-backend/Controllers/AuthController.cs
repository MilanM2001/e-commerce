﻿using e_commerce_backend.Exceptions;
using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models.DTOs.UserDto;
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
            try
            {
                await _authService.RegisterUserAsync(registerDto);

                return Ok("User Registered");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                var result = await _authService.LoginAsync(loginDto);

                return Ok(result);
            }
            catch (InvalidDataException)
            {
                return NotFound("Invalid credentials");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var newAccessToken = await _authService.RefreshAccessTokenAsync(refreshTokenDto.RefreshToken);
                return Ok(new { AccessToken = newAccessToken });
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(new { message = "Invalid refresh token", details = ex.Message });
            } 
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong", details = ex.Message });
            }
        }

        [HttpGet("getMe")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> GetMe()
        {
            try
            {
                UserResponseDto userResponse = await _authService.GetMe();

                return Ok(userResponse);
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(ex.Message);
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


    }
}
