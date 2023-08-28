package com.stockscreener.screenerapi.service;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stockscreener.screenerapi.dto.StockAttributesDTO;
import com.stockscreener.screenerapi.dto.StocksListDTO;
import com.stockscreener.screenerapi.entity.StockAttributeEntity;
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
	public List<StockAttributesDTO> getAllStockAttributes() {
		return stockAttributeRepository.findAll().stream()
				.map((attribute)->mapper.map(attribute, StockAttributesDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<StockAttributesDTO> updateVisibleStockAttributes(List<StockAttributesDTO> stockAttributes) {
		List<StockAttributeEntity> allAttributes = stockAttributeRepository.findAll();
		for (StockAttributeEntity stockAttributeEntity : allAttributes) {
			StockAttributesDTO dto = stockAttributes.stream().filter(
					(attr)->{return 
						attr.getId().equals(stockAttributeEntity.getId()) 
						&& attr.isVisible() != stockAttributeEntity.isVisible();})
					.findFirst().orElse(null);
			if(dto != null) {
				mapper.map(dto, stockAttributeEntity);
			}
		}
		return getAllStockAttributes();
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