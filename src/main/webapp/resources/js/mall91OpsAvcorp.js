$(document).ready(
		function() {
			

			var status = $("#orderState").val();
			
			callToSearchResults();

				$("#search").click(function() {
						callToSearchResults();
					});
				
				$("#searchBySticker").click(function() {
					if($("#stickerNumber").val() == ''){
						alert("Enter Sticker Number");
						return;
					}
					
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

			var statisticsUrl = SITEBASEURL + "mall91OpsOrder/order-count";
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
						$("#reportWrapper").html(r.message).addClass("error");
					} else {
						$("#reportWrapper").html(jqXHR.statusText).addClass(
								"error");
					}

				}
			});
			

					$("#downloadReceipt").click(function() {
						if (orderIds != null && orderIds != '') {
							window.open(SITEBASEURL + 'mall91OpsOrder/bulk-receipt/'+ orderIds+'/true', '_blank');
						} else {
							alert("Select checkbox!");
						}
					});

					$("#downloadInvoice").click(function() {
						if (orderIds != null && orderIds != '') {
							window.open(SITEBASEURL + 'mall91OpsOrder/bulk-receipt/'+ orderIds+'/false', '_blank');
						} else {
							alert("Select checkbox!");
						}
				  });

					$("#exportReport").click(function(){
						callToExportResults();
					});
					

		});

function updateStatistics(result) {
	$("#confirmedOrder").html("Total : "+ result.confirmedOrder);
	$("#confirmedOrderToday").html("Today Modified: "+ 	result.confirmedOrderToday);
	$("#orderPlaceToSupplier").html("Total : "+ result.orderPlaceToSupplier);
	$("#orderPlaceToSupplierToday").html("Today : "+result.orderPlaceToSupplierToday);
	$("#orderReceivedFromSupplier").html("Total : "+ result.orderReceivedFromSupplier);
	$("#orderReceivedFromSupplierToday").html("Today : "+result.orderReceivedFromSupplierToday);
	$("#orderReadyToDispatch").html("Total : "+ result.orderReadyToDispatch);
	$("#orderReadyToDispatchToday").html("Today : "+result.orderReadyToDispatchToday);
	$("#orderDispatched").html("Total : "+ result.orderDispatched);
	$("#orderDispatchedToday").html("Today : "+result.orderDispatchedToday)
	$("#cancelledBySeller").html("Total : "+ result.cancelledBySeller);
	$("#cancelledBySellerToday").html("Today : "+	result.cancelledBySellerToday);
	$("#cancelledByUser").html("Total : "+ result.cancelledByUser);
	$("#cancelledByUserToday").html("Today : "+result.cancelledByUserToday);
	$("#orderDelivered").html("Total : "+ result.orderDelivered);
	$("#orderDeliveredToday").html("Today : "+result.orderDeliveredToday);

    if(result.orderDelivered == 0)
    {
    $("#codOrderCreatedToday").html("Mall91 Ops Orders");
	}
	else{
	$("#codOrderCreatedToday").html("COD Received : "+ 	result.codOrderCreatedToday);
	$("#onlineOrderCreatedToday").html("Online Received : "+ 	result.onlineOrderCreatedToday);
	}

	$("#groupConfirmed").html("Total : "+ result.groupConfirmed);
	$("#groupConfirmedToday").html("Today : "+ 	result.groupConfirmedToday);

	$("#groupCancelled").html("Total : "+ result.groupCancelled);
	$("#groupCancelledToday").html("Today : "+ 	result.groupCancelledToday);

	$("#inInventory").html("Total : "+ result.inInventory);
	$("#inInventoryToday").html("Today : "+ result.inInventoryToday);
}


var orderIds = [];

function addOrderIdsToArray(id){

if ($('#recommended_id'+id).is(':checked')) {
		orderIds.push(id);
	}
	else{
		var index = orderIds.indexOf(id);
		if (index > -1) {
			orderIds.splice(index, 1);
		}
	}
}

