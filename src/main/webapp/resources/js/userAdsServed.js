$(document).ready(function() {
	callToResults();
});
function callToResults(){
	
	var reportUrl = SITEBASEURL + "adsServed/user/dataList?fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val() +"&adNetwork="+$("#adNetwork").val()+"&appName="+$("#appName").val();
	var table = $('#userAdsServedTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : false,
		"bStateSave" : false,
		"sAjaxSource" : reportUrl,
		"language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
		    },
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }
        , {
            "sTitle": "Date",
            "mData": "createDate",
            "bSortable": false
        }
        , {
            "sTitle": "User Name",
            "mData": "userName",
            "bSortable": false
        }, {
            "sTitle": "Ads Served Count",
            "mData": "adServedCount",
            "bSortable": false
        }, {
            "sTitle": "Ad Network",
            "mData": "adNetwork",
            "bSortable": false
        },
        {
            "sTitle": "Ads Type",
            "mData": "adsType",
            "bSortable": false
        },
        {
            "sTitle": "AppName",
            "mData": "appName",
            "bSortable": false
        },
        {
            "sTitle": "Ads Position",
            "mData": "adsPosition",
            "bSortable": false,
            "render": function (adsPosition, type, row) {
		        if (row.adsPosition == null) {
		            return "";
		            }
		            else {
		            	return row.adsPosition;
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
	$("#userAdsServedTable").on('draw.dt', function() {

    });
}
