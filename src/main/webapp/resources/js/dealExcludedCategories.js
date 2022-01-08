$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "seller/deal/dealExcludedCategoryDataList";
		var table = $('#dealExcludedCategoriesTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bFilter": false,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			},
			{
				"sTitle": "Category",
				"mData": "categoryName",
				"bSortable": false
			},
			{
				"sTitle": "Status",
				"bSortable": false,
				render : function(data, status, row, meta) {
					if(row.status == true){
						return "ACTIVE";
					} else {
						return "INACTIVE";	
					}
				}
			},
			{
				"sTitle" : "Action",
				"bSortable" : false,
				render : function(data, status, row, meta) {
					if(row.status == true){
						return "<span><a class='dt-remove'></a></span>";
					} else {
						return "<span><a class='dt-add'></a></span>";	
					}
				}
			}
			],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});
		
		$("#dealExcludedCategoriesTable").on('draw.dt', function() {
			console.log($("#isOperationUser").val());
			if($("#isOperationUser").val() == "true"){
	        	table.api().column(3).visible(true);
	        } else {
	    		table.api().column(3).visible(false);
	    	}
			
			$(".dt-remove").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-danger' style='display:float:left;'>REMOVE</button><a class='dt-action'></a>");
						$(this).on('click', function() {
								var table = $('#dealExcludedCategoriesTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								var path = SITEBASEURL+ 'seller/deal/exclude/category/update/status/'+ data.id+"/"+false;
								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
							});
					});
			
			$(".dt-add").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<button class='btn btn-warning' style='display:float:left;'>ADD</button><a class='dt-action'></a>");
						$(this).on('click', function() {
								var table = $('#dealExcludedCategoriesTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								var path = SITEBASEURL+ 'seller/deal/exclude/category/update/status/'+ data.id+"/"+true;
								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
							});
					});
		});

}
