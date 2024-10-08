using AutoMapper;
using e_commerce_backend.Exceptions;
using e_commerce_backend.Models;
using e_commerce_backend.Models.DTOs.CartDto;
using e_commerce_backend.Repositories.CartRepository;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace e_commerce_backend.Services.CartService
{
    public class CartService: ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CartService(ICartRepository cartRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _cartRepository = cartRepository;
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
            var cart = await _cartRepository.GetCartByUserEmail(cartUpdateDto.UserEmail);
            if (cart != null)
            {
                cart = _mapper.Map(cartUpdateDto, cart); 
                await _cartRepository.UpdateCart(cart);
            }
        }

        public async Task DeleteCart(int id)
        {
            await _cartRepository.DeleteCart(id);
        }

    }
}
