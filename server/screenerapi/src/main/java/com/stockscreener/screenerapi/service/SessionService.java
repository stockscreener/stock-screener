package com.stockscreener.screenerapi.service;

import com.stockscreener.screenerapi.dto.SessionResponse;

public interface SessionService {
	SessionResponse addSession(Long user, String ipAddress);
	String deleteSession(Long sessionId);
}
