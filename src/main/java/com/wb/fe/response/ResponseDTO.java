package com.wb.fe.response;

import java.io.Serializable;

import com.wb.fe.request.RequestStatus;

public class ResponseDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private RequestStatus requestStatus;

	private String successMessage;

	private String message;

	public RequestStatus getRequestStatus() {
		return requestStatus;
	}

	public void setRequestStatus(RequestStatus requestStatus) {
		this.requestStatus = requestStatus;
	}

	public String getSuccessMessage() {
		return successMessage;
	}

	public void setSuccessMessage(String successMessage) {
		this.successMessage = successMessage;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
