$(document)
		.ready(
				function() {

					var reportUrl = SITEBASEURL + "purchaseOrders/listing";
					var table = $('#contentTable')
							.dataTable(
									{
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
													"sTitle" : "ItemId",
													"mData" : "itemId",
													"bSortable" : false
												},
												{
													"sTitle" : "CreateDate",
													"mData" : "createDate",
													"bSortable" : false
												},
												{
													"sTitle" : "Item Name",
													"mData" : "itemName",
													"bSortable" : false
												},
												
												{
													"sTitle" : "Image",
													"mData" : "imageUI",
													"bSortable" : false
												},
												{
													"sTitle" : "Quantity",
													"mData" : "quantity",
													"bSortable" : false
												},
												{
													"sTitle" : "Total Consumed",
													"mData" : "totalConsumed",
													"bSortable" : false
												},
												{
													"sTitle" : "Details",
													"bSortable" : false,
													"sDefaultContent" : "<a class='dt-edit'></a>"
												},
												{
													"sTitle" : "PO Status",
													"mData" : "pOStatus",
													"bSortable" : false
												},
												{
													"sTitle" : "Action",
													"bSortable" : false,
													"sDefaultContent" : "<a class='dt-remove'></a>"
												},
												{
													"sTitle" : "Remark",
													"bSortable" : false,
													"render": function (callsCount, type, row) {
												        if (row.remark !=null && row.remark !='') {
												          return "<a class='dt-update-remark'></a>";
												            }
												        else {
												          return "<a class='dt-remark'></a>";
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

					$("#contentTable")
							.on(
									'draw.dt',
									function() {

										$(".dt-remove")
												.each(
														function() {
															$(this)
																	.append(
																			"<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>");
															$(this)
																	.on(
																			'click',
																			function() {
																				if (confirm('are you sure you want to update status for this Purchase order?')) {
																					var table = $(
																							'#contentTable')
																							.DataTable();
																					var data = table
																							.row(
																									$(
																											this)
																											.parents(
																													'tr'))
																							.data();
																					var path = SITEBASEURL
																							+ 'purchaseOrders/changePOOrderState/'+data.pOStatus +'/'
																							+ data.id;
																					$(
																							"<form action='"
																									+ path
																									+ "'></form>")
																							.appendTo(
																									'body')
																							.submit();
																				} else {
																					return false;
																				}
																			});
														});
										$(".dt-remark")
										.each(
												function() {
													$(this)
													$(this).empty();
													
										    		$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Add</button>');
										    		$(this).on('click', function() {
										    		var table = $(
														'#contentTable')
														.DataTable();
												    var data = table
														.row(
																$(
																		this)
																		.parents(
																				'tr'))
														.data();
										    		   $('#scriptModal').modal('show');
										    		   $('.modal-backdrop.fade.in').css("display", "none")
										    		  	$('.modal-body #purchaseId').val(data.id);
										    		  		
										    		  		 
										    
												});
										
								
									});
								$(".dt-update-remark")
										.each(
												function() {
													$(this)
													$(this).empty();
													var table = $(
													'#contentTable')
													.DataTable();
											    var data = table
													.row(
															$(
																	this)
																	.parents(
																			'tr'))
													.data();
										    		$(this).addClass('text-default').append('<span style="color:black; font-weight: bold;">'+data.remark+'</span>');
										    		$(this).on('click', function() {
										    		
										    		   $('#scriptModal').modal('show');
										    		   $('.modal-backdrop.fade.in').css("display", "none")
										    		  	$('.modal-body #purchaseId').val(data.id);
										    		   $('.modal-body #remark').val(data.remark);
										    		  		
										    		  		 
										    
												});
										
								
									});	
								$(".dt-edit")
								.each(
										function() {
								    		$(this).addClass('text-default')
								    		.append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
								    		$(this)
											.on('click',function() {
											var table = $('#contentTable').DataTable();
											var data = table.row($(this).parents('tr')).data();
													callToEdit(data.id,data.sellerId);
										});
								});
						});

				});

function callToSearchResults(reportUrl) {
	$("#contentTable_wrapper").html("");
	// var reportUrl = SITEBASEURL + "content/contentListing" ;
	var table = $('#contentSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						},
						{
							"sTitle" : "ItemId",
							"mData" : "itemId",
							"bSortable" : false
						},
						{
							"sTitle" : "CreateDate",
							"mData" : "createDate",
							"bSortable" : false
						},
						{
							"sTitle" : "Item Name",
							"mData" : "itemName",
							"bSortable" : false
						},
						
						{
							"sTitle" : "Image",
							"mData" : "imageUI",
							"bSortable" : false
						},
						{
							"sTitle" : "Quantity",
							"mData" : "quantity",
							"bSortable" : false
						},
						{
							"sTitle" : "Total Consumed",
							"mData" : "totalConsumed",
							"bSortable" : false
						},
						{
							"sTitle" : "Details",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit'></a>"
						},
						{
							"sTitle" : "PO Status",
							"mData" : "pOStatus",
							"bSortable" : false
						}, {
							"sTitle" : "Action",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-remove-n'></a>"
						},
						{
							"sTitle" : "Remark",
							"bSortable" : false,
							"render": function (callsCount, type, row) {
						        if (row.remark !=null && row.remark !='') {
						          return "<a class='dt-update-remark'></a>";
						            }
						        else {
						          return "<a class='dt-remark'></a>";
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

	$("#contentSearchTable")
			.on(
					'draw.dt',
					function() {
						$(".dt-remove-n")
								.each(
										function() {
											$(this).empty();
											$(this)
													.append(
															"<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
											$(this)
													.on(
															'click',
															function() {

																var table = $(
																		'#contentSearchTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();
																var path = SITEBASEURL
																		+ 'purchaseOrders/changePOOrderState/'
																		+ data.id;
																$(
																		"<form action='"
																				+ path
																				+ "'></form>")
																		.appendTo(
																				'body')
																		.submit();
															});
										});
						$(".dt-remark")
						.each(
								function() {
									$(this)
									$(this).empty();
									
						    		$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Add</button>');
						    		$(this).on('click', function() {
						    		var table = $(
										'#contentSearchTable')
										.DataTable();
								    var data = table
										.row(
												$(
														this)
														.parents(
																'tr'))
										.data();
						    		   $('#scriptModal').modal('show');
						    		   $('.modal-backdrop.fade.in').css("display", "none")
						    		  	$('.modal-body #purchaseId').val(data.id);
						    		  		
						    		  		 
						    
								});
						
				
					});
				$(".dt-update-remark")
						.each(
								function() {
									$(this)
									$(this).empty();
									var table = $(
									'#contentSearchTable')
									.DataTable();
							    var data = table
									.row(
											$(
													this)
													.parents(
															'tr'))
									.data();
						    		$(this).addClass('text-default').append('<span style="color:black; font-weight: bold;">'+data.remark+'</span>');
						    		$(this).on('click', function() {
						    		
						    		   $('#scriptModal').modal('show');
						    		   $('.modal-backdrop.fade.in').css("display", "none")
						    		  	$('.modal-body #purchaseId').val(data.id);
						    		   $('.modal-body #remark').val(data.remark);
						    		  		
						    		  		 
						    
								});
						
				
					});	
				$(".dt-edit")
				.each(
						function() {
				    		$(this).addClass('text-default')
				    		.append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				    		$(this)
							.on('click',function() {
							var table = $('#contentSearchTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
									callToEdit(data.id,data.sellerId);
						});
				});
		});
}

function callToEdit(id,sellerId)
{
	if(sellerId == null){
		sellerId = '';
	}
	window.location.href = SITEBASEURL+ '/purchaseOrders/get/'+id+"?sellerId="+sellerId;
	
}