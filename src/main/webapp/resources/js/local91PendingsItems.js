$(document).ready(function() {

	var pincodeModel = $("#pincodeModel").val();
	var sellerIdModel = $("#sellerIdModel").val();
	var shopModel = $("#shopIdModel").val();
	$('#pincode').prop("checked", pincodeModel == "true");
    $('#sellerId').prop("checked", sellerIdModel == "true");
    $('#shopId').prop("checked", shopModel == "true");
	callToSearchResults();

	$("#rootCategoryId").change(function() {
    	$("#categoryId").val(0);
    	$("#displayCategoryId").val(0);
    	showCategory();
        callToSearchResults();
    });
    
    $("#categoryId").change(function() {
        callToSearchResults();
    });
    
    $("#statusFilter").change(function() {
		callToSearchResults();
	});
	
    $("#verifiedStatus").change(function() {
		callToSearchResults();
	});
    $("#gmallLocalSupply").change(function() {
		callToSearchResults();
	});

	$("#search").click(function() {
		callToSearchResults();
	});

	$("#clearState").click(function() {

		try {
			var oTable = $('#groupBuyTable').DataTable();
			oTable.state.clear();
		} catch (e) {
			// alert("error here");
		}
		try {
			var searchTable = $('#groupBuySearchTable').DataTable();
			searchTable.state.clear();
		} catch (e) {
			// alert("error here");
		}
		//window.location.reload();
		window.location.href = SITEBASEURL + 'local91OpsOrder/local91-pending-item?status=PENDING';
	});
    
    
	$("#submitBulkComment").click(function(){
		/*if($("#commentForBulkRejection").val() == "" || $("#commentForBulkRejection").val() == null)
		{
			alert("Rejection reason is Required!!");
			return false;
		}*/

	    var pincode = $('#pincode').is(':checked');
	 	var sellerId = $('#sellerId').is(':checked');
		var shopId = $('#shopId').is(':checked');
		
		$('#scriptModalForBulkProductUnapprovalReason').modal('hide');

		$("#commentForRejection").val($("#commentForBulkRejection").val());

		$("#sellerItemRelationshipIds").val(orderIds);
		$("#status").val("UNAPPROVED");
		var action = $('#bulkApproval').attr("action");
		var newAction = action+"?category="+$("#rootCategoryId").val()+"&childCategoryId="
		+$("#categoryId").val()+"&statusFilter=" + $("#statusFilter").val()+"&sellingPriceStart="
		+$("#sellingPriceStart").val()+"&sellingPriceEnd=" + $("#sellingPriceEnd").val()
		+"&searchTerm=" + $("#searchTerm").val()+"&isPincode="+ pincode+"&isSellerId=" + sellerId+"&isShopId=" + shopId+"&verifiedStatus=" + $("#verifiedStatus").val()+"&gmallLocalSupply=" + $("#gmallLocalSupply").val();

		$('#bulkApproval').attr("action",newAction);

		$("#bulkApproval").submit();   

	});
});


var orderIds = [];

function addOrderIdsToArray(id){


	if ($('#recommended_id'+id).is(':checked')) {
		orderIds.push(id);
	}
	else{
		var index = orderIds.indexOf(id);
		if (index > -1) {
			orderIds.splice(index, 1);
		}
	}

}

