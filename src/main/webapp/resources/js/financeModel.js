$(document).ready(function(){

	var table = $('#modelTable').DataTable({"paging":   true,
	    "ordering": true,
	    "info":     true});
    
	if(table.columns().eq( 0) != null)
	{
		
	table.columns().eq( 0 ).each( function ( colIdx ) {
		if(colIdx==1){		
			$( 'input', table.column( colIdx ).footer() ).on( 'keyup change', function () {
				table
					.column( colIdx )
					.search( this.value )
					.draw();
				
			} );
		}	
	} );
	}

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