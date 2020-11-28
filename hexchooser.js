$.fn.hexchooser = function(options) {
    let settings = $.extend({
        list: tex2,
        left:"9%",
        top:"-48%",
        suff:"",
        leftt:0,
        topt:"40%",
    }, options);
    let i;
    let handle=[
        [[25,20],[25,20],[25,20],[25,20],[25,20],[25,20]],
        [[25,60],[0,35],[-5,0],[25,-5],[50,0],[50,35]],
        [[-5,30],[5,0],[45,-5],[65,25],[55,50],[20,55]],
        [[65,25],[55,50],[20,55],[-5,30],[5,0],[45,-5]]
    ]
    for (i=0;i<settings.list.length;i++) {
       let d=$("<span>");
        let but=$("<button>");
        let sp=$("<span>");
        let sp2=$("<span>");
        let t=0,rot=0;
        let n=1;
        if (settings.list==tex3) {
            n=3;
            if (settings.suff=="A") t=2; else t=3;
        }
        if (settings.list==tex2) { n=2; t=1; }
        d.addClass("flexbox");
        d.addClass("tex"+n);
        d.attr("type",t);
        sp.addClass("H"+settings.list[i]+settings.suff);
        sp.attr({draggable:false});
        sp2.html(settings.list[i]+settings.suff);
        sp2.addClass("caption");
        sp2.css({zIndex:3,left:settings.leftt,top:settings.topt});
        //sp.css({transform:"scale(2)"});
        d.attr({id:settings.list[i]+settings.suff,rot:0});
        //d.on("dragstart",dragstart_handler);
        d.append(sp);
        d.append(sp2);
        but.html("&#8635");
        but.css({left:settings.left,top:settings.top});
        but.click(function() {
            let rot=parseInt(this.attr("rot"),10);
            let type=parseInt(this.attr("type"),10);
            rot=(rot+1)%6;
            this.css('transform', 'rotate(' + (rot/6) + 'turn)');
            this.attr("rot",rot);
            console.log(type,rot);
            this.draggable({cursorAt:{left:handle[type][rot][0],top:handle[type][rot][1]}});                      
        }.bind(d));
        d.append(but);
        d.draggable({
            helper:"clone",
            cursor:"move",
            cursorAt:{left:handle[t][rot][0],top:handle[t][rot][1]},
            scroll:true,
        });
        this.append(d);
    }
};
