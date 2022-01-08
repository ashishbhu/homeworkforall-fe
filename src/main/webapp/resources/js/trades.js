$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "utility/trade/dataList?fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val();
		var table = $('#tradesTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bFilter": false,
			"scrollX": true,
			"iDisplayLength": 50,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			},
			{
				"sTitle": "Quantity",
				"mData": "quantity",
				"bSortable": false
			},
			{
				"sTitle": "Price",
				"mData": "price",
				"bSortable": false
				
			},
			{
				"sTitle": "Buy Trade OrderId",
				"mData": "buyTradeOrderId",
				"bSortable": false
			},
			{
				"sTitle": "Sell Trade OrderId",
				"mData": "sellTradeOrderId",
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
		
		$("#tradesTable").on('draw.dt', function() {
			
		});

}
