﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]  
        public decimal TotalAmount { get; set; }

        [Required]
        [ForeignKey("User")]
        public string UserEmail { get; set; }
        public User User { get; set; }

        public List<OrderedProduct> OrderedProducts { get; set; } = new List<OrderedProduct>();
    }
}
