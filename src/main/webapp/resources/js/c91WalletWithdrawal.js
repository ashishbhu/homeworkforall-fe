$(document).ready(function() {
	
	
    	
    	var statisticsUrl = SITEBASEURL+'withDrawal/get-paytm-and-rozar-pay-wallet-balance' ;
    	var requestMethodType = "GET";
    	$.ajax({
    		url: statisticsUrl,
    		type: requestMethodType,
    		beforeSend : function() {
				
				$("#loader").show();
			
		},
    		success:function(result){
    			
    			
    			  if(result.razorpayBalanceDTO!= null && result.razorpayBalanceDTO.queuedAmount != "" && result.razorpayBalanceDTO.queuedAmount != "undefined" && result.razorpayBalanceDTO.queuedAmount!= null  && result.razorpayBalanceDTO.balanceAmount != "" && result.razorpayBalanceDTO.balanceAmount != "undefined" && result.razorpayBalanceDTO.balanceAmount != null){
    		       	   $("section.content-header h1").html("<span style='background-color:#f0e665;'>Paytm "+result.paytmWalletBalanceResult.walletName+"( Available Balance : "+result.paytmWalletBalanceResult.walletBalance+", Queued Amount :"+ result.paytmWalletBalanceResult.queuedAmount+" Count :"+ result.paytmWalletBalanceResult.count+")</span> </br> <span style='background-color:#f0e4c9;'>Razorpay ( Available Balance : "+result.razorpayBalanceDTO.balanceAmount+", Queued Amount : "+result.razorpayBalanceDTO.queuedAmount+", Count : "+result.razorpayBalanceDTO.count+")</span>");
    		          } else {
    		       	   $("section.content-header h1").html("<span style='background-color:#f0e665;'>Paytm "+result.paytmWalletBalanceResult.walletName+"( Available Balance : "+result.paytmWalletBalanceResult.walletBalance+")</span>");
    		          }
			
    		},
    		complete : function(data) {

			
					$("#loader").hide();
				},
    		error: function(jqXHR, textStatus, errorThrown) {
    			if (jqXHR.responseText !== '') {
    				var r = jQuery.parseJSON(jqXHR.responseText);
    				$("#reportWrapper").html(r.message).addClass("error");
    			} else {
    				$("#reportWrapper").html(jqXHR.statusText).addClass("error");
    			}
    		}
    	});
         
  
    	
	
	
    	
	

	var pageStatus = $("#status").val();
	var pageType = $("#type").val();
	

	if (pageStatus == 0 || pageType==0) {
		callToResults();
	} else {
		callToSearchResults();
	}
	

	function callToResults() {
		var walletType = $("#walletType").val();
	    if($("#walletType").val() == undefined || $("#walletType").val() == null || $("#walletType").val() == 'undefined')
	    	{
		 walletType = "";
	    	}	
	    var isFromC91Wallet =$("#isFromC91Wallet").val();
		if($("#isFromC91Wallet").val() == undefined || $("#isFromC91Wallet").val() == null || $("#isFromC91Wallet").val() == 'undefined')
		{
			isFromC91Wallet = false;
		}
	    
		var reportUrl = SITEBASEURL + "withDrawal/withdrawalListing?status=" +pageStatus+"&type="+pageType+"&phone="+$("#phone").val()+"&fromDate="+$("#fromDate").val()+"&toDate="+ $("#toDate").val()+"&forC91="+$("#forC91").val()+
		"&forC91WalletWithdrawal="+$("#forC91WalletWithdrawal").is(':checked')+"&forNonC91WalletWithdrawal="+$("#forNonC91WalletWithdrawal").is(':checked')+
		"&fromAmount="+$("#fromAmount").val()+"&toAmount="+$("#toAmount").val()+"&walletType="+walletType +"&isFromC91Wallet="+isFromC91Wallet;
		var table = $('#withdrawalTable').dataTable({
			
			"bServerSide": true,
			"ordering": true,
			"bSearchable": true,
			"bFilter": false,
			"bStateSave": true,
			"sAjaxSource": reportUrl,
			"language": {
				 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
			    },
			    processing : true,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			},
			{
				"sTitle": "Id",
				"mData": "withdrawalId",
				"bSortable": false
			},
			/*{
				"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllIds()'></input>",
				"bSortable": false,
				'mRender': function( url, type, full, row ) {
					if(full.status == 1){
					  return '<input type="checkbox" id="recommended_id'+full.id+'" name="recommended_id" class="breaking_checkbox" onclick="addIdsToArray('+full.id+')" value="'+full.id+'"  />';
					} else {
						return '';
					}
				}
			},*/
				
			{
				"sTitle": "Name",
				"mData": "name",
				"bSortable": false
			}, {
				"sTitle": "Reg.Phone",
				"mData": "regPhoneNumber",
				"bSortable": false
			},{
				"sTitle": "Amount",
				"mData": "amount"
			},{
				"sTitle": "Partial Amount",
				'mRender': function( url, type, full, row ) {
					if(full.status == 1){
					  return '<input type="text" id="partail_id'+full.id+'" name="partail_id" onclick="checkNumber('+full.id+')" value="0" style="width:70px" />';
					} else {
						return '';
					}
				}
			}, {
				"sTitle": "Status",
				"mData": "statusStr",
				"bSortable": false
			},{
				"sTitle": "Type",
				"mData": "type"
			}, {
				"sTitle": "Ph.Number",
				//"mData": "phoneNumber",
				"bSortable": false,
		        "render": function (phoneNumber, type, row) {
    		        if (row.phoneNumber == null) {
    		            return "Payout not started";
    		            }
    		            else {
    		            	return row.phoneNumber;
    		            }
    			}
			}, {
				"sTitle": "Date",
				"mData": "date",
				"bSortable": false
			},
			{
				"sTitle": "ETA",
				"mData": "etaDate",
				"bSortable": false
			},
			{
				"sTitle": "Auto Approved",
				"mData": "isAutoApproved",
				"bSortable": false
			}
			, {
				"sTitle": "Action",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-edit'></a><a class='dt-remove'></a>"
			},{
				"sTitle": "",
				"sDefaultContent": "<a class='dt-notification'></a>",
				"bSortable": false
			},
			{
				"sTitle": "Debit",
				"sDefaultContent": "<a class='dt-debit'></a>",
				"bSortable": false
			},{
				"sTitle": "Report",
				"mData": "reportLink",
				"bSortable": false
			},{
				"sTitle": "History",
				"mData": "historyLink",
				"bSortable": false
			},
			{
				"sTitle": "",
				"mData": "walletHistoryLink",
				"bSortable": false
			},
			{
				"sTitle": "More",
				"sDefaultContent": "<a class='dt-more'></a>",
				"bSortable": false
			}
			,
			{
				"sTitle": "Pay Detail",
				"sDefaultContent": "<a class='dt-payment'></a>",
				"bSortable": false
			},
			{
				"sTitle": "Account Detail",
				"sDefaultContent": "<a class='dt-account'></a>",
				"bSortable": false
			},
//			{
//				"sTitle": "Status",
//				"sDefaultContent": "<a class='dt-status'></a>",
//				"bSortable": false
//			}
			{
				"sTitle": "Transaction Summary",
				"sDefaultContent": "<a class='dt-statsTransitions'></a>",
				"bSortable": false
			}
			],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});

		$("#withdrawalTable").on('draw.dt', function() {
			$(".dt-edit").each(function() {
				$(this).empty();
				var table = $('#withdrawalTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				
				if(data.status == 1)
				{
//					if(!data.isValidWithDrawal)
//					{
//						$(this).parents('tr').css('background', '#FFA07A');
//					}
					
					$(this).addClass('text-default').append("Approve  || ");
					$(this).unbind().on('click', function() {
						if (confirm('are you sure you want to approve this withdrawal request?')) {
							var table = $('#withdrawalTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							var PartailId = $('#partail_id'+data.id).val();
							callToApprove(data.id,PartailId );
							/*var path = SITEBASEURL + 'withDrawal/approve-withdrawal/' + data.id +"/"+pageStatus+"/"+$('#partail_id'+data.id).val();
							$("<form action='" + path + "'></form>").appendTo('body').submit();*/
						} else {
							return false;
						}
					});
				}
			});

			$(".dt-remove").each(function() {
				$(this).empty();
				var table = $('#withdrawalTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				if(data.status == 1)
				{
					$(this).append("Reject");
					$(this).unbind().on('click', function() {
						if (confirm('are you sure you want to reject this withdrawal request?')) {
							var table = $('#withdrawalTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							callToReject(data.id);
							/*var path = SITEBASEURL + 'withDrawal/reject-withdrawal/' + data.id +"/"+pageStatus;
							$("<form action='" + path + "'></form>").appendTo('body').submit();*/
						} else {
							return false;
						}
					});
				}

			});

			$(".dt-notification").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-bell' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'notification/withdrawal/' + data.userId +"/"+pageStatus;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				});
			});

			$(".dt-debit").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-bullhorn' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'withDrawal/debitWalletMoney/'  + data.userId + '/' +data.id +"/"+pageStatus;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				});
			});
			
			$(".dt-more").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-zoom-out' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					
					var searchTerm = 'wallet';
					var fromWalletTab =  true;
					var fromCreditPage = true;
					var overAll = true;
					var path = SITEBASEURL
					+ 'user/overAll-earning-by-transaction-action/'
					+ data.user.id+'/'+searchTerm+ "/" +fromWalletTab +"/"+fromCreditPage+"/"+overAll;
					$("<form action='" + path + "'target='_blank'></form>").appendTo('body').submit();
					
					walletTransactionHistory()
				});
			});
			
			$(".dt-payment").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'withDrawal/getUserPaymentDetails/'+data.id;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				});
			});
			
			$(".dt-account").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'withDrawal/getUserDetails/'+data.userId;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				});
			});
			$(".dt-status").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'withDrawal/withdrawalStateByWithdrawalId/'+data.id;
					$("<form action='" + path + "'></form>").appendTo('body').submit();
				});
			});
			
			$(".dt-statsTransitions").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					getStatusTransitions(data.id,data.isRetried);
				});
			});

		});

	}

