using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Specfications;
using API.DTO;
using AutoMapper;
using API.Helpers;

namespace API.Controllers
{

    public class ProductsControllers : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        public ProductsControllers(IGenericRepository<Product> productsRepo,IGenericRepository<ProductBrand> 
            productBrandRepo,IGenericRepository<ProductType> productTypeRepo, IMapper mapper)
        {
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
            _productRepo = productsRepo;
            _mapper = mapper;


            //////////////////////the below var spec variable have a method ListAsync but putted as ListAsunc

        }
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductWithTypeAndBrandsSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _productRepo.CountAsync(countSpec);
            


            var products = await _productRepo.ListAsunc(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex,
                productParams.PageSize, totalItems, data));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithTypeAndBrandsSpecification(id);

            var product = await _productRepo.GetEntityWithSpec(spec);
            return _mapper.Map<Product, ProductToReturnDto>(product);

        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }
    }
}