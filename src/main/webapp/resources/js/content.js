$(document).ready(function() {

	var status = $("#status").val();
	if (status.length == 0) {
		status = 0;
	}
	var channelType = $("#channelType").val();
	if (channelType.length == 0) {
		channelType = 0;
	}
	
	if(status == 0 && channelType == 0)
		{
		var reportUrl = SITEBASEURL + "content/contentListing";
		var table = $('#contentTable').dataTable({
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
				"mData": "title",
				"bSortable": false
			},{
				"sTitle": "Channel",
				"mData": "channelName",
				"bSortable": false
			}, {
				"sTitle": "Publisher",
				"mData": "publisherName",
				"bSortable": false
			},
			 {
				"sTitle": "Type",
				"mData": "type",
				"bSortable": false
			},
			{
				"sTitle": "Recommended",
				"bSortable": false,
				'mRender': function( url, type, full ) {
				    if(full.isRecommended)
	                return '<input type="checkbox" id="recommended_id'+full.id+'" name="recommended_id" checked onclick="updateRecommendedStatus(this)" class="recommended_checkbox" value="'+full.id+'" />';
					else
				    return '<input type="checkbox" id="recommended_id'+full.id+'" name="recommended_id" class="breaking_checkbox" onclick="updateRecommendedStatus(this)" value="'+full.id+'"  />';
	              }
			},
			{
				"sTitle": "Breaking",
				"bSortable": false,
				'mRender': function( url, type, full ) {
				    if(full.isBreaking)
	                return '<input type="checkbox" id="breaking_id'+full.id+'" name="breaking_id" checked onclick="updateBreakingStatus(this)" class="breaking_checkbox" value="'+full.id+'" />';
					else
				    return '<input type="checkbox" id="breaking_id'+full.id+'" name="breaking_id" class="breaking_checkbox" onclick="updateBreakingStatus(this)" value="'+full.id+'"  />';
	              }
			},
		      {
				"sTitle": "Action",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-edit'></a><a class='dt-remove'></a>"
			}],
			
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});

		$("#contentTable").on('draw.dt', function() {
			$(".dt-edit").each(function() {
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				$(this).on('click', function() {
					var table = $('#contentTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'content/get-content/' + data.id;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				});
			});

			$(".dt-remove").each(function() {
				$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
				$(this).on('click', function() {
					if (confirm('are you sure you want to delete this record?')) {
						var table = $('#contentTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						var path = SITEBASEURL + 'content/delete/' + data.id;
						$("<form action='" + path + "'></form>").appendTo('body').submit();
					} else {
						return false;
					}
				});
			});
		});

		}
	else{
        var reportUrl = SITEBASEURL + "content/contentListing?recommendType=" + $("#status").val() + "&channelType="+ $("#channelType").val();
        callToSearchResults(reportUrl);
    
	}
	
   $("#status").change(function() {
           var reportUrl = SITEBASEURL + "content/contentListing?recommendType=" + $("#status").val() + "&channelType="+ $("#channelType").val();
           callToSearchResults(reportUrl);
       });
   
   $("#channelType").change(function() {
       var reportUrl = SITEBASEURL + "content/contentListing?recommendType=" + $("#status").val() + "&channelType="+ $("#channelType").val();
       callToSearchResults(reportUrl);
   });
	   
   
   $( "#clearState" ).click(function() {
	  
	 var table = $('#contentTable').DataTable();
 	 table.state.clear();
    try {
		var searchTable = $('#contentSearchTable')
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
	$("#contentTable_wrapper").html("");
	//var reportUrl = SITEBASEURL + "content/contentListing" ;
	var table = $('#contentSearchTable')
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
			"mData": "title",
			"bSortable": false
		},{
			"sTitle": "Channel",
			"mData": "channelName",
			"bSortable": false
		}, {
			"sTitle": "Publisher",
			"mData": "publisherName",
			"bSortable": false
		},
		{
			"sTitle": "Type",
			"mData": "type",
			"bSortable": false
		},
		{
			"sTitle": "Recommended",
			"bSortable": false,
			'mRender': function( url, type, full ) {
			    if(full.isRecommended)
                return '<input type="checkbox" id="recommended_id'+full.id+'" name="recommended_id" checked onclick="updateRecommendedStatus(this)" class="recommended_checkbox" value="'+full.id+'" />';
				else
			    return '<input type="checkbox" id="recommended_id'+full.id+'" name="recommended_id" class="breaking_checkbox" onclick="updateRecommendedStatus(this)" value="'+full.id+'"  />';
              }
		},
		{
			"sTitle": "Breaking",
			"bSortable": false,
			'mRender': function( url, type, full ) {
			    if(full.isBreaking)
                return '<input type="checkbox" id="breaking_id'+full.id+'" name="breaking_id" checked onclick="updateBreakingStatus(this)" class="breaking_checkbox" value="'+full.id+'" />';
				else
			    return '<input type="checkbox" id="breaking_id'+full.id+'" name="breaking_id" class="breaking_checkbox" onclick="updateBreakingStatus(this)" value="'+full.id+'"  />';
              }
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

	
	$("#contentSearchTable").on('draw.dt', function() {
		$(".dt-edit-n").each(function() {
			 $(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).on('click', function() {
				var table = $('#contentSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'content/get-content/' + data.id;
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});

		$(".dt-remove-n").each(function() {
			 $(this).empty();
			$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
			$(this).on('click', function() {
				if (confirm('are you sure you want to delete this record?')) {
					var table = $('#contentSearchTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'content/delete/' + data.id;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				} else {
					return false;
				}
			});
		});
	});
}