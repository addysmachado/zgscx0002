/* eslint-disable max-params */
sap.ui.define([
	"sap/ui/core/UIComponent", "sap/ui/model/odata/v2/ODataModel", "sap/ui/model/resource/ResourceModel"
], function(UIComponent, ODataModel, ResourceModel) {
	"use strict";

	var ROUTING_TARGET_CONTROL_ID = "ROOT";

	var Component = UIComponent.extend("zgscx0002.Component", {
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

			var oResourceModel = new ResourceModel({
				bundleUrl: "i18n/i18n.properties"
			});
			sap.ui.getCore().setModel(oResourceModel,"i18n");

		}
	});

	return Component;

}, true /* export */);