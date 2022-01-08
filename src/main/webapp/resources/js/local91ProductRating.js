$(document).ready(function() {
	callToResults();
});
function callToResults(){
	
	var reportUrl = SITEBASEURL + "local91OpsOrder/rating/dataList?fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val() +"&ratingStatus="+$("#ratingStatus").val();
	var table = $('#productRatingTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : false,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
		    },
	        /*"columnDefs": [{
				"targets": 5,
			    "createdCell": function (td) {
			          $(td).css('vertical-align', 'top');
			          $(td).css('word-break', 'break-word');
			      }}
			  ],*/
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }
        ,
			{
            "sTitle": "User Name",
            "mData": "userName",
            "bSortable": false
        }, {
            "sTitle": "Item Id",
            "mData": "itemId",
            "bSortable": false
        }, {
            "sTitle": "Suborder Id",
            "mData": "suborderId",
            "bSortable": false
        }, {
            "sTitle": "Avg Rating",
            "mData": "avgRating",
            "bSortable": false
        },
        {
            "sTitle": "Rating Details",
            "bSortable": false,
            "render": function (productFeatureDTOs, type, row) {
		        if (row.productFeatureDTOs == null) {
		            return "_";
		            }
		            else {
		            	var output="";
                        for(var i=0;i<row.productFeatureDTOs.length;i++){
                          output += row.productFeatureDTOs[i].name+" : "+row.productFeatureDTOs[i].rating+" <br/>";
                        }
		            	return output;
		            }
			}
        },
        {
                "sTitle": "Comments",
                "bSortable": false,
                "render": function (comments, type, row) {
    		        if (row.comments == null) {
    		            return "";
    		            }
    		            else {
    		            	return row.comments;
    		            }
    			}
            },
            {
                "sTitle" : "Image Urls",
                "bSortable" : false,
                "render": function (urls, type, row) {
    		        if (row.urls == null) {
    		            return "";
    		            }
    		            else {
    		            	var output="";
                            for(var i=0;i<row.urls.length;i++){
                              output +=  "<a target='_blank' href="+row.urls[i]+"><img src="+row.urls[i]+" height='50px' width='50px'></a>&nbsp;&nbsp";
                            }
    		            	return output;
    		            }
    			}
            }
            ,{
                "sTitle": "Status",
                "mData": "status",
                "bSortable": false
            },{
                "sTitle": "Action",
                "bSortable": false,
                //"sDefaultContent": "<a class='dt-approve'></a><a class='dt-reject'></a>",
                "render": function (status, type, row) {
    		        if (row.status == 'PENDING') {
    		            return "<a class='dt-approve'></a><a class='dt-reject'></a>";
    		         } else {
    		            return "";
    		         }
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
	$("#productRatingTable").on('draw.dt', function() {
        $(".dt-approve").each(function() {
        	$(this).empty();
            $(this).append("<button class='btn btn-danger' aria-hidden='true'>REJECT</button>");
            $(this).on('click', function() {
                if (confirm('Are you sure you want to Reject this rating?')) {
                    var table = $('#productRatingTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
//                    var path = SITEBASEURL + 'local91OpsOrder/update/rating/status/' + data.id+"/REJECTED";
//                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                    approveOrRejectRating(data.id, 'REJECTED');
                } else{
                    return false;
                }
            });
        });
        $(".dt-reject").each(function() {
        	$(this).empty();
            $(this).append("<button class='btn btn-success' aria-hidden='true'>APPROVE</button>");
            $(this).on('click', function() {
                if (confirm('Are you sure you want to Approve this rating?')) {
                    var table = $('#productRatingTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
//                    var path = SITEBASEURL + 'local91OpsOrder/update/rating/status/' + data.id+"/APPROVED";
//                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                    approveOrRejectRating(data.id, 'APPROVED');
                } else{
                    return false;
                }
            });
        });

    });
}

function approveOrRejectRating(id, status){
	window.location.href = SITEBASEURL +'local91OpsOrder/update/rating/status/'+id+"/"+status+"?ratingStatus="+$("#ratingStatus").val();
}
