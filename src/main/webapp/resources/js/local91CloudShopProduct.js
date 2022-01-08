$(document).ready(function() {
	callToResults();
});
function callToResults(){
	var reportUrl = SITEBASEURL + "local91ProductCategory/cloudShopProducting";
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : false,
		"bStateSave" : false,
		"sAjaxSource" : reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
		    },
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }
        , {
            "sTitle": "Name",
            "mData": "name",
            "bSortable": false
        }, {
            "sTitle": "Date",
            "mData": "requestDate",
            "bSortable": false
        }
        , {
            "sTitle": "Description",
            //"mData": "description",
            "bSortable": false,
            "render": function (description, type, row) {
		        if (row.description == null) {
		            return "-";
		            }
		            else {
		            	return row.description;
		            }
			}
        },{
            "sTitle": "Root-Category",
            "mData": "rootCategoryName",
            "bSortable": false
        },
        {
            "sTitle": "Sub-Category",
            "mData": "subCategoryName",
            "bSortable": false
        },
        {
            "sTitle": "ShopId",
            "mData": "sellerShopId",
            "bSortable": false
        },
        {
            "sTitle": "ShopName",
            "mData": "shopName",
            "bSortable": false
        },
        {
            "sTitle": "ShopOwner",
            "mData": "sellerName",
            "bSortable": false
        },
        {
            "sTitle": "Price",
            "mData": "sellingPrice",
            "bSortable": false
        },
		{
            "sTitle": "",
            "bSortable": false,
            "sDefaultContent": "<h5><a class='dt-create' style='cursor: pointer'></a></h5>"
        },
		{
            "sTitle": "",
            "bSortable": false,
            "sDefaultContent": "<h5><a class='dt-reject' style='cursor: pointer'></a></h5>"
        }

/*,{
            "sTitle": "View",
            "bSortable": false,
            "sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'></a></h5>"
        }*/
        
       
           
        ],
        "sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            var oSettings = table.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
    });
	$("#groupBuyTable").on('draw.dt', function() {
    /*    $(".dt-edit").each(function() {
        	$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'local91ProductCategory/edit-cloud-shop-product/' + data.id;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });*/
        
        $(".dt-create").each(function() {
        	$(this).empty();
    		var table = $('#groupBuyTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.status != 'CREATED'){
				
				$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Create Product">');
				$(this).unbind().on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();

                var path = SITEBASEURL + 'local91ProductCategory/create-product/' + data.id;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
			}
			else{
				$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Product-Created" disabled = "disabled">');
			}
            
        });
		$(".dt-reject").each(function() {
        	$(this).empty();
    		var table = $('#groupBuyTable').DataTable();
			var data = table.row($(this).parents('tr')).data();
			if(data.status != 'CREATED'){
				
				$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Reject">');
				$(this).unbind().on('click', function() {
					 if (confirm('are you sure you want to Reject this request?')) {
				
					
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();

                var path = SITEBASEURL + 'local91ProductCategory/update-cloudproduct-request-status/' + data.id + '/REJECTED';
                $("<form action='" + path + "'></form>").appendTo('body').submit();
}
            });
			}
			else{
				$(this).addClass('text-default').append('-');
			}
            
        });
    });
}
