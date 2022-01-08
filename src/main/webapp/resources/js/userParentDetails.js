$(document).ready(function() {
	callToSearchResults();
	callToUserDetails();
});

function callToSearchResults() {
	var reportUrl = SITEBASEURL + "userNetwork/userParentDetailsListing?userId=" +$("#userId").val()+"&name="+$("#name").val()+"&phone="+$("#phone").val()+"&refferCode="+$("#refferCode").val()
	+"&fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val();
	var table = $('#userParentDetailsTable')
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
			"sTitle": "Levels",
			"mData": "level",
			"bSortable": false
		},{
			"sTitle": "User Id",
			"mData": "id",
			"bSortable": false
		},{
			"sTitle": "Name",
			"mData": "firstName",
			"bSortable": false
		},{
			"sTitle" : "Ref. Code",
			"mData": "referralCode",
			"bSortable" : false
		},{
			"sTitle" : "Status",
			"mData": "status",
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

function callToUserDetails() {
	$("#userNameAndPhone").html('');
	var userId = $("#userId").val();
	var name = $("#name").val();
	var phone = $("#phone").val();
	var refferCode = $("#refferCode").val();
	if(userId != '' || name != '' || phone != '' || refferCode != ''){
    var statisticsUrl = SITEBASEURL + "userNetwork/get-user-details?userId=" +userId+"&name="+name+"&phone="+phone+"&refferCode="+refferCode;
	var requestMethodType = "GET";

	$.ajax({
		url : statisticsUrl,
		type : requestMethodType,
		contentType : "application/json",
		dataType : "json",
		success : updateStatistics,
		error : function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.responseText !== '') {
				var r = jQuery.parseJSON(jqXHR.responseText);
				$("#reportWrapper").html(r.message).addClass("error");
			} else {
				$("#reportWrapper").html(jqXHR.statusText).addClass(
						"error");
			}

		}
	});
 }
}

function updateStatistics(result) {
	var name = result.firstName;
	var phone = result.phone
	$("#userNameAndPhone").html(" --> "+name + "(" + phone + ")");

}
