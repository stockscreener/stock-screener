import React, { useState, useEffect } from 'react';
import { log } from '../utils/logger';
import { searchStocksShort } from '../services/stock';

function StockSearchDropdown() {
    const [searchQuery, setSearchQuery] = useState('');
    const [matchingStocks, setMatchingStocks] = useState([]);
    useEffect(() => {
        if (searchQuery.length > 0) {
            searchStocksShort(searchQuery)
                .then(response => {
                    setMatchingStocks(response.data);
                })
                .catch(error => {
                    log.error(error);
                });
        } else {
            setMatchingStocks([]);
        }
    }, [searchQuery]);

    return (<div class="dropdown">
        <input class="form-control dropdown-toggle" type="search" data-bs-toggle="dropdown" aria-expanded="false"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} />
        <ul class="dropdown-menu">
            {matchingStocks.map(stock => (
                <li><a key={stock.stockId} className="dropdown-item" href="#">
                    {stock.symbol} - {stock.name}
                </a>
                </li>
            ))}
        </ul>
    </div>);
}

export default StockSearchDropdown;
