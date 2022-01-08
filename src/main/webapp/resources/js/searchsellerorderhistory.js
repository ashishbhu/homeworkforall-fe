$(document).ready(function() {
	$("#search").click(function() {
		callToResult();
	});
});

function callToResult(){
	
	var reportUrl = SITEBASEURL + "/mall91OpsOrder/search_seller_order_history?fromDate="+ $("#fromDate").val() + "&toDate="
	+ $("#toDate").val();
	var table = $('#userTable')
			.dataTable(
					{	
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" :  true,
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
						            	   "sTitle" : "Name",
						            	   "mData" : "name",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "Phone Number",
						            	   "mData" : "phone",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "Order Assigned",
						            	   "mData" : "orderAssigned",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "Order Processed",
						            	   "mData" : "orderProcessed",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "NR_Marked",
						            	   "mData" : "notResponded",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "SC_Error_Marked",
						            	   "mData" : "stateChangeError",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "Order AutoMoved",
						            	   "mData" : "orderAutoMoved",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "Order Pending",
						            	   "mData" : "orderPending",
						            	   "bSortable" : false
						               },
						               {
						            	   "sTitle" : "View",
						            	   "bSortable" : false,
						            	   "sDefaultContent" : "<a class='dt-manifest'></a>"
						               }
						               ],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData,
								iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow)
									.html(
											oSettings._iDisplayStart
													+ iDisplayIndex
													+ 1);
							$('#userTable_filter input').bind('keyup', function(e) {
								var filterData = $('#userTable_filter input').val();
								
								if(filterData.length > 0 || e.keyCode == 86) {
									table.fnFilter(this.value);
								}
								});
							
							return nRow;
						},
					});
					
					
										
					$("#userTable")
			.on(
					'draw.dt',
					function() {
						
						$(".dt-manifest")
						.each(
								function() {
									$(this).empty();
									var table = $('#userTable')
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
																'#userTable')
																.DataTable();
														var data = table
																.row(
																		$(
																				this)
																				.parents(
																						'tr'))
																.data();
														 callForView(data.phone);
														
													});

								});
					});
					
					
}

function callForView(phone){
	
	window.location.href = SITEBASEURL +'mall91OpsOrder/view_seller_order_history_of_individual/'+ phone +'?fromDate=' + $('#fromDate').val() + '&toDate='+$('#toDate').val();
}





