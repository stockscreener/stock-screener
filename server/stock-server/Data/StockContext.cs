using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using StockDB.Models;

namespace StockDB.Data
{
    public partial class StockContext : DbContext
    {
        public StockContext()
        {
        }

        public StockContext(DbContextOptions<StockContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BalanceSheet> BalanceSheets { get; set; } = null!;
        public virtual DbSet<CashFlow> CashFlows { get; set; } = null!;
        public virtual DbSet<DailyStockPrice> DailyStockPrices { get; set; } = null!;
        public virtual DbSet<Earning> Earnings { get; set; } = null!;
        public virtual DbSet<FinancialMetric> FinancialMetrics { get; set; } = null!;
        public virtual DbSet<IncomeStatement> IncomeStatements { get; set; } = null!;
        public virtual DbSet<ScreenerDataView> ScreenerDataViews { get; set; } = null!;
        public virtual DbSet<Stock> Stocks { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<BalanceSheet>(entity =>
            {
                entity.ToTable("balance_sheets");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.HasIndex(e => new { e.Symbol, e.FiscalDateEnding }, "symbol_dt_ending")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccumulatedDepreciationAmortizationPpe).HasColumnName("accumulated_depreciation_amortization_ppe");

                entity.Property(e => e.CapitalLeaseObligations).HasColumnName("capital_lease_obligations");

                entity.Property(e => e.CashAndCashEquivalentsAtCarryingValue).HasColumnName("cash_and_cash_equivalents_at_carrying_value");

                entity.Property(e => e.CashAndShortTermInvestments).HasColumnName("cash_and_short_term_investments");

                entity.Property(e => e.CommonStock).HasColumnName("common_stock");

                entity.Property(e => e.CommonStockSharesOutstanding).HasColumnName("common_stock_shares_outstanding");

                entity.Property(e => e.CurrentAccountsPayable).HasColumnName("current_accounts_payable");

                entity.Property(e => e.CurrentDebt).HasColumnName("current_debt");

                entity.Property(e => e.CurrentLongTermDebt).HasColumnName("current_long_term_debt");

                entity.Property(e => e.CurrentNetReceivables).HasColumnName("current_net_receivables");

                entity.Property(e => e.DeferredRevenue).HasColumnName("deferred_revenue");

                entity.Property(e => e.FiscalDateEnding).HasColumnName("fiscal_date_ending");

                entity.Property(e => e.FiscalTimeFrame)
                    .HasColumnType("enum('ANNUAL','QUARTERLY')")
                    .HasColumnName("fiscal_time_frame");

                entity.Property(e => e.Goodwill).HasColumnName("goodwill");

                entity.Property(e => e.IntangibleAssets).HasColumnName("intangible_assets");

                entity.Property(e => e.IntangibleAssetsExcludingGoodwill).HasColumnName("intangible_assets_excluding_goodwill");

                entity.Property(e => e.Inventory).HasColumnName("inventory");

                entity.Property(e => e.Investments).HasColumnName("investments");

                entity.Property(e => e.LongTermDebt).HasColumnName("long_term_debt");

                entity.Property(e => e.LongTermDebtNoncurrent).HasColumnName("long_term_debt_noncurrent");

                entity.Property(e => e.LongTermInvestments).HasColumnName("long_term_investments");

                entity.Property(e => e.OtherCurrentAssets).HasColumnName("other_current_assets");

                entity.Property(e => e.OtherCurrentLiabilities).HasColumnName("other_current_liabilities");

                entity.Property(e => e.OtherNonCurrentAssets).HasColumnName("other_non_current_assets");

                entity.Property(e => e.OtherNonCurrentLiabilities).HasColumnName("other_non_current_liabilities");

                entity.Property(e => e.PropertyPlantEquipment).HasColumnName("property_plant_equipment");

                entity.Property(e => e.ReportedCurrency)
                    .HasMaxLength(20)
                    .HasColumnName("reported_currency");

                entity.Property(e => e.RetainedEarnings).HasColumnName("retained_earnings");

                entity.Property(e => e.ShortLongTermDebtTotal).HasColumnName("short_long_term_debt_total");

                entity.Property(e => e.ShortTermDebt).HasColumnName("short_term_debt");

                entity.Property(e => e.ShortTermInvestments).HasColumnName("short_term_investments");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.Symbol)
                    .HasMaxLength(10)
                    .HasColumnName("symbol");

                entity.Property(e => e.TotalAssets).HasColumnName("total_assets");

                entity.Property(e => e.TotalCurrentAssets).HasColumnName("total_current_assets");

                entity.Property(e => e.TotalCurrentLiabilities).HasColumnName("total_current_liabilities");

                entity.Property(e => e.TotalLiabilities).HasColumnName("total_liabilities");

                entity.Property(e => e.TotalNonCurrentAssets).HasColumnName("total_non_current_assets");

                entity.Property(e => e.TotalNonCurrentLiabilities).HasColumnName("total_non_current_liabilities");

                entity.Property(e => e.TotalShareholderEquity).HasColumnName("total_shareholder_equity");

                entity.Property(e => e.TreasuryStock).HasColumnName("treasury_stock");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.BalanceSheetStocks)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("balance_sheets_ibfk_1");

                entity.HasOne(d => d.SymbolNavigation)
                    .WithMany(p => p.BalanceSheetSymbolNavigations)
                    .HasPrincipalKey(p => p.Symbol)
                    .HasForeignKey(d => d.Symbol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("balance_sheets_ibfk_2");
            });

