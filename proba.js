var troupes;
var persolist=[];
var dl;
var k,kk,i=0,j;
var nom;
var f=FRANCAIS;
var anti=ANGLAIS;
let full=["1A","2B_1","3A","8A","9B","10B","11B","12B","15B_2","16B_2","S1B","V3B","white"];

let tex1=["10A","10B","11A","11B","12A","12B","1A","1B","3A","3B","5A","5B","6A","6B","7A","7B","8A","8B","9A","9B","S1A","S1B","S2A","S2B","S3A","S3B","V1A","V1B","V2B","V3A","V3B","white"];
let tex2=["13A","13B","14A","14B","15A","15B","16A","16B"];
let tex3=["17","18","2","4"];

unbouclier.toHTML=(()=>"<span class='bouclier'></span>");
untue.toHTML=(()=>"<span class='facerouge tue'></span>");
untue.capacite=(()=>null);
unrecul.toHTML=(()=>"<span class='recul'></span>");
unrecul.capacite=(()=>null);

function distribution(dices,feinte) {
    let k,h,i,s,r,p,np,f;
    if (typeof distribution.cache=="undefined") distribution.cache={};
    if (typeof feinte=="undefined") feinte=false;
    if (distribution.cache[dices+feinte]/*&&group1.nom!="Bertrand du Guesclin"*/) {
        //console.log(""+dices);
        return distribution.cache[dices+feinte];
    }
    let n=dices.length;
    let pr=[],newpr=[],tmp;
    for (i=0;i<=10000;i++) {
        pr[i]=0;
        newpr[i]=0;
    }
    if (n==0) {
        pr[0]=1;
        return pr
    }
    p=1;
    np=(1-dices[0][1]-dices[0][2]-dices[0][0]);
    if (feinte) { // On relance quand c'est vierge
        pr[0] = np*np;
        pr[1] =dices[0][0]*(1+np);
        pr[10]=dices[0][1]*(1+np);
        pr[100]=dices[0][2]*(1+np);
    } else {
        pr[0]=np;
        pr[1] = dices[0][0];
        pr[10]=dices[0][1];
        pr[100]=dices[0][2];
    }
    // Le premier dé touche
    p=p*(dices[0][1]+dices[0][0]+dices[0][2]);

    for (j=1;j<n;j++) {
        for (r=0; r<=n; r++) {
	    for (h=0; h<=n-p; h++) {
	        for (k=0; k<=n-h-p; k++) {
		    i=r+10*h+100*k;
                    np=1-dices[j][0]-dices[j][1]-dices[j][2];
                    if (feinte) {
                        newpr[i]+=pr[i]*np*((np-1)*p+1); // 1+p*(np-1)
                        newpr[i+1]+=pr[i]*dices[j][0]*(1+p*np); // 1-p+p+p*np = 1+p*np
                        newpr[i+10]+=pr[i]*dices[j][1]*(1+p*np);
                        newpr[i+100]+=pr[i]*dices[j][2]*(1+p*np);
                    } else {
		        newpr[i+1]+=pr[i]*dices[j][0];
                        newpr[i+10]+=pr[i]*dices[j][1];
                        newpr[i+100]+=pr[i]*dices[j][2];
                        newpr[i]+=pr[i]*np;
                        //console.log(i+":"+newpr[i]);
		    }
                    p=p*dices[j][3];
                }
            }
        }
        pr=newpr;
        newpr=[];
        for(i=0;i<=1000;i++) newpr[i]=0;
    }
    distribution.cache[dices+feinte]=pr;
    return pr;
}

function bouclier(dices,parade) {
    let n=dices.length;
    let esquive=0;
    let res={bouclier:[],esquive:0};
    let p,s,i,j,es;
    if (typeof parade=="undefined") parade=false;
    if (typeof bouclier.cache=="undefined") bouclier.cache={};
    if (bouclier.cache[dices+parade]) {
        //console.log(""+dices);
        return bouclier.cache[dices+parade];
    }
    //console.log("parade >>> "+parade);
    for (i=0;i<=n+1;i++) res.bouclier[i]=0;
    res.bouclier[0]=1;
    if (n==0) return res;
    p=1;
    es=1;
    let pr=[],newpr=[],tmp;
    for (i=0;i<=n+1;i++) {
        pr[i]=0;
        newpr[i]=0;
    }
    if (parade) {
        pr[0] = (1-dices[0][3])*(1-dices[0][3]);
        pr[1] = (1+1-dices[0][3])*dices[0][3];
        
    } else {
        pr[0]=1-dices[0][3];
        pr[1] = dices[0][3];
    }
    p=p*dices[0][3];
    es=es*(dices[0][3]+dices[0][2]+dices[0][1]+dices[0][0]);
    for (j=1;j<n;j++) {
        for (s=0; s<=n; s++) { 
            if (parade) {
                newpr[s+1]+=pr[s]*(p*dices[j][3]*(2-dices[j][3])+(1-p)*dices[j][3]);
                newpr[s]+=pr[s]*(p*(1-dices[j][3])*(1-dices[j][3])+(1-p)*(1-dices[j][3]));
            } else {
	        newpr[s+1]+=pr[s]*dices[j][3];
                newpr[s]+=pr[s]*(1-dices[j][3]);
            }
        }
        p=p*dices[j][3];
        es=es*(dices[j][3]+dices[j][2]+dices[j][1]+dices[j][0]);
        pr=newpr;
        newpr=[];
        for(i=0;i<=n+1;i++) newpr[i]=0;
    }
    res.esquive=1-es;
    bouclier[dices+parade]=pr;
    res.bouclier=pr;
    return res;
}

/*
terreur: **avant compose, combat**
grand: pas de terreur
cruel: ** avant compose **point legende: un HDC -> un tué pour l'unité
garde du corps: recupere un HdC ou tué
pourfendeur: **avant compose ** personnage: tué -> 2 tué
priere: jeton legende ou xp
feinte: ** avant compose **relance un dé une fois de l'unité
survie: ** apres compose ** tué & un seul PDV -> 50% de chance d'etre tué
parade: ??
immortel: pas de terreur
mercenaire: 50% action gratuite. Commandement qu'aux mercenaires
visee: attribue aux enemis
masse: ** avant compose ** 3 unités de meme nom: +1 de blanc en attaque
cohesion: ** avant compose ** 3 unités de meme nom: +1 de blanc en defense
annule 1 resultat: ** apres compose **
*/
function* iterate(n) {
    let p,k,h;
    for (p=0; p<=9; p++) 
	for (h=0; h<=9-p; h++)
	    for (k=0; k<=9-h-p; k++) {
                yield([p,h,k]);
            }
}

function attaque(dices,mod,group1,group2,feinte,type) {
    let pr=distribution(dices,feinte);
    let n=dices.length;
    let res=[];
    let p,h,k,s,i,touche,tue,recul;
    for (i=0;i<=1000;i++) {
        res[i]=0;
    }
    for ([p,h,k] of iterate(n)) {
        let p2,h2,k2;
        p2=p;k2=k;h2=h;
	i=p+10*h+100*k;
        if (typeof group1.bonusattaque=="function") [p2,h2,k2]=group1.bonusattaque(p2,h2,k2,type);
        if (typeof mod=="function") {
            [p2,h2,k2]=mod(p2,h2,k2);
        }
        res[k2*100+h2*10+p2]+=pr[i];
    }
    return res;
}
function compose(res1,res2) {
    let i;
    let res=[];
    for (i=0;i<res1.length+res2.length;i++) res[i]=0;
    for (i=0;i<res1.length;i++)
        for (j=0;j<res2.length;j++) {
            res[i+j]+=res1[i]*res2[j];
            //if (res1[i]>1e-6&&res2[j]>1e-6) console.log((i+j)+":"+(res1[i]*res2[j]));
        }
    return res;
}

