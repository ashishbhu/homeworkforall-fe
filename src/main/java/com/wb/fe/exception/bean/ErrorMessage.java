package com.wb.fe.exception.bean;

import java.io.Serializable;
import java.util.List;

public class ErrorMessage implements Serializable {

	private static final long serialVersionUID = 2103811657604281833L;

	private String message;

	private String developerMessage;

	private List<String> errorCodes;

	public ErrorMessage() {
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * @return the developerMessage
	 */
	public String getDeveloperMessage() {
		return developerMessage;
	}

	/**
	 * @param developerMessage the developerMessage to set
	 */
	public void setDeveloperMessage(String developerMessage) {
		this.developerMessage = developerMessage;
	}

	/**
	 * @return the errorCodes
	 */
	public List<String> getErrorCodes() {
		return errorCodes;
	}

	/**
	 * @param errorCodes the errorCodes to set
	 */
	public void setErrorCodes(List<String> errorCodes) {
		this.errorCodes = errorCodes;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ErrorMessage [message=" + message + ", developerMessage="
				+ developerMessage + ", errorCodes=" + errorCodes
				+ "]";
	}
}