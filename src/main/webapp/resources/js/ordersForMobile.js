$(document).ready(function() {
	callToSearchResults(null);
});

function callToSearchResults(orderIdOrPhone) {
	//alert(orderId);
var reportUrl = SITEBASEURL + "mall91OpsOrder/mobile-pagelist?orderIdOrPhone="+orderIdOrPhone;
	//$("#ordersForMobileTable_wrapper").html("");
	var table = $('#ordersForMobileTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"scrollX": false,
						 "language": {
							 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
						    },
						    processing : true,
						
						"aoColumns" : [ 
						{
				           "sTitle" : "#",
				       	   "mData" : "id",
				       	   "bSortable" : false
				        }, 
						{
							"sTitle" : "OrderId",
							"bSortable" : false,
							"render": function (orderId, type, row) {
								var url = SITEBASEURL + "mall91OpsOrder/get-mobile-view?orderId="+row.orderId+"&orderIdOrPhone="+orderIdOrPhone+"&isFromOrderViewPage="+true;
								return '<a href="' + url + '">' + row.orderId + '</a>';
							}
						}						],
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

