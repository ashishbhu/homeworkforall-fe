$(document).ready(function() {
	 $("#promotion").removeClass("active");
     $("#mall91").addClass("active");
     $("#mall91 li:nth-child(6)").addClass("active");
     $("#Courier91").removeClass("active");
     $("#Dukaan91").removeClass("active");
     $("#Lenden91").removeClass("active");
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

	var reportUrl = SITEBASEURL + "mall91Refund/pagelist?orderState="+$("#orderState").val() +"&paymentMethod="+$("#paymentMethod").val() +"&orderId="+orderId;
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
							"sTitle" : "Supplier",
							//"mData" : "supplierName",
							"bSortable" : false,
							"render": function (supplierName, type, row) {
			    		        if (row.supplierName == null) {
			    		            return "-";
			    		            }
			    		            else {
			    		            	return row.supplierName;
			    		            }
			    			}
						},
						{
							"sTitle" : "Buyer",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						}, {
							"sTitle" : "paidAmt",
							"mData" : "totalPaidAmount",
							"bSortable" : false
						},
						{
							"sTitle" : "Order Date",
							"mData" : "orderDate",
							"bSortable" : false
						}, {
							"sTitle" : "State",
							"mData" : "orderStateUI",
							"bSortable" : false
						}, {
							"sTitle" : "Payment",
							"mData" : "paymentMethodUI",
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
											$(this).unbind().on('click',function() 
											{
												var table = $('#orderSearchTable').DataTable();
												var data = table.row($(this).parents('tr')).data();
												var path = SITEBASEURL + 'mall91Refund/get-return-order-by-id/'+ data.orderReturnDTO.id+
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
								$(this).unbind().on('click',function() 
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