            modelBuilder.Entity<CashFlow>(entity =>
            {
                entity.ToTable("cash_flows");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.HasIndex(e => new { e.Symbol, e.FiscalDateEnding }, "symbol_dt_ending")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CapitalExpenditures).HasColumnName("capital_expenditures");

                entity.Property(e => e.CashflowFromFinancing).HasColumnName("cashflow_from_financing");

                entity.Property(e => e.CashflowFromInvestment).HasColumnName("cashflow_from_investment");

                entity.Property(e => e.ChangeInCashAndCashEquivalents).HasColumnName("change_in_cash_and_cash_equivalents");

                entity.Property(e => e.ChangeInExchangeRate).HasColumnName("change_in_exchange_rate");

                entity.Property(e => e.ChangeInInventory).HasColumnName("change_in_inventory");

                entity.Property(e => e.ChangeInOperatingAssets).HasColumnName("change_in_operating_assets");

                entity.Property(e => e.ChangeInOperatingLiabilities).HasColumnName("change_in_operating_liabilities");

                entity.Property(e => e.ChangeInReceivables).HasColumnName("change_in_receivables");

                entity.Property(e => e.DepreciationDepletionAndAmortization).HasColumnName("depreciation_depletion_and_amortization");

                entity.Property(e => e.DividendPayout).HasColumnName("dividend_payout");

                entity.Property(e => e.DividendPayoutCommonStock).HasColumnName("dividend_payout_common_stock");

                entity.Property(e => e.DividendPayoutPreferredStock).HasColumnName("dividend_payout_preferred_stock");

                entity.Property(e => e.FiscalDateEnding).HasColumnName("fiscal_date_ending");

                entity.Property(e => e.FiscalTimeFrame)
                    .HasColumnType("enum('ANNUAL','QUARTERLY')")
                    .HasColumnName("fiscal_time_frame");

                entity.Property(e => e.NetIncome).HasColumnName("net_income");

                entity.Property(e => e.OperatingCashflow).HasColumnName("operating_cashflow");

                entity.Property(e => e.PaymentsForOperatingActivities).HasColumnName("payments_for_operating_activities");

                entity.Property(e => e.PaymentsForRepurchaseOfCommonStock).HasColumnName("payments_for_repurchase_of_common_stock");

                entity.Property(e => e.PaymentsForRepurchaseOfEquity).HasColumnName("payments_for_repurchase_of_equity");

                entity.Property(e => e.PaymentsForRepurchaseOfPreferredStock).HasColumnName("payments_for_repurchase_of_preferred_stock");

                entity.Property(e => e.PfiOfCommonStock).HasColumnName("pfi_of_common_stock");

                entity.Property(e => e.PfiOfLongTermDebtAndCapitalSecuritiesNet).HasColumnName("pfi_of_long_term_debt_and_capital_securities_net");

                entity.Property(e => e.PfiOfPreferredStock).HasColumnName("pfi_of_preferred_stock");

                entity.Property(e => e.ProceedsFromOperatingActivities).HasColumnName("proceeds_from_operating_activities");

                entity.Property(e => e.ProceedsFromRepaymentsOfShortTermDebt).HasColumnName("proceeds_from_repayments_of_short_term_debt");

                entity.Property(e => e.ProceedsFromRepurchaseOfEquity).HasColumnName("proceeds_from_repurchase_of_equity");

                entity.Property(e => e.ProceedsFromSaleOfTreasuryStock).HasColumnName("proceeds_from_sale_of_treasury_stock");

                entity.Property(e => e.ProfitLoss).HasColumnName("profit_loss");

                entity.Property(e => e.ReportedCurrency)
                    .HasMaxLength(20)
                    .HasColumnName("reported_currency");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.Symbol)
                    .HasMaxLength(10)
                    .HasColumnName("symbol");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.CashFlowStocks)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("cash_flows_ibfk_1");

