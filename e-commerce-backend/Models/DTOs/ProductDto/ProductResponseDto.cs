﻿using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models.DTOs.ProductDto
{
    public class ProductResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public string Category { get; set; }

        public string Image { get; set; }
    }
}
