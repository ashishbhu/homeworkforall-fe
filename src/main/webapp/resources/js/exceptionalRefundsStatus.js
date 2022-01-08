$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "exceptional/refund/status/dataList?status="+$("#status").val()+"&merchantId="+$("#merchantId").val()+"&merchantOrderId="+$("#merchantOrderId").val();
		var table = $('#exceptionalRefundsStatusTable').dataTable({
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
				"sTitle": "PaymentSource",
				"mData": "paymentSource",
				"bSortable": false
			},
			{
				"sTitle": "PaymentMode",
				"mData": "paymentMode",
				"bSortable": false
			},
			{
				"sTitle": "Phone",
				"bSortable": false,
				render : function(data, phone, row, meta) {
					if(row.phone == null){
						return "-";
					} else {
						return row.phone;
					}
				}
			},
			{
				"sTitle": "UPI",
				"bSortable": false,
				render : function(data, upi, row, meta) {
					if(row.upi == null){
						return "-";
					} else {
						return row.upi;
					}
				}
			},
			{
				"sTitle": "AccountHolderName",
				"bSortable": false,
				 render : function(data, accountHolderName, row, meta) {
					if(row.accountHolderName == null){
						return "-";
					} else {
						return row.accountHolderName;
					}
				}
			},
			{
				"sTitle": "AccountNumber",
				"bSortable": false,
				render : function(data, accountNumber, row, meta) {
					if(row.accountNumber == null){
						return "-";
					} else {
						return row.accountNumber;
					}
				}
			},
			{
				"sTitle": "IFSC",
				"bSortable": false,
				render : function(data, ifsc, row, meta) {
					if(row.ifsc == null){
						return "-";
					} else {
						return row.ifsc;
					}
				}
			},
			{
				"sTitle": "Transaction Summary",
				"sDefaultContent": "<a class='dt-statsTransitions'></a>",
				"bSortable": false
			},
			{
				"sTitle" : "Action",
				"bSortable" : false,
				render : function(data, refundStatus, row, meta) {
					if(row.refundStatus == 'TXN_FAILURE'){
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
		
		$("#exceptionalRefundsStatusTable").on('draw.dt', function() {
			$(".dt-update").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-success' style='display:float:left;'>UPDATE PAYMENT MODE</button>");
						$(this).on('click', function() {
								var table = $('#exceptionalRefundsStatusTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								var path = SITEBASEURL+ 'exceptional/refund/override/payment/mode/'+ data.id+"/"+data.merchantId+"/"+data.merchantOrderId+"/"+data.merchantName;
								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
							});
					});
			
			$(".dt-statsTransitions").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				$(this).on('click', function() {
					var table = $('#exceptionalRefundsStatusTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					getStatusTransitions(data.id);
				});
			});
		});

}

function getStatusTransitions(id) {
	var transitionUrl = SITEBASEURL + "exceptional/refund/transaction/summery/" + id;
	$("#modelBox").empty();
	$(".modal-body #modelBox").load(transitionUrl);
	$('#scriptModal').modal('show');
}
