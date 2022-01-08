$(document)
		.ready(
				function() {

					var reportUrl = SITEBASEURL + "user/userListing?fromDate="
							+ $("#fromDate").val() + "&toDate="
							+ $("#toDate").val();
					var table = $('#userTable')
							.dataTable(
									{
										"bProcessing" : true,
										"bServerSide" : true,
										"ordering" : true,
										"bSearchable" : true,
										"bFilter" : true,
										"scrollX": true,
										"stateSave":true,
										 "language": {
											 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
										    },
										    processing : true,
										"sAjaxSource" : reportUrl,
										"columnDefs": [{
											"targets": 5,
										    "createdCell": function (td) {
										          $(td).css('vertical-align', 'top');
										          $(td).css('word-break', 'break-word');
										      }}
										  ],
										"aoColumns" : [
												{
													"sTitle" : "#",
													"mData" : "id",
													"bSortable" : false
												},
												{
													"sTitle" : "Name",
													"mData" : "firstName"
												},
												{
													"sTitle" : "Phone Number",
													"mData" : "phoneNumber",
													"bSortable" : false
												},
												{
													"sTitle" : "Enabled",
													"mData" : "enabled",
													"bSortable" : false
												},
												{
													"sTitle" : "Action",
													"bSortable" : false,
													"sDefaultContent" : "<h4><a class='dt-edit'></a>&nbsp&nbsp&nbsp<a class='dt-remove'></a></h4>"
												},
												{
													"sTitle" : "Wallet History",
													"bSortable" : false,
													"sDefaultContent" : "<h4><a class='show-wallet-history'></a></h4>"
												},
												
												{
													"sTitle" : "Withdrawal Enabled",
													"bSortable" : false,
													"sDefaultContent" :"<a class='update-withdrawal-enabled'></a>"
													
												},
												{
													"sTitle" : "Debit",
													"bSortable" : false,
													"sDefaultContent" :"<a class='update-wallet-debit'></a>"
													
												},
												{
													"sTitle" : "Notification",
													"bSortable" : false,
													"sDefaultContent" :"<a class='send-notification'></a>"
													
												},
												{
													"sTitle" : "Logout",
													"bSortable" : false,
													"sDefaultContent" :"<a class='delete-user-devices'></a>"
													
												},
												{
													"sTitle" : "Tx.Action",
													"bSortable" : false,
													"sDefaultContent" : "<h4><a class='show-wallet-history-per-transaction'></a></h4>"
												},
												
												],
										"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
										"fnRowCallback" : function(nRow, aData,
												iDisplayIndex) {
											var oSettings = table.fnSettings();
											$("td:first", nRow)
													.html(
															oSettings._iDisplayStart
																	+ iDisplayIndex
																	+ 1);
											return nRow;
										},
									});

					$("#userTable")
							.on(
									'draw.dt',
									function() {
										$(".dt-edit")
												.each(
														function() {
															$(this)
																	.addClass(
																			'text-default')
																	.append(
																			"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
															$(this)
																	.on(
																			'click',
																			function() {
																				var table = $(
																						'#userTable')
																						.DataTable();
																				var data = table
																						.row(
																								$(
																										this)
																										.parents(
																												'tr'))
																						.data();
																				
																				callToViewPage(data.id);
																				/*var path = SITEBASEURL
																						+ 'user/'
																						+ data.id;
																				$(
																						"<form action='"
																								+ path
																								+ "'></form>")
																						.appendTo(
																								'body')
																						.submit();*/
																			});
														});

										$(".dt-remove").each(function() {
											   $(this).empty();
								$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
													$(this)
															.on('click',function() {
																		var table = $('#userTable').DataTable();
																		var data = table.row($(this).parents('tr')).data();
																		$(
																		".modal-body #disablingUserId")
																		.val(data.id);
																		$(
																		'#popforuserdisablereason')
																		.modal(
																		'show');
																	});
												});
									
										
										
										$(".show-wallet-history")
										.each(
												function() {
													$(this)
															.addClass(
																	'text-default')
															.append(
																	"<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>");
													$(this)
															.on(
																	'click',
																	function() {
																		var table = $(
																				'#userTable')
																				.DataTable();
																		var data = table
																				.row(
																						$(
																								this)
																								.parents(
																										'tr'))
																				.data();
																		var path = SITEBASEURL
																				+ 'withDrawal/walletHistory/'
																				+ data.id + "/true";
																		$(
																				"<form action='"
																						+ path
																						+ "' target='_blank'></form>")
																				.appendTo(
																						'body')
																				.submit();
																	});
												});
												
												
													
										$(".show-wallet-history-per-transaction")
										.each(
												function() {
													$(this)
															.addClass(
																	'text-default')
															.append(
																	"<span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>");
													$(this)
															.on(
																	'click',
																	function() {
																		var table = $(
																				'#userTable')
																				.DataTable();
																		var data = table
																				.row(
																						$(
																								this)
																								.parents(
																										'tr'))
																				.data();
																			
																		
										callToView(data.id);
																	

																
																			
																			
			
																	});
												});
									
												
												$(".delete-user-devices")
										.each(
												function() {
													$(this)
															.addClass(
																	'text-default')
															.append(
																	"<span class='glyphicon glyphicon-log-out' aria-hidden='true'></span>");
													$(this)
															.on(
																	'click',
																	function() {
																		if (confirm('are you sure you want to Logout this User?')) {
																		
																		var table = $(
																				'#userTable')
																				.DataTable();
																		var data = table
																				.row(
																						$(
																								this)
																								.parents(
																										'tr'))
																				.data();
																			
																		
										callToDeleteUserDevices(data.id);
																	
 													}
                else{
                    return false;
                }

																
																			
																			
			
																	});
												});
												
												
												
												
												
												
												
										$(".update-withdrawal-enabled")
										.each(
												function() {
													$(this).empty();
													var table = $('#userTable').DataTable();
													var data = table.row($(this).parents('tr')).data();

													if(data.isWithDrawalEnabled){
														$(this).addClass('text-default').append("<input type='checkbox' id=selectBox_"+data.id+"  checked aria-hidden='true'></input>");
													} else {
														$(this).addClass('text-default').append("<input type='checkbox' id=selectBox_"+data.id+" aria-hidden='true'></input>");
													}
													
													$(this).on('click',function() {
														var table = $('#userTable').DataTable();
														var data = table.row($(this).parents('tr')).data();
														var userId = data.id;
														var isWithdrawalEnable;
														if ($('#selectBox_'+userId).is(':checked')) {
															isWithdrawalEnable = true;
														} else {
															isWithdrawalEnable = false;
														}

														
														$(
														".modal-body #userIdForWithdrawalEnableDisable")
														.val(data.id);
														$(
														".modal-body #withdrawalStatus")
														.val(isWithdrawalEnable);
														
														$(
														'#popUpForWithdrawalEnableDisable')
														.modal(
														'show');
													});
										 });
										
										$(".update-wallet-debit")
										.each(
												function() {
													$(this)
															.addClass(
																	'text-default')
															.append(
																	"<i class='fa fa-rupee' style='font-size:20px' aria-hidden='true'></i>");
													$(this)
															.on(
																	'click',
																	function() {
																		var table = $(
																				'#userTable')
																				.DataTable();
																		var data = table
																				.row(
																						$(
																								this)
																								.parents(
																										'tr'))
																				.data();
																		var path = SITEBASEURL
																				+ 'user/debitWallet/'
																				+ data.phone;
																		$(
																				"<form action='"
																						+ path
																						+ "' target='_blank'></form>")
																				.appendTo(
																						'body')
																				.submit();
																	});
												});
										
										$(".send-notification")
										.each(function() {
											$(this).addClass('text-default').append("<span class='glyphicon glyphicon-bell' aria-hidden='true'></span>");
													$(this)
															.on('click',function() {
																		var table = $('#userTable').DataTable();
																		var data = table.row($(this).parents('tr')).data();
																		$(
																		".modal-body #userId")
																		.val(data.id);
																		$(
																		'#scriptModal')
																		.modal(
																		'show');
																		/*var path = SITEBASEURL
																				+ 'user/send-notification/'
																				+ data.id ;
																		$("<form action='"+ path+ "' target='_blank'></form>").appendTo('body').submit();*/
																	});
												});
									});

					$("#search").click(function() {
						callToSearchResults();
					});

					var statisticsUrl = SITEBASEURL + "user/statistics";
					var requestMethodType = "GET";

					$.ajax({
						url : statisticsUrl,
						type : requestMethodType,
						contentType : "application/json",
						dataType : "json",
						beforeSend: function(){
						    $("#loader").show();
						   },
						success : updateStatistics,
						complete:function(data){
						    $("#loader").hide();
						   },
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
	$("#todayTotalUninstalledUsers").html(result.todayTotalUninstalledUsers);

}

function callToSearchResults() {
	$("#userTable_wrapper").html("");
	var reportUrl = SITEBASEURL + "user/userListing?fromDate="
			+ $("#fromDate").val() + "&toDate=" + $("#toDate").val();
	var table = $('#userSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"stateSave":true,
						 "language": {
							 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
						    },
						    processing : true,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								},
								{
									"sTitle" : "Name",
									"mData" : "firstName"
								},
								{
									"sTitle" : "Phone Number",
									"mData" : "phoneNumber",
									"bSortable" : false
								},
								{
									"sTitle" : "Action",
									"bSortable" : false,
									"sDefaultContent" : "<h4><a class='dt-edit'></a>&nbsp&nbsp&nbsp<a class='dt-remove'></a></h4>"
								},
								{
									"sTitle" : "Wallet History",
									"bSortable" : false,
									"sDefaultContent" : "<h4><a class='show-wallet-history'></a></h4>"
								},
								{
									"sTitle" : "Withdrawal Enable",
									"bSortable" : false,
									"sDefaultContent" : "<a class='update-withdrawal-enabled'></a>"
								},
								{
									"sTitle" : "Debit",
									"bSortable" : false,
									"sDefaultContent" :"<a class='update-wallet-debit'></a>"
									
								},
								{
									"sTitle" : "Notification",
									"bSortable" : false,
									"sDefaultContent" :"<a class='send-notification'></a>"
									
								},
								{
									"sTitle" : "Logout",
									"bSortable" : false,
									"sDefaultContent" :"<a class='delete-user-devices'></a>"
									
								}
								,
								{
									"sTitle" : "Tx.Action",
									"bSortable" : false,
									"sDefaultContent" : "<h4><a class='show-wallet-history-per-transaction'></a></h4>"
								}
								],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							return nRow;
						},
					});

	$("#userSearchTable")
			.on(
					'draw.dt',
					function() {
						$(".dt-edit")
								.each(
										function() {
											$(this).empty();
											$(this)
													.addClass('text-default')
													.append(
															"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
											$(this)
													.on(
															'click',
															function() {
																var table = $(
																		'#userSearchTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();
																callToViewPage(data.id);
																
															/*	var path = SITEBASEURL
																		+ 'user/'
																		+ data.id;
																$(
																		"<form action='"
																				+ path
																				+ "'></form>")
																		.appendTo(
																				'body')
																		.submit();*/
															});
										});

						$(".dt-remove").each(function() {
							   $(this).empty();
				$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
									$(this)
											.on('click',function() {
														var table = $('#userSearchTable').DataTable();
														var data = table.row($(this).parents('tr')).data();
														$(
														".modal-body #disablingUserId")
														.val(data.id);
														$(
														'#popforuserdisablereason')
														.modal(
														'show');
													});
								});
					
						
						$(".show-wallet-history")
						.each(
								function() {
									$(this).empty();
									$(this)
											.addClass('text-default')
											.append(
													"<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>");
									$(this)
											.on(
													'click',
													function() {
														var table = $('#userSearchTable')
																.DataTable();
														var data = table
																.row(
																		$(
																				this)
																				.parents(
																						'tr'))
																.data();
														var path = SITEBASEURL
																+ 'withDrawal/walletHistory/'
																+ data.id +"/true";
														$(
																"<form action='"
																		+ path
																		+ "' target='_blank'></form>")
																.appendTo(
																		'body')
																.submit();
													});
								});
						
						
						
													
										$(".show-wallet-history-per-transaction")
										.each(
												function() {
													$(this)
															.addClass(
																	'text-default')
															.append(
																	"<span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>");
													$(this)
															.on(
																	'click',
																	function() {
																		var table = $(
																				'#userSearchTable')
																				.DataTable();
																		var data = table
																				.row(
																						$(
																								this)
																								.parents(
																										'tr'))
																				.data();
																			
																			
																				
																		callToView(data.id);
																	});
												});
									$(".delete-user-devices")
										.each(
												function() {
													$(this)
															.addClass(
																	'text-default')
															.append(
																	"<span class='glyphicon glyphicon-log-out' aria-hidden='true'></span>");
													$(this)
															.on(
																	'click',
																	function() {
																		
																		if (confirm('are you sure you want to Logout this User?')) {
																			
																		var table = $(
																				'#userSearchTable')
																				.DataTable();
																		var data = table
																				.row(
																						$(
																								this)
																								.parents(
																										'tr'))
																				.data();
																			
																		
										callToDeleteUserDevices(data.id);
																	 }
                else{
                    return false;
                }


																
																			
																			
			
																	});
												});
												

						$(".update-withdrawal-enabled")
						.each(
								function() {
									$(this).empty();
									var table = $('#userSearchTable').DataTable();
									var data = table.row($(this).parents('tr')).data();
									if(data.isWithDrawalEnabled){
										$(this).addClass('text-default').append("<input type='checkbox' id=selectBox_"+data.id+" checked aria-hidden='true'></input>");
									} else {
										$(this).addClass('text-default').append("<input type='checkbox' id=selectBox_"+data.id+" aria-hidden='true'></input>");
									}
									
									$(this).on('click',function() {
										
										var userId = data.id;
										var isWithdrawalEnable;
										if ($('#selectBox_'+userId).is(':checked')) {
											isWithdrawalEnable = true;
										} else {
											isWithdrawalEnable = false;
										}
										var path = SITEBASEURL+ 'user/update-withdrawal-enable/'+ data.id +"/" +isWithdrawalEnable;
										$("<form action='"+ path+ "' ></form>").appendTo('body').submit();
									});
						 });
						$(".update-wallet-debit")
						.each(
								function() {
									$(this)
											.addClass(
													'text-default')
											.append(
													"<i class='fa fa-rupee' style='font-size:20px' aria-hidden='true'></i>");
									$(this)
											.on(
													'click',
													function() {
														var table = $(
																'#userTable')
																.DataTable();
														var data = table
																.row(
																		$(
																				this)
																				.parents(
																						'tr'))
																.data();
														var path = SITEBASEURL
																+ 'user/debitWallet/'
																+data.phone;
														$(
																"<form action='"
																		+ path
																		+ "' target='_blank'></form>")
																.appendTo(
																		'body')
																.submit();
													});
								});
						
						$(".send-notification")
						.each(function() {
							$(this).addClass('text-default').append("<span class='glyphicon glyphicon-bell' aria-hidden='true'></span>");
									$(this)
											.on('click',function() {
														var table = $('#userTable').DataTable();
														var data = table
																.row($(this).parents('tr')).data();
														
														$(
														".modal-body #userId")
														.val(data.id);
														$(
														'#scriptModal')
														.modal(
														'show');
														/*var path = SITEBASEURL
																+ 'user/send-notification/'
																+ data.id ;
														$("<form action='"+ path+ "' target='_blank'></form>").appendTo('body').submit();*/
													});
								});
						
							});
}




function callToView(id){

var search='';
var fromDate=$('#fromDate').val();
var toDate=$('#toDate').val() ;
var searchValue=$('.dataTables_filter input').val();         
 
if(searchValue != '')
	    	
{
		                         
search='search='+searchValue;
}
		
if(fromDate != '' &&  toDate != '')
{
	
if(search !='')	
{
	
search =search+'&formDateUser='+fromDate+ '&toDateUser='+toDate;
}

else {
search ='formDateUser='+fromDate+ '&toDateUser='+toDate;
	
}
}		 
	window.location.href =  SITEBASEURL+'user/overAll-earning-by-transaction-action-of-user/'+id+'/1?'+search;
	
}

function callToViewPage(userId){

	var search='';
	var fromDate=$('#fromDate').val();
	var toDate=$('#toDate').val() ;
	var searchValue=$('.dataTables_filter input').val();         
	 
	if(searchValue != '')
		    	
	{
			                         
	search='search='+searchValue;
	}
			
	if(fromDate != '' &&  toDate != '')
	{
		
	if(search !='')	
	{
		
	search =search+'&formDateUser='+fromDate+ '&toDateUser='+toDate;
	}

	else {
	search ='fromDate='+fromDate+ '&toDate='+toDate;
		
	}
	}		 
		window.location.href =  SITEBASEURL+'user/'+userId+'?'+search;
		
}

function callToDeleteUserDevices(userId){

	window.location.href =  SITEBASEURL+'user/delete-user-devices/'+userId;
		
}