function blank(dices) {
    let pr=distribution(dices,{});
    let n=dices.length;
    let res=[];
    let p,h,k,s,i,b;
    for (i=0;i<=n;i++) res[i]=0;
    for ([p,h,k] of iterate(n)) {
	for (s=0; s<=n-h-p-k; s++) {
	    i=p+10*h+100*k+1000*s;
            b=n-p-h-k-s;
            res[b]+=pr[i];
        }
    }
    //for (i=0;i<=n;i++) $(".main").append("<p>"+i+":"+res[i]+"</p>");
    return res;
}
function grouper(list) {
    let i;
    list.melee=[];
    list.tir=[];
    let bm=[];
    for (i=0;i<list.length;i++) {
        if (list[i].tir) list.tir=list.tir.concat(list[i].tir);
        if (list[i].melee) list.melee=list.melee.concat(list[i].melee);
        if (list[i].bonusmelee) bm.push(list[i].bonusmelee);
    }
}

function combat_a(a,na,bouclier,nd,coef,group1,group2,res) {
    let h,k,p,b;
    let boucliermalus=false;
    if (!group2.noterrain&&group2.terrain=="swamp") {
        boucliermalus=true;
    }
    for ([p,h,k] of iterate(na)) {
        for (b=0;b<=nd;b++) {
            let val=a[k*100+h*10+p]*bouclier[b]*coef;
            let bb=b;
            if (boucliermalus&&bb>0) bb=bb-1;
            let kk,hh,pp;
            if (h+p+k>bb) {
                if (k-bb>0) {
                    kk=k-bb;
                    if (group1.pourfendeur&&!group2.troupe) kk++;
                    hh=h;
                    pp=0;
                } else {
                    kk=0;
                    if (k+h-bb>0) {
                        hh=k+h-bb;
                        pp=0;
                    } else {
                        hh=0;
                        pp=k+h+p-bb;
                        if (group2.recultue) {
                            kk=pp;
                            pp=0;
                        }
                    }
                }
                if (kk+hh>=group2.pdv) {
                    if (kk>0) 
                        res.tue+=val;
                    else res.hdc+=val;
                } else if (kk+hh>0) {
                    if (typeof group1.postattaque=="function") {
                        [pp,kk]=group1.postattaque(pp,kk+hh)
                        if (kk>=group2.pdv) {
                            res.hdc+=val;
                        } else res.blessure[kk]+=val;
                    } else res.blessure[kk]+=val;
                } else if (pp>0) res.recul+=val;
            } else res.blessure[0]+=val;
        }
    }
    return res;
}
function combat(group1,group2,islogged) {
    let a,aa=[];
    let type=MELEE;
    let res={esquive:0,blessure:[1,0,0,0,0,0,0,0,0,0],recul:0,hdc:0,tue:0,inflige:[1,0,0,0,0,0,0,0,0,0],infligetue:0,infligehdc:0};
    if (group1.tir) {
        type=group1.typetir;
        aa=group1.tir;//(group2);
    }
    if (group1.melee) {
        aa=group1.melee;//(group2);
        if (group1.bonusmelee) aa=group1.bonusmelee(group1.melee,group2);
    }
    if (aa.length==0) return res;
    
    let d,dd,nd,h,p,b,ret;
    if (group2.defense) {
        dd=group2.defense;
        if (group1.enleve1d&&dd[0]!=unbouclier) {
            dd=dd.splice(0, 1);
        }
        let parade=false;
        if (typeof group2.parade=="function") parade=group2.parade(group1);
        if (!group2.noterrain&&(group2.terrain=="forest"||group2.terrain=="pave")) {
            parade=true;
        }
        //console.log(group2.name+" parade:"+parade);
        d=bouclier(dd,parade);
        nd=dd.length;
    } else {
        d={bouclier:[1]};
        nd=0;
    }
    let na=aa.length;
    if (na>0) {
        a=attaque(aa,group2.modattaque,group1,group2,group1.feinte(),type);
    } else a=[1];
    let terreur=1;
    let hdcterreur=0;
    let reculterreur=0;
    let esquive=0;
    if (group2.esquive) esquive=d.esquive;
    if (islogged) {
        console.log(group1.nom+" combat "+group2.nom);
    }
    res.blessure[0]=0;
    res.inflige[0]=0;
    // Terreur: seulement en melee, et l'attaquant ne doit pas etre grand ni insensible ni immortel
    if (group2.terreur&&group1.melee&&!(group1.grand||group1.noterreur||group1.immortel)&&(typeof group1.terreur=="undefined"||(group1.terreur&&group1.terreur<group2.terreur))) {
        // ni avec une terreur >= que celle du defenseur
        for (i=1;i<=group2.terreur;i++) terreur=terreur*0.5; // Unités terrorisés ? 1/2 par dé terreur
        let aterreur= attaque([group1.melee/*(group2)*/[0]],group2.modattaque,group1,group2,group1.feinte(),type); // Garder un dé d'attaque
        if (na>1) {
            res=combat_a(aterreur,1,d.bouclier,nd,(1-terreur)*(1-esquive),group1,group2,res);
            if (group2.immortel) {
                res.blessure[group2.pdv-1]+=res.tue;
                res.tue=0;
            }
            if (islogged) console.log("terreur tue: "+res.tue+" "+(1-terreur)+" na="+na); 
        } else res.blessure[0]+=(1-terreur)*(1-esquive);
    }
    res.tue=0;
    res=combat_a(a,na,d.bouclier,nd,terreur*(1-esquive),group1,group2,res);
    if (group2.immortel) {
        res.blessure[group2.pdv-1]+=res.tue;
        res.tue=0;
    }
    if (islogged) console.log("sans terreur tue: "+res.tue+" "+(terreur)); 

    //res.recul=res.recul+(1-esquive);
    res.esquive=esquive;
    let hasriposte,rispote,haslimited;
    hasriposte=group2.riposte&&group2.riposte(group1);
    riposte=group2.defense;
    haslimited=(!group2.noterrain&&group2.terrain=="rock");
    if (islogged) {
        console.log(" dégat sans terreur("+terreur+"):"+(res.blessure[1]-hdcterreur)+" "+res.blessure[2]+" "+res.blessure[3]+" "+res.blessure[4]);
        console.log(" recul sans terreur ("+terreur+"):"+(res.recul[1]-reculterreur)+" "+res.recul[2]+" "+res.recul[3]+" "+res.recul[4]);

        if (hasriposte&&group1.melee&&!group1.noriposte) console.log(group2.nom+" riposte");
    }
    if (!group1.noriposte&&group1.melee) {
        if (hasriposte) {
            ret=0;
            let r=attaque(riposte,(x,y,z)=>[x,y,z],group2,group1/* pas de feinte */,false,AUCUN);
            for (h=0;h<=nd;h++)
                for (k=0;k<=nd-h;k++) 
                    if (k+h>=1) {
                        for (p=0;p<=nd-h-k;p++) {
                            let rr=r[k*100+h*10+p];
                            if (k+h>=group1.pdv&&k>0) res.infligetue+=rr;
                            else if (k+h>=group1.pdv) res.infligehdc+=rr;
                            else res.inflige[h+k] += rr;
                            ret+=rr;
                        }
                    }
            res.inflige[0]=1-ret;
        } else if (haslimited) {
            let pr=distribution([group2.defense[0]]/*pas de feinte*/);
            let n=1;
            ret=0;
            
            for ([p,h,k] of iterate(n)) {
		i=p+10*h+100*k;
                if (k>0&&group1.pdv==1) {
                    res.infligetue+=pr[i];
                    ret+=pr[i];
                } else if (h>0&&group1.pdv==1) {
                    res.infligehdc+=pr[i];
                    ret+=pr[i];
                } else if (h+k>0) {
                    res.inflige[1]+=pr[i];
                    ret+=pr[i];
                }
            }
            res.inflige[0]=res.inflige[0]*(1-ret);
        }
    }
    
    if (group2.contrecoup&&group2.contrecoup(group1)==true&&!group1.tir) {
        ret=0;
        let r=blank(group2.defense);
        for (i=1;i<=nd;i++) {
            if (i>=group1.pdv) res.infligetue += r[i];
            else res.inflige[i] +=r[i];
            ret+=r[i];
        }
        res.inflige[0]=1-ret;
    }

    if (group1.immortel) {
        res.inflige[group1.pdv-1]+=res.infligetue;
        res.infligetue=0;
    }

    //$(".main").append("<p> ->>"+res+"</p>");
    return res;
}
function fightwith1cube(group1,group2) {
    let dead2=0,dead1=0;
    let i,j;
    let norecul=1;
    const MAX=9;
    let res1,res2;
    let p={p1:1e-6,p2:1e-6,p3:0,p4:0}
    res1=combat(group1,group2);
    res2=combat(group2,group1);
    dead2=res1.tue+(1-res2.infligetue)*res1.infligetue;
    for (i=1;i<MAX;i++) {
        p.p1+=(res1.blessure[i]+(1-dead2)*res2.inflige[i])*i;
        p.p2+=(res1.inflige[i]+(1-dead2)*res2.blessure[i])*i
    }
    //if (group2.pdv<p1&&group1.pdv>=p2) return 3;
    //if (group1.pdv<p2&&group2.pdv>=p1) return -3;
    return p;
}


