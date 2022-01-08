$(document).ready(
		function() {

			
			$("section.content-header h1").html("Local91 Orders");
			$("#promotion").removeClass("active");
			   $("#mall91").addClass("active");
			   $("#Dukaan91").removeClass("active");
			   $("#Courier91").removeClass("active");      
			   $("#Lenden91").removeClass("active");
			   $("#Community91").removeClass("active");
			   $("#local91").addClass("active");
			   $("#local91 li:nth-child(1)").addClass("active");   

			var status = $("#orderState").val();

			callToSearchResults();

			$("#orderState").change(
					function() {
						$("#searchTerm").val("");
						callToSearchResults();
					});

			$("#search").click(
					function() {
						callToSearchResults();
					});
			$("#clearState").click(function() {

				try {
					var oTable = $('#orderTable').DataTable();
					oTable.state.clear();
				} catch (e) {
					// alert("error here");
				}
				try {
					var searchTable = $('#orderSearchTable').DataTable();
					searchTable.state.clear();
				} catch (e) {
					// alert("error here");
				}
				window.location.reload();
			});
		});


		


function callToSearchResults() {
	
var reportUrl = SITEBASEURL + "local91OpsOrder/pagelist-for-local91-orders?orderState="
				+ $("#orderState").val()+ "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&searchTerm="+$("#searchTerm").val();
				
	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,

						 "language": {
						 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
												    },
					    processing : true,
						"aoColumns" : [ 
						{
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						}, 
						{
							"sTitle" : "OrderId",
							"mData" : "orderId",
							"bSortable" : false
						},
						{
							"sTitle" : "Master OrderId",
							"bSortable" : false,
							"render": function (masterOrderId, type, row) {
						        if (row.masterOrderId != null && row.masterOrderId != '') {
						            	return row.masterOrderId;
						            }
						            else {
						            	return "";
						            }
							}
						},
						{
							"sTitle" : "Supplier",
							"mData" : "sellerFullName",
							"bSortable" : false
						},
						{
							"sTitle" : "Buyer",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						},
						{
							"sTitle" : "Phone",
							"mData" : "addressDTO.contactNumber",
							"bSortable" : false
						}
						, {
							"sTitle" : "Order Date",
							"mData" : "orderDate",
							"bSortable" : false
						}, {
							"sTitle" : "State",
							"mData" : "orderStateUI",
							"bSortable" : false
						}, {
							"sTitle" : "Payment",
							"mData" : "paymentMethodUI",
							"bSortable" : false
						}
						, {
							"sTitle" : "",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit-n'></a>"
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

	$("#orderSearchTable")
			.on(
					'draw.dt',
					function() {
						
						$(".dt-edit-n")
								.each(
										function() {
											$(this).empty();
											$(this)
													.addClass('text-default')
													.append(
															"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
											var table = $('#orderSearchTable').DataTable();
											var data = table.row($(this).parents('tr')).data();
											$(this)
													.on(
															'click',
															function() {
																var table = $(
																		'#orderSearchTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();
																callToView(data.orderId);
																
															});
										});
						$(".dt-invoice-n")
						.each(
								function() {
									$(this).empty();
									var table = $('#orderSearchTable')
											.DataTable();
									var data = table.row(
											$(this).parents('tr'))
											.data();
									// var orderStatus =
									// $("#orderState").val();
									var orderStatus = data.orderState;
									if (orderStatus != 'CO_PENDING' &&  orderStatus != 'PAYMENT_PENDING'  && 
											orderStatus != 'PAYMENT_FAILURE'  &&  orderStatus != 'PAYMENT_CANCELLED'  &&  orderStatus != 'PAYMENT_SUCCESSFUL' && orderStatus != 'CONFIRMED'
										) {
										$(this)
												.addClass(
														'text-default')
												.append(
														"<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>");
										$(this).unbind().on(
														'click',
														function() {
															var table = $(
																	'#orderSearchTable')
																	.DataTable();
															var data = table
																	.row(
																			$(
																					this)
																					.parents(
																							'tr'))
																	.data();
															var path = SITEBASEURL
																	+ 'mall91OpsOrder/invoice/'
																	+ data.orderId;
															$(
																	"<form target='_blank' action='"
																			+ path
																			+ "'></form>")
																	.appendTo(
																			'body')
																	.submit();
														});
									} else {
										$(this)
												.addClass(
														'text-default')
												.append(
														"<span>-</span>");
									}
								});
						$(".dt-receipt-n")
								.each(
										function() {
											$(this).empty();
											var table = $('#orderSearchTable')
													.DataTable();
											var data = table.row(
													$(this).parents('tr'))
													.data();
											// var orderStatus =
											// $("#orderState").val();
											var orderStatus = data.orderState;
											if (orderStatus != 'CO_PENDING' &&  orderStatus != 'PAYMENT_PENDING'  && 
													orderStatus != 'PAYMENT_FAILURE'  &&  orderStatus != 'PAYMENT_CANCELLED'  &&  orderStatus != 'PAYMENT_SUCCESSFUL' && orderStatus != 'CONFIRMED'
														) {
												$(this)
														.addClass(
																'text-default')
														.append(
																"<span class='glyphicon glyphicon-paperclip' aria-hidden='true'></span>");
												$(this).unbind().on(
																'click',
																function() {
																	var table = $(
																			'#orderSearchTable')
																			.DataTable();
																	var data = table
																			.row(
																					$(
																							this)
																							.parents(
																									'tr'))
																			.data();
																	var path = SITEBASEURL
																			+ 'mall91OpsOrder/receipt/'
																			+ data.orderId;
																	$(
																			"<form target='_blank' action='"
																					+ path
																					+ "'></form>")
																			.appendTo(
																					'body')
																			.submit();
																});
											} else {
												$(this)
														.addClass(
																'text-default')
														.append(
																"<span>-</span>");
											}
										});
						
						
					});
}


function callToView(orderId){
	window.location.href = SITEBASEURL + 'local91OpsOrder/get/'+orderId+"?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+ "&searchTerm="+$("#searchTerm").val();
}