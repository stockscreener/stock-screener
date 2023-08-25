package com.stockscreener.screenerapi.security;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.customException.BlockedByAdminException;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserStatus;
import com.stockscreener.screenerapi.repository.UserRepository;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserEntity user = userRepository.findByEmail(email)
				.orElseThrow(() ->
				new UsernameNotFoundException("Invalid Credentials!"));
		if(user.getStatus().equals(UserStatus.BLOCKED)){
			throw new BlockedByAdminException("You have been Blocked by the Admin!");
		}
		return new CustomUserDetails(user);
	}

}
