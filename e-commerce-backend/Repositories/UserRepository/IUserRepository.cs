using e_commerce_backend.Models;

namespace e_commerce_backend.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User> GetByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task SaveChangesAsync();
    }
}
