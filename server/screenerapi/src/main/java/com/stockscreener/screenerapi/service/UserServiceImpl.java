package com.stockscreener.screenerapi.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stockscreener.screenerapi.customException.ResourceNotFoundException;
import com.stockscreener.screenerapi.customException.UserDoesNotHaveProperPermission;
import com.stockscreener.screenerapi.dto.ApiResponseDTO;
import com.stockscreener.screenerapi.dto.AuthRequestDTO;
import com.stockscreener.screenerapi.dto.AuthResponseDTO;
import com.stockscreener.screenerapi.dto.user.AdminProfileDTO;
import com.stockscreener.screenerapi.dto.user.AdvisorProfileDTO;
import com.stockscreener.screenerapi.dto.user.DeleteUserDTO;
import com.stockscreener.screenerapi.dto.user.InvestorProfileDTO;
import com.stockscreener.screenerapi.dto.user.LimitedUserDetailsDTO;
import com.stockscreener.screenerapi.dto.user.UpdatePasswordDTO;
import com.stockscreener.screenerapi.entity.AdvisorEntity;
import com.stockscreener.screenerapi.entity.DeletedUserEntity;
import com.stockscreener.screenerapi.entity.InvestorEntity;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.AdvisorVerificationStatus;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.enums.UserStatus;
import com.stockscreener.screenerapi.repository.UserRepository;


@Service
@Transactional
public class UserServiceImpl implements UserService {
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

	@Override
	public List<LimitedUserDetailsDTO> getLimitedUserDetails(Long userId, UserRole role) {
		UserEntity user = userRepository.fetchUserStatusRole(userId).orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
		if(!user.getRole().equals(UserRole.ADMIN))
			role = UserRole.ADVISOR;
		return userRepository.fetchLimitedUserDetails(role);
	}

	@Override
	public UserEntity getUserStatusRole(Long id) {
		return userRepository.fetchUserStatusRole(id)
				.orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
	}

	@Override
	public ApiResponseDTO deleteUser(DeleteUserDTO user) {
		UserEntity userToDelete = userRepository.findById(user.getId())
				.orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
		userToDelete.deleteUser(mapper.map(user, DeletedUserEntity.class));
		return new ApiResponseDTO("User Deleted!");
	}

	@Override
	public List<LimitedUserDetailsDTO> updateUsersStatus(Map<Long, UserStatus> usersStatus) {
		List<UserEntity> users = userRepository.findByIdInAndStatusNot(
				usersStatus.keySet().stream().toList(), UserStatus.DELETED);
		users.forEach((u)->{
				UserStatus st = usersStatus.get(u.getId());
				if(st.equals(UserStatus.ACTIVE) || st.equals(UserStatus.BLOCKED)) {
				u.setStatus(st);
				u.getScreens().forEach(
						(screen)->screen.setAvailable(st.equals(UserStatus.BLOCKED)?false:true));
				u.getBlogs().forEach(
						(blog)->blog.setAvailable(st.equals(UserStatus.BLOCKED)?false:true));
				}
			});
		return users.stream().map((user)->{
				LimitedUserDetailsDTO userDto = mapper.map(user, LimitedUserDetailsDTO.class);
				if(user.getAdvisor()!= null)
					userDto.setVerificationStatus(user.getAdvisor().getVerificationStatus());
				return userDto;
				}).toList();
	}
	

}
