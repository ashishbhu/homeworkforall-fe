$(document).ready(
		function() {
			
			$("section.content-header h1").html("User Orders count ");
			callToSearchResults();

			$("#search").click(function(){
				callToSearchResults();
			})
			
		});


		


function callToSearchResults() {
	
var reportUrl = SITEBASEURL + "user/userOrderListing?"
				+ "fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();
				
	$("#orderTable_wrapper").html("");
	var table = $('#userOrderTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,

						 "language": {
						 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
												    },
					    processing : true,
						"aoColumns" : [ 
							
						{
							"sTitle" : "#",
							"mData" : "userId",
							"bSortable" : false
						},
						{
							"sTitle" : "Name",
							"mData" : "userName",
							"bSortable" : false
						},
						{
							"sTitle" : "Phone",
							"mData" : "phone",
							"bSortable" : false
						},
						{
						"sTitle" : "TotalOrders",
						"bSortable" : false,
						"render" : function(totalOrdersCount, type,
								row) {
							
							if (row.totalOrdersCount != null && row.totalOrdersCount != '' ) {
								return  row.totalOrdersCount;

							} else {
								return "0";
							}

						}
					
						},
					
						{
							"sTitle" : "Delivered",
							//"mData" : "deliveredCount",
							"bSortable" : false,
							"render" : function(deliveredCount, type,
									row) {
								
								if (row.deliveredCount != null && row.deliveredCount != '' ) {
									return  row.deliveredCount;

								} else {
									return "0";
								}

							}
						},
						
						 {
							"sTitle" : "Dispatched",
						//	"mData" : "dispatchedCount",
							"bSortable" : false,
							"bSortable" : false,
							"render" : function(dispatchedCount, type,
									row) {
								
								if (row.dispatchedCount != null && row.dispatchedCount != '' ) {
									return  row.dispatchedCount;

								} else {
									return "0";
								}

							}
						}, 
						{
							"sTitle" : "RTO",
							//"mData" : "rtoCount",
							"bSortable" : false,
							"render" : function(rtoCount, type,
									row) {
								
								if (row.rtoCount != null && row.rtoCount != '' ) {
									return  row.rtoCount;

								} else {
									return "0";
								}

							}
						
							
						},
						
						 {
							"sTitle" : "Customer-Return",
							//"mData" : "cancelByUserCount",
							"bSortable" : false,
							"render" : function(customerReturnCount, type,
									row) {
								
								if (row.customerReturnCount != null && row.customerReturnCount != '' ) {
									return  row.customerReturnCount;

								} else {
									return "0";
								}

							}
						},
						{
							"sTitle" : "Order Disabled",
							"bSortable" : false,
							"sDefaultContent" :"<a class='update-order-disabled'></a>"
							
						}
						],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							$('#userOrderTable_filter input').unbind();
							$('#userOrderTable_filter input').bind('keyup', function(e) {
							var filterData = $('#userOrderTable_filter input').val();
							if( filterData.length == 0 || filterData.length >= 10 || e.keyCode == 13) {
								var searchVal = this.value;
								if(this.value.startsWith("0") ){
									searchVal= this.value.substr(1);
								}
							 if(this.value.startsWith("+91")){
								 searchVal= this.value.substr(3);
							}
							 if(this.value.startsWith("91")){
								 searchVal= this.value.substr(2);
							}
							
							 if(searchVal.length == 10 ||searchVal.length == 0 ){
								table.fnFilter(searchVal);
							 }
							}
							});
							return nRow;
						
						},
					});

	$("#userOrderTable")
			.on(
					'draw.dt',
					function() {
						
						$(".update-order-disabled")
						.each(
								function() {
									$(this).empty();
									var table = $('#userOrderTable').DataTable();
									var data = table.row($(this).parents('tr')).data();

									if(data.isOrderDisabled){
										$(this).addClass('text-default').append("<input type='checkbox' id=selectBox_"+data.userId+"  checked aria-hidden='true'></input>");
									} else {
										$(this).addClass('text-default').append("<input type='checkbox' id=selectBox_"+data.userId+" aria-hidden='true'></input>");
									}
									
									$(this).on('click',function() {
										
										var userId = data.userId;
										var status;
										if ($('#selectBox_'+userId).is(':checked')) {
											status = true;
										} else {
											status = false;
										}
										userOrderDisable(status,userId);
										/*var path = SITEBASEURL+ "user/update-disable-order/"+userId+"/"+status;
										$("<form action='"+ path+ "' ></form>").appendTo('body').submit();*/
									
									});
						 });
						
					});
}


function userOrderDisable(status,userId){
	 
      	var statisticsUrl = SITEBASEURL + 'user/update-disable-order/'+userId+"/"+status ;
      	var requestMethodType = "GET";
      	$.ajax({
      		url: statisticsUrl,
      		type: requestMethodType,
      		success:function(result){
      			document.getElementById("mes_div").style.display = "inline-block";
    			$("#mes_div").html(result);
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
          
     
	
	
	//window.location.href = SITEBASEURL +"user/update-disable-order/"+userId+"/"+status+"?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();
	
}

