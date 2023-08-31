using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stock_server.Services;
using StockDB.Data;
using StockDB.Models;

namespace stock_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StocksController : ControllerBase
    {
        private readonly StockContext _context;

        public StocksController(StockContext context)
        {
            _context = context;
        }

        [HttpGet("short")]
        public async Task<ActionResult<IEnumerable<object>>> GetStockInfo()
        {
            var stockInfoList = await _context.Stocks
                .Select(stock => new
                {
                    StockId = stock.Id,
                    Symbol = stock.Symbol,
                    Name = stock.Name,
                    Visible = stock.IsVisible
                })
                .ToListAsync();
            return Ok(stockInfoList);
        }
        [HttpGet("search")]
        public async Task<object> SearchStocksAsync(string search)
        {
            search = search?.Trim().ToLower();

            var matchingStocks = await _context.Stocks
                .Where(stock => stock.IsVisible==1 && (stock.Symbol.ToLower().Contains(search) || stock.Name.ToLower().Contains(search)))
                .Select(stock => new {
                    StockId = stock.Id,
                    Symbol = stock.Symbol,
                    Name = stock.Name,
                    Visible = stock.IsVisible
                })
                .ToListAsync();

            return Ok(matchingStocks);
        }

        // GET: api/Stocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetStocks()
        {
            if (_context.Stocks == null)
            {
                return NotFound();
            }
            return await _context.Stocks
                        .Where(stock => stock.IsVisible==1)
                        .Join(_context.FinancialMetrics,
                            Stock=>Stock.Id,
                            FinancialMetrics => FinancialMetrics.StockId,(stock, financialMetrics) => new
                            {
                                Id = stock.Id,
                                Symbol = stock.Symbol,
                                Name = stock.Name,
                                Ebitda = financialMetrics.Ebitda,
                                PeRatio = financialMetrics.PeRatio,
                                BookValue = financialMetrics.BookValue,
                                PegRatio = financialMetrics.PegRatio,
                                DividendYield = financialMetrics.DividendYield,
                                Eps = financialMetrics.Eps,
                                PriceToBookRatio = financialMetrics.PriceToBookRatio,
                                Beta = financialMetrics.Beta,
                                Week52High = financialMetrics.Week52High,
                                Week52Low = financialMetrics.Week52Low,
                                Day50MovingAverage = financialMetrics.Day50MovingAverage,
                                Day200MovingAverage = financialMetrics.Day200MovingAverage,
                                ProfitMargin = financialMetrics.ProfitMargin
                                })
                        .ToListAsync();
        }

        // GET: api/Stocks/5
	[HttpGet("{id}")]
	public async Task<ActionResult<object>> GetStock(int id)
	{
	    if (_context.Stocks == null)
	    {
		return NotFound();
	    }

	    var stock = await _context.Stocks
		.Where(stock => stock.IsVisible == 1 && stock.Id == id)
		.Select(stock => new
		{
		    stock.Id,
		    stock.Symbol,
		    stock.AssetType,
		    stock.Name,
		    stock.Description,
		    stock.Cik,
		    stock.Exchange,
		    stock.Currency,
		    stock.Country,
		    stock.Sector,
		    stock.Industry,
		    stock.Address,
		    stock.FiscalYearEnd,
		    stock.IsVisible
		})
		.FirstOrDefaultAsync();

	    if (stock == null)
	    {
		return NotFound();
	    }

	    return stock;
	}
	// GET: api/FinancialMetrics/5
	[HttpGet("financial-metrics/{stockId}")]
	public async Task<ActionResult<IEnumerable<object>>> GetFinancialMetricsForStock(int stockId)
	{
	    if (_context.FinancialMetrics == null)
	    {
		return NotFound();
	    }

	    var financialMetrics = await _context.FinancialMetrics
		.Where(metric => metric.StockId == stockId)
		.Join(_context.Stocks,
		    metric => metric.StockId,
		    stock => stock.Id,
		    (metric, stock) => new
		    {
		        metric.Id,
		        metric.StockId,
		        stock.Symbol,
		        LatestQuarter = metric.LatestQuarter.HasValue ? metric.LatestQuarter.Value.ToString("yyyy-MM-dd") : "",
		        metric.MarketCapitalization,
		        metric.Ebitda,
		        metric.PeRatio,
		        metric.PegRatio,
		        metric.BookValue,
		        metric.DividendPerShare,
		        metric.DividendYield,
		        metric.Eps,
		        metric.RevenuePerShareTtm,
		        metric.ProfitMargin,
		        metric.OperatingMarginTtm,
		        metric.ReturnOnAssetsTtm,
		        metric.ReturnOnEquityTtm,
		        metric.RevenueTtm,
		        metric.GrossProfitTtm,
		        metric.DilutedEpsTtm,
		        metric.QuarterlyEarningsGrowthYoy,
		        metric.QuarterlyRevenueGrowthYoy,
		        metric.AnalystTargetPrice,
		        metric.TrailingPe,
		        metric.ForwardPe,
		        metric.PriceToSalesRatioTtm,
		        metric.PriceToBookRatio,
		        metric.EvToRevenue,
		        metric.EvToEbitda,
		        metric.Beta,
		        metric.Week52High,
		        metric.Week52Low,
		        metric.Day50MovingAverage,
		        metric.Day200MovingAverage,
		        metric.SharesOutstanding,
		        metric.DividendDate,
		        metric.ExDividendDate
		    })
		.ToListAsync();

	    if (!financialMetrics.Any())
	    {
		return NotFound();
	    }

	    return Ok(financialMetrics);
	}
    
    }
}

