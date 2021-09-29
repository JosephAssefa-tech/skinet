using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsControllers : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductsControllers(StoreContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }
         [HttpGet("{id}")]
         public async Task<ActionResult<Product>> GetProduct(int id)
         {
            return await _context.Products.FindAsync(id);

         }
    }
}