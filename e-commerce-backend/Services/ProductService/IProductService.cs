using e_commerce_backend.Models.DTOs.ProductDto;

namespace e_commerce_backend.Services.ProductService
{
    public interface IProductService
    {
        Task<List<ProductResponseDto>> GetAll();
        Task<ProductResponseDto> GetById(int id);
        Task CreateProduct(ProductRequestDto product);
        
    }
}
