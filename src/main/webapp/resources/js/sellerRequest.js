$(document).ready(function() {
	
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "seller-request/pagelist?fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val();
		var table = $('#withdrawalTable').dataTable({
			"bProcessing": true,
			"bServerSide": true,
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
				"sTitle": "UserName",
				"mData": "userName",
				"bSortable": false
			},{
				"sTitle": "Phone",
				"mData": "phone"
			}, {
				"sTitle": "GST Number",
				"mData": "gstNumber",
				"bSortable": false
			},{
				"sTitle": "PanCard",
				"mData": "panCard"
			}, {
				"sTitle": "Store Name",
				"mData": "storeName",
				"bSortable": false
			}, {
				"sTitle": "createdAt",
				"mData": "createdAtDate",
				"bSortable": false
			},
			{
				"sTitle": "MainCategory",
				"bSortable": false,
				"render": function (mainCategory, type, row) {
			        if (row.mainCategory != null && row.mainCategory != '') {
			            return row.mainCategory;
			            }
			            else {
			            	return '';
			            }
				}
			},
			{
				"sTitle": "view",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-view'></a>"
			}, {
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
//											var path = SITEBASEURL
//													+ 'seller-request/get/'
//													+ data.id+'/'+ true;
//											$(
//													"<form action='"
//															+ path
//															+ "'></form>")
//													.appendTo(
//															'body')
//													.submit();
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
						if (confirm('are you sure you want to approve this Seller Request?')) {
							var table = $('#withdrawalTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
//							var path = SITEBASEURL + 'seller-request/approve-reject/' + data.id +"/"+true;
//							$("<form action='" + path + "'></form>").appendTo('body').submit();
							approveOrReject(data.id, true);
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
						if (confirm('are you sure you want to reject this Seller Request?')) {
							var table = $('#withdrawalTable').DataTable();
							var data = table.row($(this).parents('tr')).data();
//							var path = SITEBASEURL + 'seller-request/approve-reject/' + data.id +"/"+false;
//							$("<form action='" + path + "'></form>").appendTo('body').submit();
							approveOrReject(data.id, false);
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
	var reportUrl = SITEBASEURL + "seller-request/pagelist?fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val();
	var table = $('#withdrawalSearchTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
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
			"sTitle": "UserName",
			"mData": "userName",
			"bSortable": false
		},{
			"sTitle": "Phone",
			"mData": "phone"
		}, {
			"sTitle": "GST Number",
			"mData": "gstNumber",
			"bSortable": false
		},{
			"sTitle": "PanCard",
			"mData": "panCard"
		}, {
			"sTitle": "Store Name",
			"mData": "storeName",
			"bSortable": false
		},{
			"sTitle": "createdAt",
			"mData": "createdAtDate",
			"bSortable": false
		},
		{
			"sTitle": "MainCategory",
			"bSortable": false,
			"render": function (mainCategory, type, row) {
		        if (row.mainCategory != null && row.mainCategory != '') {
		            return row.mainCategory;
		            }
		            else {
		            	return '';
		            }
			}
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
//										var path = SITEBASEURL
//												+ 'seller-request/get/'
//												+ data.id+'/'+ true;
//										$(
//												"<form action='"
//														+ path
//														+ "'></form>")
//												.appendTo(
//														'body')
//												.submit();
										
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
					if (confirm('are you sure you want to approve this Seller Request?')) {
						var table = $('#withdrawalSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
//						var path = SITEBASEURL + 'seller-request/approve-reject/' + data.id +"/"+true;
//						$("<form action='" + path + "'></form>").appendTo('body').submit();
						 $('#approveBtn_'+data.id).attr("disabled", true);
						approveOrReject(data.id, true);
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
					if (confirm('are you sure you want to reject this Seller Request?')) {
						var table = $('#withdrawalSearchTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
//						var path = SITEBASEURL + 'seller-request/approve-reject/' + data.id +"/"+false;
//						$("<form action='" + path + "'></form>").appendTo('body').submit();
						approveOrReject(data.id, false);
					} else {
						return false;
					}
				});
			}

		});
	});
}

function viewDetails(id, fromPage){
	var url = SITEBASEURL + 'seller-request/get/' + id+'/'+ fromPage+'?fromDate='+$("#fromDate").val()+"&toDate="+$("#toDate").val();
	window.open(url, "_self");
}
function approveOrReject(id, approve){
	var url = SITEBASEURL + 'seller-request/approve-reject/' + id +"/"+approve+'?fromDate='+$("#fromDate").val()+"&toDate="+$("#toDate").val();
	window.open(url, "_self");
}