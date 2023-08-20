package com.stockscreener.screenerapi.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.customException.ResourceNotFoundException;
import com.stockscreener.screenerapi.customException.UserDoesNotHaveProperPermission;
import com.stockscreener.screenerapi.dto.AdminProfileDTO;
import com.stockscreener.screenerapi.dto.AdvisorProfileDTO;
import com.stockscreener.screenerapi.dto.ApiResponseDTO;
import com.stockscreener.screenerapi.dto.AuthRequestDTO;
import com.stockscreener.screenerapi.dto.AuthResponseDTO;
import com.stockscreener.screenerapi.dto.InvestorProfileDTO;
import com.stockscreener.screenerapi.dto.UpdatePasswordDTO;
import com.stockscreener.screenerapi.entity.AdvisorEntity;
import com.stockscreener.screenerapi.entity.InvestorEntity;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.AdvisorVerificationStatus;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.enums.UserStatus;
import com.stockscreener.screenerapi.repository.AdvisorRepository;
import com.stockscreener.screenerapi.repository.UserRepository;


@Service
@Transactional
public class UserServicesImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public List<UserEntity> getAllUsers() {
		
		return userRepository.findAll();
	}
	
	@Override
	public UserEntity addNewUser(UserEntity user, boolean isAdvisor) {
		AdvisorEntity advisor = null;
		if(isAdvisor) {
			advisor = new AdvisorEntity();
			advisor.setVerificationStatus(AdvisorVerificationStatus.NOT_VERIFIED);
			user.addAdvisor(advisor);
			user.setRole(UserRole.ADVISOR);
		}else {
			user.setRole(UserRole.INVESTOR);
		}
		user.setRegisteredAt(LocalDateTime.now());
		user.setStatus(UserStatus.ACTIVE);
		UserEntity newUser = userRepository.save(user);
		return newUser;
	}

	@Override
	public ApiResponseDTO deleteUserDetails(Long id) {
		UserEntity user=getUserDetails(id);
		if(user.getStatus().equals(UserStatus.ACTIVE)){
			user.setStatus(UserStatus.DELETED);
			return new ApiResponseDTO("User Details Deleted Successfully....");
		}
		return new ApiResponseDTO("User Status Is Not Active....");
	}

	@Override
	public UserEntity getUserDetails(long id) {
		return userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User Id is Invalid....."));
	}

	@Override
	public AuthResponseDTO authenticateUser(AuthRequestDTO request) {
		UserEntity user=userRepository.findByEmailAndPassword(request.getUsername(),request.getPassword())
				.orElseThrow(()->new ResourceNotFoundException("Invalid Username Or Password..."));		
		if(user.getStatus().equals(UserStatus.ACTIVE)) {
			return mapper.map(user, AuthResponseDTO.class);
		}else if(user.getStatus().equals(UserStatus.BLOCKED)) {
			return mapper.map(user, AuthResponseDTO.class);
		}
		return new AuthResponseDTO();
	}

	@Override
	public AdminProfileDTO updateAdminProfile(AdminProfileDTO admin) {
		UserEntity userEntity = userRepository.findById(admin.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!userEntity.getRole().equals(UserRole.ADMIN))
			throw new UserDoesNotHaveProperPermission("You cannot update profile of this user!");
		mapper.map(admin, userEntity);
		return mapper.map(userRepository.save(userEntity),AdminProfileDTO.class);
	}

	@Override
	public AdvisorProfileDTO updateAdvisorProfile(AdvisorProfileDTO advisor) {
		UserEntity userEntity = userRepository.findById(advisor.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!userEntity.getRole().equals(UserRole.ADVISOR))
			throw new UserDoesNotHaveProperPermission("You cannot update profile of this user!");
		
		mapper.map(advisor, userEntity);
		AdvisorVerificationStatus status = userEntity.getAdvisor().getVerificationStatus();
		mapper.map(advisor, userEntity.getAdvisor());
		userEntity.getAdvisor().setVerificationStatus(status);
		UserEntity savedUser = userRepository.save(userEntity);
		AdvisorProfileDTO advisorDTO = new AdvisorProfileDTO();
		mapper.map(savedUser, advisorDTO);
		mapper.map(savedUser.getAdvisor(), advisorDTO);
		return advisorDTO;
	}

	@Override
	public InvestorProfileDTO updateInvestorProfile(InvestorProfileDTO investor) {
		
		UserEntity userEntity = userRepository.findById(investor.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!userEntity.getRole().equals(UserRole.INVESTOR))
			throw new UserDoesNotHaveProperPermission("You cannot update profile of this user!");
		
		mapper.map(investor, userEntity);
		
		InvestorEntity updatedInvestor = mapper.map(investor, InvestorEntity.class);
		userEntity.addInvestor(updatedInvestor);
		
		UserEntity savedUser = userRepository.save(userEntity);
		
		InvestorProfileDTO investorDTO = new InvestorProfileDTO();
		mapper.map(savedUser, investorDTO);
		mapper.map(savedUser.getInvestor(), investorDTO);
		return investorDTO;
	}

	@Override
	public UserEntity getUserProfile(Long userId) {
		UserEntity user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
		if(user.getRole().equals(UserRole.INVESTOR))
			user.getInvestor();
		else if (user.getRole().equals(UserRole.ADVISOR))
			user.getAdvisor();
		return user;
	}

	@Override
	public ApiResponseDTO updatePassword(UpdatePasswordDTO passwordDto) {
		UserEntity user = userRepository.findById(passwordDto.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
		if(user.getPassword().equals(passwordDto.getCurrentPassword())) {
			user.setPassword(passwordDto.getNewPassword());
		}else {
			return new ApiResponseDTO("Invalid Password!");
		}
		userRepository.save(user);
		return new ApiResponseDTO("Password Updated!");
	}
	

}
