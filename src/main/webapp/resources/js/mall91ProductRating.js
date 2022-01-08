$(document).ready(function() {
	callToResults();
	$("#export").click(function(){
		callToExportResults();
	
});

	$("#approve").click(function() {
		if (productRatingIds != null && productRatingIds != '') {
			if (confirm('are you sure you want to Approved Selected records?')) {
			     window.location.href=SITEBASEURL + 'mall91OpsOrder/updateStatusByIds/'+ productRatingIds+'/'+$("#approve").val();
            }
            else{
                return false;
            }
			
		} else {
			alert("Select checkbox!");
		}
	});

	$("#reject").click(function() {
		if (productRatingIds != null && productRatingIds != '') {
			if (confirm('are you sure you want to Rejected Selected records?')) {
                window.location.href=SITEBASEURL + 'mall91OpsOrder/updateStatusByIds/'+ productRatingIds+'/'+$("#reject").val();
            }
            else{
                return false;
            }
			
		} else {
			alert("Select checkbox!");
		}
  });


});
var productRatingIds = [];

function addProductRatingIdsToArray(id,check){
	if (check.checked == true){
		productRatingIds.push(id);
	}else{
		productRatingIds = productRatingIds.filter(item => item !== id);
	}
}

function addAllProductRatingIds(){
	productRatingIds = [];
	var oTable = $("#groupBuyTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(0).data()
      .each( function ( value, index ) {
    	  productRatingIds.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		} 
}
function callToResults(){
	
	var reportUrl = SITEBASEURL + "mall91OpsOrder/productRateListing?fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val() +"&ratingStatus="+$("#ratingStatus").val();
	var table = $('#groupBuyTable').dataTable({
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
        }
        ,{
			"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllProductRatingIds()'></input>",
			"bSortable": false,
			'mRender': function( url, type, full ) {
			return '<input type="checkbox" id="recommended_id'+full.id+'" name="recommended_id" class="breaking_checkbox" onclick="addProductRatingIdsToArray('+full.id+',this)" value="'+full.id+'"  />';	  }
			},
			{
            "sTitle": "User Name",
            "mData": "userName",
            "bSortable": false
        }, {
            "sTitle": "Item Id",
            "mData": "itemId",
            "bSortable": false
        }, {
            "sTitle": "Order Id",
            "mData": "orderId",
            "bSortable": false
        }, {
            "sTitle": "Avg Rating",
            "mData": "avgRating",
            "bSortable": false
        },
        {
            "sTitle": "Rating Details",
            //"mData": "avgRating",
            "bSortable": false,
            "render": function (productFeatureDTOs, type, row) {
		        if (row.productFeatureDTOs == null) {
		            return "-";
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
                "mData": "comments",
                "bSortable": false
              /*  "render": function (comments, type, row) {
    		        if (row.comments == null) {
    		            return "-";
    		            }
    		            else {
    		            	return row.comments;
    		            }
    			}*/
            },
            {
                "sTitle" : "Image Urls",
                "bSortable" : false,
                "render": function (urls, type, row) {
    		        if (row.urls == null) {
    		            return "-";
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
                "sTitle": "Rejected",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-remove-1' style='cursor: pointer'></a></h5>"
            }
            ,{
                "sTitle": "Approved",
                "bSortable": false,
                "sDefaultContent": '<h5><a class="dt-remove-2" style="cursor: pointer"></a></h5>'
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
        $(".dt-remove-1").each(function() {
        	$(this).empty();
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to Rejected this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'mall91OpsOrder/updateStatus/' + data.id+"/REJECTED";
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });
        $(".dt-remove-2").each(function() {
        	$(this).empty();
            $(this).append("<span class='fa fa-check' style='color:green; font-size:35px; ' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to Approved this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'mall91OpsOrder/updateStatus/' + data.id+"/APPROVED";
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });


    });
}

function callToExportResults() {
	var fromDate=$("#fromDate").val();
	var toDate=$("#toDate").val();
	var status=$("#ratingStatus").val();
	
	if((fromDate == '' || toDate == '') && status=='All'){
		alert("Fill Out start Date & End Date Field");
		return;
	}else{
		 window.location.href = SITEBASEURL + "mall91OpsOrder/downloadProductRating?fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val() +"&ratingStatus="+$("#ratingStatus").val();

	}
	 
}


