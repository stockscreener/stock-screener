using System;
using System.Collections.Generic;

namespace StockData.Models
{
    public partial class Stock
    {
        public Stock()
        {
            BalanceSheetStocks = new HashSet<BalanceSheet>();
            BalanceSheetSymbolNavigations = new HashSet<BalanceSheet>();
            CashFlowStocks = new HashSet<CashFlow>();
            CashFlowSymbolNavigations = new HashSet<CashFlow>();
            DailyStockPriceStocks = new HashSet<DailyStockPrice>();
            DailyStockPriceSymbolNavigations = new HashSet<DailyStockPrice>();
            EarningStocks = new HashSet<Earning>();
            EarningSymbolNavigations = new HashSet<Earning>();
            FinancialMetricStocks = new HashSet<FinancialMetric>();
            FinancialMetricSymbolNavigations = new HashSet<FinancialMetric>();
            IncomeStatementStocks = new HashSet<IncomeStatement>();
            IncomeStatementSymbolNavigations = new HashSet<IncomeStatement>();
        }

        public int Id { get; set; }
        public string Symbol { get; set; } = null!;
        public string? AssetType { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? Cik { get; set; }
        public string? Exchange { get; set; }
        public string? Currency { get; set; }
        public string? Country { get; set; }
        public string? Sector { get; set; }
        public string? Industry { get; set; }
        public string? Address { get; set; }
        public string? FiscalYearEnd { get; set; }
        public sbyte? IsVisible { get; set; }

        public virtual ICollection<BalanceSheet> BalanceSheetStocks { get; set; }
        public virtual ICollection<BalanceSheet> BalanceSheetSymbolNavigations { get; set; }
        public virtual ICollection<CashFlow> CashFlowStocks { get; set; }
        public virtual ICollection<CashFlow> CashFlowSymbolNavigations { get; set; }
        public virtual ICollection<DailyStockPrice> DailyStockPriceStocks { get; set; }
        public virtual ICollection<DailyStockPrice> DailyStockPriceSymbolNavigations { get; set; }
        public virtual ICollection<Earning> EarningStocks { get; set; }
        public virtual ICollection<Earning> EarningSymbolNavigations { get; set; }
        public virtual ICollection<FinancialMetric> FinancialMetricStocks { get; set; }
        public virtual ICollection<FinancialMetric> FinancialMetricSymbolNavigations { get; set; }
        public virtual ICollection<IncomeStatement> IncomeStatementStocks { get; set; }
        public virtual ICollection<IncomeStatement> IncomeStatementSymbolNavigations { get; set; }
    }
}
