package com.stockscreener.screenerapi.dto;



import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SessionResponse {
	 private Long id;
	 private String message;
	 
	 public  SessionResponse(String message) {
		 
		 this.message=message;
		
	}
}
