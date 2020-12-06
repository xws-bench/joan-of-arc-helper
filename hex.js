
    // An object for each hex
class Hex {
    constructor(me,attr){
        this.rot=0;
        this.units=[];
        $.extend(this,me,attr);
	this.s = -this.q - this.r;
        if (typeof this.zones=="undefined") this.zones=[];
        if (typeof this.n!="undefined") this.setClass(this.n);
 	return this;
    }
    addUnit(x,z,f) {
        console.log("pushing "+x+" in zone "+z+" of hex "+this.q+" "+this.r+" "+f);
        if (typeof f!="undefined") {
            console.log("adding faction "+f+" to zone "+z);
            console.log(this.zones[z].el);
            this.zones[z].el.addClass(f);
            this.zones[z].faction=f;
        }
        if (!x.startsWith("blaso")) {
            this.units[z].push(x);
            this.makeTitle(z);
        }
    }
    removeUnit(x) {
        for (let z=0;z<this.units.length;z++) {
            if (this.units[z].indexOf(x)>-1) {
                this.units[z].splice(this.units[z].indexOf(x),1);
                this.makeTitle(z);
                return true;
            }
        }
        return false;
    }
    save() {
        let z=[];
        for (let i=0;i<this.zones.length;i++)
            z[i]={faction:this.zones[i].faction,el:null};
        return {q:this.q,r:this.r,n:this.n,rot:this.rot,zones:z,units:this.units};
    }
    makeTitle(z) {
        let p={};
        let i,s="",d="";
        if (this.units[z].length==0) {
            this.zones[z].el.attr("data-original-title","empty");
            this.zones[z].el.removeClass(["bien","mal", "francais", "ecossais","ottoman", "anglais", "bourguignon", "valaque", "mercenaire", "lituanien", "polonais" ,"teutonique"]);
            this.zones[z].faction=null;
        } else {
            console.log("found "+this.units[z].length+" in units" + z);
            for (i in this.units[z]) {
                let n=this.units[z][i];
                if (typeof p[n]=="undefined") p[n]=1;
                else p[n]=p[n]+1;
            }
            for (i in p){
                let n=parseInt(i.substring(4),10);
                if (i.startsWith("un")&&typeof troupes[n]!="undefined") {
                    n=troupes[n].getName(false);
                    if (p[i]==1) s+=n+"<br/>";
                    else s+=p[i]+"x "+n+"<br/>";
                } else {
                    if (p[i]==1) d+=liste_decors[n].text+"<br/>";
                    else d+=p[i]+"x "+liste_decors[n].text+"<br/>";
                }
                console.log("found in p:"+n);  
            }
            
            if (d!="") {
                s+=d;
            }
            this.zones[z].el.attr("data-original-title",s);
            //this.zones[z].attr("title",s);
        }

    }
    focus() {
        this.el.addClass("focus");
    }
    unfocus() {
        this.el.removeClass("focus");
    }
    setRot(rot) {
        this.rot=(rot+6)%6;
        return this;
    }
    getNeighbor(rot) {
        let hex2_q=[0,1,1,0,-1,-1];
        let hex2_r=[1,1,0,-1,0,1];
        let hex2_qe=[0,1,1,0,-1,-1];
        let hex2_re=[1,0,-1,-1,-1,0];
        rot=(rot+6)%6;
        if (this.q%2==0) 
            return this.parent.find(this.q+hex2_q[rot],this.r+hex2_r[rot]);
        return this.parent.find(this.q+hex2_qe[rot],this.r+hex2_re[rot]);
    }
    setClass(c) {
        let terrain1=["1A","2B_1","3A","8A","9B","10B","11B","12B","15B_2","16B_2","S1B","V3B","white"];
        let terrain2r=["2B_2","2B_3","4A_1","4A_3","4B_1","4B_2","13A_1","13A_2","13B_1","13B_2","14A_2","14B_1","15A_1","15B_1","16A_2","16B_1","17A_1","17A_2","17A_3","17B_1","17B_2","17B_3"];
        let terrain2=["10A","5A","6A","6B","7B","11A","S3A","V3A"];
        let terrain2h=["7A","14B_2"];
        let terrain3=["1B","2A_1","2A_3","3B","4B_3","5B","8B","9A","12A","18B_1","18B_2","18B_3","S3B"];
        let terrain3r=["2A_2","4A_2","14A_1","15A_2","16A_1","18A_1","18A_2","18A_3"];
        let terrain3h=["V1A","S1A"];
        let terrain3c=["S2A","S2B","V1B"];
        let special=["V2B"];

        this.el.removeClass(terrain1.map(x=>"h"+x));
        this.el.removeClass(terrain2r.map(x=>"h"+x));
        this.el.removeClass(terrain2.map(x=>"h"+x));
        this.el.removeClass(terrain2h.map(x=>"h"+x));
        this.el.removeClass(terrain3.map(x=>"h"+x));
        this.el.removeClass(terrain3r.map(x=>"h"+x));
        this.el.removeClass(terrain3h.map(x=>"h"+x));
        this.el.removeClass(terrain3c.map(x=>"h"+x));
        this.el.removeClass("V2B");
        this.el.addClass("h"+c);
        this.el.removeClass(terrain1.map((x)=>"h"+x));
        this.el.addClass("h"+c);
        this.el.empty();
        let i;
        this.n=c;
        this.el.droppable({
            accept:".flexbox",
            drop: function(ev,ui) {
                let dragged=ui.draggable;
                let id=dragged.attr("id");
                let rot=parseInt(dragged.attr("rot"),10);
                if (tex1.includes(id)) {
                    this.setRot(rot).setClass(id);
                } else if (tex2.includes(id)) {
                    this.setRot(rot).setClass(id+"_1");
                    this.getNeighbor(rot).setRot(rot).setClass(id+"_2");
                } else if (tex3.includes(id.slice(0,-1))) {
                    this.setRot(rot).setClass(id+"_2");
                    let dr;
                    if (id.endsWith("A")) dr=1; else dr=-1;
                    this.getNeighbor(rot+dr).setRot(rot).setClass(id+"_3");
                    this.getNeighbor(rot+2*dr).setRot(rot).setClass(id+"_1");
                }
            }.bind(this),
            tolerance: "pointer",
            classes: {
                "ui-droppable-hover": "focus"
            }
        });
        let zone=[];
        let cls=[];
        for (i=0;i<3;i++) {
            zone[i]=$("<div>");
            zone[i].attr({"data-z":i,"data-html":"true","data-toggle":"tooltip","data-units":""});
   
            zone[i].on("drop",drop);
            zone[i].on("dragover",allowDrop);
            //zone[i].attr("title","empty");
            zone[i].addClass("zone");
            if (typeof this.zones[i]=="undefined") this.zones[i]={el:null,faction:null};
            this.zones[i].el=zone[i];
            if (c=="white") this.zones[i].faction=null;
            if (this.zones[i].faction!=null) {
                console.log("zone faction :"+this.zones[i].faction);
                zone[i].addClass(this.zones[i].faction);
            }
            if (typeof this.units[i]=="undefined") this.units[i]=[];
        }
        for (i=0;i<this.units.length;i++) {
            if (this.units[i].length>0) this.makeTitle(i);
        }
        if (terrain1.includes(c)) {
            cls=["fullhex"];
            //if (c=="V3B") cls[0]=null;
        } else if (terrain2.includes(c)) {
            cls=["half1","half2"];
            if (c=="V3A") cls[1]=null;
        }  else if (terrain2r.includes(c))
            cls=["half1r","half2r"];
        else if (terrain2h.includes(c))
            cls=["half1h","half2h"];
        else if (terrain3.includes(c))
            cls=["third1","third2","third3"];
        else if (terrain3r.includes(c))
            cls=["third1r","third2r","third3r"];
        else if (terrain3h.includes(c)) {
            cls=["third1h","third2h","third3h"];
            //if (c=="V1A") cls[0]=null;
            if (c=="S1A") cls[1]=null;
        } 
        else if (terrain3c.includes(c)) {
            cls=["third1c","third2c","third3c"];
            //if (c=="V1B") cls[0]=null;
            if (c=="S2B") cls[2]=null;
            if (c=="S2A") cls[1]=null;   
        } else if (c=="V2B") {
            cls=["third1d","third2d","third3d"];
        }
        for (i=0;i<cls.length;i++) {
            if (cls[i]!=null) {
                zone[i].addClass(cls[i]);
                if (c=="S2B") zone[i].addClass("rotate60");
                if (c=="S2A") zone[i].addClass("rotate-120");
                this.el.append(zone[i]);
            }
        }
        if (c!="white"&&(c.endsWith("_1")||c.indexOf("_")==-1)) {
            if (c.endsWith("_1")) c=c.slice(0,-2);
            let dd=$("<div>").html(c).addClass("hexname");
            this.el.append(dd);
        }
        this.el.css("transform","rotate("+(this.rot/6)+"turn");
    }
    static axial2cube(q,r){ return [q,r,-q-r]; }
    static cube2axial(q,r,s){ return [q,r]; }

    // Helper functions
    static marginHeight(el) {
	let style = getComputedStyle(el);
	return parseInt(style.marginTop) + parseInt(style.marginBottom);
    }
    static marginWidth(el) {
	let style = getComputedStyle(el);
	return parseInt(style.marginLeft) + parseInt(style.marginRight);
    }
    static paddingHeight(el) {
	let style = getComputedStyle(el);
	return parseInt(style.paddingTop) + parseInt(style.paddingBottom);
    }
    static paddingWidth(el) {
	let style = getComputedStyle(el);
	return parseInt(style.paddingLeft) + parseInt(style.paddingRight);
    }
}

