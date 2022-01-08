$(document).ready(function() {
	callToResults();
	$('#btnCustomSearch').click(function(){
		callToSearchResults();
	});
    $("#appName").change(function() {
        callToSearchResults();
    });
	
    });


function callToSearchResults() {
    $("#billBoardTable_wrapper").html("");
    var reportUrl = SITEBASEURL + "mall91Refund/exceptionalRefundListing?orderId=" + $("#txtCustomSearch").val()+"&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&appName="+$("#appName").val();
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
                    "sTitle": "Order Id",
                    //"mData": "orderId",
                    "bSortable": false,
                    "render": function (orderId, type, row) {
        		        if (row.orderId == null) {
        		            return "-";
        		            }
        		            else {
        		            	return row.orderId;
        		            }
        			}
                }, {
                    "sTitle": "Ticket Id",
                    "mData": "ticketId",
                    "bSortable": false
                },  {
                    "sTitle": "Customer Phone",
                    //"mData": "customerPhone",
                    "bSortable": false,
                    "render": function (customerPhone, type, row) {
        		        if (row.customerPhone == null) {
        		            return "-";
        		            }
        		            else {
        		            	return row.customerPhone;
        		            }
        			}
                }, 
                {
                    "sTitle": "Agent Id",
                    "mData": "agentId",
                    "bSortable": false
                }
                ,
                {
                    "sTitle": "Approver Name",
                    "mData": "approverName",
                    "bSortable": false
                },
                {
                    "sTitle": "Approver Phone",
                    "mData": "approverPhone",
                    "bSortable": false
                },
                {
                    "sTitle": "Refund Amount",
                    "mData": "amount",
                    "bSortable": false
                },
                {
                    "sTitle": "Refund Reason",
                    "mData": "refundReason",
                    "bSortable": false
                },
                {
                    "sTitle": "Status",
                    "mData": "status",
                    "bSortable": false
                }
                ,
                {
                    "sTitle": "Resend OTP",
                    "bSortable": false,
                    "sDefaultContent": "<a class='dt-resnd-otp'></a>"
                }
                ,
                {
                	"sTitle": "Verify OTP ",
                	"bSortable": false,
                	"sDefaultContent": "<a class='dt-edit-n'></a>"
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
		$(".dt-resnd-otp")
		.each(
				function() {
					$(this).empty();
					var table = $('#billsBoardSearchTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var otpVerify = data.otpVerify;
					if (otpVerify != true) {
						$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Resend OTP</button>');
						/*$(this)	.addClass('text-default').append("<span class='glyphicon glyphicon-paperclip' aria-hidden='true'></span>");*/
						$(this).unbind().on('click',
								function() {
									var table = $('#billsBoardSearchTable').DataTable();
									var data = table.row($(this).parents('tr')).data();
									if(data.orderId!=null){
										var path = SITEBASEURL + 'mall91Refund/resend-otp/'+ data.orderId+'/'+$("#appName").val()+"/"+data.approverPhone+"/"+data.requestType;
									}else {
										var path = SITEBASEURL + 'mall91Refund/resend-otp/'+ data.customerPhone+'/'+$("#appName").val()+"/"+data.approverPhone+"/"+data.requestType;
									}
									
									$("<form action='"+ path + "'></form>")	.appendTo('body').submit();
								});
					} else {
						$(this).addClass('text-default').append("<span>-</span>");
					}
				});
		$(".dt-edit-n")
		.each(
				function() {
					$(this).empty();
					var table = $('#billsBoardSearchTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var otpVerify = data.otpVerify;
					if (otpVerify != true) {
						$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Verify OTP</button>');
						/*$(this)	.addClass('text-default').append("<span class='glyphicon glyphicon-paperclip' aria-hidden='true'></span>");*/
						$(this).unbind().on('click',
								function() {
									var table = $('#billsBoardSearchTable').DataTable();
									var data = table.row($(this).parents('tr')).data();
									$(".modal-body #appNameModel").val($("#appName").val());
									$(".modal-body #typeModel").val(data.requestType);
									if(data.orderId!=null){
										$(".modal-body #orderIdModel").val(data.orderId);
									}else {
										$(".modal-body #orderIdModel").val(data.customerPhone);
									}
									/*$(".modal-body #supplierRefNumberModal").val(data.supplierRefNumber);*/
									/*var path = SITEBASEURL + 'mall91Refund/resend-otp/'+ data.orderId+'/'+$("#appName").val();
									$("<form action='"+ path + "'></form>")	.appendTo('body').submit();*/
									$('#scriptModal').modal('show');
						});
					} else {
						$(this).addClass('text-default').append("<span>-</span>");
					}
				});

 });
    
}

