$(document).ready(function() {
	callToResults();
	$('#btnCustomSearch').click(function(){
		callToSearchResults();
	});
	

});
function callToSearchResults() {
    $("#groupBuyTable_wrapper").html("");
    var reportUrl = SITEBASEURL + "itemGroupSetting/listing?searchTerm=" + $("#txtCustomSearch").val();
	var table = $('#groupBuySearchTable').dataTable({
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "bStateSave": true,
        "sAjaxSource": reportUrl,
        "destroy":true,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "productId",
            "bSortable": false
        }, {
            "sTitle": "Product Id",
            "mData": "productId",
            "bSortable": false
        }, {
            "sTitle": "Group Discount",
            "mData": "groupDiscount",
            "bSortable": false
        },
        {
                "sTitle": "Hours To Expire",
                "mData": "hoursToExpire",
                "bSortable": false,
            },
            {
                "sTitle" : "Min Orders Group",
               "mData" : "minOrdersToFormNewGroup",
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

    $("#groupBuySearchTable").on('draw.dt', function() {
     /*   $(".dt-edit").each(function() {
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuySearchTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuySearchTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'itemGroupSetting/get/' + data.productId;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });*/
        $(".dt-remove").each(function() {
        	$(this).empty();
        	$(this).addClass('text-default').append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to delete this record?')) {
                    var table = $('#groupBuySearchTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'itemGroupSetting/delete/' + data.productId;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });


    });

}
function callToResults(){
	var reportUrl = SITEBASEURL + "itemGroupSetting/listing?searchTerm=" + $("#txtCustomSearch").val();
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
            "mData": "productId",
            "bSortable": false
        }, {
            "sTitle": "Product Id",
            "mData": "productId",
            "bSortable": false
        }, {
            "sTitle": "Group Discount",
            "mData": "groupDiscount",
            "bSortable": false
        },
        {
                "sTitle": "Hours To Expire",
                "mData": "hoursToExpire",
                "bSortable": false,
            },
            {
                "sTitle" : "Min Orders Group",
               "mData" : "minOrdersToFormNewGroup",
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
     /*   $(".dt-edit").each(function() {
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'itemGroupSetting/get/' + data.productId;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });*/
        $(".dt-remove").each(function() {
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to delete this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'itemGroupSetting/delete/' + data.productId;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });


    });

}


