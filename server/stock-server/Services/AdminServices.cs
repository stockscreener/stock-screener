using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using stock_server.AlphaVantage;
using StockDB.Data;
using StockDB.Models;
using System.Globalization;

namespace stock_server.Services
{
    public class AdminServices
    {
        private readonly StockContext _context;
        private readonly List<string> stockSymbols = new List<string>
        {
            "AAPL",
            "MSFT",
            "GOOGL",
            "AMZN",
            "BRKB",
            "NVDA",
            "META",
            "TSLA",
            "JNJ",
            "V",
            "XOM",
            "UNH",
            "TSM",
            "WMT",
            "JPM",
            "LLY",
            "NVO",
            "PG",
            "MA",
            "CVX",
            "HD",
            "MRK",
            "KO",
            "ABBV",
            "PEP",
            "AVGO",
            "ORCL",
            "ASML",
            "BAC",
            "AZN",
            "COST",
            "PFE",
            "BABA",
            "NVS",
            "MCD",
            "TMO",
            "SHEL",
            "CRM",
            "NKE",
            "CSCO",
            "ABT",
            "DIS",
            "TM",
            "LIN",
            "ACN",
            "DHR",
            "CMCSA",
            "FMX",
            "TMUS",
            "ADBE",
            "VZ",
            "SAP",
            "TTE",
            "PM",
            "NEE",
            "UPS",
            "WFC",
            "TXN",
            "MS",
            "BHP",
            "NFLX",
            "RTX",
            "AMD",
            "HSBC",
            "BMY",
            "UL",
            "RY",
            "SNY",
            "HON",
            "SBUX",
            "QCOM",
            "HDB",
            "INTC",
            "BUD",
            "AMGN",
            "T",
            "COP",
            "INTU",
            "LOW",
            "BA",
            "MDT",
            "AXP",
            "UNP",
            "SPGI",
            "BP",
            "LMT",
            "PLD",
            "GS",
            "IBM",
            "SYK",
            "CAT",
            "DE",
            "ELV",
            "TD",
            "SONY",
            "GE",
            "ISRG",
            "MDLZ",
            "DEO"
        };
        private readonly List<string> _keys = new List<string>
        {
            "8QWJC3Z232JRDVJ8",
            "BL2Q9LMQFQ4H384T",
            "NXPT05KKJXBVDSTA",
            "JAD0YG93GJ3PUSSZ"
        };
        private int _keyNo = -1;

        public AdminServices(StockContext context)
        {
            _context = context;
        }

        public String getKey()
        {
            _keyNo++;
            if (_keys.Count == 0)
            {
                return "demo";
            }
            if (_keyNo == _keys.Count - 1)
            {
                _keyNo = 0;
            }
            return _keys[_keyNo % _keys.Count];
        }

