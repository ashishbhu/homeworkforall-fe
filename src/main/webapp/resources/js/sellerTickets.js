$(document).ready(function() {
	//callToResults();
});
	function callToResults() {
		var sellerId = $("#sellerId").val();
		if(sellerId == null){
			sellerId = '';
		}
		
		var ticketPriority = $("#priorityId").val();
		if(ticketPriority == null){
			ticketPriority = '';
		}
		var reportUrl = SITEBASEURL + "seller/ticket/dataList?sellerId="+sellerId+"&ticketPriority="+ticketPriority;
		var table = $('#sellerTicketsTable').dataTable({
			 "destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bFilter": false,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			},
			{
				"sTitle": "TicketNumber",
				//"mData": "ticketNumber",
				"bSortable": false,
				render : function(data, type, row, meta) {
					return '<a href="' + SITEBASEURL
							+ 'seller/ticket/'
							+ row.id+'?sellerId='+sellerId+'&ticketPriority='+ticketPriority
							+ '">' + row.ticketNumber
							+ '</a>';
				}
			}
			,{
				"sTitle": "Date",
				"mData": "date",
				"bSortable": false
			}
			,{
				"sTitle": "Seller",
				"mData": "sellerName",
				"bSortable": false
			}
			,{
				"sTitle": "Title",
				"mData": "title",
				"bSortable": false,
				/*render : function(data, type, row, meta) {
					return '<a href="' + SITEBASEURL
							+ 'seller/ticket/'
							+ row.id+'?sellerId='+sellerId+'&ticketPriority='+ticketPriority
							+ '">' + row.title
							+ '</a>';
				}*/
			}
			,{
				"sTitle": "Status",
				"bSortable": false,
				"mData": "status"
			},
			{
				"sTitle": "CommentedOn",
				"bSortable": false,
				"mData": "commentedOn"
			},
			{
				"sTitle": "CommentedBy",
				"bSortable": false,
				"mData": "commentedBy"
			},
			{
				"sTitle": "Priority",
				"bSortable": false,
				"mData": "priority"
			},
			{
				"sTitle": "Update",
				"bSortable": false,
				"sDefaultContent": "<a class='dt-view'></a>"
			},
			{
				"sTitle" : "Action",
				"bSortable" : false,
				render : function(data, type, row, meta) {
					return "<span><a class='dt-close'></a></span>";
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
		
		$("#sellerTicketsTable").on('draw.dt', function() {
			$(".dt-view").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
								.append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
						
						var table = $('#sellerTicketsTable').DataTable();
						var data = table.row($(this).parents('tr')).data();
						if(data.priority == 'MODERATE')
						{
						    $(this).parents('tr').css('background', '#f5fa64');
						}
						else if(data.priority == 'URGENT') {
							$(this).parents('tr').css('background', 'red');
						}
						$(this).on('click', function() {
								var table = $('#sellerTicketsTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
//								var path = SITEBASEURL+ 'seller/ticket/update/'+ data.id;
//								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
								updateTicket(data.id);
							});
					});
			
			$(".dt-close").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
								.append('<button class="btn btn-danger" style="display:float:left; ">CLOSE</button>');
						$(this).on('click', function() {
								var table = $('#sellerTicketsTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								closeTicket(data.id);
//								var path = SITEBASEURL+ 'seller/ticket/close/'+ data.id;
//								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
							});
					});
		});

}
	
function updateTicket(ticketId){
	var sellerId = $("#sellerId").val();
	if(sellerId == null){
		sellerId = '';
	}
	var ticketPriority = $("#priorityId").val();
	if(ticketPriority == null){
		ticketPriority = '';
	}
	var path = SITEBASEURL+ 'seller/ticket/update/'+ ticketId+'?sellerId='+sellerId+'&ticketPriority='+ticketPriority;
	window.open(path, "_self");
}

function closeTicket(ticketId){
	var sellerId = $("#sellerId").val();
	if(sellerId == null){
		sellerId = '';
	}
	var ticketPriority = $("#priorityId").val();
	if(ticketPriority == null){
		ticketPriority = '';
	}
	var path = SITEBASEURL+ 'seller/ticket/close/'+ ticketId+'?sellerId='+sellerId+'&ticketPriority='+ticketPriority;
	window.open(path, "_self");
}
