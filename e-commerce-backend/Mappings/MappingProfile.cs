using AutoMapper;
using e_commerce_backend.Models.DTOs.AddressDto;
using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models;
using e_commerce_backend.Models.Enums;

namespace e_commerce_backend.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // User Mapping
            CreateMap<User, RegisterDto>();
            //.ForMember(dest => dest.Password, opt => opt.Ignore()) // Don't map password back
            //.ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
            //.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString())); // Enum to string

            CreateMap<RegisterDto, User>();
                //.ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // Password is hashed in the service
                //.ForMember(dest => dest.Role, opt => opt.MapFrom(src => Enum.Parse<Role>(src.Role))) // String to enum
                //.ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                //.ForMember(dest => dest.Cart, opt => opt.Ignore()); // Cart is created separately in the service

            // Address Mapping
            CreateMap<AddressRequestDto, Address>(); // Mapping for creating address
            CreateMap<Address, AddressRequestDto>(); // Mapping to return address data if needed

            //// Cart Mapping (if needed)
            //CreateMap<CartRe, Cart>();
            //CreateMap<Cart, CartRequestDTO>();
        }
    }
}
