$(document).ready(
		function() {

			
			$("section.content-header h1").html("Mall91 Alert OpsOrders");
			 $("#promotion").removeClass("active");
             $("#mall91").addClass("active");
             $("#mall91 li:nth-child(2)").addClass("active");
             $("#Courier91").removeClass("active");
             $("#Dukaan91").removeClass("active");
             $("#Lenden91").removeClass("active");

			var status = $("#orderState").val();

			callToSearchResults();

			$("#orderState").change(
					function() {
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

var orderIds = [];

function addOrderIdsToArray(id){
	orderIds.push(id);
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
				+ $("#orderState").val()+ "&orderSupplier="+$("#orderSupplier").val() + "&forAlerts=true";
				
	//console.log("search url =" + reportUrl);
	$("#orderTable_wrapper").html("");
	// var reportUrl = SITEBASEURL + "content/contentListing" ;
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
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
    					"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllOrderIds()'></input>",
    					"bSortable": false,
    					'mRender': function( url, type, full ) {
    					return '<input type="checkbox" id="recommended_id'+full.orderId+'" name="recommended_id" class="breaking_checkbox" onclick="addOrderIdsToArray('+full.orderId+')" value="'+full.orderId+'"  />';	  }
    					},
						
						{
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
						}
						, {
							"sTitle" : "C.Partner",
							"mData" : "courierPartnerUI",
							"bSortable" : false
						}, {
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
						$("#countByOrderStatusFor5DaysDelay").html("0");
						$("#countByOrderStatusFor10DaysDelay").html("0");
						$("#countByOrderStatusFor15DaysDelay").html("0");
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
											if (!(typeof data.countByOrderStatusFor5DaysDelay === "undefined")) {
												$("#countByOrderStatusFor5DaysDelay").html(data.countByOrderStatusFor5DaysDelay);
											}
											
											if (!(typeof data.countByOrderStatusFor10DaysDelay === "undefined")) {
												$("#countByOrderStatusFor10DaysDelay").html(data.countByOrderStatusFor10DaysDelay);
											}
											
											if (!(typeof data.countByOrderStatusFor15DaysDelay === "undefined")) {
												$("#countByOrderStatusFor15DaysDelay").html(data.countByOrderStatusFor15DaysDelay);
											}
											
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
																var path = SITEBASEURL
																		+ 'mall91OpsOrder/get/'
																		+ data.orderId;
																$(
																		"<form action='"
																				+ path
																				+ "'></form>")
																		.appendTo(
																				'body')
																		.submit();
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
						
					});
}