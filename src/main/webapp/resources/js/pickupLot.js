$(document).ready(function() {
	
	$("#search").click(function(){
		  callToSearchResults();
	});
	
	callToSearchResults();
});

function callToSearchResults() {

	var reportUrl = SITEBASEURL + "pickupLot/page-list?searchTerm="+ $("#searchTerm").val();
	console.log("search url =" + reportUrl);
	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"sAjaxSource" : reportUrl,
						 "language": {
							 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
						    },
						processing : true,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "displayId",
							"bSortable" : false
						}, {
							"sTitle" : "Name",
							"mData" : "sellerDTO.fullName",
							"bSortable" : false
						}, {
							"sTitle" : "Reg.Phone",
							"mData" : "sellerDTO.phone",
							"bSortable" : false
						}, {
							"sTitle" : "Status",
							"bSortable" : false,
							"render": function (pickupLotStatus, type, row) {
						        if (row.pickupLotStatus != null) {
						            	return row.pickupLotStatus;
						            }
						            else {
						            	return '-';
						            }
							}
						},{
							"sTitle" : "Create Date",
							"mData" : "lotCreationDate",
							"bSortable" : false,
						}, {
							"sTitle" : "Identifier",
							"mData" : "identifier",
							"bSortable" : false
						}, {
							"sTitle" : "Order Count",
							"mData" : "noOfOrders",
							"bSortable" : false,
							
							//"sDefaultContent" : "<a class='dt-count-n'></a>"
						},
 						{
							"sTitle" : "Manifest",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-manifest'></a>"
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
																+ 'pickupLot/receipt/'
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
												+ 'dukan91OpsOrder/get-manifest-orders/' +data.id;
												
												$(
														"<form action='"
																+ path
																+ "'></form>")
														.appendTo(
																'body')
														.submit();
											});

						});
			});

}

