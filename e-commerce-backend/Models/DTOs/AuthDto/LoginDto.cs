using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models.DTOs.AuthDto
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
