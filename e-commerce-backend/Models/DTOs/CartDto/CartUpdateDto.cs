using e_commerce_backend.Models.DTOs.ProductDto;

namespace e_commerce_backend.Models.DTOs.CartDto
{
    public class CartUpdateDto
    {
        public List<CartProduct> CartProducts { get; set; }
    }
}