/*	$("#status").change(function() {
		callToSearchResults();
	});
	$("#type").change(function() {
		callToSearchResults();
	});*/


	$( "#clearState" ).click(function() {

		var table = $('#withdrawalSearchTable').DataTable();
		table.state.clear();
		try {
			var searchTable = $('#withdrawalTable').DataTable();
			searchTable.state.clear();
		} catch (e) {
			// alert("error here");
		}

		$("#status").val("0");
		$("#type").val("0");
		window.location.reload();
	});


	var statisticsUrl = SITEBASEURL + "user/statistics";
	var requestMethodType = "GET";

	$.ajax({
		url: statisticsUrl,
		type: requestMethodType,
		contentType: "application/json",
		dataType: "json",
		success: updateStatistics,
		error: function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.responseText !== '') {
				var r = jQuery.parseJSON(jqXHR.responseText);
				$("#reportWrapper").html(r.message).addClass("error");
			} else {
				$("#reportWrapper").html(jqXHR.statusText).addClass("error");
			}

		}
	});

});

var Ids = [];
function addIdsToArray(id){

	if ($('#recommended_id'+id).is(':checked')) {
			Ids.push(id);
		}
		else{
			var index = Ids.indexOf(id);
			if (index > -1) {
				Ids.splice(index, 1);
			}
		}
}
function checkNumber(id){
	if(isNaN($('#partail_id'+id).val())){
		$('#partail_id'+id).focus();
		alert("Pleae Enter Numeric Value");
		return false;
	}
}

