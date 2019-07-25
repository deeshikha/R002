function initModel() {
	var sUrl = "/S4HC_QSystem_ECC/sap/opu/odata/sap/YY1_R002_ZLABEL_ODATA_CDS/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}