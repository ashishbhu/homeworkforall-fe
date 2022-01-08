$(document).ready(function() {

	callToResult();
	
	$('#saleType').change(function(){
		callToResult();
	});
});

function callToResult() {
	
    var reportUrl = SITEBASEURL + "userDeal/listing?saleType="+$("#saleType").val();
    var table = $('#groupBuyTable').dataTable({
    	"bDestroy": true,
    	"bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": true,
        "sAjaxSource": reportUrl,
        "columnDefs": [{
			"targets": 3,
		    "createdCell": function (td) {
		          $(td).css('vertical-align', 'top');
		          $(td).css('word-break', 'break-word');
		      }}
		  ],
        "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSortable": false
            }, 
            {
                "sTitle": "Deal StartDate",
                "mData": "dealStartDateTime",
                "bSortable": false
            },{
                "sTitle": "Deal EndDate",
                "mData": "dealEndDateTime",
                "bSortable": false
            }, 
            {
                "sTitle": "Item Ids",
                "mData": "itemIds",
                "bSortable": false
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'><a class='dt-remove'></a></h4>"
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
    	$(".dt-edit").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		var table = $('#groupBuyTable').DataTable();
    		$(this).on('click', function() {
    			var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'userDeal/get/' + data.id;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
    	
    	$(".dt-remove").each(function() {
    		$(this).empty();
    		$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		$(this).on('click', function() {
    			if (confirm('are you sure you want to delete this record?')) {
    				var table = $('#groupBuyTable').DataTable();
    				var data = table.row($(this).parents('tr')).data();
    				var path = SITEBASEURL + 'userDeal/delete/' + data.id;
    				$("<form action='" + path + "'></form>").appendTo('body').submit();
    			}
    			else{
    				return false;
    			}

    		});
    });
    });
	
}

function callToSearchResults() {
    $("#groupBuyTable_wrapper").html("");
    var reportUrl = SITEBASEURL + "userDeal/listing";
    var table = $('#groupBuySearchTable')
        .dataTable({
        	"destroy": true,
            "bProcessing": true,
            "bServerSide": true,
            "ordering": true,
            "bSearchable": false,
            "bFilter": true,
            "sAjaxSource": reportUrl,
            "aoColumns": [{
                "sTitle": "#",
                "mData": "id",
                "bSortable": false
            }, 
            {
                "sTitle": "Deal StartDate",
                "mData": "dealStartDateTime",
                "bSortable": false
            },{
                "sTitle": "Deal EndDate",
                "mData": "dealEndDateTime",
                "bSortable": false
            }, 
            {
                "sTitle": "Item Ids",
                "mData": "itemIds",
                "bSortable": false
            },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'><a class='dt-remove'></a></h4>"
            }
        ],
            "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
            "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                var oSettings = table.fnSettings();
                $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
                return nRow;
            },
        });

    $("#groupBuySearchTable").on('draw.dt', function() {
    	$(".dt-edit").each(function() {
    		$(this).empty();
    		$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
    		$(this).on('click', function() {
    			var table = $('#groupBuySearchTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'userDeal/get/' + data.id;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
    	
    	$(".dt-remove").each(function() {
    		 $(this).empty();
    		$(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
    		$(this).on('click', function() {
    			if (confirm('are you sure you want to delete this record?')) {
    				var table = $('#groupBuySearchTable').DataTable();
    				var data = table.row($(this).parents('tr')).data();
    				var path = SITEBASEURL + 'userDeal/delete/' + data.id;
    				$("<form action='" + path + "'></form>").appendTo('body').submit();
    			}
    			else{
    				return false;
    			}

    		});
    	});
    });
}