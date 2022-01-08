$(document).ready(function() {
	callToResults();
    
});
function callToResults(){
	var reportUrl = SITEBASEURL + "nodal/listing";
	var table = $('#groupBuyTable').dataTable({
		"destroy" : true,
		"bProcessing" : true,
		"bServerSide" : true,
		"ordering" : true,
		"bSearchable" : true,
		"bFilter" : true,
		"bStateSave" : true,
		"sAjaxSource" : reportUrl,
		"scrollX": true,
        "aoColumns": [{
            "sTitle": "#",
            "mData": "beneficiaryRefId",
            "bSortable": false
        },{
            "sTitle" : "Name",
            // "mData" : "name",
             "bSortable" : false,
             "render": function (name, type, row) {
 		        if (row.name == null) {
 		            return "-";
 		            }
 		            else {
 		            	return row.name;
 		            }
 			}
         },{
             "sTitle" : "Email",
             // "mData" : "email",
              "bSortable" : false,
              "render": function (email, type, row) {
  		        if (row.email == null) {
  		            return "-";
  		            }
  		            else {
  		            	return row.email;
  		            }
  			}
          },
          {
              "sTitle" : "mobile",
             // "mData" : "mobile",
              "bSortable" : false,
              "render": function (mobile, type, row) {
  		        if (row.mobile == null ) {
  		            return "-";
  		            }
  		            else {
  		            	return row.mobile;
  		            }
  			}
          },
          {
              "sTitle": "Nick Name",
              //"mData": "nickName",
              "bSortable": false,
              "render": function (nickName, type, row) {
  		        if (row.nickName == null) {
  		            return "-";
  		            }
  		            else {
  		            	return row.nickName;
  		            }
  			}
              
          }
          
          ,
         {
            "sTitle": "Account Number",
            "mData": "accountNumber",
            "bSortable": false
        },{
            "sTitle": "IFSC",
            "mData": "ifsc",
             "bSortable": false
         },
        {
            "sTitle": "AccountType",
            "mData": "accountType",
            "bSortable": false
        },
        
            {
                "sTitle" : "User Type",
                "mData" : "userType",
                "bSortable" : false
            },
            
            {
                "sTitle": "Delete",
                "bSortable": false,
                "sDefaultContent": "<h5><a class='dt-remove' style='cursor: pointer'></a></h5>"
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
            $(this).addClass('text-default').append('<button style="background:#008CBA; color:white; border: none;padding: 7px 18px;">Fund Transfer</button>');
            var table = $('#groupBuyTable').DataTable();
            $(this).on('click', function() {
                var table = $('#groupBuyTable').DataTable();
                var data = table.row($(this).parents('tr')).data();
                var path = SITEBASEURL + 'nodal/beneficiary/transferFund/' + data.beneficiaryRefId+'/'+data.accountNumber+'/'+data.ifsc+'/'+data.name;
                $("<form action='" + path + "'></form>").appendTo('body').submit();
            });
        });
        $(".dt-remove").each(function() {
        	$(this).empty();
            $(this).append("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");
            $(this).on('click', function() {
                if (confirm('are you sure you want to Delete this record?')) {
                    var table = $('#groupBuyTable').DataTable();
                    var data = table.row($(this).parents('tr')).data();
                    var path = SITEBASEURL + 'nodal/beneficiary/' + data.beneficiaryRefId;
                    $("<form action='" + path + "'></form>").appendTo('body').submit();
                }
                else{
                    return false;
                }

            });
        });


    });
}

