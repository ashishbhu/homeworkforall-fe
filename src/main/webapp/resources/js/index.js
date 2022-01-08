$(document).ready(function(){
	
	if (window.location.href.indexOf("campaign") > -1) {
		$("#campaignTab").addClass("active");
	} else if(window.location.href.indexOf("publisher") > -1) {
		$("#publisherTab").addClass("active");
	} else if(window.location.href.indexOf("user") > -1) {
		$("#userTab").addClass("active");
	} else if(window.location.href.indexOf("agency") > -1) {
		$("#agencyTab").addClass("active");
	}else  {
		$("#dashboardTab").addClass("active");
	}

})