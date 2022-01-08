$(document).ready(function() {
	//callToSearchResults();
});

function callToSearchResults() {
	var sellerId = $("#sellerId").val();
	if(sellerId == null || sellerId == 'undefined'){
		sellerId = '';
	}
	var reportUrl = SITEBASEURL + "seller/sla/categoryList?month="+ $("#month").val() + "&year="+ $("#year").val() +"&sellerId="+sellerId;
	var table = $('#sellerCategoryTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "SellerNickName",
			"bSortable": false,
			"render": function (sellerNickName, type, row) {
		        if (row.sellerNickName == null) {
		            return "";
		            }
		            else {
		            	return row.sellerNickName;
		            }
			}
		}, {
			"sTitle": "Category",
			"mData": "category",
			"bSortable": false
		},{
			"sTitle": "StartDate",
			"mData": "startDate",
			"bSortable": false
		},{
			"sTitle": "EndDate",
			"mData": "endDate",
			"bSortable": false
		}, {
			"sTitle": "Duration",
			"mData": "duration",
			"bSortable": false
		}, {
			"sTitle": "Marks",
			"mData": "marks",
			"bSortable": false
		}, {
			"sTitle": "Penalty",
			"mData": "penalty",
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