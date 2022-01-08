$(document).ready(function() {

    var reportUrl = SITEBASEURL + "mall91Banner/listing";
    var table = $('#groupBuyTable').dataTable({
        "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": true,
        "sAjaxSource": reportUrl,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Id",
            "mData": "id",
            "bSortable": false
        }, {
            "sTitle": "Name",
            "mData": "title",
            "bSortable": false
        },{
            "sTitle": "Banner",
            "mData": "bannerUrl",
            "bSortable": false,
            "render": function(mdata) {
                return '<img src="'+mdata+'" width="100" height="40"/>';
            }
        },{
                "sTitle": "Action",
                "bSortable": false,
                "sDefaultContent": "<h4><a class='dt-remove'></a></h4>"
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
        $(".dt-remove").each(function() {
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to delete this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'mall91Banner/delete/' + data.id+"/"+data.status;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }
            });
        });
    });
});