function addAllOrderIds(){
	orderIds = [];
	var pincode = $('#pincode').is(':checked');
	var sellerId = $('#sellerId').is(':checked');
	var shopId = $('#shopId').is(':checked');
	
	var oTable = $("#groupBuySearchTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(3).data()
      .each( function ( value, index ) {
           orderIds.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
      $('#pincode').prop("checked", pincode);
      $('#sellerId').prop("checked", sellerId);
      $('#shopId').prop("checked", shopId);
}





function callToSearchResults() {
	
	var pincode = $('#pincode').is(':checked');
	var sellerId = $('#sellerId').is(':checked');
	var shopId = $('#shopId').is(':checked');
	
	var reportUrl = SITEBASEURL + "local91OpsOrder/local91-pending-item-listing?category="+$("#rootCategoryId").val()+"&childCategoryId="
	+$("#categoryId").val()+"&status=" + $("#statusFilter").val()+"&sellingPriceStart="
	+$("#sellingPriceStart").val()+"&sellingPriceEnd=" + $("#sellingPriceEnd").val()+"&searchTerm=" + $("#searchTerm").val()+"&isPincode=" 
	+ pincode+"&isSellerId=" + sellerId+"&isShopId=" + shopId+"&verifiedStatus=" + $("#verifiedStatus").val()+"&gmallLocalSupply=" + $("#gmallLocalSupply").val();
	$("#groupBuyTable_wrapper").html("");
	var table = $('#groupBuySearchTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : false,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
		
		"scrollX": true,
		
		"language": {
			processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
		},
		"columnDefs": [
            { "aTargets": [3], "sClass": "hide_column"},
        ],
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		},
		{
			"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllOrderIds()'></input>",
			"bSortable": false,
			'mRender': function( url, type, full ) {
				return '<input type="checkbox" id="recommended_id'+full.sellerItemRelationshipId+'" name="recommended_id" class="breaking_checkbox" onclick="addOrderIdsToArray('+full.sellerItemRelationshipId+')" value="'+full.sellerItemRelationshipId+'"  />';	  }
		},{
			"sTitle": "Item Id",
			"mData": "itemId",
			"bSortable": false
		},{
			 "sTitle": "SIR ID",
			 "mData": "sellerItemRelationshipId",
			 "bSortable": false
        },{
            "sTitle": "ShopId",
            "mData": "sellerShopId",
            "bSortable": false
        }, {
            "sTitle": "Shop Name",
            "mData": "sellerLiteDTO.storeName",
            "bSortable": false
        }, {
			"sTitle": "Item Name",
			"mData": "itemName",
			"bSortable": false
		}, {
			"sTitle": "Seller",
			"mData": "sellerName",
			"bSortable": false
		},{
			"sTitle": "MRP",
			"mData": "mrp",
			"bSortable": false
		},{
			"sTitle": "S.Price",
			"mData": "sellingPrice",
			"bSortable": false
		},
		{
			"sTitle": "CreatedAt",
			"mData": "createDateStr",
			"bSortable": false
		},
		{
			"sTitle": "Status",
			"mData": "statusStr",
			"bSortable": false
		},
		{
			"sTitle" : "Image",
			"bSortable" : false,
			"render" : function(imageURL, type, row) {
				if (row.imageURL == 'null' || row.imageURL == undefined) {
					return " ";
				} else {


					return '<img src="'+row.imageURL+'" style="height: 40px; width: 40px;"  onclick="ToShowFullImage(\''+ row.imageURL+'\')"> ';

				}
			}
		},
		{
			"sTitle": "View",
			"bSortable": false,
			"sDefaultContent": "<h5><a class='dt-view' style=margin-left:20px;></a></h5>"
		},
		{
			"sTitle": "Action",
			"bSortable": false,
			"sWidth": "20%",
			"render" : function(imageURL, type, row) {
				if (row.statusStr == 'PENDING') {
					return "<a class='dt-edit'><a class='dt-remove' style=margin-left:10px;></a>";
				} else if (row.statusStr == 'ACTIVE') {
					return "<a class='dt-remove' style=margin-left:10px;></a>";
				} else if (row.statusStr == 'UNAPPROVED') {
					return "<a class='dt-edit' style=margin-left:10px;></a>";
				} else {
					return '';
				}
			}
		}
		/*,
		{
			"sTitle" : "Similar Item",
			"bSortable" : false,
			"render" : function(itemIdentifier, type,
					row) {
				var str = row.itemIdentifier;
				if (row.statusStr == 'ACTIVE'
					&& str.startsWith("LM")) {
					return '<button class="btn btn-info"  onclick="findSimilarItems(\''
					+ row.itemId
					+ '\',\''
					+ row.itemName
					+ '\')" style=" color:white; border: none;padding: 7px 18px;">Similar</button>   ';

				} else {
					return "-";
				}

			}
		}
*/		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});

	$("#groupBuySearchTable").on('draw.dt', function() {
		//table.api().column(3).visible( false );
		$(".dt-view").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");

			var table = $('#groupBuySearchTable').DataTable();
			$(this).unbind().on('click', function() {
				var table = $('#groupBuySearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				callToView(data.sellerItemRelationshipId);
				/*var path = SITEBASEURL + 'local91OpsOrder/local91-item-detail/' + data.sellerItemRelationshipId+"?childCategoryId="
    			+ childCategoryId + "&status=" + $("#status").val()+"&category="+categoryId;*/
				//$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});

		$(".dt-edit").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append('<button style="background:#28B463; color:white; border: none;padding: 7px 18px;">ACTIVE</button>');

			var table = $('#groupBuySearchTable').DataTable();
			$(this).unbind().on('click', function() {
				var table = $('#groupBuySearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				callToApprove(data.sellerItemRelationshipId, 'ACTIVE', data.sellerLiteDTO.phone);
				
			});
		});

		$(".dt-remove").each(function() {
			$(this).empty();
			$(this).append('<button style="background:#FF5733; color:white; border: none;padding: 7px 18px;">UNAPPROVE</button>');
			$(this).unbind().on('click', function() {
				var table = $('#groupBuySearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				callToReject(data.sellerItemRelationshipId, 'UNAPPROVED', data.sellerLiteDTO.phone);
				
			});
		});        
	});
}

function callToReject(sirId, status,phone) {
	$("#sellerItemRelationshipId").val(sirId);
	$("#status1").val(status);
	$("#phone").val(phone);
	$('#scriptModalForProductUnapprovalReason').modal('show');
}


function callToApprove(sellerItemRelationshipId, status, phone) {
	var categoryId = $("#rootCategoryId").val();
	var childCategoryId = $("#categoryId").val();
	//var status = $("#status").val();
	var sellingPriceStart = $("#sellingPriceStart").val();
	var sellingPriceEnd = $("#sellingPriceEnd").val();
	var pincode = $('#pincode').is(':checked');
	var sellerId = $('#sellerId').is(':checked');
	var shopId = $('#shopId').is(':checked');
	window.location.href = SITEBASEURL + 'local91OpsOrder/process-approval-rejection/'+status+ "/" + sellerItemRelationshipId+"?childCategoryId="+ childCategoryId + "&status=" + $("#statusFilter").val()+"&category="+categoryId+"&sellingPriceStart="+sellingPriceStart+"&sellingPriceEnd=" + sellingPriceEnd+"&searchTerm=" + $("#searchTerm").val()+"&phone="+phone+"&isPincode=" + pincode+"&isSellerId=" + sellerId+"&isShopId=" + shopId+"&verifiedStatus=" +  $("#verifiedStatus").val()+"&gmallLocalSupply=" + $("#gmallLocalSupply").val();
}

function callToView(sellerItemRelationshipId) {
	var categoryId = $("#rootCategoryId").val();
	var childCategoryId = $("#categoryId").val();
	var status = $("#statusFilter").val();
	var sellingPriceStart = $("#sellingPriceStart").val();
	var sellingPriceEnd = $("#sellingPriceEnd").val();
	var pincode = $('#pincode').is(':checked');
	var sellerId = $('#sellerId').is(':checked');
	var shopId = $('#shopId').is(':checked');
	window.location.href = SITEBASEURL + 'local91OpsOrder/local91-item-detail/' + sellerItemRelationshipId+"?childCategoryId="+ childCategoryId + "&status=" + $("#statusFilter").val()+"&category="+categoryId+"&sellingPriceStart="+sellingPriceStart+"&sellingPriceEnd=" + sellingPriceEnd+"&searchTerm=" + $("#searchTerm").val()+"&isPincode=" + pincode+"&isSellerId=" + sellerId+"&isShopId=" + shopId+"&verifiedStatus=" +  $("#verifiedStatus").val()+"&gmallLocalSupply=" + $("#gmallLocalSupply").val();
}

function ToShowFullImage(image){
	$(
	".modal-body #image").attr('src',image);

	$('#showFullImage').modal('show');



}


function itemRejection() {
	if(orderIds == null || orderIds == ''){
		alert("Select Minimum 1 Item !");
		return false;
	}
	$('#scriptModalForBulkProductUnapprovalReason').modal('show');
	
	
}

function itemApproval() {
	if(orderIds == null || orderIds == ''){
		alert("Select Minimum 1 Item !");
		return false;
	}
	$("#sellerItemRelationshipIds").val(orderIds);
	$("#status").val("ACTIVE");
	var pincode = $('#pincode').is(':checked');
	var sellerId = $('#sellerId').is(':checked');
	var shopId = $('#shopId').is(':checked');

	var action = $('#bulkApproval').attr("action");
    var newAction = action+"?category="+$("#rootCategoryId").val()+"&childCategoryId="
	+$("#categoryId").val()+"&statusFilter=" + $("#statusFilter").val()+"&sellingPriceStart="
	+$("#sellingPriceStart").val()+"&sellingPriceEnd=" + $("#sellingPriceEnd").val()
	+"&searchTerm=" + $("#searchTerm").val()+"&isPincode="+ pincode+"&isSellerId=" + sellerId+"&isShopId=" + shopId+"&verifiedStatus=" + $("#verifiedStatus").val()+"&gmallLocalSupply=" + $("#gmallLocalSupply").val();

	$('#bulkApproval').attr("action",newAction);

	$("#bulkApproval").submit();
}



/*function findSimilarItems11(itemId, itemName) {
	
	$("#itemName").val(itemName);
	$("#itemId").val(itemId);
	
	var action = $('#similarItems').attr("action");
	var newAction = action + "?category=" + $("#rootCategoryId").val()
			+ "&childCategoryId=" + $("#categoryId").val() + "&statusFilter="
			+ $("#statusFilter").val() + "&sellingPriceStart="
			+ $("#sellingPriceStart").val() + "&sellingPriceEnd="
			+ $("#sellingPriceEnd").val() + "&searchTerm="
			+ $("#searchTerm").val();
	
	$('#similarItems').attr("action", newAction);
	$("#similarItems").submit();
}*/


function findSimilarItems(itemId,ItemName){
	//alert(ItemName);
	var reportUrl = SITEBASEURL + 'local91OpsOrder/get-similar-item/'+itemId ;
     var table = $('#SimilarItemsPopUpTable').dataTable(
			{
				"destroy" : true,
				"bProcessing" : true,
				"bServerSide" : false,
				"ordering" : true,
				"bSearchable" : true,
				"bFilter" : true,
				"stateSave":false,
				 "language": {
					 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
				    },
				    processing : true,
				"sAjaxSource" : reportUrl,
				
				"aoColumns" : [
						{
							"sTitle" : "#",
							"mData" : "productId",
							"bSortable" : false
						},
						{
	    					"sTitle": "Product Id",
	    					"mData": "productId"
	    					},
						{
							"sTitle" : "Item Id",
							"mData" : "itemDTOList[0].itemId"
						},
						{
							"sTitle" : "Product Name",
							"mData" : "productName"
						},
						{
							"sTitle" : "Mrp",
							"mData" : "itemDTOList[0].mrp"
						},
						{
							"sTitle" : "Selling Price",
							"mData" : "itemDTOList[0].sellingPrice"
						},
						{
							"sTitle" : "Image",
							"render" : function(data, type, row) {
								if (row.itemDTOList[0].itemMediaDTOList[0] == null ) {
									return " ";
								} else {

									return '<img src="'+row.itemDTOList[0].itemMediaDTOList[0].original+'" style="height: 40px; width: 40px;" /> ';

								}
							}
						},
						{
							"sTitle" : "Identifier",
							"mData" : "itemDTOList[0].itemIdentifier"
						},
						{
							"sTitle" : "Link Item",
							"bSortable" : false,
							"render" : function(data, type,
									row) {
								
								
									return '<button class="btn btn-info"  onclick="linkItem(\''
									+ row.itemDTOList[0].itemId
									+ '\',\''
									+ itemId
									+ '\')" style=" color:white; border: none;padding: 7px 18px;">Link Item</button>   ';

								
							}
						}
						
						
						],
				"sInfo" : "<label>Total results found: </label> TOTAL  <span>Page CURRENTPAGE of TOTALPAGES </span>",
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
	$('#scriptModalSimilarItems').modal('show');

}


function linkItem(upcItemId,lmItemId){
	  window.location.href = SITEBASEURL + "local91OpsOrder/link-item/"+upcItemId+"/"+lmItemId+"?category="+$("#rootCategoryId").val()+"&childCategoryId="
	+$("#categoryId").val()+"&statusFilter=" + $("#statusFilter").val()+"&sellingPriceStart="
	+$("#sellingPriceStart").val()+"&sellingPriceEnd=" + $("#sellingPriceEnd").val()
	+"&searchTerm=" + $("#searchTerm").val();
}
    
