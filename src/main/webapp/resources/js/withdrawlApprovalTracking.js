$(document).ready(function() {

	$("section.content-header h1").html("Track Approval Click");
	$("#promotion").removeClass("active");
    $("#withdrawal").addClass("active");
    $("#withdrawal li:nth-child(8)").addClass("active");
	
		var reportUrl = SITEBASEURL + "withDrawal/find-withdrawl-approval-tracking";
		var table = $('#withdrawalApprovalTrack').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			"bSearchable": true,
			"bFilter": true,
			"bStateSave": true,
			"sAjaxSource": reportUrl,
			"aoColumns": [ 
			{
					"sTitle": "#",
					"mData": "id",
					"bSortable": false
			},{
				"sTitle": "From Amout",
				"mData": "fromAmount",
				"bSortable": false
			},{
				"sTitle": "To Amout",
				"mData": "toAmount",
				"bSortable": false
			}, {
				"sTitle": "From Date",
				"mData": "fromDate",
				"bSortable": false
			},
			 {
				"sTitle": "to Date",
				"mData": "toDate",
				"bSortable": false
			},{
				"sTitle": "Pending Amount",
				"mData": "pendingAmount",
				"bSortable": false
			}],
			
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});

	});


