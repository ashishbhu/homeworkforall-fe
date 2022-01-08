$(document).ready(function() {
	callToSearchResults();
});

function callToSearchResults() {
	var reportUrl = SITEBASEURL + "appTransaction/referralsList";
	var table = $('#lenden91SearchTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "Business Name",
			"mData": "businessName",
			"bSortable": false
		},{
			"sTitle": "Contact Number",
			"mData": "contactNumber",
			"bSortable": false
		},{
			"sTitle": "Address",
			"mData": "address",
			"bSortable": false
		}, {
			"sTitle": "Pin Code",
			"mData": "pincode",
			"bSortable": false
		}, {
			"sTitle": "Referrer",
			"mData": "referrer",
			"bSortable": false
		}, {
			"sTitle": "Contacted",
			"bSortable": false,
			"render": function (callsCount, type, row) {
		        if (row.callsCount == 0) {
		            return "<h4><a class='dt-edit'></a></h4>";
		            }
		 
		            else {
		 
		            	return '<span class="fa fa-check" style="color:green; font-size:35px; " aria-hidden="true"></span>';
		 
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
	
	 $("#lenden91SearchTable").on('draw.dt', function() {
	    	$(".dt-edit").each(function() {
	    		$(this).empty();
	    		$(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Contacted</button>');
	    		var table = $('#lenden91SearchTable').DataTable();
	    		$(this).on('click', function() {
	    			var table = $('#lenden91SearchTable').DataTable();
	    			var data = table.row($(this).parents('tr')).data();
	    			var path = SITEBASEURL + 'appTransaction/update-contacted-referrals/' + data.id;
	    			$("<form action='" + path + "'></form>").appendTo('body').submit();
	    		});
	    	});
	 });
}