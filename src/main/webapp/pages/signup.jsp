<%@ page session="true"%>
    <%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
           
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- <c:choose>
	<c:when test="${req.serverName eq 'seller.mall91.com'}">
		<c:set var="baseURL"
			value="${req.scheme}://${req.serverName}:${req.serverPort}" />
		<c:set var="baseURL1" value="${req.scheme}://${req.serverName}" />
	</c:when>
	<c:when test="${req.serverName eq 'oms'}">
		<c:set var="baseURL" value="/PayBoard" />
		<c:set var="baseURL1" value="/PayBoard" />
	</c:when>
	<c:otherwise>
		<c:set var="baseURL"
			value="${req.scheme}://${req.serverName}:${req.serverPort}${req.contextPath}" />
		<c:set var="baseURL1"
			value="${req.scheme}://${req.serverName}${req.contextPath}" />
	</c:otherwise>
</c:choose> --%>
<c:set var="req" value="${pageContext.request}" />
<c:set var="baseURL"
			value="${req.contextPath}"/>
<c:set var="baseURL1"
			value="${req.contextPath}"/>

<html lang="en">
<head>
<title></title>
<meta charset="UTF-8">
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link rel="stylesheet" href="${baseURL}/resources/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css"
	href="${baseURL}/resources/date time picker/css/bootstrap.css" />
<link rel="stylesheet"
	href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
<link rel="stylesheet" type="text/css"
	href="${baseURL}/resources/date time picker/css/bootstrap-datetimepicker.css" />
<link rel="stylesheet" type="text/css"
	href="${baseURL}/resources/date time picker/css/bootstrap-datetimepicker.min.css" />
<link rel="stylesheet" type="text/css"
	href="${baseURL}/resources/date time picker/css/bootstrap-datetimepicker-standalone.css" />

<link rel="stylesheet" type="text/css"
	href="${baseURL}/resources/css/bootstrap-colorpicker.min.css" />
<link rel="stylesheet" type="text/css"
	href="${baseURL}/resources/date time picker/css/style.css" />
<link rel="stylesheet"
	href="${baseURL}/resources/css/dataTables.bootstrap.css">
<link rel="stylesheet" href="${baseURL}/resources/css/AdminLTE.min.css">
<link rel="stylesheet"
	href="${baseURL}/resources/css/_all-skins.min.css">
<link rel="stylesheet"
	href="${baseURL}/resources/date time picker/css/datepicker.css" />
<link rel="stylesheet" type="text/css"
	href="${baseURL}/resources/css/custom.css" />

<script src="${baseURL}/resources/js/jQuery-2.1.4.min.js"></script>
<script type="text/javascript" src="${baseURL}/resources/js/Moment.js"></script>
<script
	src="${baseURL}/resources/date time picker/js/bootstrap-datetimepicker.min.js"></script>
<script src="${baseURL}/resources/js/bootstrap.min.js"></script>
<script src="${baseURL}/resources/js/jquery.slimscroll.min.js"></script>
<script src="${baseURL}/resources/js/jquery.dataTables.min.js"></script>
<script src="${baseURL}/resources/js/dataTables.bootstrap.min.js"></script>
<script src="${baseURL}/resources/js/fastclick.min.js"></script>
<script src="${baseURL}/resources/js/app.min.js"></script>
<script src="${baseURL}/resources/js/demo.js"></script>

<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="pragma" content="no-cache" />

<script language="javascript">
	if (window.location.hostname === "localhost") {
		SITEBASEURL = document.location.origin + "/";
	} else if (window.location.hostname === "com") {
		SITEBASEURL = document.location.origin + "/";
	} else {
		SITEBASEURL = document.location.origin + "/";
	}
	
</script>
<style>
.error {
	border: 1px solid red;
	color: red;
	font-family: arial;
	margin: 10px;
	padding: 10px;
	background: #ffb2b2;
	border-radius: 5px;
}

