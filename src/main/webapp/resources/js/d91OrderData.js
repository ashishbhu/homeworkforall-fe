$(document).ready(
		function() {

			$(".treeview-menu li").removeClass("active");
			$(".treeview-menu li:nth-child(37)").addClass("active");

			var status = $("#orderState").val();
			
			callToSearchResults();

				$("#search").click(function() {
						callToSearchResults();
					});

			$("#orderState").change(
					function() {
						/*
						 * try { var oTable = $('#orderTable').DataTable();
						 * oTable.state.clear(); } catch (e) { // alert("error
						 * here"); } try { var searchTable =
						 * $('#orderSearchTable') .DataTable();
						 * searchTable.state.clear(); } catch (e) { //
						 * alert("error here"); }
						 */
						
						callToSearchResults();
					});
			$("#orderSupplier").change(
				function () {
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


function updateOrderState(orderId, nextOrderState) {
	$.ajax({
		url : SITEBASEURL + 'mall91OpsOrder/change-state/' + orderId + '/'
				+ nextOrderState,
		type : "GET",
		contentType : "application/json",
		success : function(data) {
			$("#mes_div").text("Order State updated successfully");
			var $mes_div = $("#mes_div");
			$mes_div.show();
			setTimeout(function() {
				$mes_div.hide();
			}, 10000);
		},
		error : function(request, status, error) {
			$("#mes_div").text(
					"Something went wrong while updating order state");
			var $mes_div = $("#mes_div");
			$mes_div.show();
			setTimeout(function() {
				$mes_div.hide();
			}, 10000);
		}
	});
}

function callToSearchResults() {

var reportUrl = SITEBASEURL + "mall91OpsOrder/pagelist?orderState="
				+ $("#orderState").val()+ "&orderSupplier="+$("#orderSupplier").val() + "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&applicationSource=Dukaan91";
				
    		
	console.log("search url =" + reportUrl);
	$("#orderTable_wrapper").html("");
	// var reportUrl = SITEBASEURL + "content/contentListing" ;
	var table = $('#orderSearchTable')
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
						}, {
							"sTitle" : "ID",
							"mData" : "orderId",
							"bSortable" : false
						},
						{
							"sTitle" : "S.R.No",
							"mData" : "supplierRefNumberUI",
							"bSortable" : false
						},
						{
							"sTitle" : "Supplier",
							"mData" : "supplierName",
							"bSortable" : false
						},
						
						/*{
							"sTitle" : "Price",
							"mData" : "totalPaidAmount",
							"bSortable" : false
						}, */{
							"sTitle" : "Buyer",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						}, {
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
						}, {
							"sTitle" : "Quantity",
							"mData" : "subOrderDTOList[0].orderedQuantity",
							"bSortable" : false
						}
						, {
							"sTitle" : "",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit-n'></a>"
						}, {
							"sTitle" : "Change Status",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-status-n'></a>"
						}, {
							"sTitle" : "Receipt",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-receipt-n'></a>"
						},
						{
							"sTitle" : "Invoice",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-invoice-n'></a>"
						},
						{
							"sTitle" : "Track",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-track-n'></a>"
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
																callToD91View(data.orderId);
																/*var path = SITEBASEURL
																		+ 'mall91OpsOrder/get/'
																		+ data.orderId;
																$(
																		"<form action='"
																				+ path
																				+ "'></form>")
																		.appendTo(
																				'body')
																		.submit();*/
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
						var count = 1;
						$(".dt-status-n")
								.each(
										function() {
											$(this).empty();
											var table = $('#orderSearchTable')
													.DataTable();
											
											var data = table.row(
													$(this).parents('tr'))
													.data();
											
											
											
											var nextSt = data.nextPossibleState;
											$(this)
													.addClass('text-default')
													.append(
															"<select id='orderStateDropDown_"
																	+ count
																	+ "' class='form-control' ></select>");
											$('#orderStateDropDown_' + count)
													.empty();
											var p1 = "<option value='0'>Select</option>";
											
											
											$.each(nextSt, function(i, p) {
												//				$('#orderStateDropDown_'+count).append($('<option></option>').val(p).html(p));
												p1 = p1 + "<option value='" + p
														+ "'>" + p
														+ "</option>";
											});

											$('.text-default select').html(p1);

											$(this)
													.on(
															'change',
															function() {

																var selectedState = $(
																		this)
																		.find(
																				":selected")
																		.val();

																//if (selectedState != '0' && confirm("are you sure you want to change order status to "+selectedState +" ?" )) {

																if (selectedState != '0') {
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
																	//alert(data.addressDTO.contactNumber);
																	/*var path = SITEBASEURL + 'mall91OpsOrder/change-state/' + data.orderId + '/'+ selectedState;
																	//$("<form action='" + path + "'></form>").appendTo('body').submit();*/
																	//updateOrderState(data.orderId, selectedState);
																	$(
																	".modal-body #orderStateModal")
																	.val(
																			selectedState);
																	$(
																	".modal-body #orderIdModal")
																	.val(
																			data.orderId);
																	$(
																	".modal-body #supplierRefNumberModal")
																	.val(
																			data.supplierRefNumber);
																	
																	$(
																	'#scriptModal')
																	.modal(
																	'show');
																	
																	
																	
																	//$(this).parents('tr').css('background', '#FFA07A');
																	//$(this).find('span.btn.btn-custom').text(showText).css('background', '#FFA07A');;
																} else {
																	return false;
																}
															})
										});
						
						
						
						
						
						$(".dt-track-n")
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
									var supplierName = data.supplierName;
									var orderStatus = data.orderState;
									if (supplierName == 'SHOPPO' && orderStatus == 'ORDER_PLACED_TO_SUPPLIER') {
										$(this)
												.addClass(
														'text-default')
												.append(
														"<span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>");
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
																	+ 'mall91OpsOrder/getTrackingDetails/'
																	+ data.shoppoTrackingNumber +"/"+ data.orderId;
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
function callToD91View(id){
	 window.location.href = SITEBASEURL+ 'mall91OpsOrder/get/'+ id+ "?orderState="+$("#orderState").val()+"&orderSupplier="+$("#orderSupplier").val()+"&forDukan91="+ true;
}



