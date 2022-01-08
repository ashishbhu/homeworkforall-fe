$(document).ready(function() {

	var pageStatus = $("#status").val();
	var pageType = $("#type").val();
	

	if (pageStatus == 0 || pageType==0) {
		callToResults();
	} else {
		callToSearchResults();
	}

	function callToResults() {
		var walletType = $("#walletType").val();
	    if($("#walletType").val() == undefined || $("#walletType").val() == null || $("#walletType").val() == 'undefined')
	    	{
		 walletType = "";
	    	}	
	    
	    

		var reportUrl = SITEBASEURL + "withDrawal/withdrawalListing?status=" +pageStatus+"&type="+pageType+"&phone="+$("#phone").val()+"&walletType="+walletType+"&forC91="+$("#forC91").val() ; ;
		var table = $('#withdrawalTable').dataTable({
			
			"bServerSide": true,
			"ordering": true,
			"bSearchable": true,
			"bFilter": false,
			"bStateSave": true,
			"sAjaxSource": reportUrl,
			"scrollX": true,
			"language": {
				 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
			    },
			    processing : true,
			    "aoColumns": [{
			    	"sTitle": "#",
			    	"mData": "id",
			    	"bSortable": false
			    },
			    {
			    	"sTitle": "Id",
			    	"mData": "withdrawalId",
			    	"bSortable": false
			    },
			    {
			    	"sTitle": "Name",
			    	"mData": "name",
			    	"bSortable": false
			    }, {
			    	"sTitle": "Reg.Phone",
			    	"mData": "regPhoneNumber",
			    	"bSortable": false
			    },{
			    	"sTitle": "Amount",
			    	"mData": "amount"
			    }, {
			    	"sTitle": "Status",
			    	"mData": "statusStr",
			    	"bSortable": false
			    },{
			    	"sTitle": "Type",
			    	"mData": "type"
			    }, {
			    	"sTitle": "Ph.Number",
			    	//"mData": "phoneNumber",
			    	"bSortable": false,
			    	"render": function (phoneNumber, type, row) {
			    		if (row.phoneNumber == null) {
			    			return "Payout not started";
			    		}
			    		else {
			    			return row.phoneNumber;
			    		}
			    	}
			    }, {
			    	"sTitle": "Date",
			    	"mData": "date",
			    	"bSortable": false
			    },
			    {
			    	"sTitle": "ETA",
			    	"mData": "etaDate",
			    	"bSortable": false
			    }
			    , 
			  
			    {
			    	"sTitle": "Approval Date",
			    	"mData": "withdrawalApprovalDate",
			    	"bSortable": false
			    },  {
					"sTitle": "Auto Approved",
					"mData": "isAutoApproved",
					"bSortable": false
				}
				,
			    {
			    	"sTitle": "Transaction Summary",
			    	"sDefaultContent": "<a class='dt-statsTransitions'></a>",
			    	"bSortable": false
			    },
			    {
			    	"sTitle": "History",
			    	/*"mData": "historyLink",*/
			    	"sDefaultContent": "<a class='dt-historyLink'></a>",
			    	"bSortable": false
			    },
			    {
			    	"sTitle": "",
			    	/*"mData": "walletHistoryLink",*/
			    	"sDefaultContent": "<a class='dt-walletHistoryLink'></a>",
			    	"bSortable": false
			    }
			    ],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});
		
		$("#withdrawalTable").on('draw.dt', function() {

			$(".dt-historyLink").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-credit-card' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'withDrawal/debitHistory/'  + data.userId ;
					$("<form action='" + path + "'target='_blank'></form>").appendTo('body').submit();
				});
			});
			$(".dt-walletHistoryLink").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					var path = SITEBASEURL + 'withDrawal/walletHistory/'+ data.userId + "/"+false;
					$("<form action='" + path + "'target='_blank'></form>").appendTo('body').submit();
				});
			});
			
			$(".dt-statsTransitions").each(function() {
				$(this).empty();
				$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
				$(this).unbind().on('click', function() {
					var table = $('#withdrawalTable').DataTable();
					var data = table.row($(this).parents('tr')).data();
					getStatusTransitions(data.id);
				});
			});

		});

	}

	$("#status").change(function() {
		callToSearchResults();
	});
	$("#type").change(function() {
		callToSearchResults();
	});


	$( "#clearState" ).click(function() {

		var table = $('#withdrawalSearchTable').DataTable();
		table.state.clear();
		try {
			var searchTable = $('#withdrawalTable').DataTable();
			searchTable.state.clear();
		} catch (e) {
			// alert("error here");
		}

		$("#status").val("0");
		$("#type").val("0");
		window.location.reload();
	});


});


