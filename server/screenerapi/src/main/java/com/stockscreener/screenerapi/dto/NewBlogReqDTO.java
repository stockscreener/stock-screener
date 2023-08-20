package com.stockscreener.screenerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewBlogReqDTO {
	// input fields from request: userId, title, content, isPremium

	private Long userId;
	private String title;
	private String content;
	private boolean isPremium;
}