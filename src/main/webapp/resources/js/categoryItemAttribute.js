$(document).ready(function() {
	callToResults();
	$("#categoryId").change(function() {
		callToResults();
    });
    $("#rootCategoryId").change(function() {
    	$("#categoryId").val(0);
    	$("#displayCategoryId").val(0);
    	showCategory();
    	callToResults();
    });
    
    $("#categoryId").change(function() {
    	callToResults();
    });
    
    $("#search").click(function(){
    	callToResults();
    });
    
});
function callToResults(){
	var reportUrl = SITEBASEURL + "search/listing?category="+$("#rootCategoryId").val()+"&childCategoryId="+$("#categoryId").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy": true,
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "bStateSave": true,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Attribute Name",
            "mData": "attributeName",
            "bSortable": false
        }, {
            "sTitle": "Category Name",
            "mData": "categoryName",
            "bSortable": false
        },
        {
                "sTitle": "Language Code",
                "mData": "languageCode",
                "bSortable": false
            },
            {
                "sTitle" : "IsFilter",
                "mData" : "isFilter",
                "bSortable" : false
            },
            {
                "sTitle" : "isSearchEntity",
                "mData" : "isSearchEntity",
                "bSortable" : false
            },
            {
                "sTitle" : "isMandatory",
                "mData" : "isMandatory",
                "bSortable" : false
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
                var path = SITEBASEURL + 'search/get/category-item-attributes/' + data.id+"/"+$("#rootCategoryId").val()+"/"+$("#categoryId").val();
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
                    var path = SITEBASEURL + 'search/inactive/categoryItemAttributes/' + data.itemAttributeId;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });
    });
}

