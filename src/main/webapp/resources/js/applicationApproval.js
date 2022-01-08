$(document).ready(function() {
	$("#status").change(function() {
		callToSearchResults();
	});
});

	function callToResults() {
		var reportUrl = SITEBASEURL + "application/get-application-list-for_approval/"+$("#status").val();
		var table = $('#withdrawalTable').dataTable({
			"bProcessing": true,
			"bServerSide": false,
			"ordering": true,
			"bSearchable": true,
			"bFilter": true,
			"bStateSave": true,
			"scrollX": true, 
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			}, {
				"sTitle": "Name",
				"mData": "name",
				"bSortable": false
			},{
				"sTitle": "URL",
				"mData": "applicationURL"
			}, {
				"sTitle": "Category",
				"mData": "categoryUI",
				"bSortable": false
			},{
				"sTitle": "Status",
				"mData": "status"
			},
			{
				"sTitle": "view",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-view'></a>"
			}, {
				"sTitle": "",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-approve'></a>"
			}
			, {
				"sTitle": "",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-reject'></a>"
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
			
			$(".dt-view")
			.each(
					function() {
						$(this)
								.addClass(
										'text-default')
								.append(
										"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
						$(this)
								.on(
										'click',
										function() {
											var table = $(
													'#withdrawalTable')
													.DataTable();
											var data = table
													.row(
															$(
																	this)
																	.parents(
																			'tr'))
													.data();
											viewDetails(data.id, true);
										});
					});
			
			
			$(".dt-approve").each(function() {
				var table = $('#withdrawalTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				if(data.status == 'PENDING')
				{
					$(this).addClass('text-default').append("<button class='btn btn-custom'>Approve </button>");
					$(this).on('click', function() {
						if (confirm('are you sure you want to approve this Application?')) {
							var table = $('#withdrawalTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							approveOrReject(data.id, 'APPROVED');
						} else {
							return false;
						}
					});
				}
			});

			$(".dt-reject").each(function() {
				var table = $('#withdrawalTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				if(data.status == 'PENDING')
				{
					$(this).append("<button class='btn btn-custom'> Reject</button>");
					$(this).on('click', function() {
						if (confirm('are you sure you want to reject this Application?')) {
							var table = $('#withdrawalTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
							approveOrReject(data.id, 'REJECTED');
						} else {
							return false;
						}
					});
				}

			});
		});

	}

function callToSearchResults() {
	try{
		$("#withdrawalTable_wrapper").html("");
	}
	catch (e) {
		// alert("error here");
	}
	var reportUrl = SITEBASEURL + "application/get-application-list-for_approval/"+$("#status").val();
	var table = $('#withdrawalSearchTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": false,
		"ordering": true,
		"bSearchable": true,
		"bFilter": true,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "Name",
			"mData": "name",
			"bSortable": false
		},{
			"sTitle": "URL",
			"mData": "applicationURL"
		}, {
			"sTitle": "Category",
			"mData": "categoryUI",
			"bSortable": false
		},{
			"sTitle": "status",
			"mData": "status"
		},
		{
			"sTitle": "view",
			"bSortable": false,
			"sDefaultContent": "<a class='dt-view'></a>"
		}
		, {
			"sTitle": "Action",
			"bSortable": false,
			"sDefaultContent": "<a class='dt-approve'></a>"
		}
		, {
			"sTitle": "Action",
			"bSortable": false,
			"sDefaultContent": "<a class='dt-reject'></a>"
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
		
		
		$(".dt-view")
		.each(
				function() {
					$(this).empty();
					$(this)
							.addClass(
									'text-default')
							.append(
									"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
					$(this)
							.on(
									'click',
									function() {
										var table = $(
												'#withdrawalSearchTable')
												.DataTable();
										var data = table
												.row(
														$(
																this)
																.parents(
																		'tr'))
												.data();
										
										viewDetails(data.id, true);
									});
				});
		
		
		$(".dt-approve").each(function() {
			$(this).empty();
			var table = $('#withdrawalSearchTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.status == 'PENDING')
			{
				$(this).addClass('text-default').append("<button class='btn btn-custom' id=approveBtn_"+data.id+">Approve </button>");
				$(this).on('click', function() {
					if (confirm('are you sure you want to approve this Application?')) {
						var table = $('#withdrawalSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						 $('#approveBtn_'+data.id).attr("disabled", true);
						approveOrReject(data.id, 'APPROVED');
					} else {
						return false;
					}
				});
			}
		});

		$(".dt-reject").each(function() {
			$(this).empty();
			var table = $('#withdrawalSearchTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.status == 'PENDING')
			{
				$(this).append("<button class='btn btn-custom'> Reject</button>");
				$(this).on('click', function() {
					if (confirm('are you sure you want to reject this Application?')) {
						var table = $('#withdrawalSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						approveOrReject(data.id, 'REJECTED');
					} else {
						return false;
					}
				});
			}

		});
	});
}


	
function viewDetails(id, fromPage){
	var url = SITEBASEURL + 'application/get/' + id +'?fromApproval=true&status='+$("#status").val();
	window.open(url, "_self");
}
function approveOrReject(id, status){
	var url = SITEBASEURL + 'application/approve-reject/' + id +"/"+status;
	window.open(url, "_self");
}