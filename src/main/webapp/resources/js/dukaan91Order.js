$(document).ready(
		function() {

			$(".treeview-menu li").removeClass("active");
			$(".treeview-menu li:nth-child(40)").addClass("active");

			var status = $("#orderState").val();

			callToSearchResults();

			$("#search").click(function() {
				callToSearchResults();
			});

			$("#orderState").change(
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
			
			
			
			var statisticsUrl = SITEBASEURL + "dukan91OpsOrder/order-count";
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
		});
	


function updateStatistics(result) {
console.log(result);
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

	if (result.orderDelivered == 0) {
		$("#codOrderCreatedToday").html(
				"COD Received : " + result.codOrderCreatedToday);
		$("#onlineOrderCreatedToday").html(
				"Online Received : " + result.onlineOrderCreatedToday);
	} else {
		$("#codOrderCreatedToday").html("Dukaan91 Orders");
	}
	
	
//	$("#groupConfirmed").html("Total : "+ result.groupConfirmed);
//	$("#groupConfirmedToday").html("Today : "+ 	result.groupConfirmedToday);
//
//	$("#groupCancelled").html("Total : "+ result.groupCancelled);
//	$("#groupCancelledToday").html("Today : "+ 	result.groupCancelledToday);
//
//	$("#inInventory").html("Total : "+ result.inInventory);
//	$("#inInventoryToday").html("Today : "+ result.inInventoryToday);
}

function callToSearchResults() {

var reportUrl = SITEBASEURL + "dukan91OpsOrder/pagelist?orderState="
				+ $("#orderState").val()+ "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();
				
	console.log("search url =" + reportUrl);
	$("#orderTable_wrapper").html("");
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
		"columnDefs": [
            { "aTargets": [10], "sClass": "hide_column"},
        ],
						"aoColumns" : [ 
							{
								"sTitle" : "#",
								"mData" : "orderIds",
								"bSortable" : false
							}, 
							
							{
	    					"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllOrderIds()'></input>",
	    					"bSortable": false,
	    					'mRender': function( url, type, full ) {
	    						return '<input type="checkbox" id="recommended_id'+full.sellerDTO.sellerId+'" name="recommended_id" class="breaking_checkbox" onclick="addOrderIdsToArray('+full.sellerDTO.sellerId+')" value="'+full.orderIds+'"  />';	  }
	    					},
						{
							"sTitle" : "Admin Name",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						}, 
						{
							"sTitle" : "Reg.Phone",
							"mData" : "sellerDTO.phone",
							"bSortable" : false
						}, 
						{
							"sTitle" : "Address",
							"mData" : "addressDTO.address",
							"bSortable" : false
						},
						{
							"sTitle" : "Address Phone",
							"mData" : "addressDTO.contactNumber",
							"bSortable" : false
						},
						{
							"sTitle" : "City",
							"mData" : "addressDTO.city",
							"bSortable" : false
						},
						{
							"sTitle" : "State",
							"mData" : "addressDTO.state",
							"bSortable" : false
						},						
						{
							"sTitle" : "Order Count",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-count-n'></a>"
						},
						{
							"sTitle" : "Manifest",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-manifest'></a>"
						},
						{
							"sTitle" : "Change Status",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-status-n'></a>"
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
						$(".dt-count-n")
						.each(
								function() {
									$(this).empty();
									var table = $('#orderSearchTable')
									.DataTable();
									var data = table.row(
											$(this).parents('tr'))
											.data();
									var orderStatus = data.orderState;
									$(this)
									.addClass(
											'text-default')
											.append(
													"<span style = 'font-weight: bolder; font-size: 20px;'>"+data.orderCount+"</span>");
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
												+ 'dukan91OpsOrder/get-order-by-state-seller/'
												+ data.sellerDTO.sellerId + "/"+  $("#orderState").val()+ "?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()
												//alert(path);
												$(
														"<form action='"
														+ path
														+ "'></form>")
														.appendTo(
														'body')
														.submit();
											});

								});

						$(".dt-manifest")
						.each(
								function() {
									$(this).empty();
									var table = $('#orderSearchTable')
									.DataTable();
									var data = table.row(
											$(this).parents('tr'))
											.data();
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
												callToManifestView(data.sellerDTO.sellerId);
											/*	var path = SITEBASEURL
												+ 'dukan91OpsOrder/manifest-list/'
												+ data.sellerDTO.sellerId + ("#orderState").val();
												$(
														"<form action='"
														+ path
														+ "'></form>")
														.appendTo(
														'body')
														.submit();*/
											});

								});
								//dt-status-n
						var count = 1;
						$(".dt-status-n").each(function() {
							$(this).empty();
							var table = $('#orderSearchTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							var nextSt = data.nextPossibleState;
							$(this).addClass('text-default').
							append("<select id='orderStateDropDown_"+ count	+ "' class='form-control' " +
									"style='width:180px' ></select>");
							$('#orderStateDropDown_' + count).empty();
							var p1 = "<option value='0'>Select</option>";
							$.each(nextSt, function(i, p) {
								p1 = p1 + "<option value='" + p	+ "'>" + p + "</option>";
							});
									
							// for changing order state in bulk
							$('#nextStateDropdown').addClass('text-next-state-page')
									.append("<select id='orderStateDropDown1_"+ count+ "' class='form-control' ></select>");
									$('#orderStateDropDown1_' + count).empty();
									$('.text-default select').html(p1);
									$('.text-next-state-page').html(p1);
									$(this).on('change',function() {
										var selectedState = $(this).find(":selected").val();
										if (selectedState != '0') {
											var table = $('#orderSearchTable').DataTable();
											var data = table.row($(this).parents('tr')).data();
											 $(".modal-body #orderStateModal").val(selectedState);
											 $(".modal-body #orderIdsUIModal").val(data.orderIds);
											 $(".modal-body #currentOrderState").val($("#orderState").val());
											 $(".modal-body #supplierRefNumberModal").val(data.supplierRefNumber);
											 $('#scriptModal').modal('show');
										} else {
											return false;
										}
									})
						});
					});
	if($("#fromDate").val()  && $("#toDate").val())
	{
	updateForDate();
	}
	
	
}

