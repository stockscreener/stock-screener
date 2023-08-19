package com.stockscreener.screenerapi.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.stockscreener.screenerapi.dto.FeedbackRespDTO;
import com.stockscreener.screenerapi.dto.NewFeedbackReqDTO;

public interface FeedbackService {
	NewFeedbackReqDTO submitFeedback(Long userId, String review);
	List<FeedbackRespDTO> getAllFeedbacks();
}
