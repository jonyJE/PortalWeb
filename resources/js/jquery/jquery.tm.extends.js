(function ($) {
    $.fn.getLabel = function () {
        var text;
        this.each(function () {
            if (this.tagName == 'SELECT') {
                var selectElement = this;
                if (selectElement.options.selectedIndex < 0) {
                    text = "";
                }
                else {
                    text = selectElement.options[selectElement.options.selectedIndex].text;
                }
            }
        });
        return text;
    }
    $.fn.getDate = function () {
        var value2 = null;
        this.each(function () {
            if (this.type == 'text') {
                var value = this.value;
                if (value != "") {
                    value2 = "\/Date(" + Date.parse($.datepicker.parseDate(com.jca.Sistema.formatoFechaJQuery, value)) + ")\/";
                }
            }
        });
        return value2;
    }
    $.dateFromJson = function (json) {
        //var dd = new Date(json.match(/\d+/)[0] * 1);
        if (json == null || json == "/Date(-62135560000000)/") return '';
        try {
            var d = new Date(parseInt(json.slice(6, -2)));
            var day = "0" + d.getDate();
            var month = "0" + (1 + d.getMonth());
            var year = d.getFullYear().toString();
            if (year == 1) return '';
            return day.substring(day.length - 2) + '/' + month.substring(month.length - 2) + '/' + year;
        } catch (e) {
            return "";
        }
    };
    $.timeFromJson = function (json) {
        try {
            if (json.Ticks != undefined && json.Ticks != null) {
                var hour = "0" + json.Hours;
                var minute = "0" + json.Minutes;
                var second = "0" + json.Seconds;

                return hour.substring(hour.length - 2) + ':' + minute.substring(minute.length - 2) + ':' + second.substring(second.length - 2);
            }
        } catch (e) {
            return "";
        }
    };
    $.fn.toggleCheckbox = function () {
        this.attr('checked', !this.attr('checked'));
    }
    $.fn.getCheckboxValues = function () {
        var values = [];
        var i = 0;
        this.each(function () {
            values[i++] = $(this).val();
        });
        return values;
    }

    $.extend($.ui.accordion.prototype.options, { multiple: false });
    var _toggle = $.ui.accordion.prototype._toggle;
    var _clickHandler = $.ui.accordion.prototype._clickHandler;
    $.extend($.ui.accordion.prototype, {
        _toggle: function (toShow, toHide, data, clickedIsActive, down) {
            if (this.options.collapsible && this.options.multiple && toShow.is(':visible')) {
                arguments[1] = arguments[0];
                arguments[3] = true;
            }
            else if (this.options.collapsible && this.options.multiple) {
                arguments[1] = $([]);
            }
            _toggle.apply(this, arguments);
            this.active
.removeClass("ui-state-active ui-corner-top")
.addClass("ui-state-default ui-corner-all")
        },
        _clickHandler: function (event, target) {
            if ($(target).next().is(':visible:not(:animated)')) {
                this.active = $(target);
            }
            _clickHandler.apply(this, arguments)
        }
    });
    $.fn.togglePanels = function () {
        return this.each(function () {
            $(this).addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset").find("h3")
    .addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom")
    .hover(function () { $(this).toggleClass("ui-state-hover"); })
    .prepend('<span class="ui-icon ui-icon-triangle-1-e"></span>')
    .click(function () {
        $(this)
        .toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom")
        .find("> .ui-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").end()
        .next().slideToggle();
        return false;
    })
    .next()
      .addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom")
      .hide();
        }).find("h3").first().click();
    };
    $.fn.copyNamedTo = function (other) {
        return this.each(function () {
            $(':input[name]', this).each(function () {
                $('[name=' + $(this).attr('name') + ']', other).val($(this).val())
            })
        })
    }
})(jQuery);
Date.prototype.toMSJSON = function () {
    var date = '/Date(' + this.getTime() + ')/'; //CHANGED LINE
    return date;
};

jQuery.extend(jQuery.validator.messages, {
    required: "Este campo es requerido.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});
//$.extend($.jgrid.defaults, {
//    datatype: 'json',
//    {ajaxGridOptions: { contentType: "application/json" },
//    {ajaxRowOptions: { contentType: "application/json", type: "PUT" },
//    ...
//});