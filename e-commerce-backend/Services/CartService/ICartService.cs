using e_commerce_backend.Models.DTOs.CartDto;

namespace e_commerce_backend.Services.CartService
{
    public interface ICartService
    {
        Task<CartResponseDto> GetCartByUserEmail(string email);
        Task<CartResponseDto> GetMyCart();
        Task AddCart(CartRequestDto cartCreateDto);
        Task UpdateCart(CartUpdateDto cartUpdateDto);
        Task DeleteCart(int cartId);
    }
}
