using AutoMapper;
using e_commerce_backend.Exceptions;
using e_commerce_backend.Models;
using e_commerce_backend.Models.DTOs.CartDto;
using e_commerce_backend.Repositories.CartRepository;
using e_commerce_backend.Repositories.ProductRepository;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace e_commerce_backend.Services.CartService
{
    public class CartService: ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CartService(ICartRepository cartRepository, IProductRepository productRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CartResponseDto> GetCartByUserEmail(string email)
        {
            var cart = await _cartRepository.GetCartByUserEmail(email);
            if (cart == null)
                throw new EntityNotFoundException("Cart not found for email: " + email);

            return _mapper.Map<CartResponseDto>(cart);
        }

        public async Task<CartResponseDto> GetMyCart()
        {
            var email = "";
            if (_httpContextAccessor.HttpContext != null)
            {
                email = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                Console.WriteLine(email);
            }

            if (string.IsNullOrEmpty(email))
                throw new SecurityTokenException("Token invalid");

            Cart cart = await _cartRepository.GetCartByUserEmail(email);
            if (cart == null)
                throw new EntityNotFoundException("Cart not found for email: " + email);

            return _mapper.Map<CartResponseDto>(cart);
        }

        public async Task AddCart(CartRequestDto cartCreateDto)
        {
            var cart = _mapper.Map<Cart>(cartCreateDto);

            await _cartRepository.AddCart(cart);
        }

        public async Task UpdateCart(CartUpdateDto cartUpdateDto)
        {
            var email = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(email))
                throw new SecurityTokenException("Token invalid");

            Cart cart = await _cartRepository.GetCartByUserEmail(email);

            if (cart == null)
                throw new EntityNotFoundException("Cannot find cart with email: " + email);

            foreach (var newProduct in cartUpdateDto.CartProducts)
            {
                // Check if the product is available
                var existingProduct = await _productRepository.GetById(newProduct.ProductId);
                if (existingProduct == null || existingProduct.Quantity < 1)
                {
                    throw new Exception($"Product with ID {newProduct.ProductId} is not available.");
                }

                // Check if the product already exists in the cart
                var cartProduct = cart.CartProducts.FirstOrDefault(cp => cp.ProductId == newProduct.ProductId);
                if (cartProduct != null)
                {
                    // If product is already in the cart, increase quantity
                    cartProduct.Quantity += 1;
                }
                else
                {
                    // If product is not in the cart, add it with quantity 1
                    cart.CartProducts.Add(new CartProduct
                    {
                        ProductId = newProduct.ProductId,
                        Quantity = 1
                    });
                }

                // Reduce the original product's quantity by 1
                existingProduct.Quantity -= 1;
                await _productRepository.UpdateProduct(existingProduct); // Ensure the product quantity is updated
            }

            // Calculate the updated total price
            cart.TotalPrice = cart.CartProducts.Sum(cp => ( _productRepository.GetById(cp.ProductId)).Result.Price * cp.Quantity);

            await _cartRepository.UpdateCart(cart);
        }



        public async Task DeleteCart(int id)
        {
            await _cartRepository.DeleteCart(id);
        }

    }
}
