$(document).ready(
		function() {

			//$("section.content-header h1").html("<h3 id='Brand List'></h4> <h3 id='brandList'> </h4>");
			
			$("#promotion").removeClass("active");
            $("#mall91").addClass("active");
            $("#mall91 li:nth-child(20)").addClass("active");
            $("#Courier91").removeClass("active");
            $("#Dukaan91").removeClass("active");
            $("#Lenden91").removeClass("active");
			
			callToSearchResults();

				/*$("#search").click(function() {
						callToSearchResults();
					});*/

		});


function callToSearchResults() {
	
var reportUrl = SITEBASEURL + "brandService/get-all-brands-listing";
	
	$("#brandTable_wrapper").html("");
	var table = $('#brandSearchTable')
			.dataTable(
					{
						"destroy" : true,					
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : false,
						"sAjaxSource" : reportUrl,
						"scrollX": true,
						 "language": {
							 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
						    },
						    processing : true,
						
						"aoColumns" : [ 
							{
								"sTitle" : "#",
								"mData" : "countId",
								"bSortable" : false
							},{
							"sTitle" : "",
							"mData" : "id",
							"visible": false,
						}, 
						{
							"sTitle" : "Name",
							"mData" : "name",
							"bSortable" : false
						},
						{
							"sTitle" : "Logo",
							"mData" : "brandLogo",
							"render" : function(
									imageUrl, type, row) {
								if (row.brandLogo == 'null'
										|| row.brandLogo == undefined) {
									return " ";
								} else {
									return "<a target='_blank' href="
											+ row.brandLogo
											+ "><img src="
											+ row.brandLogo
											+ " height='40px' width='40px'></a>";
								}
							}
						},
						 {
							"sTitle" : "Rank",
							"mData" : "rank",
							"bSortable" : false
						},
						 {
							"sTitle" : "Status",
							"mData" : "status",
							"bSortable" : false
						}						
						, {
							"sTitle" : "",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-edit-n'><a class='dt-remove' style=margin-left:20px;></a>"
						}
						],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							
							/*$('#brandSearchTable_filter input').unbind();
							$('#brandSearchTable_filter input').bind('keyup', function(e) {
							var filterData = $('#brandSearchTable_filter input').val();*/
							/*if(filterData.length == 0 || filterData.length >= 4 || e.keyCode == 13) {
								table.fnFilter(this.value);
							}*/
							//});
							return nRow;
						},
					});

	$("#brandSearchTable")
			.on(
					'draw.dt',
					function() {
						$(".dt-edit-n")
								.each(
										function() {
											$(this).empty();
											$(this)
													.addClass('text-default')
													.append(
															"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
											
											var table = $('#brandSearchTable').DataTable();
								    		var data = table.row($(this).parents('tr')).data();
								    		if(data.matchedPerWithRTOAddress >= 50)
							    			{
							    				$(this).parents('tr').css('background', '#FFA07A');
							    			}
											$(this)
											.unbind()
											.on(
													'click',
													function() {
														var table = $(
														'#brandSearchTable')
														.DataTable();
														var data = table
														.row(
																$(
																		this)
																		.parents(
																				'tr'))
																				.data();
														
														callEdit( data.id);
													});
										});
						
						$(".dt-remove").each(function() {
				            $(this).empty();
				            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
				          
				            $(this).on('click', function() {
				                if (confirm('are you sure you want to delete this record?')) {
				                    var table = $('#brandSearchTable').DataTable();
				                    var data = table.row($(this).parents('tr')).data();
				                    callDelete( data.id);
				                }
				                else{
				                    return false;
				                }

				            });
				        });
						});
}
function callEdit(id){
	
	window.location.href = SITEBASEURL + 'brandService/get-brand-by-id/'+id;
														
}

function callDelete(id){
	
	window.location.href = SITEBASEURL + 'brandService/delete-brand/'+id;
														
}





