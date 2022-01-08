$(document).ready(function() {
	callToSearchResults();
});

function callToSearchResults() {
	var reportUrl = SITEBASEURL + "seller/sla/markingList";
	var table = $('#sellerMarkingsTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": false,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "PerformanceParameter",
			"mData": "performanceParameter",
			"bSortable": false
		},{
			"sTitle": "MinValue",
			"mData": "minValue",
			"bSortable": false
		},{
			"sTitle": "MaxValue",
			"mData": "maxValue",
			"bSortable": false
		}, {
			"sTitle": "Marks",
			"mData": "marks",
			"bSortable": false
		}, {
			"sTitle": "Penalty",
			"mData": "penalty",
			"bSortable": false
		}, {
			"sTitle": "Comment",
			"mData": "comment",
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