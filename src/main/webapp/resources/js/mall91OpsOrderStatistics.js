$(document).ready(
		function() {

			$("section.content-header h1").html("<h3 id='codOrderCreatedToday'></h4> <h3 id='onlineOrderCreatedToday'> </h4>");
			var statisticsUrl = SITEBASEURL + "mall91OpsOrder/order-count-statistics";
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

		});


function updateStatistics(result) {
	$("#confirmedOrder").html("Total : "+ result.confirmedOrder);
	$("#confirmedOrderToday").html("Today Modified: "+ 	result.confirmedOrderToday);
	$("#orderPlaceToSupplier").html("Total : "+ result.orderPlaceToSupplier);
	$("#orderPlaceToSupplierToday").html("Today : "+result.orderPlaceToSupplierToday);
	$("#orderReceivedFromSupplier").html("Total : "+ result.orderReceivedFromSupplier);
	$("#orderReceivedFromSupplierToday").html("Today : "+result.orderReceivedFromSupplierToday);
	$("#orderReadyToDispatch").html("Total : "+ result.orderReadyToDispatch);
	$("#orderReadyToDispatchToday").html("Today : "+result.orderReadyToDispatchToday);
	$("#orderDispatched").html("Total : "+ result.orderDispatched);
	$("#orderDispatchedToday").html("Today : "+result.orderDispatchedToday)
	$("#cancelledBySeller").html("Total : "+ result.cancelledBySeller);
	$("#cancelledBySellerToday").html("Today : "+	result.cancelledBySellerToday);
	$("#cancelledByUser").html("Total : "+ result.cancelledByUser);
	$("#cancelledByUserToday").html("Today : "+result.cancelledByUserToday);
	$("#orderDelivered").html("Total : "+ result.orderDelivered);
	$("#orderDeliveredToday").html("Today : "+result.orderDeliveredToday);

    if(result.orderDelivered == 0)
    {
    $("#codOrderCreatedToday").html("Mall91 Ops Orders");
	}
	else{
	$("#codOrderCreatedToday").html("COD Received : "+ 	result.codOrderCreatedToday);
	$("#onlineOrderCreatedToday").html("Online Received : "+ 	result.onlineOrderCreatedToday);
	}

	$("#groupConfirmed").html("Total : "+ result.groupConfirmed);
	$("#groupConfirmedToday").html("Today : "+ 	result.groupConfirmedToday);

	$("#groupCancelled").html("Total : "+ result.groupCancelled);
	$("#groupCancelledToday").html("Today : "+ 	result.groupCancelledToday);

	$("#inInventory").html("Total : "+ result.inInventory);
	$("#inInventoryToday").html("Today : "+ result.inInventoryToday);
}
