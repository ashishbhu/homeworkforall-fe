$(document).ready(function() {
	callToResults();
});
function callToResults(){
	var reportUrl = SITEBASEURL + "finance/dataProcessingMislaidLogListing?id="+$("#id").val() +"&searchType="+$("#searchType").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy": true,
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "bStateSave": false,
        "scrollX": true,
        "sAjaxSource": reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
		    },
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }
        , {
            "sTitle": "Application",
            "mData": "appName",
            "bSortable": false
        } 
        , {
            "sTitle": "Transaction Id",
            "mData": "appTransactionId",
            "bSortable": false
        } , {
            "sTitle": "Amount",
            "mData": "amount",
            "bSortable": false
        } , {
            "sTitle": "Gateway Fee",
            //"mData": "gatewayFee",
            "bSortable": false,
            "render": function (gatewayFee, type, row) {
		        if (row.gatewayFee == null) {
		            return "";
		            }
		            else {
		            	return row.gatewayFee;
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

}
