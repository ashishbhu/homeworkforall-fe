$(document).ready(function() {
	callToResult();

$("#search").click(function() {


callToResult();

	});


});

function callToResult() {

	var reportUrl = SITEBASEURL + "seller-request/get_all_seller_lead_list?fromDate="+ $("#fromDate").val() + "&toDate="
	+ $("#toDate").val();
	var table = $('#sellerLeadTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : true,
						"bStateSave" : true,
						"sAjaxSource" : reportUrl,
						"language" : {
							processing : '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
						},
						processing : true,
						"aoColumns" : [
								{
									"sTitle" : "#",
									"mData" : "id",
									"bSortable" : false
								},
								{
									"sTitle" : "Name",
									"mData" : "name",
									"bSortable" : false
								},
			
			
								{
									"sTitle" : "Email",
									"mData" : "email",
									"bSortable" : false
								},			
			
								{
									"sTitle" : "Phone Number",
									"mData" : "phone",
									"bSortable" : false
								},

                                  {
									"sTitle" : "Category Name",
									"mData" : "categoryName",
									"bSortable" : false
								},
								
								{
									"sTitle" : "haveGST",
									"bSortable" : false,
									"render": function (haveGst, type, row) {
										if (row.haveGst != null && row.haveGst) {
											return "Yes";
										}
										else {
											return 'No';
										}
									}
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


var dtable = $("#sellerLeadTable").dataTable().api();
$(".dataTables_filter input")
    .unbind() // Unbind previous default bindings
    .bind("input", function(e) { 
	    if(($.isNumeric(this.value) && (this.value.length == 10 ))  || e.keyCode == 13  ) {
            dtable.search(this.value).draw();
        }
        if(this.value == "") {
            dtable.search("").draw();
        }
        return;
    });

}


