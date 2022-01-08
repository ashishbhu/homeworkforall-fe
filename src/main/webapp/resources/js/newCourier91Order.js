$(document).ready(function() {

	$("#promotion").removeClass("active");
	$("#mall91").addClass("active");
    $("#Courier91").addClass("active");
    $("#Courier91 li:nth-child(2)").addClass("active");
    $("#Dukaan91").removeClass("active");
    $("#Lenden91").removeClass("active");
	   $("section.content-header h1").html("New Courier91 Orders");
	   
	  callToSearchResults();
	  
});

function callToSearchResults() {
	
	var reportUrl = SITEBASEURL + "courier91OpsOrder/new-courier91-pagelist";

	console.log("search url =" + reportUrl);
	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						}, {
							"sTitle" : "Courier Name",
							"mData" : "personName",
							"bSortable" : false
						}, {
							"sTitle" : "Reg.Phone",
							"mData" : "contactNumber",
							"bSortable" : false
						}, {
							"sTitle" : "Address",
							"mData" : "address",
							"bSortable" : false
						},{
							"sTitle" : "City",
							"mData" : "city",
							"bSortable" : false
						}, {
							"sTitle" : "State",
							"mData" : "state",
							"bSortable" : false
						}, 
						{
							"sTitle" : "Status",
							"mData" : "status",
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
											$(this)
													.addClass('text-default')
													.append(
															"<span style = 'font-weight: bolder; font-size: 20px;'>"
																	+ data.orderCount
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
																		+ 'courier91OpsOrder/get-order-by-courier-provider-inventory/'
																		+ data.id;
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
														var path = SITEBASEURL+ 'courier91OpsOrder/manifest-list/'+ data.id +'/'+ false;
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