.message {
	border: 1px solid green;
	color: green;
	font-family: arial;
	margin: 10px;
	padding: 10px;
	background: #C5E3BF;
	border-radius: 5px;
}

html {
	background: #ecf0f5;
}

.box {
	border-top: none !important;
}

.btn-custom:hover, .btn-custom:focus {
	background: #5ca6e2;
	border: 1px solid #5ca6e2;
	color: #fff;
}

.btn-custom {
	background: #5ca6e2;
	border: 1px solid #5ca6e2;
	border-radius: 0;
	font-weight: bold;
	color: #fff;
}

.errorEvent {
	color: red;
}

.content-wrapper {
	position: relative;
}
/*********form*****/
.form-group.required .control-label::after {
	color: #ff0000;
	content: "*";
}

.box-body.priceColumn div {
	margin-bottom: 20px;
}
</style>
</head>
<body class="skin-blue sidebar-mini">
	<div class="wrapper">
		<header class="main-header">
			<%-- <a href="#" class="logo"> <span class="logo-mini"><img
					src="${baseURL}/resources/fonts/logo.svg" height="35px"
					width="auto"></span> <span class="logo-lg"><img
					src="${baseURL}/resources/fonts/logo.svg" height="35px"
					width="auto"></span>
			</a> --%>
			<nav class="navbar navbar-static-t08-04-2016op" role="navigation">
				<a href="#" class="sidebar-toggle" data-toggle="offcanvas"
					role="button"> <span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
				</a>
				</a>
				
			</nav>
		</header>

		<div class="content-wrapper">
			<section class="content-header">
				<h1 class="pull-left"></h1>
				<div class="clearfix"></div>
			</section>
			<c:if test="${not empty error}">
				<div class="error">${error}</div>
			</c:if>
			<c:if test="${not empty message}">
				<div class="message">${message}</div>
			</c:if>
           
                <style>
                    .image-container {
                        position: relative;
                        display: inline-block;
                        margin: 10px 0;
                    }
                </style>

                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="box">
                                <div class="box-body">
                                    <form:form modelAttribute="signupRequest" action="${baseURL}/user/process/signup" enctype="multipart/form-data" class="form-horizontal group-border-dashed">
                                        <%-- <form:hidden class="form-control" path="id" /> --%>
                                        
                                        <div class="form-group required">
											<label for="userType" class="col-sm-3 control-label">User Type</label>
											<div class="col-sm-9">
											<form:select path="userType"
												required="required">
												<form:option value="" label="----- Select -----" />
												<form:option value="userType">WRITTER</form:option>
											</form:select>
												<div class="errorCustom">
													<form:errors path="userType" cssClass="errorEvent" />
												</div>
											</div>
										</div>
										
										 <div class="form-group required">
                                            <label class="col-sm-3 control-label" for="firstName">First Name</label>
                                            <div class="col-sm-6">
                                                 <form:input class="form-control" path="firstName" parsley-trigger="change" placeholder="Enter First Name" autocomplete="off" required="required" />
                                                <div class="errorCustom">
                                                    <form:errors path="firstName" cssClass="errorEvent" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label" for="middleName">Middle Name</label>
                                            <div class="col-sm-6">
                                                 <form:input class="form-control" path="middleName" parsley-trigger="change" placeholder="Enter Middle Name" autocomplete="off" />
                                                <div class="errorCustom">
                                                    <form:errors path="middleName" cssClass="errorEvent" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label" for="lastName">Last Name</label>
                                            <div class="col-sm-6">
                                                 <form:input class="form-control" path="lastName" parsley-trigger="change" placeholder="Enter Last Name" autocomplete="off" />
                                                <div class="errorCustom">
                                                    <form:errors path="lastName" cssClass="errorEvent" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group required">
                                            <label class="col-sm-3 control-label" for="email">Email</label>
                                            <div class="col-sm-6">
                                                 <form:input class="form-control" path="email" parsley-trigger="change" placeholder="Enter email" autocomplete="off" required="required" />
                                                <div class="errorCustom">
                                                    <form:errors path="email" cssClass="errorEvent" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group required">
                                            <label class="col-sm-3 control-label" for="name">UserName</label>
                                            <div class="col-sm-6">
                                                 <form:input class="form-control" path="userName" parsley-trigger="change" placeholder="Enter UserName"  required="required" />
                                                <div class="errorCustom">
                                                    <form:errors path="userName" cssClass="errorEvent" />
                                                </div>

                                            </div>
                                        </div>
                                        
                                        
                                        <div class="form-group required">
                                            <label class="col-sm-3 control-label" for="name">Password</label>
                                            <div class="col-sm-6">
                                                 <form:password class="form-control" path="password" required="required" placeholder="Enter Password"/>
                                                <div class="errorCustom">
                                                    <form:errors path="password" cssClass="errorEvent" />
                                                </div>

                                            </div>
                                        </div>


 										<div class="form-group required">
                                            <label class="col-sm-3 control-label" for="name">Confirm Password</label>
                                            <div class="col-sm-6">
                                                 <form:password class="form-control" path="confirmPassword" required="required" placeholder="Enter Confirm Password"/>
                                                <div class="errorCustom">
                                                    <form:errors path="confirmPassword" cssClass="errorEvent" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group required">
                                            <label class="col-sm-3 control-label" for="name">Country</label>
                                            <div class="col-sm-6">
                                                 <form:input class="form-control" path="country" required="required" placeholder="Enter Country"/>
                                                <div class="errorCustom">
                                                    <form:errors path="country" cssClass="errorEvent" />
                                                </div>
                                            </div>
                                        </div>
                                     
                                        
                                         <div class="form-group required">
                                            <label class="col-sm-3 control-label" for="phone">Phone</label>
                                            <div class="col-sm-6">
                                                <form:input path="phone" class="form-control" maxlength="10" parsley-trigger="change" placeholder="Enter phone no" required = "required" 
                                                type="number" min="0" onKeyPress="if(this.value.length==10) return false;"/>
                                                     <div class="errorCustom">
                                                    <form:errors path="phone" cssClass="errorEvent" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="clearfix"></div>

									<div class="form-group required">
										<label class="col-sm-3 control-label" for="name">Date Of Birth</label>
										<div class="input-group date datewidth" id='datetimepicker1' style="margin-left: 50px;">
											<form:input type='text' class="form-control" path="dob"
												id="dob" required="required" /> <span class="input-group-addon"> <span
												style="" class="glyphicon glyphicon-calendar"> </span>
											</span>
										</div>
									</div>



									   <div class="form-group required">
										<label class="col-sm-3 control-label" for="image">Profile Image</label>
										<form:hidden class="form-control" path="profileImage" />
										<div class="col-sm-9 file-type">
											<form:input type="file" path="profileImageFile" required="required"/>
											<div class="errorCustom">
												<form:errors path="profileImageFile" cssClass="errorEvent" />
											</div>
											<span style="color:red;">(upload only jpeg/png image format)</span>
												<div class="image-container">
												<c:if test="${not empty signupRequest.getProfileImageFile()}">
													<img src="${signupRequest.profileImageFile}"
														style="height: 50px; width: 180px;">
												</c:if>
											</div>
										</div>
									   </div>
									   
									
                                			<div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
                                                <button type="submit" id="btnSubmit" class="btn btn-custom">SUBMIT</button>
                                            </div>
                                        </div>
                                    </form:form>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <script language="javascript">
                    $(document)
                        .ready(
                            function() {
                            	$("#datetimepicker1,#dob").datetimepicker({
                                    format: 'DD-MM-YYYY'
                                });
                            	
                                $("section.content-header h1").html("User Signup");
                                $(".treeview-menu li").removeClass("active");
                                $(".treeview-menu li:nth-child(1)").addClass("active");
                                
                            });
 

                </script>