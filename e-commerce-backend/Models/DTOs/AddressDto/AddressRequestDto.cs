using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models.DTOs.AddressDto
{
    public class AddressRequestDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string Street { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string City { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string ZipCode { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(60)]
        public string Country { get; set; }
    }
}
