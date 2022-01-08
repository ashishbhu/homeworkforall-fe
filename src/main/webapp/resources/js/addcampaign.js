

$(document).ready(function(){

	$("#videoSource").change(function(){
		$("#videoUrl").val("");
	});

	$(".colorpicbox").colorpicker({
		format:"hex",
		customClass: 'colorpicker-2x',
		sliders: {
			saturation: {
				maxLeft: 200,
				maxTop: 200
			},
			hue: {
				maxTop: 200
			},
			alpha: {
				maxTop: 200
			}
		}
	});



	$("input[name=watchLaterSession]").change(function(){
		var watchLaterValue = $('input[name=watchLaterSession]:checked').val();
		if (watchLaterValue == 2) {
			$("#buffer").removeAttr("disabled");
			$("#watchLaterTitleWrapper").css("display","block");
			$("#watchLaterMessageWrapper").css("display","block");
			$("#watchLaterTitle").val("Just Watch Five Seconds for FREE access to Buzzworthy Content");
			$("#watchLaterMessage").text("If you click play and watch now, we will never show this to you again! \n\nWe do NOT track you or leave cookies.");
		} else {
			$("#buffer").attr("disabled","disabled");
			$("#watchLaterTitleWrapper").css("display","none");
			$("#watchLaterMessageWrapper").css("display","none");
			$("#watchLaterTitle").val("");
			$("#watchLaterMessage").text("");
		}
		checkOptOutValue();
	});


	thirdPartyOverlyChanges();

	$("#isThirdPartyAdServer").change(function(){
		thirdPartyOverlyChanges();
	});

	$("#readMoreRequired").change(function(){
		readMoreChanges();
	});

	/*$("#shareThisOn").change(function(){
	 shareThisOnText();
	 });
	 */
	$("#isLeftOverlay").change(function(){

		if ($(this).is(":checked")) {
			$("#overlayLeft").show();
		} else {
			$("#overlayLeft").hide();
		}
	});

	$("#isRightOverlay").change(function(){
		if ($(this).is(":checked")) {
			$("#overlayRight").show();
		} else {
			$("#overlayRight").hide();
		}
	});

	$(".script").click(function(){
		var divId = $(this).attr("id");
		$('#addTagScriptWrapper').html($("#"+divId+"_div").html());
	});

	$(".preview").click(function(){

		$('#unitPreviewHtml').html("");
		$('#unitPreviewHtmlTablet').html("");

		var appId = $(this).attr("id");
		var type = $(this).attr("previewType");

		var previewURL = SITEBASEURL + "/impression/preview?appId=" + appId + "&type=" + type;

		$.ajax({
			url: previewURL,
			type:"GET",
			success: function(e) {
				if(type == "mobile") {
					$('#unitPreviewHtml').html(e);
				} else {
					$('#unitPreviewHtmlTablet').html(e);
				}

				$( ".modal-backdrop" ).click(function() {
					$("body").css("position","relative");
				});
			},
			error: function(e) {
				console.log(e);
			}
		});

	});

	$( ".close" ).click(function() {
		$("body").css("position","relative");
	});

	$("input[name='applicationType']").change(function(){
		setApplicationTypeContent($(this).val());
	});

	setApplicationTypeContent($("input[name='applicationType']:checked").val());

	$("input[name='thirdPartyNeworkType']").change(function(){
		setThirdPartyNetworkType($(this).val());
	});

	setThirdPartyNetworkType($("input[name='thirdPartyNeworkType']:checked").val());

	$("input[name='featureContent.featureContentType']").change(function(){
		setFeatureContentType($(this).val());
	});

	setFeatureContentType($("input[name='featureContent.featureContentType']:checked").val());

	$("input[name='featureContent.readMoreType']").change(function(){
		setReadMoreType($(this).val());
	});

	setReadMoreType($("input[name='featureContent.readMoreType']:checked").val());

	$("#videoSource").change(function(){
		var videoSource = $(this).val();

		$("#uploadImageLabel").html("Upload image: 1500x800");
		$("#uploadImageHelp").css("display","none");
		$("#embedCode").css("display","none");
		$("#facebookCode").val("");
		$("#facebook").css("display","none");
		$("#animatedGif").css("display","none");
		$("#animatedGifLength").css("display","none");

		if(videoSource == "2"){
			$("#facebook").css("display","block");
		} else if(videoSource == "4"){
			$("#animatedGif").css("display","block");
			$("#uploadImageHelp").css("display","block");
			$("#uploadImageLabel").html("Upload gif");
			$("#animatedGifLength").css("display","block");
		} else if(videoSource == "6"){
			$("#animatedGif").css("display","block");
			$("#embedCode").css("display","block");
		} else {
			$("#embedCode").css("display","block");
		}

		if(videoSource == "5") {
			$("#youTubeLabel").html("Video URL");
			$("#youTubeInstrucation").css("display","none");
		} else if (videoSource == "1" || videoSource == "3" || videoSource == "6" || videoSource == "7") {
			$("#youTubeLabel").html("Place media type embed code here");
			if(videoSource == "1") {
				$("#youTubeInstrucation").css("display","block").css("margin-left","40px");
			} else {
				$("#youTubeInstrucation").css("display","none");
			}
		}
	});

	$(".youTubeSubscribeOnChkBx").click(function () {
		setYouTubeSubscription();
	});

	$("input[name='parentPageTitleType']").change(function(){
		if($(this).val() == 2) {
			$("#parentPagetitleWrapper").css("display","block");
		} else {
			$("#parentPagetitleWrapper").css("display","none");
			$("#parentPageTitle").val("");
		}
	});


	$(".addPriority").click(function(){

		var appID = $(this).closest('form').find('input#appId').val();
		var priority = $(this).closest('form').find("input#priority").val();
		var currentObject = $(this);

		if(appID == "" || appID == null || appID == "null" || appID === undefined){
			$(currentObject).closest('fieldset').find('div.priorityError').html("appId can not be null or blank").css("display","block");
			$(currentObject).closest('fieldset').find('div.prioritySuccess').html("").css("display","none");
		} else {

			var priorityUrl = SITEBASEURL + "/impression/addPriority";

			var data = {
				appId :  appID,
				priority : priority
			};

			$.ajax({
				url: priorityUrl,
				type:"POST",
				data:JSON.stringify(data),
				contentType:"application/json",
				dataType:"json",
				success: function(e) {
					$(currentObject).closest('fieldset').find('div.prioritySuccess').html("Priority is updated successfully").css("display","block");
					$(currentObject).closest('fieldset').find('div.priorityError').html("").css("display","none");
				},
				error: function(e) {
					if(e.status == 200){
						$(currentObject).closest('fieldset').find('div.prioritySuccess').html("Priority is updated successfully").css("display","block");
						$(currentObject).closest('fieldset').find('div.priorityError').html("").css("display","none");
					} else{
						$(currentObject).closest('fieldset').find('div.priorityError').html(e.responseJSON.fieldErrors[0].message).css("display","block");
						$(currentObject).closest('fieldset').find('div.prioritySuccess').html("").css("display","none");
					}

				}
			});
		}

	});



	checkOptOutValue();

	$("#optOutXEnabled").change(function(){
		checkOptOutValue();
	});




	$('[name ^=channels][name $=channelFullscreen]').on("change", function() {
		var ischecked = $(this).prop( "checked");
		$('[name ^=channels][name $=channelFullscreen]').removeAttr('checked');
		$(this).prop( "checked", ischecked );
	});

	$("input[name=optOutXEnabled]").change(function(){
		checkOptOutValue();
	})

});



