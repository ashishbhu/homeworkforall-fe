$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "quiz/dataList?status="+$("#status").val();
		var table = $('#quizzesTable').dataTable({
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
				"sTitle": "CreateDate",
				"mData": "createDate",
				"bSortable": false
			},
			{
				"sTitle": "AppName",
				"mData": "appName",
				"bSortable": false
			},
			{
				"sTitle": "Status",
				"mData": "status",
				"bSortable": false
			},
			{
				"sTitle": "ReferenceId",
				//"mData": "referenceId",
				"bSortable": false,
				render : function(data, type, row, meta) {
					return '<a href="' + SITEBASEURL
							+ 'quiz/question/data/'
							+ row.referenceId+"?status="+$("#status").val()
							+ '" target="_self">' + row.referenceId
							+ '</a>';
				}
			},
			{
				"sTitle": "NumberOfQuestions",
				"mData": "numberOfQuestions",
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
		
		$("#quizQuestionTable").on('draw.dt', function() {
			
		});

}
