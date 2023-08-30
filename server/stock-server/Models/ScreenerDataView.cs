using System;
using System.Collections.Generic;

namespace StockDB.Models
{
    public partial class ScreenerDataView
    {
        public string? Name { get; set; }
        public string Symbol { get; set; } = null!;
        public int? Cik { get; set; }
        public string? Exchange { get; set; }
        public decimal? ClosePrice { get; set; }
        public long? Volume { get; set; }
        public decimal? VolTimesClose { get; set; }
        public long? MarketCapitalization { get; set; }
        public decimal? PeRatio { get; set; }
        public decimal? Eps { get; set; }
        public string? Sector { get; set; }
        public string? Industry { get; set; }
        public long? Ebitda { get; set; }
        public decimal? PegRatio { get; set; }
        public decimal? BookValue { get; set; }
        public decimal? DividendPerShare { get; set; }
        public decimal? DividendYield { get; set; }
        public decimal? ProfitMargin { get; set; }
        public decimal? PriceToSalesRatioTtm { get; set; }
        public decimal? PriceToBookRatio { get; set; }
        public decimal? EvToRevenue { get; set; }
        public decimal? EvToEbitda { get; set; }
        public decimal? Beta { get; set; }
        public decimal? Week52High { get; set; }
        public decimal? Week52Low { get; set; }
        public decimal? Day50MovingAverage { get; set; }
        public decimal? Day200MovingAverage { get; set; }
        public long? SharesOutstanding { get; set; }
        public decimal? RevenuePerShareTtm { get; set; }
        public decimal? OperatingMarginTtm { get; set; }
        public decimal? ReturnOnAssetsTtm { get; set; }
        public decimal? ReturnOnEquityTtm { get; set; }
        public long? RevenueTtm { get; set; }
        public long? GrossProfitTtm { get; set; }
        public decimal? DilutedEpsTtm { get; set; }
        public decimal? QuarterlyEarningsGrowthYoy { get; set; }
        public decimal? QuarterlyRevenueGrowthYoy { get; set; }
        public decimal? AnalystTargetPrice { get; set; }
        public decimal? ForwardPe { get; set; }
    }
}
