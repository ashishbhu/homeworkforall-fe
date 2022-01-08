$(document).ready(function() {

	
	callToResult();
/*    var reportUrl = SITEBASEURL + "groupBuy/listing?status=" + $("#status").val();
    var table = $('#groupBuyTable').dataTable({
        "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": true,
        "bFilter": false,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSortable": false
            }, {
                "sTitle": "Id",
                "mData": "productId",
                "bSortable": false
            }, {
                "sTitle": "Name",
                "mData": "productName",
                "bSortable": false
            },{
                "sTitle": "MRP",
                "mData": "mrp",
                "bSortable": false
            }, 
            {
                "sTitle": "Selling Price",
                "mData": "sellingPrice",
                "bSortable": false
            },
            {
                "sTitle": "status",
                "mData": "status",
                "bSortable": false
            },
            {
                "sTitle": "Category",
                "mData": "categoryName",
                "bSortable": false
            },{
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'><a class='dt-remove'></a></h4>"
            }
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
    });*/

    $("#groupBuyTable").on('draw.dt', function() {
    	$(".dt-edit").each(function() {
    		$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		var table = $('#groupBuyTable').DataTable();
    		$(this).on('click', function() {
    			var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'groupBuy/get/' + data.productId +'/'+ status;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
    	
    	$(".dt-remove").each(function() {
    		$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		$(this).on('click', function() {
    			if (confirm('are you sure you want to delete this record?')) {
    				var table = $('#groupBuyTable').DataTable();
    				var data = table.row($(this).parents('tr')).data();
    				var path = SITEBASEURL + 'groupBuy/delete/' + data.productId;
    				$("<form action='" + path + "'></form>").appendTo('body').submit();
    			}
    			else{
    				return false;
    			}

    		});
    });
    });
    $("#status").change(function() {
        callToSearchResults();
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
    
    $("#btnCustomSearch").click(function(){
    	callToResult();
        //alert($("#txtCustomSearch").val());
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

}

function callToSearchResults() {
    $("#groupBuyTable_wrapper").html("");
    var reportUrl = SITEBASEURL + "groupBuy/listing?status=" + $("#status").val() +"&searchTerm=" + $("#txtCustomSearch").val();
    var table = $('#groupBuySearchTable')
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
                "sTitle": "Id",
                "mData": "productId",
                "bSortable": false
            }, {
                "sTitle": "Name",
                "mData": "productName",
                "bSortable": false
            },{
                "sTitle": "MRP",
                "mData": "mrp",
                "bSortable": false
            }, 
            {
                "sTitle": "Selling Price",
                "mData": "sellingPrice",
                "bSortable": false
            },
            {
                "sTitle": "status",
                "mData": "status",
                "bSortable": false
            },
            {
                "sTitle": "Category",
                "mData": "categoryName",
                "bSortable": false
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'><a class='dt-remove'></a></h4>"
            }
        ],
            "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
            "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                var oSettings = table.fnSettings();
                $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
                return nRow;
            },
        });

    $("#groupBuySearchTable").on('draw.dt', function() {
    	$(".dt-edit").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		$(this).on('click', function() {
    			var table = $('#groupBuySearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'groupBuy/get/' + data.productId +'/'+ status;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
    	
    	$(".dt-remove").each(function() {
    		 $(this).empty();
    		$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		$(this).on('click', function() {
    			if (confirm('are you sure you want to delete this record?')) {
    				var table = $('#groupBuySearchTable').DataTable();
    				var data = table.row($(this).parents('tr')).data();
    				var path = SITEBASEURL + 'groupBuy/delete/' + data.productId;
    				$("<form action='" + path + "'></form>").appendTo('body').submit();
    			}
    			else{
    				return false;
    			}

    		});
    	});
    });
}

function callToResult(){
    var reportUrl = SITEBASEURL + "groupBuy/listing?status=" + $("#status").val() +"&searchTerm=" + $("#txtCustomSearch").val();
    var table = $('#groupBuyTable').dataTable({
    	"bDestroy": true,
    	"bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": true,
        "bFilter": false,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSortable": false
            }, {
                "sTitle": "Id",
                "mData": "productId",
                "bSortable": false
            }, {
                "sTitle": "Name",
                "mData": "productName",
                "bSortable": false
            },{
                "sTitle": "MRP",
                "mData": "mrp",
                "bSortable": false
            }, 
            {
                "sTitle": "Selling Price",
                "mData": "sellingPrice",
                "bSortable": false
            },
            {
                "sTitle": "status",
                "mData": "status",
                "bSortable": false
            },
            {
                "sTitle": "Category",
                "mData": "categoryName",
                "bSortable": false
            },{
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'><a class='dt-remove'></a></h4>"
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

