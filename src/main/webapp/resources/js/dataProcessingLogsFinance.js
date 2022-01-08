$(document).ready(function() {
	callToResults();
});
function callToResults(){
	var reportUrl = SITEBASEURL + "finance/dataProcessingLogListing";
	var table = $('#groupBuyTable').dataTable({
		"destroy": true,
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "bStateSave": false,
        "scrollX": true,
        "sAjaxSource": reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
		    },
        "columnDefs": [{
			"targets": 1,
		    "createdCell": function (td) {
		          $(td).css('vertical-align', 'top');
		          $(td).css('word-break', 'break-word');
		      }}],
        
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }
        , {
            "sTitle": "File Name",
            "mData": "fileName",
            "bSortable": false
        } 
        , {
            "sTitle": "File Type",
            "mData": "fileType",
            "bSortable": false
        } , {
            "sTitle": "Processed Date",
            "mData": "createDate",
            "bSortable": false
        } , {
            "sTitle": "Total Rows",
            "mData": "totalRows",
            "bSortable": false
        } , {
            "sTitle": "Failed Count",
            /*"mData": "failedCount",*/
            "bSortable": false,
            "render": function (failedCount, type, row) {
		        if (row.failedCount == null) {
		            return "";
		            }
		            else {
		            	return row.failedCount+"&nbsp;&nbsp;&nbsp;&nbsp; <a class='dt-edit-failed' style='cursor: pointer'>";
		            }
			}
        } 
        , {
            "sTitle": "Missing Count",
            /*"mData": "missingCount",*/
            "bSortable": false,
            "render": function (missingCount, type, row) {
		        if (row.missingCount == null) {
		            return "";
		            }
		            else {
		            	return row.missingCount+"&nbsp;&nbsp;&nbsp;&nbsp; <a class='dt-edit-missing' style='cursor: pointer'>";
		            }
			}
        } 
        , {
            "sTitle": "Mismatch Count",
           /* "mData": "mismatchCount",*/
            "bSortable": false,
            "render": function (mismatchCount, type, row) {
		        if (row.mismatchCount == null) {
		            return "";
		            }
		            else {
		            	return row.mismatchCount+"&nbsp;&nbsp;&nbsp;&nbsp; <a class='dt-edit-mismatch' style='cursor: pointer'>";
		            }
			}
        }         , {
            "sTitle": "Matched Count",
            /* "mData": "mismatchCount",*/
             "bSortable": false,
             "render": function (matchedCount, type, row) {
 		        if (row.matchedCount == null || row.matchedCount==0) {
 		            return "-";
 		            }
 		            else {
 		            	return row.matchedCount+"&nbsp;&nbsp;&nbsp;&nbsp; <a class='dt-edit-matched' style='cursor: pointer'>";
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
	$("#groupBuyTable").on('draw.dt', function() {
        $(".dt-edit-failed").each(function() {
        	$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'finance/get/DataProcessingLogs/' + data.id+"/FAILED/dataProcessingLogs";
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
        $(".dt-edit-missing").each(function() {
        	$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'finance/get/DataProcessingLogs/' + data.id+"/MISSING/dataProcessingLogs";
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
        $(".dt-edit-mismatch").each(function() {
        	$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'finance/get/DataProcessingLogs/' + data.id+"/MISMATCH/dataProcessingLogs";
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
        
        $(".dt-edit-matched").each(function() {
        	$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'finance/get/DataProcessingLogs/' + data.id+"/MATCHED/dataProcessingLogs";
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });

    });
}
