$(document).ready(function() {
	callToResults();
});

function callToResults() {
	var sellerId = $("#sellerId").val();
	var itemId = $("#itemId").val();
	if(sellerId == null){
		sellerId = '';
	}
	if(itemId == null){
		itemId = '';
	}
	var reportUrl = SITEBASEURL + "mall91Product/price/change/history/data?sellerId="+sellerId+"&itemId="+itemId;
	var table = $('#itemPriceHistoryTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"sAjaxSource" : reportUrl,
						"language" : {
							"processing" : "<i class='fa fa-refresh fa-spin'></i>",
						},
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								}, 
								{
									"sTitle" : "Date",
									"mData" : "date",
									"bSortable" : false,
								},
								{
									"sTitle" : "ItemId",
									"mData" : "itemId",
									"bSortable" : false
								},
								{
									"sTitle" : "Old SellerCostPrice",
									"mData" : "oldSellerCostPrice",
									"bSortable" : false,
									render : function(data, type, row, meta) {
										if(row.oldSellerCostPrice != null){
											return row.oldSellerCostPrice;
										} else {
											return "";
										}
								}
								},
								{
									"sTitle" : "New SellerCostPrice",
									"mData" : "newSellerCostPrice",
									"bSortable" : false
								},
								{
									"sTitle" : "Source",
									"mData" : "source",
									"bSortable" : false
								}

						],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							return nRow;
						},
					});
	
	$("#itemPriceHistoryTable").on('draw.dt', function() {
		
	});
}
