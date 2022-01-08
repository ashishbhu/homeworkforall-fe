$(document).ready(function() {
	
	$("#search").click(function(){
		  callToSearchResults();
	});
	
	callToSearchResults();
});

function callToSearchResults() {

	var reportUrl = SITEBASEURL + "courier91OpsOrder/pickList-pagelist?startDate=" +$("#fromDate").val() +"&endDate="+ $("#toDate").val()+"&searchTerm="+ $("#searchTerm").val();
	console.log("search url =" + reportUrl);
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
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						}, {
							"sTitle" : "Courier Name",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						}, {
							"sTitle" : "Reg.Phone",
							"mData" : "addressDTO.contactNumber",
							"bSortable" : false
						}, {
							"sTitle" : "Address",
							"mData" : "addressDTO.address",
							"bSortable" : false
						},{
							"sTitle" : "CourierPartner",
							//"mData" : "courierPartner",
							"bSortable" : false,
							"render": function (courierPartner, type, row) {
						        if (row.courierPartner == null) {
						            return "";
						         }
						         else {
						            return row.courierPartner;
						      }
							}
						}, {
							"sTitle" : "Identifier",
							"mData" : "identifier",
							"bSortable" : false
						}, {
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
							"sTitle" : "Invoice",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-invoice'></a>"
						},
						{
							"sTitle" : "Download",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-download-pickList'></a>"
						},
						{
							"sTitle" : "Fullfillment",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-order-fullfillment'></a>"
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
																		+ 'courier91OpsOrder/manifest-receipt-by-identifier-c91/'
																		+ data.identifier;
																$(
																		"<form action='"
																				+ path
																				+ "' target = '_blank'></form>")
																		.appendTo(
																				'body')
																		.submit();
															});

										});
				
				$(".dt-count-n")
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
											"<span style = 'font-weight: bolder; font-size: 20px;'>"
													+ data.noOfOrders
													+ "</span>");
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
														+ 'courier91OpsOrder/get-manifest-orders/' +data.id;
												$(
														"<form action='"
																+ path
																+ "'></form>")
														.appendTo(
																'body')
														.submit();
											});

						});
				
				$(".dt-invoice")
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
														+ 'courier91OpsOrder/manifest-invoice-by-identifier-c91/'
														+ data.identifier;
												$(
														"<form action='"
																+ path
																+ "' target = '_blank'></form>")
														.appendTo(
																'body')
														.submit();
											});

						});
				
				$(".dt-download-pickList")
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
									"<button style='background:#008CBA; color:white; border: none;padding: 7px 18px;'>PickList</button>");
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
														+ 'courier91OpsOrder/download-manifest-picklist/'+data.id;
												$(
														"<form action='"
																+ path
																+ "' target = '_blank'></form>")
														.appendTo(
																'body')
														.submit();
											});

						});
				
				$(".dt-order-fullfillment")
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
									"<button style='background:#008CBA; color:white; border: none;padding: 7px 18px;'>Fullfillment</button>");
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
												callToOrderFullfillment(data.identifier);
												//var path = SITEBASEURL
														//+ 'mall91OpsOrder/orderBySticker?identifier='+data.identifier;
												/*$(
														"<form action='"
																+ path
																+ "' target = '_blank'></form>")
														.appendTo(
																'body')
														.submit();*/
											});

						});
				
			});

}
function callToOrderFullfillment(identifier){
	window.open(SITEBASEURL + "mall91OpsOrder/orderBySticker?stickerNumber=&identifier="+identifier, '_blank');
}




