using e_commerce_backend.Models;

namespace e_commerce_backend.Repositories.ProductRepository
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAll();
        Task<Product> GetById(int id);
        Task AddProduct(Product product);
        Task SaveChanges();
    }
}
