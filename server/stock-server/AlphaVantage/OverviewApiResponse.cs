﻿using Newtonsoft.Json;

namespace stock_server.AlphaVantage
{
	public class OverviewApiResponse
	{
		public string Symbol { get; set; }
		public string AssetType { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string CIK { get; set; }
		public string Exchange { get; set; }
		public string Currency { get; set; }
		public string Country { get; set; }
		public string Sector { get; set; }
		public string Industry { get; set; }
		public string Address { get; set; }
		public string FiscalYearEnd { get; set; }
		public string LatestQuarter { get; set; }
		public string MarketCapitalization { get; set; }
		public string EBITDA { get; set; }
		public string PERatio { get; set; }
		public string PEGRatio { get; set; }
		public string BookValue { get; set; }
		public string DividendPerShare { get; set; }
		public string DividendYield { get; set; }
		public string EPS { get; set; }
		public string RevenuePerShareTTM { get; set; }
		public string ProfitMargin { get; set; }
		public string OperatingMarginTTM { get; set; }
		public string ReturnOnAssetsTTM { get; set; }
		public string ReturnOnEquityTTM { get; set; }
		public string RevenueTTM { get; set; }
		public string GrossProfitTTM { get; set; }
		public string DilutedEPSTTM { get; set; }
		public string QuarterlyEarningsGrowthYOY { get; set; }
		public string QuarterlyRevenueGrowthYOY { get; set; }
		public string AnalystTargetPrice { get; set; }
		public string TrailingPE { get; set; }
		public string ForwardPE { get; set; }
		public string PriceToSalesRatioTTM { get; set; }
		public string PriceToBookRatio { get; set; }
		public string EVToRevenue { get; set; }
		public string EVToEBITDA { get; set; }
		public string Beta { get; set; }
		[JsonProperty("52WeekHigh")]
		public string Week52High { get; set; }
		[JsonProperty("52WeekLow")]
		public string Week52Low { get; set; }
		[JsonProperty("50DayMovingAverage")]
		public string Day50MovingAverage { get; set; }
		[JsonProperty("200DayMovingAverage")]
		public string Day200MovingAverage { get; set; }
		public string SharesOutstanding { get; set; }
		public string DividendDate { get; set; }
		public string ExDividendDate { get; set; }


	}
}
