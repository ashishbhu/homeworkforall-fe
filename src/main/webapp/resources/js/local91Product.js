$(document).ready(function() {
	callToResults();
	$("#search").click(function() {
		var txtSearch = $("#txtSearch").val().trim();
		if(txtSearch == ''){
			alert("Fill Out Search Field");
			return;
		}else{
			callToResults();
		}
	
	});
});
function callToResults(){
	
	var reportUrl = SITEBASEURL + "local91Product/productListing?&searchType="+ $("#searchType").val()+"&txtSearch="+ $("#txtSearch").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : false,
		"bStateSave" : true,
		"scrollX": true,
		"sAjaxSource" : reportUrl,
		"aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Product Id",
            "mData": "productId",
            "bSortable": false
        }, {
            "sTitle": "Name",
            "mData": "productName",
            "bSortable": false
        }, {
            "sTitle": "Image",
        	"bSortable" : false,
			"render" : function(imageUrl, type, row) {
				if (row.imageUrl == 'null' || row.imageUrl == undefined) {
					return " ";
				} else {
					
					
					return "<a target='_blank' href="
							+ row.imageUrl
							+ "><img src="
							+ row.imageUrl
							+ " height='40px' width='40px'></a>";
					
				}
			}
        },{
        	"sTitle": "Status",
            "mData": "status",
            "bSortable": false
        },
        {
            "sTitle": "Category",
            "mData": "rootCategoryId",
            "bSortable": false
        },
            {
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'><a class='dt-remove'></a></h5>"
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
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'local91Product/get/' + data.productId;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
    });
}
