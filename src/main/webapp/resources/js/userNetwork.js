$(document).ready(function() {
	callToSearchResults();
	callToUserDetails();
});

function callToSearchResults() {

	var reportUrl = SITEBASEURL + "userNetwork/userNetworkListing?userId=" +$("#userId").val()+"&name="+$("#name").val()+"&phone="+$("#phone").val()+"&refferCode="+$("#refferCode").val()
	+"&fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val();
	var table = $('#userNetworkTable')
	.dataTable({
		"destroy": true,
		"bProcessing": true,
		"bServerSide": true,
		"ordering": true,
		"bSearchable": true,
		"bFilter": false,
		"bStateSave": true,
		"sAjaxSource": reportUrl,
		"bPaginate": false,
		"aoColumns": [
		{
			"sTitle": "Levels",
			"mData": "level",
			"bSortable": false
		},{
			"sTitle": "Active User",
			"mData": "activeUserCount",
			"bSortable": false
		},{
			"sTitle": "Total User",
			"mData": "totalUserCount",
			"bSortable": false
		},{
			"sTitle" : "View",
			"bSortable" : false,
			"sDefaultContent" : "<a class='dt-view'></a>"
		}],
		"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
		"fnRowCallback": function(nRow, aData, iDisplayIndex) {
			var oSettings = table.fnSettings();
			$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
			return nRow;
		},
	});

	$("#userNetworkTable").on('draw.dt', function() {
		$(".dt-view").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			$(this).on('click', function() {
				var table = $('#userNetworkTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				//var path = SITEBASEURL + 'userNetwork/get-child-user-detail/' + data.parentUserId+ "/"+data.level;
				callToChildUserDetails(data.parentUserId, data.level);
				//$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});
	});
}

function callToChildUserDetails(parentUserId, level){
	if(parentUserId == null){
		parentUserId = '';
	}
	window.location.href = SITEBASEURL + 'userNetwork/get-child-user-detail/'+level +'?parentUserId=' +parentUserId+"&name="+$("#name").val()+"&phone="+$("#phone").val()+"&refferCode="+$("#refferCode").val()
	+"&fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val();
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
