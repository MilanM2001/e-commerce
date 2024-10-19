using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        [Range(0.01, 10000.00)]  
        public decimal Price { get; set; }

        [Required]
        [Range(0, 10000)] 
        public int Quantity { get; set; }

        [Required]
        [StringLength(100)]
        public string Category { get; set; }

        public byte[] Image { get; set; }

        public ICollection<Cart> Carts { get; set; } = new List<Cart>();
    }
}
