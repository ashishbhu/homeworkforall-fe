$(document).ready(function() {
	//callResults();
});

function callResults() {
	var reportUrl = SITEBASEURL + "exceptional/refund/local91/refund/dataList?orderId="+$("#orderId").val()+"&searchBy="+$("#searchBy").val();
	$("#orderTable_wrapper").html("");
	var table = $('#local91OrderPaymentsTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						//"bStateSave" : true,
						"searching": false,
						"sScrollX" : true,
						"sAjaxSource" : reportUrl,

						"language" : {
							processing : '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
						},
						processing : true,
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								},
								{
									"sTitle" : "OrderPaymentId",
									"mData" : "orderPaymentId",
									"bSortable" : false
								},
								{
									"sTitle" : "OrderId",
									"mData" : "orderId",
									"bSortable" : false
								},
								{
									"sTitle" : "MasterOrderId",
									"bSortable" : false,
									"render" : function(masterOrderId, type, row) {
										if(row.masterOrderId != null) {
											return row.masterOrderId;
										} else {
											return "";
										}
									}
								},
								{
									"sTitle" : "SubOrderReferenceIds",
									"bSortable" : false,
									"render" : function(subOrderReferenceIds, type, row) {
										if (row.subOrderReferenceIds == null) {
											return "";
										} else {
											return row.subOrderReferenceIds;
										}
									}
								},
								{
									"sTitle" : "PaymentMethod",
									"bSortable" : false,
									"render" : function(paymentMethod, type, row) {
										if (row.paymentMethod == null) {
											return "";
										} else {
											return row.paymentMethod;
										}
									}
								},
								{
									"sTitle" : "DiscountedWalletAmount",
									"bSortable" : false,
									"render" : function(discountedWalletAmount, type, row) {
										if (row.discountedWalletAmount == null) {
											return "";
										} else {
											return row.discountedWalletAmount;
										}
									}
								},
								{
									"sTitle" : "WalletRefundStatus",
									"bSortable" : false,
									"render" : function(walletRefundStatus, type,
											row) {
										if (row.walletRefundStatus == null) {
											return "";
										} else {
											return row.walletRefundStatus;
										}
									}
								},
								{
									"sTitle" : "discountedShoppingWalletAmount",
									"bSortable" : false,
									"render" : function(discountedShoppingWalletAmount, type, row) {
										if (row.discountedShoppingWalletAmount == null) {
											return "";
										} else {
											return row.discountedShoppingWalletAmount;
										}
									}
								},
								{
									"sTitle" : "ShoppingWalletRefundStatus",
									"bSortable" : false,
									"render" : function(shoppingWalletRefundStatus, type, row) {
										if (row.shoppingWalletRefundStatus == null) {
											return "";
										} else {
											return row.shoppingWalletRefundStatus;
										}
									}
								},
								{
									"sTitle" : "Amount",
									"mData" : "amount",
									"bSortable" : false
								},
								{
									"sTitle" : "PaymentRefundStatus",
									"bSortable" : false,
									"render" : function(paymentRefundStatus, type, row) {
										if (row.paymentRefundStatus == null) {
											return "";
										} else {
											return row.paymentRefundStatus;
										}
									}
								},
								{
									"sTitle" : "PaymentRefundMessage",
									"bSortable" : false,
									"render" : function(paymentRefundMessage, type, row) {
										if (row.paymentRefundMessage == null) {
											return "";
										} else {
											return row.paymentRefundMessage;
										}
									}
								},
								{
									"sTitle" : "RefundId",
									"bSortable" : false,
									"render" : function(refundId, type, row) {
										if (row.refundId == null) {
											return "";
										} else {
											return row.refundId;
										}
									}
								},
								{
									"sTitle" : "TransactionId",
									"bSortable" : false,
									"render" : function(transactionId, type, row) {
										if (row.transactionId == null) {
											return "";
										} else {
											return row.transactionId;
										}
									}
								},
								{
									"sTitle": "Transaction Summary",
									"bSortable": false,
									"render" : function(data, type, row, meta) {
										if (row.amount >0 && row.paymentMethod != 'COD' && row.refundId != null) {
											return "<a class='dt-statsTransitions'></a>";
										} else {
											return "";
										}
									}
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
	
	$("#local91OrderPaymentsTable").on('draw.dt', function() {

		$(".dt-statsTransitions").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).on('click', function() {
				var table = $('#local91OrderPaymentsTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				getLocal91RefundStatusByRefundId(data.refundId);
			});
		});

	});

}

function getLocal91RefundStatus(orderId, refundId) {
	var sellerTicketUrl = SITEBASEURL + "exceptional/refund/local91/refund/status/"+orderId +"/"+ refundId;
	var requestMethodType = "GET";
	$.ajax({
		url : sellerTicketUrl,
		type : requestMethodType,
		contentType : "application/json",
		dataType : "json",
		success :  function(result)
		{ 
		  showStatusResult(result) 
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
}

function showStatusResult(result){
	$('#scriptModal').modal('show');
	$("#modelBox").empty();
	if(result != null && result.status != null){
		$('<div id="div1" style="border:1px solid;  border-radius: 5px; margin-top:10px; background-color: #faf9f7; height:auto; padding:5px;">').appendTo('#modelBox');
		$('<div class="form-group"><label class="col-sm-2 control-label">Status:</label><div class="col-sm-10"><input type="text" class="form-control" readonly="true" id="status"></div></div>').appendTo('#div1');
		$('<div class="form-group"><label class="col-sm-2 control-label">Message:</label><div class="col-sm-6"><input type="text" class="form-control" readonly="true" id="message"></div></div>').appendTo('#div1');
		
		$("#status").val(result.status);
		$("#message").val(result.message);
		
	} else if(result != null && result.errorMessage != null){
		$('<div id="div" style="border:1px solid;  border-radius: 5px; margin-top:10px; background-color: #faf9f7; height:100px; padding:5px;">').appendTo('#modelBox');
		$('<span style="float: left; font-weight: 900; color:red;">'+result.errorMessage+'</span>').appendTo('#div');
	} else {
		$('<div id="div" style="border:1px solid;  border-radius: 5px; margin-top:10px; background-color: #faf9f7; height:100px; padding:5px;">').appendTo('#modelBox');
		$('<span style="float: left; font-weight: 900; color:red;">Response not getting from PG.</span>').appendTo('#div');
	}
	
}

function getLocal91RefundStatusByRefundId(refundId){
	var appName = "LOCAL91";
	var transitionUrl = SITEBASEURL + "exceptional/refund/transaction/summary/" + appName+"/"+refundId;
	$("#modelBox").empty();
	$(".modal-body #modelBox").load(transitionUrl);
	$('#scriptModal').modal('show');
}
