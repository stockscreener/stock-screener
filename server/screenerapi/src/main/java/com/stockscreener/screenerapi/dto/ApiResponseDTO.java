package com.stockscreener.screenerapi.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ApiResponseDTO {
	private String status;
	private String message;
	private LocalDateTime timestamp;

	public ApiResponseDTO(String message) {
		this.message = message;
		this.timestamp = LocalDateTime.now();
	}
	public ApiResponseDTO(String status, String message) {
		this.status = status;
		this.message = message;
		this.timestamp = LocalDateTime.now();
	}
}
