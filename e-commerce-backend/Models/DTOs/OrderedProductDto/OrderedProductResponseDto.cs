using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using e_commerce_backend.Models.DTOs.ProductDto;

namespace e_commerce_backend.Models.DTOs.OrderedProductDto
{
    public class OrderedProductResponseDto
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public string ProductName { get; set; }

        public int Quantity { get; set; }

        public decimal PriceAtPurchase { get; set; }
    }
}
