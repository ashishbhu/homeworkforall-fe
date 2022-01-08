package com.wb.fe.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
		} else {
			redirectAttributes.addFlashAttribute("message", "Updated successfully");
		}
		redirectAttributes.addFlashAttribute("signupRequest", request);
		return "redirect:/user/signup";
	}
}
