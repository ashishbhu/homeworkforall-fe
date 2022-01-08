$(document).ready(function() {
	callToSearchResults();
	$("#transactionNameAndType").change(function(){
		callToSearchResults();
	});
	$("#partyType").change(function(){
		callToSearchResults();
	});
});

function callToSearchResults() {
	var reportUrl = SITEBASEURL + "finance/pageList?fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val() +"&transactionNameAndType="+$("#transactionNameAndType").val()+"&partyType="+$("#partyType").val();
	var table = $('#financeMatrixTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": false,
		"sAjaxSource": reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
		    },
		"aoColumns": [{
			"sTitle": "#",
			"mData": "id",
			"bSortable": false
		}, {
			"sTitle": "Party Name",
			"mData": "partyName",
			"bSortable": false
		},{
			"sTitle": "Party Type",
			"mData": "partyType",
			"bSortable": false
		},{
			"sTitle": "Amount",
			"mData": "amount",
			"bSortable": false
		}
		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});
	
	 /*$("#lenden91SearchTable").on('draw.dt', function() {
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
	 });*/
}