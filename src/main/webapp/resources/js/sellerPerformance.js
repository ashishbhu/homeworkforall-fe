$(document).ready(function() {
	//callToSearchResults();
});

function callToSearchResults() {
	var sellerId = $("#sellerId").val();
	if(sellerId == null || sellerId == 'undefined'){
		sellerId = '';
	}
	var reportUrl = SITEBASEURL + "seller/sla/performanceList?month="+ $("#month").val() + "&year="+ $("#year").val() +"&sellerId="+sellerId;
	var table = $('#sellerPerformanceTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": false,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "SellerNickName",
			"bSortable": false,
			"render": function (sellerNickName, type, row) {
		        if (row.sellerNickName == null) {
		            return "";
		            }
		            else {
		            	return row.sellerNickName;
		            }
			}
		}, {
			"sTitle": "PerformanceParameter",
			"mData": "performanceParameter",
			"bSortable": false
		},{
			"sTitle": "StartDate",
			"mData": "startDate",
			"bSortable": false
		},{
			"sTitle": "EndDate",
			"mData": "endDate",
			"bSortable": false
		}, {
			"sTitle": "Duration",
			"mData": "duration",
			"bSortable": false
		}, {
			"sTitle": "Marks",
			//"mData": "marks",
			"bSortable": false,
			"render": function (data, type, row, meta) {
		         return row.marks +"/"+ row.maxMarks;
			}
		}, {
			"sTitle": "Penalty",
			//"mData": "penalty",
			"bSortable": false,
			render : function(data, type, row, meta) {
				return '<a href="' + SITEBASEURL
						+ 'seller/sla/penalty/'
						+ row.id+"?sellerId="+sellerId+"&month="+ $("#month").val() + "&year="+ $("#year").val()
						+ '">' + row.penalty
						+ '</a>';
			}
		}
		/*, {
			"sTitle": "Action",
			"bSortable": false,
			"sDefaultContent": "<a class='dt-view'></a>"
		}*/
		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});
	

		$("#sellerPerformanceTable")
			.on(
					'draw.dt',
					function() {

						$(".dt-view")
								.each(
										function() {
											$(this).empty();
											$(this)
													.addClass('text-default')
													.append(
															"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
											$(this)
											.unbind()
													.on(
															'click',
															function() {
																var table = $(
																		'#sellerPerformanceTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();
																/*var path = SITEBASEURL
																		+ 'seller/sla/penalty/'
																		+ data.id+"/"+$("#sellerId").val();*/
																showPenalty(data.id);
																/*$(
																		"<form action='"
																				+ path
																				+ "'></form>")
																		.appendTo(
																				'body')
																		.submit();*/
															});
										});
					});
	
}

function showPenalty(performanceMatrixId) {
	var url = SITEBASEURL+ 'seller/sla/penalty/'+ performanceMatrixId+"?sellerId="+$("#sellerId").val()+"&month="+ $("#month").val() + "&year="+ $("#year").val();
	window.open(url, '_self');
}