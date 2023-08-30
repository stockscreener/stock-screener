using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using stock_server.Services;
using StockDB.Data;

namespace stock_server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly StockContext _context;

		public AdminController(StockContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("/populate")]
		public async Task<IActionResult> PopulateDatabase()
		{
			var adminServices = new AdminServices(_context);
			string result = await adminServices.PopulateAllStocksOverview();

			return Ok(result);
		}


	}
}