function addExcludeUrl(){

	$("#excludeUrlWrapper").append(function() {
		var html = '<div class="excludeUrlWrapper">';
		html += '<div class="col-sm-12" style="margin-top: 10px !important;padding:0px;">';
		html += '<input type="text" id="excludeUrls' + index + '.excludeUrl" name="excludeUrls[' + index + '].excludeUrl" class="form-control"  style="margin-right:10px;float:left;width:75%;"/>';
		html += '<input type="button" style= "margin-top: 8px;" value="Remove" class="btn btn-space btn-danger btn-default removeExcludeUrl" onclick="removeExcludeUrl(this)">';
		html += '</div>';
		html += '<div class="clearfix"></div><div class="errorCustom"><span id="excludeUrls' + index + '.excludeUrl.errors" class="error"></span></div>';
		html += '</div>';
		return html;
	});

	if($(".excludeUrlWrapper").length == 1){
		//$("#addUrlButtonWrapper").css("float","left");
		$("#addUrlButtonWrapper").css("margin-top","0px");
	}

	index++;
	return false;
};

function removeExcludeUrl(obj){
	$(obj).closest("div.excludeUrlWrapper").remove();


	if($(".excludeUrlWrapper").length == 0){
		$("#addUrlButtonWrapper").css("float","left");
		//$("#addUrlButtonWrapper").css("margin-top","-30px");
	}

	var countExURls = 0;
	$('.excludeUrlWrapper').each(function(index) {
		$( this ).find('[id ^=excludeUrls][id $=excludeUrl]').attr("id","excludeUrls" + countExURls + ".excludeUrl").attr("name","excludeUrls[" + countExURls + "].excludeUrl");
		$( this ).find('.IdClass').attr("id","excludeUrls" + countExURls + ".id").attr("name","excludeUrls[" + countExURls + "].id");
		$( this ).find('.error').attr("id","excludeUrls" + countExURls + ".excludeUrl.errors");
		countExURls++;
	});

	index = countExURls;

}


