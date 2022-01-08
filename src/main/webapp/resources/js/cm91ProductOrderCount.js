$(document).ready(
		function() {
			/*$("section.content-header h1").html("Dukaan91 Products");*/
			
			callToSearchResults();
		});
	

function callToSearchResults() {

var reportUrl = SITEBASEURL + "community91OpsOrder/cm91-pagelist";
				
	console.log("search url =" + reportUrl);
	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						}, {
							"sTitle" : "Product Name",
							"mData" : "productName",
							"bSortable" : false
						},
						{
							"sTitle" : "Image",
							"mData" : "displayImageUI",
							"bSortable" : false
						},
						{
							"sTitle" : "Order Count",
							"mData" : "ordersCount",
							"bSortable" : false
						},
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
}