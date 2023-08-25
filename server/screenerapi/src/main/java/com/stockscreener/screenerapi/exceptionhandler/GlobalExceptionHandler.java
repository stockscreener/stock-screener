package com.stockscreener.screenerapi.exceptionhandler;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.stockscreener.screenerapi.customException.*;
import com.stockscreener.screenerapi.dto.ApiResponseDTO;


@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
		return ResponseEntity.badRequest()
				.body(exception.getFieldErrors().stream()
				.collect(Collectors.toMap(
								FieldError::getField, FieldError::getDefaultMessage)));
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException excption){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDTO(excption.getMessage()));
	}
	
	@ExceptionHandler(BlockedByAdminException.class)
	public ResponseEntity<?> handleBlockedByAdminException(BlockedByAdminException exception){
		return ResponseEntity.status(HttpStatus.DESTINATION_LOCKED).body(exception.getMessage());
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception exception){
		exception.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new ApiResponseDTO(exception.getMessage()));
	}
}
