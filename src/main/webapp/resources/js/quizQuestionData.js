$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "quiz/question/data/list/"+$("#referenceId").val();
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
				"bSortable": false,
			},
			{
				"sTitle": "Score",
				"mData": "score",
				"bSortable": false
			},
			{
				"sTitle": "QuestionReferenceId",
				"bSortable": false,
				render : function(data, type, row, meta) {
					return '<a href="' + SITEBASEURL
							+ 'quiz/question/update/'
							+ row.questionData.referenceId +"?status="+$("#status").val()+"&fromPage=quizQuestionData&quizReferenceId="+$("#referenceId").val()
							+ '" target="_self">' + row.questionData.referenceId
							+ '</a>';
				}
			},
			],
			"sInfo": "<label>Total results found: </label> _TOTAL_  <span>Page _CURRENTPAGE_ of _TOTALPAGES_ </span>",
			"fnRowCallback": function(nRow, aData, iDisplayIndex) {
				var oSettings = table.fnSettings();
				$("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
				return nRow;
			},
		});
		
		$("#quizQuestionTable").on('draw.dt', function() {
			
		});

}
