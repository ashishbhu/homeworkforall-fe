$(document).ready(function() {
	callToResults();
	
	$('#searchDate').click(function(){
		callToResults();
	});
    $("#applicationId").change(function() {
    	callToResults();
    });

    $("#promoType").change(function() {
    	callToResults();
    });
    $("#actionStatus").change(function() {
    	callToResults();
    });
});
function callToResults(){
	var reportUrl = SITEBASEURL + "reward/listing?applicationId=" + $("#applicationId").val() + "&promoType=" + $("#promoType").val()+ "&actionStatus=" + $("#actionStatus").val() + "&searchDate=" + $("#searchDate").val();
	var table = $('#billBoardTable').dataTable({
    	 "bProcessing": true,
         "bServerSide": true,
         "ordering": true,
         "bSearchable": false,
         "bFilter": false,
         "bStateSave": true,
         "bDestroy": true,
         "sAjaxSource": reportUrl,
         "aoColumns": [{
             "sTitle": "#",
             "mData": "id",
             "bSortable": false
         }, {
             "sTitle": "User",
             "mData": "user.userUI",
             "bSortable": false
         }
         , {
             "sTitle": "Application",
             "mData": "application.name",
             "bSortable": false
         }, {
             "sTitle": "Promotion Type",
             "mData": "promoType",
             "bSortable": false
         },
         {
                 "sTitle": "Action Status",
                 "mData": "actionStatus",
                 "bSortable": false
             },
             {
                 "sTitle" : "Start Date",
                 "mData" : "startDate",
                 "bSortable" : false
             },
             {
                 "sTitle": "Value",
                 "mData": "value",
                 "bSortable": false
             }
            /* ,
             {
                 "sTitle": "Frequency",
                 "mData": "frequency",
                 "bSortable": false
             }*/
            /* ,
             {
                 "sTitle": "Click Url",
                 "mData": "clickUrl",
                 "bSortable": false
             }*/
           /*  ,
             {
                 "sTitle": "Status",
                 "mData": "status",
                 "bSortable": false
             }*/
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
   

}
