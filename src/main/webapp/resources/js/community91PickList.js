$(document).ready(function() {
	
	$("#search").click(function(){
		  callToSearchResults();
	});
	$("#courierPartner").change(function() {
		  callToSearchResults();
	});
	$("#downloadReceipt").click(function() {
		if (cm91Ids != null && cm91Ids != '') {
			window.open(SITEBASEURL + 'community91OpsOrder/bulk-receipt/'+ cm91Ids, '_blank');
		} else {
			alert("Select Manifest!");
		}
	});
	callToSearchResults();
});

function callToSearchResults() {

	var reportUrl = SITEBASEURL + "community91OpsOrder/pickList-pagelist?startDate=" +$("#fromDate").val() +"&endDate="+ $("#toDate").val()+"&searchTerm="+ $("#searchTerm").val()+"&courierPartner=" +$("#courierPartner").val();
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
						},
						{
	    					"sTitle": "<input type='checkbox' id='selectAll' onchange='addAlld91Ids()'></input>",
	    					"bSortable": false,
	    					'mRender': function( url, type, full ) {
	    						var identifierValue = full.identifier;
							return '<input type="checkbox" id="identifier_id'+full.identifier+'" name="identifier_id" class="breaking_checkbox" onclick="addd91IdsToArray('+"'"+identifierValue+"'"+')" value="'+full.identifier+'"  />';	  }
	    				}, {
							"sTitle" : "Name",
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
												+ 'community91OpsOrder/get-manifest-orders/' +data.id+'/'+$("#courierPartner").val();
												
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

var cm91Ids = [];

function addd91IdsToArray(id){

	if ($('#identifier_id'+id).is(':checked')) {
		cm91Ids.push(id);
	}
	else{
		var index = cm91Ids.indexOf(id);
		if (index > -1) {
			cm91Ids.splice(index, 1);
		}
	}

}

function addAlld91Ids(){
	cm91Ids = [];
	var oTable = $("#orderSearchTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(6).data()
      .each( function ( value, index ) {
    	  cm91Ids.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
}

