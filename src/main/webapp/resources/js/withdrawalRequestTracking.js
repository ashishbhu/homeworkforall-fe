$(document).ready(function() {
	
	$( "#clearState" ).click(function() {

		var table = $('#withdrawalSearchTable').DataTable();
		table.state.clear();
		try {
			var searchTable = $('#withdrawalTable').DataTable();
			searchTable.state.clear();
		} catch (e) {
			// alert("error here");
		}

		window.location.reload();
	});
	callToResult();
		
});

function callToResult(){
	var reportUrl = SITEBASEURL + "withDrawal/withdrawalRequestTackingListing?fromDate=" +$('#fromDate').val()+"&toDate="+$("#toDate").val();
	var table = $('#withdrawalTable').dataTable({
		
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": true,
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
		},{
			"sTitle": "",
			"mData": "userId",
			"visible": false,
		},{
			"sTitle": "Name",
			"mData": "userName",
			"bSortable": false
		}, {
			"sTitle": "Phone Number",
			"mData": "phone",
			"bSortable": false
		},{
			"sTitle": "Amount",
			"mData": "amount",
			"bSortable": false
		},{
			"sTitle": "WalletBalance",
			"mData": "walletBalance",
			"bSortable": false
		},{
			"sTitle": "WithDrawalType",
			"mData": "withDrawalType",
			"bSortable": false
			
		},{
			"sTitle": "WithDrawlRequestStatus",
			"mData": "withDrawlRequestStatus",
			"bSortable": false
		},{
			"sTitle": "mei",
			"mData": "mei",
			"bSortable": false
		},{
			"sTitle": "Reason",
			"mData": "reason",
			"bSortable": false
		}
		/*,{
			"sTitle" : "Wallet Detail",
			"bSortable" : false,
			"sDefaultContent" : "<h4><a class='dt-view'></a></h4>"
		}*/
		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});
	
/*	$("#withdrawalTable").on('draw.dt', function() {
        $(".dt-view").each(function() {
           $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
          
           var table = $('#withdrawalTable').DataTable();
           $(this).on('click', function() {
               var table = $('#withdrawalTable').DataTable();
               var data = table.row($(this).parents('tr')).data();
               callToViewItem(data.userId, data.userName, data.phoneNumber);
            });
       });
	});*/
}

/*function callToViewItem(userId, userName, phoneNumber) {
	window.open(SITEBASEURL + "withDrawal/get-withdrawal-detail-history/"
			+ userId + "?fromDate=" + $('#fromDate').val() + "&toDate="
			+ $("#toDate").val() + "&userName=" + userName + "&phoneNumber="
			+ phoneNumber, '_blank');
}*/

function callToSearchResults(fromDate, toDate) {
	
	$("#withdrawalTable_wrapper").html("");
	var reportUrl = SITEBASEURL + "withDrawal/withdrawalRequestTackingListing?fromDate=" +$('#fromDate').val()+"&toDate="+$("#toDate").val();
	var table = $('#withdrawalSearchTable').dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": true,
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
		},{
			"sTitle": "",
			"mData": "userId",
			"visible": false,
		},{
			"sTitle": "Name",
			"mData": "userName",
			"bSortable": false
		}, {
			"sTitle": "Phone Number",
			"mData": "phone",
			"bSortable": false
		},{
			"sTitle": "Amount",
			"mData": "amount",
			"bSortable": false
		},{
			"sTitle": "WalletBalance",
			"mData": "walletBalance",
			"bSortable": false
		},{
			"sTitle": "WithDrawalType",
			"mData": "withDrawalType",
			"bSortable": false
			
		},{
			"sTitle": "WithDrawlRequestStatus",
			"mData": "withDrawlRequestStatus",
			"bSortable": false
		},{
			"sTitle": "mei",
			"mData": "mei",
			"bSortable": false
		},{
			"sTitle": "Reason",
			"mData": "reason",
			"bSortable": false
		}/*,{
			"sTitle" : "Wallet Detail",
			"bSortable" : false,
			"sDefaultContent" : "<h4><a class='dt-view'></a></h4>"
		}*/
		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});
	
/*	$("#withdrawalSearchTable").on('draw.dt', function() {
        $(".dt-view").each(function() {
        	$(this).empty();
           $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
          
           var table = $('#withdrawalSearchTable').DataTable();
           $(this).on('click', function() {
               var table = $('#withdrawalSearchTable').DataTable();
               var data = table.row($(this).parents('tr')).data();
               callToViewItem(data.userId, data.userName, data.phoneNumber);
            });
       });
	});
	
	$('.dataTable').on('click', 'tbody tr', function() {
		var table = $('#withdrawalSearchTable').DataTable();
        var data = table.row(this).data();
        callToViewItem(data.userId, data.userName, data.phoneNumber);
		});*/
}
