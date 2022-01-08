$(document).ready(function() {
	callToResults();
});
function callToResults(){
	var reportUrl = SITEBASEURL + "finance/payment/link/dataList?merchantOrderId="+$("#merchantOrderId").val();
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
            "sTitle": "CreateDate",
            "mData": "date",
            "bSortable": false
        } ,
        {
            "sTitle": "MerchantOrderId",
            "mData": "merchantOrderId",
            "bSortable": false
        } ,
        {
            "sTitle": "LinkId",
            "mData": "linkId",
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

