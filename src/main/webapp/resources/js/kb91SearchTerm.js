$(document).ready(function() {
	callToResults();
});
function callToResults(){
	var reportUrl = SITEBASEURL + "search/kb91/term/listing";
	var table = $('#kb91SearchTermTable').dataTable({
		"destroy": true,
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        //"bStateSave": true,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "term",
            "bSortable": false
        }, {
            "sTitle": "Term",
            "mData": "term",
            "bSortable": false
        }, {
            "sTitle": "Frequency",
            "mData": "frequency",
            "bSortable": false
        }, {
             "sTitle": "Marked",
             "bSortable": false,
             "render": function (marked, type, row) {
			        if (row.marked != null) {
			            	return row.marked;
			            }
			            else {
			            	return "";
			            }
				}
         }
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
    });
	$("#kb91SearchTermTable").on('draw.dt', function() {
        
    });
}

