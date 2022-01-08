$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "seller/deal/details/dataList";
		var table = $('#sellerDealDetailsSellerTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bFilter": false,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			},
			{
				"sTitle": "DateSubmitted",
				"mData": "createDateTime",
				"bSortable": false
			},
			{
				"sTitle": "Status",
				"mData": "status",
				"bSortable": false
			},
			{
				"sTitle": "StartTime",
				"mData": "startDateTime",
				"bSortable": false
			},
			{
				"sTitle": "EndTime",
				"mData": "endDateTime",
				"bSortable": false
			},
			{
				"sTitle": "Discount %",
				"mData": "sellerCostPriceDiscountPercentage",
				"bSortable": false
			},
			{
				"sTitle": "ProductId",
				"bSortable": false,
				render : function(data, type, row, meta) {
					return '<a href="' + SITEBASEURL
							+ 'mall91Product/get/'
							+ row.productId +"/"+ row.sellerId +"/0"
							+ '" target="_blank">' + row.productId
							+ '</a>';
				}
			},
			{
				"sTitle": "Image",
				"bSortable": false,
				"render" : function(image, type, row) {
					if (row.image == 'null' || row.image == undefined) {
						return " ";
					} else {
						return "<a target='_blank' href="
								+ row.image
								+ "><img src="
								+ row.image
								+ " height='40px' width='40px'></a>";
					}
				}
			},
			{
				"sTitle": "Net Orders",
				"mData": "totalOrders",
				"bSortable": false
			},
			{
				"sTitle": "Total GMV",
				"mData": "totalGmv",
				"bSortable": false
			},
			{
				"sTitle": "DealType",
				"mData": "dealType",
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
		
		$("#sellerDealDetailsSellerTable").on('draw.dt', function() {
//			$(".dt-cancel").each(
//					function() {
//						$(this).empty();
//						$(this).addClass('text-default')
//						.append("<button class='btn btn-danger' style='display:float:left;'>CANCEL</button><a class='dt-action'></a>");
//						$(this).on('click', function() {
//								var table = $('#sellerDealDetailsSellerTable').DataTable();
//								var data = table.row($(this).parents('tr')).data();
//								var path = SITEBASEURL+ 'seller/deal/cancel/'+ data.id;
//								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
//							});
//					});
			
		});

}