function addAllIds(){
	Ids = [];
	var oTable = $("#withdrawalTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(0).data()
      .each( function ( value, index ) {
           Ids.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
}

function addAllSearchIds(){
	Ids = [];
	var oTable = $("#withdrawalSearchTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(0).data()
      .each( function ( value, index ) {
           Ids.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
}

function updateStatistics(result) {
	$("#totalUsersRegistered").html(result.totalUsersRegistered);
	$("#totalDirectRefferedRegistered").html(
			result.totalDirectRefferedRegistered);
	$("#totalUsersRegisteredToday").html(result.totalUsersRegisteredToday);
	$("#totalDirectRefferedRegisteredToday").html(
			result.totalDirectRefferedRegisteredToday);
	$("#totalChatBotGroupsUserRegistered").html(
			result.totalChatBotGroupsUserRegistered);
	$("#totalChatBotGroupsRegistered").html(
			"(" + result.totalChatBotGroupsRegistered + " Groups)");
	$("#totalActiveChatBotGroupsUserRegistered").html(
			result.totalActiveChatBotGroupsUserRegistered);
	$("#totalActiveChatBotGroupsRegistered").html(
			"(" + result.totalActiveChatBotGroupsRegistered + " Groups)");
	$("#totalChatBotGroupsUserRegisteredToday").html(
			result.totalChatBotGroupsUserRegisteredToday);
	$("#totalChatBotGroupsRegisteredToday").html(
			result.totalChatBotGroupsRegisteredToday);

	// adding new values
	$("#dailyActiveUsers").html(result.dailyActiveUsers);
	$("#monthlyActiveUsers").html(result.monthlyActiveUsers);
	$("#dauByMau").html(result.dauByMau);
	
	// Adding Zombie users
	$("#totalZombieChatBotGroupsRegistered").html(result.totalZombieChatBotGroupsRegistered);
	$("#totalZombieChatBotGroupsUserRegistered").html(result.totalZombieChatBotGroupsUserRegistered);

}


function callToSearchResults() {
	var statusVal = $("#status").val();
	var typeVal = $("#type").val();
	try{
		$("#withdrawalTable_wrapper").html("");
	}
	catch (e) {
		// alert("error here");
	}
	var walletType = $("#walletType").val();
    if($("#walletType").val() == undefined || $("#walletType").val() == null || $("#walletType").val() == 'undefined')
    	{
	 walletType = "";
    	}	
    var isFromC91Wallet =$("#isFromC91Wallet").val();
	if($("#isFromC91Wallet").val() == undefined || $("#isFromC91Wallet").val() == null || $("#isFromC91Wallet").val() == 'undefined')
	{
		isFromC91Wallet = false;
	}
	var reportUrl = SITEBASEURL + "withDrawal/withdrawalListing?status=" + $("#status").val()+"&type="+$("#type").val()+"&phone="+$("#phone").val()
	+"&fromDate="+$("#fromDate").val()+"&toDate="+ $("#toDate").val()+"&forC91="+$("#forC91").val()+"&forC91WalletWithdrawal="+$("#forC91WalletWithdrawal").is(':checked')+"&forNonC91WalletWithdrawal="+$("#forNonC91WalletWithdrawal").is(':checked')+"&fromAmount="+$("#fromAmount").val()+"&toAmount="+$("#toAmount").val() +"&walletType="+walletType+"&isFromC91Wallet="+isFromC91Wallet;
	
	var table = $('#withdrawalSearchTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
		    },
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		},
		{
			"sTitle": "Id",
			"mData": "withdrawalId",
			"bSortable": false
		},
/*		{
			"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllSearchIds()'></input>",
			"bSortable": false,
			'mRender': function( url, type, full) {
			 if(full.status == 1){
				 return '<input type="checkbox" id="recommended_id'+full.id+'" name="recommended_id" class="breaking_checkbox" onclick="addIdsToArray('+full.id+')" value="'+full.id+'"  />';
			 } else {
				 return '';
			 }
			}
		},
*/		{
			"sTitle": "Name",
			"mData": "name",
			"bSortable": false
		}, {
			"sTitle": "Reg.Phone",
			"mData": "regPhoneNumber",
			"bSortable": false,

		},{
			"sTitle": "Amount",
			"mData": "amount"
		},{
			"sTitle": "Partial Amount",
			//"mData": "amount",
			'mRender': function( url, type, full, row ) {
				if(full.status == 1){
				  return '<input type="text" id="partail_id'+full.id+'" name="partail_id" onclick="checkNumber('+full.id+')" value="0"  />';
				} else {
					return '';
				}
			}
		}, {
			"sTitle": "Status",
			"mData": "statusStr",
			"bSortable": false
		},{
			"sTitle": "Type",
			"mData": "type"
		}, {
			"sTitle": "Ph.Number",
			//"mData": "phoneNumber",
			"bSortable": false,
			"render": function (phoneNumber, type, row) {
		        if (row.phoneNumber == null) {
		            return "Payout not started";
		            }
		            else {
		            	return row.phoneNumber;
		            }
			}
		}, {
			"sTitle": "Date",
			"mData": "date",
			"bSortable": false
		}
		,
		{
			"sTitle": "ETA",
			"mData": "etaDate",
			"bSortable": false
		}
		,
		{
			"sTitle": "Auto Approved",
			"mData": "isAutoApproved",
			"bSortable": false
		}
		, {
			"sTitle": "Action",
			"bSortable": false,
			"sDefaultContent": "<a class='dt-edit'></a><a class='dt-remove'></a>"
		},{
			"sTitle": "",
			"sDefaultContent": "<a class='dt-notification'></a>",
			"bSortable": false
		},
		{
			"sTitle": "Debit",
			"sDefaultContent": "<a class='dt-debit'></a>",
			"bSortable": false
		},{
			"sTitle": "Report",
			"mData": "reportLink",
			"bSortable": false
		},{
			"sTitle": "History",
			"mData": "historyLink",
			"bSortable": false
		},
		{
			"sTitle": "",
			"mData": "walletHistoryLink",
			"bSortable": false
		},
		{
			"sTitle": "More",
			"sDefaultContent": "<a class='dt-more'></a>",
			"bSortable": false
		}
		,
		{
			"sTitle": "Pay Detail",
			"sDefaultContent": "<a class='dt-payment'></a>",
			"bSortable": false
		},
		{
			"sTitle": "Account Detail",
			"sDefaultContent": "<a class='dt-account'></a>",
			"bSortable": false
		},
//		{
//			"sTitle": "Status",
//			"sDefaultContent": "<a class='dt-status'></a>",
//			"bSortable": false
//		}
		{
			"sTitle": "Transaction Summary",
			"sDefaultContent": "<a class='dt-statsTransitions'></a>",
			"bSortable": false
		}
		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});

	$("#withdrawalSearchTable").on('draw.dt', function() {
		$(".dt-edit").each(function() {
			$(this).empty();
			var table = $('#withdrawalSearchTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.status == 1)
			{
				/*if(!data.isValidWithDrawal)
				{
					$(this).parents('tr').css('background', '#FFA07A');
				}*/
				$(this).addClass('text-default').append("Approve  || ");
				$(this).unbind().on('click', function() {
					if (confirm('are you sure you want to approve this withdrawal request?')) {
						var table = $('#withdrawalSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						var PartailId = $('#partail_id'+data.id).val();
						callToApprove(data.id,PartailId);
						/*var path = SITEBASEURL + 'withDrawal/approve-withdrawal/' + data.id +"/"+statusVal+"/"+$('#partail_id'+data.id).val();
						$("<form action='" + path + "'></form>").appendTo('body').submit();*/
					} else {
						return false;
					}
				});
			}
		});

		$(".dt-remove").each(function() {
			$(this).empty();
			var table = $('#withdrawalSearchTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.status == 1)
			{
				$(this).append("Reject");
				$(this).unbind().on('click', function() {
					if (confirm('are you sure you want to reject this withdrawal request?')) {
						var table = $('#withdrawalSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						/*var path = SITEBASEURL + 'withDrawal/reject-withdrawal/' + data.id +"/"+statusVal;
						$("<form action='" + path + "'></form>").appendTo('body').submit();*/
						callToReject(data.id);
					} else {
						return false;
					}
				});
			}

		});

		$(".dt-notification").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-bell' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'notification/withdrawal/' + data.userId+ "/"+statusVal;
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});

		$(".dt-debit").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-bullhorn' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'withDrawal/debitWalletMoney/'  + data.userId + '/' +data.id +"/"+statusVal;
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});
		
		$(".dt-more").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-zoom-out' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				
				var searchTerm = 'wallet';
				var fromWalletTab =  true;
				var fromCreditPage = true;
				var overAll = true;
				var path = SITEBASEURL
				+ 'user/overAll-earning-by-transaction-action/'
				+ data.user.id+'/'+searchTerm+ "/" +fromWalletTab +"/"+fromCreditPage+"/"+overAll;
				$("<form action='" + path + "'target='_blank'></form>").appendTo('body').submit();
				
				walletTransactionHistory()
			});
		});
		
		$(".dt-payment").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'withDrawal/getUserPaymentDetails/'+data.id;
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});
		
		$(".dt-account").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'withDrawal/getUserDetails/'+data.userId;
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});
		
		$(".dt-status").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'withDrawal/withdrawalStateByWithdrawalId/'+data.id;
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});
		
		$(".dt-statsTransitions").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				getStatusTransitions(data.id,data.isRetried);
			});
		});
	});
}

