import React, { useState, useEffect } from 'react';
import { searchStocksShort } from '../services/stock';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { stockInfo } from '../features/stockSlice';

function StockSearchDropdown() {
    const [searchQuery, setSearchQuery] = useState('');
    const [matchingStocks, setMatchingStocks] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getSearchResults = async () => {
        let response = await searchStocksShort(searchQuery)
        if (response && response['status'] === 200) {
            setMatchingStocks(response.data);
        }
    }
    const showStockInfo = (id)=>{
        dispatch(stockInfo(id))
        navigate(`/stock-info/`)
    }
    useEffect(() => {
        if (searchQuery.length > 0) {
            getSearchResults()
        } else {
            setMatchingStocks([]);
        }
    }, [searchQuery]);

    return (<div className="dropdown">
        <input className="form-control dropdown-toggle" type="search" data-bs-toggle="dropdown"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} />
        <ul className="dropdown-menu">
            {matchingStocks.map(stock => (
                <li><button key={stock.stockId} className="dropdown-item" onClick={()=>showStockInfo(stock.stockId)}>
                    {stock.symbol} - {stock.name}
                </button>
                </li>
            ))}
        </ul>
    </div>);
}

export default StockSearchDropdown;
