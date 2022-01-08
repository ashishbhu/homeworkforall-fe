package com.wb.fe.service.impl;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wb.fe.request.SignupRequestFE;
import com.wb.fe.response.ResponseDTO;
import com.wb.fe.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Override
	public ResponseDTO processSignup(SignupRequestFE request) {
		try {
			request.setProfileImageFile(null);
			System.out.println("Request:---"+ new ObjectMapper().writeValueAsString(request));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}

}