        public async Task<string> PopulateAllStocksOverview()
        {
            try
            {
                foreach (var symbol in stockSymbols)
                {
                    int retryCount = 0;
                    const int maxRetries = 3; // Retry up to 3 times per symbol

                    while (retryCount < maxRetries)
                    {
                        string key = getKey();

                        if (string.IsNullOrEmpty(key) || key == "demo")
                        {
                            Console.WriteLine("No valid API keys left. Skipping...");
                            return "Done!";  // Stop execution if no keys are available
                        }

                        try
                        {
                            string response = await PopulateDBAsync(symbol, key);

                            // Check if the response contains an API limit error
                            if (response.Contains("Thank you for using Alpha Vantage!") ||
                                response.Contains("API limit reached"))
                            {
                                Console.WriteLine($"API key {key} is rate-limited. Switching to next key...");
                                retryCount++;
                                continue; // Try again with the next key
                            }

                            Console.WriteLine(response);
                            break; // Exit retry loop if successful
                        }
                        catch (HttpRequestException ex)
                        {
                            Console.WriteLine($"HTTP request failed for {symbol}: {ex.Message}");
                            retryCount++;
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Unexpected error for {symbol}: {ex.Message}");
                            retryCount++;
                        }
                    }

                    await Task.Delay(15000);  // Enforce API rate limits (5 requests/min)
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Critical error in PopulateAllStocksOverview: {ex.Message}");
                return "Failure";
            }

            return "Success";
        }

        public async Task<string> PopulateDBAsync(string symbol, string key, int maxRetries = 3)
        {
            HttpClient client = new HttpClient();
            int retryCount = 0;

            while (retryCount < maxRetries)
            {
                HttpResponseMessage response = await client.GetAsync(
                    "https://www.alphavantage.co/query?function=OVERVIEW&symbol="
                        + symbol
                        + "&apikey="
                        + key
                );

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(responseBody);

                    if (responseBody == "{}")
                    {
                        retryCount = maxRetries;
                        Console.WriteLine("Empty response body. Skipping.");
                        continue;
                    }
                    else if (responseBody.Contains("Thank you for using Alpha Vantage!"))
                    {
                        Console.WriteLine("Api Limit Reached");
                        _keys.Remove(key);
                        key = getKey();
                        if (key == null)
                        {
                            return "Failure";
                        }
                        continue;
                    }
                    // Deserialize the JSON response
                    var data = JsonConvert.DeserializeObject<OverviewApiResponse>(responseBody);
                    Console.WriteLine(data);
                    // Now you can populate your database with the fetched data
                    // For example:

                    FinancialMetric metric = null;
                    if (data != null)
                    {
                        Console.WriteLine(data.ToString());
                        var stock = new Stock
                        {
                            Symbol = data.Symbol,
                            AssetType = data.AssetType,
                            Name = data.Name,
                            Description = data.Description,
                            Cik = Int32.Parse(data.CIK),
                            Exchange = data.Exchange,
                            Currency = data.Currency,
                            Country = data.Country,
                            Sector = data.Sector,
                            Industry = data.Industry,
                            Address = data.Address,
                            FiscalYearEnd = data.FiscalYearEnd,
                            IsVisible = 1
                        };
                        Stock dbstock = _context.Stocks.FirstOrDefault(
                            stock => stock.Symbol == symbol
                        );
                        if (dbstock == null)
                        {
                            _context.Stocks.Add(stock);
                            await _context.SaveChangesAsync();
                            dbstock = _context.Stocks.FirstOrDefault(
                                stock => stock.Symbol == symbol
                            );
                        }
                        FinancialMetric existingMetric = _context.FinancialMetrics.FirstOrDefault(
                            fm =>
                                fm.Symbol == symbol
                                && fm.LatestQuarter == ParseDate(data.LatestQuarter)
                        );

                        if (existingMetric == null)
                        {
                            metric = new FinancialMetric
                            {
                                StockId = dbstock.Id,
                                Symbol = data.Symbol,
                                LatestQuarter = ParseDate(data.LatestQuarter),
                                MarketCapitalization = ParseLong(data.MarketCapitalization),
                                Ebitda = ParseLong(data.EBITDA),
                                PeRatio = ParseDecimal(data.PERatio),
                                PegRatio = ParseDecimal(data.PEGRatio),
                                BookValue = ParseDecimal(data.BookValue),
                                DividendPerShare = ParseDecimal(data.DividendPerShare),
                                DividendYield = ParseDecimal(data.DividendYield),
                                Eps = ParseDecimal(data.EPS),
                                RevenuePerShareTtm = ParseDecimal(data.RevenuePerShareTTM),
                                ProfitMargin = ParseDecimal(data.ProfitMargin),
                                OperatingMarginTtm = ParseDecimal(data.OperatingMarginTTM),
                                ReturnOnAssetsTtm = ParseDecimal(data.ReturnOnAssetsTTM),
                                ReturnOnEquityTtm = ParseDecimal(data.ReturnOnEquityTTM),
                                RevenueTtm = ParseLong(data.RevenueTTM),
                                GrossProfitTtm = ParseLong(data.GrossProfitTTM),
                                DilutedEpsTtm = ParseDecimal(data.DilutedEPSTTM),
                                QuarterlyEarningsGrowthYoy = ParseDecimal(
                                    data.QuarterlyEarningsGrowthYOY
                                ),
                                QuarterlyRevenueGrowthYoy = ParseDecimal(
                                    data.QuarterlyRevenueGrowthYOY
                                ),
                                AnalystTargetPrice = ParseDecimal(data.AnalystTargetPrice),
                                TrailingPe = ParseDecimal(data.TrailingPE),
                                ForwardPe = ParseDecimal(data.ForwardPE),
                                PriceToSalesRatioTtm = ParseDecimal(data.PriceToSalesRatioTTM),
                                PriceToBookRatio = ParseDecimal(data.PriceToBookRatio),
                                EvToRevenue = ParseDecimal(data.EVToRevenue),
                                EvToEbitda = ParseDecimal(data.EVToEBITDA),
                                Beta = ParseDecimal(data.Beta),
                                Week52High = ParseDecimal(data.Week52High),
                                Week52Low = ParseDecimal(data.Week52Low),
                                Day50MovingAverage = ParseDecimal(data.Day50MovingAverage),
                                Day200MovingAverage = ParseDecimal(data.Day200MovingAverage),
                                SharesOutstanding = ParseLong(data.SharesOutstanding),
                                DividendDate = ParseDate(data.DividendDate),
                                ExDividendDate = ParseDate(data.ExDividendDate),
                            };
                            _context.FinancialMetrics.Add(metric);
                            await _context.SaveChangesAsync();
                        }
                        return symbol;
                    }
                    else
                    {
                        // Wait for a short duration before retrying
                        await Task.Delay(5000); // Wait for 5 seconds
                        retryCount++;
                    }
                }
            }
            return "Failed";
        }

