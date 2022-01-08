$(document).ready(function() {
	callToResult();

	$('#city').change(function() {
		
			callToResult();

	});

});

function callToResult() {

	
	var reportUrl = SITEBASEURL + "userGroup/view_user_group?city="+ $("#city").val();
	var table = $('#userTable')
			.dataTable(
					{
						"destroy" : true,
						"bServerSide" : true,
						"ordering" : true,
						"bSearchable" : true,
						"bFilter" : false,
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
									"sTitle" : "Image Url",
									"bSortable" : false,
									"render" : function(imageUrl, type, row) {
										if (row.imageUrl == 'null') {
											return "-";
										} else {
											
											
											return "<a target='_blank' href="
													+ row.imageUrl
													+ "><img src="
													+ row.imageUrl
													+ " height='40px' width='40px'></a>";
											
										}
									}
								},
								{
									"sTitle" : "Subject",
									"mData" : "subject",
									"bSortable" : false
								},
								{
									"sTitle" : "Description",
									"mData" : "description",
									"bSortable" : false
								},
								{
									"sTitle" : "Group Status",
									"mData" : "groupStatus",
									"bSortable" : false
								},

								{
									"sTitle" : "Total Member",
									"mData" : "memberCount",
									"bSortable" : false
								},

								{
									"sTitle" : "Pincode",
									"mData" : "pincode",
									"bSortable" : false
								},

								
								
								{
									"sTitle" : "Change Status",
									"bSortable" : false,
									"sDefaultContent" : "<a class='dt-status-n'></a>"
								},
								
								
								
								{
									"sTitle" : "Action",
									"bSortable" : false,
									"sDefaultContent" : "<a class='dt-edit'></a>"
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

	var count = 1;

	$("#userTable")
			.on(
					'draw.dt',
					function() {
						$(".dt-status-n")
								.each(
										function() {
											$(this).empty();
											var table = $('#userTable')
													.DataTable();
											var data = table.row(
													$(this).parents('tr'))
													.data();

											
											var nextSt = data.nextPossibleState;
											var id = data.id;

											var currentStatus = data.groupStatus;

											console.log('id' + id);

											var p1 = "<option value='0'>Select</option>";
											$.each(nextSt, function(i, p) {

												if (currentStatus != p) {
													p1 = p1 + "<option value="
															+ p + "&id="
															+ data.id + ">" + p
															+ "</option>";

												}

											});

									
											$(this)
													.addClass('text-default')
													.append(
															"<select onchange=AlertVal(this) id='orderStateDropDown_"
																	+ count
																	+ "' class='form-control' >"
																	+ p1
																	+ "</select>");

											count++;

										});

						$(".dt-edit")
								.each(
										function() {
											$(this).empty();
											$(this)
													.addClass('text-default')
													.append(
															"<span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>");
											$(this)
													.on(
															'click',
															function() {
																var table = $(
																		'#userTable')
																		.DataTable();
																var data = table
																		.row(
																				$(
																						this)
																						.parents(
																								'tr'))
																		.data();
																var path = SITEBASEURL
																		+ 'userGroup/get/'
																		+ data.id;
																 
																$(
																		"<form action='"
																				+ path
																				+ "'></form>")
																		.appendTo(
																				'body')
																		.submit();
															});

										});

					});

}

function AlertVal(e) {

	var a = e.options[e.selectedIndex].value;

	var result = confirm("Are you sure you want to update status?");
	if (result == true) {
		if (a != '0') {
			$.ajax({
				url : SITEBASEURL + "userGroup/updateStatus?status=" + a,
				context : document.body,
				success : function() {
					$(this).addClass("message");
				}
			});

			window.location.reload();
		}
	}

}
