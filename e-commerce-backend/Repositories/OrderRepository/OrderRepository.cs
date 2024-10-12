using e_commerce_backend.Data;
using e_commerce_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace e_commerce_backend.Repositories.OrderRepository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;

        public OrderRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> GetOrdersByUserEmail(string email)
        {
            return await _context.Orders
                .Include(o => o.OrderedProducts) 
                .Where(o => o.UserEmail == email)
                .ToListAsync();
        }

        public async Task AddOrder(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }
    }
}
