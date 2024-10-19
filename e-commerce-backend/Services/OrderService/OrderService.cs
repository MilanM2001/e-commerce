using AutoMapper;
using e_commerce_backend.Models;
using e_commerce_backend.Models.DTOs.OrderDto;
using e_commerce_backend.Repositories.CartRepository;
using e_commerce_backend.Repositories.OrderRepository;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace e_commerce_backend.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public OrderService(IOrderRepository orderRepository, ICartRepository cartRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<OrderResponseDto>> GetMyOrders()
        {
            var email = "";
            if (_httpContextAccessor.HttpContext != null)
                email = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(email))
                throw new SecurityTokenException("Token invalid");

            List<Order> orders = await _orderRepository.GetOrdersByUserEmail(email);

            return _mapper.Map<List<OrderResponseDto>>(orders);
        }

        public async Task AddOrder(OrderRequestDto orderRequestDto)
        {
            var email = "";
            if (_httpContextAccessor.HttpContext != null)
                email = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(email))
                throw new SecurityTokenException("Token invalid");

            decimal totalAmount = 0;
            List<OrderedProduct> orderedProducts = new List<OrderedProduct>();
            Order order = new Order();

            foreach (CartProduct cartProduct in orderRequestDto.CartProducts)
            {
                OrderedProduct orderedProduct = new OrderedProduct();
                orderedProduct.ProductName = cartProduct.Product.Name;
                orderedProduct.Quantity = cartProduct.Quantity;
                orderedProduct.PriceAtPurchase = cartProduct.Product.Price;
                totalAmount += cartProduct.Quantity * cartProduct.Product.Price;
                orderedProducts.Add(orderedProduct);
            }

            order.OrderDate = DateTime.Now;
            order.UserEmail = email;
            order.OrderedProducts = orderedProducts;
            order.TotalAmount = totalAmount;

            await _orderRepository.AddOrder(order);

            // TODO Delete products by cart id from cart after an order is placed
            await _cartRepository.ClearCart(orderRequestDto.CartId);
        }


    }
}
