$(document).ready(
		function() {

			
			$("section.content-header h1").html("Fraud Detection Excluded Items");
			$("#promotion").removeClass("active");
			   $("#mall91").addClass("active");
			   $("#Dukaan91").removeClass("active");
			   $("#Courier91").removeClass("active");      
			   $("#Lenden91").removeClass("active");
			   $("#Community91").removeClass("active");
			   $("#local91").addClass("active");
			   $("#local91 li:nth-child(10)").addClass("active");   


			callToSearchResults();

		});



function callToSearchResults() {
	
	
var reportUrl = SITEBASEURL + "local91OpsOrder/pagelist-for-local91-fraud-detected-excluded-items";
				
	$("#itemTable_wrapper").html("");
	var table = $('#itemSearchTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,

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
							"sTitle" : "ItemId",
							"mData" : "itemId",
							"bSortable" : false
						},
						{
							"sTitle" : "ItemName",
							"mData" : "itemName",
							"bSortable" : false
						},
						{
		                    "sTitle": "Action",
		                    "bSortable": false,
		                    "sDefaultContent": "<h5><a class='dt-remove' style=margin-left:20px;></a></h5>"
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
	$("#itemSearchTable").on('draw.dt', function() {
		$(".dt-remove").each(function() {
            $(this).empty();
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to delete this record?')) {
                    var table = $('#itemSearchTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    deleteItemId(data.itemId);
                }
                else{
                    return false;
                }

            });
        });
	})
}

function deleteItemId(itemId){
	
	window.location.href = SITEBASEURL + 'local91OpsOrder/delete-fraud-detected-Excluded-item/'+itemId;
														
}