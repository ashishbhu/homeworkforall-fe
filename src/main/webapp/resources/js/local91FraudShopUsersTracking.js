$(document).ready(function() {
	callToResults();
	
	$("#search").click(function() {
		$("#loader").show();
		callToResults();
	});

});
function callToResults(){
	
	var reportUrl = SITEBASEURL + "local91Shop/fraud-detection-shop-user-listing?orderCount="
				+ $("#orderCount").val()+ "&swalletAmount="+$("#swalletAmount").val() + "&couponApplied="+$("#couponApplied").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : true,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
		"aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, 

        {
        	"sTitle": "Buyer",
            "mData": "buyerName",
            "bSortable": false
        },
       
        {
        	"sTitle": "BuyerPhone",
            "mData": "buyerPhoneNumber",
            "bSortable": false
        },{
            "sTitle": "ShopId",
            //"mData": "shopId",
            "bSortable": false,
            "sDefaultContent" : "<a class='dt-shop-id'></a>"
        }, 
        {
            "sTitle": "ShopName",
            "mData": "shopName",
            "bSortable": false
        },{
            "sTitle": "ItemId",
            "mData": "itemId",
            "bSortable": false
        }, {
        	"sTitle": "ItemName",
            "mData": "itemName",
            "bSortable": false
        },
        {
        	"sTitle": "Order Count",
            "bSortable": false,
            "sDefaultContent" : "<a class='dt-count-n'></a>"
        },
        {
        	"sTitle": "Swallet Applied",
            "mData": "swalletApplied",
            "bSortable": false
        },
        {
        	"sTitle": "Coupon Applied",
            "mData": "couponApplied",
            "bSortable": false
        },
        {
                "sTitle": "Empty UserWallet",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-debitWallet' style='cursor: pointer'></a></h5>"
        },
       
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            $("#loader").hide();
            return nRow;
        },
    });
	
	
	$("#groupBuyTable").on('draw.dt', function() {
         
         $(".dt-debitWallet").each(function() {
     		$(this).empty();
     		var table = $('#groupBuyTable').DataTable();
 			var data = table.row($(this).parents('tr')).data();
				$(this).addClass('text-default').append('<input class="btn btn-danger" type="button" value="Debit">');
				
				$(this).unbind().on('click', function() {
 			
     			callToBalanceApi(data.buyerPayboardUserId);
     		});
		
 			/*if(data.shopVerified != 'BLOCKED'){
     				$(this).addClass('text-default').append('-');
     			} 
            else{*/
 			
     	});

						$(".dt-count-n")
						.each(
								function() {
									$(this).empty();
									var table = $('#groupBuyTable')
									.DataTable();
									var data = table.row(
											$(this).parents('tr'))
											.data();
									var fraudDetectionId = data.id;
									$(this)
									.addClass(
											'text-default')
											.append(
													"<span style = 'font-weight: bolder; font-size: 20px;'>"+data.orderCount+"</span>");
									$(this).unbind().on(
											'click',
											function() {
												var table = $(
												'#groupBuyTable')
												.DataTable();
												var data = table
												.row(
														$(
																this)
																.parents(
																		'tr'))
																		.data();
											  
											/*	var path = SITEBASEURL
												+ 'local91OpsOrder/local91-fraud-detection-orders-details/'+ data.id+"?orderCount="
													+ $("#orderCount").val()+ "&swalletAmount="+$("#swalletAmount").val() + "&couponApplied="+$("#couponApplied").val();
												
												window.location.href = path; */
												var path = SITEBASEURL
                                                + 'local91OpsOrder/local91-fraud-detection-orders/'+ data.id;

												$(
														"<form action='"
														+ path
														+ "'></form>")
														.appendTo(
														'body')
														.submit();
											});

								});
						
						$(".dt-shop-id")
						.each(
								function() {
									$(this).empty();
									var table = $('#groupBuyTable')
									.DataTable();
									var data = table.row(
											$(this).parents('tr'))
											.data();
									var fraudDetectionId = data.id;
									$(this)
									.addClass(
											'text-default')
											.append(
													"<span style = 'font-weight: bolder; font-size: 15px;'>"+data.shopId+"</span>");
									$(this).unbind().on(
											'click',
											function() {
												var table = $(
												'#groupBuyTable')
												.DataTable();
												var data = table
												.row(
														$(
																this)
																.parents(
																		'tr'))
																		.data();
												var redirectURL = SITEBASEURL+ 'local91Shop/get-fraud-detection-shop-listing?shopId='+ data.shopId+"&orderCount="+ $("#orderCount").val()+ "&swalletAmount="+$("#swalletAmount").val() + "&couponApplied="+$("#couponApplied").val();
											    window.open(redirectURL);
											});

								});
   

    });
       
}

function callToBalanceApi(payboardUserId){
	
	var statisticsUrl = SITEBASEURL+'user/balance/'+payboardUserId ;
	var requestMethodType = "GET";
	$.ajax({
		url: statisticsUrl,
		type: requestMethodType,
		beforeSend : function() {
			
			$("#loader").show();
		
	},
		success:function(result){
			$(".modal-body #userId").val(result.id);
			$(".modal-body #balance").val(result.balance);
				$(".modal-body #boardCoin").val(result.boardCoin);
					$(".modal-body #shoppingBalance").val(result.shoppingBalance);
						$(".modal-body #gems").val(result.gems);
							$(".modal-body #c91WalletBalance").val(result.c91WalletBalance);
							
			$(".modal-body #vipWalletBalance").val(result.vipWalletBalance);
			$(".modal-body #shopWalletBalance").val(result.shopWalletBalance);
			$("#scriptModalforWallet").modal(
    			'show');
			 
		
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
     
}