function addAllOrderIds(){
	orderIds = [];
	var oTable = $("#orderSearchTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(2).data()
      .each( function ( value, index ) {
           orderIds.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
}


		function showmModalForBulkStateChange(){
	
		 var selectedState = $("#nextStateDropdown").find(":selected").val();
					$(
						".modal-body #orderStateModal")
						.val(
								selectedState);
						$(
						".modal-body #orderIdsUIModal")
						.val(
								orderIds);
						$(
						'#scriptModal')
						.modal(
						'show');
}



	function updateForDate()
	{
		/*alert("here");
			var statisticsUrl = SITEBASEURL + "mall91OpsOrder/order-count-for-date?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();;
				var requestMethodType = "GET";
				$.ajax({
					url : statisticsUrl,
					type : requestMethodType,
					contentType : "application/json",
					dataType : "json",
					success : updateStatisticsForDate,
					error : function(jqXHR, textStatus, errorThrown) {
						if (jqXHR.responseText !== '') {
							var r = jQuery.parseJSON(jqXHR.responseText);
							$("#reportWrapper").html(r.message).addClass("error");
						} else {
							$("#reportWrapper").html(jqXHR.statusText).addClass(
									"error");
						}

					}
				});*/
	}

	/*function updateStatisticsForDate(result) {
		$("#confirmedOrderforDate").html("For Date : "+ result.confirmedOrderforDate);
		$("#orderPlaceToSupplierforDate").html("For Date : "+ result.orderPlaceToSupplierforDate);
		$("#orderReceivedFromSupplierforDate").html("For Date : "+ result.orderReceivedFromSupplierforDate);
		$("#orderReadyToDispatchforDate").html("For Date : "+ result.orderReadyToDispatchforDate);
		$("#orderDispatchedforDate").html("For Date : "+ result.orderDispatchedforDate);
		$("#cancelledBySellerforDate").html("For Date : "+ result.cancelledBySellerforDate);
		$("#cancelledByUserforDate").html("For Date : "+ result.cancelledByUserforDate);
		$("#orderDeliveredforDate").html("For Date : "+ result.orderDeliveredforDate);

		$("#groupConfirmedforDate").html("For Date : "+ result.groupConfirmedforDate);
		$("#groupCancelledforDate").html("For Date : "+ result.groupCancelledforDate);
		$("#inInventoryforDate").html("For Date : "+ result.inInventoryforDate);
}
*/



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

if($("#fromDate").val()  && $("#toDate").val())
{
updateForDate();
}

	
var reportUrl = SITEBASEURL + "mall91OpsOrder/pagelist?orderState="
				+ $("#orderState").val()+ "&orderSupplier="+$("#orderSupplier").val() + "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()
				+"&stickerNumber=" +$("#stickerNumber").val()+"&itemId=" +$("#itemId").val();
	//console.log("search url =" + reportUrl);
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
						"scrollX": true,
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
						
						/*{
    					"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllOrderIds()'></input>",
    					"bSortable": false,
    					'mRender': function( url, type, full ) {
    					return '<input type="checkbox" id="recommended_id'+full.orderId+'" name="recommended_id" class="breaking_checkbox" onclick="addOrderIdsToArray('+full.orderId+')" value="'+full.orderId+'"  />';	  }
    					},
						*/
						{
							"sTitle" : "ID",
							"mData" : "orderId",
							"bSortable" : false
						},
						{
							"sTitle" : "Supplier",
							"mData" : "supplierName",
							"bSortable" : false
						},
						 {
							"sTitle" : "Order Date",
							"mData" : "orderDate",
							"bSortable" : false
						}, {
							"sTitle" : "State",
							"mData" : "orderStateUI",
							"bSortable" : false
						}
						, {
							"sTitle" : "C.Partner",
							"mData" : "courierPartnerUI",
							"bSortable" : false
						}
						, {
							"sTitle" : "App Name",
							"bSortable" : false,
							"render": function (applicationSource, type, row) {
						        if (row.applicationSource == 'B2B') {
						            	return "B2B";
						            }
						            else {
						            	return 'Mall91';
						            }
							}
						}
						, {
							"sTitle" : "ItemId",
							"mData" : "subOrderDTOList[0].itemId",
							"bSortable" : false
						}
						, {
							"sTitle" : "Item Name",
							"mData" : "subOrderDTOList[0].itemName",
							"bSortable" : false,
							"width": "150px", "targets": 9
						},
						 {
							"sTitle" : "SKU_ID",
							"mData" : "subOrderDTOList[0].skuId",
							"bSortable" : false
						}
						, {
							"sTitle" : "Attribute",
							"mData" : "subOrderDTOList[0].itemAttributeDetail",
							"bSortable" : false
						},
						 {
							"sTitle" : "Quantity",
							"mData" : "subOrderDTOList[0].orderedQuantity",
							"bSortable" : false
						}
						, {
							"sTitle" : "",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit-n'></a>"
						}, /*{
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
							"sTitle" : "Basic Receipt",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-basic-receipt-n'></a>"
						},*/
						{
							"sTitle" : "Track",
							"mData" : "trackingLinkUI",
							"bSortable" : false
						}
						],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							
							$('#orderSearchTable_filter input').unbind();
							$('#orderSearchTable_filter input').bind('keyup', function(e) {
							var filterData = $('#orderSearchTable_filter input').val();
							if(filterData.length == 0 || filterData.length >= 4 || e.keyCode == 13) {
								table.fnFilter(this.value);
							}
							});
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
											.unbind()
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
													/*	var path = SITEBASEURL
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
										
										
										$(".dt-basic-receipt-n")
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
															+ 'mall91OpsOrder/basic-receipt/'
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
											
											// for changing order state in bulk
											$('#nextStateDropdown').addClass('text-next-state-page')
													.append(
															"<select id='orderStateDropDown1_"
																	+ count
																	+ "' class='form-control' ></select>");
											$('#orderStateDropDown1_' + count).empty();
											
											$('.text-default select').html(p1);
											$('.text-next-state-page').html(p1);

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
						
						
						/*$(".dt-track-n")
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
									var trackingLink = data.trackingLink;
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
									}
									else if(trackingLink != null)
									{

										$(this)
										.addClass(
										'text-default')
										.append(trackingLink);
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
													$("a href ='"
															+ trackingLink
															+ "'></a>")
															.appendTo(
															'body')
															.submit();
												});

									}
									else {
										$(this)
												.addClass(
														'text-default')
												.append(
														"<span>-</span>");
									}
								});*/
					});
}
function callToView(orderId){
	window.location.href = SITEBASEURL + 'mall91OpsOrder/get/'+orderId+ '?orderSupplier='+$("#orderSupplier").val();
	
}

function callToExportResults() {
	
	window.location.href = SITEBASEURL + "mall91Order/download?orderSupplier="+ $("#orderSupplier").val() + "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&orderState="+ $("#orderState").val();

}