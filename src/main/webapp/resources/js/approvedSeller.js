$(document).ready(function() {

	var pageStatus = $("#status").val();

	if (pageStatus == 0) {
		callToResults();
	} else {
		callToSearchResults();
	}

	function callToResults() {

		var reportUrl = SITEBASEURL + "seller-request/approved-pagelist";
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
			},
			{
				"sTitle": "Status",
				"bSortable": false,
				"render": function (callsCount, type, row) {
			        if (row.isDeleted == false) {
			            return "ACTIVE";
			            }
			            else {
			            	return "INACTIVE";
			       }
				}
			},{
				"sTitle": "Action",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-edit'></a>"
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
											var path = SITEBASEURL
													+ 'seller-request/get/'
													+ data.id+'/'+ false;
											$(
													"<form action='"
															+ path
															+ "'></form>")
													.appendTo(
															'body')
													.submit();
										});
					});
			$(".dt-edit").each(function() {
	    		$(this).empty();
	    		var table = $('#withdrawalTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			if(data.isDeleted == false){
    				$(this).addClass('text-default').append('<input class="btn btn-danger" type="button" value="Mark/ INACTIVE">');
    			} else {
    				$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Mark/ ACTIVE">');
    			}
	    		
	    		$(this).unbind().on('click', function() {
	    			var table = $('#withdrawalTable').DataTable();
	    			var data = table.row($(this).parents('tr')).data();
	    			var status;
	    			if(data.isDeleted == false){
	    				status ="INACTIVE";
	    			} else {
	    				status = "ACTIVE";
	    			}
	    			var path = SITEBASEURL + 'seller-request/active-inactive/' + data.id+"/"+ status;
	    			$("<form action='" + path + "'></form>").appendTo('body').submit();
	    		});
	    	});
			
		});

	}
});

function callToSearchResults() {
	try{
		$("#withdrawalTable_wrapper").html("");
	}
	catch (e) {
		// alert("error here");
	}
	
	var reportUrl = SITEBASEURL + "seller-request/approved-pagelist";
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
		},
		{
			"sTitle": "Status",
			"bSortable": false,
			"render": function (callsCount, type, row) {
		        if (row.isDeleted == false) {
		            return "ACTIVE";
		            }
		            else {
		            	return "INACTIVE";
		       }
			}
		},{
			"sTitle": "Action",
			"bSortable": false,
			"sDefaultContent": "<a class='dt-edit'></a>"
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
										var path = SITEBASEURL
												+ 'seller-request/get/'
												+ data.id+'/'+ false;
										$(
												"<form action='"
														+ path
														+ "'></form>")
												.appendTo(
														'body')
												.submit();
									});
				});
	    	
		$(".dt-edit").each(function() {
	    		$(this).empty();
	    		var table = $('#withdrawalSearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			if(data.isDeleted == false){
    				$(this).addClass('text-default').append('<input class="btn btn-danger" type="button" value="Mark/ INACTIVE">');
    			} else {
    				$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Mark/ ACTIVE">');
    			}
	    		
	    		$(this).unbind().on('click', function() {
	    			var table = $('#withdrawalSearchTable').DataTable();
	    			var data = table.row($(this).parents('tr')).data();
	    			var status;
	    			if(data.isDeleted == false){
	    				status ="INACTIVE";
	    			} else {
	    				status = "ACTIVE";
	    			}
	    			var path = SITEBASEURL + 'seller-request/active-inactive/' + data.id+"/"+ status;
	    			$("<form action='" + path + "'></form>").appendTo('body').submit();
	    		});
	    	});

	});
}