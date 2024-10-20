namespace e_commerce_backend.Tests
{
    using Xunit;
    using Moq;
    using AutoMapper;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using e_commerce_backend.Repositories.ProductRepository;
    using e_commerce_backend.Services.ProductService;
    using e_commerce_backend.Models.DTOs.ProductDto;
    using e_commerce_backend.Models;

    public class ProductServiceTests
    {
        private readonly Mock<IProductRepository> _mockProductRepository;
        private readonly Mock<IMapper> _mockMapper;
        private readonly ProductService _productService;

        public ProductServiceTests()
        {
            _mockProductRepository = new Mock<IProductRepository>();
            _mockMapper = new Mock<IMapper>();
            _productService = new ProductService(_mockProductRepository.Object, _mockMapper.Object);
        }

        [Fact]
        public async Task GetAll_ShouldReturnMappedProducts_WithBase64Images()
        {
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "Product 1", Image = new byte[] { 1, 2, 3 } },
                new Product { Id = 2, Name = "Product 2", Image = null }
            };

            var productsDto = new List<ProductResponseDto>
            {
                new ProductResponseDto { Id = 1, Name = "Product 1" },
                new ProductResponseDto { Id = 2, Name = "Product 2" }
            };

            _mockProductRepository.Setup(repo => repo.GetAll()).ReturnsAsync(products);
            _mockMapper.Setup(mapper => mapper.Map<List<ProductResponseDto>>(products)).Returns(productsDto);

            var result = await _productService.GetAll();

            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Equal("AQID", result[0].Image);
            Assert.Null(result[1].Image);

            _mockProductRepository.Verify(repo => repo.GetAll(), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<List<ProductResponseDto>>(products), Times.Once);
        }

        [Fact]
        public async Task GetById_ShouldReturnMappedProduct_WithBase64Image()
        {
            var product = new Product { Id = 1, Name = "Product 1", Image = new byte[] { 4, 5, 6 } };
            var productDto = new ProductResponseDto { Id = 1, Name = "Product 1" };

            _mockProductRepository.Setup(repo => repo.GetById(1)).ReturnsAsync(product);
            _mockMapper.Setup(mapper => mapper.Map<ProductResponseDto>(product)).Returns(productDto);

            var result = await _productService.GetById(1);

            Assert.NotNull(result);
            Assert.Equal("BAUG", result.Image);

            _mockProductRepository.Verify(repo => repo.GetById(1), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<ProductResponseDto>(product), Times.Once);
        }

        [Fact]
        public async Task CreateProduct_ShouldAddProduct_WithImageByteArray()
        {
            var productRequestDto = new ProductRequestDto
            {
                Name = "New Product",
                Description = "A new product",
                Price = 99.99m,
                Quantity = 10,
                Category = "Electronics",
                ImageFile = Mock.Of<IFormFile>()
            };

            _mockProductRepository.Setup(repo => repo.AddProduct(It.IsAny<Product>()));
            _mockProductRepository.Setup(repo => repo.SaveChanges());

            await _productService.CreateProduct(productRequestDto);

            _mockProductRepository.Verify(repo => repo.AddProduct(It.IsAny<Product>()), Times.Once);
            _mockProductRepository.Verify(repo => repo.SaveChanges(), Times.Once);
        }

        [Fact]
        public async Task UpdateProduct_ShouldUpdateExistingProduct()
        {
            var existingProduct = new Product { Id = 1, Name = "Old Product" };
            var productUpdateDto = new ProductUpdateDto { Name = "Updated Product" };

            _mockProductRepository.Setup(repo => repo.GetById(1)).ReturnsAsync(existingProduct);
            _mockProductRepository.Setup(repo => repo.UpdateProduct(It.IsAny<Product>()));

            await _productService.UpdateProduct(1, productUpdateDto);

            _mockProductRepository.Verify(repo => repo.GetById(1), Times.Once);
            _mockProductRepository.Verify(repo => repo.UpdateProduct(It.IsAny<Product>()), Times.Once);
        }

        [Fact]
        public async Task DeleteProduct_ShouldCallDelete_OnRepository()
        {
            _mockProductRepository.Setup(repo => repo.DeleteProduct(1));

            await _productService.DeleteProduct(1);

            _mockProductRepository.Verify(repo => repo.DeleteProduct(1), Times.Once);
        }
    }
}
