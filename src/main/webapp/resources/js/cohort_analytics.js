$(document)
		.ready(
				function() {

					var reportUrl = SITEBASEURL + "userCohort/findCohortData";
					console.log("url =" + reportUrl);
					var table = $('#userTable')
							.dataTable(
									{
										"bProcessing" : true,
										"bServerSide" : true,
										"ordering" : true,
										"bSearchable" : false,
										"bFilter" : false,
										"sAjaxSource" : reportUrl,
										"aoColumns" : [ {
											"sTitle" : "month",
											"mData" : "month"
										}, {
											"sTitle" : "Users registered",
											"mData" : "noOfRegisteredUsers"
										}, {
											"sTitle" : "First Month",
											"mData" : "firstCount"
										}, {
											"sTitle" : "Second Month",
											"mData" : "secondCount"
										}, {
											"sTitle" : "Third Month",
											"mData" : "thirdCount"
										}, {
											"sTitle" : "Fourth Month",
											"mData" : "fourthCount"
										}, {
											"sTitle" : "Fifth Month",
											"mData" : "fifthCount"
										}, {
											"sTitle" : "Sixth Month",
											"mData" : "sixthCount"
										}, {
											"sTitle" : "Same Day uninstalled removed",
											"mData" : "isSameDay"
										} ],
										"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>"
									});

					$("#search-data").click(function() {
						callToSearchResults();
					});

					var statisticsUrl = SITEBASEURL + "user/statistics";
					var requestMethodType = "GET";

					$.ajax({
						url : statisticsUrl,
						type : requestMethodType,
						contentType : "application/json",
						dataType : "json",
						success : updateStatistics,
						error : function(jqXHR, textStatus, errorThrown) {
							if (jqXHR.responseText !== '') {
								var r = jQuery.parseJSON(jqXHR.responseText);
								$("#reportWrapper").html(r.message).addClass(
										"error");
							} else {
								$("#reportWrapper").html(jqXHR.statusText)
										.addClass("error");
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
	var appName = $("#status").val();
	var from = $("#fromDate").val();
	var to = $("#toDate").val();
	console.log("appName =" + appName + " from =" + from + " to =" + to);
	if (from == '' || from == null) {
		$("#mes_id").text("Please select from date");
		$("#mes_id").show().delay(5000).fadeOut();
		return;
	}
	if (to == '' || to == null) {
		$("#mes_id").text("Please select to date");
		$("#mes_id").show().delay(5000).fadeOut();
		return;
	}

	$("#userTable_wrapper").html("");

	var reportUrl = SITEBASEURL + "analytics/search?app=" + $("#status").val()
			+ "&fromDate=" + $("#fromDate").val() + "&toDate="
			+ $("#toDate").val();
	var table = $('#userSearchTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"bSearchable" : false,
		"bFilter" : false,
		"ordering" : true,
		"pageLength" : 50,
		"sAjaxSource" : reportUrl,
		"aoColumns" : [ {
			"sTitle" : "source",
			"mData" : "source"
		}, {
			"sTitle" : "count",
			"mData" : "count"
		} ]
	});

}