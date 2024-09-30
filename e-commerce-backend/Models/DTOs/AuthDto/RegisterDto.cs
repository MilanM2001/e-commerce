using e_commerce_backend.Models.DTOs.AddressDto;
using e_commerce_backend.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace e_commerce_backend.Models.DTOs.AuthDto
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [MinLength(3)]
        [MaxLength(70)]
        public string Email { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Password { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public Role Role { get; set; } 

        [Required]
        public AddressRequestDto Address { get; set; }
    }
}
