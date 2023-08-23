package com.stockscreener.screenerapi.service;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscreener.screenerapi.dto.SessionResponse;
import com.stockscreener.screenerapi.entity.SessionEntity;
import com.stockscreener.screenerapi.entity.UserEntity;
import com.stockscreener.screenerapi.repository.SessionRepository;
import com.stockscreener.screenerapi.repository.UserRepository;

@Service
@Transactional
public class SessionServiceImpl implements SessionService {
	@Autowired
	private SessionRepository sessionRepository;
	@Autowired
	private UserRepository userRepository;
	
	

	@Override
	public SessionResponse addSession(Long userId, String ipAddress) {
	    SessionEntity sessionEntity = new SessionEntity();
	    sessionEntity.setValid(true);
	    
	    Optional<UserEntity> userOptional = userRepository.findById(userId);
	    
	    if (userOptional.isPresent()) {
	        UserEntity userEntity = userOptional.get();
	        
	        sessionEntity.setUser(userEntity);
	        
	        sessionRepository.save(sessionEntity);
	        
	        
	        return new SessionResponse(sessionEntity.getId(),"User Found");
	    } else {
	        return new SessionResponse("UserId Not Found.");
	    }
	}
	
	
	
	@Override
	public String deleteSession(Long sessionId) {
		Optional<SessionEntity> sessionEntity=sessionRepository.findById(sessionId);
		
		
		if(sessionEntity.isPresent()) {
		SessionEntity sessionEntity2=sessionEntity.get();
		sessionEntity2.setValid(false);
		sessionEntity2.setEndTime(LocalDateTime.now());
		sessionRepository.save(sessionEntity2);
		return "Session Discarded.";
		}
		
		else 
			return "Session Not Found.";
		
	}
	

}
