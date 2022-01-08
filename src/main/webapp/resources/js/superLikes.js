$(document).ready(function() {

    var reportUrl = SITEBASEURL + "superLikes/listing?status=" + $("#status").val();
    var table = $('#superLikeTable').dataTable({
        "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": true,
        "bStateSave": true,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
                "sTitle": "#",
                "mData": "rowId",
                "bSortable": false
            }, {
                "sTitle": "From User",
                "mData": "fromUserName",
                "bSortable": false
            }, {
                "sTitle": "To User",
                "mData": "toUserName",
                "bSortable": false
            },{
                "sTitle": "Date",
                "mData": "actionDateStr",
                "bSortable": false
            }, {
                "sTitle": "Notification Text",
                "mData": "notificationText",
                "bSortable": false
            }, {
                "sTitle": "Status",
                "mData": "status",
                "bSortable": false
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sWidth": "180px", 
            	"sDefaultContent": "<a class='dt-approve'></a><a class='dt-reject' style = 'margin-left: 8px;'></a>"
            },
            {
                "sTitle": "Details",
                "bSortable": false,
                "sDefaultContent": "<a class='dt-view'></a>"
            }
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
    });

    $("#superLikeTable").on('draw.dt', function() {
    	$(".dt-approve").each(function() {
    		var status =  $("#status").val();
    		if(status == 'INITIAL')
    		{
    			$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Approve</span>");
    			var table = $('#superLikeTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			$(this).on('click', function() {
    				var table = $('#superLikeTable').DataTable();
    				var data = table.row($(this).parents('tr')).data();
    				var path = SITEBASEURL + 'superLikes/approve/' + data.id;
    				$("<form action='" + path + "'></form>").appendTo('body').submit();
    			});
    		}

    	});
    	$(".dt-reject").each(function() {

    		var status =  $("#status").val();
    		if(status == 'INITIAL')
    		{
    			$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Reject</span>");
    			var table = $('#superLikeTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			$(this).on('click', function() {
    				var table = $('#superLikeTable').DataTable();
    				var data = table.row($(this).parents('tr')).data();
    				var path = SITEBASEURL + 'superLikes/reject/' + data.id;
    				$("<form action='" + path + "'></form>").appendTo('body').submit();
    			});
    		}

    	});
    	
    	$(".dt-view").each(function() {
    		$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		var table = $('#superLikeTable').DataTable();
    		var data = table.row($(this).parents('tr')).data();
    		$(this).on('click', function() {
    			var table = $('#superLikeTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'superLikes/' + data.id;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
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
    $("#superLikeTable_wrapper").html("");
    var reportUrl = SITEBASEURL + "superLikes/listing?status=" + $("#status").val();
    var table = $('#superLikeSearchTable')
        .dataTable({
        	"destroy": true,
            "bProcessing": true,
            "bServerSide": true,
            "ordering": true,
            "bSearchable": false,
            "bFilter": true,
            "bStateSave": true,
            "sAjaxSource": reportUrl,
            "aoColumns": [{
                "sTitle": "#",
                "mData": "rowId",
                "bSortable": false
            }, {
                "sTitle": "From User",
                "mData": "fromUserName",
                "bSortable": false
            }, {
                "sTitle": "To User",
                "mData": "toUserName",
                "bSortable": false
            },{
                "sTitle": "Date",
                "mData": "actionDateStr",
                "bSortable": false
            }, {
                "sTitle": "Notification Text",
                "mData": "notificationText",
                "bSortable": false
            }, {
                "sTitle": "Status",
                "mData": "status",
                "bSortable": false
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sWidth": "180px", 
                "sDefaultContent": "<a class='dt-approve'></a><a class='dt-reject' style = 'margin-left: 8px;'></a>"
            },
            {
                "sTitle": "Details",
                "bSortable": false,
                "sDefaultContent": "<a class='dt-view'></a>"
            }
        ],
            "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
            "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                var oSettings = table.fnSettings();
                $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
                return nRow;
            },
        });

    $("#superLikeSearchTable").on('draw.dt', function() {
    	$(".dt-approve").each(function() {
    		 $(this).empty();
    		var status =  $("#status").val();
    		if(status == 'INITIAL')
    		{
    			$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Approve</span>");
    			var table = $('#superLikeSearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			$(this).on('click', function() {
    				var table = $('#superLikeSearchTable').DataTable();
    				var data = table.row($(this).parents('tr')).data();
    				var path = SITEBASEURL + 'superLikes/approve/' + data.id;
    				$("<form action='" + path + "'></form>").appendTo('body').submit();
    			});
    		}

    	});
    	$(".dt-reject").each(function() {
    		 $(this).empty();
    		var status =  $("#status").val();
    		if(status == 'INITIAL')
    		{
    			$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Reject</span>");
    			var table = $('#superLikeSearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			$(this).on('click', function() {
    				var table = $('#superLikeSearchTable').DataTable();
    				var data = table.row($(this).parents('tr')).data();
    				var path = SITEBASEURL + 'superLikes/reject/' + data.id;
    				$("<form action='" + path + "'></form>").appendTo('body').submit();
    			});
    		}

    	});
    	
    	$(".dt-view").each(function() {
    		$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		var table = $('#superLikeSearchTable').DataTable();
    		var data = table.row($(this).parents('tr')).data();
    		$(this).on('click', function() {
    			var table = $('#superLikeSearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'superLikes/' + data.id;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});

    	});
    });
}