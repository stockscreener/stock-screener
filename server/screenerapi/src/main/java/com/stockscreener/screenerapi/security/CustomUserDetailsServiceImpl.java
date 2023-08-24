package com.stockscreener.screenerapi.security;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.repository.UserRepository;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// invoke repo's method to get user details form DB
		UserEntity user = userRepo.findByEmail(email)
				.orElseThrow(() ->
				new UsernameNotFoundException("Invalid Credentials!"));
		//=> user email exists
		return new CustomUserDetails(user);
	}

}
