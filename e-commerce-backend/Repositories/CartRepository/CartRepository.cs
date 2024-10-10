using e_commerce_backend.Data;
using e_commerce_backend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace e_commerce_backend.Repositories.CartRepository
{
    public class CartRepository: ICartRepository
    {
        private readonly DataContext _context;

        public CartRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Cart> GetCartByUserEmail(string email)
        {
            return await _context.Carts
                .Include(c => c.CartProducts) 
                .ThenInclude(cp => cp.Product) 
                .FirstOrDefaultAsync(c => c.UserEmail == email);
        }

        public async Task AddCart(Cart cart)
        {
            await _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCart(Cart cart)
        {
            _context.Carts.Update(cart);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCart(int cartId)
        {
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart != null)
            {
                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();
            }
        }
    }
}
