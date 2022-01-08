$(document).ready(function(){
	if(parseInt($('#id').val()) > 0 ) {
		var table = $('#eventNotesTable').DataTable({
			"bScrollCollapse": true,
			"paging": true,
			"info": true,
			"sort": true,
			"ordering": true,
			"jQueryUI": false,
			"order": [],
			"searching": false,
			"oLanguage": {
				"sSearch": "Search Notes"
			},
			"aoColumnDefs": [
			                 { 'sWidth': "", 'aTargets': [ 0 ] },
			                 { 'sWidth': "", 'aTargets': [ 1 ] , 'sClass': "alignLeft"},
			                 { 'sWidth': "", 'aTargets': [ 2 ] , 'sClass': "alignLeft"},
			                 { 'sWidth': "", 'bSortable': false, 'aTargets': [ 3 ] , "orderable": false}
			                 ],
			                 "sDom": '<"datatable-exc-msg"><"row"><"filter_rt"f>ltip',			
		});

		// Apply the search
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