function duel(group1,group2) {
    let r=0;
    let r1=fightwith1cube(group1,group2);
    if (r1.p2>1e-5||r1.p1>1e-5)
        if (group2.pdv/r1.p1<group1.pdv/r1.p2) r=1; else r=-1;
    /*let r2=fightwith1cube(group2,group1);
    if (r2.p2>1e-5||r2.p1>1e-5)
        if (group1.pdv/r2.p1<group2.pdv/r2.p2) r=r-1; else r=r+1;*/
    return r;
}


/*function touslesduels(t) {
    let u=[];
    let k,kk,nom,i,j;
    i=0;
    for (k=0;k<t.length;k++) {
        if (t[k].civil) continue;
        //if (troupes[k].faction!=f) continue;
        //troupes[k].personnage=true;
        //t[k].beats=[];
        //t[k].beaten=[];
        t[k].score=0;
        u.push(t[k]);
    }
    if (troupes[nom].faction!=f) continue;
        for (j=i+1;j<u.length;j++) {
            //if (troupes[kk].faction!=anti) continue;
            var d=duel(u[i],u[j]);
            if (d>0) {
                //u[i].beats.push(u[j].nom);
                //u[j].beaten.push(u[i].nom);
                //$(".main").append("<li>"+kk+":"+d+"</li>");
                u[i].score+=d;
            } else if (d<0) {
                //u[j].beats.push(u[i].nom);
                //u[i].beaten.push(u[j].nom);
                u[j].score-=d;
            }
        }
    }
    u.sort(function(a,b) {return a.score-b.score; });
    
//    console.log(JSON.stringify(troupes));
    
    return u;
}*/

function unique(value, index, self) { 
    return index==self.length-1||self[index].nom!=self[index+1].nom;
}

function temporaliseperso(x) {
    let p=troupes[x];
    //console.log("unité:"+x+" "+p.nom+" "+p.dates[0]);
    let d1=p.dates[0],d2=p.dates[1];
    let d3=p.dates[2],d4=p.dates[3];
    let i,j,miny=2000,mindid;
    $(".d-pin").removeClass("red");
    $(".d-tape-pin").removeClass("red");
    for (i=0;i<evenements.length;i++) {
        let e=evenements[i];
        let y=e.start.getFullYear();
        if (y>=d1&&y<=d2) {
            if (miny>y) {
                miny=y;
                minid=e.id;
            }
        }
    }
    let d;
    dl.find(String(minid));
    $(".d-dateline").bind("datelinechange",function() {
        let i;
        for (i=0;i<evenements.length;i++) {
            let e=evenements[i];
            let y=e.start.getFullYear();
            if (y>=d1&&y<=d2) $(".did"+e.id).addClass("red");
            if (d3&&y>=d3&&y<=d4) $(".did"+e.id).addClass("red");
        }
        $(".d-dateline").unbind("datelinechange");
    });
    
}



var perso1=null,perso2=null;


function tableStat(c1,m,p1,d1,b1,push,e) {
    let prenom1="",nom="";
    let fin="";
    nom=c1.nom;
    if (typeof c1.prenom!="undefined") nom+=" "+c1.prenom;
    if (c1.acheval) nom+=" à cheval";
    if (c1.niv==1) nom+=" *";
    if (c1.niv==2) nom+=" **";
    if (c1.subfaction==MAL) {
        nom+="<span class='blason mal'></span>";
    } else if (c1.subfaction==BIEN) {
        nom+="<span class='blason bien'></span>";
    }
    let emptyline="<tr><td>&nbsp;</td><td>&nbsp;</td><tr>";
    let b="<h4 class='text-white'>"+nom;
    b+=" "+prenom1+"</h4><table class='text-white compact table table-sm table-borderless'>";
    $("#hex3").html("");
    if (push>0)
        $("#hex3").append("<div><span class='xtra'>&#10230;</span><span class='facenoir recul'></span> "+Math.floor(1000*push)/10+"%</div>");
    if (e>0)
        $("#hex3").append("<div><span class='xtra'>&#10230;</span>esquive "+Math.floor(1000*e)/10+"%</div>");
    b+="<tr><td colspan='2'>"+m+"</td></tr>";
    if (p1[0]>0.01) {
        b+="<tr><td style='text-align:right'>"+(Math.floor(100*p1[0])/100)+" pdv</td><td  style='text-align:left'>"+Math.floor(p1[1]*1000)/10+"%</td></tr>";
    } else fin+=emptyline;
    if (b1>0) b+="<tr><td style='text-align:right;'><span class='facenoir touche'></span></td><td style='text-align:left;'>"+Math.floor(1000*b1)/10+"%</td></tr>";
    else fin+=emptyline;
    if (d1>0) b+="<tr><td style='text-align:right'><span class='facenoir mort'></span></td><td style='text-align:left'>"+Math.floor(1000*d1)/10+"%</td></tr>";
    else fin+=emptyline;
    
    b+=fin+"</table>";
    return b;
}

function drawValues(c1,c2,a,d,p1,p2,p3,d1,d2,b1,b2,e) {
    let prenom1,prenom2;
    let blank="<table class='compact text-white table-sm table table-borderless'><h4>&nbsp;</h4><h6>&nbsp;</h6><table class='compact table table-sm table-borderless'><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><tr><tr><td>&nbsp;</td><td>&nbsp;</td><tr></table>";
    $("#hex1").html(tableStat(c1,a,p1,d1,b1,0,0));
    $("#hex2").html(tableStat(c2,d,p2,d2,b2,p3[1],e));
}

function trouveterrain(n) {  
    //if ($("select.trouveterrain option:selected").length==0) return; 
    let x=$(".terrain"+n+" select.trouveterrain option:selected").val();
    trouveperso(n);
    $(".hexa .hex"+(7+n)).css("fill","url(#"+x+")");
}

