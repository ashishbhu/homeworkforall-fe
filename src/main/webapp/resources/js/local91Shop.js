$(document).ready(function() {
	callToResults();
	$("#shopVerified").change(function() {
		callToResults();
    });
	$("#search").click(function() {
		var txtSearch = $("#txtSearch").val().trim();
		if(txtSearch == ''){
			alert("Fill Out Search Field");
			return;
		}else{
			callToResults();
		}
	
	});
	
$("#submitShopCreationDisable").click(function(){
	if ($("#comment").val().trim() == '') {
		alert("Please Mention Reason");
	} else {
		callToUpdateShopCreationStatus();
	}
	   });

$("#modalShopCreationClose").click(function(){
		closeShopCreationDisableModal();
	  });

$("#submitStatusUpdate").click(function(){
	if ($("#blockedComment").val().trim() == '') {
		alert("Please Mention Reason");
	} else {
		callToUpdateShopStatusFromModal();
	}	
 });
});
function callToResults(){
	
	var reportUrl = SITEBASEURL + "local91Shop/shopListing?shopVerified="+ $("#shopVerified").val()+"&searchType="+ $("#searchType").val()+"&txtSearch="+ $("#txtSearch").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : false,
		"bStateSave" : true,
		"scrollX": true,
		"sAjaxSource" : reportUrl,
		"aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Shop Id",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Name",
            "mData": "name",
            "bSortable": false
        }, {
            "sTitle": "Category",
            "mData": "categoryName",
            "bSortable": false
        },{
        	"sTitle": "Created By",
            "mData": "createdBy",
            "bSortable": false
        },
        {
                "sTitle": "Address",
               "mData": "address",
                "bSortable": false,
                "render": function (address, type, row) {
    		        if (row.address == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.address;
    		            }
    			}
            },
            {
                "sTitle" : "Verified Shop",
                "mData" : "shopVerified",
                "bSortable" : false
                
            },{
                "sTitle": "Mark Status",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-editmark' style='cursor: pointer'></a></h5>"
            },
            {
                "sTitle": "Mark Block",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-markBlock' style='cursor: pointer'></a></h5>"
            },
            {
                "sTitle": "Empty Wallet",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-debitWallet' style='cursor: pointer'></a></h5>"
            },
            {
				"sTitle" : "isApproved",
				"bSortable" : false,
				"sDefaultContent" :"<a class='update-shop-isApproved'></a>"
				
			},
            {
				"sTitle" : "Shop Creation Disable",
				"bSortable" : false,
				"sDefaultContent" :"<a class='shop-creation-diable'></a>"
				
			},
			 {
				"sTitle" : "Mall91-Supply",
				"bSortable" : false,
				"sDefaultContent" :"<a class='shop-mall91-supply'></a>"
			},
			{
				"sTitle" : "Cloud-Shop",
				"bSortable" : false,
				"sDefaultContent" :"<a class='cloud-shop'></a>"
			},
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'><a class='dt-remove'></a></h5>"
            }
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
    });
	$("#groupBuyTable").on('draw.dt', function() {
        $(".dt-edit").each(function() {
        	$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'local91Shop/getShop/' + data.id+"?shopVerified="+$("#shopVerified").val();
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
        
        $(".dt-remove").each(function() {
        	$(this).empty();
    		$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		$(this).on('click', function() {
    			var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			openModalForShopStatusUpdate(data.id, 'DELETED');
    			
    		});
        });
        $(".dt-editmark").each(function() {
    		$(this).empty();
    		var table = $('#groupBuyTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.shopVerified == 'VERIFIED'){
				$(this).addClass('text-default').append('<input class="btn btn-danger" type="button" value="Mark/ NOT VERIFIED">');
			} else if(data.shopVerified == 'NOT VERIFIED'){
				$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Mark/ VERIFIED">');
			}else {
				$(this).addClass('text-default').append('-');
			}
    		
			if(data.shopVerified != 'BLOCKED')
			{
				
			    		$(this).unbind().on('click', function() {
			    			var table = $('#groupBuyTable').DataTable();
			    			var data = table.row($(this).parents('tr')).data();
			    			var status;
			    			if(data.shopVerified == 'VERIFIED'){
			    				shopVerified ='NOT VERIFIED';
			                    openModalForShopStatusUpdate(data.id, shopVerified);
			    			} else {
			    				shopVerified = 'VERIFIED';
		                 	var path = SITEBASEURL + 'local91Shop/update-shopstatus/' + data.id+"/"+ shopVerified;
			    			$("<form action='" + path + "'></form>").appendTo('body').submit();
			    			}
			    			
			    		});
			}
			    	});
	 $(".update-shop-isApproved")
		.each(
				function() {
					$(this).empty();
					var table = $('#groupBuyTable').DataTable();
					var data = table.row($(this).parents('tr')).data();

					if(data.isApproved){
						$(this).addClass('text-default').append("<input type='checkbox' id=selectBox_"+data.id+"  checked aria-hidden='true'></input>");
					} else {
						$(this).addClass('text-default').append("<input type='checkbox' id=selectBox_"+data.id+" aria-hidden='true'></input>");
					}
					
					$(this).unbind().on('click',function() {
						
						var shopId = data.id;
						var isActive;
						if ($('#selectBox_'+shopId).is(':checked')) {
							isActive = true;
						} else {
							isActive = false;
						}
						
						callToUpdateShopStatus(shopId,isActive);
					
					});
		 });
        $(".shop-creation-diable")
		.each(
				function() {
					$(this).empty();
					var table = $('#groupBuyTable').DataTable();
					var data = table.row($(this).parents('tr')).data();

					if(data.shopCreationDisabled){
						$(this).addClass('text-default').append("<input type='checkbox' id=selectShopCreationDisabled_"+data.id+"  checked aria-hidden='true'></input>");
					} else {
						$(this).addClass('text-default').append("<input type='checkbox' id=selectShopCreationDisabled_"+data.id+" aria-hidden='true'></input>");
					}
					
					$(this).unbind().on('click',function() {
						
						var shopId = data.id;
						var isShopCreationDisabled;
						if ($('#selectShopCreationDisabled_'+shopId).is(':checked')) {
							isShopCreationDisabled = true;
						} else {
							isShopCreationDisabled = false;
						}
						
						//callToUpdateShopCreationStatus(shopId,isShopCreationDisabled);
						openModalForShopCreationDisable(shopId,isShopCreationDisabled);
					
					});
		 });
         $(".dt-markBlock").each(function() {
    		$(this).empty();
    		var table = $('#groupBuyTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.shopVerified == 'BLOCKED'){
    				$(this).addClass('text-default').append('-');
    			} 
           else{
	      	$(this).addClass('text-default').append('<input class="btn btn-danger" type="button" value="Mark BLOCKED">');
    		
    		$(this).unbind().on('click', function() {
				/*var msg = "Do you want to Block this Shop ?";
				if(confirm(msg)){*/
			    var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var status = "BLOCKED";
                openModalForShopStatusUpdate(data.id, status);
    			/*var path = SITEBASEURL + 'local91Shop/update-shopstatus/' + data.id+"/"+ status;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
					}*/
    			
    		});
          }
			
    	});
         
         $(".dt-debitWallet").each(function() {
     		$(this).empty();
     		var table = $('#groupBuyTable').DataTable();
 			var data = table.row($(this).parents('tr')).data();
		    if(data.shopVerified == 'BLOCKED')
			{
				$(this).addClass('text-default').append('<input class="btn btn-danger" type="button" value="Debit">');
				
				$(this).unbind().on('click', function() {
 			
     			callToBalanceApi(data.payboardUserId);
     		});
				}
				else{
					$(this).addClass('text-default').append('-');
				}
		
 			/*if(data.shopVerified != 'BLOCKED'){
     				$(this).addClass('text-default').append('-');
     			} 
            else{*/
 			
     	});
	    $(".shop-mall91-supply")
		.each(
				function() {
					$(this).empty();
					var table = $('#groupBuyTable').DataTable();
					var data = table.row($(this).parents('tr')).data();

					if(data.mall91SupplyOn){
						$(this).addClass('text-default').append("<input type='checkbox' id=selectmall91SupplyOn_"+data.id+"  checked aria-hidden='true'></input>");
					} else {
						$(this).addClass('text-default').append("<input type='checkbox' id=selectmall91SupplyOn_"+data.id+" aria-hidden='true'></input>");
					}
					
					$(this).unbind().on('click',function() {
						
						var shopId = data.id;
						var ismall91SupplyOn;
						if ($('#selectmall91SupplyOn_'+shopId).is(':checked')) {
							ismall91SupplyOn = true;
						} else {
							ismall91SupplyOn = false;
						}
						callToUpdateShopMall91SupplyStatus(shopId,ismall91SupplyOn);
					
					});
		 });
        
	    $(".cloud-shop")
		.each(
				function() {
					$(this).empty();
					var table = $('#groupBuyTable').DataTable();
					var data = table.row($(this).parents('tr')).data();

					if(data.cloudShop){
						$(this).addClass('text-default').append("<input type='checkbox' id=selectCloudShop_"+data.id+"  checked aria-hidden='true'></input>");
					} else {
						$(this).addClass('text-default').append("<input type='checkbox' id=selectCloudShop_"+data.id+" aria-hidden='true'></input>");
					}
					
					$(this).unbind().on('click',function() {
						
						var shopId = data.id;
						var isCloudShop;
						if ($('#selectCloudShop_'+shopId).is(':checked')) {
							isCloudShop = true;
						} else {
							isCloudShop = false;
						}
						callToUpdateCloudShopStatus(shopId,isCloudShop);
					
					});
		 });
       /* $(".dt-remove").each(function() {
        	$(this).empty();
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to Inactive this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'merchandiseBanner/inActive/' + data.id;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });*/


    });
}


function callToUpdateShopStatusFromModal(){
	var shopId = $("#shopId1").val();
	var status = $("#status1").val();
	var comment = $("#blockedComment").val();
	$("#loader").show();
	window.location.href = SITEBASEURL+'local91Shop/update-shopstatus/' + shopId+"/"+ status+"?comment="+comment ;
	}


function callToUpdateShopStatus(shopId,status){
	var msg = "Do you want to mark this shop UnApproved ?";
	if(status){
		var msg = "Do you want to mark this shop Approved ?";
	}
	if(confirm(msg)){
		
   	var statisticsUrl = SITEBASEURL+'local91Shop/update-shop-isApproved/'+shopId+"/"+status ;
   	var requestMethodType = "GET";
   	$.ajax({
   		url: statisticsUrl,
   		type: requestMethodType,
   		success:function(result){
   			document.getElementById("mes_div").style.display = "inline-block";
   			$("#mes_div").html(result);
   			$("#mes_div").delay(3200).fadeOut(300);
				
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
	else{
		if(status){
			$("#selectBox_"+shopId).prop("checked", false);
		}
		else{
			$("#selectBox_"+shopId).prop("checked", true);
		}
	}
	
}

function openModalForShopCreationDisable(shopId,shopCreationStatus) {
	$("#shopId").val(shopId);
	$("#shopCreationStatus").val(shopCreationStatus);
	$("#comment").val("");
	$('#scriptModalForShopCreationDisable').modal('show');
}

function openModalForShopStatusUpdate(shopId, status) {
	$("#shopId1").val(shopId);
	$("#status1").val(status);
	$("#blockedComment").val("");
	$('#scriptModalForStatusUpdate').modal('show');
}


function callToUpdateShopCreationStatus(shopId,shopCreationStatus){
	var shopId = $("#shopId").val();
	var shopCreationStatus = $("#shopCreationStatus").val();
	var comment = $("#comment").val();
	//if(confirm(msg)){
	$("#loader").show();
	   	var statisticsUrl = SITEBASEURL+'local91Shop/update-shop-creation-status/'+shopId+"/"+shopCreationStatus +"?comment="+comment  ;
	   	var requestMethodType = "GET";
	   	$.ajax({
	   		url: statisticsUrl,
	   		type: requestMethodType,
	   		success:function(result){
	   			document.getElementById("mes_div").style.display = "inline-block";
	   			$("#mes_div").html(result);
	   			$("#mes_div").delay(3200).fadeOut(300);
				$('#scriptModalForShopCreationDisable').modal('hide');	
				$("#loader").hide();
	   		},
	   		error: function(jqXHR, textStatus, errorThrown) {
	   			if (jqXHR.responseText !== '') {
	   				var r = jQuery.parseJSON(jqXHR.responseText);
	   				$("#reportWrapper").html(r.message).addClass("error");
	   			} else {
	   				$("#reportWrapper").html(jqXHR.statusText).addClass("error");
	   			}
	          $('#scriptModalForShopCreationDisable').modal('hide');
	          $("#loader").hide();
	   		}
	   	});
  // 	window.location.href = SITEBASEURL+'local91Shop/update-shop-creation-status/'+shopId+"/"+shopCreationStatus ;
	/*}
	else{
		if(shopCreationStatus){
			$("#selectShopCreationDisabled_"+shopId).prop("checked", false);
		}
		else{
			$("#selectShopCreationDisabled_"+shopId).prop("checked", true);
		}
//
	}*/
	
}

function closeShopCreationDisableModal()
{
	var shopId = $("#shopId").val();
	var shopCreationStatus = $("#shopCreationStatus").val();
	   if(shopCreationStatus == 'true'){
			$("#selectShopCreationDisabled_"+shopId).prop("checked", false);
		}
		else{
			$("#selectShopCreationDisabled_"+shopId).prop("checked", true);
		}
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


function callToUpdateShopMall91SupplyStatus(shopId,shopMall91SupplyStatus){
	var msg = "Do you want to OFF Mall91-Supply for this Shop ?";
	if(shopMall91SupplyStatus){
		var msg = "Do you want to ON Mall91-Supply for this Shop ?";
	}
	if(confirm(msg)){
		
	   	var statisticsUrl = SITEBASEURL+'local91Shop/update-shop-mall91-supply-status/'+shopId+"/"+shopMall91SupplyStatus ;
	   	var requestMethodType = "GET";
	   	$.ajax({
	   		url: statisticsUrl,
	   		type: requestMethodType,
	   		success:function(result){
	   			document.getElementById("mes_div").style.display = "inline-block";
	   			$("#mes_div").html(result);
	   			$("#mes_div").delay(3200).fadeOut(300);
					
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
	else{
		if(shopMall91SupplyStatus){
			$("#selectmall91SupplyOn_"+shopId).prop("checked", false);
		}
		else{
			$("#selectmall91SupplyOn_"+shopId).prop("checked", true);
		}
	}	
}

function callToUpdateCloudShopStatus(shopId, cloudShopStatus){
	var msg = "Do you want to change cloud shop status for this Shop ?";
	if(cloudShopStatus){
		var msg = "Do you want to mark this shop as Cloud Shop ?";
	}
	if(confirm(msg)){
		
	   	var statisticsUrl = SITEBASEURL+'local91Shop/update-cloud-shop-status/'+shopId+"/"+cloudShopStatus;
	   	var requestMethodType = "GET";
	   	$.ajax({
	   		url: statisticsUrl,
	   		type: requestMethodType,
	   		success:function(result){
	   			document.getElementById("mes_div").style.display = "inline-block";
	   			$("#mes_div").html(result);
	   			$("#mes_div").delay(3200).fadeOut(300);
					
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
	else{
		if(cloudShopStatus){
			$("#selectCloudShop_"+shopId).prop("checked", false);
		}
		else{
			$("#selectCloudShop_"+shopId).prop("checked", true);
		}
	}
}
