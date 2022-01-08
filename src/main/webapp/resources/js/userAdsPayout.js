$(document).ready(function() {
	callToResults();
	
				
			var statisticsUrl = SITEBASEURL + "adsServed/ads-count";
			var requestMethodType = "GET";

			$.ajax({
				url : statisticsUrl,
				type : requestMethodType,
				contentType : "application/json",
				dataType : "json",
				success : updateStatistics,
				error : function(jqXHR, textStatus, errorThrown) {
					if (jqXHR.responseText !== '') {
						var r = jQuery.parseJSON(jqXHR.responseText);
						$("#reportWrapper").html(r.message).addClass("error");
					} else {
						$("#reportWrapper").html(jqXHR.statusText).addClass(
								"error");
					}

				}
			});
});

function updateStatistics(result) {
console.log(result);
	$("#adsServed").html("Ads Served Total : "+ result.totalNoOfAdsServed);
	$("#adsClicked").html("Ads Clicked Total: "+ 	result.totalNoOfAdsClicked);
	$("#adsServedAndClicked").html("Total : "+ result.totalNoOfAdsServedAndClicked);
}
function callToResults(){
	
	var reportUrl = SITEBASEURL + "adsServed/user/payout/dataList?fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val();
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
            "sTitle": "Create Date",
            "mData": "createdAt",
            "bSortable": false
        } , {
            "sTitle": "Payout Date",
            "mData": "payoutDate",
            "bSortable": false
        }
        , {
            "sTitle": "Amount",
            "mData": "amount",
            "bSortable": false
        }, {
            "sTitle": "Nos Of User",
            "mData": "nosOfUser",
            "bSortable": false
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
