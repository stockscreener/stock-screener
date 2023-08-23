package com.stockscreener.screenerapi.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockscreener.screenerapi.service.SessionService;

@RestController
@RequestMapping("/sessions")
@CrossOrigin(origins = "*")
public class SessionController {
	
	@Autowired
	SessionService sessionService;
	
	public SessionController() {
		System.out.println("in ctor of"+getClass());
	}
	
	
	@PostMapping
	public String addNewSession(@RequestBody Long userId, HttpServletRequest request)
	{	
		String ipAddress=request.getRemoteAddr();
		System.out.println( request.getRemoteAddr());
		sessionService.addSession(userId,ipAddress);
		return "Session Added Successfuly.";
	}
	
	@DeleteMapping
	public String deleteSession(Long sessionId)
	{
		sessionService.deleteSession( sessionId);
		return "Session Deleted. ";
	}
}
