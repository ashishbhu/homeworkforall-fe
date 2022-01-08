$(document).ready(function() {

    var reportUrl = SITEBASEURL + "appTransaction/listing?orderType=" + $("#orderType").val() + "&orderStatus=" + $("#orderStatus").val() + "&fromDate=" + $("#fromDate").val() + "&toDate=" + $("#toDate").val();
    var table = $('#appTransaction').dataTable({
        "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": true,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSortable": false
            }, {
                "sTitle": "ID",
                //"mData": "merchantOrderId",
                "bSortable": false,
                "render": function (merchantOrderId, type, row) {
    		        if (row.merchantOrderId == null) {
    		            return "";
    		            }
    		            else {
    		            	return row.merchantOrderId;
    		            }
    			}
            },{
                "sTitle": "Transaction Id",
                //"mData": "trnsactionId",
                "bSortable": false,
                "render": function (trnsactionId, type, row) {
    		        if (row.trnsactionId == null) {
    		            return "";
    		            }
    		            else {
    		            	return row.trnsactionId;
    		            }
    			}
            }, {
                "sTitle": "Name",
                "mData": "displayName",
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
//            {
//                "sTitle": "Type",
//                "mData": "applicationName",
//                "bSortable": false
//            },
            {
                "sTitle": "Status",
                "mData": "paymentStatus",
                "bSortable": false
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'>"
            }
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
    });

    $("#appTransaction").on('draw.dt', function() {
        $(".dt-edit").each(function() {
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var orderStatus =  $("#orderStatus").val();
            var orderType =  $("#orderType").val()
        	var table = $('#appTransaction').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if (!(typeof data.totalGMV === "undefined")) {
				$("#totalGMV").html(data.totalGMV);
			}
			if (!(typeof data.totalRecords === "undefined")) {
				$("#totalRecords").html(data.totalRecords);
			}
			if (!(typeof data.totalGMVToday === "undefined")) {
				$("#totalGMVToday").html(data.totalGMVToday);
			}
			if (!(typeof data.totalRecordsToday === "undefined")) {
				$("#totalRecordsToday").html(data.totalRecordsToday);
			}
			
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
                var table = $('#appTransaction').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'appTransaction/' + data.merchantOrderId +'/'+ orderStatus  +'/'+ orderType+'/'+false;;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
    });

    $("#orderType").change(function() {
    	var orderType=$("#orderType").val();
    	if(orderType=='PAY91' || orderType=='LENDEN91' || orderType=='LENDEN91-PAYOUT'){
    		$("#export").show();
    	}else{
    		$("#export").hide();
    	}
        callToSearchResults();
    });

    $("#orderStatus").change(function() {
        callToSearchResults();
    });
    
    $("#search").click(
        function() {
        	callToSearchResults();
        });
    
	$("#export").click(function(){
		callToExportResults();
	});

    var statisticsUrl = SITEBASEURL + "user/statistics";
    var requestMethodType = "GET";

    $.ajax({
        url: statisticsUrl,
        type: requestMethodType,
        contentType: "application/json",
        dataType: "json",
        success: updateStatistics,
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.responseText !== '') {
                var r = jQuery.parseJSON(jqXHR.responseText);
                $("#reportWrapper").html(r.message).addClass("error");
            } else {
                $("#reportWrapper").html(jqXHR.statusText).addClass("error");
            }

        }
    });

});

