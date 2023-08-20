package com.stockscreener.screenerapi.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BlogRespDTO {
	// response fields:blogId, userId, title, content, isPremium, createdAt
	 private Long id;
	    private Long userId;
	    private String title;
	    private String content;
	    private boolean isPremium;
	    private boolean isAvailable;
	    private LocalDateTime createdAt;
}
