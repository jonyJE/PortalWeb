$.fn.customSelect = function () {
    // define defaults and override with options, if available
    // by extending the default settings, we don't modify the argument
    return this.each(function () {
        obj = $(this);
        obj.after("<div id=\"selectoptions\"> </div>");
        obj.find('option').each(function (i) {
            $("#selectoptions").append("<div id=\"" + $(this).attr("value") + "\" class=\"selectitems\"><img src=\"" + this.title + "\" /><span>" + $(this).html() + "</span></div>");
        });
        obj.before("<input type=\"hidden\" value =\"\" name=\"" + this.name + "\" class=\"customselect\"/><div id=\"iconselect\" class=\"iconselect\">" + this.title + "</div><div id=\"iconselectholder\" class=\"iconselectholder\"> </div>")
        .remove();
        $("#iconselect").click(function () {
            $("#iconselectholder").toggle("slow");
        });

        $("#iconselectholder").append($("#selectoptions")[0]);
        $(".selectitems").mouseover(function () {
            $(this).addClass("hoverclass");
        });
        $(".selectitems").mouseout(function () {
            $(this).removeClass("hoverclass");
        });
        $(".selectitems").click(function () {
            $(".selectedclass").removeClass("selectedclass");
            $(this).addClass("selectedclass");
            var thisselection = $(this).html();
            $(".customselect").val(this.id);
            $("#iconselect").html(thisselection);
            $("#iconselectholder").toggle("slow")
        });
    });
    // do the rest of the plugin, using url and settings
}

$.fn.customSelect2 = function () {
    // define defaults and override with options, if available
    // by extending the default settings, we don't modify the argument
    return this.each(function () {
        obj = $(this);
        obj.after("<div id=\"selectoptions2\"> </div>");
        obj.find('option').each(function (i) {
            $("#selectoptions2").append("<div id=\"" + $(this).attr("value") + "\" class=\"selectitems2\"><img src=\"" + this.title + "\" /><span>" + $(this).html() + "</span></div>");
        });
        obj.before("<input type=\"hidden\" value =\"\" name=\"" + this.name + "\" class=\"customselect2\"/><div id=\"iconselect2\" class=\"iconselect2\">" + "Proyecto de xCerro Arunta" + "</div><div id=\"iconselectholder2\" class=\"iconselectholder2\"> </div>")
.remove();
        $("#iconselect2").click(function () {
            $("#iconselectholder2").toggle("slow");
        });

        $("#iconselectholder2").append($("#selectoptions2")[0]);
        $(".selectitems2").mouseover(function () {
            $(this).addClass("hoverclass");
        });
        $(".selectitems2").mouseout(function () {
            $(this).removeClass("hoverclass");
        });
        $(".selectitems2").click(function () {
            $(".selectedclass2").removeClass("selectedclass2");
            $(this).addClass("selectedclass2");
            var thisselection = $(this).html();
            $(".customselect2").val(this.id);
            $("#iconselect2").html(thisselection);
            $("#iconselectholder2").toggle("slow")
        });
    });
    // do the rest of the plugin, using url and settings
}