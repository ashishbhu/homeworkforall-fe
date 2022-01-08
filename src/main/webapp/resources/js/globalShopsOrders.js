$(document).ready(
		function() {

			$("section.content-header h1").html("Global Shop Orders");
			$("#promotion").removeClass("active");
			   $("#mall91").addClass("active");
			   $("#Dukaan91").removeClass("active");
			   $("#Courier91").removeClass("active");      
			   $("#Lenden91").removeClass("active");
			   $("#Community91").removeClass("active");
			   $("#local91").addClass("active");
			   $("#local91 li:nth-child(4)").addClass("active");   

			var status = $("#orderState").val();

			callToSearchResults();

			$("#orderState").change(
					function() {
						callToSearchResults();
					});

			$("#search").click(
					function() {
						callToSearchResults();
					});
			$("#clearState").click(function() {

				try {
					var oTable = $('#orderTable').DataTable();
					oTable.state.clear();
				} catch (e) {
					// alert("error here");
				}
				try {
					var searchTable = $('#orderSearchTable').DataTable();
					searchTable.state.clear();
				} catch (e) {
					// alert("error here");
				}
				window.location.reload();
			});
		});
		


function callToSearchResults() {
	
var reportUrl = SITEBASEURL + "local91OpsOrder/pagelist-for-local91-orders?orderState="
				+ $("#orderState").val()+ "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&isGlobalShopOrders=true";
				
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
							"mData" : "id",
							"bSortable" : false
						}, 
						{
							"sTitle" : "OrderId",
							"mData" : "orderId",
							"bSortable" : false
						},
						{
							"sTitle" : "ItemId",
							"bSortable" : false,
							"render": function(data, type, row, meta) {
							      return row.subOrderDTOList[0].itemId;
							    }
						},
						{
							"sTitle" : "Item Name",
							"bSortable" : false,
							"render": function(data, type, row, meta) {
							      return row.subOrderDTOList[0].itemName;
							    }
						},
						{
							"sTitle" : "Item Image",
							"bSortable" : false,
							"render" : function(data, type, row,meta) {
								if (row.subOrderDTOList[0].itemImage == 'null' ||row.subOrderDTOList[0].itemImage == undefined) {
									return " ";
								} else {


									return '<img src="'+row.subOrderDTOList[0].itemImage+'" style="height: 40px; width: 40px;"  > ';

								}
							}
						},
						{
							"sTitle" : "Pincode",
							"mData" : "userDTO.pincode",
							"bSortable" : false
						},
					
						{
							"sTitle" : "Buyer",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						},
						{
							"sTitle" : "Phone",
							"mData" : "addressDTO.contactNumber",
							"bSortable" : false
						}
						, {
							"sTitle" : "Order Date",
							"mData" : "orderDate",
							"bSortable" : false
						}, {
							"sTitle" : "State",
							"mData" : "orderStateUI",
							"bSortable" : false
						}, {
							"sTitle" : "Payment",
							"mData" : "paymentMethodUI",
							"bSortable" : false
						}
						, {
							"sTitle" : "",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit-n'></a>"
						},
						{
							"sTitle" : "Transfer Order",
							"bSortable" : false,
							"render" : function(data, type,
									row) {
							
									return '<button class="btn btn-info"  onclick="callToViewPopUp(\''
									+row.userDTO.pincode+  '\' ,\'' +row.orderId+  '\')" style=" color:white; border: none;padding: 7px 18px;">Transfer</button>   ';

								
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

	$("#orderSearchTable")
			.on(
					'draw.dt',
					function() {
						
						$(".dt-edit-n")
								.each(
										function() {
											$(this).empty();
											$(this)
													.addClass('text-default')
													.append(
															"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
											var table = $('#orderSearchTable').DataTable();
											var data = table.row($(this).parents('tr')).data();
											$(this)
													.on(
															'click',
															function() {
																var table = $(
																		'#orderSearchTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();
																callToView(data.orderId);
																
															});
										});
					});
}


function callToView(orderId){
	window.location.href = SITEBASEURL + 'local91OpsOrder/get/'+orderId+"?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&isGlobalShopOrders=true";
}

function callToViewPopUp(pincode,orderId){
	var reportUrl = SITEBASEURL + 'local91OpsOrder/get-shops-for-pincode-listing/'+pincode+'/'+orderId ;
     var table = $('#localShopPopUpTable').dataTable(
			{
				"destroy" : true,
				"bProcessing" : true,
				"bServerSide" : true,
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
							"mData" : "shop_id",
							"bSortable" : false
						},
						{
	    					"sTitle": "",
	    					"bSortable": false,
	    					'mRender': function( url, type, full ) {
	                    	return '<input type="checkbox" id="'+full.shop_id+'" onchange="SelectLocalShop('+full.shop_id+','+orderId+',\'' +full.name+  '\')"></input>';
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
	$('#scriptModalForLocalShopPopUpListing').modal('show');

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

