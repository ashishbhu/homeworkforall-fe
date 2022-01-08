$(document).ready(function() {
	//callToResults();
});

function callToResults() {
	var sellerId = $("#sellerId").val();
	if(sellerId == null){
		sellerId = '';
	}
	var minDays = $("#minDays").val();
	var maxDays = $("#maxDays").val();
	var status = $("#status").val();
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var reportUrl = SITEBASEURL + "mall91OpsOrder/order/dispatch/performance/data?sellerId="+sellerId+"&fromDate="+fromDate+"&toDate="+toDate+"&status="+status+"&minDays="+minDays+"&maxDays="+maxDays;
	var table = $('#productRatingsTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"sAjaxSource" : reportUrl,
						"language" : {
							"processing" : "<i class='fa fa-refresh fa-spin'></i>",
						},
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								}, 
								{
									"sTitle" : "OrderId",
									//"mData" : "orderId",
									"bSortable" : false,
									render : function(data, type, row, meta) {
										return '<a href="' + SITEBASEURL
												+ 'mall91OpsOrder/get/'
												+ row.orderId
												+ '" target="_blank">' + row.orderId
												+ '</a>';
									}

								},
								{
									"sTitle" : "Order Date",
									"mData" : "orderDate",
									"bSortable" : false
								},
								{
									"sTitle" : "State",
									"mData" : "orderState",
									"bSortable" : false
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
	
	$("#productRatingsTable").on('draw.dt', function() {
		$(".dt-comments").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).on('click', function() {
				var table = $('#productRatingsTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				getComments(data.productId);
			});
		});
	});
}

function getComments(productId) {
	var commentsUrl = SITEBASEURL + "mall91Product/product/comments/"+productId;
	var requestMethodType = "GET";
	$.ajax({
		url : commentsUrl,
		type : requestMethodType,
		contentType : "application/json",
		dataType : "json",
		success :  function(result)
		{ 
		  showComments(result) 
		},
		error : function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.responseText !== '') {
				var r = jQuery.parseJSON(jqXHR.responseText);
				$("#reportWrapper").html(r.message).addClass("error");
			} else {
				$("#reportWrapper").html(jqXHR.statusText).addClass(
						"error");
			}

		}
	});
}

function showComments(result){
	$('#scriptModal').modal('show');
	$("#modelBox").empty();
	if(result != null){
	for(var i in result){
		var statusData = result[i];
		$('<div id="div1_'+i+'" style="border:1px solid;  border-radius: 5px; margin-top:10px; background-color: white; height:auto; padding:5px;">').appendTo('#modelBox');
		$('<div class="form-group"><label class="col-sm-2 control-label">Comments:</label><div class="col-sm-10"><textarea rows="4" cols="50" style="resize: none; border: 0px none; background:white;" class="form-control" readonly="true" id="message_'+i+'"></div></div>').appendTo('#div1_'+i);
		$('<div class="form-group"><label class="col-sm-2 control-label">User:</label><div class="col-sm-6"><input type="text" class="form-control" style="border: 0px none; background:white;" readonly="true" id="user_'+i+'"></div><div class="col-sm-6"><input type="text" class="form-control" style="border: 0px none; background:white; margin-left:85px;" readonly="true" id="date_'+i+'"></div></div>').appendTo('#div1_'+i);
		//$('<div class="form-group"><label class="col-sm-2 control-label">Date:</label><div class="col-sm-6"><input type="text" class="form-control" style="border: 0px none; background:white;" readonly="true" id="date_'+i+'"></div></div>').appendTo('#div1_'+i);
		
		
		$("#message_"+i).val(statusData.comments);
		$("#date_"+i).val(statusData.date);
		$("#user_"+i).val(statusData.userName);
		
	}
	} else {
		$('<div id="div" style="border:1px solid;  border-radius: 5px; margin-top:10px; background-color: #faf9f7; height:100px; padding:5px;">').appendTo('#modelBox');
		$('<span style="float: right; font-weight: 900; color:red;">Comments not found.</span>').appendTo('#div');
	}
	
}
