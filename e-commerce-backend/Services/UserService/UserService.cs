using AutoMapper;
using e_commerce_backend.Exceptions;
using e_commerce_backend.Models;
using e_commerce_backend.Models.DTOs.UserDto;
using e_commerce_backend.Repositories.UserRepository;

namespace e_commerce_backend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserResponseDto> GetByEmailAsync(string email)
        {
            User user = await _userRepository.GetByEmailAsync(email);

            if (user == null)
                throw new EntityNotFoundException($"User with email '{email}' was not found.");

            UserResponseDto responseDto = _mapper.Map<UserResponseDto>(user);

            return responseDto;
        }
    }
}
