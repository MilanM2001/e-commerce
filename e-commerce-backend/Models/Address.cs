using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(255)]
        public string Street { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string City { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string ZipCode { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string Country { get; set; }


        [ForeignKey("User")]
        public string UserEmail { get; set; } 
        public User User { get; set; }  
    }
}
