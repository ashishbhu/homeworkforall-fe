$(document).ready(function() {

    var reportUrl = SITEBASEURL + "mall91Product/listing?category="+$("#rootCategoryId").val()+"&childCategoryId="+$("#categoryId").val()+"&orderSupplier="+$("#orderSupplier").val()+"&b2bStatus="+$("#b2bStatus").val()+"&status="+$("#status").val();
    var table = $('#groupBuyTable').dataTable({
      
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
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
        }, {
            "sTitle": "Id",
            "mData": "productId",
            "bSortable": false
        }, {
            "sTitle": "Name",
          //  "mData": "productName",
            "bSortable": false,
            render : function(data, type, row, meta) {
            	if(row.itemDTOList != null && row.itemDTOList[0] != null && row.itemDTOList[0].itemId != null){
            		return '<a target="_blank" href="https://www.mall91.com/#/detail/'+row.itemDTOList[0].itemId+'">' + row.productName
					+ '</a>';	
            	} else {
            		return row.productName;
            	}
			}
        },

{
									"sTitle" : "Image",
									"bSortable" : false,
									"render" : function(imageUrl, type, row) {
										if (row.imageUrl == 'null' || row.imageUrl == undefined) {
											return " ";
										} else {
											
											
											return "<a target='_blank' href="
													+ row.imageUrl
													+ "><img src="
													+ row.imageUrl
													+ " height='40px' width='40px'></a>";
											
										}
									}
								},

{
            "sTitle": "isB2B",
            "mData": "isB2bProduct",
            "bSortable": false
        },
        	{
                "sTitle": "status",
               // "mData": "status",
                "bSortable": false,
                "render": function (status, type, row) {
                	
                	if(row.status =='UNAPPROVED'){
                		  return '<a class="" onclick="getProductComments(\''+ row.productId+'\')"><b>'+row.status+'</b><a/>'
         		   }
         		   else {
         			   return row.status;
         		   }
                }
            },
            {
                "sTitle": "Category",
                "mData": "rootCategoryName",
                "bSortable": false
            },
            {
                "sTitle": "Avg. Rating",
                //"mData": "rating",
                "bSortable": false,
                "render": function (rating, type, row){
                	if(row.rating != null){
                		return row.rating;
                	} else {
                		return "";
                	}
                }
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-edit'><a class='dt-remove' style=margin-left:20px;></a></h5>"
            },{
    			"sTitle": "B2B Created",
    			"bSortable": false,
    			"render": function (isB2BCreated, type, row) {
    		        if (row.isB2bProduct == false && row.isB2BCreated == false) {
    		            return "<h4><a class='dt-createB2B'></a></h4>";
    		            }
    		 
    		            else if(row.isB2BCreated == true) {
    		 
    		            	return '<span class="fa fa-check" style="color:green; font-size:0px; margin-left:30px;" aria-hidden="true"></span>';
    		 
    		            }
    		            else{
    		            	return '-';
    		            }
    			}
            },
            {
    			"sTitle": "PromoDiscount ",
    			"bSortable": false,
    			"render": function ( type, row) {
    		        
    		            	return '<span class="dt-addPromoDiscount" style="color:blue;padding-inline-start: 10px;" aria-hidden="true"></span>';
    		           
    			}
            }
           ,{
    			"sTitle": "Deal",
    			"bSortable": false,
    			"render": function (data, type, row, meta) {
    				if(row.status == 'ACTIVE' && (row.rating == null || row.rating >= 4)){
    					return "<span><a class='dt-createDeal'></a></span>";
    				} else {
    					return "_";
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

    $("#groupBuyTable").on('draw.dt', function() {
    	if($("#role").val() != "false"){
        	table.api().column(10).visible( false );
        	table.api().column(11).visible( true );
        	}
    	else{
    		table.api().column(10).visible( true );
    		table.api().column(11).visible( false );
    	}
        $(".dt-edit").each(function() {
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
           
            var table = $('#groupBuyTable').DataTable();
            $(this).unbind().on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                callToEdit(data.productId, data.sellerId);
               /* var path = SITEBASEURL + 'mall91Product/get/' + data.productId+'/'+sellerId+'/'+categoryId+"?childCategoryId="+ childCategoryId;
                $("<form action='" + path + "'></form>").appendTo('body').submit();*/
            });
        });

        $(".dt-remove").each(function() {
            $(this).empty();
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            var status =  $("#status").val();
            var supplierId =  $("#orderSupplier").val();
            var categoryId =  $("#categoryId").val();
            $(this).unbind().on('click', function() {
                if (confirm('are you sure you want to delete this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'mall91Product/delete/' + data.productId+"/"+status+"/"+data.sellerId+"/"+data.categoryId;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });
        
        $(".dt-createB2B").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Create</button>');
    		var table = $('#groupBuyTable').DataTable();
    		$(this).unbind().on('click', function() {
    			var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			/*var path = SITEBASEURL + 'mall91Product/createB2bProduct/' + data.productId;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();*/
    			$(
				".modal-body #productId")
				.val(
						data.productId);
    			$(
				'#scriptModal')
				.modal(
				'show');
    		});
    	});
        $(".dt-addPromoDiscount").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append("<span class='glyphicon glyphicon-shopping-cart' aria-hidden='true'></span>");
    		var table = $('#groupBuyTable').DataTable();
    		$(this).unbind().on('click', function() {
    			var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			$(
				".modal-body #prodId")
				.val(
						data.productId);
    			$(
				'#promoModal')
				.modal(
				'show');
    		});
    	});
        
        $(".dt-createDeal").each(
				function() {
					$(this).empty();
					$(this).addClass('text-default')
					.append("<button class='btn btn-warning' style='display:float:left;'>CREATE</button>");
					$(this).unbind().on('click', function() {
							var table = $('#groupBuyTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							var path = SITEBASEURL+ 'seller/deal/create/'+ data.productId;
							$("<form action='"+ path+ "' target=_blank></form>").appendTo('body').submit();
						});
				});
        
    });
    $("#status").change(function() {
        callToSearchResults();
    });

    $("#orderSupplier").change(function() {
        callToSearchResults();
    });

    $("#rootCategoryId").change(function() {
    	$("#categoryId").val(0);
    	$("#displayCategoryId").val(0);
    	showCategory();
        callToSearchResults();
    });
    
    $("#categoryId").change(function() {
        callToSearchResults();
    });
    
    $("#search").click(function(){
    	$("#searchByItemId").val("");
    	callToSearchResults();
    });
    $("#searchForItemId").click(function(){
    	$("#searchByProductId").val("");
    	callToSearchResults();
    });
    
    
    $("#b2bStatus").change(function() {
        callToSearchResults();
    });
    
    $("#status").change(function() {
        callToSearchResults();
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

function getProductComments(productId){
	window.location.href = SITEBASEURL+"mall91Product/get-comment-for-product/"+productId+"?category="+$("#rootCategoryId").val()+"&childCategoryId="+$("#categoryId").val()+"&b2bStatus="+$("#b2bStatus").val();
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

}

function callToSearchResults() {
    $("#groupBuyTable_wrapper").html("");
    var reportUrl = SITEBASEURL + "mall91Product/listing?category="+$("#rootCategoryId").val()+"&childCategoryId="+$("#categoryId").val()+"&orderSupplier="+$("#orderSupplier").val()
    +"&b2bStatus="+$("#b2bStatus").val()+"&productId="+$("#searchByProductId").val()+"&itemId="+$("#searchByItemId").val()+"&status="+$("#status").val();
    var table = $('#groupBuySearchTable')
        .dataTable({
            "destroy": true,
            "bProcessing": true,
            "bServerSide": true,
            "ordering": true,
            "bSearchable": false,
            "bFilter": false,
            "bStateSave": true,
            "sAjaxSource": reportUrl,
            "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSortable": false
            }, {
                "sTitle": "Id",
                "mData": "productId",
                "bSortable": false
            }, {
                "sTitle": "Name",
                //"mData": "productName",
                "bSortable": false,
                render : function(data, type, row, meta) {
                	if(row.itemDTOList != null && row.itemDTOList[0] != null && row.itemDTOList[0].itemId != null){
                		return '<a target="_blank" href="https://www.mall91.com/#/detail/'+row.itemDTOList[0].itemId+'">' + row.productName
    					+ '</a>';	
                	} else {
                		return row.productName;
                	}
    			}
            },
            {
				"sTitle" : "Image",
				"bSortable" : false,
				"render" : function(imageUrl, type, row) {
					if (row.imageUrl == 'null' || row.imageUrl == undefined) {
						return " ";
					} else {
						
						
						return "<a target='_blank' href="
								+ row.imageUrl
								+ "><img src="
								+ row.imageUrl
								+ " height='40px' width='40px'></a>";
						
					}
				}
			},
{
                "sTitle": "isB2B",
                "mData": "isB2bProduct",
                "bSortable": false
            },
            {
                "sTitle": "status",
               // "mData": "status",
                "bSortable": false,
                "render": function (status, type, row) {
                
                	if(row.status =='UNAPPROVED'){
                		  return '<a class="" onclick="getProductComments(\''+ row.productId+'\')"><b>'+row.status+'</b><a/>'
         		   }
         		   else {
         			   return row.status;
         		   }
                }
            },
                {
                    "sTitle": "Category",
                    "mData": "rootCategoryName",
                    "bSortable": false
                },
                {
                    "sTitle": "Avg. Rating",
                    //"mData": "rating",
                    "bSortable": false,
                    "render": function (rating, type, row){
                    	if(row.rating != null){
                    		return row.rating;
                    	} else {
                    		return "";
                    	}
                    }
                },
                {
                    "sTitle": "Action",
                    "bSortable": false,
                    "sDefaultContent": "<h5><a class='dt-edit'><a class='dt-remove' style=margin-left:20px;></a></h5>"
                },{
        			"sTitle": "B2B Created",
        			"bSortable": false,
        			"render": function (isB2BCreated, type, row) {
        		        if (row.isB2bProduct == false && row.isB2BCreated == false) {
        		            return "<h4><a class='dt-createB2B'></a></h4>";
        		            }
        		 
        		            else if(row.isB2BCreated == true) {
        		 
        		            	return '<span class="fa fa-check" style="color:green; font-size:35px; margin-left:30px;" aria-hidden="true"></span>';
        		 
        		            }
        		            else{
        		            	return '-';
        		            }
        			}
                },
                {
        			"sTitle": "PromoDiscount ",
        			"bSortable": false,
        			"render": function ( type, row) {
        		        
        				return '<span class="dt-addPromoDiscount" style="color:blue;padding-inline-start: 10px;" aria-hidden="true"></span>';
        		           
        			}
                }
                ,{
        			"sTitle": "Deal",
        			"bSortable": false,
        			"render": function (data, type, row, meta) {
        				if(row.status == 'ACTIVE' && (row.rating == null || row.rating >= 4)){
        					return "<span><a class='dt-createDeal'></a></span>";
        				} else {
        					return "_";
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

    $("#groupBuySearchTable").on('draw.dt', function() {
    	
    	if($("#role").val() != "false"){
        	table.api().column(10).visible( false );
        	table.api().column(11).visible( true );
        	}
    	else{
    		table.api().column(10).visible( true );
    		table.api().column(11).visible( false );
    	}
        $(".dt-edit").each(function() {
            $(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var sellerId =  $("#orderSupplier").val();
            var categoryId =  $("#categoryId").val();
            $(this).unbind().on('click', function() {
                var table = $('#groupBuySearchTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                
                callToEdit(data.productId, data.sellerId);
              /*  var path = SITEBASEURL + 'mall91Product/get/' + data.productId+'/'+ data.sellerId+'/'+data.categoryId;
                $("<form action='" + path + "'></form>").appendTo('body').submit();*/
            });
        });
        
        $(".dt-remove").each(function() {
            $(this).empty();
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            var status =  $("#status").val();
            var supplierId =  $("#orderSupplier").val();
            var categoryId =  $("#categoryId").val();
            $(this).unbind().on('click', function() {
                if (confirm('are you sure you want to delete this record?')) {
                    var table = $('#groupBuySearchTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'mall91Product/delete/' + data.productId+"/"+status+"/"+data.sellerId+"/"+data.categoryId;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });
        
        $(".dt-createB2B").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Create</button>');
    		var table = $('#groupBuySearchTable').DataTable();
    		$(this).unbind().on('click', function() {
    			var table = $('#groupBuySearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			/*var path = SITEBASEURL + 'mall91Product/createB2bProduct/' + data.productId;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();*/
    			$(
				".modal-body #productId")
				.val(
						data.productId);
    			$(
				'#scriptModal')
				.modal(
				'show');
    		});
    	});
        $(".dt-addPromoDiscount").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append("<span class='glyphicon glyphicon-shopping-cart' aria-hidden='true'></span>");
    		var table = $('#groupBuyTable').DataTable();
    		$(this).unbind().on('click', function() {
    			var table = $('#groupBuySearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			
    			$(
				".modal-body #prodId")
				.val(data.productId);
    			$(
				'#promoModal')
				.modal(
				'show');
    		});
    	});
        
        $(".dt-createDeal").each(
				function() {
					$(this).empty();
					$(this).addClass('text-default')
					.append("<button class='btn btn-warning' style='display:float:left;'>CREATE</button>");
					$(this).unbind().on('click', function() {
							var table = $('#groupBuyTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							var path = SITEBASEURL+ 'seller/deal/create/'+ data.productId;
							$("<form action='"+ path+ "' target=_blank></form>").appendTo('body').submit();
						});
				});
    });
}

function callToEdit(productId, sellerId)
{
	 //var sellerId =  $("#orderSupplier").val();
     var categoryId =  $("#rootCategoryId").val();
     var childCategoryId =  $("#categoryId").val();
     var b2bStatus=$("#b2bStatus").val();
	window.location.href = SITEBASEURL + 'mall91Product/get/' + productId+'/'+sellerId+'/'+categoryId+"?childCategoryId="+ childCategoryId+ "&b2bStatus=" +b2bStatus +"&orderSupplier="+ $("#orderSupplier").val()+"&status="+$("#status").val();
}
