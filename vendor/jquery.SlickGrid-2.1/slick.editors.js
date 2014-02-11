/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Editors": {
        "Text": TextEditor,
        "Integer": IntegerEditor,
        "Date": DateEditor,
        "DateTimepicker": DateTimepickerEditor,
        "YesNoSelect": YesNoSelectEditor,
        "Checkbox": CheckboxEditor,
        "PercentComplete": PercentCompleteEditor,
        "LongText": LongTextEditor,
        "ComplementaryConnectedToSelect": ComplementaryConnectedToSelectEditor,
        "ReminderTypeSelect": ReminderTypeSelectEditor,
        "ReminderRecipientsSelect": ReminderRecipientsSelectEditor
      }
    }
  });

  function TextEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class=slickgrid-editor-editor-text />")
          .appendTo(args.container)
          .bind("keydown.nav", function (e) {
            if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
              e.stopImmediatePropagation();
            }
          })
          .focus()
          .select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.getValue = function () {
      return $input.val();
    };

    this.setValue = function (val) {
      $input.val(val);
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val());
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function IntegerEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='slickgrid-editor-editor-text' />");

      $input.bind("keydown.nav", function (e) {
        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

      $input.appendTo(args.container);
      $input.focus().select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (isNaN($input.val())) {
        return {
          valid: false,
          msg: "Please enter a valid integer"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function DateEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    var calendarOpen = false;
   
    this.init = function () {
      $input = $("<INPUT type=text class='slickgrid-editor-editor-text' />");
      $input.appendTo(args.container);
      $input.focus().select();
      
      $input.datepicker({
        showOn: "button",
        buttonImageOnly: true,
        buttonImage: SBAB.iwww.contextPath() + "/resources/images/Kalender_16.png",
        beforeShow: function () {
          calendarOpen = true;
        },
        onClose: function () {
          calendarOpen = false;
        }
      });
      $input.width($input.width() - 18);
    };

    this.destroy = function () {
      $.datepicker.dpDiv.stop(true, true);
      $input.datepicker("hide");
      $input.datepicker("destroy");
      $input.remove();
    };

    this.show = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).show();
      }
    };

    this.hide = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).hide();
      }
    };

    this.position = function (position) {
      if (!calendarOpen) {
        return;
      }
      $.datepicker.dpDiv
          .css("top", position.top + 30)
          .css("left", position.left);
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

    function DateTimepickerEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        var calendarOpen = false;

        this.init = function () {
            $input = $("<INPUT type=text class='slickgrid-editor-editor-text' />");
            $input.appendTo(args.container);
            $input.focus().select();

            var dateToday = new Date();

            $input.datetimepicker({
                showOn: "button",
                buttonImageOnly: true,
                minDate: dateToday,
                buttonImage: SBAB.iwww.contextPath() + "/resources/images/Kalender_16.png",
                beforeShow: function () {
                    calendarOpen = true;
                },
                onClose: function (dateText, inst) {
                    calendarOpen = false;
                }
            });
            $input.width($input.width() - 18);
            $input.prop("disabled", true);

        };

        this.destroy = function (e, e2, e3) {
            $.datepicker.dpDiv.stop(true, true);
            $input.datepicker("hide");
            $input.datepicker("destroy");
            $input.remove();
        };

        this.show = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).show();
            }
        };

        this.hide = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).hide();
            }
        };

        this.position = function (position) {
            if (!calendarOpen) {
                return;
            }
            $.datepicker.dpDiv
                .css("top", position.top + 30)
                .css("left", position.left);
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            defaultValue = moment(defaultValue).format("YYYY-MM-DD HH:mm");
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };

        this.serializeValue = function () {
            return $input.val();
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            var now = moment().format("YYYY-MM-DD HH:mm");

            var a = moment(now),
                b = moment($input.val());

            if(a.diff(b) > 0){
                return {valid: false, msg: "Anget datum måste vara efter dagensdatum."};
            }

            return {valid: true, msg: null};
        };

        this.init();
    }

  function YesNoSelectEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
      $select.appendTo(args.container);
      $select.focus();

    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
      $select.select();
    };

    this.serializeValue = function () {
      return ($select.val() == "yes");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return ($select.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }
  
  function ComplementaryConnectedToSelectEditor(args) {
	  var $select;
      var defaultValue;
      var options = "";
      var scope = this;
      var opt_values = "";

      this.init = function() {

    	  options = args.item.options;
          opt_values = options;

          $select = $("<SELECT tabIndex='0' class='slickgrid-editor-select' />");

          $.each(opt_values, function(idx, o){

              var $optionItem;
        	  var val =  o.partId;
        	  var name = val !== "none" ? SBAB.iwww.helpers.formatters.formatFullName(o.name) : o.name;
              var description = o.description || "";

              $optionItem = $("<option value='" + val + "'>" + name + '' + description + " </option>");

        	  $select.append($optionItem);
          });
          
          $select.appendTo(args.container);
          $select.focus();
      };

      this.destroy = function() {
          $select.remove();
      };

      this.focus = function() {
          $select.focus();
      };

      this.loadValue = function(item) {
          defaultValue = item[args.column.field].partId;
          $select.val(defaultValue);
      };

      this.serializeValue = function() {
          if(options){
            var connectedToObject = _.find(options, function (item) { return item.partId == $select.val(); } );
            return connectedToObject;
          }else{
            return $select.val("all");
          }
      };

      this.applyValue = function(item,state) {
          item[args.column.field] = state;
      };

      this.isValueChanged = function() {
          SBAB.iwww.debug("isValueChanged: " + ($select.val() != defaultValue));
          return ($select.val() != defaultValue);
      };

      this.validate = function() {
          return {
              valid: true,
              msg: null
          };
      };

      this.init();
  }

  function ReminderTypeSelectEditor(args) {
	  var $select;
      var defaultValue;
      var scope = this;

      this.init = function() {

          $select = $("<SELECT tabIndex='0' class='slickgrid-editor-select'><option value='smsForst'>SMS/Mail</option><option value='epostForst'>Mail/SMS</option><option value='manuell'>Manuell</option></SELECT>");
          $select.appendTo(args.container);
          $select.focus();

      };

      this.destroy = function () {
          $select.remove();
      };

      this.focus = function () {
          $select.focus();
      };

      this.loadValue = function (item) {
          defaultValue = item[args.column.field];
          $select.val(defaultValue);
      };

      this.serializeValue = function () {
          return $select.val();
      };

      this.applyValue = function (item, state) {
          item[args.column.field] = state;
      };

      this.isValueChanged = function () {
          return ($select.val() != defaultValue);
      };

      this.validate = function () {
          return {
              valid: true,
              msg: null
          };
      };

      this.init();
  }

    function ReminderRecipientsSelectEditor(args) {
        var $select;
        var defaultValues;
        var options = "";
        var scope = this;
        var opt_values = "";

        this.init = function() {

            options = args.item.options;
            opt_values = options;

            var selectOptions = {
                header: false,
                selectedText: "# valda",
                noneSelectedText: "Minst en person måste vara vald",
                selectedList: 1,
                minWidth: 228,
                autoOpen: true
            };

            $select = $("<SELECT multiple='multiple' name='recipients' tabIndex='0' class='slickgrid-editor-select' />");

            $.each(opt_values, function(idx, o){

                var $optionItem;
                var val = o.partId;
                var name =  SBAB.iwww.helpers.formatters.formatFullName(o.name);
                var description = o.description || "";

                $optionItem = $("<option value='" + val + "'>" + name + '' + description + " </option>");

                if(val !== "none"){
                    $select.append($optionItem);
                }
            });

            $select.appendTo(args.container);
            $select.multiselect(selectOptions);
            $select.focus();
        };

        this.destroy = function() {
            $select.remove();
        };

        this.focus = function() {
            $select.focus();
        };

        this.loadValue = function(item) {

            if(item){

                var partIdsToSelect = [];
                var recipients = item[args.column.field];

                if(recipients.length > 0){

                    $.each(recipients, function (idx, value){
                        partIdsToSelect.push(value.partId);
                    });

                    defaultValues = partIdsToSelect;
                    if(partIdsToSelect.length > 0){
                        $select.val(defaultValues);
                    }
                    $select.multiselect("refresh");
                }

            }
        };

        this.serializeValue = function() {
            if(options){
                var recipients = [];
                var selectedValues = $select.val() || [];

                $.each(selectedValues, function (idx, value){

                    var r = _.find(options, function (item) {
                        return value == item.partId;
                    });

                    if(r){
                        recipients.push(r);
                    }
                });
                return recipients;
            }
            else{
                return [];
            }
        };

        this.applyValue = function(item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function() {
            var currentSelectedValues = $select.val();
            var isChanged = false;

            if(currentSelectedValues){
                currentSelectedValues = _.map(currentSelectedValues, function(val){ return parseInt(val, 10); });
                isChanged = !_.isEqual(currentSelectedValues, defaultValues);
            }
            else {
                isChanged = (currentSelectedValues != defaultValues);
            }

            return isChanged;
        };

        this.validate = function () {
//            var recipients = $select.val();
//            if (!recipients) {
//                return {valid: false, msg: "Minst en person måste väljas."};
//            }
            return {valid: true, msg: null};
        };

        this.init();
    }

  function CheckboxEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
      $select.appendTo(args.container);
      $select.focus();
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      if (defaultValue) {
        $select.attr("checked", "checked");
      } else {
        $select.removeAttr("checked");
      }
    };

    this.serializeValue = function () {
      return $select.attr("checked");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return ($select.attr("checked") != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function PercentCompleteEditor(args) {
    var $input, $picker;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-percentcomplete' />");
      $input.width($(args.container).innerWidth() - 25);
      $input.appendTo(args.container);

      $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
      $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

      $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

      $input.focus().select();

      $picker.find(".editor-percentcomplete-slider").slider({
        orientation: "vertical",
        range: "min",
        value: defaultValue,
        slide: function (event, ui) {
          $input.val(ui.value)
        }
      });

      $picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
        $input.val($(this).attr("val"));
        $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
      })
    };

    this.destroy = function () {
      $input.remove();
      $picker.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
    };

    this.validate = function () {
      if (isNaN(parseInt($input.val(), 10))) {
        return {
          valid: false,
          msg: "Please enter a valid positive number"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  /*
   * An example of a "detached" editor.
   * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
   * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
   */
  function LongTextEditor(args) {
    var $input, $wrapper;
    var defaultValue;
    var scope = this;

    this.init = function () {
      var $container = $("body");

      $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
          .appendTo($container);

      $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
          .appendTo($wrapper);

      $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
          .appendTo($wrapper);

      $wrapper.find("button:first").bind("click", this.save);
      $wrapper.find("button:last").bind("click", this.cancel);
      $input.bind("keydown", this.handleKeyDown);

      scope.position(args.position);
      $input.focus().select();
    };

    this.handleKeyDown = function (e) {
      if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
        scope.save();
      } else if (e.which == $.ui.keyCode.ESCAPE) {
        e.preventDefault();
        scope.cancel();
      } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
        e.preventDefault();
        grid.navigatePrev();
      } else if (e.which == $.ui.keyCode.TAB) {
        e.preventDefault();
        grid.navigateNext();
      }
    };

    this.save = function () {
      args.commitChanges();
    };

    this.cancel = function () {
      $input.val(defaultValue);
      args.cancelChanges();
    };

    this.hide = function () {
      $wrapper.hide();
    };

    this.show = function () {
      $wrapper.show();
    };

    this.position = function (position) {
      $wrapper
          .css("top", position.top - 5)
          .css("left", position.left - 5)
    };

    this.destroy = function () {
      $wrapper.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }
})(jQuery);
