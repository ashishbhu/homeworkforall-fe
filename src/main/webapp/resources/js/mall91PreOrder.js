$(document)
.ready(
		function() {


			var reportUrl = SITEBASEURL + "mall91PreOrder/preOrderListing?saleNumber="
			+ $("#saleNumber").val();
			var table = $('#preOrderTable')
			.dataTable(
					{
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [
						               {
						            	   "sTitle" : "#",
						            	   "mData" : "id",
						            	   "bSortable" : false
						               },

						               {
						            	   "sTitle" : "Ref ID",
						            	   "mData" : "saleReferenceID",
						            	   "bSortable" : false
						               },

						               {
						            	   "sTitle" : "ProductName",
						            	   "mData" : "productName"
						               },

						               {
						            	   "sTitle" : "Selling Price",
						            	   "mData" : "sellingPrice"
						               },
						               {
						            	   "sTitle" : "Paid Price",
						            	   "mData" : "totalPaidAmount",
						            	   "bSortable" : false
						               },

						               {
						            	   "sTitle" : "Buyer",
						            	   "mData" : "customerName",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "Date",
						            	   "mData" : "orderDate",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "Order State",
						            	   "mData" : "orderStateUI",
						            	   "bSortable" : false
						               },

						               {
						            	   "sTitle" : "Action",
						            	   "bSortable" : false,
						            	   "sDefaultContent" : "<h4><a class='dt-edit'></h4>"
						               },
						               {
						            	   "sTitle" : "",
						            	   "bSortable" : false,
						            	   "sDefaultContent" : "<a class='dt-order-create'>"
						               },
						               {
						            	   "sTitle" : "",
						            	   "bSortable" : false,
						            	   "sDefaultContent" : "<a class='dt-copy-preorder'>"
						               }],
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

			$("#preOrderTable")
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
									$(this).unbind().on(
											'click',
											function() {
												var table = $(
												'#preOrderTable')
												.DataTable();
												var data = table
												.row(
														$(
																this)
																.parents(
																		'tr'))
																		.data();
												var path = SITEBASEURL
												+ 'mall91PreOrder/get/'
												+ data.saleNumber;
												$(
														"<form action='"
														+ path
														+ "' target = '_blank'></form>")
														.appendTo(
														'body')
														.submit();
											});
								});

						$(".dt-order-create")
						.each(
								function() {
									var table = $('#preOrderTable').DataTable();
									var data = table.row($(this).parents('tr')).data();
									if(!data.orderCreated)
									{
										$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Create Order</span>");
										$(this).unbind().on(
												'click',
												function() {

													var table = $(
													'#preOrderTable')
													.DataTable();
													var data = table
													.row(
															$(
																	this)
																	.parents(
																			'tr'))
																			.data();
													var path = SITEBASEURL
													+ 'mall91Order/add/'
													+ data.saleNumber;
													$(
															"<form action='"
															+ path
															+ "' target = '_blank'></form>")
															.appendTo(
															'body')
															.submit();

												});
									}else{
										$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>View Existing Order</span>");
										$(this).unbind().on(
												'click',
												function() {

													var table = $(
													'#preOrderTable')
													.DataTable();
													var data = table
													.row(
															$(
																	this)
																	.parents(
																			'tr'))
																			.data();
													var path = SITEBASEURL
													+ 'mall91OpsOrder/get/'
													+ data.orderId;
													$(
															"<form action='"
															+ path
															+ "' target = '_blank'></form>")
															.appendTo(
															'body')
															.submit();

												});
									}});
						$(".dt-copy-preorder")
						.each(
								function() {
									var table = $('#preOrderTable').DataTable();
									var data = table.row($(this).parents('tr')).data();
									if(data.orderStateUI == 'PAYMENT_FAILURE' || data.orderStateUI == 'PAYMENT_PENDING')
									{
										$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Copy PreOrder</span>");
										$(this).unbind().on(
												'click',
												function() {

													var path = SITEBASEURL
													+ 'mall91Order/copy-preOrder/'+ data.saleNumber;
													$(
															"<form action='"
															+ path
															+ "' target = '_blank'></form>")
															.appendTo(
															'body')
															.submit();

												});
									}else{
										$(this).addClass('text-default').append("-");
									}});
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
	$("#preOrderTable_wrapper").html("");
	var reportUrl = SITEBASEURL + "mall91PreOrder/preOrderListing?saleNumber="
	+ $("#saleNumber").val() + "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();
	var table = $('#preOrderSearchTable')
	.dataTable(
			{
				"destroy" : true,
				"bProcessing" : true,
				"bServerSide" : true,
				"ordering" : true,
				"bSearchable" : false,
				"bFilter" : false,
				"sAjaxSource" : reportUrl,
				"aoColumns" : [
				               {
				            	   "sTitle" : "#",
				            	   "mData" : "id",
				            	   "bSortable" : false
				               },

				               {
				            	   "sTitle" : "Ref ID",
				            	   "mData" : "saleReferenceID",
				            	   "bSortable" : false
				               },

				               {
				            	   "sTitle" : "ProductName",
				            	   "mData" : "productName"
				               },

				               {
				            	   "sTitle" : "Selling Price",
				            	   "mData" : "sellingPrice"
				               },
				               {
				            	   "sTitle" : "Paid Price",
				            	   "mData" : "totalPaidAmount",
				            	   "bSortable" : false
				               },

				               {
				            	   "sTitle" : "Buyer",
				            	   "mData" : "customerName",
				            	   "bSortable" : false
				               },
				               {
				            	   "sTitle" : "Date",
				            	   "mData" : "orderDate",
				            	   "bSortable" : false
				               },
				               {
				            	   "sTitle" : "Order State",
				            	   "mData" : "orderStateUI",
				            	   "bSortable" : false
				               },
				               {
				            	   "sTitle" : "Action",
				            	   "bSortable" : false,
				            	   "sDefaultContent" : "<h4><a class='dt-edit'></h4>"
				               },
				               {
				            	   "sTitle" : "",
				            	   "bSortable" : false,
				            	   "sDefaultContent" : "<a class='dt-order-create'>"
				               },
				               {
				            	   "sTitle" : "",
				            	   "bSortable" : false,
				            	   "sDefaultContent" : "<a class='dt-copy-preorder'>"
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

	$("#preOrderSearchTable")
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
							$(this).unbind().on(
									'click',
									function() {
										var table = $(
										'#preOrderSearchTable')
										.DataTable();
										var data = table
										.row(
												$(
														this)
														.parents(
																'tr'))
																.data();
										var path = SITEBASEURL
										+ 'mall91PreOrder/get/'
										+ data.saleNumber;
										$(
												"<form action='"
												+ path
												+ "' target = '_blank'></form>")
												.appendTo(
												'body')
												.submit();
									});
						});

				$(".dt-order-create")
				.each(
						function() {
							$(this).empty();
							var table = $('#preOrderSearchTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							if(!data.orderCreated)
							{
								$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Create Order</span>");
								$(this).unbind().on(
										'click',
										function() {
											var table = $(
											'#preOrderSearchTable')
											.DataTable();
											var data = table
											.row(
													$(
															this)
															.parents(
																	'tr'))
																	.data();
											var path = SITEBASEURL
											+ 'mall91Order/add/'
											+ data.saleNumber;
											$(
													"<form action='"
													+ path
													+ "' target = '_blank'></form>")
													.appendTo(
													'body')
													.submit();
										});
							} 	else{
								$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>View Existing Order</span>");
								$(this).unbind().on(
										'click',
										function() {
											var table = $(
											'#preOrderSearchTable')
											.DataTable();
											var data = table
											.row(
													$(
															this)
															.parents(
																	'tr'))
																	.data();
											var path = SITEBASEURL
											+ 'mall91OpsOrder/get/'
											+ data.orderId;
											$(
													"<form action='"
													+ path
													+ "' target = '_blank'></form>")
													.appendTo(
													'body')
													.submit();
										});
							}}
				);
				
				$(".dt-copy-preorder")
				.each(
						function() {
							$(this).empty();
							var table = $('#preOrderSearchTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							if(data.orderStateUI == 'PAYMENT_FAILURE' || data.orderStateUI == 'PAYMENT_PENDING')
							{
								$(this).addClass('text-default').append("<span class='btn btn-custom' aria-hidden='true'>Copy PreOrder</span>");
								$(this).unbind().on(
										'click',
										function() {

											var path = SITEBASEURL
											+ 'mall91Order/copy-preOrder/'+ data.saleNumber;
											$(
													"<form action='"
													+ path
													+ "' target = '_blank'></form>")
													.appendTo(
													'body')
													.submit();

										});
							}else{
								$(this).addClass('text-default').append("-");
							}});
			});
}