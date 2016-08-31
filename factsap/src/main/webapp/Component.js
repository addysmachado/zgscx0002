/* eslint-disable max-params */
sap.ui.define([
	"sap/ui/core/UIComponent", "sap/ui/model/odata/v2/ODataModel", "sap/ui/model/resource/ResourceModel"
], function(UIComponent, ODataModel, ResourceModel) {
	"use strict";

	var ROUTING_TARGET_CONTROL_ID = "ROOT";

	var Component = UIComponent.extend("sap.hana.cloud.samples.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			// create the views based on the url/hash
			this.getRouter().initialize();			
			this._initModels();
		},

		_initModels: function() {
			var mConfig = this.getMetadata().getConfig();

			var oAppModel = new sap.ui.model.json.JSONModel();
			
			sap.ui.core.BusyIndicator.show(10);
			jQuery.getJSON("rs/bandeja").done(function(mData) {
				oAppModel.setData(mData);
				sap.ui.core.BusyIndicator.hide();
			});

			this.setModel(oAppModel);
			sap.ui.getCore().setModel(oAppModel,"oModel");

			//var oResourceModel = new ResourceModel({
			//	bundleUrl: mConfig.bundleUrl
			//});
			//this.setModel(oResourceModel, "i18n");
		}
	});

	return Component;

}, true /* export */);
