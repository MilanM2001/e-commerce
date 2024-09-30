using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models;

namespace e_commerce_backend.Services.AuthService
{
    public interface IAuthService
    {
        Task RegisterUserAsync(RegisterDto registerDto);
        Task<AuthenticationResponseDto> LoginAsync(LoginDto loginDto);
        string GenerateAccessToken(User user);
        string GenerateRefreshToken();
    }
}