function addIncludeUrl(){

	$("#includeUrlWrapper").append(function() {
		var html = '<div class="includeUrlWrapper">';
		html += '<div class="col-sm-12" style="margin-top: 10px !important;padding:0px;">';
		html += '<input type="text" id="includeUrls' + includeIndex + '.includeUrl" name="includeUrls[' + includeIndex + '].includeUrl" class="form-control" style="margin-right:10px;float:left;width:75%;"/>';
		html += '<input type="button" style="margin-top: 8px;" value="Remove" class="btn btn-space btn-danger btn-default removeIncludeUrl" onclick="removeIncludeUrl(this)">';
		html += '</div>';
		html += '<div class="clearfix"></div><div class="errorCustom"><span id="includeUrls' + includeIndex + '.includeUrl.errors" class="error"></span></div>';
		html += '</div>';
		return html;
	});

	if($(".includeUrlWrapper").length == 1){
		//$("#addIncludeUrlButtonWrapper").css("float","right");
		$("#addIncludeUrlButtonWrapper").css("margin-top","0px");
	}

	includeIndex++;
	return false;
};

function removeIncludeUrl(obj){
	$(obj).closest("div.includeUrlWrapper").remove();


	if($(".includeUrlWrapper").length == 0){
		$("#addIncludeUrlButtonWrapper").css("float","left");
		//$("#addIncludeUrlButtonWrapper").css("margin-top","-30px");
	}

	var countInURls = 0;
	$('.includeUrlWrapper').each(function(includeIndex) {
		$( this ).find('[id ^=includeUrls][id $=includeUrl]').attr("id","includeUrls" + countInURls + ".includeUrl").attr("name","includeUrls[" + countInURls + "].includeUrl");
		$( this ).find('.IdClass').attr("id","includeUrls" + countInURls + ".id").attr("name","includeUrls[" + countInURls + "].id");
		$( this ).find('.error').attr("id","includeUrls" + countInURls + ".includeUrl.errors");
		countInURls++;
	});

	includeIndex = countInURls;

}


function clearElemtns(obj) {
	obj.find('input:text').val('');
	obj.find('textarea').val('');
	obj.find("select").each(function() { this.selectedIndex = 0 });
	obj.find('input[type=radio]').removeAttr('checked');
}

