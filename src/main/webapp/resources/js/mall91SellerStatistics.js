$(document).ready(
		function() {

			var statisticsUrl = SITEBASEURL + "mall91OpsOrder/order-count-statistics-forSeller";
			var requestMethodType = "GET";

			$.ajax({
				url : statisticsUrl,
				type : requestMethodType,
				contentType : "application/json",
				dataType : "json",
				beforeSend: function(){
			                     $("#loader").show();
             		                 },
				success :  function(result)
				         { 
					updateStatistics(result) 
				        },
			    complete:function(data){
					
			           $("#loader").hide();
            		},
				error : function(jqXHR, textStatus, errorThrown) {
					if (jqXHR.responseText !== '') {
						var r = jQuery.parseJSON(jqXHR.responseText);
						$("#reportWrapper").html(r.message).addClass("error");
					} else {
						$("#reportWrapper").html(jqXHR.statusText).addClass(
								"error");
					}

				}
			});
			
			callSlaPerformanceCount();

		});


function updateStatistics(result) {
	
	$("#orderPlaceToSupplier").html("Total : "+ result.orderPlaceToSupplier);
	
	$("#orderReadyToDispatch").html("Total : "+ result.orderReadyToDispatch);
	
	$("#orderDispatched").html("Total : "+ result.orderDispatched);

	$("#returnByUser").html("Total : "+ result.returnByUser);
	
	$("#orderOutOfStock").html("Total : "+ result.outOfStock);
	$("#lowStock").html("Total : "+result.lowStock);
	
	$("#orderDelivered").html("Total : "+result.orderDelivered);

  
}

function callSlaPerformanceCount() {
	var slaPerformsnceCountUrl = SITEBASEURL + "seller/sla/performance/count";
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

function updateSlaPerformanceCount(result) {
	$("#slaOptsTotalCount").html("Total : "+ result.totalOptsCount);
	$("#slaOptsMessage").html("Orders still present in ORDER_PLACED_TO_SUPPLIER state:");
	//$("#slaOptsPercentageRange1").html("a) Since last 1 to 2 days : "+result.optsRange1Count+"("+result.optsPercentage1+"%)");
	$("#slaOptsPercentageRange1").html("<a href='"+SITEBASEURL+"/mall91OpsOrder/order/dispatch/performance?status=ORDER_PLACED_TO_SUPPLIER&minDays=1&maxDays=2' target='_blank' style='color:yellow;'>a) Since last 1 to 2 days : "+result.optsRange1Count+"("+result.optsPercentage1+"%)</a>");
	$("#slaOptsPercentageRange2").html("<a href='"+SITEBASEURL+"/mall91OpsOrder/order/dispatch/performance?status=ORDER_PLACED_TO_SUPPLIER&minDays=2&maxDays=3' target='_blank' style='color:yellow;'>b) Since last 2 to 3 days : "+result.optsRange2Count+"("+result.optsPercentage2+"%)</a>");
	$("#slaOptsPercentageRange3").html("<a href='"+SITEBASEURL+"/mall91OpsOrder/order/dispatch/performance?status=ORDER_PLACED_TO_SUPPLIER&minDays=3&maxDays=999' target='_blank' style='color:yellow;'>c) >3 days : "+result.optsRange3Count+"("+result.optsPercentage3+"%)</a>");
	
	$("#totalOrtdCount").html("Total : "+ result.totalOrtdCount);
	$("#slaOrtdMessage").html("Orders marked ORDER_READY_TO_DISPATCH but still not Dispatched :");
	$("#ortdRange1Count").html("<a href='"+SITEBASEURL+"/mall91OpsOrder/order/dispatch/performance?status=ORDER_READY_TO_DISPATCH&minDays=1&maxDays=2' target='_blank' style='color:yellow;'>a) Since last 1 to 2 days : "+result.ortdRange1Count+"("+result.ortdPercentage1+"%)</a>");
	$("#ortdRange2Count").html("<a href='"+SITEBASEURL+"/mall91OpsOrder/order/dispatch/performance?status=ORDER_READY_TO_DISPATCH&minDays=2&maxDays=999' target='_blank' style='color:yellow;'>b) >2 days : "+result.ortdRange2Count+"("+result.ortdPercentage2+"%)</a>");
	
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
