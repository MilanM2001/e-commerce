using e_commerce_backend.Models.DTOs.ProductDto;

namespace e_commerce_backend.Services.ProductService
{
    public interface IProductService
    {
        Task<List<ProductResponseDto>> GetAll();
        Task<(List<ProductResponseDto>, int)> GetAllPageable(int pageNumber, int pageSize);
        Task<ProductResponseDto> GetById(int id);
        Task CreateProduct(ProductRequestDto product);
        Task UpdateProduct(int id, ProductUpdateDto productUpdateDto);
        Task DeleteProduct(int id);

    }
}
