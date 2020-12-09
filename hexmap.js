const cartes=[{h:"y3n7d4oe",nom:"Les harengs",name:"The herrings"},
              {h:"yxepqm3u",nom:"Sentilly",name:"Sentilly"},
              {h:"yx9vljpf",nom:"La Brossinière",name:"La Brossinière"},
              {h:"y3cbdqj4",nom:"Meung-sur-Loire",name:"Meung-sur-Loire"},
              {h:"y22n435h",nom:"Crécy",name:"Crecy"},
              {h:"y4mp4cps",nom:"Assaut sur le village",name:"Asault on the village"},
              {h:"y4vz4raq",nom:"Cocherel",name:"Cocherel"},
              {h:"yylcvvdb",nom:"Patay",name:"Patay"},
              {h:"yxbw9trc",nom:"Affrontement en ville",name:"City Battle"},
              {h:"y2nbrfdt",nom:"Epreuve de foi",name:"Test of faith"},
              {h:"y47rl4pw",nom:"Prise en tenaille",name:"The pincer"},
              {h:"y5n25s8h",nom:"Siège",name:"Siege"},
              {h:"yxnyu2jd",nom:"Rapt au village",name:"Kidnapping in the village"},
              {h:"y5l5rq7t",nom:"Assault coordonné",name:"Coordinated assault"},
              {h:"y5dsmq2o",nom:"Azincourt",name:"Agincourt"},
              {h:"y6epu3ph",nom:"Meaux",name:"Meaux"},//yxstbz2w
              {h:"yxhk658x",nom:"L'Enfant",name:"The child"},
              {h:"y5caobga",nom:"La bataille de Pourrière",name:"The Battle of Pourrière"},
             ];

