$(document).ready(function(){

	$("#export").click(function(){
		callToExportResults();
	});
	
	var table = $('#eventUsersTable').dataTable( {
	    "bProcessing": true,
	    "bServerSide": true,
	    "ordering": true,
	    "bSearchable" : true, 
	    "bFilter" : true,
	    "sAjaxSource":  SITEBASEURL + "event/eventUsers/"+ $("#eventId").val(),
	    "aoColumns":
	    [   
	          {"sTitle" : "#", "mData": "id", "bSortable": false},
	          {"sTitle" : "Code", "mData": "code"},
	          {"sTitle" : "Tab 1 Data", "mData": "userDetailsTab1",  "bSortable": false},
	          {"sTitle" : "Tab 2 Data", "mData": "userDetailsTab2",  "bSortable": false},
	          {"sTitle" : "Action", "bSortable": false, "sDefaultContent": "<a class='dt-delete'></a></h4>" }
	    ],
	    "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
	    "fnRowCallback" : function(nRow, aData, iDisplayIndex){      
	        var oSettings = table.fnSettings();
	         $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
	         return nRow;
	    },
	} );

	$("#eventUsersTable").on('draw.dt',function(){
	    $(".dt-edit").each(function(){
	        $(this).addClass('text-default').append("<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>");
	        $(this).on('click',function(){
	            var table = $('#eventUsersTable').DataTable();
	            var data = table.row( $(this).parents('tr') ).data();
	            var path = SITEBASEURL + 'eventUser/get/'+$("#eventId").val() + '/'+data.id;
	            $("<form action='"+path+"'></form>").appendTo('body').submit();
	        });
	    });
	    
	    $(".dt-delete").each(function(){
	        $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
	        $(this).on('click',function(){
	            var table = $('#eventUsersTable').DataTable();
	            var data = table.row( $(this).parents('tr') ).data();
	            var path = SITEBASEURL + 'eventUser/delete/'+$("#eventId").val() + '/'+ data.id;
	            $("<form action='"+path+"'></form>").appendTo('body').submit();
	        });
	    });
	});
	
	$("section.content-header h1").html("Users");

	var statisticsUrl = SITEBASEURL + "user/statistics";
	var requestMethodType = "GET";

	$.ajax({
		url: statisticsUrl,
		type:requestMethodType,
		contentType:"application/json",
		dataType:"json",
		success: updateStatistics,
		error: function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.responseText !== ''){
		        	var r = jQuery.parseJSON(jqXHR.responseText);
		        	$("#reportWrapper").html(r.message).addClass("error");
		    	}else{
		    		$("#reportWrapper").html(jqXHR.statusText).addClass("error");
		    	}  
			
		}
	});
	
	
});

function callToExportResults() {
	
	window.location.href = SITEBASEURL + "eventUser/getEventUserReport/"+ $("#eventId").val();

}

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