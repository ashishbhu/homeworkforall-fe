$(document).ready(function() {
	callToSearchResults();
	callToUserDetails();
});

function callToSearchResults(){
	 var reportUrl = SITEBASEURL + "userNetwork/userBalanceHistory?userId=" +$("#userId").val()+"&name="+$("#name").val()+"&phone="+$("#phone").val()+"&refferCode="+$("#refferCode").val()
	+"&fromDate="+$("#fromDate").val()+"&toDate="+$("#toDate").val();
	    var table = $('#userBalanceHistoryTable').dataTable({
	        "bProcessing": true,
	        "bServerSide": true,
	        "ordering": true,
	        "bSearchable": true,
	        "bFilter": true,
	        "bDestroy": true,
	        "sAjaxSource": reportUrl,
	        "aoColumns": [{
	            "sTitle": "#",
	            "mData": null,
	            "bSortable": false
	        }, {
	            "sTitle": "Description",
	            "mData": "comment",
	            "bSortable": false
	        }, {
	            "sTitle": "Amount",
	            "mData": "amountUI",
	            "bSortable": false
	        },
	        {
	            "sTitle": "Date",
	            "mData": "dateStr",
	            "bSortable": false
	        },
	        {
	            "sTitle": "Action",
	            "mData": "action",
	            "bSortable": false
	        }],
	        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
	        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
	            var oSettings = table.fnSettings();
	            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
	            return nRow;
	        },
	    });

}

function callToUserDetails() {
    var statisticsUrl = SITEBASEURL + "userNetwork/get-user-details?userId=" +$("#userId").val()+"&name="+$("#name").val()+"&phone="+$("#phone").val()+"&refferCode="+$("#refferCode").val();
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

function updateStatistics(result){
	  setDefaultData();
	if(result.profileImageUrl != null){
		$('#profileImage').attr("src", result.profileImageUrl);
		$("#profileImage").css('height','100');
		$("#profileImage").css('width','100');
	}
	
	
	$("#userName").html(result.firstName);
    $("#userPhone").html(result.phone);
    if(result.referralCode != null){
    	$("#userReffCode").html("Reff. Code: "+result.referralCode);
    }
    
    if(result.balance != null){
    	$("#userBalance").html("Balance : "+result.balance);
    }
    if(result.totalWithdrawlTillDate != null){
    	$("#transferToBank").html("Transfer To Bank : "+result.totalWithdrawlTillDate);
    }
    if(result.expectedMonthlyIncome != null){
    	$("#monthlyIncome").html("Expected Monthly Income : "+result.expectedMonthlyIncome);
    }
    if(result.createdAt != null){
    	var date = new Date(result.createdAt);
    	var day = date.getDay();
    	var month = date.getMonth()+1;
    	var year = date.getFullYear();
    	
    	var finalDate = day +"-"+month +"-"+year;
    	$("#regDate").html("Reg. Date : "+finalDate);
    }
    if(result.status != null){
    	 $("#status").html("Status : "+result.status);
    }
}

function setDefaultData(){
	$('#profileImage').attr("src", "");
	$("#profileImage").css('height','0');
	$("#profileImage").css('width','0');
	$("#userReffCode").html("");
	$("#userBalance").html("");
	$("#transferToBank").html("");
	$("#monthlyIncome").html("");
	$("#regDate").html("");
	$("#status").html("");
}
