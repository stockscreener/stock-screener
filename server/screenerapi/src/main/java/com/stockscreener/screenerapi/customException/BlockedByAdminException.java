package com.stockscreener.screenerapi.customException;

public class BlockedByAdminException extends RuntimeException {
	public BlockedByAdminException(String msg) {
		super(msg);
	}
}
