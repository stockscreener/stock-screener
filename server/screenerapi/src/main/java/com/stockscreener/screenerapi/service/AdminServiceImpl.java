package com.stockscreener.screenerapi.service;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stockscreener.screenerapi.dto.StockAttributesDTO;
import com.stockscreener.screenerapi.dto.StocksListDTO;
import com.stockscreener.screenerapi.repository.StockAttributeRepository;

import lombok.*;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{
	
	@Autowired 
	private RestTemplate restTemplate;
	
	@Autowired
	private StockAttributeRepository stockAttributeRepository;
	
	@Autowired
	private ModelMapper mapper;

	@Value("${stock.api.url}")
	private String stockApiUrl;
	
	@Override
	public List<StocksListDTO> getAllStocks(Long adminId) {
//		System.out.println( restTemplate.getForObject(stockApiUrl, ApiResp.class));
		return null;
	}

	@Override
	public List<StocksListDTO> updateVisibleStocks(List<StocksListDTO> stocks) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<StockAttributesDTO> getAllStockAttributes(Long adminId) {
		return stockAttributeRepository.findAll().stream()
				.map((attribute)->mapper.map(attribute, StockAttributesDTO.class))
				.toList();
	}

	@Override
	public List<StockAttributesDTO> updateVisibleStockAttributes(List<StockAttributesDTO> stockAttributes) {
		return stockAttributeRepository.findAll().stream()
				.map((stockAttribute)-> mapper.map(stockAttributes, StockAttributesDTO.class))
				.toList();
	}
	
	
}
//@Getter
//@Setter
//@ToString
//class ApiResp{
//	private Long page;
//	@JsonProperty(value = "per_page")
//	private Integer perPage;
//	private Integer total;
//}