$(document).ready(function(){

	var table = $('#modelTable').DataTable({"paging":   true,
	    "ordering": true,
	    "info":     true,
	    "searching": false,
	    "bSortable" : false});
	
	if(table.columns().eq( 0) != null)
	{
	table.columns().eq( 0 ).each( function ( colIdx ) {
		
	} );
	}

	
});