function callToResults(){
	var reportUrl = SITEBASEURL + "mall91Refund/exceptionalRefundListing?orderId=" + $("#txtCustomSearch").val()+"&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&appName="+$("#appName").val();
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
	                    "sTitle": "Order Id",
	                    //"mData": "orderId",
	                    "bSortable": false,
	                    "render": function (orderId, type, row) {
	        		        if (row.orderId == null) {
	        		            return "-";
	        		            }
	        		            else {
	        		            	return row.orderId;
	        		            }
	        			}
	                }, {
	                    "sTitle": "Ticket Id",
	                    "mData": "ticketId",
	                    "bSortable": false
	                },  {
	                    "sTitle": "Customer Phone",
	                    //"mData": "customerPhone",
	                    "bSortable": false,
	                    "render": function (customerPhone, type, row) {
	        		        if (row.customerPhone == null) {
	        		            return "-";
	        		            }
	        		            else {
	        		            	return row.customerPhone;
	        		            }
	        			}
	                }, 
	                {
	                    "sTitle": "Agent Id",
	                    "mData": "agentId",
	                    "bSortable": false
	                }
	                ,
	                {
	                    "sTitle": "Approver Name",
	                    "mData": "approverName",
	                    "bSortable": false
	                },
	                {
	                    "sTitle": "Approver Phone",
	                    "mData": "approverPhone",
	                    "bSortable": false
	                },
	                {
	                    "sTitle": "Refund Amount",
	                    "mData": "amount",
	                    "bSortable": false
	                },
	                {
	                    "sTitle": "Refund Reason",
	                    "mData": "refundReason",
	                    "bSortable": false
	                },
	                {
	                    "sTitle": "Status",
	                    "mData": "status",
	                    "bSortable": false
	                }
	                ,
	                {
	                	"sTitle": "Resend OTP",
	                	"bSortable": false,
	                	"sDefaultContent": "<a class='dt-resnd-otp'></a>"
	                },
	                {
	                	"sTitle": "Verify OTP ",
	                	"bSortable": false,
	                	"sDefaultContent": "<a class='dt-edit-n'></a>"
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
		$(".dt-resnd-otp")
		.each(
				function() {
					$(this).empty();
					var table = $('#billBoardTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var otpVerify = data.otpVerify;
					if (otpVerify != true) {
						$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Resend OTP</button>');
						/*$(this)	.addClass('text-default').append("<span class='glyphicon glyphicon-paperclip' aria-hidden='true'></span>");*/
						$(this).unbind().on('click',
								function() {
									var table = $('#billBoardTable').DataTable();
									var data = table.row($(this).parents('tr')).data();
									if(data.orderId!=null){
										var path = SITEBASEURL + 'mall91Refund/resend-otp/'+ data.orderId+'/'+$("#appName").val()+"/"+data.approverPhone+"/"+data.requestType;
									}else {
										var path = SITEBASEURL + 'mall91Refund/resend-otp/'+ data.customerPhone+'/'+$("#appName").val()+"/"+data.approverPhone+"/"+data.requestType;
									}
									$("<form action='"+ path + "'></form>")	.appendTo('body').submit();
								});
					} else {
						$(this).addClass('text-default').append("<span>-</span>");
					}
				});
		$(".dt-edit-n")
		.each(
				function() {
					$(this).empty();
					var table = $('#billBoardTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var otpVerify = data.otpVerify;
					if (otpVerify != true) {
						$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Verify OTP</button>');
						/*$(this)	.addClass('text-default').append("<span class='glyphicon glyphicon-paperclip' aria-hidden='true'></span>");*/
						$(this).unbind().on('click',
								function() {
									var table = $('#billBoardTable').DataTable();
									var data = table.row($(this).parents('tr')).data();
									$(".modal-body #appNameModel").val($("#appName").val());
									$(".modal-body #typeModel").val(data.requestType);
									if(data.orderId!=null){
										$(".modal-body #orderIdModel").val(data.orderId);
									}else {
										$(".modal-body #orderIdModel").val(data.customerPhone);
									}
									/*$(".modal-body #supplierRefNumberModal").val(data.supplierRefNumber);*/
									/*var path = SITEBASEURL + 'mall91Refund/resend-otp/'+ data.orderId+'/'+$("#appName").val();
									$("<form action='"+ path + "'></form>")	.appendTo('body').submit();*/
									$('#scriptModal').modal('show');
						});
					} else {
						$(this).addClass('text-default').append("<span>-</span>");
					}
				});
		

 });

}
