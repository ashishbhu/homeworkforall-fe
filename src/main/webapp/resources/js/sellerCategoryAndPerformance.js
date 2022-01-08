function callSlaPerformanceCount() {
	var slaPerformsnceCountUrl = SITEBASEURL + "seller/sla/performance/count?month="+$("#month").val()+"&year="+$("#year").val();
	var requestMethodType = "GET";

	$.ajax({
		url : slaPerformsnceCountUrl,
		type : requestMethodType,
		contentType : "application/json",
		dataType : "json",
		beforeSend: function(){
	           $("#slaLoader").show();
     		                 },
		success :  function(result)
		         { 
			updateSlaPerformanceCount(result) 
		        },
	    complete:function(data){
	         $("#slaLoader").hide();
    		},
		error : function(jqXHR, textStatus, errorThrown) {
			$("#slaLoader").hide();
			if (jqXHR.responseText !== '') {
				var r = jQuery.parseJSON(jqXHR.responseText);
				$("#reportWrapper").html(r.message).addClass("error");
			} else {
				$("#reportWrapper").html(jqXHR.statusText).addClass(
						"error");
			}

		}
	});
}

function callSlaCategory() {
	var slacategoryUrl = SITEBASEURL + "seller/sla/category/data?month="+$("#month").val()+"&year="+$("#year").val();
	var requestMethodType = "GET";

	$.ajax({
		url : slacategoryUrl,
		type : requestMethodType,
		contentType : "application/json",
		dataType : "json",
		beforeSend: function(){
	           //$("#slaLoader").show();
     		                 },
		success :  function(result)
		         { 
			updateSlaCategory(result) 
		        },
	    complete:function(data){
	       //  $("#slaLoader").hide();
    		},
		error : function(jqXHR, textStatus, errorThrown) {
			//$("#slaLoader").hide();
			if (jqXHR.responseText !== '') {
				var r = jQuery.parseJSON(jqXHR.responseText);
				$("#reportWrapper").html(r.message).addClass("error");
			} else {
				$("#reportWrapper").html(jqXHR.statusText).addClass(
						"error");
			}

		}
	});
}

function updateSlaPerformanceCount(result) {
	setDefaultData();
	$("#slaOptsTotalCount").html("Total : "+ result.totalOptsCount);
	$("#slaOptsMessage").html("Orders still present in ORDER_PLACED_TO_SUPPLIER state:");
	$("#slaOptsPercentageRange1").html("a) Since last 1 to 2 days : "+result.optsRange1Count+"("+result.optsPercentage1+"%)");
	$("#slaOptsPercentageRange2").html("b) Since last 2 to 3 days : "+result.optsRange2Count+"("+result.optsPercentage2+"%)");
	$("#slaOptsPercentageRange3").html("c) >3 days : "+result.optsRange3Count+"("+result.optsPercentage3+"%)");
	
	$("#totalOrtdCount").html("Total : "+ result.totalOrtdCount);
	$("#slaOrtdMessage").html("Orders marked ORDER_READY_TO_DISPATCH but still not Dispatched :");
	$("#ortdRange1Count").html("a) Since last 1 to 2 days : "+result.ortdRange1Count+"("+result.ortdPercentage1+"%)");
	$("#ortdRange2Count").html("b) >2 days : "+result.ortdRange2Count+"("+result.ortdPercentage2+"%)");
	
	$("#totalProductRating").html("Total : "+ result.totalProductRating);
	$("#productRatingMessage").html("Products ratings received :");
	$("#productRatingPercentage1").html("a) 0 to 2.5 : "+result.productRatingPercentage1+"%");
	$("#productRatingPercentage2").html("b) 2.5 to 3.5 : "+result.productRatingPercentage2+"%");
	$("#productRatingPercentage3").html("c) 3.5 to 4.5 : "+result.productRatingPercentage3+"%");
	$("#productRatingPercentage4").html("d) 4.5 to 5 : "+result.productRatingPercentage4+"%");
	
	$("#totalCbsCount").html("Total : "+ result.totalCbsCount);
	$("#cbsMessage").html("Cancelled by you in respect of Total Orders Received :");
	$("#cbsPercentage").html(result.cbsPercentage+"%");
	
	$("#totalCrCount").html("Total : "+ result.totalCrCount);
	$("#crMessage").html("Total Orders returned by customers in respect of Total Delivered :");
	$("#crPercentage").html(result.crPercentage+"%");
	
}

function setDefaultData(){
	$("#slaOptsTotalCount").html("Total : 0");
	$("#slaOptsMessage").html("Orders still present in ORDER_PLACED_TO_SUPPLIER state:");
	$("#slaOptsPercentageRange1").html("a) Since last 1 to 2 days : "+0+"("+0+"%)");
	$("#slaOptsPercentageRange2").html("b) Since last 2 to 3 days : "+0+"("+0+"%)");
	$("#slaOptsPercentageRange3").html("c) >3 days : "+0+"("+0+"%)");
	
	$("#totalOrtdCount").html("Total : "+ 0);
	$("#slaOrtdMessage").html("Orders marked ORDER_READY_TO_DISPATCH but still not Dispatched :");
	$("#ortdRange1Count").html("a) Since last 1 to 2 days : "+0+"("+0+"%)");
	$("#ortdRange2Count").html("b) >2 days : "+0+"("+0+"%)");
	
	$("#totalProductRating").html("Total : "+ 0);
	$("#productRatingMessage").html("Products ratings received :");
	$("#productRatingPercentage1").html("a) 0 to 2.5 : "+0+"%");
	$("#productRatingPercentage2").html("b) 2.5 to 3.5 : "+0+"%");
	$("#productRatingPercentage3").html("c) 3.5 to 4.5 : "+0+"%");
	$("#productRatingPercentage4").html("d) 4.5 to 5 : "+0+"%");
	
	$("#totalCbsCount").html("Total : "+ 0);
	$("#cbsMessage").html("Cancelled by you in respect of Total Orders Received :");
	$("#cbsPercentage").html(0+"%");
	
	$("#totalCrCount").html("Total : "+ 0);
	$("#crMessage").html("Total Orders returned by customers in respect of Total Delivered :");
	$("#crPercentage").html(0+"%");
}

function updateSlaCategory(result) {
	$("#sellerCategory").html("");
	$("#sellerCategory").html(result.category);
}
