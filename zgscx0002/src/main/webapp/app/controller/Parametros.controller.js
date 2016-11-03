/* eslint-disable max-params */
sap.ui.define([
	// Include the dependencies by their namespace
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
// the dependencies are passed to this function in the same order
function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("zgscx0002.app.controller.Parametros", {

		// The onInit method is called automatically by the framework when
		// the view instance has been created 
		onInit: function() { 
/*			var oTabla    = this.getView().byId("idProductsTable");
			var oAppModel = new sap.ui.model.json.JSONModel();

			jQuery.getJSON("rs/bandeja").done(function(mData) {
				oAppModel.setData(mData);
			}); 
			//oAppModel.loadData("rs/bandeja");
			this.getView().setModel(oAppModel);
			//sap.ui.getCore().setModel(oAppModel);		
			oTabla.setModel(oAppModel);*/
			
/*			var oPage    = this.getView().byId("panelEdit");
			var oModel   = sap.ui.getCore().getModel("i18n");
			
			if (oPage) 
				oPage.setModel(oModel);*/
			
		},
		
		hdleConsultarPress: function (evt) {

			var txtJobname  = this.getView().byId("txtJobname");
			var txtUsername = this.getView().byId("txtUsername");
			var datFromDate = this.getView().byId("datFromDate");
			var datToDate 	= this.getView().byId("datToDate");
			var chcSchedul  = this.getView().byId("chcSchedul");
			var chcReady  	= this.getView().byId("chcReady");
			var chcPrelim  	= this.getView().byId("chcPrelim");
			var chcRunnig  	= this.getView().byId("chcRunnig");
			var chcFinish  	= this.getView().byId("chcFinish");
			var chcAborted  = this.getView().byId("chcAborted");
			
			//Validamos los datos obligatorios del formulario
			this.validarCamposObligatorios(txtJobname, txtUsername, datFromDate, datToDate);
			
		},
		
		
		validarCamposObligatorios: function (JobName, Username, FromDate, ToDate)
		{
			if (JobName.getValue() == '')
				MessageToast.show("Debe ingresar el nombre del Job");
			if (Username.getValue() == '')
				MessageToast.show("Debe ingresar el usuario que ejecutó el Job");
			if (FromDate.getValue() == '')
				MessageToast.show("Debe ingresar una fecha de inicio");
			if (ToDate.getValue() == '')
				MessageToast.show("Debe ingresar una fecha fin");
		}
		
		
		
	});
});


//sap.ui.controller("gestionpedidos.Bandeja", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf gestionpedidos.Bandeja
*/
	/*
	onInit: function() { 

		var oAppModel = new sap.ui.model.json.JSONModel();
		var oTabla    = this.getView().byId("idProductsTable");

		//var oModel = new sap.ui.model.odata.ODataModel("http://inmdesapd01.suramericana.com.co:8000/sap/opu/odata/SAP/ZGSMM0001_SRV", true, "addymaro", "Surasapd2010");
		jQuery.getJSON("rs/bandeja").done(function(mData) {
			oAppModel.setData(mData.d);
		});
		//oAppModel.loadData("rs/bandeja");

		sap.ui.getCore().setModel(oAppModel);		
		oTabla.setModel(oAppModel);
		
	},
	
	handleItemPress: function (evt) {

		var app = sap.ui.getCore().byId("gestionMM");  
        app.to("idBandeja2");  		
		
	}	
*/
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf gestionpedidos.Bandeja
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf gestionpedidos.Bandeja
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf gestionpedidos.Bandeja
*/
//	onExit: function() {
//
//	}

//});