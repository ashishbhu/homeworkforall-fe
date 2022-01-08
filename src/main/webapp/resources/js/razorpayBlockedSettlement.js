$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "block/unblock/payout/razorpay/dataList?phone="+$("#phone").val();
		var table = $('#razorpayBlockedSettlementTable').dataTable({
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
				"mData": "referenceId",
				"bSortable": false
			},
			{
				"sTitle": "CreateDate",
				"mData": "createDate",
				"bSortable": false
			},
			{
				"sTitle": "ReferenceId",
				"mData": "referenceId",
				"bSortable": false
			},
			{
				"sTitle": "Amount",
				"mData": "amount",
				"bSortable": false
			},
			{
				"sTitle": "AppName",
				"mData": "appName",
				"bSortable": false
			},
			{
				"sTitle": "Identifier",
				"mData": "identifier",
				"bSortable": false,
			},
			{
				"sTitle": "Registered Mobile",
				"mData": "phone",
				"bSortable": false,
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
					if(row.status == 'blocked'){
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
		
		$("#razorpayBlockedSettlementTable").on('draw.dt', function() {
			$(".dt-process").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-success' style='display:float:left;'>PROCESS</button><a class='dt-action'></a>");
						$(this).unbind().on('click', function() {
							if (confirm('are you sure you want to process this record?')) {
								var table = $('#razorpayBlockedSettlementTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								//var path = SITEBASEURL+ 'block/unblock/payout/process/blocked/razorpay/payout/'+ data.referenceId;
								//$("<form action='"+ path+ "'></form>").appendTo('body').submit();
								processPayout(data.referenceId);
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
								var table = $('#razorpayBlockedSettlementTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								//var path = SITEBASEURL+ 'block/unblock/payout/reject/blocked/razorpay/payout/'+ data.referenceId;
								//$("<form action='"+ path+ "'></form>").appendTo('body').submit();
								rejectPayout(data.referenceId);
							} else {
								return false;
							}
						});
					});
		});

}

function rejectPayout(referenceId) {
	window.location.href = SITEBASEURL + 'block/unblock/payout/reject/blocked/razorpay/payout/'+referenceId+"?phone="+$("#phone").val();
}

function processPayout(referenceId){
	window.location.href = SITEBASEURL + 'block/unblock/payout/process/blocked/razorpay/payout/'+referenceId+"?phone="+$("#phone").val();
}