const FACTOR=1.4;
/*
y6kbmghs: camp du bien

*/
class HexMap {
    constructor(el,json){
	this.events = {resize:""};
	this.zoom = 1;
	this.hexes = new Array();
	this.logging = true;
	
	this.options = {
	    'showlabel': true,
	    'formatLabel': ""
	};
	this.attr = {};
        this.container=$("#"+el);
        this.container.html(""); // empty the container
	// odd-r  shoves odd rows by +½ column
	// even-r  shoves even rows by +½ column
	// odd-q  shoves odd columns by +½ row
	// even-q  shoves even columns by +½ row
	this.setLayout(this.container.attr('data-layout'))
	
	// If we have HexJSON inside a <code> element we turn it into SVG
	this.json = json;
	if(json.layout) this.setLayout(json.layout);
        this.container.addClass("hexmap").addClass("flat");
        //this.container.append(html);
        this.container.attr("data-layout",this.layout);
        let hmi = $("<div>");
        hmi.addClass("hexmapinner");
        this.container.html(hmi);
        //this.container.html(html);
        
	let i = 0;
	this.r={ max: -1e12,min:1e12};
	this.q = { max: -1e12,min:1e12};        

        for(let i in json.hexes) {
            let hx=json.hexes[i];
            if (hx.q>this.q.max) this.q.max=hx.q;
            if (hx.r>this.r.max) this.r.max=hx.r;
            if (hx.q<this.q.min) this.q.min=hx.q;
            if (hx.r<this.r.min) this.r.min=hx.r;
        }
        this.maxw=((this.q.max-this.q.min)+1.5);
        this.maxh=((this.r.max-this.r.min)+1.5);
        let cw=this.container.parent().width();
        let ch=this.container.parent().height();
        
        //this.container.parent().css({width:cw+"px",height:Math.round(0.75*cw)+"px"});
        this.container.css({width:cw+"px",height:Math.round(FACTOR*0.75*cw)+"px"});
        let w=FACTOR*Math.round(cw/this.maxw);
        let h=w*0.866;
        this.hex={width:w,height:h};
        //if(this.hex.wide%4!=0) this.hex.wide = Math.round(this.hex.wide/4)*4;
	//if(this.hex.height%4!=0) this.hex.height = Math.round(this.hex.height/4)*4;
        //this.container.css({width:cw+"px",height:ch+"px"});
        // armee: yyj2ae73
        //Carte: y56xlum4
	for(let id in json.hexes){
            let rot=json.hexes[id].rot;
            let n=json.hexes[id].n;
            let h=$("<div>");
            let q=json.hexes[id].q;
            let r=json.hexes[id].r;
            h.addClass("hex");
            h.attr({"data-id":id,"data-r":json.hexes[id].r,"data-o":rot,"data-q":json.hexes[id].q});
	    //html += '<div class="hex" tabindex="0" data-id="'+id+'" data-r="'+json.hexes[id].r+'" data-q="'+json.hexes[id].q+'"></div>';
            hmi.append(h);
            let dq=(q+24)%2;
            h.css({bottom:0.866*(this.hex.width*(-dq*0.5+json.hexes[id].r-this.r.min))+"px",
                   left:0.75*(this.hex.width*(json.hexes[id].q-this.q.min))+"px",
                   width:1.02*this.hex.width+"px",
                   height:1.02*this.hex.height+"px"});
            let width=this.container[0].offsetWidth;
	    this.hexes[i] = new Hex(json.hexes[id],{el:h,parent:this,id:id});
	    i++;
	}
	//html += '</div></div>'
        $('[data-toggle="tooltip"]').tooltip();
        
	var _obj = this;
	// We'll need to change the sizes when the window changes size
	window.addEventListener('resize',function(e){ _obj.resize(); });
	
	//this.init();

	return this;
    }
    static setPrefabs() {
        for (let i=0;i<cartes.length;i++) {
            let c=cartes[i];
            let s=$("<div>");
            s.addClass("drop-item");
            s.html("<span lang='fr'>"+c.nom+"</span><span lang='en'>"+c.name+"</span>");
            s.click(function() {
                $("#prefabbutton").html("<span lang='fr'>"+c.nom+"</span><span lang='en'>"+c.name+"</span>");
                $("#codemap").html(c.h);
                $("#prefabradio").prop("checked",true);
                HexMap.load(c.h,"hexmap-9").done(function(data) { hexmap = data; });
            });
            $("#prefabs").append(s);
        }
    }
     setLayout(layout){
	if(layout!="odd-r" && layout!="odd-q" && layout!="even-r" && layout!="even-q") layout = "odd-r";
	// odd-r  shoves odd rows by +½ column
	// even-r  shoves even rows by +½ column
	// odd-q  shoves odd columns by +½ row
	// even-q  shoves even columns by +½ row
	this.layout = layout;
	this.type = (this.layout.indexOf('q')>0 ? 'flat':'pointy');
	var otype = (this.layout.indexOf('r')>0 ? 'flat':'pointy');
	this.shift = (this.layout.indexOf('odd')==0 ? 'odd':'even');
	this.container.find('.hexmap').removeClass(otype).addClass(this.type);
	return this;
    }
    find(q,r) {
        for (let i=0;i<this.hexes.length;i++) {
            if (this.hexes[i].q==q&&this.hexes[i].r==r) return this.hexes[i];
        }
        return null;
    }
    save() {
        let json={hexes:[],imgs:[]};
        let i;
        console.log("SAVING HEXMAP");
        for (i=0;i<this.hexes.length;i++) {
            let h=this.hexes[i];
            json.hexes[i]=h.save();
        }
        let imgs=this.container.children("img");
        for (i=0;i<imgs.length;i++) {
            let img={};
            let im=$(imgs[i]);
            if (im.hasClass("small")) img.taille=0;
            if (im.hasClass("grand")) img.taille=2;
            if (im.hasClass("gigantesque")) img.taille=3;                    
            if (im.hasClass("medium")) img.taille=1;                    
            img.src=im.attr("src");
            img.title=im.data("originalTitle");
            img.faction=im.data("faction");
            img.top=100 * parseFloat(im.css('top')) / parseFloat(im.parent().css('height'));
            img.left=100 * parseFloat(im.css('left')) / parseFloat(im.parent().css('width'));
            json.imgs[i]=img;
        }
        console.log(json);
        return JSON.save(json);
    }//y63guyez
    static load(hash,elt) {
        let deferred=$.Deferred();
        JSON.load(hash,function(h,json) {
            let hexmap;
            console.log("LOADING HEXMAP");
            console.log(json);
            if (typeof json.hexes=="undefined") {
                hexmap= new HexMap(elt,{"layout":"odd-q","hexes": json});
            } else {
                let i;
                hexmap= new HexMap(elt,{"layout":"odd-q","hexes": json.hexes});
                for (i=0;i<json.imgs.length;i++) {
                    let im=$("<img>");
                    let g=json.imgs[i];
                    im.attr("src",g.src);
                    let t=g.taille;
                    if (t==0) im.addClass("small");
                    if (t==1) im.addClass("medium");
                    else if (t==2) im.addClass("grand");
                    else if (t==3) im.addClass("gigantesque");
                    im.css({top:(g.top)+"%",left:(g.left)+"%",position:"absolute",pointerEvents:"none"});
                    im.data("originalTitle",g.title);
                    im.data("faction",g.faction);
                    hexmap.container.append(im);
                }
            }
            $('[data-toggle="tooltip"]').tooltip();
            deferred.resolve(hexmap);
        });
        return deferred.promise();
    }
    // Function to resize our hex grid based on the DOM container
    resize(){
        let cw=this.container.parent().width();
        let w=FACTOR*Math.round(cw/this.maxw);
        let h=w*0.866;
        //this.container.parent().css({width:cw+"px",height:Math.round(0.75*cw)+"px"});
        this.container.css({width:cw+"px",height:Math.round(FACTOR*0.75*cw)+"px"});
        this.hex={width:w,height:h};
        for (let i in this.hexes) {
            let q=this.hexes[i].q;
            let r=this.hexes[i].r;
            let dq=(24+q)%2;
            this.hexes[i].el.css({bottom:0.866*(this.hex.width*(-dq*0.5+r-this.r.min))+"px",
                                  left:0.75*(this.hex.width*(q-this.q.min))+"px",
                                  width:1.02*this.hex.width+"px",
                                  height:1.02*this.hex.height+"px"});
        }
    }

}