function trouveperso(n) {
    let x=$("#nav-tabContent"+n+" div.active select.trouveperso option:selected").val();
    if (x=="") return;
    let ter=$(".terrain"+n+" select.trouveterrain option:selected").val();
    $("#nav-tabContent"+n+" div:not(.active) select.trouveperso option").prop("selected", false);
    let t=troupes[x];
    t.terrain=ter;
    if (typeof t=="undefined") return;
    if (n==1) {
        let nn=$("#number1").children("option:selected").val();
        if (nn>1&&t.troupe==true) 
            perso1=new Unite(t,nn);
        else perso1=t;
        perso1.a=perso1.toMelee(perso2);
     }else {
        let nn=$("#number2").children("option:selected").val();
        if (nn>1&&t.troupe==true) 
            perso2=new Unite(t,nn);
         else perso2=t;
        perso2.d=perso2.toHTML()[5];
     }
    if (perso1) $("#hex1").html(tableStat(perso1,perso1.a,[perso1.pdv,1],0,0,0,0));
    if (perso2) $("#hex2").html(tableStat(perso2,perso2.d,[perso2.pdv,1],0,0,0,0)); 
    
    if (perso1&&perso2) {
        perso1.a=perso1.toMelee(perso2);
        let c=combat(perso1,perso2,true);
        let b=0;
        let cb=0;
        let ci=0;
        for (i=1;i<9;i++) {
            b+=c.blessure[i]; cb+=c.blessure[i]*i; ci+=c.inflige[i]*i;
        }
        b+=c.blessure[0];
        drawValues(perso1,perso2,perso1.a,perso2.d,[perso1.pdv-ci,1-c.infligetue-c.infligehdc],[perso2.pdv-cb,b],[1,c.recul],c.infligetue,c.tue,c.infligehdc,c.hdc,c.esquive);
     
    }
}

function resetgroup(group,min,max) {
    let i;
    for (i=min;i<max;i++)
        // RM CHECKBOX
        $("input[name=g"+group+"_"+i+"]").prop("checked",false);
    computeArmy();
}
function setArmyGroups(army,at,atfaction) {
    let i,first=-1;
    if (typeof atfaction=="undefined") atfaction=AUTRE;
    army[at]={g:[],f:atfaction};
    let liste=troupes
        .filter((x)=>(typeof x[at]!="undefined"))
        .sort((a,b)=>(a[at][2]-b[at][2]));
    let ggid=liste[0][at][2];
    let g=[];
    for (i=0;i<liste.length;i++) {
        let gid=liste[i][at][2];
        if (gid==ggid) g.push(liste[i]);
        else {
            if (first==-1&&ggid>0) army[at].g.push([]);
            first=ggid;
            army[at].g.push(g);
            g=[liste[i]];
            ggid=liste[i][at][2];
        }
    }
    army[at].g.push(g);
    return army;
}
function getArmyHTML(army,at) {
    let s="";
    let button="";
    groups=army[at].g;
    for (i=1;i<groups.length;i++) {
        groups[i].sort((a,b)=>b[at][0]-a[at][0]);
        let gid=groups[i][0];
        let l=groups[i].length;
        let type="";
        let min=gid[at][3],max=gid[at][4]; 
        button="";
        if (gid[at][2]==APOCALYPSE&&army.apocalypse==true) continue;
        if (gid[at][2]==APOCALYPSE) army.apocalypse=true;
        if (groups[i].some((x)=>x[at][4]>x[at][3])) button="<button class='btn btn-sm btn-outline-light' onclick='resetgroup("+gid[at][2]+","+min+","+max+")'>&#x21ba;</button>";
        if (gid[at][2]>0&&gid[at][2]!=SOUTIEN&&gid[at][2]!=APOCALYPSE) {
            type="&nbsp;<span class='"+NOM_TYPE[gid.type]+" type'></span>";
            if (gid.melee) type+="&nbsp;<span class='melee combat'></span>";
            else if (gid.tir&&gid.typetir==TENDU) type+="&nbsp;<span class='tirtendu combat'></span>";
            else if (gid.tir&&gid.typetir==CLOCHE) type+="&nbsp;<span class='tircloche combat'></span>";
        }
        if (gid[at][2]==APOCALYPSE) {
            let pts=350;
            if (nbarmee==2) pts=750;
            if (nbarmee==3) pts=1250;
            type="&nbsp;<b>[Points <span class='apo'>0</span>/<span class='apopts'>"+pts+"</span>]</b>";
        }
        s+="<div class='card shadow";
        if (gid[at][2]==APOCALYPSE) s+=" apocalypse";
        s+="'><div class='card-header p-1'>"+button+" <b lang='fr'>"+LISTE_CATEGORIES[gid[at][2]]+"</b><b lang='en'>"+LISTE_CATEGORIES_EN[gid[at][2]]+"</b><span style='float:right'>"+type+"&nbsp;<span class='blason-large "+NOM_FACTION[army[at].f]+"'></span></span></div><div class='card-body p-0 m-0'><table class='armee w-100' data-faction='"+NOM_FACTION[army[at].f]+"'>"; 
        for (j=0;j<groups[i].length;j++) {
            let g=groups[i][j];
            s+=g.toArmy(at);
        }
        s+="</table></div></div>";
    }
    return s;
}
function getArmyFaction(at) {
    let i;
    let atfaction=-1;
    if (at=="") return atfaction;
    for (i=0;i<LISTE_ARMEES.length;i++) {
        let l=LISTE_ARMEES[i];
        if (l.id==at) { atfaction=l.blason; break; }
    }
    return atfaction;
}
function changeArmee() {
    let k;
    let army={};
    for (k=1;k<=3;k++) {
        let at=$("#list"+k).attr("val");
        let atfaction= getArmyFaction(at);
        if (atfaction==-1) continue;
        setArmyGroups(army,at,atfaction);
    }
    let s="";
    let button="";
    army.apocalypse=false;
    for (at in army) {
        if (at=="apocalypse") continue;
        groups=army[at].g;
        s+=getArmyHTML(army,at);
    }
    let card="";
    button="<button class='btn btn-sm btn-outline-light' onclick='resetgroup("+PERSONNAGE+",1,2)'>&#x21ba;</button>";
    let head="<div class='card shadow'><div class='card-header p-1'>"+button+"<b lang='fr'>"+LISTE_CATEGORIES[PERSONNAGE]+"</b><b lang='en'>"+LISTE_CATEGORIES_EN[PERSONNAGE]+"</b> <span style='float:right' class='blason-large";
    let min=0,max=2; // Changed for mercenaries 
    if (nbarmee==2) max=4;
    if (nbarmee==3) { min=2; max=6; }
    for (at in army) {
        if (at=="apocalypse") continue;
        groups=army[at].g;
        groups[0].sort((a,b)=>b[at][0]-a[at][0]);
        head+=" "+NOM_FACTION[army[at].f];
        for (j=0;j<groups[0].length;j++) {
            let g=groups[0][j];
            card+=g.toArmy(at,min,max);
        }
    }
    if (card!="") card=head+"'></span></div><div class='card-body p-0 m-0'><table class='armee w-100'>"+card+"</table></div></div>";
    $("#deck").html(card+s);
    
    computeArmy();
    $("input[data-pts]").click(computeArmy);
}
var team=false;
var siege=0;
var nbarmee=1;
function off(t) {
    $("#list"+t).html("---------");
    $("#list"+t).attr("val","");
    $("#list"+t).prop("disabled",true);
}

