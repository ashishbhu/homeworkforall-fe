$(document).ready(function(){

	var table = $('#modelTable').DataTable( {
        "scrollX": true
    });

	if(table.columns().eq( 0) != null)
	{
		table.columns().eq( 0 ).each( function ( colIdx ) {
			if(colIdx==1){			
				$( 'input#modelTable_filter', table.column( colIdx ).footer() ).on( 'keyup change', function () {
					table
					.column( colIdx )
					.search( this.value )
					.draw();
				} );
			}	
		} );
	}
});

var orderIds = [];

function addOrderIdsToArray(id){

	if ($('#recommended_id_'+id).is(':checked')) {
		orderIds.push(id);
	}
	else{
		var index = orderIds.indexOf(id);
		if (index > -1) {
			orderIds.splice(index, 1);
		}
	}
}

function addAllOrderIds(){
	orderIds = [];
	var oTable = $("#modelTable").DataTable();
	if ($('#selectAll').is(':checked')) {
		$("input:checkbox").prop("checked", true);
		oTable.column(2).data()
		.each( function ( value, index ) {
			orderIds.push(value);
		} );
	} else {
		$("input:checkbox").prop("checked", false);
	}  
}

function showmModalForBulkStateChange(){
	
	if (orderIds !== 'undefined' && orderIds.length > 0) {

		var selectedState = $("#orderStateDropDown").find(":selected").val();
		$(
		".modal-body #orderStateModal")
		.val(
				selectedState);
		$(
		".modal-body #orderIdsUIModal")
		.val(
				orderIds);
		$(
		'#scriptModal')
		.modal(
		'show');
	}
}

function showmModalForOrderIdsManifestGeneration(){
	
	if (orderIds !== 'undefined' && orderIds.length > 0) {
		$(
		".modal-body #orderIdsUIModal")
		.val(
				orderIds);
		$(
		'#manifestModal')
		.modal(
		'show');
	}
	else{
		alert("Select OrderIds to Generate Manifest");
	    return;
	}
}
