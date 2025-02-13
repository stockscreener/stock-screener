using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using stock_server.Services;
using StockDB.Data;
using Newtonsoft.Json;

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
        public async Task<IActionResult> ChangeStockVisibilityBulk([FromBody] List<ChangeStockVisibilityRequest> requests)
        {
            List<string> results = new List<string>();

            foreach (var request in requests)
            {
                var result = await _adminServices.ChangeStockVisibilityAsync(request.StockId, request.IsVisible);
				Console.WriteLine(request.IsVisible);
                results.Add(result);
            }

            return Ok(results);
        }

		public class ChangeStockVisibilityRequest
		{
			public int StockId { get; set; }
			[JsonProperty("visible")]
			public bool IsVisible { get; set; }
		}

	}
}
