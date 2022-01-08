$(document).ready(function() {
	callToResults();
});
function callToResults(){
	var reportUrl = SITEBASEURL + "finance/payment/link/refund/dataList?merchantOrderId="+$("#merchantOrderId").val();
	var table = $('#paymentLinksTable').dataTable({
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
            "sTitle": "MerchantOrderId",
            "mData": "merchantOrderId",
            "bSortable": false
        } ,
        {
            "sTitle": "RefundId",
            "bSortable": false,
            "render": function (refundId, type, row) {
		        if (row.refundId != null) {
		            return row.refundId;
		            }
		            else {
		            	return "";
		            }
			}
        } ,
        {
            "sTitle": "Gateway RefundId",
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
            "sTitle": "Status",
            "mData": "status",
            "bSortable": false
        },
        {
            "sTitle": "Message",
            "bSortable": false,
            "render": function (message, type, row) {
		        if (row.message != null) {
		            return row.message;
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
	
	$("#paymentLinksTable").on('draw.dt', function() {

    });

}

