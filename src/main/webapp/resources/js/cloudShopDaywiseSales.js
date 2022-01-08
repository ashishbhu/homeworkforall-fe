$(document).ready(function() {
	callToResults();
	
});
function callToResults(){
	
	//alert(${shopId});
	var reportUrl = SITEBASEURL + "local91Shop/cloud-shop-daywise-sales-listing?shopId="+ $("#shopId").val();
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
            "sTitle": "ShopId",
            "mData": "sellerShop.shop_id",
            "bSortable": false
        }, {
            "sTitle": "Name",
            "mData": "sellerShop.name",
            "bSortable": false
        }, {
            "sTitle": "Total_GMV",
            "mData": "totalGMV",
            "bSortable": false
        },{
        	"sTitle": "Total Discount",
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

		   
			/*{
                "sTitle" : "Total Cash Owner Have",
                "mData" : "totalCashOwnerHave",
                "bSortable" : false
                
            },*/
            {
                "sTitle" : "Amount To Pay",
                "mData" : "totalAmountToPay",
                "bSortable" : false
                
            },
			{
                "sTitle" : "Amount Paid For Date",
                "mData" : "totalAmountPaid",
                "bSortable" : false
                
            },
			{
                "sTitle" : "OverDue Amount",
                "mData" : "overDueAmount",
                "bSortable" : false
                
            },
            {
                "sTitle" : "for Date",
                "mData" : "forDateString",
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
            },
			{
                "sTitle": "Pay-Amount",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-additionalPaid'>"
            },
			{
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-edit'>"
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

				if (!(typeof data.sellerShop.name === "undefined")) {
					$("#shopName").val(data.sellerShop.name);
				}
			
	           $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
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
	                var path = SITEBASEURL + 'local91Shop/download-cloud-shop-order-report/' + data.sellerShop.shop_id+
	                "/"+data.forDateString;
	                $("<form action='" + path + "'></form>").appendTo('body').submit();
	            });
	        });

		$(".dt-additionalPaid").each(function() {
	        	$(this).empty();
	             var table = $('#groupBuyTable').DataTable();
	             var data = table.row($(this).parents('tr')).data();
                if(data.totalAmountPaid != 0)
				{
					
				 $(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Paid" disabled = "disabled">');
				}
				else{
					$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Pay-Now">');
	            var table = $('#groupBuyTable').DataTable();
	           	$(this).unbind().on('click', function() {
		             
	              $(".modal-body #shopIdAdditionalPaidModal").val(data.sellerShop.shop_id);
			      $(".modal-body #additionalAmountPaid").val(data.additionalAmountPaid);
				  $(".modal-body #totalAmountToPay").val(data.remainingAmountToPay);
 				  $(".modal-body #additionalPaidForDate").val(data.forDateString);
			   	  $('#scriptModalAdditionalPaid').modal('show');
			  	  $('.modal-backdrop.fade.in').css("display", "none")
	                
	            });
					
				}
	           
	        });
	
	    });
	
}