function armySize(t) {
    let oldsize=nbarmee;
    nbarmee=t;
    $("#defsiege").prop("disabled",false);
    $("#attsiege").prop("disabled",false);
    if (nbarmee==1) {
        off(2);
        off(3);
        $("#defsiege").prop("disabled",true);
        $("#attsiege").prop("disabled",true);
        $("#nosiege").prop("checked",true);
        armySiege(0);
        changeArmee();
    } else if (nbarmee==2) {
        off(3);
        changelist(2,5);
    } else {
        if (oldsize<2) changelist(2,1);
        changelist(3,11);
    }
    updateTotalPts();
}
function changeyear(t) {
    $(".year").html(t);
    if ($("#yearfilter").is(":checked")) troupes.filter((x)=>!x.troupe&&x.dates).forEach((x) => {
        let y=x.getHTMLName(x.getName(false));
        if (x.dates[0]>t||x.dates[1]<t) $("#P"+y).hide(); else $("#P"+y).show();
    }); else {
        troupes.filter((x)=>!x.troupe&&x.dates).forEach((x) => {
        let y=x.getHTMLName(x.getName(false));
        $("#P"+y).show();
    }); 
    }
}
function armySiege(t) {
    let at=$("#list1").attr("val");
    let atfaction= getArmyFaction(at);
    if (t==0)  {
        siege=0;
        $(".defsiege").hide();
        $(".attsiege").hide();
        $("#deckattsiege").html("");
        $("#deckdefsiege").html("");
    } else if (t==1) {
        siege=1;
        $(".defsiege").hide();
        $("#deckattsiege").html(getArmyHTML(setArmyGroups({},"s1",atfaction),"s1"));
        $(".attsiege").show();
        $(".totalattsiege").html(750+(nbarmee==3)*500);
        $("input[data-pts]").click(computeArmy);
        computeArmy();
    } else if (t==2) {
        siege=2;
        $(".attsiege").hide();
        $("#deckattsiege").html("");
        $("#deckdefsiege").html(getArmyHTML(setArmyGroups({},"s2",atfaction),"s2"));
        $(".defsiege").show();
        $(".totaldefsiege").html(750+(nbarmee==3)*500);
        $("input[data-pts]").click(computeArmy);
        computeArmy();
    }
    updateTotalPts();
}
function armyTeam(t) {
    team=t;
    updateTotalPts();
}
function updateTotalPts() {
    let bonuspts=0;
    if (siege==1) bonuspts=250;
    if (team) {
        switch(nbarmee) {
        case 1: $(".total").html(1250+bonuspts); break;
        case 2: $(".total").html(2000+bonuspts); break;
        default: $(".total").html(3250+bonuspts); break;
        }
    } else {
        switch(nbarmee) {
        case 1: $(".total").html(1500+bonuspts); break;
        case 2: $(".total").html(2500+bonuspts); break;
        default: $(".total").html(4000+bonuspts); break;
        }
    }
/*    $(".sum").html(0);
    $(".moral").html(0);*/
}
function changebutton(id) {
    console.log($("#list"+id).attr(val));
}
function changelist(id,e) {
    $("#list"+id).prop("disabled",false);
    $("#list"+id).attr("val",LISTE_ARMEES[e].id);
    $("#list"+id).attr("faction",LISTE_ARMEES[e].blason);
    $("#list"+id).html("<span class='blason "+NOM_FACTION[LISTE_ARMEES[e].blason]+"'> </span> <span lang='fr'>"+LISTE_ARMEES[e].ftext+"</span><span lang='en'>"+LISTE_ARMEES[e].etext+"</span>");
    changeArmee();
}
function computeArmy() {
    let s=0,m=0,a={};
    $("input:radio[data-mini]").prop("disabled",false);
    $("input:radio[data-mini]:checked").each(function() {
        let mini=$(this).attr("data-mini");
        let name=$(this).attr("name");
        $("input:radio[data-mini="+mini+"]:not(:checked)").each(function() {
            if ($(this).attr("name")!=name) $(this).prop("disabled",true);
        });
    })
    $(".armee-table-perso tbody").html("");
    $(".armee-table tbody").html("");
    // RM RADIO
    let apo=0;
    $(".apocalypse input[data-pts]:checked").each(function() {
        apo+=parseInt($(this).data("pts"),10);
    });
    $(".apo").html(apo);
    //let f=NOM_FACTION[$("#list1").attr("faction")];

    $("input[data-pts]:checked").each(function() {
        let s0=parseInt($(this).data("pts"),10);
        let m0=parseInt($(this).data("moral"),10);
        let f=$(this).parent().parent().parent().parent().data("faction");
        let u=$(this).parent().parent().children("td").children("a");
        let img=u.data("src");
        if (typeof u.data("id")!="undefined") { 
            let t=troupes[u.data("id")];
            let name=t.text;
            if (typeof f=="undefined") f=NOM_FACTION[t.faction];
            if (typeof a[f]=="undefined") a[f]={};
            m+=m0;
            s+=s0;
            if (typeof a[f][name]=="undefined") a[f][name]={id:u.data("id"),moral:m0,points:s0,no:1,src:img,mini:t.i};
            else a[f][name]={id:u.data("id"),moral:m0,points:s0,no:a[f][name].no+1,src:img,mini:t.i};
        }
    });
    $(".armee-table").html("");
    // REDO 
    let ii=1,i;
    for (i in a) {
        let x=a[i];
        $(".armee-table").append(listeCartesJSON(ii,{nom:"Armée "+ii,faction:i,liste:x},true)+"<br/>");
        ii++;
    }
    $(".sum").html(s);
    /*let r="";
    let mm=Math.ceil(2*m/3);
    for (i=0;i<mm-4;i+=5) {
        r+="&#9633;".repeat(5)+"&nbsp;&nbsp;";
    }
    r+="&#9633;".repeat(mm-i);
    $(".moralshield").html(r+" (<span>"+mm+"</span> max)");*/
    $(".moral").html(Math.ceil(2*m/3));
}

function allowDrop(ev) {
    ev.preventDefault();
}

function dragstart_handler(ev) {
    console.log("targetid="+ev.target.id);
    let dt=ev.dataTransfer;
    if (typeof ev.originalEvent!="undefined") dt=ev.originalEvent.dataTransfer;
    dt.setData("id", ev.target.id);
    if (typeof ev.target.attributes.rot!="undefined") 
        dt.setData("rot", ev.target.attributes.rot.value);
}
let hex2_q=[0,1,1,0,-1,-1];
let hex2_r=[1,1,0,-1,0,1];
let hex2_qe=[0,1,1,0,-1,-1];
let hex2_re=[1,0,-1,-1,-1,0];
var dropped=0;
var hexmap;

function listeCartesC(s,v) {
    let d=$("<div>");
    let w,e;
    let hash=d.html(v).text();
    let tt="tt"+hash;
    JSON.load(hash,function(vv,w) {
        $("#"+tt).html(listeCartesJSON(vv,w,false));
    });
    return "<div id='"+tt+"'></div>";
}

function carte(s,hash) {
    let tt="tt"+hash;
    let wyn="wyn"+hash;
    let i;
    HexMap.load(hash,tt).done(function(hm) {
        let wy=[];
        /*for (i=0;i<hm.hexes.length;i++) {
            let h=hm.hexes[i];
            if (h.n=="white") continue;
            if (h.n.endsWith("_2")||h.n.endsWith("_3")) continue;
            if (h.n.endsWith("_1")) wy.push(h.n.slice(0,h.n.length-2));
            else wy.push(h.n);
        }
        wy.sort();
        let w={}
        for (i=0;i<wy.length;i++) {
            if (typeof w[wy[i]]=="undefined") w[wy[i]]=1;
            else w[wy[i]]++;
        }
        let s=[];
        for (i in w)
            s.push(w[i]+"x"+i);
        $("#"+wyn).html("Hex:"+s.join(", "));*/
    });
    return "<div class='col-8 mt-4'><div style='margin-right:2em' id='"+tt+"'></div></div>";
}