function updateForDate()
{
		var statisticsUrl = SITEBASEURL + "dukan91OpsOrder/order-count-for-date?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();;
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
			});
}

function updateStatisticsForDate(result) {
	$("#confirmedOrderforDate").html("For Date : "+ result.confirmedOrderforDate);
	$("#orderPlaceToSupplierforDate").html("For Date : "+ result.orderPlaceToSupplierforDate);
	$("#orderReceivedFromSupplierforDate").html("For Date : "+ result.orderReceivedFromSupplierforDate);
	$("#orderReadyToDispatchforDate").html("For Date : "+ result.orderReadyToDispatchforDate);
	$("#orderDispatchedforDate").html("For Date : "+ result.orderDispatchedforDate);
	$("#cancelledBySellerforDate").html("For Date : "+ result.cancelledBySellerforDate);
	$("#cancelledByUserforDate").html("For Date : "+ result.cancelledByUserforDate);
	$("#orderDeliveredforDate").html("For Date : "+ result.orderDeliveredforDate);

//	$("#groupConfirmedforDate").html("For Date : "+ result.groupConfirmedforDate);
//	$("#groupCancelledforDate").html("For Date : "+ result.groupCancelledforDate);
//	$("#inInventoryforDate").html("For Date : "+ result.inInventoryforDate);
}

function callToManifestView(id){
	window.location.href = SITEBASEURL+ 'dukan91OpsOrder/manifest-list/' +id+"?orderState=" + $("#orderState").val();
}
var orderIds = [];

function addOrderIdsToArray(id){
	if ($('#recommended_id'+id).is(':checked')) {
		orderIds.push($('#recommended_id'+id).val());
	}
	else{
		var index = orderIds.indexOf($('#recommended_id'+id).val());
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
       oTable.column(0).data()
      .each( function ( value, index ) {
    	  orderIds.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
}



function showmModalForBulkStateChange(){
	if (orderIds.length==0) { 
		alert("Select orderIds to change state");
	}else{
		var selectedState = $("#nextStateDropdown").find(":selected").val();
		$(".modal-body #orderStateModal").val(selectedState);
		$(".modal-body #orderIdsUIModal").val(orderIds);
		$(".modal-body #currentOrderState").val($("#orderState").val());
		$('#scriptModal').modal('show');
	}
}



