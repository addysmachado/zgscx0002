/* eslint-disable max-params */
sap.ui.define([
	// Include the dependencies by their namespace	
	"sap/ui/core/mvc/Controller", 
	"sap/hana/cloud/samples/model/formatter"
],
// the dependencies are passed to this function in the same order
function(Controller) {
	"use strict"; 

	return Controller.extend("sap.hana.cloud.samples.factsap_app.view.DetalleBandeja", {

		//formatter: formatter,

		onInit: function () {
			
			// Tomamos los valores para consultar el detalle
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("DetalleBandeja").attachPatternMatched(this._onObjectMatched, this);			
			
			var oDocFactura    = this.getView().byId("docFactura");
			
			if (oDocFactura)
			{
				// Consultamos el detalle del pedido
				oDocFactura.setValue("");
			}
			
		},

		_onObjectMatched: function (oEvent) {
			
			// Obtenemos el modelo inicial
			var oAppModeli = sap.ui.getCore().getModel("oModel");
			
			var oHeader    		= this.getView().byId("objectHeader");
			var oVlrFactura    	= this.getView().byId("vlrFactura");
			var oBukrs         	= this.getView().byId("codSocied");
			var oLifnr         	= this.getView().byId("codLifnr");			
			var oVbeln         	= this.getView().byId("codVbeln");
			var oRadic         	= this.getView().byId("codRadic");
			
			var oData      		= oAppModeli.getProperty("/d/results/" + oEvent.getParameter("arguments").factura +"/Name1");
			var oNumber      	= oAppModeli.getProperty("/d/results/" + oEvent.getParameter("arguments").factura +"/Valor");
			var oSoc      		= oAppModeli.getProperty("/d/results/" + oEvent.getParameter("arguments").factura +"/Bukrs");
			var oCli      	    = oAppModeli.getProperty("/d/results/" + oEvent.getParameter("arguments").factura +"/Lifnr");
			var oRef      		= oAppModeli.getProperty("/d/results/" + oEvent.getParameter("arguments").factura +"/Vbeln");
			var oRad      	    = oAppModeli.getProperty("/d/results/" + oEvent.getParameter("arguments").factura +"/Radic");
			
			if (oVlrFactura)
			{
				oVlrFactura.setValue(oNumber);
			}
			
			oHeader.setTitle(oData);
			oHeader.setNumber(oNumber);
			oBukrs.setText(oSoc);
			oLifnr.setText(oCli);
			oVbeln.setText(oRef);
			oRadic.setText(oRad);

		},
		
		handleNavPress: function (evt) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Bandeja");
			
			// Borramos los datos de la pantalla actual
			this.getView().setModel(null);
			
			var oTablaDet    = this.getView().byId("idTableFact");
			oTablaDet.setModel(null);
			
			var oDocFactura    = this.getView().byId("docFactura");
			var oReferencia    = this.getView().byId("codRefer");
			var oRadicado      = this.getView().byId("codRadicado");
			
			oDocFactura.setValue("");
			oReferencia.setText("");
			oRadicado.setText("");
			
		},
		
		handleEditPress: function (evt) {

			var oPanel    = this.getView().byId("panel");
			oPanel.setVisible(false);
			
			var oPanelEdit    = this.getView().byId("panelEdit");
			oPanelEdit.setVisible(true);
			
		},
		
		handleCancelPress: function (evt) {

			var oPanel    = this.getView().byId("panel");
			oPanel.setVisible(true);
			
			var oPanelEdit    = this.getView().byId("panelEdit");
			oPanelEdit.setVisible(false);
			
		},

		
		handleConsultarPress: function (evt) {

			var oDocFactura    = this.getView().byId("docFactura");
			var oBukrs         = this.getView().byId("codSocied");
			var oLifnr         = this.getView().byId("codLifnr");
			var oVbeln         = this.getView().byId("codVbeln");
			var oRadic         = this.getView().byId("codRadic");
			
			var oReferencia    = this.getView().byId("codRefer");
			var oRadicado      = this.getView().byId("codRadicado");
			
			if (oDocFactura)
			{
				// Consultamos el detalle del pedido
				var oDoc = oDocFactura.getValue();
				var oSoc = oBukrs.getText();
				var oCli = oLifnr.getText();
				
				if (oDoc.length > 0)
				{
					var oAppModel = new sap.ui.model.json.JSONModel();
					
					sap.ui.core.BusyIndicator.show(10);
					jQuery.getJSON("rs/bandeja/pedido?documento="+oDoc+"&sociedad="+oSoc+"&cliente="+oCli+"").done(function(mData) {
							oAppModel.setData(mData);
							oReferencia.setText(oVbeln.getText());
							oRadicado.setText(oRadic.getText());
							sap.ui.core.BusyIndicator.hide();
					}).fail(function() { 
							sap.m.MessageToast.show('No se encuentra información para el Documento '+oDoc);
							sap.ui.core.BusyIndicator.hide();
					});
					
					this.getView().setModel(oAppModel);
					this.getView().bindElement({
						path: "/d"
					});
					
					// Se busca la información en la tabla
					var oTablaDet    = this.getView().byId("idTableFact");
					var oAppModelT   = new sap.ui.model.json.JSONModel();
					
					jQuery.getJSON("rs/bandeja/pedidodet?documento="+oDoc+"&sociedad="+oSoc+"&cliente="+oCli+"").done(function(mData) {
						oAppModelT.setData(mData);
					});
					
					oTablaDet.setModel(oAppModelT);
				}
				else
				{
					sap.m.MessageToast.show('Debe ingresar el número del Documento ');
				}
			}
		},		
		
		handleCompletFact: function (evt) {
			
			var aTabla 			= this.getView().byId("idTableFact");
			var oVlrFactura    	= this.getView().byId("vlrFactura");
			var oHeader    		= this.getView().byId("objectHeader");
			var valorOp			= "";
			var valorFact		= "";
			var bolProcesar		= false;

			// Validamos que el valor de la factura no supere el valor inicial y sea mayor a cero
			if (oVlrFactura)
			{
				valorOp 	= oVlrFactura.getValue();
				valorFact	= oHeader.getNumber();
				
				if( valorOp > 0 && valorOp <= valorFact)
				{
					bolProcesar = true;
				}
				else
				{
					sap.m.MessageToast.show('El valor ingresado debe ser mayor que cero y menor que el valor de la factura '+valorFact);
				}
			}			
			
			if(bolProcesar)
			{
				var dialog = new sap.m.Dialog({
					title: 'Confirmar Pago',
					type: 'Message',
					content: new sap.m.Text({ text: 'Confirma que desea pagar la factura?' }),
					beginButton: new sap.m.Button({
						text: 'Si',
						press: function () {
	
							var sMsg;						
					        var contexts = aTabla.getSelectedContexts();
					        var items    = contexts.map(function(c) {
					           return c.getObject();
					        });						
							
							if (items.length < 1) {
								sMsg = "Debe seleccionar mínimo una factura.";
							} else {
								sMsg = items;
							}				
							
							sap.m.MessageToast.show('Pollo y el servicio??? '+ sMsg);
							dialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: 'No',
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
	 
				dialog.open();	
			}
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