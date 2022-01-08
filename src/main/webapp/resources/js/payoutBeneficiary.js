$(document).ready(function() {
	callToResults();
});
	function callToResults() {
		var reportUrl = SITEBASEURL + "exceptional/refund/beneficiary/dataList?status="+$("#status").val();
		var table = $('#payoutBeneficiaryTable').dataTable({
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
				"sTitle": "AppName",
				"mData": "appName",
				"bSortable": false
			},
			{
				"sTitle": "ReferenceId",
				"mData": "referenceId",
				"bSortable": false
			},
			{
				"sTitle": "Registered Phone",
				"mData": "registeredPhoneNumber",
				"bSortable": false
			},
			{
				"sTitle": "Payment Mode",
				"mData": "paymentMode",
				"bSortable": false
			},
			{
				"sTitle": "Beneficiary Phone",
				"bSortable": false,
				render : function(data, phone, row, meta) {
					if(row.phone == null){
						return "-";
					} else {
						return row.phone;
					}
				}
			},
			{
				"sTitle": "UPI",
				"bSortable": false,
				render : function(data, upi, row, meta) {
					if(row.upi == null){
						return "-";
					} else {
						return row.upi;
					}
				}
			},
			{
				"sTitle": "Account Holder Name",
				"bSortable": false,
				render : function(data, accountHolderName, row, meta) {
					if(row.accountHolderName == null){
						return "-";
					} else {
						return row.accountHolderName;
					}
				}
			},
			{
				"sTitle": "Account Number",
				"bSortable": false,
				render : function(data, accountNumber, row, meta) {
					if(row.accountNumber == null){
						return "-";
					} else {
						return row.accountNumber;
					}
				}
			},
			{
				"sTitle": "IFSC",
				"bSortable": false,
				render : function(data, ifsc, row, meta) {
					if(row.ifsc == null){
						return "-";
					} else {
						return row.ifsc;
					}
				}
			},
			{
				"sTitle": "Status",
				"mData": "status",
				"bSortable": false
			},
			{
                "sTitle": "ACTIVE/INACTIVE",
                "bSortable": false,
                	render : function(data, status, row, meta) {
    					if(row.status == 'ACTIVE'){
    						return "<h5><a class='dt-inactive' style='cursor: pointer'></a></h5>";
    					} else {
    						return "<h5><a class='dt-active' style='cursor: pointer'></a></h5>";
    					}
    				}
            },
			{
                "sTitle": "Action",
                "bSortable": false,
                //"sDefaultContent": "<h5><a class='dt-edit' style='cursor: pointer'></a></h5>"
                	render : function(data, status, row, meta) {
    					if(row.status == 'ACTIVE'){
    						return "<h5><a class='dt-edit' style='cursor: pointer'></a></h5>";
    					} else {
    						return "";
    					}
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
		
		$("#payoutBeneficiaryTable").on('draw.dt', function() {
			 $(".dt-edit").each(function() {
		        	$(this).empty();
		            $(this).addClass('text-default').append('<button class="btn btn-custom" style="color:white; border: none;padding: 7px 18px;">Transfer</button>');
		            var table = $('#payoutBeneficiaryTable').DataTable();
		            $(this).unbind().on('click', function() {
		                var table = $('#payoutBeneficiaryTable').DataTable();
		                var data = table.row($(this).parents('tr')).data();
		                fundTransfer(data.referenceId, data.registeredPhoneNumber, data.phone, data.upi, data.accountHolderName, data.accountNumber, data.ifsc);
		            });
		        });
			 
			 $(".dt-inactive").each(function() {
		        	$(this).empty();
		            $(this).addClass('text-default').append('<button class="btn btn-danger" style="color:white; border: none;padding: 7px 18px;">INACTIVE</button>');
		            var table = $('#payoutBeneficiaryTable').DataTable();
		            $(this).unbind().on('click', function() {
		                var table = $('#payoutBeneficiaryTable').DataTable();
		                var data = table.row($(this).parents('tr')).data();
		                if (confirm("Are you sure you want to inactive ?")) {
		                	var path = SITEBASEURL + 'exceptional/refund/update/beneficiary/status/' + data.referenceId+'/'+false;
			                $("<form action='" + path + "'></form>").appendTo('body').submit();
            				return true;
            			  } else {
            				return false;
            			  }
		            });
		        });
			 
			 $(".dt-active").each(function() {
		        	$(this).empty();
		            $(this).addClass('text-default').append('<button class="btn btn-success" style="color:white; border: none;padding: 7px 18px;">ACTIVATE</button>');
		            var table = $('#payoutBeneficiaryTable').DataTable();
		            $(this).unbind().on('click', function() {
		                var table = $('#payoutBeneficiaryTable').DataTable();
		                var data = table.row($(this).parents('tr')).data();
		                if (confirm("Are you sure you want to activate ?")) {
		                	var path = SITEBASEURL + 'exceptional/refund/update/beneficiary/status/' + data.referenceId+'/'+true;
			                $("<form action='" + path + "'></form>").appendTo('body').submit();
            				return true;
            			  } else {
            				return false;
            			  }
		            });
		        });
		});

}
	
	function fundTransfer(referenceId, registeredPhoneNumber, paytmPhone, upi, accountHolderName, accountNumber, ifsc){
		window.location.href = SITEBASEURL + 'exceptional/refund/beneficiary/payout/transfer/'+referenceId+"/"+registeredPhoneNumber+"?accountNumber="+accountNumber+"&ifsc="+ifsc+"&accountHolderName="+accountHolderName+"&upi="+upi+"&beneficiaryPhone="+paytmPhone;
	}
