define(["advanced-search-validation", "advanced-search-grid", "advanced-search-dialog-builder", "mockJsonDb",
        "form2js"], 
    function (AdvancedSearchValidation, AdvancedSearchGrid, AdvancedSearchDialogBuilder, mockJsonDb) {
    
   "use strict";

    var searchablePersons = mockJsonDb;

    var AdvancedSearchDialog = function() {};

    var dialog,
        dialogElementId = "advanced-search-dialog",    
        advancedSearchValidation,
        advancedSearchGrid,
        dialogBuilder,
        searchResult = [];


    // PUBLIC 

    AdvancedSearchDialog.prototype.init = function () {
        advancedSearchValidation = new AdvancedSearchValidation();        
        advancedSearchGrid = new AdvancedSearchGrid();
        dialogBuilder = new AdvancedSearchDialogBuilder();
    };
         

    AdvancedSearchDialog.prototype.createSearchDialog = function () {
        var dialogOptions = {
            title: "Search person (demo)",
            width: 800, 
            height: "700",
            position: "center",
            resizable: true
        };                    
        dialog = dialogBuilder.createDialog(dialogOptions);

        advancedSearchGrid.createResultGrid(searchResult);

        setEvents();
    };

    // PRIVATE

    var setEvents = function () {   
        $("#" + dialogElementId).on("click", "#advanced-search-cancel", function onClickCancelButton (event) {        
            event.preventDefault();                   
            closeDialog();              
        });

        $("#" + dialogElementId).on("click", "#advanced-search-clear", function onClickClearButton(event) {                   
            event.preventDefault();    
            clearSearchCriteria();     
            clearSearchResultGrid();                         
            advancedSearchValidation.clearAllErrorMessages();
        });

        $("#" + dialogElementId).on("click", "#advanced-search-update", function onClickUpdateButton(event) {             
            validateAndSearch(event); 
        });
    
        $("#" + dialogElementId).on("blur", "input[type=text]", function onInputFieldLostFocus(event) {
            advancedSearchValidation.validateSingleField(event.target);            
        });   

        $("#" + dialogElementId).on("keypress", "input[type=text]", function onClickEnterInTextField(event) {
            if(event.keyCode === 13) {
                validateAndSearch(event);
            }
        });               
    },

    validateAndSearch = function (event) {
        event.preventDefault();
        if(validateForm()) {
            search(function searchSuccessCallback(searchResult) { 
                updateSearchResultData(searchResult);
                updateGrid();
            });                  
        }
    },

    search = function (searchSuccessCallback) {
        var searchRequest = createSearchRequestFromFormData();        

        // MOCK: normally would do an ajax call...
        // $.ajax etc. now just invoking success callback directly.
        searchSuccessCallback(getMockSearchResult(searchRequest));                          
    },

    // using data from mockJsonDb.js to return a fake search result. 
    getMockSearchResult = function (searchRequest) {

        for(var prop in searchRequest) {
            if(searchRequest[prop]) {
                searchRequest[prop] = searchRequest[prop].toUpperCase().trim();
            }
        }

        var filterObject = {};
        if(searchRequest.firstName) {
            filterObject.firstName = searchRequest.firstName;
        }

        if(searchRequest.lastName) {
            filterObject.lastName = searchRequest.lastName;
        }

        if(searchRequest.zipCode) {
            filterObject.zipCode = searchRequest.zipCode;
        }

        if(searchRequest.city) {
            filterObject.city = searchRequest.city;
        }

        return _.where(searchablePersons, filterObject);
    },

    closeDialog = function () {
        dialog.dialog("close"); 
    },
   
    updateSearchResultData = function (data) {            
        searchResult = data;            
    },

    updateGrid = function () {
        advancedSearchGrid.updateGrid(searchResult);
    },        

    clearSearchResultGrid = function () {
        clearSearchResultData();            
        updateGrid();       
    },

    clearSearchResultData = function () {
        updateSearchResultData([]);            
    },

    clearSearchCriteria = function () {
        $("input[type=text]").val("");
    },

    validateForm = function () { 
        return advancedSearchValidation.validateForm();                   
    },        

    createSearchRequestFromFormData = function () {
        var formData = form2js("advanced-search-form");       
        return formData.advancedSearch;
    };

    return AdvancedSearchDialog;
});