function showChannelTypeUI(value, obj){

	var parentAddChannelObject = obj.closest("div.add-channel");

	clearElemtns(parentAddChannelObject.find("div.channelImageWrapper"));
	clearElemtns(parentAddChannelObject.find("div.channelTextWrapper"));
	clearElemtns(parentAddChannelObject.find("div.channelVideoWrapper"));
	clearElemtns(parentAddChannelObject.find("div.channelWidgetWrapper"));
	clearElemtns(parentAddChannelObject.find("div.channelSourceHostWrapper"));


	switch (value) {
		case "0":
			parentAddChannelObject.find("div.channelImageWrapper").css("display","none");
			parentAddChannelObject.find("div.channelTextWrapper").css("display","none");
			parentAddChannelObject.find("div.channelVideoWrapper").css("display","none");
			parentAddChannelObject.find("div.channelWidgetWrapper").css("display","none");
			parentAddChannelObject.find("div.channelSourceHostWrapper").css("display","none");
			parentAddChannelObject.find("div.Facebook").css("display","none");
			break;
		case "1":
			parentAddChannelObject.find("div.channelImageWrapper").css("display","block");
			parentAddChannelObject.find("div.channelTextWrapper").css("display","none");
			parentAddChannelObject.find("div.channelVideoWrapper").css("display","none");
			parentAddChannelObject.find("div.channelWidgetWrapper").css("display","none");
			parentAddChannelObject.find("div.channelSourceHostWrapper").css("display","none");
			parentAddChannelObject.find("div.Facebook").css("display","none");
			break;
		case "2":
			parentAddChannelObject.find("div.channelImageWrapper").css("display","none");
			parentAddChannelObject.find("div.channelTextWrapper").css("display","block");
			parentAddChannelObject.find("div.channelVideoWrapper").css("display","none");
			parentAddChannelObject.find("div.channelWidgetWrapper").css("display","none");
			parentAddChannelObject.find("div.channelSourceHostWrapper").css("display","none");
			parentAddChannelObject.find("div.Facebook").css("display","none");
			break;
		case "3":
			parentAddChannelObject.find("div.channelImageWrapper").css("display","none");
			parentAddChannelObject.find("div.channelTextWrapper").css("display","none");
			parentAddChannelObject.find("div.channelVideoWrapper").css("display","block");
			parentAddChannelObject.find("div.channelWidgetWrapper").css("display","none");
			parentAddChannelObject.find("div.channelSourceHostWrapper").css("display","none");
			parentAddChannelObject.find("div.Facebook").css("display","none");
			break;
		case "4":
			parentAddChannelObject.find("div.channelImageWrapper").css("display","none");
			parentAddChannelObject.find("div.channelTextWrapper").css("display","none");
			parentAddChannelObject.find("div.channelVideoWrapper").css("display","none");
			parentAddChannelObject.find("div.channelWidgetWrapper").css("display","block");
			parentAddChannelObject.find("div.channelSourceHostWrapper").css("display","none");
			parentAddChannelObject.find("div.Facebook").css("display","none");
			break;
		case "5":
			parentAddChannelObject.find("div.channelImageWrapper").css("display","none");
			parentAddChannelObject.find("div.channelTextWrapper").css("display","none");
			parentAddChannelObject.find("div.channelVideoWrapper").css("display","block");
			parentAddChannelObject.find("div.channelWidgetWrapper").css("display","none");
			parentAddChannelObject.find("div.channelSourceHostWrapper").css("display","block");
			parentAddChannelObject.find("div.Facebook").css("display","none");
			break;
		case "6":
			parentAddChannelObject.find("div.channelImageWrapper").css("display","none");
			parentAddChannelObject.find("div.channelTextWrapper").css("display","none");
			parentAddChannelObject.find("div.channelVideoWrapper").css("display","none");
			parentAddChannelObject.find("div.channelWidgetWrapper").css("display","none");
			parentAddChannelObject.find("div.channelSourceHostWrapper").css("display","none");
			parentAddChannelObject.find("div.Facebook").css("display","block");
			break;
	}
}

function removeExistingChannel(obj,isDeletedFieldId, channelId){
	if(document.getElementById(channelId).value != ""){
		$(obj).parent("div").parent("div.row").css("display","none");
		document.getElementById(isDeletedFieldId).value = true;
	} else {
		$(obj).parent("div").parent("div.row").remove();
		document.getElementById(isDeletedFieldId).value = true;
	}
	channelCount--;
}

