/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zR002/ZR002_APP/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});