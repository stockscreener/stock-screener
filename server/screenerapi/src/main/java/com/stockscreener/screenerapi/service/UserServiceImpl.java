package com.stockscreener.screenerapi.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.stockscreener.screenerapi.utils.AuthUtils;


@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder encoder;
	
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
			user.setRole(UserRole.ROLE_ADVISOR);
		}else {
			user.addInvestor(new InvestorEntity());
			user.setRole(UserRole.ROLE_INVESTOR);
		}
		user.setRegisteredAt(LocalDateTime.now());
		user.setStatus(UserStatus.ACTIVE);
		String rawPassword = user.getPassword();
		String encodedPassword = encoder.encode(rawPassword);
		user.setPassword(encodedPassword);
		UserEntity newUser = userRepository.save(user);
		return newUser;
	}

	@Override
	public UserEntity getUserDetails(long id) {
		return userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User Id is Invalid....."));
	}

	@Override
	public AuthResponseDTO authenticateUser(AuthRequestDTO request) {
		UserEntity user=userRepository.findByEmail(request.getUsername())
				.orElseThrow(()->new ResourceNotFoundException("Invalid Username Or Password..."));
		AuthResponseDTO response = new AuthResponseDTO();
		if(user.getStatus().equals(UserStatus.ACTIVE)) {
			mapper.map(user, response);
		}else if(user.getStatus().equals(UserStatus.BLOCKED)) {
			response.setMessage("You have Been Blocked by the Admin!");
		}
		return response;
	}

	@Override
	public AdminProfileDTO updateAdminProfile(AdminProfileDTO admin) {
		UserEntity userEntity = userRepository.findById(AuthUtils.customUserDetails().getUserId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!userEntity.getRole().equals(UserRole.ROLE_ADMIN))
			throw new UserDoesNotHaveProperPermission("You cannot update profile of this user!");
		mapper.map(admin, userEntity);
		return mapper.map(userRepository.save(userEntity),AdminProfileDTO.class);
	}

	@Override
	public AdvisorProfileDTO updateAdvisorProfile(AdvisorProfileDTO advisor) {
		UserEntity userEntity = userRepository.findById(AuthUtils.customUserDetails().getUserId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!userEntity.getRole().equals(UserRole.ROLE_ADVISOR))
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
		
		UserEntity userEntity = userRepository.findById(AuthUtils.customUserDetails().getUserId()).orElseThrow(()->new ResourceNotFoundException("Invalid User"));
		if(!userEntity.getRole().equals(UserRole.ROLE_INVESTOR))
			throw new UserDoesNotHaveProperPermission("You cannot update profile of this user!");
		
		mapper.map(investor, userEntity);		
		mapper.map(investor, userEntity.getInvestor());
		UserEntity savedUser = userRepository.save(userEntity);
		
		InvestorProfileDTO investorDTO = new InvestorProfileDTO();
		mapper.map(savedUser, investorDTO);
		mapper.map(savedUser.getInvestor(), investorDTO);
		return investorDTO;
	}

	@Override
	public UserEntity getUserProfile(Long userId) {
		UserEntity user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
		if(user.getRole().equals(UserRole.ROLE_INVESTOR))
			user.getInvestor();
		else if (user.getRole().equals(UserRole.ROLE_ADVISOR))
			user.getAdvisor();
		return user;
	}

	@Override
	public ApiResponseDTO updatePassword(UpdatePasswordDTO passwordDto) {
		UserEntity user = userRepository.findById(passwordDto.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
		if(encoder.matches(passwordDto.getCurrentPassword(), user.getPassword())) {
			user.setPassword(encoder.encode(passwordDto.getNewPassword()));
		}else {
			return new ApiResponseDTO("Invalid Password!");
		}
		userRepository.save(user);
		return new ApiResponseDTO("Password Updated!");
	}

	@Override
	public List<LimitedUserDetailsDTO> getLimitedUserDetails(Long userId, UserRole role) {
		UserEntity user = userRepository.fetchUserStatusRole(userId).orElseThrow(()->new ResourceNotFoundException("Invalid User!"));
		if(!user.getRole().equals(UserRole.ROLE_ADMIN))
			role = UserRole.ROLE_ADVISOR;
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
				usersStatus.keySet().stream().collect(Collectors.toList()), UserStatus.DELETED);
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
				}).collect(Collectors.toList());
	}

}
