package com.stockscreener.screenerapi.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ApiResponse {
	private String message;
	private LocalDateTime timestamp;

	public ApiResponse(String message) {
		this.message = message;
		this.timestamp = LocalDateTime.now();

	}
}