                entity.HasOne(d => d.SymbolNavigation)
                    .WithMany(p => p.CashFlowSymbolNavigations)
                    .HasPrincipalKey(p => p.Symbol)
                    .HasForeignKey(d => d.Symbol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("cash_flows_ibfk_2");
            });

            modelBuilder.Entity<DailyStockPrice>(entity =>
            {
                entity.ToTable("daily_stock_prices");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.HasIndex(e => new { e.Symbol, e.DailyDate }, "symbol_date")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ClosePrice)
                    .HasPrecision(20, 4)
                    .HasColumnName("close_price");

                entity.Property(e => e.DailyDate).HasColumnName("daily_date");

                entity.Property(e => e.HighPrice)
                    .HasPrecision(20, 4)
                    .HasColumnName("high_price");

                entity.Property(e => e.LowPrice)
                    .HasPrecision(20, 4)
                    .HasColumnName("low_price");

                entity.Property(e => e.OpenPrice)
                    .HasPrecision(20, 4)
                    .HasColumnName("open_price");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.Symbol)
                    .HasMaxLength(10)
                    .HasColumnName("symbol");

                entity.Property(e => e.Volume).HasColumnName("volume");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.DailyStockPriceStocks)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("daily_stock_prices_ibfk_1");

                entity.HasOne(d => d.SymbolNavigation)
                    .WithMany(p => p.DailyStockPriceSymbolNavigations)
                    .HasPrincipalKey(p => p.Symbol)
                    .HasForeignKey(d => d.Symbol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("daily_stock_prices_ibfk_2");
            });

            modelBuilder.Entity<Earning>(entity =>
            {
                entity.ToTable("earnings");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.HasIndex(e => new { e.Symbol, e.FiscalDateEnding }, "symbol_dt_ending")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FiscalDateEnding).HasColumnName("fiscal_date_ending");

                entity.Property(e => e.FiscalTimeFrame)
                    .HasColumnType("enum('ANNUAL','QUARTERLY')")
                    .HasColumnName("fiscal_time_frame");

                entity.Property(e => e.ReportedEps)
                    .HasPrecision(10, 2)
                    .HasColumnName("reported_eps");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.Symbol)
                    .HasMaxLength(10)
                    .HasColumnName("symbol");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.EarningStocks)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("earnings_ibfk_1");

                entity.HasOne(d => d.SymbolNavigation)
                    .WithMany(p => p.EarningSymbolNavigations)
                    .HasPrincipalKey(p => p.Symbol)
                    .HasForeignKey(d => d.Symbol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("earnings_ibfk_2");
            });

            modelBuilder.Entity<FinancialMetric>(entity =>
            {
                entity.ToTable("financial_metrics");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.HasIndex(e => new { e.Symbol, e.LatestQuarter }, "symbol_lts_quarter_dt")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AnalystTargetPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("analyst_target_price");

                entity.Property(e => e.Beta)
                    .HasPrecision(10, 3)
                    .HasColumnName("beta");

                entity.Property(e => e.BookValue)
                    .HasPrecision(20, 2)
                    .HasColumnName("book_value");

                entity.Property(e => e.Day200MovingAverage)
                    .HasPrecision(10, 2)
                    .HasColumnName("day_200_moving_average");

                entity.Property(e => e.Day50MovingAverage)
                    .HasPrecision(10, 2)
                    .HasColumnName("day_50_moving_average");

                entity.Property(e => e.DilutedEpsTtm)
                    .HasPrecision(10, 2)
                    .HasColumnName("diluted_eps_ttm");

                entity.Property(e => e.DividendDate).HasColumnName("dividend_date");

                entity.Property(e => e.DividendPerShare)
                    .HasPrecision(10, 2)
                    .HasColumnName("dividend_per_share");

                entity.Property(e => e.DividendYield)
                    .HasPrecision(10, 4)
                    .HasColumnName("dividend_yield");

                entity.Property(e => e.Ebitda).HasColumnName("ebitda");

                entity.Property(e => e.Eps)
                    .HasPrecision(10, 3)
                    .HasColumnName("eps");

                entity.Property(e => e.EvToEbitda)
                    .HasPrecision(10, 2)
                    .HasColumnName("ev_to_ebitda");

                entity.Property(e => e.EvToRevenue)
                    .HasPrecision(10, 3)
                    .HasColumnName("ev_to_revenue");

                entity.Property(e => e.ExDividendDate).HasColumnName("ex_dividend_date");

                entity.Property(e => e.ForwardPe)
                    .HasPrecision(10, 2)
                    .HasColumnName("forward_pe");

                entity.Property(e => e.GrossProfitTtm).HasColumnName("gross_profit_ttm");

                entity.Property(e => e.LatestQuarter).HasColumnName("latest_quarter");

                entity.Property(e => e.MarketCapitalization).HasColumnName("market_capitalization");

                entity.Property(e => e.OperatingMarginTtm)
                    .HasPrecision(10, 3)
                    .HasColumnName("operating_margin_ttm");

                entity.Property(e => e.PeRatio)
                    .HasPrecision(10, 2)
                    .HasColumnName("pe_ratio");

                entity.Property(e => e.PegRatio)
                    .HasPrecision(10, 3)
                    .HasColumnName("peg_ratio");

                entity.Property(e => e.PriceToBookRatio)
                    .HasPrecision(10, 2)
                    .HasColumnName("price_to_book_ratio");

                entity.Property(e => e.PriceToSalesRatioTtm)
                    .HasPrecision(10, 3)
                    .HasColumnName("price_to_sales_ratio_ttm");

                entity.Property(e => e.ProfitMargin)
                    .HasPrecision(10, 4)
                    .HasColumnName("profit_margin");

                entity.Property(e => e.QuarterlyEarningsGrowthYoy)
                    .HasPrecision(10, 3)
                    .HasColumnName("quarterly_earnings_growth_yoy");

                entity.Property(e => e.QuarterlyRevenueGrowthYoy)
                    .HasPrecision(10, 3)
                    .HasColumnName("quarterly_revenue_growth_yoy");

                entity.Property(e => e.ReturnOnAssetsTtm)
                    .HasPrecision(10, 4)
                    .HasColumnName("return_on_assets_ttm");

                entity.Property(e => e.ReturnOnEquityTtm)
                    .HasPrecision(10, 2)
                    .HasColumnName("return_on_equity_ttm");

                entity.Property(e => e.RevenuePerShareTtm)
                    .HasPrecision(10, 2)
                    .HasColumnName("revenue_per_share_ttm");

                entity.Property(e => e.RevenueTtm).HasColumnName("revenue_ttm");

                entity.Property(e => e.SharesOutstanding).HasColumnName("shares_outstanding");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.Symbol)
                    .HasMaxLength(10)
                    .HasColumnName("symbol");

                entity.Property(e => e.TrailingPe)
                    .HasPrecision(10, 2)
                    .HasColumnName("trailing_pe");

                entity.Property(e => e.Week52High)
                    .HasPrecision(10, 2)
                    .HasColumnName("week_52_high");

                entity.Property(e => e.Week52Low)
                    .HasPrecision(10, 2)
                    .HasColumnName("week_52_low");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.FinancialMetricStocks)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("financial_metrics_ibfk_1");

                entity.HasOne(d => d.SymbolNavigation)
                    .WithMany(p => p.FinancialMetricSymbolNavigations)
                    .HasPrincipalKey(p => p.Symbol)
                    .HasForeignKey(d => d.Symbol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("financial_metrics_ibfk_2");
            });

            modelBuilder.Entity<IncomeStatement>(entity =>
            {
                entity.ToTable("income_statements");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.HasIndex(e => new { e.Symbol, e.FiscalDateEnding }, "symbol_fiscal_dt_ending")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ComprehensiveIncomeNetOfTax).HasColumnName("comprehensive_income_net_of_tax");

                entity.Property(e => e.CostOfGoodsAndServicesSold).HasColumnName("cost_of_goods_and_services_sold");

                entity.Property(e => e.CostOfRevenue).HasColumnName("cost_of_revenue");

                entity.Property(e => e.Depreciation).HasColumnName("depreciation");

                entity.Property(e => e.DepreciationAndAmortization).HasColumnName("depreciation_and_amortization");

                entity.Property(e => e.Ebit).HasColumnName("ebit");

                entity.Property(e => e.Ebitda).HasColumnName("ebitda");

                entity.Property(e => e.FiscalDateEnding).HasColumnName("fiscal_date_ending");

                entity.Property(e => e.FiscalTimeFrame)
                    .HasColumnType("enum('ANNUAL','QUARTERLY')")
                    .HasColumnName("fiscal_time_frame");

                entity.Property(e => e.GrossProfit).HasColumnName("gross_profit");

                entity.Property(e => e.IncomeBeforeTax).HasColumnName("income_before_tax");

                entity.Property(e => e.IncomeTaxExpense).HasColumnName("income_tax_expense");

                entity.Property(e => e.InterestAndDebtExpense).HasColumnName("interest_and_debt_expense");

                entity.Property(e => e.InterestExpense).HasColumnName("interest_expense");

                entity.Property(e => e.InterestIncome).HasColumnName("interest_income");

                entity.Property(e => e.InvestmentIncomeNet).HasColumnName("investment_income_net");

                entity.Property(e => e.NetIncome).HasColumnName("net_income");

                entity.Property(e => e.NetIncomeFromContinuingOperations).HasColumnName("net_income_from_continuing_operations");

                entity.Property(e => e.NetInterestIncome).HasColumnName("net_interest_income");

                entity.Property(e => e.NonInterestIncome).HasColumnName("non_interest_income");

                entity.Property(e => e.OperatingExpenses).HasColumnName("operating_expenses");

                entity.Property(e => e.OperatingIncome).HasColumnName("operating_income");

                entity.Property(e => e.OtherNonOperatingIncome).HasColumnName("other_non_operating_income");

                entity.Property(e => e.ReportedCurrency)
                    .HasMaxLength(20)
                    .HasColumnName("reported_currency");

                entity.Property(e => e.ResearchAndDevelopment).HasColumnName("research_and_development");

                entity.Property(e => e.SellingGeneralAndAdministrative).HasColumnName("selling_general_and_administrative");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.Symbol)
                    .HasMaxLength(10)
                    .HasColumnName("symbol");

                entity.Property(e => e.TotalRevenue).HasColumnName("total_revenue");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.IncomeStatementStocks)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("income_statements_ibfk_1");

                entity.HasOne(d => d.SymbolNavigation)
                    .WithMany(p => p.IncomeStatementSymbolNavigations)
                    .HasPrincipalKey(p => p.Symbol)
                    .HasForeignKey(d => d.Symbol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("income_statements_ibfk_2");
            });

            modelBuilder.Entity<ScreenerDataView>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("screener_data_view");

                entity.Property(e => e.AnalystTargetPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("analyst_target_price");

                entity.Property(e => e.Beta)
                    .HasPrecision(10, 3)
                    .HasColumnName("beta");

                entity.Property(e => e.BookValue)
                    .HasPrecision(20, 2)
                    .HasColumnName("book_value");

                entity.Property(e => e.Cik).HasColumnName("cik");

                entity.Property(e => e.ClosePrice)
                    .HasPrecision(20, 4)
                    .HasColumnName("close_price");

                entity.Property(e => e.Day200MovingAverage)
                    .HasPrecision(10, 2)
                    .HasColumnName("day_200_moving_average");

                entity.Property(e => e.Day50MovingAverage)
                    .HasPrecision(10, 2)
                    .HasColumnName("day_50_moving_average");

                entity.Property(e => e.DilutedEpsTtm)
                    .HasPrecision(10, 2)
                    .HasColumnName("diluted_eps_ttm");

                entity.Property(e => e.DividendPerShare)
                    .HasPrecision(10, 2)
                    .HasColumnName("dividend_per_share");

                entity.Property(e => e.DividendYield)
                    .HasPrecision(10, 4)
                    .HasColumnName("dividend_yield");

                entity.Property(e => e.Ebitda).HasColumnName("ebitda");

                entity.Property(e => e.Eps)
                    .HasPrecision(10, 3)
                    .HasColumnName("eps");

                entity.Property(e => e.EvToEbitda)
                    .HasPrecision(10, 2)
                    .HasColumnName("ev_to_ebitda");

                entity.Property(e => e.EvToRevenue)
                    .HasPrecision(10, 3)
                    .HasColumnName("ev_to_revenue");

                entity.Property(e => e.Exchange)
                    .HasMaxLength(20)
                    .HasColumnName("exchange");

                entity.Property(e => e.ForwardPe)
                    .HasPrecision(10, 2)
                    .HasColumnName("forward_pe");

                entity.Property(e => e.GrossProfitTtm).HasColumnName("gross_profit_ttm");

                entity.Property(e => e.Industry)
                    .HasMaxLength(255)
                    .HasColumnName("industry");

                entity.Property(e => e.MarketCapitalization).HasColumnName("market_capitalization");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.OperatingMarginTtm)
                    .HasPrecision(10, 3)
                    .HasColumnName("operating_margin_ttm");

                entity.Property(e => e.PeRatio)
                    .HasPrecision(10, 2)
                    .HasColumnName("pe_ratio");

                entity.Property(e => e.PegRatio)
                    .HasPrecision(10, 3)
                    .HasColumnName("peg_ratio");

                entity.Property(e => e.PriceToBookRatio)
                    .HasPrecision(10, 2)
                    .HasColumnName("price_to_book_ratio");

                entity.Property(e => e.PriceToSalesRatioTtm)
                    .HasPrecision(10, 3)
                    .HasColumnName("price_to_sales_ratio_ttm");

                entity.Property(e => e.ProfitMargin)
                    .HasPrecision(10, 4)
                    .HasColumnName("profit_margin");

                entity.Property(e => e.QuarterlyEarningsGrowthYoy)
                    .HasPrecision(10, 3)
                    .HasColumnName("quarterly_earnings_growth_yoy");

                entity.Property(e => e.QuarterlyRevenueGrowthYoy)
                    .HasPrecision(10, 3)
                    .HasColumnName("quarterly_revenue_growth_yoy");

                entity.Property(e => e.ReturnOnAssetsTtm)
                    .HasPrecision(10, 4)
                    .HasColumnName("return_on_assets_ttm");

                entity.Property(e => e.ReturnOnEquityTtm)
                    .HasPrecision(10, 2)
                    .HasColumnName("return_on_equity_ttm");

                entity.Property(e => e.RevenuePerShareTtm)
                    .HasPrecision(10, 2)
                    .HasColumnName("revenue_per_share_ttm");

                entity.Property(e => e.RevenueTtm).HasColumnName("revenue_ttm");

                entity.Property(e => e.Sector)
                    .HasMaxLength(100)
                    .HasColumnName("sector");

                entity.Property(e => e.SharesOutstanding).HasColumnName("shares_outstanding");

                entity.Property(e => e.Symbol)
                    .HasMaxLength(10)
                    .HasColumnName("symbol");

                entity.Property(e => e.VolTimesClose)
                    .HasPrecision(39, 4)
                    .HasColumnName("vol_times_close");

                entity.Property(e => e.Volume).HasColumnName("volume");

                entity.Property(e => e.Week52High)
                    .HasPrecision(10, 2)
                    .HasColumnName("week_52_high");

                entity.Property(e => e.Week52Low)
                    .HasPrecision(10, 2)
                    .HasColumnName("week_52_low");
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.ToTable("stocks");

                entity.HasIndex(e => e.Cik, "cik")
                    .IsUnique();

                entity.HasIndex(e => e.Symbol, "symbol")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");

                entity.Property(e => e.AssetType)
                    .HasMaxLength(50)
                    .HasColumnName("asset_type");

                entity.Property(e => e.Cik).HasColumnName("cik");

                entity.Property(e => e.Country)
                    .HasMaxLength(20)
                    .HasColumnName("country");

                entity.Property(e => e.Currency)
                    .HasMaxLength(20)
                    .HasColumnName("currency");

                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasColumnName("description");

                entity.Property(e => e.Exchange)
                    .HasMaxLength(20)
                    .HasColumnName("exchange");

                entity.Property(e => e.FiscalYearEnd)
                    .HasMaxLength(20)
                    .HasColumnName("fiscal_year_end");

                entity.Property(e => e.Industry)
                    .HasMaxLength(255)
                    .HasColumnName("industry");

                entity.Property(e => e.IsVisible).HasColumnName("is_visible");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Sector)
                    .HasMaxLength(100)
                    .HasColumnName("sector");

                entity.Property(e => e.Symbol)
                    .HasMaxLength(10)
                    .HasColumnName("symbol");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
