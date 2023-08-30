using System;
using System.Collections.Generic;

namespace StockDB.Models
{
    public partial class DailyStockPrice
    {
        public int Id { get; set; }
        public int StockId { get; set; }
        public DateOnly DailyDate { get; set; }
        public string Symbol { get; set; } = null!;
        public decimal? OpenPrice { get; set; }
        public decimal? HighPrice { get; set; }
        public decimal? LowPrice { get; set; }
        public decimal? ClosePrice { get; set; }
        public long? Volume { get; set; }

        public virtual Stock Stock { get; set; } = null!;
        public virtual Stock SymbolNavigation { get; set; } = null!;
    }
}
