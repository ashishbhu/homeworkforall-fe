$(document).ready(function() {
	callToResults();
	
	$("#search").click(function() {
		callToResults();
    });
	
});


function callToResults() {
	var reportUrl = SITEBASEURL + "mall91Refund/codRefundListing?orderId="+$("#orderId").val();
	var table = $('#groupBuyTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"language" : {
							"processing" : "<i class='fa fa-refresh fa-spin'></i>",
						},
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "orderId",
									"bSortable" : false
								}, 
								
								{
									"sTitle" : "Order Id",
									"mData" : "orderId",
									"bSortable" : false

								},
								{
									"sTitle" : "Amount",
									"mData" : "amount",
									"bSortable" : false
								},
								{
									"sTitle" : "Return Date",
									"mData" : "returnDate",
									"bSortable" : false
								},
								{
									"sTitle" : "Courier Partner",
									"mData" : "courierPartner",
									"bSortable" : false
								},
								{
									"sTitle" : "Payment Mode",
									// "mData" : "paymentMode",
									"bSortable" : false,
									"render" : function(paymentMode, type, row) {
										if (row.paymentMode == null) {
											return "-";
										} else {
											return row.paymentMode;
										}
									}
								},
								{
									"sTitle" : "phone",
									//"mData" : "phone",
									"bSortable" : false,
									"render" : function(phone, type, row) {
										if (row.phone == null) {
											return "-";
										} else {
											return row.phone;
										}
									}
								},
								{
									"sTitle" : "Bank UpiId",
									//"mData" : "bankUpiId",
									"bSortable" : false,
									"render" : function(bankUpiId,
											type, row) {
										if (row.bankUpiId == null) {
											return "-";
										} else {
											return row.bankUpiId;
										}
									}
								},
								{
									"sTitle" : "Payment Refund Status",
									//"mData" : "paymentRefundStatus",
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
									"sTitle" : "Message",
									//"mData" : "paymentRefundMessage",
									"bSortable" : false,
									"render" : function(paymentRefundMessage,
											type, row) {
										if (row.paymentRefundMessage == null) {
											return "-";
										} else {
											return row.paymentRefundMessage;
										}
									}
								}, {
									"sTitle" : "Return Status",
									"mData" : "returnStatus",
									"bSortable" : false
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

}
