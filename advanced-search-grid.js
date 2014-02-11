define(["slickCore", "slickGrid"], function () {
    "use strict";    
    var resultGrid = null;

    var AdvancedSearchGrid = function() {};

    AdvancedSearchGrid.prototype.createResultGrid = function (searchResult) {
        var columnWidth = 200;
        var columns = [            
            {id: "name", name : "Name", field: "name", width: columnWidth},
            {id: "zipCode", field: "zipCode", name : "Zip code",  width: columnWidth},
            {id: "city", field: "city", name: "city",  width: columnWidth}
        ],
        options = {};
        try {
            resultGrid = new Slick.Grid("#advanced-search-result-grid", searchResult, columns, options);
        } catch(e) {
            alert("Error loading slick grid, please try to refresh the page");
        }
    };

    AdvancedSearchGrid.prototype.updateGrid = function (searchResult) {
        resultGrid.setData(searchResult);  
        resultGrid.render();
    };

    return AdvancedSearchGrid;    
});