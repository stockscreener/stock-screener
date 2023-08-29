using System;
using System.Collections.Generic;

namespace StockData.Models
{
    public partial class Earning
    {
        public int Id { get; set; }
        public int StockId { get; set; }
        public string Symbol { get; set; } = null!;
        public DateOnly FiscalDateEnding { get; set; }
        public string? FiscalTimeFrame { get; set; }
        public decimal? ReportedEps { get; set; }

        public virtual Stock Stock { get; set; } = null!;
        public virtual Stock SymbolNavigation { get; set; } = null!;
    }
}
