using e_commerce_backend.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace e_commerce_backend.Models
{
    public class User
    {
        [Key]
        [Required]
        [EmailAddress]
        [MinLength(1)]
        [MaxLength(255)]
        public required string Email { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(70)]
        public string Name { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        [Column(TypeName = "varchar(20)")]
        public Role Role { get; set; } 

        public ICollection<Order> Orders { get; set; } = new List<Order>();

        [Required]
        public required Cart Cart { get; set; }
        [Required]
        public required Address Address { get; set; }
    }
}
