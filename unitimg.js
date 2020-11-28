$.fn.unitimg = function(options) {
    let settings = $.extend({
        u: null,
        dir:"mini-small",
        id:0,
        faction:""
    }, options);
    let img=$("<img>");
    img.attr("draggable","true");
    img.on("dragstart",dragstart_handler);
    if (settings.u.grand) img.addClass("grand");
    if (settings.u.gigantesque) img.addClass("gigantesque");
    img.attr("id",settings.id);
    img.attr("data-original-title",settings.u.text);
    img.attr("data-toggle","tooltip");
    img.attr("data-faction",settings.faction);
    img.attr("src",settings.dir+"/"+settings.u.i+".png");
    this.append(img);
};