        public async Task<
            List<(int StockId, string Symbol, string Name, Boolean visible)>
        > GetStockInfoAsync()
        {
            var stockInfoList = await _context.Stocks
                .Select(
                    stock =>
                        new
                        {
                            stock.Id,
                            stock.Symbol,
                            stock.Name,
                            stock.IsVisible
                        }
                )
                .ToListAsync();

            return stockInfoList
                .Select(
                    stock =>
                        (stock.Id, stock.Symbol, stock.Name, stock.IsVisible == 1 ? true : false)
                )
                .ToList();
        }

        public async Task<string> ChangeStockVisibilityAsync(int stockId, bool isVisible)
        {
            try
            {
                var stock = await _context.Stocks.FindAsync(stockId);

                if (stock == null)
                {
                    return "Stock not found";
                }

                stock.IsVisible = (sbyte?)(isVisible ? 1 : 0);
                await _context.SaveChangesAsync();

                return "Success";
            }
            catch (Exception ex)
            {
                // Handle the exception, log details, and provide a user-friendly error message
                Console.WriteLine(ex.ToString());
                return "Failure";
            }
        }

        private DateOnly? ParseDate(string dateStr)
        {
            if (
                DateTime.TryParseExact(
                    dateStr,
                    "yyyy-MM-dd",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out DateTime date
                )
            )
            {
                return new DateOnly(date.Year, date.Month, date.Day);
            }
            return new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
        }

        private long? ParseLong(string value)
        {
            if (value == "None" || string.IsNullOrEmpty(value))
            {
                return null;
            }

            if (long.TryParse(value, out long result))
            {
                return result;
            }

            return null;
        }

        private decimal? ParseDecimal(string value)
        {
            if (value == "None" || string.IsNullOrEmpty(value))
            {
                return null;
            }

            if (decimal.TryParse(value, out decimal result))
            {
                return result;
            }

            return null;
        }
    }
}
