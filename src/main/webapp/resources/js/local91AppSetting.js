$(document).ready(function() {
	callToResults();
});

function callToResults() {
	var reportUrl = SITEBASEURL + "local91Product/appSettingList";
	var table = $('#groupBuyTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : false,
						"bFilter" : false,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"language" : {
							"processing" : "<i class='fa fa-refresh fa-spin'></i>",
						},
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								}, 
								{
									"sTitle" : "Design Style",
									"mData" : "designStyle",
									"bSortable" : false

								},
								{
									"sTitle" : "Action",
									"bSortable" : false,
									"sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'></a></h5>"
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
	
	$("#groupBuyTable").on('draw.dt', function() {
        $(".dt-edit").each(function() {
        	$(this).empty();
    		var table = $('#groupBuyTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Change Style">');
			var style='';
			if(data.designStyle=='LIST_VIEW'){
				style='GRID VIEW';
			}
			if(data.designStyle=='GRID_VIEW'){
				style='LIST VIEW';
			}
            $(this).unbind().on('click', function() {
            	if (confirm('are you sure want to Change App Style in '+style+'?')) {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'local91Product/update-app-setting/' + data.id+"/"+data.designStyle;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            	}
            });
        });


    });

}
