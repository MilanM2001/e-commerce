using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models.DTOs.ProductDto
{
    public class ProductUpdateDto
    {
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
    }
}
