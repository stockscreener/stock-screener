package com.stockscreener.screenerapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stockscreener.screenerapi.customException.BadRequestException;
import com.stockscreener.screenerapi.customException.ResourceNotFoundException;
import com.stockscreener.screenerapi.customException.UserDoesNotHaveProperPermission;
import com.stockscreener.screenerapi.dto.ApiResponseDTO;
import com.stockscreener.screenerapi.dto.StockAttributesDTO;
import com.stockscreener.screenerapi.dto.screen.EditScreenDTO;
import com.stockscreener.screenerapi.dto.screen.NewScreenDTO;
import com.stockscreener.screenerapi.dto.screen.ScreenDTO;
import com.stockscreener.screenerapi.dto.screen.ScreenFilterDTO;
import com.stockscreener.screenerapi.entity.ScreenEntity;
import com.stockscreener.screenerapi.entity.ScreenFilterEntity;
import com.stockscreener.screenerapi.entity.StockAttributeEntity;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.enums.UserStatus;
import com.stockscreener.screenerapi.repository.ScreenRepository;
import com.stockscreener.screenerapi.repository.StockAttributeRepository;
import com.stockscreener.screenerapi.repository.UserRepository;
import com.stockscreener.screenerapi.utils.AuthUtils;

@Service
@Transactional
public class ScreenServiceImpl implements ScreenService{

	@Autowired
	private ScreenRepository screenRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private StockAttributeRepository stockAttributeRepository;
	
	@Override
	public List<ScreenDTO> getAllScreens() {
		return screenRepository.findByIsAvailable(true).stream()
						.map((screen)->{
							ScreenDTO dto = mapper.map(screen, ScreenDTO.class);
							dto.setUsername(screen.getUser().getUsername());
							return dto;})
						.collect(Collectors.toList());
	}

	@Override
	public List<ScreenDTO> getMyScreens(Long userId) {
		UserEntity user = userRepository.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
		if(!user.getStatus().equals(UserStatus.ACTIVE))
			throw new BadRequestException("You have been Blocked by Admin!");
		return screenRepository.findByIsAvailableAndUserId(true, userId).stream()
				.map((screen)->mapper.map(screen, ScreenDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponseDTO addNewScreen(NewScreenDTO newScreen) {
		UserEntity user = userRepository.findById(AuthUtils.customUserDetails().getUserId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!user.getStatus().equals(UserStatus.ACTIVE))
			throw new BadRequestException("You have been Blocked by Admin!");
		// create new screen
		ScreenEntity screen = new ScreenEntity();
		screen.setAvailable(true);
		screen.setDescription(newScreen.getDescription());
		screen.setName(newScreen.getName());
		screen.setScreenFilters(new ArrayList<>());
		// check is user is allowed to create premium screen
		if(user.getRole().equals(UserRole.ROLE_ADVISOR)){
			screen.setPremium(newScreen.isPremium());
		}
		// create filters list with attribute assigned
		
		List<ScreenFilterEntity> filters = newScreen.getScreenFilters().stream().map((filter)->{
			ScreenFilterEntity filterEntity = new ScreenFilterEntity();
			filterEntity.setFilterConstraint(filter.getFilterConstraint());
			filterEntity.setScreen(screen);
			screen.getScreenFilters().add(filterEntity);
			filterEntity.setValue(filter.getValue());
			filterEntity.setStockAttribute(
					stockAttributeRepository.findById(filter.getStockAttributeId())
						.orElseThrow(()->new ResourceNotFoundException("Attribute not available!"))
			);
			return filterEntity;
		}).collect(Collectors.toList());
		screen.setUser(user);
		screenRepository.save(screen);
		return new ApiResponseDTO("Screen Saved");
	}

	@Override
	public ApiResponseDTO editScreen(EditScreenDTO updatedScreen) {
		// Check if user is active
		UserEntity user = userRepository.findById(updatedScreen.getUserId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!user.getStatus().equals(UserStatus.ACTIVE))
			throw new BadRequestException("You have been Blocked by Admin!");
		// get the Screen by users id and screen id
		ScreenEntity screen = 
				screenRepository.findByIdAndIsAvailableAndUserId(updatedScreen.getId(), true, updatedScreen.getUserId())
				.orElseThrow(()-> new ResourceNotFoundException("Invalid Screen!"));
		// update the screen
		mapper.map(updatedScreen, screen);
		// get original filters and updated filters
		List<ScreenFilterEntity> originalFilters = screen.getScreenFilters();
		List<ScreenFilterEntity> updatedFilters = updatedScreen.getScreenFilters().stream()
				.map((filter)->mapper.map(filter, ScreenFilterEntity.class))
				.collect(Collectors.toList());
		
		// update the existing filters else add new filters
		if(originalFilters.isEmpty()) {
			screen.addScreenFilters(updatedFilters);
		}else {
			updatedFilters.stream().forEach((filter)->{
				int index = -1;
				if((index = originalFilters.indexOf(filter)) != -1) {
					mapper.map(filter, originalFilters.get(index));
				}else {
					originalFilters.add(filter);
					filter.setScreen(screen);
				}
			});
		}
		return new ApiResponseDTO("Screen Updated!");
	}

	@Override
	public EditScreenDTO getScreenDetails(Long userId, Long screenId) {
		// check if user is active
		UserEntity user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!user.getStatus().equals(UserStatus.ACTIVE))
			throw new BadRequestException("You have been Blocked by Admin!");
		// get the screen
		ScreenEntity screen = screenRepository.findByIdAndIsAvailable(screenId, true)
				.orElseThrow(()-> new ResourceNotFoundException("No such Screen!"));
		// if screen not owned by the user
		if(!userId.equals(screen.getUser().getId()) &&
			// else if screen is premium
			screen.isPremium() && 
			// if user not subscribed, 
			!user.getIsSubscribed()) 
				throw new UserDoesNotHaveProperPermission("Please Subscribe to view this Screen!");
		// return screen if User is Owner/Subscribed or Screen not premium
		
		EditScreenDTO screenDTO = mapper.map(screen, EditScreenDTO.class);
		// set userId(screen owner id) and send the screen
		screenDTO.setUserId(screen.getUser().getId());
		return screenDTO;
	}



	@Override
	public List<StockAttributesDTO> getStockAttributes() {
		return stockAttributeRepository.findByIsVisible(true).stream()
				.map((attribute)->mapper.map(attribute, StockAttributesDTO.class))
				.toList();
	}
	
	
}
