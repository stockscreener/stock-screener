package com.stockscreener.screenerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogEditReqDTO {
// response fields:blogId, userId, title, content, isPremium
    private Long id;
    private Long userId;
    private String title;
    private String content;
    private boolean isPremium;
    private boolean isAvailable;

//	public Long getId() {
//		// TODO Auto-generated method stub
//		return null;
//	}
	
}
