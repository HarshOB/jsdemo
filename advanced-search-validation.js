define(["jquery-validate"], function () {
    "use strict";

    var AdvancedSearchValidation = function() {};

    // PUBLIC 

    AdvancedSearchValidation.prototype.validateSingleField = function (element) {            
        $(element).val($(element).val().trim());
        $("input[type=text]").removeClass("error");
        var valid = getValidator().element(element);

        if(valid === true || typeof valid == "undefined") {
            clearValidationErrorMessage();                
        }
    };

    AdvancedSearchValidation.prototype.clearAllErrorMessages = function () {
        $(".advancedSearchErrorMessage").empty();
        $(".error").removeClass("error");
    };

     AdvancedSearchValidation.prototype.validateForm = function () {            
        this.clearAllErrorMessages();

        if(allFieldsAreEmpty()) {
            setValidationErrorMessage("Minst ett fällt måste vara ifyllt.");
        } else {
            return getValidator().form();
        }
    };    

    // PRIVATE

    var getValidator = function () {
        createRules();

        return $("#advanced-search-form").validate({
            errorPlacement: function(error, element) {                  
                setValidationErrorMessage(error.text());
            },
            rules : {
                "advancedSearch.firstName": {checkFirstName: true },
                "advancedSearch.lastName": {checkLastName: true },                                    
                "advancedSearch.zipCode": {
                    maxlength: 5,
                    digits: true
                },
                "advancedSearch.city": {checkCityName: true}
            }
        });
    },

    createRules = function () {

        function lettersOnly (value) {
            return (/^[a-zåäöéè ,.'-]+$/i).test(value);
        }

        $.validator.addMethod("checkFirstName", function(value, element) {
                return this.optional(element) ||  lettersOnly(value);
            }, $.format("Namn får bara innehålla bokstäver.")
        );     

        $.validator.addMethod("checkLastName", function(value, element) {
                return this.optional(element) ||  lettersOnly(value);
            }, $.format("Efternamn får bara innehålla bokstäver.")
        ); 

        $.validator.addMethod("checkCityName", function(value, element) {
                return this.optional(element) ||  lettersOnly(value);
            }, $.format("Ort får bara innehålla bokstäver.")
        );      
    },  

    setValidationErrorMessage = function (message) {
        $("#advanced-search-validation-error-message").text(message);
    },

    clearValidationErrorMessage = function () {
        setValidationErrorMessage(" ");
    },

    allFieldsAreEmpty = function () {                 
        var allEmpty = true;

        $(":input[type=text]").each(function() {
            if($(this).val()) {
                allEmpty = false;
            }
           
        });
        return allEmpty;
    };

    return AdvancedSearchValidation;
});


