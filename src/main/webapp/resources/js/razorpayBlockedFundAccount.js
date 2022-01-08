$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "block/unblock/payout/razorpay/blocked/fundAccount/dataList?phone="+$("#phone").val();
		var table = $('#razorpayBlockedFundAccountTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bFilter": false,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "phone",
				"bSortable": false
			},
			{
				"sTitle": "Registered Mobile",
				"mData": "phone",
				"bSortable": false
			},
			{
				"sTitle": "Type",
				"mData": "type",
				"bSortable": false
			},
			{
				"sTitle": "Account Holder Name",
				"bSortable": false,
				render : function(data, accountHolderName, row, meta) {
					if(row.accountHolderName == null){
						return "";
					} else {
						return row.accountHolderName;	
					}
				}
			},
			{
				"sTitle": "Account",
				"bSortable": false,
				render : function(data, account, row, meta) {
					if(row.account == null){
						return "";
					} else {
						return row.account;	
					}
				}
			},
			{
				"sTitle": "Ifsc",
				"bSortable": false,
				render : function(data, ifsc, row, meta) {
					if(row.ifsc == null){
						return "";
					} else {
						return row.ifsc;	
					}
				}
			},
			{
				"sTitle": "Vpa",
				"bSortable": false,
				render : function(data, vpa, row, meta) {
					if(row.vpa == null){
						return "";
					} else {
						return row.vpa;	
					}
				}
			},
			{
				"sTitle": "Status",
				"mData": "status",
				"bSortable": false
			}
			],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});
		
		$("#razorpayBlockedFundAccountTable").on('draw.dt', function() {
			
		});

}
