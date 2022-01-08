$(document).ready(function() {

	$("section.content-header h1").html("Product Order");
	$("#promotion").removeClass("active")
    $("#other").addClass("active");
    $( "#other li:nth-child(8)" ).addClass("active");
	
	var status = $("#orderState").val();
	if (status.length == 0) {
		status = 0;
	}
	
	if(status == 0 )
		{
		var reportUrl = SITEBASEURL + "order/pagelist";
		var table = $('#orderTable').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			"bSearchable": true,
			"bFilter": true,
			"bStateSave": true,
			"sAjaxSource": reportUrl,
			"aoColumns": [ 
		    {
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			}, {
				"sTitle": "Name",
				"mData": "name",
				"bSortable": false
			},{
				"sTitle": "Campaign URL",
				"mData": "campaign.campaignURL",
				"bSortable": false
			}, {
				"sTitle": "Order Amount",
				"mData": "orderAmount",
				"bSortable": false
			},
			 {
				"sTitle": "Purchased By User",
				"mData": "purchasedByUser",
				"bSortable": false
			},
			{
				"sTitle": "Order Date",
				"mData": "orderDate",
				"bSortable": false
			},
			{
				"sTitle": "Order State",
				"mData": "orderState",
				"bSortable": false
			},
		      {
				"sTitle": "Action",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-edit'></a>"
			}],
			
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});

		$("#orderTable").on('draw.dt', function() {
			$(".dt-edit").each(function() {
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				$(this).on('click', function() {
					var table = $('#orderTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'order/get/' + data.id;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				});
			});

/*			$(".dt-remove").each(function() {
				$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
				$(this).on('click', function() {
					if (confirm('are you sure you want to delete this record?')) {
						var table = $('#orderTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						var path = SITEBASEURL + 'content/delete/' + data.id;
						$("<form action='" + path + "'></form>").appendTo('body').submit();
					} else {
						return false;
					}
				});
			});*/
		});

		}
	else{
        var reportUrl = SITEBASEURL + "order/pagelist?orderState=" + $("#orderState").val();
        callToSearchResults(reportUrl);
	}
	
   $("#orderState").change(function() {
           var reportUrl = SITEBASEURL + "order/pagelist?orderState=" + $("#orderState").val();
           callToSearchResults(reportUrl);
       });
   
  
   
   $( "#clearState" ).click(function() {
	  
	 var table = $('#orderTable').DataTable();
 	 table.state.clear();
    try {
		var searchTable = $('#orderSearchTable')
				.DataTable();
		searchTable.state.clear();
	} catch (e) {
		// alert("error here");
	}
   
   	$("#status").val("0");
   	$("#channelType").val("0");
   	window.location.reload();
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

function callToSearchResults(reportUrl) {
	console.log("search url ="+ reportUrl );
	$("#orderTable_wrapper").html("");
	//var reportUrl = SITEBASEURL + "content/contentListing" ;
	var table = $('#orderSearchTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": true,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "Name",
			"mData": "name",
			"bSortable": false
		},{
			"sTitle": "Campaign URL",
			"mData": "campaign.campaignURL",
			"bSortable": false
		}, {
			"sTitle": "Order Amount",
			"mData": "orderAmount",
			"bSortable": false
		},
		 {
			"sTitle": "Purchased By User",
			"mData": "purchasedByUser",
			"bSortable": false
		},
		{
			"sTitle": "Order Date",
			"mData": "orderDate",
			"bSortable": false
		},
		{
			"sTitle": "Order State",
			"mData": "orderState",
			"bSortable": false
		},
		{
			"sTitle": "Action",
			"bSortable": false,
			"sDefaultContent": "<a class='dt-edit-n'></a><a class='dt-remove-n'></a>"
		}],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});

	
	$("#orderSearchTable").on('draw.dt', function() {
		$(".dt-edit-n").each(function() {
			 $(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).on('click', function() {
				var table = $('#orderSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'order/get/' + data.id;
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});

/*		$(".dt-remove-n").each(function() {
			 $(this).empty();
			$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
			$(this).on('click', function() {
				if (confirm('are you sure you want to delete this record?')) {
					var table = $('#orderSearchTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'content/delete/' + data.id;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				} else {
					return false;
				}
			});
		});*/
		
	});
}