$(document)
		.ready(
				function() {
					callToSearchResults();
					$("#status").change(
							function() {
								
								callToSearchResults();
							});
				});


	
function callToSearchResults() {
	var reportUrl = SITEBASEURL + "courier91/courier-provider-listing?status="+$("#status").val();
	var table = $('#courierProviderTable')
			.dataTable(
					{
						"destroy":true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						  "scrollX": true,
						  "stateSave": true,
						"sAjaxSource" : reportUrl,
					
						
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								},
								{
									"sTitle" : "Name",
									"mData" : "personName",
									"bSortable" : false
								},
								{
									"sTitle" : "Phone",
									"mData" : "contactNumber",
									"bSortable" : false
								},
								{
									"sTitle" : "X-authId",
									"mData" : "hash",
									"bSortable" : false
								},
								{
									"sTitle" : "Status",
									"mData" : "status",
									"bSortable" : false
								},
								 {
									"sTitle" : "Action",
									"bSortable" : false,
									"sDefaultContent" : "<a class='dt-edit-n'></a>"
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
	$("#courierProviderTable")
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
												'#courierProviderTable')
												.DataTable();
												var data = table
												.row(
														$(
																this)
																.parents(
																		'tr'))
																		.data();
												callToView(data.id);
											/*	var path = SITEBASEURL
												+ 'courier91/get/'  
												+ data.id ;
												$(
														"<form action='"
														+ path
														+ "'></form>")
														.appendTo(
														'body')
														.submit();*/
											});
								});
				
			});
	
}
function callToView(id){
	window.location.href =  SITEBASEURL+ 'courier91/get/'+id+"?status="+$("#status").val();
	
}