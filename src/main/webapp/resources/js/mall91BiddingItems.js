$(document).ready(function() {
	callToResults();
});
function callToResults(){
	
	var reportUrl = SITEBASEURL + "merchandiseBanner/biddingList";
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : false,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
		"aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Item Id",
            "mData": "itemId",
            "bSortable": false
        }, {
            "sTitle": "Item Name",
            "mData": "itemName",
            "bSortable": false
        },{
        	"sTitle": "Currency Type",
            "mData": "currencyType",
            "bSortable": false
        },
        {
                "sTitle": "Start Range",
               "mData": "startRange",
                "bSortable": false
            },
            {
                "sTitle" : "factor",
                "mData" : "factor",
                "bSortable" : false
                
            },
            {
                "sTitle" : "Bidding Status",
                "mData" : "biddingStatus",
                "bSortable" : false
            },
            {
                "sTitle" : "Bidding Start Date",
                "mData" : "sDate",
                "bSortable" : false
            },
            {
                "sTitle" : "Bidding End Date",
                "mData" : "eDate",
                "bSortable" : false
            },
			{
				"sTitle": "Status",
				"bSortable": false,
				"render": function (isActive, type, row) {
			        if (row.isActive == false) {
			            return "INACTIVE";
			            }
			            else {
			            return "ACTIVE";
			       }
				}
			}
            ,{
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'></a></h5>"
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
			if(data.isActive == true){
				$(this).addClass('text-default').append('<input class="btn btn-danger" type="button" value="Mark/ INACTIVE">');
			} else {
				$(this).addClass('text-default').append('<input class="btn btn-success" type="button" value="Mark/ ACTIVE">');
			}
    		
    		$(this).on('click', function() {
    			var table = $('#groupBuyTable').DataTable();
    			var data = table.row($(this).parents('tr')).data();
    			var status;
    			if(data.isActive == true){
    				status =false;
    			} else {
    				status = true;
    			}
    			var path = SITEBASEURL + 'merchandiseBanner/active-inactive/' + data.id+"/"+ status;
    			$("<form action='" + path + "'></form>").appendTo('body').submit();
    		});
    	});
    
        
        
/*        $(".dt-remove").each(function() {
        	$(this).empty();
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to Inactive this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'merchandiseBanner/inActive/' + data.id;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });*/


    });
}

