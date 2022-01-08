$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "block/unblock/payout/paytm/dataList?phone="+$("#phone").val();
		var table = $('#paytmBlockedPayoutTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bStateSave": true,
			"bFilter": false,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "zykTxnId",
				"bSortable": false
			},
			{
				"sTitle": "CreateDate",
				"mData": "createDate",
				"bSortable": false
			},
			{
				"sTitle": "TxnKey",
				"mData": "zykTxnId",
				"bSortable": false
			},
			{
				"sTitle": "Amount",
				"mData": "amount",
				"bSortable": false
			},
			{
				"sTitle": "MerchantOrderId",
				"mData": "merchantOrderId",
				"bSortable": false,
			},
			{
				"sTitle": "Paytm Number",
				"mData": "mobile",
				"bSortable": false,
			},
			{
				"sTitle": "AppName",
				"bSortable": false,
				render : function(data, appName, row, meta) {
					if(row.appName != '' && row.appName != null){
						return row.appName;
					} else {
						return "";	
					}
				}
			},
			{
				"sTitle": "Registered Mobile",
				"bSortable": false,
				render : function(data, registeredMobile, row, meta) {
					if(row.registeredMobile != '' && row.registeredMobile != null){
						return row.registeredMobile;
					} else {
						return "";	
					}
				}
			},
			{
				"sTitle": "Status",
				"mData": "status",
				"bSortable": false,
			},
			{
				"sTitle" : "Action",
				"bSortable" : false,
				render : function(data, status, row, meta) {
					if(row.status == 'BLOCKED'){
						return "<span><a class='dt-process'></a><a class='dt-reject'></a></span>";
					} else {
						return "";	
					}
				}
			}
			],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});
		
		$("#paytmBlockedPayoutTable").on('draw.dt', function() {
			$(".dt-process").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-success' style='display:float:left;'>PROCESS</button><a class='dt-action'></a>");
						$(this).unbind().on('click', function() {
							if (confirm('are you sure you want to process this record?')) {
								var table = $('#paytmBlockedPayoutTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								//var path = SITEBASEURL+ 'block/unblock/payout/process/blocked/paytm/payout/'+ data.zykTxnId;
								//$("<form action='"+ path+ "'></form>").appendTo('body').submit();
								processPaytmPayout(data.zykTxnId);
							} else {
								return false;
							}
				  });
			});
			
			$(".dt-reject").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-danger' style='display:float:left;'>REJECT</button><a class='dt-action'></a>");
						$(this).unbind().on('click', function() {
							if (confirm('are you sure you want to reject this record?')) {
								var table = $('#paytmBlockedPayoutTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								//var path = SITEBASEURL+ 'block/unblock/payout/reject/blocked/paytm/payout/'+ data.zykTxnId;
								//$("<form action='"+ path+ "'></form>").appendTo('body').submit();
								rejectPaytmPayout(data.zykTxnId);
							} else {
								return false;
							}
						});
					});
		});

}

function rejectPaytmPayout(zykTxnId) {
	window.location.href = SITEBASEURL + 'block/unblock/payout/reject/blocked/paytm/payout/'+zykTxnId+"?phone="+$("#phone").val();
}

function processPaytmPayout(zykTxnId) {
	window.location.href = SITEBASEURL + 'block/unblock/payout/process/blocked/paytm/payout/'+zykTxnId+"?phone="+$("#phone").val();
}
