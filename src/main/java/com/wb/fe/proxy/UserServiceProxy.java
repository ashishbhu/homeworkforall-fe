package com.wb.fe.proxy;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wb.fe.exception.bean.ErrorMessage;
import com.wb.fe.request.RequestStatus;
import com.wb.fe.request.SignupRequestFE;
import com.wb.fe.response.CommonResponseModel;
import com.wb.fe.response.ResponseDTO;

@Component
public class UserServiceProxy {

	static final Logger logger = Logger.getLogger(UserServiceProxy.class);

	@Value("${wb.base.url}")
	private String WB_BASE_URL;

	// @Autowired
	private RestTemplate restTemplate = new RestTemplate();

	private ObjectMapper objectMapper = new ObjectMapper()
			.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

	public ResponseDTO signup(SignupRequestFE request) {
		ResponseDTO response = new ResponseDTO();
		try {
			System.out.println("-------inside frontend signup method------");
			HttpHeaders httpHeaders = new HttpHeaders();
//			httpHeaders.set("Content-Type", "application/json");
			httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

//			HttpEntity<SignupRequestFE> httpEntity = new HttpEntity<SignupRequestFE>(request,
//					httpHeaders);

			MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
			body.add("profileImageFile", new FileSystemResource(convertMultiPartToFile(request.getProfileImageFile())));
			for (MultipartFile qualificationCertificate : request.getQualificationCertificateFiles()) {
				if(StringUtils.isNotEmpty(qualificationCertificate.getOriginalFilename())) {
					body.add("qualificationCertificateFiles", new FileSystemResource(convertMultiPartToFile(qualificationCertificate)));
				}
			}
			for (MultipartFile nationalIdFile : request.getNationalIdFiles()) {
				if(StringUtils.isNotEmpty(nationalIdFile.getOriginalFilename())) {
					body.add("nationalIdFiles", new FileSystemResource(convertMultiPartToFile(nationalIdFile)));
				}
			}
			for (MultipartFile portfolioFile : request.getPortfolioFiles()) {
				if(StringUtils.isNotEmpty(portfolioFile.getOriginalFilename())) {
					body.add("portfolioFiles", new FileSystemResource(convertMultiPartToFile(portfolioFile)));
				}
			}
		    request.setProfileImageFile(null);
			request.setNationalIdFiles(null);
			request.setPortfolioFiles(null);
			request.setQualificationCertificateFiles(null);
			body.add("request", request);
			String url = WB_BASE_URL + "user/signup";
			HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, httpHeaders);
			ResponseEntity<CommonResponseModel> commonResponseModel = restTemplate.exchange(url, HttpMethod.POST, requestEntity, CommonResponseModel.class);
			response.setRequestStatus(RequestStatus.SUCCESS);
			response.setSuccessMessage(commonResponseModel.getBody().getMessage());
		} catch (HttpClientErrorException e) {
			if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
				try {
					ErrorMessage errorMessage = objectMapper.readValue(e.getResponseBodyAsString(), ErrorMessage.class);
					response.setSuccessMessage(errorMessage.getMessage());
					response.setRequestStatus(RequestStatus.FAIL);
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("-------- exception " + e.getMessage() + " occured calling signup");
		}
		System.out.println("-------end frontend signup method------");
		return response;
	}

	private File convertMultiPartToFile(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}
}
