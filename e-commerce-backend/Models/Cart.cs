﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("User")]
        public string UserEmail { get; set; }
        public User User { get; set; }

        public List<CartProduct> CartProducts { get; set; } = new List<CartProduct>();

        [Required]
        [Range(0.01, 1000000.00)]  
        public decimal TotalPrice { get; set; }
    }
}
