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
		var reportUrl = SITEBASEURL + "seller/ticket/closed/dataList?sellerId="+sellerId+"&ticketPriority="+ticketPriority;
		var table = $('#sellerClosedTicketsTable').dataTable({
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
			},
			{
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
			],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});
		
		/*$("#sellerClosedTicketsTable").on('draw.dt', function() {
			$(".dt-view").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
								.append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
						$(this).on('click', function() {
								var table = $('#sellerClosedTicketsTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								var path = SITEBASEURL+ 'seller/ticket/update/'+ data.id;
								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
							});
					});
		});*/

}
