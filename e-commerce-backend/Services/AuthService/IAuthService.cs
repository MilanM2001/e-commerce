using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models;
using e_commerce_backend.Models.DTOs.UserDto;

namespace e_commerce_backend.Services.AuthService
{
    public interface IAuthService
    {
        Task RegisterUserAsync(RegisterDto registerDto);
        Task<AuthenticationResponseDto> LoginAsync(LoginDto loginDto);
        string GenerateAccessToken(User user);
        string GenerateRefreshToken(User user);
        Task<string> RefreshAccessTokenAsync(string refreshToken);
        Task<UserResponseDto> GetMe();
    }
}
