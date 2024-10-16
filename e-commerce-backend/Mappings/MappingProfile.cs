﻿using AutoMapper;
using e_commerce_backend.Models.DTOs.AddressDto;
using e_commerce_backend.Models.DTOs.AuthDto;
using e_commerce_backend.Models;
using e_commerce_backend.Models.Enums;
using e_commerce_backend.Models.DTOs.UserDto;
using e_commerce_backend.Models.DTOs.ProductDto;
using e_commerce_backend.Models.DTOs.CartDto;
using e_commerce_backend.Models.DTOs.OrderDto;
using e_commerce_backend.Models.DTOs.OrderedProductDto;

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
            CreateMap<ProductResponseDto, Product>();


            // Address Mapping
            CreateMap<AddressRequestDto, Address>(); 
            CreateMap<Address, AddressRequestDto>();
            CreateMap<Address, AddressResponseDto>();

            // Cart Mapping
            CreateMap<Cart, CartResponseDto>();
            CreateMap<CartUpdateDto, Cart>();

            //Order Mapping
            CreateMap<Order, OrderResponseDto>();
            CreateMap<OrderRequestDto, Order>();

            //OrderedProduct Mapping
            CreateMap<OrderedProduct, OrderedProductResponseDto>();
           

        }
    }
}
