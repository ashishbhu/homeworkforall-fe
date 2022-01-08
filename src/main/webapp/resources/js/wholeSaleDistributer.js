$(document).ready(
		function() {

			$("section.content-header h1").html("GMall-Distributer");
		 $("#promotion").removeClass("active");
         $("#mall91").addClass("active");
         $("#mall91 li:nth-child(26)").addClass("active");
         $("#Courier91").removeClass("active");
         $("#Dukaan91").removeClass("active");
         $("#Lenden91").removeClass("active");
 		 $("#seller").removeClass("active");

			callToSearchResults();

			$("#search").click(
					function() {
						callToSearchResults();
					});
		});
		


function callToSearchResults() {
	
var reportUrl = SITEBASEURL + "seller-request/wholesale-distributer-pagelist";
				
	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"scrollX": true,

						 "language": {
						 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
												    },
					    processing : true,
						"aoColumns" : [ 
						{
							"sTitle" : "#",
							"mData" : "uiId",
							"bSortable" : false
						}, 
						{
							"sTitle" : "SellerId",
							"mData" : "sellerId",
							//"mData" : "id",
							"bSortable" : false
						},
						{
							"sTitle" : "Name",
							"bSortable" : false,
							"mData" : "fullName"
						},
						{
							"sTitle" : "Phone Number",
							"bSortable" : false,
							"mData" : "phone"
						},
						{
							"sTitle" : "Pincode",
							"mData" : "sellerInfo.pickupZipCode",
							"bSortable" : false
						},
						{
							"sTitle" : "Shop-Mapping",
							"bSortable" : false,
							"render" : function(data, type,
									row) {
							
									return '<button class="btn btn-info"  onclick="callToViewPopUp(\''
									+row.sellerInfo.pickupZipCode+  '\' ,\'' +row.sellerId+  '\')" style=" color:white; border: none;padding: 7px 18px;">Shop-Mapping</button>   ';

								
							}
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
}


function callToViewPopUp(pincode, sellerId){
	shopIds = [];
	var reportUrl = SITEBASEURL + 'local91Shop/get-cloud-shops-for-distributer-pincode/'+pincode + '/'+sellerId;
	//alert(reportUrl);
     var table = $('#localShopPopUpTable').dataTable(
			{
				"destroy" : true,
				"bProcessing" : true,
				"bServerSide" : false,
				"ordering" : true,
				"bSearchable" : true,
				"bFilter" : true,
				"iDisplayLength" : 100,
				"stateSave":false,
				 "language": {
					 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
				    },
				    processing : true,
				"sAjaxSource" : reportUrl,
				"aoColumns" : [
					
						{
							"sTitle" : "#",
							"mData" : "uiId",
							"bSortable" : false
						}, 
						{
	    					"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllShopIds()'></input>",
	    					"bSortable": false,
	    					'mRender': function( url, type, full ) {
		                        if(full.alredayAdded != undefined && full.alredayAdded == true)
                                {
									addShopIdsToArray(full.shop_id);
									return '<input type="checkbox" id="recommended_id'+full.shop_id+'" name="recommended_id" class="breaking_checkbox" checked="checked" onclick="addShopIdsToArray('+full.shop_id+')" value="'+full.shop_id+'"  />';
							   
                                }
                                else{
								return '<input type="checkbox" id="recommended_id'+full.shop_id+'" name="recommended_id" class="breaking_checkbox" onclick="addShopIdsToArray('+full.shop_id+')" value="'+full.shop_id+'"  />';
							     }
	    
								}
	    										
						},
						{
							"sTitle" : "ShopId",
							"mData" : "shop_id"
						},
						{
							"sTitle" : "Name",
							"mData" : "name"
						},
						{
							"sTitle" : "Phone",
							"mData" : "address.phone"
						},
						{
							"sTitle" : "Pincode",
							"mData" : "address.zip_code"
						},
						
						{
							"sTitle" : "City",
							"mData" : "address.city"
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

    $(".modal-body #sellerIdUIModal").val(sellerId);
	$('#scriptModalForLocalShopPopUpListing').modal('show');

}

var shopIds = [];

function addShopIdsToArray(id){
	
	if ($('#recommended_id'+id).is(':checked')) {
		shopIds.push($('#recommended_id'+id).val());
	}
	else{
		var index = shopIds.indexOf($('#recommended_id'+id).val());
		if (index > -1) {
			shopIds.splice(index, 1);
		}
	}
}

function addAllShopIds(){
	shopIds = [];
	var oTable = $("#localShopPopUpTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(2).data()
      .each( function ( value, index ) {
    	  shopIds.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
}


function SelectLocalShop(shopId,orderId,shopName){
	if(confirm("Are you sure want to transfer Order to SellerShop => "+shopName))
	{
		window.location.href = SITEBASEURL+'local91OpsOrder/transfer-global-shop-order/'+orderId+"/"+shopId;
	}
	else{
		$("#"+shopId).prop("checked",false);
	}
	
}

