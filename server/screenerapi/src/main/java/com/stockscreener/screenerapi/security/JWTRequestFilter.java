package com.stockscreener.screenerapi.security;

import java.io.IOException;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.enums.UserRole;
import com.stockscreener.screenerapi.utils.JwtUtils;

import io.jsonwebtoken.Claims;

@Component
//custom filter
public class JWTRequestFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtils utils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// check for authorization hdr
		String authHeadr = request.getHeader("Authorization");
		if (authHeadr != null && authHeadr.startsWith("Bearer")) {
			System.out.println("got bearer token");
			String token = authHeadr.substring(7);
			Claims claims = utils.validateJwtToken(token);
			// extract subject from the token
			String email = utils.getUserNameFromJwtToken(claims);
			Long userId = utils.getUserIdFromJwtToken(claims);
			String role = utils.getUserRoleFromJwtToken(claims);
			 UserEntity userEntity = new UserEntity();
			 userEntity.setEmail(email);
			 userEntity.setId(userId);
			 userEntity.setRole(UserRole.valueOf(role));
			// extract authorities from the token
			List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(claims);
			// wrap user details (username/email +granted authorities ) in the
			// username pwd token
			UsernamePasswordAuthenticationToken authentication = 
					new UsernamePasswordAuthenticationToken(new CustomUserDetails(userEntity), null,
					authorities);
			//save above auth object in the spric sec ctx
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
		} else {
//			System.out.println(authHeadr != null);
//			System.out.println(authHeadr.startsWith("Bearer"));
			System.out.println("req did not contain any bearer token");
		}
		filterChain.doFilter(request, response);// passing the control to the nexyt filter in the chain

	}

}
