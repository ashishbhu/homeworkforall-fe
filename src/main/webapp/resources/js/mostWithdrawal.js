$(document)
		.ready(
				function() {
					callToResult();
					
					$("#search").click(function() {
						
						callToResult();
					});
					
					$("#mostWithdrawalTable")
					.on(
							'draw.dt',
							function() {
								$(".dt-history")
										.each(
												function() {
													$(this)
															.addClass(
																	'text-default')
															.append(
																	"<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>");
													$(this)
															.on(
																	'click',
																	function() {
																		var table = $(
																				'#mostWithdrawalTable')
																				.DataTable();
																		var data = table
																				.row(
																						$(
																								this)
																								.parents(
																										'tr'))
																				.data();
																		console.log(data.id);
																		callToWithdrawalHistory(data.id);
																	
																	});
												});
				
				});
				
});


function callToResult(){
	
	var reportUrl = SITEBASEURL + "user/most-withdraw-list?fromDate="+ $("#fromDate").val() + "&toDate="
	+ $("#toDate").val();
	var table = $('#mostWithdrawalTable')
			.dataTable(
					{	
						"bDestroy":true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								},
								{
									"sTitle" : "Name",
									"mData" : "firstName",
									"bSortable" : false
								},
								{
									"sTitle" : "Phone Number",
									"mData" : "phoneNumber",
									"bSortable" : false
								},
								{
									"sTitle" : "Total Amount",
									"mData" : "balance",
									"bSortable" : false
								},
								{
									"sTitle" : "UserRank",
									"mData" : "userRank",
									"bSortable" : false
								},
								{
									"sTitle" : "History",
									"bSortable" : false,
									"sDefaultContent" : "<h4><a class='dt-history'></a></h4>"
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
							return nRow;
						},
					});
}

function callToWithdrawalHistory(id){
	var url = SITEBASEURL+ 'user/mostWithdrawalHistory/'+id +"?fromDate="+ $("#fromDate").val() + 
	"&toDate="+ $("#toDate").val();
	window.open(url, '_blank');
}

