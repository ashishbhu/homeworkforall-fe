$(document).ready(function() {
	callToResults();
	$("#partyName").change(function(){
		callToResults();
	});
});

function callToResults(){
	var reportUrl = SITEBASEURL + "finance/listing?partyName="+$("#partyName").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy": true,
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "bStateSave": true,
        "scrollX": true,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }
        ,
        {
                "sTitle": "App TxnId",
                "mData": "appTransactionId",
                "bSortable": false
        }
        , {
            "sTitle": "Party Name",
            "mData": "partyName",
            "bSortable": false
        }, {
            "sTitle": "File",
            "bSortable": false,
            "sDefaultContent": "<h5><a class='dt-view' style='cursor: pointer'></a></h5>",
           /* "render": function (fileUrl, type, row) {
		       return '<embed src="'+row.fileUrl+'" height="80px" width="80px"></embed>';
			}*/
            
        }
        ,
         {
            "sTitle": "Transaction Name",
            "mData": "transactionName",
            "bSortable": false
        },
         {
            "sTitle": "Event",
            "mData": "event",
            "bSortable": false
        }
        ,
        {
                "sTitle": "Amount",
                "mData": "amount",
                "bSortable": false
        }
        ,
        {
                "sTitle": "Transaction Type",
                "mData": "transactionType",
                "bSortable": false
        }
        ,
        {
                "sTitle": "Status",
                "mData": "status",
                "bSortable": false
        }
        ,
        {
                "sTitle": "Bill Received Date",
                "render": function (billReceivedDate, type, row) {
    		        if (row.billReceivedDate != null) {
    		            return row.billReceivedDate;
    		         } else {
    		            	return '';
    		         }
    			}
         },
        {
                "sTitle": "Payment Date",
                "render": function (displayPaymentDate, type, row) {
    		        if (row.displayPaymentDate != null) {
    		            return row.displayPaymentDate;
    		         } else {
    		            	return '';
    		         }
    			}
         }
        , {
			"sTitle": "Action",
			"bSortable": false,
			"render": function (status, type, row) {
		        if (row.status == 'PENDING') {
		            return "<h4><a class='dt-edit'></a></h4>";
		         } else {
		            	return '-';
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
	
	$("#groupBuyTable").on('draw.dt', function() {
		 $(".dt-view").each(function() {
	        	$(this).empty();
	            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
	            $(this).on('click', function() {
	                var table = $('#groupBuyTable').DataTable();
	                var data = table.row($(this).parents('tr')).data();
	               viewFile(data.fileUrl);
	            });
	        });
        $(".dt-edit").each(function() {
        	$(this).empty();
            $(this).append("<button class='btn btn-custom'>Mark /Paid</button>");
            $(this).on('click', function() {
                //if (confirm('are you sure you want to mark status as PAID?')) {
            	
           		//alert($(':hidden#creationTime').val());
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    
                    $('#scriptModal').modal('show');
               		$('.modal-backdrop.fade.in').css("display", "none")
                    $("#appName").val(data.appName);
               		$("#appTransactionId").val(data.appTransactionId);
               		
                   // var path = SITEBASEURL + 'finance/update/partyPayment/status/' + data.appName+"/"+data.appTransactionId;
                   // $("<form action='" + path + "'></form>").appendTo('body').submit();
               // }
//                else{
//                    return false;
//                }

            });
        });
    });
}
function viewFile(url){
	window.open(url, '_blank'); 
}
