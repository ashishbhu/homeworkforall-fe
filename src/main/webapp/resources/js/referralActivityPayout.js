$(document).ready(function() {
	$("#search").click(function() {
		callToResult();
	});
});

function callToResult(){
	
	var reportUrl = SITEBASEURL + "user/referral-activity-payout-list?fromDate="+ $("#fromDate").val() + "&toDate="
	+ $("#toDate").val();
	var table = $('#userTable')
			.dataTable(
					{	
						"bDestroy":true,
						"bProcessing" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
						"sAjaxSource" : reportUrl,
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								},
								{
									"sTitle" : "Name",
									"mData" : "firstName",
									"bSortable" : false
								},
								{
									"sTitle" : "Phone Number",
									"mData" : "phoneNumber",
									"bSortable" : false
								},
								{
									"sTitle" : "Total Amount",
									"mData" : "balance",
									"bSortable" : false
								},
								{
									"sTitle" : "UserRank",
									"mData" : "userRank",
									"bSortable" : false
								}
								 ],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData,
								iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow)
									.html(
											oSettings._iDisplayStart
													+ iDisplayIndex
													+ 1);
							return nRow;
						},
					});
}

