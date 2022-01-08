$(document).ready(function() {

	callToGetResults("");
	
	$("#orderState").change(function() {
		callToGetResults("");
	});
	
	$("#paymentMethod").change(function() {
		callToGetResults("");
	});
	
	$("#search").click(function(){
		if($("#orderId").val() == null || $("#orderId").val() == ""){
			alert("Enter Order Id.");
			return;
		}
		callToGetResults($("#orderId").val()); 
		});
});


function updateOrderState(orderId) {
	$.ajax({
		url : SITEBASEURL + 'mall91Refund/process-refund-status/' + orderId,
		type : "GET",
		contentType : "application/json",
		success : function(data) {
			console.log(data);
			$("#mes_div").text(data);
			var $mes_div = $("#mes_div");
			$mes_div.show();
			setTimeout(function() {
				$mes_div.hide();
			}, 10000);
		},
		error : function(request, status, error) {
			$("#mes_div").text(
					"Something went wrong while refunding orders");
			var $mes_div = $("#mes_div");
			$mes_div.show();
			setTimeout(function() {
				$mes_div.hide();
			}, 10000);
		}
	});
}

function callToGetResults(orderId) {

	var reportUrl = SITEBASEURL + "mall91Refund/orderReturnListing?orderState="+$("#orderState").val() +"&paymentMethod="+$("#paymentMethod").val() +"&orderId="+orderId;
	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"language": {
							 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
						    },
						    processing : true,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						},{
							"sTitle" : "Order Id",
							"mData" : "orderId",
							"bSortable" : false
						},
						{
							"sTitle" : "Tracking Number",
							//"mData" : "trackingNumber",
							"bSortable" : false,
				            "render": function (trackingNumber, type, row) {
			    		        if (row.trackingNumber == null) {
			    		            return "-";
			    		            }
			    		            else {
			    		            	return row.trackingNumber;
			    		            }
			    			}
						},
						{
							"sTitle" : "Courier Partner",
							//"mData" : "courierPartner",
							"bSortable" : false,
							"render": function (courierPartner, type, row) {
			    		        if (row.courierPartner == null) {
			    		            return "-";
			    		            }
			    		            else {
			    		            	return row.courierPartner;
			    		            }
			    			}
						}, {
							"sTitle" : "Parent Courier Partner",
							//"mData" : "parentCourierPartner",
							"bSortable" : false,
							"render": function (parentCourierPartner, type, row) {
			    		        if (row.parentCourierPartner == null) {
			    		            return "-";
			    		            }
			    		            else {
			    		            	return row.parentCourierPartner;
			    		            }
			    			}
						},
						{
							"sTitle" : "Order Return Date",
							"mData" : "returnDate",
							"bSortable" : false
						}, {
							"sTitle" : "Order Return Status",
							"mData" : "orderReturnStatus",
							"bSortable" : false
						}, {
							"sTitle" : "Detail",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit-n'></a>"
						}
						],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							return nRow;
						},
					});

				$("#orderSearchTable").on(
					'draw.dt',function() {$(".dt-edit-n")
								.each(function() {
											$(this).empty();
											$(this).addClass('text-default').append(
															"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
											$(this).on('click',function() 
											{
												var table = $('#orderSearchTable').DataTable();
												var data = table.row($(this).parents('tr')).data();
												var path = SITEBASEURL + 'mall91Refund/view-return-order-by-id/'+ data.id+
												"/"+$("#orderState").val()+"/"+$("#paymentMethod").val();
												$("<form action='" + path + "'></form>").appendTo('body').submit();
										   });
										});
					var count = 1;
					$(".dt-refund-n")
							.each(function() {
								$(this).empty();
								$(this).addClass('text-default').append(
								"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
								$(this).on('click',function() 
										{
										var table = $('#orderSearchTable').DataTable();
										var data = table.row($(this).parents('tr')).data();
										var amount=data.totalPaidAmount;
										if (confirm("Are you sure to refund Rs. "+amount +" ?") == true) {
											var table = $('#orderSearchTable').DataTable();
											var data = table.row($(this).parents('tr')).data();
											updateOrderState(data.orderId);
											//var path = SITEBASEURL + '/mall91Refund/process-refund-status/get/'+ data.orderId;
											//$("<form  method='get'  action='" + path + "'></form>").appendTo('body').submit();
									     } else {
									    	 return false;
									     }
								      });
						});
					});
}