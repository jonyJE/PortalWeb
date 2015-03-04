$(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        $("#lista-contenidos").nextPage($("#nextPageUrl").val(), "#loading", null);
    }
});