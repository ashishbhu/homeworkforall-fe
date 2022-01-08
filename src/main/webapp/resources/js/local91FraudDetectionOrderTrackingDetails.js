$(document).ready(
		function() {

			
			$("section.content-header h1").html("Local91 Fraud Detection Orders");
			$("#promotion").removeClass("active");
			   $("#mall91").addClass("active");
			   $("#Dukaan91").removeClass("active");
			   $("#Courier91").removeClass("active");      
			   $("#Lenden91").removeClass("active");
			   $("#Community91").removeClass("active");
			   $("#local91").addClass("active");
			   $("#local91 li:nth-child(9)").addClass("active");    


			callToSearchResults();
		});



function callToSearchResults() {
	
var reportUrl = SITEBASEURL + "local91OpsOrder/pagelist-for-local91-fraud-detection-orders-details?fraudDetectionId="
				+ $("#fraudDetectionId").val();
				
	$("#orderTable_wrapper").html("");
	var table = $('#orderSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,

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
						}, {
							"sTitle" : "Order Date",
							"mData" : "orderDate",
							"bSortable" : false
						}, {
							"sTitle" : "Item Name",
							"mData" : "itemName",
							"bSortable" : false
						}, {
							"sTitle" : "Selling Price",
							"mData" : "sellingPrice",
							"bSortable" : false
						},
						{
							"sTitle" : "Amount paid",
							"mData" : "amountPaid",
							"bSortable" : false
						},{
							"sTitle" : "Wallet Discount",
							"mData" : "walletDiscount",
							"bSortable" : false
						},{
							"sTitle" : "Shopping Wallet Discount",
							"mData" : "swalletDiscount",
							"bSortable" : false
						},{
							"sTitle" : "Coupon Applied",
							"mData" : "couponApplied",
							"bSortable" : false
						}, {
							"sTitle" : "",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit-n'></a>"
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
	 /*var isFraudOrder = $("#isFraudOrder").val();
		if( isFraudOrder == null || isFraudOrder == undefined) 
		{
			isFraudOrder = false;
		}*/
	window.location.href = SITEBASEURL + 'local91OpsOrder/get/'+orderId+"?fromFraudDetectionDetailPage=true&fraudDetectionId="
				+ $("#fraudDetectionId").val()+"&orderCount="+ $("#orderCount").val()+ "&swalletAmount="+$("#swalletAmount").val() + "&couponApplied="+$("#couponApplied").val();
}

