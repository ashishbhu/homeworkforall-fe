$(document).ready(function(){

	$("#export").click(function(){
		callToExportResults();
	});

	$("section.content-header h1").html("Order Report");

});

function callToExportResults() {
	
	window.location.href = SITEBASEURL + "sellerOrders/seller/download?fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();

}
