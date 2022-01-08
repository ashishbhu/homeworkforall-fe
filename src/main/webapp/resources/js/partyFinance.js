$(document).ready(function() {
	callToResults();
});
function callToResults(){
	var reportUrl = SITEBASEURL + "finance/partyListing";
	var table = $('#groupBuyTable').dataTable({
		"destroy": true,
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "bStateSave": true,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "partyName",
            "bSortable": false
        }, {
            "sTitle": "Party Name",
            "mData": "partyName",
            "bSortable": false
        } 
        , {
            "sTitle": "Is For Expense",
            "bSortable": false,
            "render": function (isForExpense, type, row) {
		        if (row.isForExpense == true) {
		            return '<span class="fa fa-check" style="color:green; font-size:30px; " aria-hidden="true"></span>';
		         } else {
		            	return '';
		         }
			}
        } 
        , {
            "sTitle": "Transaction Name",
           // "mData": "transactionName",
            "bSortable": false,
            "render": function (transactionName, type, row) {
		        if (row.transactionName != null) {
		           return row.transactionName;
		         } else {
		           return '';	
		         }
			}
        }
        , {
            "sTitle": "Event",
           // "mData": "event",
            "bSortable": false,
            "render": function (event, type, row) {
		        if (row.event != null) {
		           return row.event;
		         } else {
		            return '';	
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

