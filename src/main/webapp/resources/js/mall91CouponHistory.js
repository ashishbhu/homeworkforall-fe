$(document).ready(function() {
	callToResults();
	
	


    
});
function callToResults(){
	var reportUrl = SITEBASEURL + "reward/couponHistorylisting";
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : true,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "User Name",
            "mData": "userName",
            "bSortable": false
        }, {
            "sTitle": "Coupon Id",
            "mData": "couponId",
            "bSortable": false
        },
        {
                "sTitle": "Discounted Amount",
               /* "mData": "discountedAmount",*/
                "bSortable": false,
                "render": function (discountedAmount, type, row) {
    		        if (row.discountedAmount == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.discountedAmount;
    		            }
    			}
            },
            {
                "sTitle" : "Discounted Wallet",
               // "mData" : "discountedWallet",
                "bSortable" : false,
                "render": function (discountedWallet, type, row) {
    		        if (row.discountedWallet == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.discountedWallet;
    		            }
    			}
            },
            {
                "sTitle" : "Discounted Shopping Wallet",
                //"mData" : "discountedShoppingWallet",
                "bSortable" : false,
                "render": function (discountedShoppingWallet, type, row) {
    		        if (row.discountedShoppingWallet == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.discountedShoppingWallet;
    		            }
    			}
            },
            {
                "sTitle" : "Reference Order Id",
                "mData" : "referenceId",
                "bSortable" : false
            }
            /*,{
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'><a class='dt-remove' style='cursor: pointer'></a></h5>"
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
/*        $(".dt-edit").each(function() {
        	$(this).empty();
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'promotion/getPromotion/' + data.id+"/"+$("#applicationId").val();
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
    
        
        
        $(".dt-remove").each(function() {
        	$(this).empty();
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to Inactive this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'promotion/inActive/' + data.id;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });*/


    });
}

