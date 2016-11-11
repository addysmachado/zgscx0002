/* eslint-disable max-params */
sap.ui.define([
	// Include the dependencies by their namespace
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
// the dependencies are passed to this function in the same order
function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("zgscx0002.app.controller.Jobs", {

		// The onInit method is called automatically by the framework when
		// the view instance has been created 
		onInit: function() { 

			var oAppModelT = sap.ui.getCore().getModel();
			this.getView().setModel(oAppModelT); 
			//var tblJobs  = this.getView().byId("idJobsTable");
			
			//if(tblJobs)
				//tblJobs.setModel(oAppModelT);
		},
		
		pressNavTab: function (evt) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Parametros",  null, null);
			//this.getOwnerComponent().getTargets().display("Parametros");
			
		},

		onListItemPress: function (evt) {

			// Obtenemos el item seleccionado por el usuario
			var myContext = evt.getSource().getBindingContext();
			var myObject = evt.getSource().getBindingContext().getObject();
			var oPath = myContext.getPath();
			
			var objHeader  = this.getView().byId("objHeader");
			var objTable   = this.getView().byId("idTableDet");
			
			if (objHeader)
				objHeader.bindElement(oPath);
			
			var oAppModeli   = sap.ui.getCore().getModel();
			this.getView().setModel(oAppModeli);
			var oAppModelLog = new sap.ui.model.json.JSONModel();
			
			var txtJobname  = oAppModeli.getProperty(oPath +"/Jobname");
			var txtJobcount = oAppModeli.getProperty(oPath +"/Jobcount");

			jQuery.getJSON("rs/procesos/log?jobname="+txtJobname+"&jobcount="+txtJobcount).done(function(mData) {
				oAppModelLog.setData(mData);
			});			
			
			
			objTable.setModel(oAppModelLog);
			
		}		
		
	});
});