function storeJSON(t) {
    let n=t.attr("data-n");
    let jc=t.attr("data-json");
    let d=$("<div>");
    d.html(jc);
    let json=JSONC.unpack(d.text(),true);
    json.nom=$("#getname"+n).val();
    if (json.nom=="") {
        alert("Give an army name first");
    } else {
        JSON.save(json).done(function(data) {
            $("#code").html(data);
        });
    }
    //localStorage["joueur"+$("#getname"+n).val()]=JSON.stringify(JSONC.pack(json));
}
function listeCartesJSON(n,vv,b) {
    let ii=1,j;
    let text="<div class='row d-inline-block p-2'>";
    if (!b) {
        text+="<div class='d-inline-block align-middle p-2'><div style='width:10em'>"+vv.nom+"</div><div class='blason-xlarge "+vv.faction+"'></div></div>";
    } else {
        let d=$("<div>");
        d.text(JSONC.pack(vv,true));
        text+="<div class='d-block align-middle p-2'>";
        text+="<div class='btn-group mr-2'><span class='blason-large "+vv.faction+"'></span><input type='text' id='getname"+n+"' placeholder='"+vv.nom+"'></div>";
        text+="<div class='btn-group mr-2'><button type='button' class='fas fa-hashtag btn btn-secondary' data-n='"+n+"' data-json='"+(d.html())+"' onclick='storeJSON($(this))'></button><span id='code' class='hashhexmap text-center text-muted'></span></div>";
        text+="</div>";
    }
    for (j in vv.liste) {
        let u = vv.liste[j];
        let t="class='perso-img'";
        if (troupes[u.id].troupe==true) t="class='troupe-img' ";
        if (troupes[u.id].gigantesque==true) t="class='perso-huge' ";
        text+="<div class='d-inline-block align-top'>";   
        text+="<img "+t+" src='"+u.src+"'>";
        if (troupes[u.id].troupe==true)
            text+="<div class='small troupe-img'>"+u.no+" "+troupes[u.id].getName();
        else  text+="<div class='small perso-img'>"+troupes[u.id].getName();
        text+="<div class='moralv text-muted small'>moral:"+(u.no*u.moral)+" pts:"+(u.no*u.points)+"</div></div>";
        text+="</div>";
    }
    text+="</div>";
    return text;
}
function drop(ev) {
    ev.preventDefault();
    console.log("dropping !!!");
    let dt=ev.dataTransfer;
    if (typeof ev.originalEvent!="undefined") dt=ev.originalEvent.dataTransfer;

    let s=dt.getData("id");
    let id=s.substring(4);
    let target=$(ev.target);
    let parent=target.parent();
    let q=parseInt(parent.attr("data-q"),10);
    let r=parseInt(parent.attr("data-r"),10);
    let hex=hexmap.find(q,r);
    let zone=parseInt(target.attr("data-z"),10);
    let faction=null;
    console.log("s="+s);
    console.log(ev);
    // Add a new unit
    var data = troupes[id];
    let img=null,html;
    let h=parseInt($(".navbar").css("height").split("p")[0],10);
    let hh=20; //64;
    let ll=20;
    let g="";
    faction=$("#"+s).attr("data-faction");
    if (typeof data!="undefined"&&s.startsWith("un")) {
        html=data.toHTML();
        if (data.grand) { g="class='grand'"; hh=64; }
        else if (data.gigantesque) {
            hh=200;
            ll=120;
            g="class='gigantesque'";
        }
        if (s=="unit"+id) {
            s="un"+("0" + dropped).slice(-2)+data.id;
            img=$("<img draggable='true' "+g+" data-original-title='"+data.text+"' data-toggle='tooltip' ondragstart='dragstart_handler(event)' id='"+s+"' src='images/"+html[10][0]+"'>");        
            dropped++;
        } else {
            img=$("#"+s);
            if (data.i=="Dragon") {
                hh=300;
                img.addClass("Dragon");
            }
        }
    } else if (s.startsWith("d")) {
        data=liste_decors[id];
        hh=data.hh;
        ll=data.ll;
        if (data.grand) { g="class='grand'"; }
        else if (data.gigantesque) { g="class='gigantesque'"; }
        else if (data.medium) {g="class='medium'";}
        else if (data.small) {g="class='small'";}
        if (s=="deco"+id) {
            s="dr"+("0" + dropped).slice(-2)+id;
            dropped++;
            img=$("<img draggable='true' "+g+" data-original-title='"+data.text+"' data-toggle='tooltip' ondragstart='dragstart_handler(event)' id='"+s+"' class='deco' src='decors/"+data.i+".png'>");
        } else {
            img=$("#"+s);
        }
    }
        
    if (img!=null) {
        let ggparent=parent.parent().parent();
        console.log(ggparent.width()/ggparent.height());
        let offset=ggparent.offset();
        let ttop=offset.top;
        let top =(ev.pageY-hh-ttop) / ggparent.height() * 100;
        let tleft=offset.left;
        let left=(ev.pageX-ll-tleft) / ggparent.width() * 100;
        img.css({top:top+"%",left:left+"%", position:"absolute"});
        ggparent.append(img);
    }
    /* Remove units from all zones */
    if (s.startsWith("un")||s.startsWith("dr")) 
        for (i=0;i<hexmap.hexes.length;i++)
            hexmap.hexes[i].removeUnit(s);
    /* Now add unit to its zone */
    hex.addUnit(s,zone,faction);
    $('[data-toggle="tooltip"]').tooltip();
}


function setActive(n) {
    $(".active").removeClass("active");
    $("#"+n).addClass("active");
}

