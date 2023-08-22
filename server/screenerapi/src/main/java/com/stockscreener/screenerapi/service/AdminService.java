package com.stockscreener.screenerapi.service;


import com.stockscreener.screenerapi.dto.StockAttributesDTO;
import com.stockscreener.screenerapi.dto.StocksListDTO;

import java.util.List;

public interface AdminService {

	List<StocksListDTO> getAllStocks(Long adminId);

	List<StocksListDTO> updateVisibleStocks(List<StocksListDTO> stocks);

	List<StockAttributesDTO> getAllStockAttributes(Long adminId);

	List<StockAttributesDTO> updateVisibleStockAttributes(List<StockAttributesDTO> stockAttributes);
	
}
