using AutoMapper;
using e_commerce_backend.Models.DTOs.AddressDto;
using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models;
using e_commerce_backend.Models.Enums;
using e_commerce_backend.Models.DTOs.UserDto;
using e_commerce_backend.Models.DTOs.ProductDto;

namespace e_commerce_backend.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // User Mapping
            CreateMap<User, RegisterDto>();
            CreateMap<User, UserResponseDto>();
                //.ForMember(dest => dest.Cart, opt => opt.MapFrom(src => src.Cart));
            CreateMap<RegisterDto, User>();


            // Product Mapping
            CreateMap<Product, ProductResponseDto>();
            CreateMap<ProductRequestDto, Product>();
            CreateMap<ProductUpdateDto, Product>();


            // Address Mapping
            CreateMap<AddressRequestDto, Address>(); 
            CreateMap<Address, AddressRequestDto>(); 

        }
    }
}
