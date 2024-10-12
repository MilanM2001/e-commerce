using e_commerce_backend.Models.DTOs.CartDto;
using e_commerce_backend.Models.DTOs.OrderDto;

namespace e_commerce_backend.Services.OrderService
{
    public interface IOrderService
    {
        Task<List<OrderResponseDto>> GetMyOrders();
        Task AddOrder(OrderRequestDto orderRequestDto);
    }
}