$( document ).ready(function() {
    if (/^en\b/.test(navigator.language)) {       
        document.documentElement.lang='en';
    }
    troupes=Unite.troupes();
    persolist=troupes.filter((x)=>typeof x.dates!="undefined").sort((a,b)=>(a.text>b.text)).filter(unique);
    evenements.map(x=>x.info(troupes,persolist));

    dl=new dateline("dl",{
        start:"1297-09-10",
        end:"1475-08",
        url:"top",
        info:(e=>e.info(troupes,persolist)),
        cursor:"1429-02-01",
        loading:"<i class=\"far fa-spinner fa-spin fa-lg\"></i>&nbsp;&hellip;",
        locale:"fr-FR",
        
       bands:[
            {size:"68%",scale:6,interval:60},
            {size:"16%",layout:"overview",scale:7,interval:100},
            {size:"16%",layout:"overview",scale:8,interval:40,multiple:2}
        ],
       events:evenements,
       formatter:(e)=>e.format(false)
    });
    $(".findperso").select2({placeholder:'Choisissez une unité',data:persolist,templateResult:(e)=>(new Unite(e)).format(true)});
    $(".finddate").select2({placeholder:'Choisissez un événement',data:evenements,templateResult:(e)=>(new Evenement(e)).format(true)});
    /*for (i in localStorage)
        if (i.startsWith("joueur")) {
            $(".player select").append("<option value='"+i.substring(6)+"'>"+i.substring(6)+"</option>");
            }*/
    
    let terrains=[{id:"plain",text:"plaine",selected:true},{id:"ble",text:"champs"},{id:"forest",text:"forêt"},{id:"swamp",text:"marais"},{id:"pave",text:"village"},{id:"rock",text:"rocher"}];
    
    $(".trouveterrain").select2({data:terrains,templateResult:(e)=>$("<span><img class='img-circle "+e.id+"' src='css/"+e.id+".png'/>"+e.text+"</span>")});
    for (i in NOM_FACTION) {
        let n=NOM_FACTION[i];
        if (n=="neutre") {
            $(".trouveperso.neutre").select2({placeholder:'Choisissez une unité',data:troupes.filter((x)=>!x.civil&&typeof x.faction=="undefined").sort((a,b)=>a.nom>b.nom),templateResult:(e)=>(new Unite(e)).format(false)});
        } else {
            (function (k,n) {
                $(".trouveperso."+n).select2({placeholder:'Choisissez une unité',data:troupes.filter((x)=>x.faction==k).sort((a,b)=>a.nom>b.nom),templateResult:(e)=>(new Unite(e)).format(false)});
            })(i,n);
        }
    }
    $("#number1").select2();
    $("#number2").select2();

    //var allp= touslesduels(troupes.filter((x)=>!x.troupe));
    $("#tablepersos tbody").append(troupes.filter((x)=>!x.troupe).join(''));
    $("#tablepersos").DataTable({
        "paging":         true,
        "columnDefs": [
            { "width": "20%", "targets": 0 }
        ],
        "columns": [
            {"width": "25%",className:"fr"},
            {"width":"25%",className:"en"},
            {"width":"3%"},
            {"width":"2%"},
            {"width":"2%"},
            {"width":"15%"},
            {"width":"3%"},
            {"width":"5%"},
            {"width": "50%"},
        ]
    });
    let mt = [];
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    for (i in minis) {
        let c="mini";
        let names=minis[i].unites.map((x)=>troupes[x].getName(true)).filter(onlyUnique);
        let ext=minis[i].n;
        let boxes=["Core","Rel.","Apo.","Dra.","Hel.","Leg.","Ott.","SE","Sie.","SiQ.","Teu.","Vil.","RB1","RB3","RB4","RB5","RB6","RB10"];
        let exts="";
        for (let i=0;i<boxes.length;i++)
            if (ext[i]>0) exts+="<li>"+boxes[i]+":"+ext[i]+"x </li>";
        let n=names.length;
        if (n>0)
            mt.push("<td><img src='mini-small/"+i+".png'></td><td><ul>"+exts+"</ul></td><td>"+(names.join(", "))+"</td>");
    }
    $("#tableminis tbody").append("<tr>"+mt.join("</tr><tr>")+"</tr>");
    $("#tableminis").DataTable({
        "paging":         true,
        "columnDefs": [
            { "width": "10%", "targets": 0 }
        ],
        "columns": [
            {"width":"10%"},
            {"width":"20%"},
            {"width": "70%"},

        ]
    });

    $('[data-toggle="tooltip"]').tooltip()


    for (i=0;i<6;i++) 
        $(".bl"+(i+1)).unitimg({u:{i:NOM_FACTION[i],text:""},id:"blaso"+(i+1),dir:"images/icon",faction:NOM_FACTION[i]+""+(i)});

    
    for (i=1;i<=6; i++) {
        (function(i) {
        $("#armee"+i).change(function() {
            let vv=($(this).val());
            let id=$(this).attr("id").substring(5);
            let obj={id:id,i:i};
            let td=$("#mini"+id);
            td.removeClass();
            (function(iii,iiid) {
                JSON.load(vv,function(hash,json) {
                    $("#mini"+iii).addClass(json.faction+""+(iii-1));
                    for (let j in json.liste) {
                        $(".nom"+iiid).html(json.nom);
                        $(".bl"+iiid).html("");
                        /*
                          $(".bl"+id).removeClass(["bien","mal", "francais", "ecossais","ottoman", "anglais", "bourguignon", "valaque", "mercenaire", "lituanien", "polonais" ,"teutonique"]);
                          $(".bl"+id).addClass(json.faction);*/
                        $(".bl"+id).unitimg({u:{i:json.faction,text:""},id:"blaso"+json.faction+""+i,dir:"images/icon",faction:json.faction+""+(iii-1)});
                        for (let k=0;k<json.liste[j].no;k++) 
                            td.unitimg({u:troupes[json.liste[j].id],
                                        id:"un"+(iii+"" + k).slice(-2)+json.liste[j].id,
                                        faction:json.faction+""+(iii-1),
                                        dir:"mini-small"});
                    }
                    $('[data-toggle="tooltip"]').tooltip()
                }.bind(obj));
            })(i,id);
                         
        });
        })(i);
    }/*
    yxuo3wo7
    y5gtjnee
*/
    //var u = touslesduels(troupes.filter((x)=>x.troupe));
    $("#tabletroupes tbody").append(troupes.filter((x)=>x.troupe).join(''));
    $("#tabletroupes").DataTable({
        "paging":         true,
        "columnDefs": [
            { "width": "20%", "targets": 0 }
        ],
        order: [[2, 'asc']],
        "columns": [
            {"width": "25%",className:'fr'},
            {"width": "25%",className:'en'},
            {"width":"3%"},
            {"width":"3%"},
            {"width":"3%"},
            {"width":"15%"},
            {"width":"3%"},
            {"width":"5%"},
            {"width": "45%"},
        ]
    });
    let tmpl=((l,e)=>$('<li class="dropdown-item" onclick="changelist('+l+','+e+')"><span class="blason-large '+NOM_FACTION[LISTE_ARMEES[e].blason]+'"> </span> <span lang="fr">'+LISTE_ARMEES[e].ftext+'</span><span lang="en">'+LISTE_ARMEES[e].etext+'</span></li>'));
    let group=((e)=>$("<li class='dropdown-submenu'><span class='dropdown-item dropdown-toggle'><span class='blason-large "+NOM_FACTION[LISTE_ARMEES[e].blason]+"'> </span> <span lang='fr'>"+LISTE_ARMEES[e].ftext+"</span><span lang='en'>"+LISTE_ARMEES[e].etext+"</span> </span><ul class='dropdown-menu C"+LISTE_ARMEES[e].id+"'></ul>"));
    
    for (i=0;i<LISTE_ARMEES.length;i++) {
        let a=LISTE_ARMEES[i];
        if (a.noselect) continue;
        for (j=1;j<=3;j++) {
            if (a.group) $(".trouvearmee"+j).append(group(i));
            else if (a.parent) $(".trouvearmee"+j+" .C"+a.parent).append(tmpl(j,i));
            else $(".trouvearmee"+j).append(tmpl(j,i));
        }
    }
    changelist(1,4);

    armySize(1);
    armySiege(0);
    /*$("#ex13").bootstrapSlider({
        ticks: [1, 2, 3],
        ticks_labels: ['<span lang="fr">petite</span><span lang="en">small</span>', '<span lang="fr">moyenne</span><span lang="en">medium</span>', '<span lang="fr">grande</span><span lang="en">large</span>'],
        ticks_snap_bounds: 1,
    });*/
    $("#ex7").bootstrapSlider();
    Unite.changeLang();

    let q,r,ball=[];
    //setHexmap(7);
    /*let lword="H8KLCABXW8OCXwIDwo3ClcOLTsODQAxFw79lw5ZFw7IjaUp2w4lvIMOECgk2IFAlFsKIf8KnVTPCncOcecOZwqtKw43CiX19Mho/w73ChsKvMD8MwofDsH3Du8O5CHPDuHl7P8K/wobDi1/Cn8OnMMOTw58BGHUww6Jgw5hmw4hGHFUcYcK6M8Kpw4PCjTrDnCjCuBnDlwhoBsKwAWxWZHnCkUjCjEjDsMKdw5AGIXbDkMOuLMOicCLDoMOkwrQUUQTChBzDi3kFwoTDsMK0wptnQCY5w6FGGzbCumwpw7jCuCbCrVnCk8KuEXYYYTDDssK4wrbCgC3Di8K0FEHCuDAiDcKGEsOCDSRWwpF7H0ZAw7JPwpcVw5DDpMKsw6hBw6DCg8K1wpLClEAHD8K7wqTCjMKIFEnCsxpxwpRTw6XCiBDDuBh3WQkITsKEw5QJaX04Ah3CtMOkw48dwocDw4/DhsOVV8KhFE/Dh8OVwpfDpMK+wrjDkCHDtSrClMKIRh82wqbDmWIMFcKfcDouwoDDpsKAw6PDusOAw5tjKm4Pwrw8dGnCvB/Cp2g8wqfDvmPDrldPCsKkDsO0bgzDh1pxbBXCtRfCrsOaw7tWw411wqvDpsK2wrUXS2/CrzzDvwPClivDrsKxwokIAAA=";
    $.get("https://tinyurl.com/api-create.php",{url:"https://xws-bench.github.io/joan-of-arc-helper/index.html?h="+lword}).done(function(data) {
        console.log("Battlefield "+data.substring(20));
    });*/
    HexMap.load("y4adhpa9","hexmap-9").done(function(data) { hexmap = data; console.log("hexmap");console.log(hexmap); });
    HexMap.setPrefabs();
    
    $("#hex1").hexchooser({list:tex1,top:"5%",left:"2%"});
    $("#hex2").hexchooser({list:tex2,top:"15%",left:"8%",leftt:"10%",topt:"50%"});
    $("#hex3").hexchooser({list:tex3,top:"15%",left:"10%",topt:"50%",leftt:"28%",suff:"A"});
    $("#hex3").hexchooser({list:tex3,top:"15%",left:"10%",topt:"50%",leftt:"-3%",suff:"B"});
    var zones = $('.zone');
    for (i=0;i<zones.length;i++) {
        zones[i].id=i;
        //zones[i].attributes["title"].value="<b>Unités</b>";
        zones[i].onclick=function(e){
            let z=this.attributes["data-z"].value;
            $(".zone").removeClass("active");
            this.classList.add("active");
        }.bind(zones[i]);
    }

    for ( i=0;i<liste_decors.length;i++) {
        let l=liste_decors[i];
        $("#houses").unitimg({u:l,dir:"decors",id:"deco"+i});
    }
    let civil=troupes.filter((x)=>x.civil==true&&x.box[0]!=SE);
    for (let j in civil) {
        let u=civil[j];
        $("#houses").unitimg({u:u,id:"unit"+u.id});
    }
    $('[data-toggle="tooltip"]').tooltip();

    
    // $(".player input").change(a);
    var replacemde = function(hash) {
        JSON.load(hash/*"yyw9gfsj"*/,function(h,json) {
            simplemde.value(json.txt);
            $("#scenariohash").html(h);
            if (!simplemde.isPreviewActive()) simplemde.togglePreview();
        });
    }
    var savemde = function() {
        //console.log(simplemde.value());
        JSON.save({txt:simplemde.value()}).done(function(data) {
            $("#scenariohash").html(data);
	})
    }
    var simplemde = new SimpleMDE({ 
        element: document.getElementById("editor"),
        autosave: {
		enabled: true,
		uniqueId: "MyUniqueID",
		delay: 1000,
	        },
        status: ["autosave", "lines", "words", "cursor"], // Optional usage
        spellChecker:false,
        autoDownloadFontAwesome:false,
        toolbar: ["bold","italic","heading","unordered-list","ordered-list","link","image","preview","side-by-side","fullscreen",
	    {//yxetymuo
		name: "hash",
		action: savemde,
		className: "btn btn-secondary prehashmap fas fa-hashtag",
		title: "Creates a hashtag",
	    },
	],
        shortcuts: {
            "toggleSideBySide":"Ctrl-S",
	    "toggleFullScreen": "Ctrl-F",
        },
        previewRender: function(plainText) {
	    return Unite.replaceMd(this.parent.markdown(plainText)); // Returns HTML from a custom parser
	},
    });
    /*simplemde.previewRender=function(plainText) {
	    return Unite.replace(this.markdown(plainText)); // Returns HTML from a custom parser
    };*/
    $(".savehexmap").click(function() {
        hexmap.save().done((data) => $("#codemap").html(data));
    });
    let dd=$("<div>");
    dd.addClass("hashhexmap");
    dd.attr("id","scenariohash");
    dd.insertAfter("#scenario .prehashmap");
    dd=$("<div>");
    dd.attr("id","scenariopermalink");
    dd.addClass("btn btn-secondary fas fa-link");
    dd.insertAfter("#scenario #scenariohash");
    dd=$("<div class='dropdown mr-2 ml-2'><button class='btn btn-secondary dropdown-toggle' type='button' id='prefabbutton2' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Prefabs</button><div class='dropdown-menu' id='prefabs2' aria-labelledby='dropdownMenuButton'></div></div>");
    dd.insertBefore("#scenario .prehashmap");
    $("a.nav-link").click(function() {
        $(".nav-link").css({color:"rgba(255,255,255,0.5)"});
        $(this).css({ color:"white" });
    });

    let scenarios=[
        {h:"y2pd8pye",nom:"La bataille d'Azincourt <span class='blason francais'></span><span class='blason anglais'></span>",name:"Battle of Agincourt <span class='blason francais'></span><span class='blason anglais'></span>"},
        {h:"y339yz5h",nom:"La bataille de Pourrières  <span class='blason francais'></span><span class='blason anglais'></span>",name:"Battle of Pourrières <span class='blason francais'></span><span class='blason anglais'></span>"},
        //{h:"y5xmyldq",nom:"L'attaque des Tourelles  <span class='blason francais'></span><span class='blason anglais'></span>",name:"The attack of the Tourelles  <span class='blason francais'></span><span class='blason anglais'></span>"}
    ];
    
    for (i=0;i<scenarios.length;i++) {
        let c=scenarios[i];
        let s=$("<div>");
        s.addClass("drop-item");
        s.html("<span lang='fr'>"+c.nom+"</span><span lang='en'>"+c.name+"</span>");
        s.click(function() {
            $("#prefabbutton2").html("<span lang='fr'>"+c.nom+"</span><span lang='en'>"+c.name+"</span>");
            replacemde(c.h);
        });
        $("#prefabs2").append(s);
    }
    $("#scenariopermalink").click(function() {
        let k=$("#scenariohash").html();
        if (k!="") document.location.search="?s="+k;
    });

    var $_GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    if (typeof $_GET["s"]!="undefined") {
        document.location.hash="scenario";
        replacemde($_GET["s"]);
    }

});

