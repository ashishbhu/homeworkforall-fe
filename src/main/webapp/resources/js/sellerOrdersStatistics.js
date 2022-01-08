$(document).ready(
		function() {
			callToSearchResults();
			callForResult();

				$("#search").click(function() {
						callToSearchResults();
						callForResult();
					});
				
				$("#orderState").change(function() {
					callForResult();
				});
		});

function updateStatistics(result) {
	 $("#orderPlaceToSupplierforDate").html("Total: "+result.orderPlaceToSupplierforDate);
     $("#orderReceivedFromSupplierforDate").html("Total: "+result.orderReceivedFromSupplierforDate);
     
     $("#orderReadyToDispatchforDate").html("Total: "+result.orderReadyToDispatchforDate);
     $("#orderDispatchedforDate").html("Total: "+result.orderDispatchedforDate);
}

function callToSearchResults() {
    var statisticsUrl = SITEBASEURL + "money91Statistics/order-statistics-report?fromWalletDate=" + $("#fromWalletDate").val() + "&toWalletDate=" + $("#toWalletDate").val()+ "&itemId="+$("#itemId").val();
    var requestMethodType = "GET";

    $.ajax({
        url: statisticsUrl,
        type: requestMethodType,
        contentType: "application/json",
        dataType: "json",
        	beforeSend: function(){
			    $("#loader").show();
			   },
        success: updateStatistics,
		complete:function(data){
		    $("#loader").hide();
		   },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function callForResult(){
	var reportUrl = SITEBASEURL + "sellerOrders/pagelist?orderState="+ $("#orderState").val()+ "&fromDate="+ $("#fromWalletDate").val() + "&toDate=" +$("#toWalletDate").val()+ "&itemId="+ $("#itemId").val();
	callToResults(reportUrl);
}

function callToResults(reportUrl) {
	console.log("search url =" + reportUrl);
	$("#orderTable_wrapper").html("");
	$("#loader").hide();
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
							"sTitle" : "Order Id",
							"mData" : "orderId",
							"bSortable" : false
						},
						{
							"sTitle" : "Buyer",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						}, {
							"sTitle" : "Order Date",
							"mData" : "orderDate",
							"bSortable" : false
						}, {
							"sTitle" : "Order State",
							"mData" : "orderStateUI",
							"bSortable" : false
						}, {
							"sTitle" : "Payment",
							"mData" : "paymentMethodUI",
							"bSortable" : false
						}
						/*, {
							"sTitle" : "",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit-n'></a>"
						},
						{
							"sTitle" : "Invoice",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-invoice-n'></a>"
						}*/
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

	/*$("#orderSearchTable")
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
												var path = SITEBASEURL
												+ 'sellerOrders/get/'
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
									var orderStatus = data.orderState;
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
												+ 'sellerOrders/invoice/'
												+ data.orderId;
												$(
														"<form target='_blank' action='"
														+ path
														+ "'></form>")
														.appendTo(
														'body')
														.submit();
											});
								});
					});*/
}

