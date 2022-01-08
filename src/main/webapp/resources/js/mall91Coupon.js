$(document).ready(function() {
	callToResults();
	$("#type").change(function() {
		callToResults();
    });
});
function callToResults(){
	var reportUrl = SITEBASEURL + "reward/couponlisting?type="+$("#type").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : true,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
		"scrollX": true,
/*        "columnDefs": [{
			"targets": 7,
		    "createdCell": function (td) {
		          $(td).css('vertical-align', 'top');
		          $(td).css('word-break', 'break-word');
		      }}
		  ],*/
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Application",
            "mData": "applicationName",
            "bSortable": false
        }, {
            "sTitle" : "Create Date",
             "mData" : "createDate",
             "bSortable" : false,
        },
        {
            "sTitle": "Code",
            "mData": "couponCode",
            "bSortable": false
        },
        {
            "sTitle" : "User Id",
           // "mData" : "userId",
            "bSortable" : false,
            "render": function (userId, type, row) {
		        if (row.userId == null) {
		            return "-";
		            }
		            else {
		            	return row.userId;
		            }
			}
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
				"sTitle": "Product Ids",
				 "render": function (productIds, type, full, meta) {
                     return "<div class='text-wrap width-500'>" + full.productIds + "</div>";
                 }
			},
            {
                "sTitle" : "Min OrderAmount",
                "mData" : "minimumOrderAmount",
                "bSortable" : false
            },

            {
                "sTitle": "Status",
                "mData": "status",
                "bSortable": false
            }
            ,{
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'><a class='dt-remove' style='cursor: pointer'></a></h5>"
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
                var path = SITEBASEURL + 'reward/getCoupon/' + data.id;
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
                    var path = SITEBASEURL + 'reward/coupon/inActive/' + data.id;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });


    });
}

