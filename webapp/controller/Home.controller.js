sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"../config/ProjectConfig",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageBox"
], function(Controller, formatter, config, BusyIndicator, MessageBox) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {
			this._oStateModel = this.getOwnerComponent().getModel("state");
			this._getBooks();
			this._getAuthors();
		},

		_getBooks: function () {
			$.ajax({
				beforeSend: function () {
					BusyIndicator.show();
				},
				url: `${config.api.url}/${config.api.prefix}/Books`,
				success: function (data) {
					const aBooks = data.map(item => ({
						"id": item.id,
						"title": item.title
					}));
					this._oStateModel.setProperty("/books", aBooks);
					BusyIndicator.hide();
				}.bind(this),
				error: function (xhr) {
					MessageBox.error(`Status: ${xhr.status}\nText: ${xhr.statusText || xhr.responseText}`);
					BusyIndicator.hide();
				}.bind(this)
			});
		},

		_getAuthors: function () {
			$.ajax({
				url: `${config.api.url}/${config.api.prefix}/Authors`,
				success: function (data) {
					this._oStateModel.setProperty("/authors", data);
				}.bind(this),
				error: function (xhr) {
					MessageBox.error(`Status: ${xhr.status}\nText: ${xhr.statusText || xhr.responseText}`);
					BusyIndicator.hide();
				}.bind(this)
			});
		},

		onBookSelect: function(oEvent) {
			const oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				const oBindingObject = oSelectedItem.getBindingContext("state").getObject();
				const oSelectedBookId = oBindingObject.id;
				const aAuthors = this._oStateModel.getProperty("/authors");
				if (Array.isArray(aAuthors)){
					const aFilteredAuthors = aAuthors.filter(item => item.idBook === oSelectedBookId);
					this._oStateModel.setProperty("/selectedBookAuthors", aFilteredAuthors);
          this._oStateModel.setProperty("/selectedAuthorId", "");
				}
			} else {
				this._oStateModel.setProperty("/selectedBookAuthors", []);
			}
		}
	});
});