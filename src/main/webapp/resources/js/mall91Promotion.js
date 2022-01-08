$(document).ready(function() {
	callToResults();
	$("#applicationId").change(function() {
		callToResults();
    });
	
	


    
});
function callToResults(){
	var reportUrl = SITEBASEURL + "promotion/listing?applicationId="+ $("#applicationId").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : true,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
        "columnDefs": [{
			"targets": 7,
		    "createdCell": function (td) {
		          $(td).css('vertical-align', 'top');
		          $(td).css('word-break', 'break-word');
		      }}
		  ],
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Application",
            "mData": "applicationDTO.name",
            "bSortable": false
        }, {
            "sTitle": "Promotion Type",
            "mData": "promoType",
            "bSortable": false
        },
        {
                "sTitle": "Min Range",
               /* "mData": "minRange",*/
                "bSortable": false,
                "render": function (minRange, type, row) {
    		        if (row.minRange == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.minRange;
    		            }
    			}
            },
            {
                "sTitle" : "Max Range",
               // "mData" : "maxRange",
                "bSortable" : false,
                "render": function (maxRange, type, row) {
    		        if (row.maxRange == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.maxRange;
    		            }
    			}
            },
            {
                "sTitle" : "WALLET Discount Percentage",
                //"mData" : "walletDiscountPercentage",
                "bSortable" : false,
                "render": function (walletDiscountPercentage, type, row) {
    		        if (row.walletDiscountPercentage == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.walletDiscountPercentage;
    		            }
    			}
            },
            {
                "sTitle" : "MPOINT Discount Percentage",
               // "mData" : "mpointDiscountPercentage",
                "bSortable" : false,
                "render": function (mpointDiscountPercentage, type, row) {
    		        if (row.mpointDiscountPercentage == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.mpointDiscountPercentage;
    		            }
    			}
            },
            {
                "sTitle" : "Product Ids",
                "mData" : "referenceIds",
                "bSortable" : false,
                /*"render": function (referenceIds, type, row) {
    		        if (row.referenceIds == null || row.referenceIds.length == 0) {
    		            return "-";
    		            }
    		            else {
    		            	return row.referenceIds;
    		            }
    			}*/
            },
            {
                "sTitle": "Offer Time Duration(In Minutes)",
                //"mData": "timeDurationMin",
                "bSortable": false,
                "render": function (timeDurationMin, type, row) {
    		        if (row.timeDurationMin == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.timeDurationMin;
    		            }
    			}
                
            }
            ,
            {
                "sTitle": "Amount Discount",
                //"mData": "amountDiscount",
                "bSortable": false,
                "render": function (amountDiscount, type, row) {
    		        if (row.amountDiscount == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.amountDiscount;
    		            }
    			}
                
            }
            ,
            {
                "sTitle": "Winner Type",
                //"mData": "winnerType",
                "bSortable": false,
                "render": function (winnerType, type, row) {
    		        if (row.winnerType == null || row.winnerType == '') {
    		            return "-";
    		            }
    		            else {
    		            	return row.winnerType;
    		            }
    			}
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
        });


    });
}

