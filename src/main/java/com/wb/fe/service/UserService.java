package com.wb.fe.service;

import com.wb.fe.request.SignupRequestFE;
import com.wb.fe.response.ResponseDTO;

public interface UserService {

	ResponseDTO processSignup(SignupRequestFE request);

}
