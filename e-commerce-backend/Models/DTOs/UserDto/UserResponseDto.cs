using e_commerce_backend.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using e_commerce_backend.Models.DTOs.AddressDto;

namespace e_commerce_backend.Models.DTOs.UserDto
{
    public class UserResponseDto
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public string Role { get; set; }

        public AddressResponseDto Address { get; set; }
    }
}
