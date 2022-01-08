$(document).ready(function() {
	callToSearchResults();
    $("#orderType").change(function() {
        callToSearchResults();
    });
    $("#search").click(
            function() {
            	callToSearchResults();
     });
});

function callToSearchResults() {
	$("#appTransaction_wrapper").html("");
	var reportUrl = SITEBASEURL + "appRefundTransaction/listing?orderType=" + $("#orderType").val() + "&fromDate=" + $("#fromDate").val() + "&toDate=" + $("#toDate").val();
	var table = $('#appTransSearch')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": false,
		"bFilter": true,
		"sAjaxSource": reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
		    },
		    processing : true,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "merchantOrderId",
			"bSortable": false
		},{
			"sTitle": "Order Id",
			"mData": "merchantOrderId",
			"bSortable": false
		},  {
			"sTitle": "Transaction Id",
			"mData": "transactionId",
			"bSortable": false
		}, {
			"sTitle": "Refund Amount",
			"mData": "amount",
			"bSortable": false
		}, {
			"sTitle": "Refund Date",
			"mData": "date",
			"bSortable": false
		}, {
			"sTitle": "Name",
			"mData": "name",
			"bSortable": false
		}, {
			"sTitle": "Phone",
			"mData": "phone",
			"bSortable": false
		},
		{
			"sTitle": "App. Name",
			"mData": "applicationName",
			"bSortable": false
		},
		 {
			"sTitle": "Refund Status",
			"mData": "refundStatus",
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

	
}