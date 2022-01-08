
function callToSearchResults(searchTerm) {
var reportUrl = SITEBASEURL + "mall91OpsOrder/ordersList?searchTerm="+ searchTerm ;
	$('#courier91SearchTable').parents('div.dataTables_wrapper').first().hide();
	$('#dukaan91SearchTable').parents('div.dataTables_wrapper').first().hide();
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
							"sTitle" : "ID",
							"mData" : "orderId",
							"bSortable" : false
						},
						{
							"sTitle" : "Supplier",
							"mData" : "supplierName",
							"bSortable" : false
						},
						 {
							"sTitle" : "Order Date",
							"mData" : "orderDate",
							"bSortable" : false
						}, {
							"sTitle" : "State",
							"mData" : "orderStateUI",
							"bSortable" : false
						}
						, {
							"sTitle" : "C.Partner",
							"mData" : "courierPartnerUI",
							"bSortable" : false
						}
						, {
							"sTitle" : "App Name",
							"bSortable" : false,
							"render": function (applicationSource, type, row) {
						        if (row.applicationSource == 'B2B') {
						            	return "B2B";
						            }
						            else {
						            	return 'Mall91';
						            }
							}
						}
						, {
							"sTitle" : "ItemId",
							"mData" : "subOrderDTOList[0].itemId",
							"bSortable" : false
						}
						, {
							"sTitle" : "Item Name",
							"mData" : "subOrderDTOList[0].itemName",
							"bSortable" : false,
							"width": "150px", "targets": 9
						},
						 {
							"sTitle" : "SKU_ID",
							"mData" : "subOrderDTOList[0].skuId",
							"bSortable" : false
						}
						, {
							"sTitle" : "Attribute",
							"mData" : "subOrderDTOList[0].itemAttributeDetail",
							"bSortable" : false
						},
						 {
							"sTitle" : "Quantity",
							"mData" : "subOrderDTOList[0].orderedQuantity",
							"bSortable" : false
						}
						,{
							"sTitle" : "Action",
							"bSortable" : false,
							"render": function (orderState, type, row) {
								//if (row.orderState == 'ORDER_READY_TO_DISPATCH' && row.courierPartner!='COURIER91') {
								if (row.orderState == 'ORDER_READY_TO_DISPATCH') {
									return  '<div id="updateTrackingNumber" class="btn btn-custom" style="margin-top: 10px;margin-left: 10px;" onclick="updateTrackingNumber('+row.orderId+')">Update Tracking</div>';
								}
								else{
									return '-'
								}

							}
						}
						],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							
							$('#orderSearchTable_filter input').unbind();
							$('#orderSearchTable_filter input').bind('keyup', function(e) {
							var filterData = $('#orderSearchTable_filter input').val();
							if(filterData.length == 0 || filterData.length >= 4 || e.keyCode == 13) {
								table.fnFilter(this.value);
							}
							});
							return nRow;
						},
					});

	
}

