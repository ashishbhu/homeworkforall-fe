$(document).ready(function() {
	callToResults();
	
	$("#search").click(function() {
		callToResults();
    });
	
	$("#addCodRefundPayment").click(function() {
		if (orderIds != null && orderIds != '') {
			window.location.href = SITEBASEURL + 'mall91Refund/bulk-cod-refund/'+ orderIds;
		} else {
			alert("Select checkbox!");
		}
	});
});

var orderIds = [];

function addOrderIdsToArray(id){
	
/*if ($('#recommended_id'+id).is(':checked')) {
		orderIds.push(id);
	}
	else{
		var index = orderIds.indexOf(id);
		if (index > -1) {
			orderIds.splice(index, 1);
		}
	}*/
	 if (confirm('are you sure you want to Refund this order?')) {
		 orderIds.push(id);
if (orderIds != null && orderIds != '') {
	window.location.href = SITEBASEURL + 'mall91Refund/bulk-cod-refund/'+ orderIds;
}
	 }
}

function addAllOrderIds(){
	orderIds = [];
	var oTable = $("#groupBuyTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(2).data()
      .each( function ( value, index ) {
           orderIds.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
}

function updateBankInfo(id){
	 if (confirm('are you sure you want to update bank details this order?')) {
	if (id != null && id != '') {
		window.location.href = SITEBASEURL + 'mall91Refund/getBankDetails/'+ id;
	}
	 }
}

function callToResults() {
	var reportUrl = SITEBASEURL + "mall91Refund/refundCodListing?orderId="+$("#orderId").val();
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
								
								/*{
		    					"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllOrderIds()'></input>",
		    					"bSortable": false,
		    					'mRender': function( url, type, full ) {
		    					return '<input type="checkbox" id="recommended_id'+full.orderId+'" name="recommended_id" class="breaking_checkbox" onclick="addOrderIdsToArray('+full.orderId+')" value="'+full.orderId+'"  />';	  }
		    					},*/
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
								},
								{
									"sTitle" : "Action",
									"bSortable" : false,
									'mRender': function( url, type, full ) {
									if (full.paymentRefundStatus == null) {
										if (full.paymentMode == 'BANK_UPI') {
											return '<input type="text" id="recommended_id'+full.orderId+'" name="recommended_id" value="'+full.orderId+'" class="form-control" style="height:0;position:absolute;z-index: -1;opacity: .01;" /><button onclick="addOrderIdsToArray('+full.orderId+')" class="btn btn-warning">Refund</button>';
										} else {
											return '<input type="text" id="recommended_id'+full.orderId+'" name="recommended_id" value="'+full.orderId+'" class="form-control" style="height:0;position:absolute;z-index: -1;opacity: .01;" /><button onclick="addOrderIdsToArray('+full.orderId+')" class="btn btn-custom">Refund</button>';
										}
									}
									 else
									 {
										 return '<input type="text" id="recommended_id'+full.returnId+'" name="recommended_id" value="'+full.returnId+'" class="form-control" style="height:0;position:absolute;z-index: -1;opacity: .01;" /><button onclick="updateBankInfo('+full.returnId+')" class="btn btn-custom">Update Bank Details </button>';
											
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

}
