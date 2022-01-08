$(document).ready(function() {
	callToResults();
	$('#kycDocumentVerificationStatus').change(function(){
		callToResults();
	});
	$('#walletType').change(function(){
		callToResults();
	});
});
function callToResults(){
	var reportUrl = SITEBASEURL + "userKyc/listing?status="+$("#kycDocumentVerificationStatus").val()+"&phone="+$("#phone").val()+"&walletType="+$("#walletType").val();
	var table = $('#groupBuyTable').dataTable({
		"destroy": true,
       "bProcessing": true,
        "bServerSide": true,
        "ordering": true,
        "bSearchable": false,
        "bFilter": false,
        "bStateSave": true,
        "sAjaxSource": reportUrl,
        "language": {
			 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
		    },
        "aoColumns": [{
            "sTitle": "#",
            "mData": "id",
            "bSortable": false
        }, 
        {
            "sTitle": "User Name",
            "mData": "userName",
            "bSortable": false
        },
        {
            "sTitle": "Phone Number",
            "mData": "phone",
            "bSortable": false
        },
        {
            "sTitle": "Document Number",
            "mData": "documentNumber",
            "bSortable": false
        },
        {
                "sTitle": "Kyc Document Type",
                "mData": "kycDocumentType",
                "bSortable": false
            },
            {
                "sTitle": "Kyc Document Verification Status",
                "mData": "kycDocumentVerificationStatus",
                "bSortable": false
            },
            {
                "sTitle": "Wallet Type",
                "mData": "walletType",
                "bSortable": false
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
            $(this).addClass('text-default').append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'userKyc/get/userKyc/' + data.id+"/"+data.userId;
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
                    var path = SITEBASEURL + 'userKyc/inactive/partyPayment/' + data.id;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });*/
    });
}

