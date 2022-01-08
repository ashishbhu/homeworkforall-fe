$(document)
		.ready(
				function() {
					
					$("#search").click(function() {
						/*alert($('#txtWalletOrMcash').val());*/
						callToResult(mcashOrWalletStatus);
					});
					 $("#fromCreditPage").on('change', function() {
                         if ($(this).is(':checked')) {
                           $(this).attr('value', 'false');
                         
                           callToResult(mcashOrWalletStatus);
                         }
                         else {
                             $(this).attr('value', 'true');
                           
                             callToResult(mcashOrWalletStatus);
                           }
					 });
					 
					 if ($("#debit").val() == 'true') {
                         $(fromCreditPage).attr('value', 'true');
                         callToResult(mcashOrWalletStatus);
                     } else {
                    	 $(fromCreditPage).attr('value', 'false');
                         callToResult(mcashOrWalletStatus);
                     }
					 
					$("#userTable")
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
																						'#userTable')
																						.DataTable();
																				var data = table
																						.row(
																								$(
																										this)
																										.parents(
																												'tr'))
																						.data();
																				var path = SITEBASEURL
																						+ 'withDrawal/walletHistory/'
																						+ data.id+"/false";
																				$(
																						"<form action='"
																								+ path
																								+ "'target='_blank'></form>")
																						.appendTo(
																								'body')
																						.submit();
																			});
														});
										
										
										$(".dt-earning-history")
										.each(
												function() {
													$(this)
															.addClass(
																	'text-default')
															.append(
																	"<span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>");
													$(this)
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
																		//var status = ($('#wallet').attr('id'));
																		var status = mcashOrWalletStatus;
																		var searchTerm = status == 'wallet' ? status : 'mcash';
																		var fromWalletTab = status == 'wallet' ? true : false;
																		var path=null;
																		if($("#fromDate").val() == '' || $("#toDate").val() == '' || $("#fromDate").val()==null || $("#toDate").val()==null)
																		{
																     	path = SITEBASEURL
																				+ 'user/overAll-earning-by-transaction-action/'
																				+ data.id+'/'+searchTerm+ "/" +fromWalletTab +"/"+$("#fromCreditPage").val()+"/"+($("#overAll").val());
																		}
																		else{
																			path = SITEBASEURL
																			+ 'user/earning-by-transaction-action/'
																			+ data.id+'/'+searchTerm +"/"+fromWalletTab+"/"
																			+ ($("#fromDate").val()) + "/"
																			+ $("#toDate").val()+"/"+$("#fromCreditPage").val()
																			+"/"+($("#overAll").val());
																		}
																		
																		$(
																				"<form action='"
																						+ path
																						+ "'target='_blank'></form>")
																				.appendTo(
																						'body')
																				.submit();
																	});
												});

										
									});

					
				});


function callToResult(status){
	
	var reportUrl = SITEBASEURL + "user/userListingWalletCount?searchTerm="+status+"&fromDate="
							+ $("#fromDate").val() + "&toDate="
							+ $("#toDate").val() + "&fromCreditPage="+$("#fromCreditPage").val()+"&overAll="+$("#overAll").val() ;
	var table = $('#userTable')
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
								},
								{
									"sTitle" : "More Details",
									"bSortable" : false,
									"sDefaultContent" : "<h4><a class='dt-earning-history' id="+status+"></a></h4>"
								} ],
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
var mcashOrWalletStatus;
function openTab(evt, status) {
	mcashOrWalletStatus = status;
	if (status == 'wallet') {
		$(".tab button").css('background-color', '#F1F1F1');
		$(".tab button.active").css('background-color', '#ccc');
		callToResult(status);
	} else {
		$(".tab button").css('background-color', '#ccc');
		$(".tab button.active").css('background-color', '#F1F1F1');
		callToResult(status);
	}
}
