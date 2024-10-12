using e_commerce_backend.Models;

namespace e_commerce_backend.Repositories.OrderRepository
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrdersByUserEmail(string email);
        Task AddOrder(Order order);
    }
}
