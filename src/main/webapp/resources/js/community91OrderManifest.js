$(document).ready(function() {

	var reportUrl = SITEBASEURL + "community91OpsOrder/list";
	
	   $("section.content-header h1").html("Community91 Manifests");
	    $('<a href= "'+reportUrl+'" class="btn btn-custom pull-right" style="margin-top: -5px;">Back</a>')
         .insertAfter("section.content-header h1");
	callToSearchResults();
});

function callToSearchResults() {

	var reportUrl = SITEBASEURL + "community91OpsOrder/manifest-pagelist?courierProviderId="+ $("#courierProviderId").val();
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
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"columnDefs": [{
							"targets": 6,
						    "createdCell": function (td) {
						          $(td).css('vertical-align', 'top');
						          $(td).css('word-break', 'break-word');
						      }}
						  ],
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
							"mData" : "courierPartner",
							"bSortable" : false
						}, {
							"sTitle" : "Identifier",
							"mData" : "identifier",
							"bSortable" : false
						}, {
							"sTitle" : "OrderIds",
							"mData" : "orderIds",
							"bSortable" : false
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
																		+ 'community91OpsOrder/manifest-receipt-by-identifier/'
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
														+ 'community91OpsOrder/manifest-invoice-by-identifier/'
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
				
			});

}
