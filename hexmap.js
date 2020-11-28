
class HexMap {
    constructor(el,json){
	this.version = "0.3.3";
	this.events = {resize:""};
	this.zoom = 1;
	this.hexes = new Array();
	this.logging = true;
	
	this.options = {
	    'showlabel': true,
	    'formatLabel': ""
	};
	this.attr = {};
        this.container=el;
	// odd-r  shoves odd rows by +½ column
	// even-r  shoves even rows by +½ column
	// odd-q  shoves odd columns by +½ row
	// even-q  shoves even columns by +½ row
	this.setLayout(this.container.attr('data-layout'))
	
	// If we have HexJSON inside a <code> element we turn it into SVG
	this.json = json;
	if(json.layout) this.setLayout(json.layout);
        let html=$("<div>").addClass("hexmap").addClass("flat");
        this.container.append(html);
        html.attr("data-layout",this.layout);
        let hmi = $("<div>");
        hmi.addClass("hexmapinner");
        html.append(hmi);
        this.container.html(html);
        
	let i = 0;
	this.r={ max: -1e12,min:1e12};
	this.q = { max: -1e12,min:1e12};        

        for(let i in json.hexes) {
            let h=json.hexes[i];
            if (h.q>this.q.max) this.q.max=h.q;
            if (h.r>this.r.max) this.r.max=h.r;
            if (h.q<this.q.min) this.q.min=h.q;
            if (h.r<this.r.min) this.r.min=h.r;
        }
        let maxw=(this.q.max-this.q.min+1.5);
        let maxh=(this.r.max-this.r.min+1.5);
        this.hex={width:Math.round(100/maxw),
                  height:Math.round(100/maxh)};
        /*if(this.hex.wide%4!=0) this.hex.wide = Math.round(this.hex.wide/4)*4;
	if(this.hex.height%4!=0) this.hex.height = Math.round(this.hex.height/4)*4;
        */
        html.css({width:(this.container[0].offsetWidth)+"px",height:(this.container[0].offsetWidth*1.154)+"px"});
        
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
            h.css({bottom:(this.hex.width*(-dq*0.5+json.hexes[id].r-this.r.min))+"%",
                   left:1*(this.hex.width*(json.hexes[id].q-this.q.min))+"%",
                   width:1.3333*this.hex.width+"%",
                   height:this.hex.height+"%"});
            let width=this.container[0].offsetWidth;
	    this.hexes[i] = new Hex(json.hexes[id],{el:h,parent:this,id:id});
            this.hexes[i].el=h;
            //console.log(h);
            this.hexes[i].setClass(this.hexes[i].n);
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
        let hex=[];
        for (i in this.hexes) {
            let h=this.hexes[i];
            hex.push(h.save());
        }
        return hex;
    }
    // Function to resize our hex grid based on the DOM container
    resize(){
        /*
	this.container.css({'width':'','height':''})
	var parent = this.container.parent();
	var padding = Hex.paddingWidth(this.container[0]);
        this.wide=this.container[0].offsetWidth;
        this.height=this.wide*7.125/6;
        console.log("resize:"+this.container[0].offsetWidth+" "+this.wide+" "+padding);
        //this.wide=this.container[0].offsetWidth-padding;
        
	if(this.container[0].offsetWidth < this.wide + padding){
	    let w = this.container[0].offsetWidth - padding;
	    let scale = Math.min(1,w/this.wide);
	    this.container.find('.hexmap').css({'height':(this.height*scale).toFixed(1)+'px','transform':'scale('+(scale).toFixed(4)+')','transform-origin':'bottom left'});
	}else{
	    this.container.css({'width':this.wide+'px','height':this.height+'px'}).find('.hexmap').css({'width':this.wide+'px','height':this.height+'px','transform':'scale(1)'});
	}
	this.container.find('.hexmapinner').css({'transform':'scale('+this.zoom.toFixed(4)+')'});*/
	return this;
    }

}
