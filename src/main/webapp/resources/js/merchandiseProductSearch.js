$(document).ready(function() {

	var reportUrl = SITEBASEURL + "/merchandiseProduct/listing?sellerId="+$("#orderSupplier").val() + "&minPrice=" + $("#minPrice").val() 
	+ "&maxPrice=" + $("#maxPrice").val() + "&categoryId=" + $("#categoryId").val()+ "&rootCategoryId="+ $("#rootCategoryId").val() +"&searchParam="+ $("#searchParam").val();
     var table = $('#groupBuyTable').dataTable({
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
                "sTitle": "ItemId",
                "mData": "itemIdUI",
                "bSortable": false
            },
            {
                "sTitle": "Name",
                "mData": "productName",
                "bSortable": false
            },{
                "sTitle": "image",
                "mData": "imageUI",
                "bSortable": false
            }, 
            {
                "sTitle": "Selling Price",
                "mData": "sellingPrice",
                "bSortable": false
            },

            {
                "sTitle": "Inventory",
                "mData": "stock",
                "bSortable": false
            },
            
            {
    			"sTitle": "select",
    			"bSortable": false,
    			'mRender': function( url, type, full ) {
    				 return '<input type="checkbox" id="recommended_id'+full.itemIdUI+'" name="recommended_id" class="breaking_checkbox" onclick="updateRecommendedStatus('+full.itemIdUI+', '+full.categoryId+')" value="'+full.itemIdUI+'"  />';
    		           
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
    	$(".dt-edit").each(function() {
    		$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
    		var status =  $("#status").val();
    		var table = $('#groupBuyTable').DataTable();
    		$(this).on('click', function() {
    			var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var path = SITEBASEURL + 'groupBuy/get/' + data.productId +'/'+ status;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
    });
});

var itemIds = [];
var selectedModalCategory = "";

function updateRecommendedStatus(id, categoryId ){
	itemIds.push(id);
	selectedModalCategory = categoryId;
	//alert(itemIds);
	//alert(selectedModalCategory);
}


function callToSearchResults() {
	$("#groupBuyTable_wrapper").html("");
	var reportUrl = SITEBASEURL + "/merchandiseProduct/listing?sellerId="+$("#orderSupplier").val() + "&minPrice=" + $("#minPrice").val() 
	+ "&maxPrice=" + $("#maxPrice").val() + "&categoryId=" + $("#categoryId").val() + "&rootCategoryId="+ $("#rootCategoryId").val() +"&searchParam="+ $("#searchParam").val();
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
			"sTitle": "ItemId",
			"mData": "itemIdUI",
			"bSortable": false
		},
		{
			"sTitle": "Name",
			"mData": "productName",
			"bSortable": false
		},{
			"sTitle": "image",
			"mData": "imageUI",
			"bSortable": false
		}, 
		{
			"sTitle": "Selling Price",
			"mData": "sellingPrice",
			"bSortable": false
		},
		{
			"sTitle": "Inventory",
			"mData": "stock",
			"bSortable": false
		},
		{
			"sTitle": "select",
			"bSortable": false,
			'mRender': function( url, type, full ) {
				return '<input type="checkbox" id="recommended_id'+full.itemIdUI+'" name="recommended_id" class="breaking_checkbox" onclick="updateRecommendedStatus('+full.itemIdUI+', '+full.categoryId+')"  value="'+full.itemIdUI+'"  />';
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

	$("#groupBuySearchTable").on('draw.dt', function() {
		$(".dt-edit").each(function() {
			$(this).empty();
			$(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
			var status =  $("#status").val();
			$(this).on('click', function() {
				var table = $('#groupBuySearchTable').DataTable();
				var data = table.row($(this).parents('tr')).data();
				var path = SITEBASEURL + 'groupBuy/get/' + data.productId +'/'+ status;
				$("<form action='" + path + "'></form>").appendTo('body').submit();
			});
		});
	});
}