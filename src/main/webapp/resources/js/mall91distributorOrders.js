$(document).ready(
		function() {

			var status = $("#orderState").val();
			callToSearchResults();

			$("#orderState").change(function() {
				callToSearchResults();
			});
			$("#search").click(function() {
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

			$("#downloadReceipt").click(
					function() {
						if (orderIds != null && orderIds != '') {
							window.open(SITEBASEURL
									+ 'mall91OpsOrder/distributor/bulk-receipt/' + orderIds
									+ '/true', '_blank');
						} else {
							alert("Select checkbox!");
						}
					});

			$("#downloadInvoice").click(
					function() {
						if (orderIds != null && orderIds != '') {
							window.open(SITEBASEURL
									+ 'mall91OpsOrder/distributor/bulk-receipt/' + orderIds
									+ '/false', '_blank');
						} else {
							alert("Select checkbox!");
						}
					});
		});

var orderIds = [];

function addOrderIdsToArray(id) {

	if ($('#recommended_id' + id).is(':checked')) {
		orderIds.push(id);
	} else {
		var index = orderIds.indexOf(id);
		if (index > -1) {
			orderIds.splice(index, 1);
		}
	}
}

function addAllOrderIds() {
	orderIds = [];
	var oTable = $("#orderSearchTable").DataTable();
	if ($('#selectAll').is(':checked')) {
		$("input:checkbox").prop("checked", true);
		oTable.column(2).data().each(function(value, index) {
			orderIds.push(value);
		});
	} else {
		$("input:checkbox").prop("checked", false);
	}
}

function callToSearchResults() {

	var reportUrl = SITEBASEURL + "mall91OpsOrder/distributor-order-pagelist?orderState="+ $("#orderState").val()+"&itemId=" +$("#itemId").val()
	+ "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();
	$("#orderTable_wrapper").html("");
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

						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								},

								/*{
									"sTitle" : "<input type='checkbox' id='selectAll' onchange='addAllOrderIds()'></input>",
									"bSortable" : false,
									'mRender' : function(url, type, full) {
										return '<input type="checkbox" id="recommended_id'
												+ full.orderId
												+ '" name="recommended_id" class="breaking_checkbox" onclick="addOrderIdsToArray('
												+ full.orderId
												+ ')" value="'
												+ full.orderId + '"  />';
									}
								},*/

								{
									"sTitle" : "Lmall-OrderId",
									//"mData" : "referenceOrderId",
									"bSortable" : false,
									"render": function (referenceOrderId, type, row) {
							        if (row.referenceOrderId != null && row.referenceOrderId != '') {
							            	return row.referenceOrderId;
							            }
							            else {
							            	return "-";
							            }
                                  }
								},
								{
									"sTitle" : "Lmall-SuborderId",
									//"mData" : "referenceSubOrderId",
									"bSortable" : false,
									"render": function (referenceSubOrderId, type, row) {
							        if (row.referenceSubOrderId != null && row.referenceSubOrderId != '') {
							            	return row.referenceSubOrderId;
							            }
							            else {
							            	return "-";
							            }
							}
								},
								{
									"sTitle" : "Order Date",
									"mData" : "orderDate",
									"bSortable" : false
								},
								{
									"sTitle" : "State",
									"mData" : "orderStateUI",
									"bSortable" : false
								},
								
								{
									"sTitle" : "Buyer",
									"mData" : "addressDTO.personName",
									"bSortable" : false
								},
								
								{
									"sTitle" : "ContactNumber",
									"mData" : "addressDTO.contactNumber",
									"bSortable" : false
								},
								{
									"sTitle" : "ItemId",
									"mData" : "subOrderDTOList[0].itemId",
									"bSortable" : false
								},
								{
									"sTitle" : "Item Name",
									"mData" : "subOrderDTOList[0].itemName",
									"bSortable" : false,
									"width" : "150px",
									"targets" : 9
								},
								{
									"sTitle" : "Attribute",
									"mData" : "subOrderDTOList[0].itemAttributeDetail",
									"bSortable" : false
								},
								{
									"sTitle" : "Quantity",
									"mData" : "subOrderDTOList[0].orderedQuantity",
									"bSortable" : false
								},
								/*{
									"sTitle" : "",
									"bSortable" : false,
									"sDefaultContent" : "<a class='dt-edit-n'></a>"
								},*/
								{
									"sTitle" : "Receipt",
									"bSortable" : false,
									"sDefaultContent" : "<a class='dt-receipt-n'></a>"
								},
								{
									"sTitle" : "Invoice",
									"bSortable" : false,
									"sDefaultContent" : "<a class='dt-invoice-n'></a>"
								}/*,
								{
									"sTitle" : "Basic Receipt",
									"bSortable" : false,
									"sDefaultContent" : "<a class='dt-basic-receipt-n'></a>"
								} */],
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
																callEdit(data.orderId);
																/*
																 * var path =
																 * SITEBASEURL +
																 * 'mall91OpsOrder/get/' +
																 * data.orderId; $( "<form
																 * action='" +
																 * path + "'></form>")
																 * .appendTo(
																 * 'body')
																 * .submit();
																 */
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
											if (orderStatus != 'CO_PENDING'
													&& orderStatus != 'PAYMENT_PENDING'
													&& orderStatus != 'PAYMENT_FAILURE'
													&& orderStatus != 'PAYMENT_CANCELLED'
													&& orderStatus != 'PAYMENT_SUCCESSFUL'
													&& orderStatus != 'CONFIRMED') {
												$(this)
														.addClass(
																'text-default')
														.append(
																"<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>");
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
																	var path = SITEBASEURL
																			+ 'mall91OpsOrder/distributor/invoice/'
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
											if (orderStatus != 'CO_PENDING'
													&& orderStatus != 'PAYMENT_PENDING'
													&& orderStatus != 'PAYMENT_FAILURE'
													&& orderStatus != 'PAYMENT_CANCELLED'
													&& orderStatus != 'PAYMENT_SUCCESSFUL'
													&& orderStatus != 'CONFIRMED') {
												$(this)
														.addClass(
																'text-default')
														.append(
																"<span class='glyphicon glyphicon-paperclip' aria-hidden='true'></span>");
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
																	var path = SITEBASEURL
																			+ 'mall91OpsOrder/distributor/receipt/'
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
											var orderStatus = data.orderState;
											if (orderStatus != 'CO_PENDING'
													&& orderStatus != 'PAYMENT_PENDING'
													&& orderStatus != 'PAYMENT_FAILURE'
													&& orderStatus != 'PAYMENT_CANCELLED'
													&& orderStatus != 'PAYMENT_SUCCESSFUL'
													&& orderStatus != 'CONFIRMED') {
												$(this)
														.addClass(
																'text-default')
														.append(
																"<span class='glyphicon glyphicon-paperclip' aria-hidden='true'></span>");
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
																	var path = SITEBASEURL
																			+ 'mall91OpsOrder/distributor/basic-receipt/'
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
function callEdit(id) {

	window.location.href = SITEBASEURL + 'mall91OpsOrder/get/' + id
			+ '?courierPartner=' + $("#courierPartner").val() + "&isPickup="
			+ $("#isPickup").val() + "&orderState=" + $("#orderState").val();
	;

}
