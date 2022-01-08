$(document).ready(function() {
	callToResults();

});
function callToResults() {
	var reportUrl = SITEBASEURL + "reward/couponSettinglisting";
	var table = $('#groupBuyTable')
			.dataTable(
					{
						"destroy" : true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [ {
							"sTitle" : "#",
							"mData" : "id",
							"bSortable" : false
						}, {
							"sTitle" : "Application",
							"mData" : "applicationName",
							"bSortable" : false
						}, {
							"sTitle" : "Minimum Order Amount",
							"mData" : "minimumOrderAmount",
							"bSortable" : false
						}, {
							"sTitle" : "Discounted Amount",
							"mData" : "discountedAmount",
							"bSortable" : false
						}, {
							"sTitle" : "Start Date",
							"mData" : "fromDate",
							"bSortable" : false
						}, {
							"sTitle" : "End Date",
							"mData" : "toDate",
							"bSortable" : false
						}, {
							"sTitle" : "Payment Method",
							"mData" : "paymentMethod",
							"bSortable" : false
						}, {
							"sTitle" : "Status",
							"mData" : "couponStatus",
							"bSortable" : false
						},{
			                "sTitle": "Action",
			                "bSortable": false,
			                "sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'></a></h5>"
			            } ],
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
			$(this).addClass('text-default').append('<input class="btn btn-danger" type="button" value="Mark/ INACTIVE">');
    		$(this).on('click', function() {
    			if (confirm('are you sure want to Mark Inactive this Record?')) {
    			var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'reward/couponSetting/markInactive/' + data.id;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    			}
    		});
    	});
    });
}
