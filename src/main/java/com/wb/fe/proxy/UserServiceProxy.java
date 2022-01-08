package com.wb.fe.proxy;

import java.io.IOException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.wb.fe.request.RequestStatus;
import com.wb.fe.request.SignupRequestFE;
import com.wb.fe.response.ResponseDTO;

@Component
public class UserServiceProxy {
	
	static final Logger logger = Logger.getLogger(UserServiceProxy.class);
	
	private String WB_BASE_URL;
	
	//@Autowired
	private RestTemplate restTemplate = new RestTemplate();

	public ResponseDTO signup(SignupRequestFE request) {
		ResponseDTO response = new ResponseDTO();
		try {
			String url = WB_BASE_URL + "user/signup";
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.set("Content-Type", "application/json");

			HttpEntity<SignupRequestFE> httpEntity = new HttpEntity<SignupRequestFE>(request,
					httpHeaders);
			restTemplate.exchange(url, HttpMethod.POST, httpEntity, Void.class);
			response.setRequestStatus(RequestStatus.SUCCESS);
		} catch (HttpClientErrorException e) {
			if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
//				try {
//					ErrorMessage errorMessage = objectMapper.readValue(e.getResponseBodyAsString(), ErrorMessage.class);
//					response.setSuccessMessage(errorMessage.getMessage());
//					response.setRequestStatus(RequestStatus.FAIL);
//				} catch (IOException e1) {
//				}
			}
		} catch (Exception e) {
			logger.info("-------- exception " + e.getMessage() + " occured calling signup");
		}
		return response;
	}
}
