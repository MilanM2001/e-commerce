using AutoMapper;
using e_commerce_backend.Models.DTOs.AddressDto;
using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models;
using e_commerce_backend.Models.Enums;
using e_commerce_backend.Models.DTOs.UserDto;
using e_commerce_backend.Models.DTOs.ProductDto;
using e_commerce_backend.Models.DTOs.CartDto;

namespace e_commerce_backend.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // User Mapping
            CreateMap<User, RegisterDto>();
            CreateMap<User, UserResponseDto>()
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address));
            CreateMap<RegisterDto, User>();


            // Product Mapping
            CreateMap<Product, ProductResponseDto>();
            CreateMap<ProductRequestDto, Product>();
            CreateMap<ProductUpdateDto, Product>();


            // Address Mapping
            CreateMap<AddressRequestDto, Address>(); 
            CreateMap<Address, AddressRequestDto>();
            CreateMap<Address, AddressResponseDto>();

            // Cart Mapping
            CreateMap<Cart, CartResponseDto>();

        }
    }
}
