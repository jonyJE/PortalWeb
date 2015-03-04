﻿//sample
//$('#button').tableToExcel({
//    table: '#testTable',
//    exclude: '.exclude',
//    name: 'testing-export'
//});
(function ($) {
    $.fn.extend({
        // plugin name
        tableToExcel: function (options) {
            // options
            var defaults = {
                table: '#teTable',
                exclude: '.teExclude',
                name: 'export'
            }

            var options = $.extend(defaults, options);
            var o = options;

            // on click export button
            $(this).on('click', function (e) {
                var rows = '';
                var fTable = '';

                // get contents of table except for exclude
                $(o.table + ' tr ').not(o.exclude).each(function () {
                    rows += '<tr>' + $(this).html() + '</tr>';
                });

                // set final table contents
                fTable = rows;

                // create export to Excel
                var tableToExcel = (function () {
                    var uri = 'data:application/vnd.ms-excel;base64,',
                            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                            base64 = function (s) {
                                return window.btoa(unescape(encodeURIComponent(s)))
                            }, format = function (s, c) {
                                return s.replace(/{(\w+)}/g, function (m, p) {
                                    return c[p];
                                })
                            }
                    return function (table, name) {
                        var ctx = {
                            worksheet: name || 'Worksheet',
                            table: table
                        }
                        console.log(ctx);
                        window.location.href = uri + base64(format(template, ctx))
                    }
                })()

                tableToExcel(fTable, o.name);

                e.preventDefault;
            });
        }
    });
})(jQuery);