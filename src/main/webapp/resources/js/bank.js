$(document).ready(function(){

	var table = $('#modelTable').DataTable({"paging":   true,
	    "ordering": false,
	    "info": true,
	    searching: false,
	    stateSave: false});
    
	if(table.columns().eq( 0) != null)
	{
		
	table.columns().eq( 0 ).each( function ( colIdx ) {
		if(colIdx==1){		
			$( 'input', table.column( colIdx ).footer() ).on( 'keyup change', function () {
				table
					.column( colIdx )
					.search( this.value )
					.draw();
				
			} );
		}	
	} );
	}
});
