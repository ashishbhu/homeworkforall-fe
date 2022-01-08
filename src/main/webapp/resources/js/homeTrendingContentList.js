$(document).ready(
		function() {

			//$("section.content-header h1").html("<h3 id='Brand List'></h4> <h3 id='brandList'> </h4>");
			
			callToSearchResults();

			$("#search").click(function(){
				callToSearchResults();
			});
		
		});





function callToSearchResults() {
	
var reportUrl = SITEBASEURL + "content/listing-of-home-trending-content";
	
	
	var table = $('#homeContentTable')
			.dataTable(
					{
									
						"destroy":true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
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
								"mData" : "id",
								"bSortable" : false
							},
						 
						{
							"sTitle" : "Content Id",
							"mData" : "contentId",
							"bSortable" : false
						},
						{
							"sTitle" : "Content Title",
							"mData" : "contentTitle",
							"bSortable" : false
						},
						{
							"sTitle" : "Video URL",
							"mData" : "sourceURL",
							"visible": false,
						},
						 {
							"sTitle" : "#",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-remove' style=margin-left:20px;></a>"
						}/*,
						{
			                "sTitle": "Download",
			                "bSortable": false,
			                "sDefaultContent": "<h5><a class='dt-download'></a></h5>"
			            }*/
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

	$("#homeContentTable")
			.on(
					'draw.dt',
					function() {
						
						
						$(".dt-remove").each(function() {
				            $(this).empty();
				            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
				          
				            $(this).on('click', function() {
				                if (confirm('are you sure you want to delete this record?')) {
				                    var table = $('#homeContentTable').DataTable();
				                    var data = table.row($(this).parents('tr')).data();
				                   // callDelete( data.id);
				                    var path = SITEBASEURL
									+ 'content/delete-home-trending-content/'
									+ data.id ;
							$("<form action='"+ path+ "' ></form>").appendTo('body').submit();
				                }
				                else{
				                    return false;
				                }

				            });
				        });

						$(".dt-download").each(function() {
							$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-warning' style='display:float:left;'>Download</button>");
				            var table = $('#homeContentTable').DataTable();
				            $(this).on('click', function() {
				                var table = $('#homeContentTable').DataTable();
				                var data = table.row($(this).parents('tr')).data();
				                callToDownload(data.sourceURL);
				            });
				        });
						});	
}

function callToDownload(sourceURL)
{
	window.open(sourceURL, '_blank');
}

