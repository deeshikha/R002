// var oModelContecxt = [];
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("zR002.ZR002_APP.controller.BusinessPartnerAdd", {
		onInit: function () {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("zBussPartAdd");
			this.getView().setModel(oModel);
			that.fetchBusinessPartnerAddress();
		},

		fetchBusinessPartnerAddress: function(){
			var that = this,
				aBusPartner = [],
		     	oBusParner = {},
		     	aLabelOdata = [],
				oLabelOdata = {},
				aMergedData = [],
				aHeader = [],
			    sPath = "/A_BusinessPartnerAddress",
			    oModel = this.getView().getModel();
			    oModel.read(sPath,{
			    	success: function(oData){
			    		var that1 = that;
			    		aBusPartner = oData.results;
			    		aBusPartner = that.fetchRequiredBusPartnerFields(aBusPartner);
			    		that.aBusPartner = aBusPartner;
			    		var oModel1 = that.getView().getModel("zLabelOdata"),
			    		sPath1 = "/YY1_R002_ZLABEL_OData";
			    		oModel1.read(sPath1,{
			    			success:function(oData1){
			    				var oModelContext = that,
			    				aBusPartner = oModelContext.aBusPartner;
			    				aLabelOdata = oData1.results;
			    				oModelContext.aLabelOdata = aLabelOdata;
			    				aMergedData = oModelContext.mergeData(aLabelOdata , aBusPartner);
			    				aHeader = oModelContext.createHeader(aMergedData);
			    				var oVBox = oModelContext.getView().byId("VBoxTable");
			    				var oModel2 = new sap.ui.model.json.JSONModel();
								oModel2.setData({
									rows: aMergedData,
									columns: aHeader
								});
								var oTable = new sap.ui.table.Table({
									selectionMode: sap.ui.table.SelectionMode.None,
									visibleRowCount: 15,
									width: "100%",
									editable: false
								});
								oTable.setModel(oModel2);
								
								oTable.bindColumns("/columns", function(sId, oContext) {
								var columnId = oContext.getObject().columnId;
								// var string = oContext.getPath(),
								// 	firstCol = "/0";
								// if ((string.indexOf(firstCol) !== -1) && (string.length === 10)) {
									return new sap.ui.table.Column({
										label: columnId,
										width: "120px",
										minWidth: 150,
										template: new sap.m.Label().bindProperty("text", columnId)
										});
									// } 
								});
								oTable.bindRows("/rows");
								oVBox.addItem(oTable);
			    			}
			    		});
			    	}
			    });
		},
		fetchRequiredBusPartnerFields: function(inBusPartner){
			//create one array of required fields
			var aFields = [];
			    aFields.push("StreetSuffixName");
			    aFields.push("District");
			    aFields.push("BusinessPartner");
			var outBusPartner = inBusPartner.map(function(o){
				    // use reduce to make objects with only the required fields
				    // and map to apply this to the filtered array as a whole
				    return aFields.reduce(function(newo, field){
				        newo[field] = o[field];
				        return newo;
				    }, {});
				});
			    return outBusPartner;
		},
		createHeader: function(inData){
			var aHeader1 = Object.keys(inData[0]),
			aHeader = [];
			aHeader1.sort();
			$.each(aHeader1, function(i, val){
				if((val !== "__metadata" ) && (val !== "to_YY1_R002_CertifiGrade_SDI" )&& 
				(val !== "to_YY1_R002_KWS_Bonatical_SDI" )&& (val !== "to_YY1_R002_Packaging_SDI" )&& 
				(val !== "to_YY1_R002_TreatmentComb_SDI" )&& (val !== "to_YY1_R002_VarietyName_SDI" )&&
				(val !== "ID" )){
				aHeader.push({
							"columnId": (val)
						});
				}
			});
			return aHeader;
		},
		mergeData: function(inLabelOdata, inBusPartner){
			var aMergedData = [],
				oMergedData = {},
				aMergedData1 = [],
				aMergedData2 = [];
			inBusPartner.forEach(function(b,i,ar){
				inLabelOdata.forEach(function(l,j,ar1){
					if(b.BusinessPartner === l.Customer){
						// oMergedData =  $.extend( b, l );
						oMergedData = Object.assign({}, b, l);
						aMergedData.push(oMergedData);
						aMergedData1.push(oMergedData);  //just to test data count ;
						oMergedData = {};
					
					}
				});
				if(aMergedData1.length > 0){
					aMergedData2[b.BusinessPartner] = aMergedData1;
					aMergedData1 = [];
				}
			});
			return aMergedData;
		}
	});
});