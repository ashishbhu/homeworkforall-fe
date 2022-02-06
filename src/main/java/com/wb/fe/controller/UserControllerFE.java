package com.wb.fe.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.wb.fe.request.RequestStatus;
import com.wb.fe.request.SignupRequestFE;
import com.wb.fe.response.ResponseDTO;
import com.wb.fe.service.UserService;

@Controller
@RequestMapping("/user")
public class UserControllerFE {

	@Autowired
	private UserService userService;

	@GetMapping("/signup")
	public String signup(ModelMap model) {
		SignupRequestFE signupRequest = new SignupRequestFE();
		List<MultipartFile> arrayList = new ArrayList<>();
		arrayList.add(null);
		arrayList.add(null);
		signupRequest.setNationalIdFiles(arrayList);
		
		List<MultipartFile> qualificationCerti = new ArrayList<>();
		qualificationCerti.add(null);
		signupRequest.setQualificationCertificateFiles(qualificationCerti);
		
		List<MultipartFile> portfolioFiles = new ArrayList<>();
		portfolioFiles.add(null);
		portfolioFiles.add(null);
		portfolioFiles.add(null);
		
		signupRequest.setPortfolioFiles(portfolioFiles);
		model.addAttribute("signupRequest", signupRequest);
		return "signup";
	}

	@PostMapping("/process/signup")
	public String processSignup(@ModelAttribute(value = "signupRequest") SignupRequestFE request, ModelMap model,
			RedirectAttributes redirectAttributes) {
		ResponseDTO response = userService.processSignup(request);
		if(response == null || response.getRequestStatus() == null) {
			redirectAttributes.addFlashAttribute("error", "Something went wrong!");
		} else if (response.getRequestStatus() == RequestStatus.FAIL) {
			if(StringUtils.isEmpty(response.getSuccessMessage())) {
				redirectAttributes.addFlashAttribute("error", "Something went wrong!");
			} else {
				redirectAttributes.addFlashAttribute("error", response.getSuccessMessage());
			}
		} else if(response.getRequestStatus() == RequestStatus.SUCCESS) {
			if(StringUtils.isNotEmpty(response.getSuccessMessage())) {
				redirectAttributes.addFlashAttribute("message", response.getSuccessMessage());
			} else {
				redirectAttributes.addFlashAttribute("message", "Signup successfully");
			}
		}
		redirectAttributes.addFlashAttribute("signupRequest", request);
		return "redirect:/user/signup";
	}
}
