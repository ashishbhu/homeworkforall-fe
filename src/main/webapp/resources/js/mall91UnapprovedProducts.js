$(document)
		.ready(
				function() {

					var reportUrl = SITEBASEURL
							+ "mall91Product/listing?category="
							+ $("#rootCategoryId").val() + "&childCategoryId="
							+ $("#categoryId").val() + "&orderSupplier="
							+ $("#orderSupplier").val() + "&b2bStatus="
							+ $("#b2bStatus").val() + "&status="
							+ $("#status").val();
					var table = $('#groupBuyTable')
							.dataTable(
									{

										"bServerSide" : true,
										"ordering" : true,
										"bSearchable" : false,
										"bFilter" : false,
										"bStateSave" : true,
										"sAjaxSource" : reportUrl,
										"language" : {
											processing : '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
										},
										processing : true,
										"aoColumns" : [
												{
													"sTitle" : "#",
													"mData" : "id",
													"bSortable" : false
												},
												{
													"sTitle" : "Id",
													"mData" : "productId",
													"bSortable" : false
												},
												{
													"sTitle" : "CreateDate",
													"mData" : "createDate",
													"bSortable" : false
												},
												{
									                "sTitle": "Seller",
									                "mData": "supplierName",
									                "bSortable": false
									            } ,
												{
													"sTitle" : "Name",
													"mData" : "productName",
													"bSortable" : false
												},

												{
													"sTitle" : "Image",
													"bSortable" : false,
													"render" : function(
															imageUrl, type, row) {
														if (row.imageUrl == 'null'
																|| row.imageUrl == undefined) {
															return " ";
														} else {

															return "<a target='_blank' href="
																	+ row.imageUrl
																	+ "><img src="
																	+ row.imageUrl
																	+ " height='40px' width='40px'></a>";

														}
													}
												},

												{
													"sTitle" : "isB2B",
													"mData" : "isB2bProduct",
													"bSortable" : false
												},
												{
													"sTitle" : "status",
									               // "mData": "status",
									                "bSortable": false,
									                "render": function (status, type, row) {
									                	
									                	if(row.status =='UNAPPROVED'){
									                		  return '<a class="" onclick="getProductComments(\''+ row.productId+'\')"><b>'+row.status+'</b><a/>'
									         		   }
									         		   else {
									         			   return row.status;
									         		   }
									                }
									            },
												{
													"sTitle" : "Category",
													"mData" : "rootCategoryName",
													"bSortable" : false
												},
												{
													"sTitle" : "View",
													"bSortable" : false,
													"sDefaultContent" : "<h5><a class='dt-edit'></a></h5>"
												},
												{
													"sTitle" : "Action",
													"bSortable" : false,
													"render" : function(
															isB2BCreated, type,
															row) {
														if (row.status == 'PENDING') {
															return "<span style ='display:inline-block; width:200px;'><a class='dt-approve'></a><a class='dt-reject'></span>";
														} else {
															return '';
														}
													}
												} ],
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

					$("#groupBuyTable")
							.on(
									'draw.dt',
									function() {
										
										$(".dt-edit")
												.each(
														function() {
															$(this).empty();
															$(this)
																	.addClass(
																			'text-default')
																	.append(
																			"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");

															var table = $(
																	'#groupBuyTable')
																	.DataTable();
															$(this)
																	.on(
																			'click',
																			function() {
																				var table = $(
																						'#groupBuyTable')
																						.DataTable();
																				var data = table
																						.row(
																								$(
																										this)
																										.parents(
																												'tr'))
																						.data();
																				callToEdit(
																						data.productId,
																						data.sellerId);
																				/*
																				 * var
																				 * path =
																				 * SITEBASEURL +
																				 * 'mall91Product/get/' +
																				 * data.productId+'/'+sellerId+'/'+categoryId+"?childCategoryId="+
																				 * childCategoryId;
																				 * $("<form
																				 * action='" +
																				 * path +
																				 * "'></form>").appendTo('body').submit();
																				 */
																			});
														});
										$(".dt-approve")
												.each(
														function() {
															$(this).empty();
															$(this)
																	.addClass(
																			'text-default col-sm-5')
																	.append(
																			'<button style="background:#28B463; color:white; border: none;padding: 7px 18px;">ACTIVE</button>');

															var table = $(
																	'#groupBuyTable')
																	.DataTable();
															$(this)
																	.on(
																			'click',
																			function() {
																				var table = $(
																						'#groupBuyTable')
																						.DataTable();
																				var data = table
																						.row(
																								$(
																										this)
																										.parents(
																												'tr'))
																						.data();
																				callToAproveReject(
																						data.productId,
																						"ACTIVE");
																			});
														});

										$(".dt-reject")
												.each(
														function() {
															$(this).empty();
															$(this)
																	.addClass(
																			'text-default col-sm-2')
																	.append(
																			'<button style="background:#FF5733; color:white; border: none;padding: 7px 18px;">UNAPPROVE</button>');

															var table = $(
																	'#groupBuyTable')
																	.DataTable();
															$(this)
																	.on(
																			'click',
																			function() {
																				var table = $(
																						'#groupBuyTable')
																						.DataTable();
																				var data = table
																						.row(
																								$(
																										this)
																										.parents(
																												'tr'))
																						.data();
																				callToReject(
																						data.productId,
																						"UNAPPROVED");
																			});
														});

									});
					$("#status").change(function() {
						callToSearchResults();
					});

					$("#orderSupplier").change(function() {
						callToSearchResults();
					});

					$("#rootCategoryId").change(function() {
						$("#categoryId").val(0);
						$("#displayCategoryId").val(0);
						showCategory();
						callToSearchResults();
					});

					$("#categoryId").change(function() {
						callToSearchResults();
					});

					$("#search").click(function() {
						$("#searchByItemId").val("");
						callToSearchResults();
					});
					$("#searchForItemId").click(function() {
						$("#searchByProductId").val("");
						callToSearchResults();
					});

					$("#b2bStatus").change(function() {
						callToSearchResults();
					});

					$("#status").change(function() {
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

}

function callToAproveReject(productId, status) {
	var sellerId = $("#orderSupplier").val();
	var categoryId = $("#rootCategoryId").val();
	window.location.href = SITEBASEURL
			+ "mall91Product/process-approval-rejection/" + productId + "/"
			+ status + '/' + categoryId + '/' + sellerId + "?childCategoryId="
			+ $("#categoryId").val() + "&b2bStatus=" + $("#b2bStatus").val();
}

function callToReject(productId, status) {
	$("#productId").val(productId);
	$("#status").val(status);
	$('#scriptModalForProductUnapprovalReason').modal('show');
}



function getProductComments(productId){
	window.location.href = SITEBASEURL+"mall91Product/get-comment-for-product/"+productId+"?category="+$("#rootCategoryId").val()+"&childCategoryId="+$("#categoryId").val()+"&b2bStatus="+$("#b2bStatus").val()+"&forUnapprovedListing=true";
}


function callToSearchResults() {
	$("#groupBuyTable_wrapper").html("");
	var reportUrl = SITEBASEURL + "mall91Product/listing?category="
			+ $("#rootCategoryId").val() + "&childCategoryId="
			+ $("#categoryId").val() + "&orderSupplier="
			+ $("#orderSupplier").val() + "&b2bStatus=" + $("#b2bStatus").val()
			+ "&productId=" + $("#searchByProductId").val() + "&itemId="
			+ $("#searchByItemId").val() + "&status=" + $("#status").val();
	var table = $('#groupBuySearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								},
								{
									"sTitle" : "Id",
									"mData" : "productId",
									"bSortable" : false
								},
								{
									"sTitle" : "CreateDate",
									"mData" : "createDate",
									"bSortable" : false
								},
								{
					                "sTitle": "sellerName",
					                "mData": "supplierName",
					                "bSortable": false
					            } ,
								{
									"sTitle" : "Name",
									"mData" : "productName",
									"bSortable" : false
								},
								{
									"sTitle" : "Image",
									"bSortable" : false,
									"render" : function(imageUrl, type, row) {
										if (row.imageUrl == 'null'
												|| row.imageUrl == undefined) {
											return " ";
										} else {

											return "<a target='_blank' href="
													+ row.imageUrl
													+ "><img src="
													+ row.imageUrl
													+ " height='40px' width='40px'></a>";

										}
									}
								},
								{
									"sTitle" : "isB2B",
									"mData" : "isB2bProduct",
									"bSortable" : false
								},
								{
									"sTitle" : "status",
					               // "mData": "status",
					                "bSortable": false,
					                "render": function (status, type, row) {
					                	
					                	if(row.status =='UNAPPROVED'){
					                		  return '<a class="" onclick="getProductComments(\''+ row.productId+'\')"><b>'+row.status+'</b><a/>'
					         		   }
					         		   else {
					         			   return row.status;
					         		   }
					                }
					            },

								{
									"sTitle" : "Category",
									"mData" : "rootCategoryName",
									"bSortable" : false
								},
								{
									"sTitle" : "View",
									"bSortable" : false,
									"sDefaultContent" : "<h5><a class='dt-edit'></a></h5>"
								},
								{
									"sTitle" : "Action",
									"bSortable" : false,
									"render" : function(isB2BCreated, type, row) {
										if (row.status == 'PENDING') {
											return "<span style ='display:inline-block; width:200px;'><a class='dt-approve'></a><a class='dt-reject'></span>";
										} else {
											return '-';
										}
									}
								} ],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							return nRow;
						},
					});

	$("#groupBuySearchTable")
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
											var sellerId = $("#orderSupplier")
													.val();
											var categoryId = $("#categoryId")
													.val();
											$(this)
													.on(
															'click',
															function() {
																var table = $(
																		'#groupBuySearchTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();

																callToEdit(
																		data.productId,
																		data.sellerId);
																/*
																 * var path =
																 * SITEBASEURL +
																 * 'mall91Product/get/' +
																 * data.productId+'/'+
																 * data.sellerId+'/'+data.categoryId;
																 * $("<form
																 * action='" +
																 * path + "'></form>").appendTo('body').submit();
																 */
															});
										});
						$(".dt-approve")
								.each(
										function() {
											$(this).empty();
											$(this)
													.addClass('text-default col-sm-5')
													.append(
															'<button style="background:#28B463; color:white; border: none;padding: 7px 18px;">ACTIVE</button>');

											var table = $('#groupBuySearchTable')
													.DataTable();
											$(this)
													.on(
															'click',
															function() {
																var table = $(
																		'#groupBuySearchTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();
																callToAproveReject(
																		data.productId,
																		"ACTIVE");
															});
										});

						$(".dt-reject")
								.each(
										function() {
											$(this).empty();
											$(this)
													.addClass('text-default col-sm-2')
													.append(
															'<button style="background:#FF5733; color:white; border: none;padding: 7px 18px;">UNAPPROVE</button>');

											var table = $('#groupBuySearchTable')
													.DataTable();
											$(this)
													.on(
															'click',
															function() {
																var table = $(
																		'#groupBuySearchTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();
																callToReject(
																		data.productId,
																		"UNAPPROVED");
															});
										});

					});
}

function callToEdit(productId, sellerId) {
	// var sellerId = $("#orderSupplier").val();
	var categoryId = $("#rootCategoryId").val();
	var childCategoryId = $("#categoryId").val();
	var b2bStatus = $("#b2bStatus").val();
	window.location.href = SITEBASEURL + 'mall91Product/get/' + productId + '/'
			+ sellerId + '/' + categoryId + "?childCategoryId="
			+ childCategoryId + "&b2bStatus=" + b2bStatus + "&orderSupplier="
			+ $("#orderSupplier").val() + "&status=" + $("#status").val()+"&isProductApproval=true";
}
