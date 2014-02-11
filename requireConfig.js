var require = {
    baseUrl : ".",            
    paths: {
        handlebars: "vendor/handlebars",   
        jquery : "vendor/jquery-1.8.3",
        "jquery-ui": "vendor/jquery-ui-1.9.2",
        "jquery-event-drag": "vendor/jquery.event.drag-2.0.min",
        "jquery-validate": "vendor/jquery.validate.min",
        underscore : "vendor/underscore",
        slickCore: "vendor/jquery.SlickGrid-2.1/slick.core",
        slickGrid: "vendor/jquery.SlickGrid-2.1/slick.grid",
        form2js: "vendor/form2js"
    },

    // make these non-require modules global where required.
    shim: {            
        "jquery-ui": {
            exports: "jquery-ui",
            deps: ["jquery"]
        },
        "jquery-validate": {
            exports: "jquery-validate",
            deps: ["jquery", "jquery-ui"]
        },
        "slickCore": {
            exports: "slickCore",
            deps: ["jquery-event-drag"]
        },
        "slickGrid": {
            exports: "slickGrid",
            deps: ["jquery-event-drag"]
        },
        "underscore" : {
            exports : "_"
        },
        "handlebars" : {
            deps: ["jquery"],
            exports : "Handlebars"
        },
        "form2js": {
            exports: "form2js"
        }
    }
};