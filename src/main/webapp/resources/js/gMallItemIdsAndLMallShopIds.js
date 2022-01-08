$(document).ready(
		function() {

			//$("section.content-header h1").html("<h3 id='Brand List'></h4> <h3 id='brandList'> </h4>");
			
			$("#promotion").removeClass("active");
            $("#mall91").addClass("active");
            $("#mall91 li:nth-child(22)").addClass("active");
            $("#Courier91").removeClass("active");
            $("#Dukaan91").removeClass("active");
            $("#Lenden91").removeClass("active");
			
			callToSearchResults();

			$("#search").click(function(){
				callToSearchResults();
			});
		
		});


var ids = [];

function addIdsToArray(id){
	
	
if ($('#recommended_id'+id).is(':checked')) {
	ids.push(id);
	}
	else{
		var index = ids.indexOf(id);
		if (index > -1) {
			ids.splice(index, 1);
		}
	}

}

function addAllIds(){
	ids = [];
	var oTable = $("#itemIdAndShopIdTable").DataTable();
      if ($('#selectAll').is(':checked')) {
      $("input:checkbox").prop("checked", true);
       oTable.column(0).data()
      .each( function ( value, index ) {
    	  ids.push(value);
      } );
  		} else {
      $("input:checkbox").prop("checked", false);
  		}  
      
}


function callToSearchResults() {
	
var reportUrl = SITEBASEURL + "mall91Product/listing-of-lmall-side-display-item?productId="+$("#productId").val()+"&shopId="+$("#shopId").val();
	
	
	var table = $('#itemIdAndShopIdTable')
			.dataTable(
					{
									
						"destroy":true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
						"bStateSave" : false,
						"sAjaxSource" : reportUrl,
						"scrollX": true,
						 "language": {
							 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
						    },
						    processing : true,
						
						"aoColumns" : [ 
							{
								"sTitle" : "#",
								"mData" : "id",
								"bSortable" : false
							},
							{
		    					"sTitle": "<input type='checkbox' id='selectAll' onchange='addAllIds()'></input>",
		    					"bSortable": false,
		    					'mRender': function( url, type, full ) {
		    					return '<input type="checkbox" id="recommended_id'+full.id+'" name="recommended_id" class="breaking_checkbox" onclick="addIdsToArray('+full.id+')" value="'+full.id+'"  />';	  }
		    					},
								
							{
							"sTitle" : "ProductId",
							"mData" : "productId",
							"bSortable": false,
						}, 
						{
							"sTitle" : "LMall ShopId",
							"mData" : "lMallShopId",
							"bSortable" : false
						},
						
						 {
							"sTitle" : "Delete",
							"bSortable" : false,
							"sDefaultContent" : "<a class='dt-remove' style=margin-left:20px;></a>"
						}
						],
						"sInfo" : "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
						"fnRowCallback" : function(nRow, aData, iDisplayIndex) {
							var oSettings = table.fnSettings();
							$("td:first", nRow).html(
									oSettings._iDisplayStart + iDisplayIndex
											+ 1);
							
							
							return nRow;
						},
					});

	$("#itemIdAndShopIdTable")
			.on(
					'draw.dt',
					function() {
						
						
						$(".dt-remove").each(function() {
				            $(this).empty();
				            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
				          
				            $(this).unbind().on('click', function() {
				                if (confirm('are you sure you want to delete this record?')) {
				                    var table = $('#itemIdAndShopIdTable').DataTable();
				                    var data = table.row($(this).parents('tr')).data();
				                    callDelete( data.id);
				                }
				                else{
				                    return false;
				                }

				            });
				        });
						});
}

function callDelete(id){
	ids= id;
	deleteAll();
														
}


function deleteAll() {
	if(ids == null || ids == ''){
		alert("Select Minimum one Row to Delete");
		return false;
	}
	 
	 $('#ids').val(ids);
	 $('#itemIdForRedirect').val( $('#productId').val());
	 $('#shopIdForRedirect').val( $('#shopId').val());
	
	$("#deleteAll").submit();
}