function updateStatistics(result) {
	$("#totalUsersRegistered").html(result.totalUsersRegistered);
	$("#totalDirectRefferedRegistered").html(
			result.totalDirectRefferedRegistered);
	$("#totalUsersRegisteredToday").html(result.totalUsersRegisteredToday);
	$("#totalDirectRefferedRegisteredToday").html(
			result.totalDirectRefferedRegisteredToday);
	$("#totalChatBotGroupsUserRegistered").html(
			result.totalChatBotGroupsUserRegistered);
	$("#totalChatBotGroupsRegistered").html(
			"(" + result.totalChatBotGroupsRegistered + " Groups)");
	$("#totalActiveChatBotGroupsUserRegistered").html(
			result.totalActiveChatBotGroupsUserRegistered);
	$("#totalActiveChatBotGroupsRegistered").html(
			"(" + result.totalActiveChatBotGroupsRegistered + " Groups)");
	$("#totalChatBotGroupsUserRegisteredToday").html(
			result.totalChatBotGroupsUserRegisteredToday);
	$("#totalChatBotGroupsRegisteredToday").html(
			result.totalChatBotGroupsRegisteredToday);

	// adding new values
	$("#dailyActiveUsers").html(result.dailyActiveUsers);
	$("#monthlyActiveUsers").html(result.monthlyActiveUsers);
	$("#dauByMau").html(result.dauByMau);
	// Adding Zombie users
	$("#totalZombieChatBotGroupsRegistered").html(result.totalZombieChatBotGroupsRegistered);
	$("#totalZombieChatBotGroupsUserRegistered").html(result.totalZombieChatBotGroupsUserRegistered);

}

function callToSearchResults() {
	$("#appTransaction_wrapper").html("");
	var reportUrl = SITEBASEURL + "appTransaction/listing?orderType=" + $("#orderType").val() + "&orderStatus=" + $("#orderStatus").val() + "&fromDate=" + $("#fromDate").val() + "&toDate=" + $("#toDate").val();
	var table = $('#appTransSearch')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": false,
		"bFilter": true,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "ID",
			//"mData": "merchantOrderId",
			"bSortable": false,
            "render": function (merchantOrderId, type, row) {
		        if (row.merchantOrderId == null) {
		            return "";
		            }
		            else {
		            	return row.merchantOrderId;
		            }
			}
		},{
            "sTitle": "Transaction Id",
            //"mData": "trnsactionId",
            "bSortable": false,
            "render": function (trnsactionId, type, row) {
		        if (row.trnsactionId == null) {
		            return "";
		            }
		            else {
		            	return row.trnsactionId;
		            }
			}
        }, {
			"sTitle": "Name",
			"mData": "displayName",
			"bSortable": false
		},  {
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
//		{
//			"sTitle": "Type",
//			"mData": "applicationName",
//			"bSortable": false
//		},
		{
			"sTitle": "Status",
			"mData": "paymentStatus",
			"bSortable": false
		},
		{
			"sTitle": "Action",
			"bSortable": false,
			"sDefaultContent": "<h4><a class='dt-edit'></h4>"
		}
		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});

	$("#appTransSearch").on('draw.dt', function() {
		$("#totalGMV").html("0");
		$("#totalRecords").html("0");
		$("#totalGMVToday").html("0");
		$("#totalRecordsToday").html("0");
		$(".dt-edit").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			var orderStatus =  $("#orderStatus").val();
			var orderType =  $("#orderType").val()
			var table = $('#appTransSearch').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if (!(typeof data.totalGMV === "undefined")) {
				$("#totalGMV").html(data.totalGMV);
			}
			if (!(typeof data.totalRecords === "undefined")) {
				$("#totalRecords").html(data.totalRecords);
			}
			if (!(typeof data.totalGMVToday === "undefined")) {
				$("#totalGMVToday").html(data.totalGMVToday);
			}
			if (!(typeof data.totalRecordsToday === "undefined")) {
				$("#totalRecordsToday").html(data.totalRecordsToday);
			}
			
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
				var table = $('#appTransSearch').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'appTransaction/' + data.merchantOrderId +'/'+ orderStatus +'/'+ orderType+'/'+"false";
				//alert("path");
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});
	});
}

function callToExportResults() {
	var fromDate=$("#fromDate").val();
	var toDate=$("#toDate").val();
	var orderType=$("#orderType").val();
	if(orderType=='PAY91' || orderType=='LENDEN91' || orderType=='LENDEN91-PAYOUT'){
	if(fromDate == '' || toDate == ''){
		alert("Fill Out start Date & End Date Field");
		return;
	}else{
		 window.location.href = SITEBASEURL + "appTransaction/download?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&orderType=" + $("#orderType").val()+ "&orderStatus=" + $("#orderStatus").val();
	}
	}
}