function callToSearchResultsForCourier91(searchTerm) {
	$('#orderSearchTable').parents('div.dataTables_wrapper').first().hide();
	$('#dukaan91SearchTable').parents('div.dataTables_wrapper').first().hide();
	
	var reportUrl = SITEBASEURL + "courier91OpsOrder/update-tracking-pickList-pagelist?searchTerm=" + searchTerm;
	var table = $('#courier91SearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"scrollX": true,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						}, {
							"sTitle" : "Courier Name",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						}, {
							"sTitle" : "Reg.Phone",
							"mData" : "addressDTO.contactNumber",
							"bSortable" : false
						}, {
							"sTitle" : "Address",
							"mData" : "addressDTO.address",
							"bSortable" : false
						},{
							"sTitle" : "CourierPartner",
							//"mData" : "courierPartner",
							"bSortable" : false,
							"render": function (courierPartner, type, row) {
						        if (row.courierPartner == null) {
						            return "";
						         }
						         else {
						            return row.courierPartner;
						      }
							}
						}, {
							"sTitle" : "Identifier",
							"mData" : "identifier",
							"bSortable" : false
						},
 						
						{
							"sTitle" : "Action",
							"bSortable" : false,
							"render": function (courierPartner, type, row) {
						        if (row.courierPartner == '' || row.courierPartner == null) {
						            	return '-';
						            }
						        else{
						        	var identifier = "'"+row.identifier+"'";
						        	return  '<div id="updateTrackingNumber" class="btn btn-custom" style="background:#008CBA; color:white; border: none;padding: 7px 18px" onclick="updateTrackingNumber('+identifier+')">Update Tracking</div>';
						        }
						          
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

function callToSearchResultsForDukaan91(searchTerm) {
	$('#orderSearchTable').parents('div.dataTables_wrapper').first().hide();
	$('#courier91SearchTable').parents('div.dataTables_wrapper').first().hide();
	
	var reportUrl = SITEBASEURL + "dukan91OpsOrder/update-tracking-pickList-pagelist?searchTerm=" +searchTerm;
	var table = $('#dukaan91SearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"scrollX": true,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						}, {
							"sTitle" : "Name",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						}, {
							"sTitle" : "Reg.Phone",
							"mData" : "addressDTO.contactNumber",
							"bSortable" : false
						}, {
							"sTitle" : "Address",
							"mData" : "addressDTO.address",
							"bSortable" : false
						},{
							"sTitle" : "CourierPartner",
							//"mData" : "courierPartner",
							"bSortable" : false,
							"render": function (courierPartner, type, row) {
						        if (row.courierPartner == null) {
						            return "";
						         }
						         else {
						            return row.courierPartner;
						      }
							}
						}, {
							"sTitle" : "Identifier",
							"mData" : "identifier",
							"bSortable" : false
						}, {
							"sTitle" : "Action",
							"bSortable" : false,
							"render": function (courierPartner, type, row) {
						        if (row.courierPartner == '' || row.courierPartner == null) {
						            	return '-';
						            }
						        else{
						        	var identifier = "'"+row.identifier+"'";
						        	return  '<div id="updateTrackingNumber" class="btn btn-custom" style="background:#008CBA; color:white; border: none;padding: 7px 18px" onclick="updateTrackingNumber('+identifier+')">Update Tracking</div>';
						        }
						          
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

function callToSearchResultsForCM91(searchTerm) {
	$('#orderSearchTable').parents('div.dataTables_wrapper').first().hide();
	$('#courier91SearchTable').parents('div.dataTables_wrapper').first().hide();
	
	var reportUrl = SITEBASEURL + "community91OpsOrder/update-tracking-pickList-pagelist?searchTerm=" +searchTerm;
	var table = $('#dukaan91SearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"scrollX": true,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						}, {
							"sTitle" : "Name",
							"mData" : "addressDTO.personName",
							"bSortable" : false
						}, {
							"sTitle" : "Reg.Phone",
							"mData" : "addressDTO.contactNumber",
							"bSortable" : false
						}, {
							"sTitle" : "Address",
							"mData" : "addressDTO.address",
							"bSortable" : false
						},{
							"sTitle" : "CourierPartner",
							//"mData" : "courierPartner",
							"bSortable" : false,
							"render": function (courierPartner, type, row) {
						        if (row.courierPartner == null) {
						            return "";
						         }
						         else {
						            return row.courierPartner;
						      }
							}
						}, {
							"sTitle" : "Identifier",
							"mData" : "identifier",
							"bSortable" : false
						}, {
							"sTitle" : "Action",
							"bSortable" : false,
							"render": function (courierPartner, type, row) {
						        if (row.courierPartner == '' || row.courierPartner == null) {
						            	return '-';
						            }
						        else{
						        	var identifier = "'"+row.identifier+"'";
						        	return  '<div id="updateTrackingNumber" class="btn btn-custom" style="background:#008CBA; color:white; border: none;padding: 7px 18px" onclick="updateTrackingNumber('+identifier+')">Update Tracking</div>';
						        }
						          
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
function updateTrackingNumber(orderId){
	 window.location.href = SITEBASEURL + 'mall91OpsOrder/update-tracking-number/'+orderId;
	 
}
