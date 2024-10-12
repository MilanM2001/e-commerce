using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models
{
    public class CartProduct
    {
        [Key]  
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
