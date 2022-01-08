$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "seller/deal/dataList?status="+$("#status").val()+"&dealType="+$("#dealType").val();
		var table = $('#sellerDealsTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bFilter": false,
			"scrollX": true,
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
				"sTitle": "SellerName",
				"mData": "sellerName",
				"bSortable": false,
				render : function(data, type, row, meta) {
					return '<a href="' + SITEBASEURL
							+ 'seller-request/'
							+ row.sellerId +"/"+ false
							+ '" target="_blank">' + row.sellerName
							+ '</a>';
				}
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
				"sTitle": "PriceDetails",
				"mData": "dealCreationSellerCostPrice",
				"bSortable": false
			},
			{
				"sTitle": "DealType",
				"mData": "dealType",
				"bSortable": false
			},
			{
				"sTitle": "Discount%",
				"mData": "sellerCostPriceDiscountPercentage",
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
				"sTitle": "Status",
				"mData": "status",
				"bSortable": false
			},
			{
				"sTitle": "Comment",
				"mData": "comment",
				"bSortable": false,
				render : function(data, comment, row, meta) {
					if(row.comment != null){
						return row.comment;
					} else {
						return "";
					}
				}
			},
			{
				"sTitle": "Avg. QualityRating",
				"bSortable": false,
				render : function(data, type, row, meta) {
					if(row.rating == null || row.rating == ''){
						return '';
					} else {
						return row.rating;
					}
				}
			},
			{
				"sTitle": "TotalStock",
				"mData": "totalStock",
				"bSortable": false
			},
			{
				"sTitle" : "Action",
				"bSortable" : false,
				render : function(data, status, row, meta) {
					if(row.status == 'PENDING'){
						return "<span><a class='dt-approve'></a> <a class='dt-reject'></a></span>";
					} else {
						return "_";
					}
				}
			},
			{
				"sTitle" : "Update",
				"bSortable" : false,
				render : function(data, status, row, meta) {
					if(row.status == 'PENDING'){
						return "<span><a class='dt-update'></a></span>";
					} else {
						return "_";
					}
				}
			},
			],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});
		
		$("#sellerDealsTable").on('draw.dt', function() {
			$(".dt-approve").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-danger' style='display:float:left;'>APPROVE</button><a class='dt-action'></a>");
						$(this).on('click', function() {
								var table = $('#sellerDealsTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								//var path = SITEBASEURL+ 'seller/deal/approve/'+ data.id;
								//$("<form action='"+ path+ "'></form>").appendTo('body').submit();
								approveDeal(data.id);
							});
					});
			
			$(".dt-reject").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-warning' style='display:float:left;'>REJECT</button><a class='dt-action'></a>");
						$(this).on('click', function() {
								var table = $('#sellerDealsTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
//								var path = SITEBASEURL+ 'seller/deal/reject/'+ data.id;
//								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
								showModel(data.id);
							});
					});
			
			$(".dt-update").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
						$(this).on('click', function() {
								var table = $('#sellerDealsTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								var path = SITEBASEURL+ 'seller/deal/update/'+ data.id;
								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
							});
					});
		});

}
	
	function showModel(id){
		$('#scriptModal').modal('show');
		$(".modal-body #id").val(id);
	}
	
function approveDeal(id){
	window.location.href = SITEBASEURL +'seller/deal/approve/'+id+"?status="+$("#status").val()+"&dealType="+$("#dealType").val();
}
