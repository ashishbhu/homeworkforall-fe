$(document).ready(function() {
	callToSearchResults();
});

function callToSearchResults() {
	var reportUrl = SITEBASEURL + "appTransaction/pagelist";
	var table = $('#lenden91SearchTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": true,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "Business Name",
			"mData": "businessName",
			"bSortable": false
		},{
			"sTitle": "Business Category",
			"mData": "businessCategory",
			"bSortable": false
		},{
			"sTitle": "Registration Date",
			"mData": "registrationDate"
		}, {
			"sTitle": "Settlement Type",
			"mData": "settlementType",
			"bSortable": false
		}, {
			"sTitle": "Bank Details",
			"mData": "bankDetails",
			"bSortable": false
		},
		{
			"sTitle": "VPA",
			"mData": "vpa",
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