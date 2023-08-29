import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { log } from '../utils/logger';


function Screener() {
    const [rowData, setRowData] = React.useState([]); // Initialize rows as an empty array  
    
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'Name', headerName: 'Name', width: 200 },
      { field: 'Symbol', headerName: 'Symbol', width: 120 },
      { field: 'close', headerName: 'CMP', width: 120 },
      { field: 'MarketCapitalization', headerName: 'Market Capitalization', width: 180 },
      { field: 'PERatio', headerName: 'PE Ratio', width: 120 },
      { field: 'PriceToBookRatio', headerName: 'Price to Book Ratio', width: 180 },
      { field: 'PEGRatio', headerName: 'PEG Ratio', width: 120 },
      { field: 'BookValue', headerName: 'Book Value', width: 120 },
      { field: 'DividendPerShare', headerName: 'Dividend Per Share', width: 180 },
      { field: 'DividendYield', headerName: 'Dividend Yield', width: 150 },
      { field: 'EPS', headerName: 'EPS', width: 120 },
      { field: '50DayMovingAverage', headerName: '50 Day Moving Average', width: 200 },
      { field: '200DayMovingAverage', headerName: '200 Day Moving Average', width: 200 },
      { field: '52WeekLow', headerName: '52 Week Low', width: 150 },
      { field: '52WeekHigh', headerName: '52 Week High', width: 150 },
      { field: 'Sector', headerName: 'Sector', width: 150 },
      { field: 'Industry', headerName: 'Industry', width: 150 },
      { field: 'EBITDA', headerName: 'EBITDA', width: 120 },
      { field: 'RevenuePerShareTTM', headerName: 'Revenue Per Share TTM', width: 200 },
      { field: 'ProfitMargin', headerName: 'Profit Margin', width: 150 },
      { field: 'OperatingMarginTTM', headerName: 'Operating Margin TTM', width: 200 },
      { field: 'ReturnOnAssetsTTM', headerName: 'Return on Assets TTM', width: 200 },
      { field: 'ReturnOnEquityTTM', headerName: 'Return on Equity TTM', width: 200 },
      { field: 'RevenueTTM', headerName: 'Revenue TTM', width: 150 },
      { field: 'GrossProfitTTM', headerName: 'Gross Profit TTM', width: 200 },
      { field: 'DilutedEPSTTM', headerName: 'Diluted EPS TTM', width: 180 },
      { field: 'QuarterlyEarningsGrowthYOY', headerName: 'Quarterly Earnings Growth YOY', width: 250 },
      { field: 'QuarterlyRevenueGrowthYOY', headerName: 'Quarterly Revenue Growth YOY', width: 250 },
      { field: 'AnalystTargetPrice', headerName: 'Analyst Target Price', width: 200 },
      { field: 'TrailingPE', headerName: 'Trailing PE', width: 150 },
      { field: 'ForwardPE', headerName: 'Forward PE', width: 150 },
      { field: 'PriceToSalesRatioTTM', headerName: 'Price to Sales Ratio TTM', width: 250 },
      { field: 'EVToRevenue', headerName: 'EV to Revenue', width: 180 },
      { field: 'EVToEBITDA', headerName: 'EV to EBITDA', width: 180 },
      { field: 'Beta', headerName: 'Beta', width: 120 },
      { field: 'SharesOutstanding', headerName: 'Shares Outstanding', width: 200 },
      { field: 'DividendDate', headerName: 'Dividend Date', width: 150 },
      { field: 'ExDividendDate', headerName: 'Ex-Dividend Date', width: 180 },
      { field: 'CIK', headerName: 'CIK', width: 120 },
      { field: 'Exchange', headerName: 'Exchange', width: 120 },
      { field: 'Currency', headerName: 'Currency', width: 120 },
      { field: 'FiscalYearEnd', headerName: 'Fiscal Year End', width: 150 },
      { field: 'LatestQuarter', headerName: 'Latest Quarter', width: 150 },
  ];
  
    // Function to fetch data and update the rows state
    React.useEffect(() => {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
      fetch('https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo')
      //fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo')
        .then((response) => response.json())
        .then((data) => {
          // Create an array with a single item, which is the data object
          const dataArr = [data];
          data.id = 1
          setRowData([data]);

          log(data); 
          
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []); // The empty dependency array ensures this effect runs only once, like componentDidMount

    return (
      <div style={{ height: 1000, width: '100%' }}>
        <DataGrid
          rows={rowData}
          columns={columns}  
              
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          //checkboxSelection
        /> 
      </div>
    );
  }

export default Screener;
