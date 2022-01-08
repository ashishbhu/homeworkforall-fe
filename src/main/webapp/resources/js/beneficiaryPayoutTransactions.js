$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "exceptional/refund/beneficiary/payout/dataList";
		var table = $('#beneficiaryPayoutTransactionsTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bFilter": false,
			"scrollX": true,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			},
			{
				"sTitle": "Date",
				"mData": "date",
				"bSortable": false
			},
			{
				"sTitle": "AppName",
				"mData": "appName",
				"bSortable": false
			},
			{
				"sTitle": "TxnKey",
				"mData": "txnKey",
				"bSortable": false
			},
			{
				"sTitle": "Amount",
				"mData": "amount",
				"bSortable": false
			},
			{
				"sTitle": "Registered Phone",
				"mData": "registeredPhoneNumber",
				"bSortable": false
			},
			{
				"sTitle": "Payment Mode",
				"mData": "paymentMode",
				"bSortable": false
			},
			{
				"sTitle": "Beneficiary Phone",
				"bSortable": false,
				render : function(data, phone, row, meta) {
					if(row.phone == null){
						return "-";
					} else {
						return row.phone;
					}
				}
			},
			{
				"sTitle": "UPI",
				"bSortable": false,
				render : function(data, upi, row, meta) {
					if(row.upi == null){
						return "-";
					} else {
						return row.upi;
					}
				}
			},
			{
				"sTitle": "Account Holder Name",
				"bSortable": false,
				render : function(data, accountHolderName, row, meta) {
					if(row.accountHolderName == null){
						return "-";
					} else {
						return row.accountHolderName;
					}
				}
			},
			{
				"sTitle": "Account Number",
				"bSortable": false,
				render : function(data, accountNumber, row, meta) {
					if(row.accountNumber == null){
						return "-";
					} else {
						return row.accountNumber;
					}
				}
			},
			{
				"sTitle": "IFSC",
				"bSortable": false,
				render : function(data, ifsc, row, meta) {
					if(row.ifsc == null){
						return "-";
					} else {
						return row.ifsc;
					}
				}
			},
			{
				"sTitle": "Status",
				"mData": "payoutStatus",
				"bSortable": false
			},
			{
                "sTitle": "Action",
                "bSortable": false,
                	render : function(data, payoutStatus, row, meta) {
    					if(row.payoutStatus == 'ADMITTED'){
    						return "<h5><a class='dt-reject' style='cursor: pointer'></a></h5>";
    					} else {
    						return "";
    					}
    				}
            },
			],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});
		
		$("#beneficiaryPayoutTransactionsTable").on('draw.dt', function() {
			 $(".dt-reject").each(function() {
		        	$(this).empty();
		            $(this).addClass('text-default').append('<button class="btn btn-danger" style="color:white; border: none;padding: 7px 18px;">REJECT</button>');
		            var table = $('#beneficiaryPayoutTransactionsTable').DataTable();
		            $(this).unbind().on('click', function() {
		                var table = $('#beneficiaryPayoutTransactionsTable').DataTable();
		                var data = table.row($(this).parents('tr')).data();
		                if (confirm("Are you sure you want to reject ?")) {
		                	var path = SITEBASEURL + 'exceptional/refund/reject/beneficiary/payout/' + data.txnKey;
			                $("<form action='" + path + "'></form>").appendTo('body').submit();
            				return true;
            			  } else {
            				return false;
            			  }
		            });
		        });
		});

}
