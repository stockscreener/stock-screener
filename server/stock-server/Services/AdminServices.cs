using Newtonsoft.Json;
using StockData.Data;
using StockData.Models;

namespace stock_server.Services
{
	public class AdminServices
	{
		private readonly StockContext _context;

		public AdminServices(StockContext context)
		{
			_context = context;
		}

		public async Task<string> PopulateDBAsync() // Use Task to make the method asynchronous
		{
			HttpClient client = new HttpClient();

			// Fetch data from the API
			HttpResponseMessage response = await client.GetAsync("https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo");
			if (response.IsSuccessStatusCode)
			{
				string responseBody = await response.Content.ReadAsStringAsync();

				// Deserialize the JSON response
				var data = JsonConvert.DeserializeObject<dynamic>(responseBody);
				Console.WriteLine(data);
				// Now you can populate your database with the fetched data
				// For example:
				
				FinancialMetric metric = null;
				if (data != null)
				{
					var stock = new Stock
					{
						Symbol = data.Symbol,
						AssetType = data.AssetType,
						Name = data.Name,
						Description = data.Description,
						Cik = int.Parse(data.CIK),
						Exchange = data.Exchange,
						Currency = data.Currency,
						Country = data.Country,
						Sector = data.Sector,
						Industry = data.Industry,
						Address = data.Address,
						FiscalYearEnd = data.FiscalYearEnd,
						IsVisible = 1
					};
					
					_context.Stocks.Add(stock);
					await _context.SaveChangesAsync();

					metric = new FinancialMetric
					{
						StockId = stock.Id,
						Symbol = data.Symbol,
						LatestQuarter = DateTime.Parse(data.LatestQuarter),
						MarketCapitalization = long.Parse(data.MarketCapitalization),
						Ebitda = long.Parse(data.EBITDA),
						PeRatio = decimal.Parse(data.PERatio),
						PegRatio = decimal.Parse(data.PEGRatio),
						BookValue = decimal.Parse(data.BookValue),
						DividendPerShare = decimal.Parse(data.DividendPerShare),
						DividendYield = decimal.Parse(data.DividendYield),
						Eps = decimal.Parse(data.EPS),
						RevenuePerShareTtm = decimal.Parse(data.RevenuePerShareTTM),
						ProfitMargin = decimal.Parse(data.ProfitMargin),
						OperatingMarginTtm = decimal.Parse(data.OperatingMarginTTM),
						ReturnOnAssetsTtm = decimal.Parse(data.ReturnOnAssetsTTM),
						ReturnOnEquityTtm = decimal.Parse(data.ReturnOnEquityTTM),
						RevenueTtm = long.Parse(data.RevenueTTM),
						GrossProfitTtm = long.Parse(data.GrossProfitTTM),
						DilutedEpsTtm = decimal.Parse(data.DilutedEPSTTM),
						QuarterlyEarningsGrowthYoy = decimal.Parse(data.QuarterlyEarningsGrowthYOY),
						QuarterlyRevenueGrowthYoy = decimal.Parse(data.QuarterlyRevenueGrowthYOY),
						AnalystTargetPrice = decimal.Parse(data.AnalystTargetPrice),
						TrailingPe = decimal.Parse(data.TrailingPE),
						ForwardPe = decimal.Parse(data.ForwardPE),
						PriceToSalesRatioTtm = decimal.Parse(data.PriceToSalesRatioTTM),
						PriceToBookRatio = decimal.Parse(data.PriceToBookRatio),
						EvToRevenue = decimal.Parse(data.EVToRevenue),
						EvToEbitda = decimal.Parse(data.EVToEBITDA),
						Beta = decimal.Parse(data.Beta),
						Week52High = decimal.Parse(data.Week52High),
						Week52Low = decimal.Parse(data.Week52Low),
						Day50MovingAverage = decimal.Parse(data.Day50MovingAverage),
						Day200MovingAverage = decimal.Parse(data.Day200MovingAverage),
						SharesOutstanding = long.Parse(data.SharesOutstanding),
						DividendDate = DateTime.Parse(data.DividendDate),
						ExDividendDate = DateTime.Parse(data.ExDividendDate),
					};

				}

				// Add the entity to the context and save changes
				_context.Add(metric);
				await _context.SaveChangesAsync();

				return data.ToString();
			}
			else
			{
				return "API request failed";
			}
		}

	}
}
