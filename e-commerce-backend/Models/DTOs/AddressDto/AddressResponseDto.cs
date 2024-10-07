using System.ComponentModel.DataAnnotations;

namespace e_commerce_backend.Models.DTOs.AddressDto
{
    public class AddressResponseDto
    {
        public string Street { get; set; }

        public string City { get; set; }

        public string ZipCode { get; set; }

        public string Country { get; set; }
    }
}
