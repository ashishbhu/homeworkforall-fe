$(document).ready(function() {
	callToSearchResults();
});

function callToSearchResults() {
	var userId = $("#userId").val();
	if(userId == null){
		userId = '';
	}
	var reportUrl = SITEBASEURL + "userNetwork/childUserDetailsListing/"+$("#level").val() +"?parentUserId=" +userId;
	var table = $('#childUserDetailsTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"aoColumns": [
		{
			"sTitle" : "#",
			"mData" : null,
			"bSortable" : false
		},{
			"sTitle": "CreateDate",
			//"mData": "createdAt",
			"bSortable": false,
			"render": function (createdAt, type, row) {
		        var date = new Date(row.createdAt);
		        var month = date.getMonth() + 1;
		        var day = date.getDate();
		        return (day.toString().length > 1 ? day : "0" +day) + "-" + (month.toString().length > 1 ? month : "0" + month)+ "-" + date.getFullYear()
		        +" "+date.getHours() +" :"+date.getMinutes() +" :"+date.getSeconds();
		    }
		},{
			"sTitle": "FirstName",
			"mData": "firstName",
			"bSortable": false
		},{
			"sTitle": "LastName",
			"mData": "lastName",
			"bSortable": false
		},{
			"sTitle" : "Phone",
			"mData": "phone",
			"bSortable" : false
		},{
			"sTitle" : "ReferralCode",
			"mData": "referralCode",
			"bSortable" : false
		}
		],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});

}