function bulkApprove(){
	var pageStatus = $("#status").val();
	if(Ids.length == 0){
		alert("Select check box!");
		return;
	}
	if (confirm('are you sure you want to approve this withdrawal request?')) {
		window.location.href = SITEBASEURL + "withDrawal/bulk-approve-withdrawal" +"/"+ Ids +"/"+ pageStatus;
		
	} else {
		return false;
	}
}
function bulkReject(){
	var pageStatus = $("#status").val();
	if(Ids.length == 0){
		alert("Select check box!");
		return;
	}
	if (confirm('are you sure you want to reject this withdrawal request?')) {
		window.location.href = SITEBASEURL + "withDrawal/bulk-reject-withdrawal" +"/"+ Ids +"/"+ pageStatus;
		
	} else {
		return false;
	}
}



function callToApprove(id,PartailId){
	var isFromC91Wallet =$("#isFromC91Wallet").val();
	
	if($("#isFromC91Wallet").val() == undefined || $("#isFromC91Wallet").val() == null || $("#isFromC91Wallet").val() == 'undefined')
	{
		isFromC91Wallet = false;
	}
	
	if($("#isFromC91Wallet").val()){
		
		$("#forC91").val(true);
		
	}
	window.location.href = SITEBASEURL + 'withDrawal/approve-withdrawal/' + id +"/"+$("#status").val()+"/"+PartailId+"/"+$("#type").val()+"?fromDate="+$("#fromDate").val()+"&toDate="+ $("#toDate").val()+"&forC91="+$("#forC91").val()+"&fromAmount="+$("#fromAmount").val()+"&toAmount="+$("#toAmount").val()+"&isFromC91Wallet="+isFromC91Wallet+"&forC91WalletWithdrawal="+$("#forC91WalletWithdrawal").is(':checked')+"&forNonC91WalletWithdrawal="+$("#forNonC91WalletWithdrawal").is(':checked');
}

function callToReject(id){
	var isFromC91Wallet =$("#isFromC91Wallet").val();
	if($("#isFromC91Wallet").val() == undefined || $("#isFromC91Wallet").val() == null || $("#isFromC91Wallet").val() == 'undefined')
	{
		isFromC91Wallet = false;
	}
	if($("#isFromC91Wallet").val()){
		
		$("#forC91").val(true);
		
	}
	window.location.href = SITEBASEURL + 'withDrawal/reject-withdrawal/' + id +"/"+$("#status").val()+"/"+$("#type").val()+"?fromDate="+$("#fromDate").val()+"&toDate="+ $("#toDate").val()+"&forC91="+$("#forC91").val()+"&fromAmount="+$("#fromAmount").val()+"&toAmount="+$("#toAmount").val()+"&isFromC91Wallet="+isFromC91Wallet;
	
}

function getStatusTransitions(id,isRetried) {
	var sellerTicketUrl = SITEBASEURL + "withDrawal/fetchWithdrawalStateByWithdrawalId/"+ id;
	$("#modelBox").empty();
	 $(".modal-body #retry").val(isRetried);
    $(".modal-body #modelBox").load(sellerTicketUrl);
    $('#scriptModal').modal('show');
}
