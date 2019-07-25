/*global QUnit*/

sap.ui.define([
	"zR002/ZR002_APP/controller/BusinessPartnerAdd.controller"
], function (Controller) {
	"use strict";

	QUnit.module("BusinessPartnerAdd Controller");

	QUnit.test("I should test the BusinessPartnerAdd controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});