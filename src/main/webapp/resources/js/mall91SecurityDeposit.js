$(document).ready(function() {
	callToResults();
	$("#orderPaymentStatus").change(function() {
		callToResults();
    });
	
	


    
});
function callToResults(){
	var reportUrl = SITEBASEURL + "appTransaction/securityDepositListing?orderPaymentStatus="+$("#orderPaymentStatus").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : true,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "User Name",
            "mData": "username",
            "bSortable": false
        }, {
            "sTitle": "Amount",
            "mData": "amount",
            "bSortable": false
        },
        {
                "sTitle": "Payment Method",
               /* "mData": "paymentMethod",*/
                "bSortable": false,
                "render": function (paymentMethod, type, row) {
    		        if (row.paymentMethod == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.paymentMethod;
    		            }
    			}
            },
            {
                "sTitle" : "Order Payment Status",
               // "mData" : "orderPaymentStatus",
                "bSortable" : false,
                "render": function (orderPaymentStatus, type, row) {
    		        if (row.orderPaymentStatus == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.orderPaymentStatus;
    		            }
    			}
            }
            /*,{
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'><a class='dt-remove' style='cursor: pointer'></a></h5>"
            }*/
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
    });
	
}