/*var campaignId = $("#id").val();
if(campaignId !== 'undefined' && parseInt(campaignId) > 0){
	$("#addEditText").html("Edit");
	$("#createEditTextHeading").html("Edit");
	$("#createEditTextTrueSnip").html("Edit");
	$("#createEditTextArticleSnip").html("Edit");
	$("#createEditTextMetaSnip").html("Edit");
} else {
	$("#addEditText").html("Add");
	$("#createEditTextHeading").html("Create");
	$("#createEditTextTrueSnip").html("Create");
	$("#createEditTextArticleSnip").html("Create");
	$("#createEditTextMetaSnip").html("Create");
	//Need to fix submit buttom above space
	//$(".submitBtn").css("margin-bottom","0");
	//$(".custom-button").css("padding-right","0");
	$(".custom-button").css("text-align","right");
}*/



function thirdPartyOverlyChanges(){
	if ($("#isThirdPartyAdServer").is(":checked")) {
		$("#buffer").attr("disabled","disabled");
		$("#watchLaterTitleWrapper").css("display","none");
		$("#watchLaterMessageWrapper").css("display","none");
		$("#watchLaterTitle").val("");
		$("#watchLaterMessage").text("");
		$('input[name=watchLaterSession]').attr("disabled","disabled");
		$('input[name=watchLaterSession][value=1]').prop('checked',true);
		$("#isThirdPartyAdServerImageWrapper").css("display","block");
		checkOptOutValue();
	} else {
		$('input[name=watchLaterSession]').removeAttr("disabled");
		$("#isThirdPartyAdServerImageWrapper").css("display","none");
		checkOptOutValue();
	}
}
function readMoreChanges(){
	if ($("#readMoreRequired").is(":checked")) {
		$("#readMoreWrapper").css("display","block");

	} else {
		$("#readMoreWrapper").css("display","none");
	}
}

function shareThisOnText(){
	if ($("#shareThisOn").is(":checked")) {
		$("#shareThisOnTextWrapper").css("display","block");

	} else {
		$("#shareThisOnTextWrapper").css("display","none");
	}
}

function setYouTubeSubscription(){
	if ($('input[class=youTubeSubscribeOnChkBx]:checked').val() == 2 || $('input[class=youTubeSubscribeOnChkBx]:checked').val() ==3) {
		$("#youTubeChannelNameWrapper").css("display","block");
	} else {
		$("#youTubeChannelNameWrapper").css("display","none");
		$(".youTubeChannelNameTxt").val("");
	}
}


function deleteFeatureContentImage(obj){

	var campaignId = $("input[name='campaignContentAttribute.campaignId']").val();

	if(confirm("Are you sure! You want to delete this featured image?")){
		$.ajax({
			url: SITEBASEURL + '/campaign/featuredContent/image?campaignId=' + campaignId,
			type: 'DELETE',
			success: function(result) {
				$(obj).prev("div").find("input[name='featureContent.contentImage']").val("");
				$(obj).prev("div").find("input[name='featureContent.image']").val("");
				$(obj).prev("div").find("img").remove();
				$(obj).remove();
			}
		});
	}

	return false;
}

function deleteFeatureContentTitleImage(obj){

	var campaignId = $("input[name='campaignContentAttribute.campaignId']").val();

	if(confirm("Are you sure! You want to delete this featured title image?")){
		$.ajax({
			url: SITEBASEURL + '/campaign/featuredContentTitle/image?campaignId=' + campaignId,
			type: 'DELETE',
			success: function(result) {
				$(obj).prev("div").find("input[name='featureContent.contentTitleImage']").val("");
				$(obj).prev("div").find("input[name='featureContent.titleImage']").val("");
				$(obj).prev("div").find("img").remove();
				$(obj).remove();
			}
		});
	}

	return false;
}

