define(["handlebars", "underscore", "jquery-ui"], function (Handlebars, _, jqueryUi) {
    "use strict";

    var leftFieldsetTemplateId = "advanced-search-person-dialog-left-fieldset-template",
        rightFieldsetTemplateId = "advanced-search-person-dialog-right-fieldset-template",
        dialogHolderId = "advanced-search-dialog-content",
        dialogTemplateId = "advanced-search-dialog-template";
    
    var AdvancedSearchDialogBuilder = function() {};    

    // PUBLIC 

    AdvancedSearchDialogBuilder.prototype.createDialog = function (dialogOptions) {
        var dialog;            

        $("#" + dialogHolderId).empty().append(compileTemplate(dialogTemplateId)());
        dialog = $("#" + dialogHolderId).dialog(dialogOptions);
        setupSearchFields();
        return dialog;
    };   

    // PRIVATE

    var setupSearchFields = function () {
        setupLeftFieldset();
        setupRightFieldset();
    },

    compileTemplate =  function(templateId) {
        var source = _.isString(templateId) ? $('#' + templateId).html() : $(templateId).html();
        if (!source) {
          console.error('Hittar inte template: ', templateId);
          return;
        }
        return Handlebars.compile(source);
    },

    setupLeftFieldset = function () {
        $("#advanced-search-dialog-left-fieldset").append(
            compileTemplate(leftFieldsetTemplateId)({})
        );
    },

    setupRightFieldset = function () {
        $("#advanced-search-dialog-right-fieldset").append(
            compileTemplate(rightFieldsetTemplateId)({})
        );
    };

    return AdvancedSearchDialogBuilder;
});