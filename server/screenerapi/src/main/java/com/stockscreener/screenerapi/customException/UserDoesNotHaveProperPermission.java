package com.stockscreener.screenerapi.customException;

public class UserDoesNotHaveProperPermission extends RuntimeException {
	public UserDoesNotHaveProperPermission(String msg) {
		super(msg);
	}
}
