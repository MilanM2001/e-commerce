using e_commerce_backend.Models.DTOs.ProductDto;

namespace e_commerce_backend.Models.DTOs.CartDto
{
    public class CartResponseDto
    {
        public string Id { get; set; }
        public string UserEmail { get; set; }
        public List<ProductResponseDto> Products { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
