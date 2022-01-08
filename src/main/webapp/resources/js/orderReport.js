$(document).ready(function(){

	$("#export").click(function(){
		callToExportResults();
	});
	
	$("#exportfinancial").click(function(){
		callToFinanceExportResults();
	});

	$("section.content-header h1").html("Order Report");

});

function callToExportResults() {
	
	window.location.href = SITEBASEURL + "mall91Order/download?orderSupplier="+ $("#orderSupplier").val() + "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val()+"&orderState="+ $("#orderState").val();

}

function callToFinanceExportResults() {
	
	window.location.href = SITEBASEURL + "mall91Order/financial-download?orderSupplier="+ $("#orderSupplier").val() + "&fromDate="+$("#fromDate").val() + "&toDate=" + $("#toDate").val();

}



