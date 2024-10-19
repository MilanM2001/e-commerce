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

            for (int i = 0; i < productsDto.Count; i++)
            {
                if (products[i].Image != null)
                {
                    productsDto[i].Image = Convert.ToBase64String(products[i].Image);
                }
            }

            return productsDto;
        }

        public async Task<ProductResponseDto> GetById(int id)
        {
            Product product = await _productRepository.GetById(id); 

            ProductResponseDto productDto = _mapper.Map<ProductResponseDto>(product);

            productDto.Image = Convert.ToBase64String(product.Image);

            return productDto;
        }

        public async Task CreateProduct(ProductRequestDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                Quantity = productDto.Quantity,
                Category = productDto.Category,
            };

            if (productDto.ImageFile != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await productDto.ImageFile.CopyToAsync(memoryStream);
                    product.Image = memoryStream.ToArray();
                }
            }

            await _productRepository.AddProduct(product);
            await _productRepository.SaveChanges();
        }

        public async Task UpdateProduct(int id, ProductUpdateDto productUpdateDto)
        {
            Product existingProduct = await _productRepository.GetById(id);
            if (existingProduct == null)
                throw new ArgumentException("Product not found");
            
            var updatedProduct = _mapper.Map(productUpdateDto, existingProduct);

            await _productRepository.UpdateProduct(updatedProduct);
        }

        public async Task DeleteProduct(int id)
        {
            await _productRepository.DeleteProduct(id);
        }
    }
}
