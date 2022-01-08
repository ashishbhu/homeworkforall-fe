$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "local91Product/search/term/dataList?pincodes="+$("#pincode").val()+"&langCode="+$("#langCode").val();
		var table = $('#local91SearchTermTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bLengthChange": false,
			"bFilter": false,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "pincode",
				"bSortable": false
			},
			{
				"sTitle": "Pincode",
				"mData": "pincode",
				"bSortable": false
			},
			{
				"sTitle": "Term",
				"mData": "term",
				"bSortable": false
			},
			{
				"sTitle": "Language Code",
				"mData": "langCode",
				"bSortable": false
			},
			{
				"sTitle": "Search Time",
				"mData": "searchTime",
				"bSortable": false
			},
			{
				"sTitle": "NumFound",
				"mData": "numFound",
				"bSortable": false
			},
			{
				"sTitle": "SearchCount",
				"mData": "searchCount",
				"bSortable": false
			},
			{
				"sTitle": "GlobalSearchCount",
				"mData": "globalSearchCount",
				"bSortable": false
			},
			{
				"sTitle": "Suggest",
				"mData": "suggest",
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
		
		$("#local91SearchTermTable").on('draw.dt', function() {
			
		});

}
