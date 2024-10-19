using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models.DTOs.OrderDto
{
    public class OrderRequestDto
    {

        [Required]
        public decimal TotalAmount { get; set; }

        public List<CartProduct> CartProducts { get; set; } = new List<CartProduct>();
        [Required]
        public int CartId { get; set; }
    }
}
