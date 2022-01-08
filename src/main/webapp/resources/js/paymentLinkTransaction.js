$(document).ready(function() {
	callToResults();
});
function callToResults(){
	var reportUrl = SITEBASEURL + "finance/payment/link/transaction/dataList?merchantOrderId="+$("#merchantOrderId").val();
	var table = $('#paymentLinkTransactionsTable').dataTable({
		"destroy": true,
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "bStateSave": false,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "CreateDate",
            "mData": "date",
            "bSortable": false
        } ,
        {
            "sTitle": "Gateway TxnId",
            "bSortable": false,
            "render": function (gatewayTxnId, type, row) {
		        if (row.gatewayTxnId != null) {
		            return row.gatewayTxnId;
		            }
		            else {
		            	return "";
		            }
			}
        } ,
        {
            "sTitle": "MerchantOrderId",
            "mData": "merchantOrderId",
            "bSortable": false
        } ,
        {
            "sTitle": "Amount",
            "mData": "amount",
            "bSortable": false
        } ,
        {
            "sTitle": "Status",
            "mData": "status",
            "bSortable": false
        },
        {
            "sTitle": "Action",
            "bSortable": false,
            "render": function (status, type, row) {
		        if (row.status == 'TXN_SUCCESS') {
		            return "<a class='dt-action'></a>";
		            }
		            else {
		            	return "";
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
	
	$("#paymentLinkTransactionsTable").on('draw.dt', function() {
        $(".dt-action").each(function() {
        	$(this).empty();
            $(this).addClass('text-default').append("<button class='btn btn-warning' style='display:float:left;'>REFUND</button>");
            var table = $('#paymentLinkTransactionsTable').DataTable();
            $(this).on('click', function() {
                var table = $('#paymentLinkTransactionsTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                if (confirm('Are you sure?')) {
                  var path = SITEBASEURL + 'finance/process/payment/link/refund/' + data.merchantOrderId;
                  $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
            });
        });

    });

}

