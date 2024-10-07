using e_commerce_backend.Models.DTOs.ProductDto;

namespace e_commerce_backend.Models.DTOs.CartDto
{
    public class CartRequestDto
    {
        public string Email { get; set; }
        public List<ProductResponseDto> Products { get; set; }
    }
}
