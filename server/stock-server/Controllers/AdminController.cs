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
		private readonly AdminServices _adminServices;

		public AdminController(StockContext context, AdminServices adminServices)
		{
			_context = context;
			_adminServices = adminServices;
		}

		[HttpGet("populate")]
		public async Task<IActionResult> PopulateDatabase()
		{
			string result = await _adminServices.PopulateAllStocksOverview();

			return Ok(result);
		}

		[HttpPost("changeVisibility")]
		public async Task<ActionResult<string>> ChangeStockVisibility([FromBody] ChangeStockVisibilityRequest request)
		{
			var result = await _adminServices.ChangeStockVisibilityAsync(request.StockId, request.IsVisible);
			return Ok(result);
		}

		public class ChangeStockVisibilityRequest
		{
			public int StockId { get; set; }
			public bool IsVisible { get; set; }
		}

	}
}
