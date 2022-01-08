$(document).ready(function() {
	//callResults();
});

function callResults() {

	var reportUrl = SITEBASEURL
			+ "local91OpsOrder/pagelist-for-local91-seller-payment?fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val()+"&searchType="+$("#searchType").val()+"&searchTerm="+$("#searchTerm").val()+"&status="+$("#status").val();

	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						//"bStateSave" : true,
						"searching": false,
						"scrollX": true,
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
									"sTitle" : "OrderId",
									"mData" : "orderId",
									"bSortable" : false
								},
								{
									"sTitle" : "Amount",
									"mData" : "amount",
									"bSortable" : false
								},
								{
									"sTitle" : "Date",
									"mData" : "displayDate",
									"bSortable" : false
								},
								{
									"sTitle" : "Bank ReferenceId",
									// "mData" : "bankReferenceId",
									"bSortable" : false,
									"render" : function(bankReferenceId, type,
											row) {
										if (row.bankReferenceId == null) {
											return "-";
										} else {
											return row.bankReferenceId;
										}
									}
								},
								{
									"sTitle" : "TransactionId",
									// "mData" : "transactionId",
									"bSortable" : false,
									"render" : function(transactionId, type,
											row) {
										if (row.transactionId == null) {
											return "-";
										} else {
											return row.transactionId;
										}
									}
								},
								{
									"sTitle" : "Merchant ReferenceId",
									// "mData" : "merchantReferenceId",
									"bSortable" : false,
									"render" : function(merchantReferenceId,
											type, row) {
										if (row.merchantReferenceId == null) {
											return "-";
										} else {
											return row.merchantReferenceId;
										}
									}
								},
								{
									"sTitle" : "SettlementId",
									"mData" : "id",
									"bSortable" : false
								},
								{
									"sTitle" : "Master SettlementId",
									"mData":"masterSettlementId",
									"bSortable" : false
								},
								{
									"sTitle" : "Payment Transfer Mode",
									//"mData" : "paymentTransferMode",
									"bSortable" : false,
									"render" : function(paymentTransferMode,
											type, row) {
										if (row.paymentTransferMode == null) {
											return "-";
										} else {
											return row.paymentTransferMode;
										}
									}
								},
								{
									"sTitle" : "Phone",
									"mData" : "sellerPhone",
									"bSortable" : false
								},
								{
									"sTitle" : "Payment Refund Status",
									// "mData" : "paymentRefundStatus",
									"bSortable" : false,
									"render" : function(paymentRefundStatus,
											type, row) {
										if (row.paymentRefundStatus == null) {
											return "-";
										} else {
											return row.paymentRefundStatus;
										}
									}
								},
								{
									"sTitle": "Transaction Summary",
									//"sDefaultContent": "<a class='dt-statsTransitions'></a>",
									"bSortable": false,
									"render" : function(paymentRefundStatus, type, row) {
										if (row.paymentRefundStatus != null && (row.paymentTransferMode == 'PAYTM' || row.paymentTransferMode == 'BANK_UPI')) {
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
	
	$("#orderSearchTable").on('draw.dt', function() {

		$(".dt-statsTransitions").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).on('click', function() {
				var table = $('#orderSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				getStatusTransitions(data.masterSettlementId, data.paymentTransferMode, data.merchantReferenceId);
			});
		});

	});

}

function getStatusTransitions(id, paymentTransferMode, merchantReferenceId) {
	if(paymentTransferMode == "BANK_UPI"){
		id = merchantReferenceId;
	}
	var sellerTicketUrl = SITEBASEURL + "withDrawal/fetchLocal91TransactionStatus/"+paymentTransferMode +"/"+ id;
	$("#modelBox").empty();
    $(".modal-body #modelBox").load(sellerTicketUrl);
    $('#scriptModal').modal('show');
}
