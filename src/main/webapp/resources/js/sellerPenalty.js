$(document).ready(function() {
	//callToSearchResults();
});

function callToSearchResults() {
	var reportUrl = SITEBASEURL + "seller/sla/penaltyList/"+$("#performanceId").val();
	var table = $('#sellerPenaltyTable')
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
			"sTitle": "EntityType",
			"mData": "entityType",
			"bSortable": false
		},{
			"sTitle": "EntityId",
			"mData": "entityId",
			"bSortable": false
		},{
			"sTitle": "Penalty",
			"mData": "penalty",
			"bSortable": false
		}, {
			"sTitle": "PenaltyBaseValue",
			//"mData": "penaltyBaseValue",
			"bSortable": false,
			"render": function (penaltyBaseValue, type, row) {
		        if (row.penaltyBaseValue == null) {
		            return "";
		            }
		            else {
		            	return row.penaltyBaseValue;
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