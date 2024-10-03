using e_commerce_backend.Models;
using e_commerce_backend.Models.DTOs.UserDto;

namespace e_commerce_backend.Services.UserService
{
    public interface IUserService
    {
        Task<UserResponseDto> GetByEmailAsync(string email);
    }
}
