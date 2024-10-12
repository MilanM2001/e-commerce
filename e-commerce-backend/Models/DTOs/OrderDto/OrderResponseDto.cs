using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using e_commerce_backend.Models.DTOs.OrderedProductDto;

namespace e_commerce_backend.Models.DTOs.OrderDto
{
    public class OrderResponseDto
    {
        public int Id { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal TotalAmount { get; set; }

        public string UserEmail { get; set; }

        public List<OrderedProductResponseDto> OrderedProducts { get; set; } = new List<OrderedProductResponseDto>();
    }
}