function setHexmap(diam) {
    let q,r,ball=[];
    up=diam-Math.floor(diam/2);
    for (q=-Math.floor(diam/2);q<up;q++)
        for (r=-Math.floor(diam/2);r<up;r++) 
            ball.push({n:"white",q:q,r:r});
    hexmap= new HexMap("hexmap-9",{
        "layout":"odd-q",
        "hexes": ball
    });
}

JSON.save=function (json) {
    let deferred = $.Deferred();
    $.get("https://tinyurl.com/api-create.php",{url:"https://xws-bench.github.io/joan-of-arc-helper/index.html?h="+JSONC.pack(json,true)}).done(function(data) {
        deferred.resolve(data.substring(20));
    });
    return deferred.promise();
}
JSON.load=function(hash,f) {
    try {
        fetch('https://tinyurl.com/'+hash,{redirect:"follow"})
            .then(response => {
                let hh=response.url.substring(60)
                f(hash,JSONC.unpack(hh,true));
            })
    } catch(e) {
        console.error(e);
    }
}
/*
y3gcrbmt : joueur 1
yysd6b2r : joueur 2
y699th2g : joueur 3
y6mxqdlw : joueur 4

Carte:
y4t5ll9v
y5qbe6ec

Joueur 1: y5m7qwp3
Renforts: y5wj3paq
Joueur 2: y3ezokx9
*/
