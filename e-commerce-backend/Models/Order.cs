using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        [Range(0.01, 1000000.00)]  
        public decimal TotalAmount { get; set; }

        [Required]
        [ForeignKey("User")]
        public string UserEmail { get; set; }
        public User User { get; set; }
    }
}
