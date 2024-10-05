using AutoMapper;
using e_commerce_backend.Models;
using e_commerce_backend.Models.DTOs.ProductDto;
using e_commerce_backend.Repositories.ProductRepository;

namespace e_commerce_backend.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<List<ProductResponseDto>> GetAll()
        {
            List<Product> products = await _productRepository.GetAll();

            List<ProductResponseDto> productsDto = _mapper.Map<List<ProductResponseDto>>(products);

            return productsDto;

        }

        public async Task<ProductResponseDto> GetById(int id)
        {
            Product product = await _productRepository.GetById(id); 

            ProductResponseDto productDto = _mapper.Map<ProductResponseDto>(product);

            return productDto;
        }

        public async Task CreateProduct(ProductRequestDto productDto)
        {
            Product product = _mapper.Map<Product>(productDto);

            await _productRepository.AddProduct(product);
            await _productRepository.SaveChanges();
        }
    }
}