function deleteAnimatedGifImage(obj)
{
	var campaignId = $("input[name='campaignContentAttribute.campaignId']").val();

	if(confirm("Are you sure! You want to delete this image?")){
		$.ajax({
			url: SITEBASEURL + '/campaign/twitch/image?campaignId=' + campaignId,
			type: 'DELETE',
			success: function(result) {
				$(obj).prev("div").find("input[name='campaignContentAttribute.animatedGif']").val("");
				$(obj).prev("div").find("input[name='campaignContentAttribute.animatedGifPath']").val("");
				$(obj).prev("div").find("img").remove();
				$(obj).remove();
			}
		});
	}

	return false;
}
var isTextAreaInitialized = false;
var isChannelInitialized = false;

function setFeatureContentType(fcValue) {
	if(fcValue == 1 || fcValue == 'undefined' || fcValue == null){
		$("#featureContentUrl").css("display","block");
		$("#featureContent").css("display","none");
		$("#featureContentImage").css("display","none");
		$("#featureContentWidget").css("display","none");
		$("input[name='featureContent.title']").val("");
		$("input[name='featureContent.widgetCode']").val("");
		$("#description").val("");
		$("iframe.cazary-edit").contents().find("body").html("");
		$("#image").val("");
	} else if (fcValue == 2) {
		$("#featureContentUrl").css("display","block");
		$("#featureContent").css("display","block");
		$("#featureContentImage").css("display","block");
		$("#featureContentWidget").css("display","none");
		$("input[name='featureContent.widgetCode']").val("");
		if(!isTextAreaInitialized){
			$("textarea[name='featureContent.description']").cazary({
				commands: "FULL"
			});
			$("textarea[name='featureContent.title']").cazary({
				commands: "FULL"
			});
			isTextAreaInitialized = true;
		}

	} else if(fcValue == 3){
		$("#featureContentUrl").css("display","block");
		$("#featureContent").css("display","none");
		$("#featureContentImage").css("display","block");
		$("#featureContentWidget").css("display","none");
		$("input[name='featureContent.title']").val("");
		$("input[name='featureContent.widgetCode']").val("");
		$("#description").val("");
		$("iframe.cazary-edit").contents().find("body").html("");
	}else if(fcValue == 4){
		$("#featureContentUrl").css("display","block");
		$("#featureContent").css("display","none");
		$("#featureContentImage").css("display","none");
		$("#featureContentWidget").css("display","none");
		$("input[name='featureContent.title']").val("");
		$("input[name='featureContent.widgetCode']").val("");
		$("#description").val("");
		$("iframe.cazary-edit").contents().find("body").html("");
		$("#image").val("");
	}else if(fcValue == 5){
		$("#featureContentWidget").css("display","block");
		$("#featureContentUrl").css("display","none");
		$("#featureContent").css("display","none");
		$("#featureContentImage").css("display","none");
		$("input[name='featureContent.title']").val("");
		$("#description").val("");
		$("iframe.cazary-edit").contents().find("body").html("");
		$("#image").val("");
	}

};

function setReadMoreType(rmValue){
	if(rmValue == 1 || rmValue == 'undefined' || rmValue == null){
		//$("input[name='featureContent.readMoreType'][value='1']").attr('checked','checked');
		$(".readmoretext").css("display","block");
		$(".readmoreimage").css("display","none");
		$("#featureContent.readMoreImage").val("");
		$("input[name='featureContent.readMoreButtonImage']").val("");
	} else if (rmValue == 2) {
		$(".readmoretext").css("display","none");
		$(".readmoreimage").css("display","block");
		$("input[name='featureContent.readMoreText']").val("");
	}
}

function setThirdPartyNetworkType(val) {

	if(val == 1){
		$("#thirdPartyNetworkImageWrapper").css("display","block");
		$("#thirdPartyNetworkHtmlWrapper").css("display","none");
	}
	else if (val == 2){
		$("#thirdPartyNetworkImageWrapper").css("display","none");
		$("#thirdPartyNetworkHtmlWrapper").css("display","block");
	}
}

