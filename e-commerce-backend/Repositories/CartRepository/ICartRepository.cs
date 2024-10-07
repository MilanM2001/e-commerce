using e_commerce_backend.Models;

namespace e_commerce_backend.Repositories.CartRepository
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByUserEmail(string email);
        Task AddCart(Cart cart);
        Task UpdateCart(Cart cart);
        Task DeleteCart(int cartId);
    }
}
