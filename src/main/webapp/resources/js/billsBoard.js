$(document).ready(function() {

    /*var reportUrl = SITEBASEURL + "billBoard/listing?orderType=" + $("#orderType").val() + "&orderStatus=" + $("#orderStatus").val();
    var table = $('#billBoardTable').dataTable({
        "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSortable": false
            }, {
                "sTitle": "ID",
                "mData": "orderId",
                "bSortable": false
            }, {
                "sTitle": "Name",
                "mData": "name",
                "bSortable": false
            },{
                "sTitle": "Date",
                "mData": "orderDate",
                "bSortable": false
            }, {
                "sTitle": "Amount",
                "mData": "totalAmount",
                "bSortable": false
            }, {
                "sTitle": "Discount",
                "mData": "discountedAmount",
                "bSortable": false
            }, {
                "sTitle": "Amount Paid",
                "mData": "amount",
                "bSortable": false
            },
            {
                "sTitle": "Payment Status",
                "mData": "orderState",
                "bSortable": false
            },
            {
                "sTitle": "Recharge State",
                "mData": "rechargeState",
                "bSortable": false
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'></h4><a class='dt-refund'>"
            }
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
    });
*/
	$("#export").click(function(){
		callToExportResults();
	});
	callToResults();
	
	$('#btnCustomSearch').click(function(){
		callToSearchResults();
	});
	
    $("#billBoardTable").on('draw.dt', function() {
    	$(".dt-edit").each(function() {
    		$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
    		var orderStatus =  $("#orderStatus").val();
    		var orderType =  $("#orderType").val()
    		var table = $('#billBoardTable').DataTable();
    		var data = table.row($(this).parents('tr')).data();
    		// if(orderStatus == 'ALL' && (data.orderState == 'FAILED' || data.orderState == 'PAYMENT_FAILURE'))
    		if(orderStatus == 'ALL' && (data.rechargeState != 'SUCCESS'))
    		{
    			if(data.settlementStatus == 'PENDING')
    			{
    				$(this).parents('tr').css('background', '#FFA07A');
    			}
    			else{
    				$(this).parents('tr').css('background', '#c0ff79');
    			}
    		}
    		$(this).on('click', function() {
    			var table = $('#billBoardTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'billBoard/' + data.orderId +'/'+ orderStatus  +'/'+ orderType+'/'+ true;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
    	$(".dt-refund").each(function() {

    		var orderStatus =  $("#orderStatus").val();
    		var orderType =  $("#orderType").val()
    		var table = $('#billBoardTable').DataTable();
    		var data = table.row($(this).parents('tr')).data();
    		//if(data.orderState == 'FAILED' || data.orderState == 'PAYMENT_FAILURE')
    		if(data.rechargeState != 'SUCCESS')
    		{
    			if(data.settlementStatus == 'PENDING')
    			{
    				$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Confirm Refund</span>");
    				$(this).on('click', function() {
    					var table = $('#billBoardTable').DataTable();
    					var data = table.row($(this).parents('tr')).data();
    					var path = SITEBASEURL + 'billBoard/refund/' + data.orderId  +'/'+ orderStatus  +'/'+ orderType;
    					$("<form action='" + path + "'></form>").appendTo('body').submit();
    				});
    			}
    			else{
    				$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Refund Processed</span>");
    			}
    		}
    	});
    });

    $("#orderType").change(function() {
    	$("#myForm").trigger("reset");
    	$("#txtCustomSearch").attr("placeholder", "Enter OrderId");
        callToSearchResults();
    });

    $("#orderStatus").change(function() {
    	$("#myForm").trigger("reset");
    	$("#txtCustomSearch").attr("placeholder", "Enter OrderId");
        callToSearchResults();
    });
    $("#serviceType").change(function() {
    	$("#myForm").trigger("reset");
    	$("#txtCustomSearch").attr("placeholder", "Enter OrderId");
        callToSearchResults();
    });
});

function callToSearchResults() {
    $("#billBoardTable_wrapper").html("");
    var reportUrl = SITEBASEURL + "billBoard/listing?orderType=" + $("#orderType").val() + "&orderStatus=" + $("#orderStatus").val()+ "&serviceType=" + $("#serviceType").val()+"&searchTerm=" + $("#txtCustomSearch").val()+"&searchType="+$("#searchType").val()+"+&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();
    var table = $('#billsBoardSearchTable')
        .dataTable({
        	"destroy": true,
            "bProcessing": true,
            "bServerSide": true,
            "ordering": true,
            "bSearchable": false,
            "bFilter": true,
            "sAjaxSource": reportUrl,
            "language": {
				"processing": "<i class='fa fa-refresh fa-spin'></i>",
		               	},
            "aoColumns": [{
                    "sTitle": "#",
                    "mData": "id",
                    "bSortable": false
                }, {
                    "sTitle": "ID",
                    "mData": "orderId",
                    "bSortable": false
                }, {
                    "sTitle": "Name",
                    "mData": "name",
                    "bSortable": false
                },  {
                    "sTitle": "Date",
                    "mData": "orderDate",
                    "bSortable": false
                }, 
                {
                    "sTitle": "Amount",
                    "mData": "totalAmountUI",
                    "bSortable": false
                }
                /*{
                    "sTitle": "Amount",
                    "mData": "totalAmount",
                    "bSortable": false
                }, {
                    "sTitle": "Discount",
                    "mData": "discountedAmount",
                    "bSortable": false
                }, {
                    "sTitle": "Amount",
                    "mData": "amount",
                    "bSortable": false
                }*/
                /*,
                {
                    "sTitle": "Payment Status",
                    "mData": "orderState",
                    "bSortable": false
                }*/
                ,
                {
                    "sTitle": "Recharge State",
                    "mData": "rechargeState",
                    "bSortable": false
                },
                {
                    "sTitle": "Application Name",
                    "mData": "applicationName",
                    "bSortable": false
                },
                {
                    "sTitle": "Operator Name",
                    "mData": "rechargeRequest.operatorName",
                    "bSortable": false
                },
                {
                    "sTitle": "Service Type",
                    "mData": "rechargeRequest.serviceType",
                    "bSortable": false
                },
                {
                    "sTitle": "Service",
                    "mData": "rechargeRequest.service",
                    "bSortable": false
                },
                {
                    "sTitle": "Action",
                    "bSortable": false,
                    "sDefaultContent": "<h4><a class='dt-edit'></h4><a class='dt-refund'>"
                }, {
        			"sTitle": "Dispute Status",
        			"bSortable": false,
        			"render": function (disputeStatus, markDisputeEnabled, row) {
        		        if (row.markDisputeEnabled == true) {
        		            return "<h4><a class='dt-dispute'></a></h4>";
        		       }
        		       else if(row.disputeStatus != null){
        		           return row.disputeStatus;
        		       } else {
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

    $("#billsBoardSearchTable").on('draw.dt', function() {
        $(".dt-edit").each(function() {
            $(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var orderStatus =  $("#orderStatus").val();
            var orderType =  $("#orderType").val();
            var serviceType=$("#serviceType").val();
        	var table = $('#billsBoardSearchTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
            if(orderStatus == 'ALL' && (data.orderState == 'FAILED' || data.orderState == 'PAYMENT_FAILURE'))
			{
				if(data.settlementStatus == 'PENDING')
				{
				$(this).parents('tr').css('background', '#FFA07A');
				}
				else{
					$(this).parents('tr').css('background', '#c0ff79');
				}
			}
            $(this).on('click', function() {
                var table = $('#billsBoardSearchTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'billBoard/' + data.orderId +'/'+ orderStatus +'/'+ orderType+'/'+ true;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
        $(".dt-refund").each(function() {
        	$(this).empty();
        	var orderStatus =  $("#orderStatus").val();
        	 var orderType =  $("#orderType").val();
        	 var serviceType=$("#serviceType").val();
        	var table = $('#billsBoardSearchTable').DataTable();
        	var data = table.row($(this).parents('tr')).data();
        	//if(data.orderState == 'FAILED' || data.orderState == 'PAYMENT_FAILURE')
        	if(data.rechargeState != 'SUCCESS')
        	{
				if(data.settlementStatus == 'PENDING')
				{
					$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Confirm Refund</span>");
					$(this).on('click', function() {
						var table = $('#billsBoardSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						var path = SITEBASEURL + 'billBoard/refund/' + data.orderId +'/'+ orderStatus +'/'+ orderType;
						$("<form action='" + path + "'></form>").appendTo('body').submit();
					});
				}
				else{
					$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Refund Processed</span>");
				}
			}
        });

    });
    
    $("#billsBoardSearchTable").on('draw.dt', function() {
    	$(".dt-dispute").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Dispute</button>');
    		var table = $('#billsBoardSearchTable').DataTable();
    		$(this).on('click', function() {
    			var table = $('#billsBoardSearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'billBoard/mark-dispute-by-order/' + data.orderId;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
 });
}

function callToResults(){
	var reportUrl = SITEBASEURL + "billBoard/listing?orderType=" + $("#orderType").val() + "&orderStatus=" + $("#orderStatus").val() + "&searchTerm=" + $("#txtCustomSearch").val()+ "&serviceType=" + $("#serviceType").val()+"&searchType="+$("#searchType").val()+"+&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();
    var table = $('#billBoardTable').dataTable({
        "destroy": true,
    	"bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "sAjaxSource": reportUrl,
        "language": {
			"processing": "<i class='fa fa-refresh fa-spin'></i>",
	               	},
        "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSortable": false
            }, {
                "sTitle": "ID",
                "mData": "orderId",
                "bSortable": false
            }, {
                "sTitle": "Name",
                "mData": "name",
                "bSortable": false
            },{
                "sTitle": "Date",
                "mData": "orderDate",
                "bSortable": false
            }, 
            {
                "sTitle": "Amount",
                "mData": "totalAmountUI",
                "bSortable": false
            }
            /*{
                "sTitle": "Amount",
                "mData": "totalAmount",
                "bSortable": false
            }, {
                "sTitle": "Discount",
                "mData": "discountedAmount",
                "bSortable": false
            }, {
                "sTitle": "Amount Paid",
                "mData": "amount",
                "bSortable": false
            }*/
            /*,
            {
                "sTitle": "Payment Status",
                "mData": "orderState",
                "bSortable": false
            }*/,
            {
                "sTitle": "Recharge State",
                "mData": "rechargeState",
                "bSortable": false
            },
            {
                "sTitle": "Application Name",
                "mData": "applicationName",
                "bSortable": false
            } ,
            {
                "sTitle": "Operator Name",
                "mData": "rechargeRequest.operatorName",
                "bSortable": false
            },
            {
                "sTitle": "Service Type",
                "mData": "rechargeRequest.serviceType",
                "bSortable": false
            },
            {
                "sTitle": "Service",
                "mData": "rechargeRequest.service",
                "bSortable": false
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'></h4><a class='dt-refund'>"
            }, {
    			"sTitle": "Dispute Status",
    			"bSortable": false,
    			"render": function (disputeStatus, markDisputeEnabled, row) {
    		        if (row.markDisputeEnabled == true) {
    		            return "<h4><a class='dt-dispute'></a></h4>";
    		       }
    		       else if(row.disputeStatus != null){
    		           return row.disputeStatus;
    		       } else {
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
    
    $("#billBoardTable").on('draw.dt', function() {
    	$(".dt-dispute").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Dispute</button>');
    		var table = $('#billBoardTable').DataTable();
    		$(this).on('click', function() {
    			var table = $('#billBoardTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'billBoard/mark-dispute-by-order/' + data.orderId;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
 });

}
function callToExportResults() {
	var fromDate=$("#fromDate").val();
	var toDate=$("#toDate").val();
	
	if(fromDate == '' || toDate == ''){
		alert("Fill Out start Date & End Date Field");
		return;
	}else{
		 window.location.href = SITEBASEURL + "billBoard/download?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&orderType=" + $("#orderType").val()+ "&orderStatus=" + $("#orderStatus").val()+ "&serviceType=" + $("#serviceType").val();

	}
	 
}
