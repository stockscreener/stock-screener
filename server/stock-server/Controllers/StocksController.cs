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
                .Where(stock => stock.Symbol.ToLower().Contains(search) || stock.Name.ToLower().Contains(search))
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
        public async Task<ActionResult<IEnumerable<Stock>>> GetStocks()
        {
            if (_context.Stocks == null)
            {
                return NotFound();
            }
            return await _context.Stocks.ToListAsync();
        }

        // GET: api/Stocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Stock>> GetStock(int id)
        {
            if (_context.Stocks == null)
            {
                return NotFound();
            }
            var stock = await _context.Stocks.FindAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            return stock;
        } 
    
    }
}
