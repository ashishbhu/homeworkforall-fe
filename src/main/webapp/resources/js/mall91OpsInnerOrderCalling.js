$(document).ready(
		function() {
			$("#promotion").removeClass("active");
			$("#mall91").addClass("active");
			$("#mall91 li:nth-child(3)").addClass("active");
			$("#Courier91").removeClass("active");
			$("#Dukaan91").removeClass("active");
			$("#Lenden91").removeClass("active");

			var status = $("#orderState").val();

			callToSearchResults();

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
function callToSearchResultsButton() {
	
	window.location.href = SITEBASEURL + 'mall91OpsOrder/assign-order-for-calling';
	
}

function callToSearchResults() {

	var reportUrl = SITEBASEURL + "mall91OpsOrder/calling-inner-pagelist";
	alert(reportUrl);
	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
	.dataTable(
			{
				"destroy" : true,
				"bProcessing" : true,
				"bServerSide" : true,
				"ordering" : true,
				"bSearchable" : false,
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
				            	   "sTitle" : "User",
				            	   "mData" : "userDetails",
				            	   "bSortable" : false
				               },
				               /*
				               , {
				            	   "sTitle" : "Attribute",
				            	   "mData" : "subOrderDTOList[0].itemAttributeDetail",
				            	   "bSortable" : false,
				            	   "width": "150px", "targets": 11
				               },*/
				               {
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

