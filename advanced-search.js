
require(["advanced-search-dialog"], (function (AdvancedSearchDialog) {

    "use strict";
    function AdvancedSearchFactory() {}

    AdvancedSearchFactory.prototype.openDialog = function () {                
        var searchDialog = new AdvancedSearchDialog();       
        searchDialog.init();        
        searchDialog.createSearchDialog();
    };
  
    var factory = new AdvancedSearchFactory();
    factory.openDialog(); 
}));
