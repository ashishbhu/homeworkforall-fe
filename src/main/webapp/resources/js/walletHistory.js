$(document).ready(function() {
	updateWithdrawalWalletListing();

	$("#search").click(function() {
		updateWithdrawalWalletListing();
		
	});
	$("#status").change(function() {
		
		updateWithdrawalWalletListing();
	});


	$("#currencyType").change(function() {
		
		updateWithdrawalWalletListing();
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
function forSpamPost(id){
	var statisticsUrl = SITEBASEURL+ 'content/view-content/'+id ;
	var requestMethodType = "GET";

	$.ajax({
		url: statisticsUrl,
		type: requestMethodType,
		contentType: "application/json",
		dataType: "json",
		success: function (result){
			$(
					".modal-body #contentTitle")
					.val(result.title
					);
			var date = new Date(result.createdAt);

			$(
			".modal-body #creationDate")
			.val(
					date.toLocaleDateString());
			if (result.imageMedia != null && result.imageMedia != '') {
				$(".modal-body #contentImageMedia").attr('src',
						result.imageMedia[0].mediaURL);
				$(".modal-body #contentVideoMedia").hide();
			} else if (result.videoMedia != null) {
				$(".modal-body #contentImageMedia").hide();
				$("#contentVideoMedia").click(function (){
					var URL = result.videoMedia.mediaURL;
					window.open(URL);
				}); 
			}
			$(
			'#scriptModal')
			.modal(
			'show');
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

function updateWithdrawalWalletListing(){
	
	 var reportUrl = SITEBASEURL + "withDrawal/walletListing/"+$("#userId").val()+"?fromDate="
							+ $("#fromDate").val() + "&toDate="
							+ $("#toDate").val()+ "&status="+ $("#status").val()
							+ "&currencyType="+ $("#currencyType").val();
	 

		
	
	
	    var table = $('#walletTable').dataTable({
	        "bProcessing": true,
	        "bServerSide": true,
	        "ordering": true,
	        "bSearchable": true,
	        "bFilter": true,
	        "bDestroy": true,
	        "sAjaxSource": reportUrl,
	        "aoColumns": [{
	            "sTitle": "#",
	            "mData": "id",
	            "bSortable": false
	        }, {
	            "sTitle": "Description",
	            "mData": "comment",
	            "bSortable": false
	        }, {
	            "sTitle": "Amount",
	            "mData": "amountUI",
	            "bSortable": false
				/*
	            "render": function(data,type,row){
	            	
	            	 if($("#currencyType").val() == "WALLET" || $("#currencyType").val()==""){
	            		 if(row.amount !=null){
	            			 return row.amount +" Rs";
	            		 }
		            		return "0 Rs";
		            	} 
	            	 if($("#currencyType").val() == "MCASH"){
	            		 if(row.boardCoin !=null){
	            			 return row.boardCoin +" Mcash";
	            		 }
		            		
	            		 return " 0 Mcash";
		            	} 
	            	 if($("#currencyType").val() == "SWALLET"){
	            		 if(row.shoppingAmount!=null){
	            			 return row.shoppingAmount +" SA";
	            		 }
		            		return "0 SA";
		            	} 
	            	 if($("#currencyType").val() == "GEMS"){
	            		 if(row.oldBoardcoin!=null){
	            			 return row.oldBoardcoin +" GEMS";
	            		 }
		            		return "0 GEMS";
		            	} 
	            	 if($("#currencyType").val() == "SWALLETAMOUNT"){
	            		 if(row.shopWalletAmount!=null){
	            			 return row.shopWalletAmount +" SWA";
	            		 }
		            		return "0 SWA";
		            	} 
	            	 if($("#currencyType").val() == "VWALLETAMOUNT"){
	            		 if(row.vipWalletAmount!=null){
	            			 return row.vipWalletAmount +" VWA";
	            		 }
		            		return "0 VWA";
		            	} 
	            	
	            	 else{
	            		 return row.amountUI;
	            	 }
	             }*/
	        },
	        {
	            "sTitle": "Date",
	            "mData": "dateStr",
	            "bSortable": false
	        },
	        {
	            "sTitle": "Action",
	            "bSortable": false,
	             "render": function(data,type,row){
	            	
	            	 if(row.transactionAction == '193'){
	            		
		            		return "<a href='#' class='view-content'><b>"+row.action+"</b></a>";
		            	} 
	            	 else{
	            		 return row.action;
	            	 }
	             }
	        }
			
			
			],
	        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
	        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
	            var oSettings = table.fnSettings();
	            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
	            return nRow;
	        },
	    });
	    $("#walletTable")
		.on(
				'draw.dt',
				function() {
					$(".view-content")
							.each(
									function() {
										
										$(this)
												.on(
														'click',
														function() {
															var table = $(
																	'#walletTable')
																	.DataTable();
															var data = table
																	.row(
																			$(
																					this)
																					.parents(
																							'tr'))
																	.data();
															forSpamPost(data.identifier);
														
														});
									});
				});
				
}
