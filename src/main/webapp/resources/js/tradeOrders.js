$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "utility/trade/order/dataList?fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val();
		var table = $('#tradeOrdersTable').dataTable({
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
				"sTitle": "MerchantOrderId",
				"mData": "merchantOrderId",
				"bSortable": false
			},
			{
				"sTitle": "Stock",
				"mData": "stock",
				"bSortable": false
				
			},
			{
				"sTitle": "Type",
				"mData": "type",
				"bSortable": false
			},
			{
				"sTitle": "Quantity",
				"mData": "quantity",
				"bSortable": false
			},
			{
				"sTitle": "Remaining Quantity",
				"mData": "remainingQuantity",
				"bSortable": false
			},
			{
				"sTitle": "Price",
				"mData": "price",
				"bSortable": false
			},
			{
				"sTitle": "Timestamp",
				"mData": "timestampStr",
				"bSortable": false,
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
		
		$("#tradeOrdersTable").on('draw.dt', function() {
			
		});

}
