$(document).ready(function() {
	callToResults();
    
});
function callToResults(){
	var reportUrl = SITEBASEURL + "nodal/payoutListing";
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : true,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
		"scrollX": true,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        },
        
        {
            "sTitle" : "Name",
            "mData" : "benName",
            "bSortable" : false
        },{
            "sTitle": "Account No",
            "mData": "benAccNo",
             "bSortable": false
         },
        {
            "sTitle": "Ifsc",
            "mData": "benIfsc",
            "bSortable": false
        },{
            "sTitle" : "Amount",
            // "mData" : "amount",
             "bSortable" : false,
             "render": function (amount, type, row) {
 		        if (row.amount == null) {
 		            return "-";
 		            }
 		            else {
 		            	return row.amount;
 		            }
 			}
         },{
             "sTitle" : "TxnRequest Id",
             // "mData" : "txnRequestId",
              "bSortable" : false,
              "render": function (txnRequestId, type, row) {
  		        if (row.txnRequestId == null) {
  		            return "-";
  		            }
  		            else {
  		            	return row.txnRequestId;
  		            }
  			}
          },
          {
              "sTitle" : "Transaction Type",
             // "mData" : "transactionType",
              "bSortable" : false,
              "render": function (transactionType, type, row) {
  		        if (row.transactionType == null ) {
  		            return "-";
  		            }
  		            else {
  		            	return row.transactionType;
  		            }
  			}
          },
          {
              "sTitle": "Initial Status",
              //"mData": "initialStatus",
              "bSortable": false,
              "render": function (initialStatus, type, row) {
  		        if (row.initialStatus == null) {
  		            return "-";
  		            }
  		            else {
  		            	return row.initialStatus;
  		            }
  			}
              
          }
          
          ,
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
}

