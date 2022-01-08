$(document).ready(function() {
	callToResults();
	$("#search").click(function() {
		callToResults();
    });
});

var orderIds = [];

function suborderRefund(suborderId,suborderIds){
	if (confirm('are you sure you want to Refund this order?')) {
		if (suborderId != null && suborderId != '') {
			orderIds.push(suborderIds);
			alert(suborderIds[1]);
			window.location.href = SITEBASEURL + 'local91Product/cod-refund/'+suborderIds+'/'+ suborderId;
		}
	}
}


function updateBankInfo(id){
	if (confirm('are you sure you want to update bank details this order?')) {
		if (id != null && id != '') {
			window.location.href = SITEBASEURL + 'local91Product/getBankDetails/'+ id;
		}
	 }
}

function callToResults() {
	var reportUrl = SITEBASEURL + "local91Product/refundCodListing?orderId="+$("#orderId").val();
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
									"sTitle" : "Sub OrderIds",
									"mData" : "suborderIds",
									"bSortable" : false
								}
								,
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
									"sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'></a></h5>"
									/*
									'mRender': function( url, type, full ) {
									if (full.paymentRefundStatus == null) {
										if (full.paymentMode == 'BANK_UPI') {
											return '<input type="text" id="recommended_id'+full.subOrderId+'" name="recommended_id" value="'+full.orderId+'" class="form-control" style="height:0;position:absolute;z-index: -1;opacity: .01;" /><button onclick="suborderRefund('+full.subOrderId+','+full.suborderIds+')" class="btn btn-warning">Refund</button>';
										} else {
											return '<input type="text" id="recommended_id'+full.subOrderId+'" name="recommended_id" value="'+full.orderId+'" class="form-control" style="height:0;position:absolute;z-index: -1;opacity: .01;" /><button onclick="suborderRefund('+full.subOrderId+','+full.suborderIds+')" class="btn btn-custom">Refund</button>';
										}
									}
/*									 else
									 {
										 return '<input type="text" id="recommended_id'+full.returnId+'" name="recommended_id" value="'+full.returnId+'" class="form-control" style="height:0;position:absolute;z-index: -1;opacity: .01;" /><button onclick="updateBankInfo('+full.returnId+')" class="btn btn-custom">Update Bank Details </button>';
											
									 }*/
				    						  
			    					//}
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
	
	$("#groupBuyTable").on('draw.dt', function() {
        $(".dt-edit").each(function() {
        	$(this).empty();
    		var table = $('#groupBuyTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.paymentRefundStatus == null){
				$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Refund">');
			}
            $(this).unbind().on('click', function() {
            	if (confirm('are you sure you want to Refund this order?')) {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'local91Product/cod-refund/' + data.suborderIds+"/"+data.subOrderId;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            	}
            });
        });


    });

}