function setApplicationTypeContent(atValue) {

	if(atValue == 1){
		$("#snipPanel").css("display", "block");
		$("#unlockContentWrapper").css("display","block");
		$("#otherContentWrapper").css("display","block");
		$("#commonContentWrapper").css("display","block");
		$("#featureContentWrapper").css("display","block");
		$("#featureContentTitleImage").css("display","none");
		$("#smartContentWrapper").css("display","none");
		$("#kixerWidgetWrapper").css("display","none");
		setYouTubeSubscription();
	} else if (atValue == 2) {
		$("#snipPanel").css("display", "block");
		$("#unlockContentWrapper").css("display","none");
		$("#otherContentWrapper").css("display","none");
		$("#commonContentWrapper").css("display","none");
		$("#featureContentWrapper").css("display","none");
		$("#featureContentTitleImage").css("display","none");
		$("#kixerWidgetWrapper").css("display","none");
		$("#smartContentWrapper").css("display","block");
		if(!isChannelInitialized){
			$( "#sortable").sortable({
				update: function( event, ui ) {
					$('ul#sortable li').each(function(index) {
						$( this ).find('[id ^=channels][id $=channelPosition]').val(index+2);
						if(index == 0){
							$( this ).find('div.removeChannel').remove();
							$( this ).find('div.removeBtn').remove();
						} else {
							if(!($(this).find('div.removeBtn').html() ||  $(this).find('div.removeChannel').html())) {
								$( this ).find('div.row').append('<div class="removeBtn"><input type="button" value="Remove" class="btn btn-primary"></div>');
							}
						}

						$("div.removeBtn input").off("click").on("click", function() {

							if(typeof  $( this ).closest("li").find('[id ^=channels][id $=id]').val() === 'undefined'){
								$( this ).closest("li").remove();
							} else {
								$( this ).closest("li").find('[id ^=channels][id $=isDeleted]').val(true);
								$( this ).closest("li").find("div.row").css("display","none");
							}
							channelCount--;
						});
					});
				}
			});
			isChannelInitialized = true;
		}
	}
	else if(atValue == 3){
		$("#snipPanel").css("display", "block");
		$("#unlockContentWrapper").css("display","none");
		$("#otherContentWrapper").css("display","none");
		$("#commonContentWrapper").css("display","block");
		$("#featureContentWrapper").css("display","block");
		$("#featureContentTitleImage").css("display","block");
		$("#kixerWidgetWrapper").css("display","block");
		$("#smartContentWrapper").css("display","none");
		setYouTubeSubscription();
	}
};

function playPauseCampaign(obj){

	var campaignId = $("input[name='campaignContentAttribute.campaignId']").val();
	$.ajax({
		url: SITEBASEURL + '/campaign/updateIsPaused?campaignId=' + campaignId,
		type: 'POST',
		success: function(result) {
			var operationType = $(obj).attr("alt");
			if(operationType == "play"){
				$(obj).removeClass("btnPlayCampaign").addClass("btnPauseCampaign");
				$(obj).html("pause");
				$(obj).attr("alt","pause");
			} else if(operationType == "pause") {
				$(obj).removeClass("btnPauseCampaign").addClass("btnPlayCampaign");
				$(obj).html("play");
				$(obj).attr("alt","play");
			}
		}
	});

	return false;
}

function checkOptOutValue() {
	var watchLaterValue = $('input[name=watchLaterSession]:checked').val();
	var optOutXSession = $('input[name=optOutXEnabled]:checked').val();

	if((optOutXSession == 1) && watchLaterValue == 1){
		$('input[name=optOutX]').attr("disabled","disabled");
		$('input[name=optOutX][value=2]').prop('checked',true);

	} else {
		$('input[name=optOutX]').removeAttr("disabled");
	}
}

var campaignId = $("#id").val();
if(campaignId !== 'undefined' && parseInt(campaignId) > 0){
	/*$("#addEditText").html("Edit");*/
} else {
	/*$("#addEditText").html("Add");*/
	//Need to fix submit buttom above space
	//$(".submitBtn").css("margin-bottom","0");
	//$(".custom-button").css("padding-right","0");
	$(".custom-button").css("text-align","right");
}

