package com.stockscreener.screenerapi.customException;

public class BadRequestException extends RuntimeException{
	public BadRequestException(String msg) {
		super(msg);
	}
}
