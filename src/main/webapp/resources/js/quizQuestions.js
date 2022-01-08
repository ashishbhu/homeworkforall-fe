$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "quiz/question/dataList?categoryId="+$("#categoryId").val();
		var table = $('#quizQuestionTable').dataTable({
			"destroy": true,
			"bDestroy": true,
			"bProcessing": true,
			"bServerSide": true,
			"ordering": true,
			//"bSearchable": true,
			"bFilter": false,
			"scrollX": true,
			"sAjaxSource": reportUrl,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "id",
				"bSortable": false
			},
			{
				"sTitle": "ReferenceId",
				"mData": "referenceId",
				"bSortable": false
			},
			{
				"sTitle": "Question",
				"mData": "question",
				"bSortable": false
				
			},
			{
				"sTitle": "CategoryName",
				"mData": "categoryName",
				"bSortable": false
			},
			{
				"sTitle": "Games91UsedCount",
				"mData": "games91UsedCount",
				"bSortable": false
			},
			{
				"sTitle": "Games91UsedQuizzes",
				"bSortable": false,
				render : function(data, games91UsedQuizzes, row, meta) {
					if(row.games91UsedQuizzes != null){
						return row.games91UsedQuizzes;
					} else {
						return "";
					}
				}
			},
			{
				"sTitle" : "Action",
				"bSortable" : false,
				render : function(data, isEditable, row, meta) {
					if(row.isEditable != null && row.isEditable == true){
						return "<span><a class='dt-edit'></a></span>";
					} else {
						return "";
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
		
		$("#quizQuestionTable").on('draw.dt', function() {
			$(".dt-edit").each(
					function() {
						$(this).empty();
						$(this).addClass('text-default')
						.append("<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
						$(this).on('click', function() {
								var table = $('#quizQuestionTable').DataTable();
								var data = table.row($(this).parents('tr')).data();
								var path = SITEBASEURL+ 'quiz/question/update/'+ data.referenceId;
								$("<form action='"+ path+ "'></form>").appendTo('body').submit();
							});
					});
		});

}
