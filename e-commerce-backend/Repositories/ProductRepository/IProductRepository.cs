using e_commerce_backend.Models;

namespace e_commerce_backend.Repositories.ProductRepository
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAll();
        Task<(List<Product>, int)> GetAllPageable(int pageNumber, int pageSize);
        Task<Product> GetById(int id);
        Task AddProduct(Product product);
        Task UpdateProduct(Product product);
        Task DeleteProduct(int id);
        Task SaveChanges();
    }
}
