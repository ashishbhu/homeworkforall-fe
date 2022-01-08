$(document).ready(function() {

	callToGetResults("");
	
	$("#export").click(function(){
		callToExportResults();
	});
	
	$("#search").click(function(){
		
		callToGetResults($("#orderId").val()); 
		});
});



function callToGetResults(orderId) {

	var reportUrl = SITEBASEURL + "mall91Refund/pagelist-for-refundOrders-processing?fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val() +"&orderId="+orderId;
	//var reportUrl = SITEBASEURL + "mall91Refund/pagelist?orderState="+$("#orderState").val() +"&paymentMethod="+$("#paymentMethod").val() +"&orderId="+orderId;
	
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
						"scrollX":true,
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
						},
						{
							"sTitle" : "Phone",
							"mData" : "addressDTO.contactNumber",
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
						},
						{
							"sTitle" : "Return Date",
							"mData" : "returnRequestDate",
							"bSortable" : true
						},
						
						{
							"sTitle": "Action",
							"bSortable": false,
							"sDefaultContent": "<div class= 'row' style = 'width:230px'><div class= 'col-sm-1'><a class='dt-confirm'></a></div><div class= 'col-sm-1'><a class='dt-cancel' style=margin-left:80px;></a></div></div>"
						},
						
						{
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
												callToView( data.orderReturnDTO.id);
												/*var path = SITEBASEURL + 'mall91Refund/get-return-order-by-id/'+ data.orderReturnDTO.id+
												"/"+$("#orderState").val()+"/"+$("#paymentMethod").val();
												$("<form action='" + path + "'></form>").appendTo('body').submit();*/
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
					
					$(".dt-confirm").each(function() {
						$(this).empty();
						var table = $('#orderSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
							$(this).addClass('text-default').append('<button style="background:#28B463; color:white; border: none;padding: 7px 18px;">CONFIRM</button>');
							$(this).on('click', function() {
								
								processRefundOrderRequest(data.orderId,"INITIATED_CONFIRMED");
								});
						
					});

					$(".dt-cancel").each(function() {
						$(this).empty();
						var table = $('#orderSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						
							$(this).append('<button style="background:#FF5733; color:white; border: none;padding: 7px 18px;">CANCEL</button>');
							$(this).on('click', function() {
								
								processRefundOrderRequest(data.orderId,"CANCELED");
							});
						

					});
					});
}



function callToView(id){
	window.location.href = SITEBASEURL + 'mall91Refund/get-return-order-by-id/'+ id+
	"/"+$("#orderState").val()+"/"+$("#paymentMethod").val()+"?isRefundOrderProcessing=true&fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val()	;
}

function processRefundOrderRequest(orderId,status){
	
	$(".modal-body #orderReturnStatus").val(status);
	
	$(".modal-body #orderIdforPopup").val(orderId);
	
	$('#scriptModalForConfirmOrCancel').modal('show');
}

function callToExportResults() {
	
	window.location.href = SITEBASEURL + "mall91Refund/return-initiated-orders-download?fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val() +"&orderId="+$("#orderId").val();

}



