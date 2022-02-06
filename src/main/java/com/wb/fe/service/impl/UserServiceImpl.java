package com.wb.fe.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wb.fe.proxy.UserServiceProxy;
import com.wb.fe.request.SignupRequestFE;
import com.wb.fe.response.ResponseDTO;
import com.wb.fe.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserServiceProxy userServiceProxy;
	
	@Override
	public ResponseDTO processSignup(SignupRequestFE request) {
		return userServiceProxy.signup(request);
	}

}