function callToSearchResults() {
	var statusVal = $("#status").val();
	var typeVal = $("#type").val();
	try{
		$("#withdrawalTable_wrapper").html("");
	}
	catch (e) {
		// alert("error here");
	}
	var walletType = $("#walletType").val();
    if($("#walletType").val() == undefined || $("#walletType").val() == null || $("#walletType").val() == 'undefined')
    	{
	 walletType = "";
    	}	
    
    
	
	var reportUrl = SITEBASEURL + "withDrawal/withdrawalListing?status=" + $("#status").val()+"&type="+$("#type").val()+"&phone="+$("#phone").val()+"&walletType="+walletType+"&forC91="+$("#forC91").val() ;
	var table = $('#withdrawalSearchTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": true,
		"scrollX": true,
		"sAjaxSource": reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
		    },
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		},
		{
			"sTitle": "Id",
			"mData": "withdrawalId",
			"bSortable": false
		},
		
		{
			"sTitle": "Name",
			"mData": "name",
			"bSortable": false
		}, {
			"sTitle": "Reg.Phone",
			"mData": "regPhoneNumber",
			"bSortable": false,

		},{
			"sTitle": "Amount",
			"mData": "amount"
		}, {
			"sTitle": "Status",
			"mData": "statusStr",
			"bSortable": false
		},{
			"sTitle": "Type",
			"mData": "type"
		}, {
			"sTitle": "Ph.Number",
			//"mData": "phoneNumber",
			"bSortable": false,
			"render": function (phoneNumber, type, row) {
		        if (row.phoneNumber == null) {
		            return "Payout not started";
		            }
		            else {
		            	return row.phoneNumber;
		            }
			}
		}, {
			"sTitle": "Date",
			"mData": "date",
			"bSortable": false
		},
		{
			"sTitle": "ETA",
			"mData": "etaDate",
			"bSortable": false
		}
		, 
		{
			"sTitle": "Approval Date",
			"mData": "withdrawalApprovalDate",
			"bSortable": false
		},  {
			"sTitle": "Auto Approved",
			"mData": "isAutoApproved",
			"bSortable": false
		}
		,
		{
			"sTitle": "Transaction Summary",
			"sDefaultContent": "<a class='dt-statsTransitions'></a>",
			"bSortable": false
		},
		{
			"sTitle": "History",
			"mData": "historyLink",
			"bSortable": false
		},
		{
			"sTitle": "",
			"mData": "walletHistoryLink",
			"bSortable": false
		}
		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});
	
	$("#withdrawalSearchTable").on('draw.dt', function() {

		$(".dt-historyLink").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-credit-card' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'withDrawal/debitHistory/'  + data.userId ;
				$("<form action='" + path + "'target='_blank'></form>").appendTo('body').submit();
			});
		});
		$(".dt-walletHistoryLink").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'withDrawal/walletHistory/'+ data.userId + "/"+false;
				$("<form action='" + path + "'target='_blank'></form>").appendTo('body').submit();
			});
		});
		
		$(".dt-statsTransitions").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).unbind().on('click', function() {
				var table = $('#withdrawalSearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				getStatusTransitions(data.id);
			});
		});

	});

}

function bulkApprove(){
	var pageStatus = $("#status").val();
	if(Ids.length == 0){
		alert("Select check box!");
		return;
	}
	if (confirm('are you sure you want to approve this withdrawal request?')) {
		window.location.href = SITEBASEURL + "withDrawal/bulk-approve-withdrawal" +"/"+ Ids +"/"+ pageStatus;
		
	} else {
		return false;
	}
}
function bulkReject(){
	var pageStatus = $("#status").val();
	if(Ids.length == 0){
		alert("Select check box!");
		return;
	}
	if (confirm('are you sure you want to reject this withdrawal request?')) {
		window.location.href = SITEBASEURL + "withDrawal/bulk-reject-withdrawal" +"/"+ Ids +"/"+ pageStatus;
		
	} else {
		return false;
	}
}

function getStatusTransitions(id) {
	var sellerTicketUrl = SITEBASEURL + "withDrawal/fetchWithdrawalStateByWithdrawalId/"+ id;
	$("#modelBox").empty();
    $(".modal-body #modelBox").load(sellerTicketUrl);
    $('#scriptModal').modal('show');
}
