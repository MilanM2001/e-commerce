using e_commerce_backend.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models
{
    public class User
    {
        [Key]
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public Role Role { get; set; } 

        public ICollection<Order> Orders { get; set; } = new List<Order>();

        public required Cart Cart { get; set; }
    }
}
