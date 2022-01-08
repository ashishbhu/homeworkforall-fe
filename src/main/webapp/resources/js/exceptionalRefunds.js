$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "exceptional/refund/dataList?merchantId="+$("#merchantId").val()+"&merchantOrderId="+$("#merchantOrderId").val();
		var table = $('#exceptionalRefundsTable').dataTable({
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
				"sTitle": "MerchantName",
				"mData": "merchantName",
				"bSortable": false
			},
			{
				"sTitle": "MerchantId",
				"mData": "merchantId",
				"bSortable": false
			},
			{
				"sTitle": "MerchantOrderId",
				"mData": "merchantOrderId",
				"bSortable": false
			},
			{
				"sTitle": "RefundId",
				//"mData": "refundId",
				"bSortable": false,
				render : function(data, refundId, row, meta) {
					if(row.refundId == null){
						return "-";
					} else {
						return row.refundId;
					}
				}
			},
			{
				"sTitle": "GatewayRefundId",
				//"mData": "gatewayRefundId",
				"bSortable": false,
				render : function(data, gatewayRefundId, row, meta) {
					if(row.gatewayRefundId == null){
						return "-";
					} else {
						return row.gatewayRefundId;
					}
				}
			},
			{
				"sTitle": "TransactionDate",
				"mData": "transactionDate",
				"bSortable": false
			},
			{
				"sTitle": "RefundCreateDate",
				"mData": "refundCreateDate",
				"bSortable": false
			},
			{
				"sTitle": "Amount",
				"mData": "amount",
				"bSortable": false
			},
			{
				"sTitle": "RefundStatus",
				"mData": "refundStatus",
				"bSortable": false
			},
			{
				"sTitle" : "Action",
				"bSortable" : false,
				render : function(data, refundStatus, row, meta) {
					if(row.refundStatus == 'ADMITTED' || row.refundStatus == 'TXN_FAILURE'){
						return "<span><a class='dt-update'></a></span>";
					} else {
						return "_";
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
		
		$("#exceptionalRefundsTable").on('draw.dt', function() {
			$(".dt-update").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-success' style='display:float:left;'>UPDATE PAYMENT MODE</button>");
						$(this).unbind().on('click', function() {
								var table = $('#exceptionalRefundsTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								var path = SITEBASEURL+ 'exceptional/refund/update/payment/mode/'+ data.id+"/"+data.merchantId+"/"+data.merchantOrderId+"/"+data.merchantName;
								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
							});
					});
		});

}
