sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			const oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createStateModel: function() {
			const oModel = new JSONModel();
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		}

	};
});