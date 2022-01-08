$(document).ready(function() {
	

$("#search").click(function() {


callToResult();

	});


});

function callToResult() {

	var reportUrl = SITEBASEURL + "content/get_all_user_detail_who_posted_spam_content_list?fromDate="+ $("#fromDate").val() + "&toDate="
	+ $("#toDate").val();
	var table = $('#spamWalletTable')
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
									"sTitle" : "User Name",
									"mData" : "userName",
									"bSortable" : false
								},
								{
									"sTitle" : "Phone Number",
									"mData" : "phoneNumber",
									"bSortable" : false
								},
								{
									"sTitle" : "Post Title",
									"mData" : "title",
									"bSortable" : false
								},

								{
									"sTitle" : "Post Created Date",
									"mData" : "postCreateDate",
									"bSortable" : false
								},

								{
									"sTitle" : "Post",
									"bSortable" : false,
									"render" : function(postUrl, type, row) {
										if (row.postUrl == undefined  ||row.postUrl == ''||  row.postUrl == 'null') {
											
											
											return "-";
										} else  if(row.mediaType==1) {
											
										
											return "<a target='_blank' href="
													+ row.postUrl
													+ "><img src="
													+ row.postUrl
													+ " height='40px' width='40px'></a>";
											
										}
										
										else {
											
											return  "<a target='_blank'  href="
													+ row.postUrl
													+ "><button >Watch Video </button> </a>"
								
										}
										
										
									}
								},

								{
									"sTitle" : "Amount",
									"mData" : "amount",
									"bSortable" : false
									
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


var dtable = $("#spamWalletTable").dataTable().api();
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


function callForView(walletId){
	
	window.location.href = SITEBASEURL +'withDrawal/delete-wallet/'+walletId+'?fromDate=' + $('#fromDate').val() + '&toDate='+$('#toDate').val();
}


