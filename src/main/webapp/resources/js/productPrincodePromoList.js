$(document).ready(function() {

		var reportUrl = SITEBASEURL + "mall91Product/product-pincode-promo-listing";
		var table = $('#productPromoDiscount').dataTable({
			
			"bServerSide": true,
			"ordering": true,
			"bSearchable": true,
			"bFilter": false,
			"bStateSave": true,
			"sAjaxSource": reportUrl,
			"language": {
				 processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
			    },
			    processing : true,
			"aoColumns": [{
				"sTitle": "#",
				"mData": "productId",
				"bSortable": false
			},
			{
				"sTitle": "ProductId",
				"bSortable": false,
				"mData":"productId"
			},
			{
				"sTitle": "Product Name",
				"bSortable": false,
				"mData":"productName"
			},
			{
				"sTitle" : "Image",
				"bSortable" : false,
				"render" : function(productImage, type, row) {
					if (row.productImage == 'null' || row.productImage == undefined || row.productImage == "-") {
						return "-";
					} else {
						
						
						return "<a target='_blank' href="
								+ row.productImage
								+ "><img src="
								+ row.productImage
								+ " height='40px' width='40px'></a>";
						
					}
				}
			},
				
			{
				"sTitle": "Promo Discount",
				"mData": "promoDiscountAmount",
				"bSortable": false
			},
			{
				"sTitle": "Pincodes",
				//"mData": "pincodes",
				//"bSortable": false,
				 "render": function (pincodes, type, full, meta) {
                     return "<div class='text-wrap width-500'>" + full.pincodes + "</div>";
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
		
});