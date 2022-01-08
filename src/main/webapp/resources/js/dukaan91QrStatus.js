$(document).ready(function() {
	callToSearchResults();
});


function callToSearchResults() {
	var reportUrl = SITEBASEURL + "dukan91OpsOrder/dukaan91QrStatusList";
	var table = $('#lenden91Table')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": false,
		"bFilter": false,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "identifier",
			"bSortable": false
		},
		{
			"sTitle": "C91 Partner Id",
			"mData": "identifier",
			"bSortable": false
		},{
			"sTitle": "Code",
			"mData": "code",
			"bSortable": false
		}, {
			"sTitle": "AppName",
			"mData": "appName",
			"bSortable": false
		},{
			"sTitle": "Active",
			//"mData": "sellerId"
			"render": function (active, type, row) {
    		        if (row.active == false) {
    		            return "InActive";
    		            }
    		            else {
    		            	return "Active";
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
}