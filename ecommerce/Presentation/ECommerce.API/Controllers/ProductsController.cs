using ECommerce.Application.Repository;
using ECommerce.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductWriteRepository _productWriteRepository;
        private readonly IProductReadRepository _productReadRepository;

        private readonly IOrderWriteRepository _orderWriteRepository;
        private readonly IOrderReadRepository _orderReadRepository;

        private readonly ICustomerWriteRepository _customerWriteRepository;


        public ProductsController(IProductWriteRepository productWriteRepository,
            IProductReadRepository productReadRepository,
            IOrderWriteRepository orderWriteRepository,
            IOrderReadRepository orderReadRepository, ICustomerWriteRepository customerWriteRepository)
        {
            _productWriteRepository = productWriteRepository;
            _productReadRepository = productReadRepository;
            _orderWriteRepository = orderWriteRepository;
            _orderReadRepository = orderReadRepository;
            _customerWriteRepository = customerWriteRepository;
        }

        [HttpGet]
        public async Task Get()
        {
            var customerid=Guid.NewGuid();
            await _customerWriteRepository.AddAsync(new() { Id= customerid ,Name="Abdullah"});

            await _orderWriteRepository.AddAsync(new() {Description="asdasds",Address="1asdasd as",CustomerId= customerid });
            await _orderWriteRepository.AddAsync(new() { Description = "asdasds 2", Address = "asasd  asddasdasd",CustomerId=customerid });
            await _orderWriteRepository.SaveAsync();
        }
    }
}
