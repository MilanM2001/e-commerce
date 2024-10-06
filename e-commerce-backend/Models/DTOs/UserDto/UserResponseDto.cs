using e_commerce_backend.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models.DTOs.UserDto
{
    public class UserResponseDto
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public string Role { get; set; }

        public ICollection<Order> Orders { get; set; } = new List<Order>();

        public Cart Cart { get; set; }

        public Address Address { get; set; }
    }
}
