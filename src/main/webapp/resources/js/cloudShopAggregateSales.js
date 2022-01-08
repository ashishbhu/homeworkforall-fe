$(document).ready(function() {
	callToResults();
	
});
function callToResults(){
	
	var reportUrl = SITEBASEURL + "local91Shop/cloud-shop-aggregate-sales-listing";
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : true,
		"bStateSave" : true,
		"scrollX": true,
		"sAjaxSource" : reportUrl,
		"aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "ShopId",
            "sDefaultContent": "<a class='dt-edit'>",
            "bSortable" : false
        }, {
            "sTitle": "Name",
            "mData": "sellerShop.name",
            "bSortable": false
        }, {
            "sTitle": "Total_GMV",
            "mData": "totalGMV",
            "bSortable": false
        },{
        	"sTitle": "Total_Discount",
            "mData": "totalDiscount",
            "bSortable": false
        },
		{
            "sTitle": "Order Count",
            "mData": "totalOrderCount",
            "bSortable": false
        },
		{
            "sTitle": "Suborder Count",
            "mData": "totalSuborderCount",
            "bSortable": false
        },
		{
            "sTitle": "Total Quantity",
            "mData": "totalQuantity",
            "bSortable": false
        },
		{
        	"sTitle": "Delivered GMV",
            "mData": "totalDeliveredGMV",
            "bSortable": false
        },
		{
        	"sTitle": "Delivered Discount",
            "mData": "totalDeliveredDiscount",
            "bSortable": false
        },
        
            {
                "sTitle" : "COD Settled",
                "mData" : "totalDeliveredCodSettled",
                "bSortable" : false
                
            },
            {
                "sTitle" : "COD Settled Discount",
                "mData" : "totalDeliveredCODSettledDiscount",
                "bSortable" : false
                
            },

            {
                "sTitle" : "COD Not Settled",
                "mData" : "totalDeliveredButCodNotSettled",
                "bSortable" : false
                
            },
			{
                "sTitle" : "Amount To Pay",
                "mData" : "totalAmountToPay",
                "bSortable" : false
                
            },
           {
                "sTitle" : "Total Paid Amount",
                "mData" : "totalAmountPaid",
                "bSortable" : false
            }, 
 			{
                "sTitle" : "OverDue Amount",
                "mData" : "overDueAmount",
                "bSortable" : false
                
            },
			{
                "sTitle" : "Additional Amount Paid",
                "mData" : "additionalAmountPaid",
                "bSortable" : false
            }, 
            {
                "sTitle": "Export",
                "sDefaultContent": "<a class='dt-export'>",
                "bSortable" : false
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
              var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
			$(this).addClass('text-default').append("<span style = 'font-weight: bolder; font-size: 15px;'>"+data.sellerShop.shop_id+"</span>");
           // $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
           	$(this).unbind().on('click', function() {
                var path = SITEBASEURL + 'local91Shop/cloud-shop-daywise-sales/' + data.sellerShop.shop_id;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
        
        $(".dt-export").each(function() {
        	$(this).empty();
              var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                $(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Export">');
            var table = $('#groupBuyTable').DataTable();
           	$(this).unbind().on('click', function() {
                var path = SITEBASEURL + 'local91Shop/download-cloud-shop-order-report/' + data.sellerShop.shop_id+"/"+"None";
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });

    });
}


