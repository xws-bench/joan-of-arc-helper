let unbouclier=[0,0,0,1];
let untue=[0,0,1,0];
let unrecul=[1,0,0,0];
let unblanc=[0,0,0,0];
let untouche=[0,1,0,0];
var persolist=[];
var dl;
var k,kk,i=0,j;
var nom;
var f=FRANCAIS;
var anti=ANGLAIS;

unbouclier.toHTML=(()=>"<span class='bouclier'></span>");
untue.toHTML=(()=>"<span class='facerouge tue'></span>");
untue.capacite=(()=>null);
unrecul.toHTML=(()=>"");
unrecul.capacite=(()=>"en attaque : ajouter <span class='recul'/> aux résultats des dés");

function distribution(dices,group1,feinte) {
    let k,h,i,s,r,p,np;
    if (typeof distribution.cache=="undefined") distribution.cache={};
    if (typeof feinte=="undefined") feinte=false;
    else feinte=true;
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
    else parade=true;
    if (typeof bouclier.cache=="undefined") bouclier.cache={};
    if (bouclier.cache[dices+parade]) {
        //console.log(""+dices);
        return bouclier.cache[dices+parade];
    }
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
    res.esquive=(1-es);
    bouclier[dices+parade]=pr;
    res.bouclier=pr;
    return res;
}
function untouchetue(p,h,k) {
    if (h>0) { k=k+1; h=h-1; }
    return [p,h,k];
}
function touchetuerecul(p,h,k) {
    return [p+h+k,0,0];
}
function annule1recul(p,h,k) {
    if (p>0) p=p-1;
    return [p,h,k];
}
function doubleblessure(p,h) {
    if (h>0) h++;
    return [p,h]
}
function annule2recul(p,h,k) {
    if (p>0) p=p-1;
    if (p>0) p=p-1;
    return [p,h,k];
}
function annule2touche(p,h,k) {
    if (h>2) h=h-2;
    else h=0;
    return [p,h,k];
}
function annule1touche(p,h,k) {
    if (h>0) h=h-1;
    return [p,h,k];
}
function transformetoucherecul(p,h,k) {
    return [p+h,0,k];
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
function attaque(dices,mod,group1,group2,feinte) {
    let pr=distribution(dices,group1,feinte);
    let n=dices.length;
    let res=[];
    let p,h,k,s,i,touche,tue,recul;
    for (i=0;i<=1000;i++) {
        res[i]=0;
    }
    for (p=0; p<=n; p++) 
	for (h=0; h<=n-p; h++)
	    for (k=0; k<=n-h-p; k++) {
                let p2,h2,k2;
                p2=p;k2=k;h2=h;
		i=p+10*h+100*k;
                if (typeof group1.bonusattaque=="function") [p2,h2,k2]=group1.bonusattaque(p2,h2,k2);
                if (typeof mod=="function") {
                    [p2,h2,k2]=mod(p2,h2,k2);
                }
                res[k2*100+h2*10+p2]+=pr[i];
            }
    //for (i=0;i<=n*100;i++) console.log(i+":"+res[i]);
    return res;
}
function compose(res1,res2) {
    let i;
    let res=[];
    for (i=0;i<res1.length+res2.length;i++) res[i]=0;
    for (i=0;i<res1.length;i++)
        for (j=0;j<res2.length;j++) {
            res[i+j]+=res1[i]*res2[j];
            if (res1[i]>1e-6&&res2[j]>1e-6) console.log((i+j)+":"+(res1[i]*res2[j]));
        }
    return res;
}

function blank(dices) {
    let pr=distribution(dices,{},{});
    let n=dices.length;
    let res=[];
    let p,h,k,s,i,b;
    for (i=0;i<=n;i++) res[i]=0;
    for (p=0; p<=n; p++) 
	for (h=0; h<=n-p; h++)
	    for (k=0; k<=n-h-p; k++)
		for (s=0; s<=n-h-p-k; s++) {
		    i=p+10*h+100*k+1000*s;
                    b=n-p-h-k-s;
                    res[b]+=pr[i];
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
    if (group1.terrain=="marais") {
        boucliermalus=true;
    }
    for (h=0;h<=na;h++)
        for (k=0;k<=na-h;k++)
            for (p=0;p<=na-h-k;p++) {
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
    let res={esquive:0,blessure:[1,0,0,0,0,0,0,0,0,0],recul:0,hdc:0,tue:0,inflige:[1,0,0,0,0,0,0,0,0,0],infligetue:0,infligehdc:0};
    if (group1.tir) aa=group1.tir;//(group2);
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
        if (group2.terrain=="forest") {
            parade=true;
        }
        d=bouclier(dd,parade);
        nd=dd.length;
    } else {
        d={bouclier:[1]};
        nd=0;
    }
    let na=aa.length;
    if (na>0) {
        a=attaque(aa,group2.modattaque,group1,group2,group1.feinte);
    } else a=[1];
    let terreur=1;
    let esquive=1;
    let hdcterreur=0;
    let reculterreur=0;
    if (islogged) {
        console.log(group1.nom+" combat "+group2.nom);
    }
    if (group2.esquive) {
        esquive=1-d.esquive;
        //$(".main").append(group2.name+" esquives "+group1.name+":"+(1-esquive));
    }
    res.blessure[0]=0;
    res.inflige[0]=0;
    // Terreur: seulement en melee, et l'attaquant ne doit pas etre grand ni insensible ni immortel
    if (group2.terreur&&group1.melee&&!(group1.grand||group1.noterreur||group1.immortel)&&(typeof group1.terreur=="undefined"||(group1.terreur&&group1.terreur<group2.terreur))) {
        // ni avec une terreur >= que celle du defenseur
        for (i=1;i<=group2.terreur;i++) terreur=terreur*0.5; // Unités terrorisés ? 1/2 par dé terreur
        let aterreur= attaque([group1.melee/*(group2)*/[0]],group2.modattaque,group1,group2,group1.feinte); // Garder un dé d'attaque
        if (na>1) {
            res=combat_a(aterreur,1,d.bouclier,nd,(1-terreur)*esquive,group1,group2,res);
            if (group2.immortel) {
                res.blessure[group2.pdv-1]+=res.tue;
                res.tue=0;
            }
            if (islogged) console.log("terreur tue: "+res.tue+" "+(1-terreur)+" na="+na); 
        } else res.blessure[0]+=(1-terreur)*esquive;
    }
    res.tue=0;
    res=combat_a(a,na,d.bouclier,nd,terreur*esquive,group1,group2,res);
    if (group2.immortel) {
        res.blessure[group2.pdv-1]+=res.tue;
        res.tue=0;
    }
    if (islogged) console.log("sans terreur tue: "+res.tue+" "+(terreur)); 

    //res.recul=res.recul+(1-esquive);
    res.esquive=1-esquive;
    let hasriposte,rispote,haslimited;
    hasriposte=group2.riposte&&group2.riposte(group1);
    riposte=group2.defense;
    haslimited=(group2.terrain=="rock");
    if (islogged) {
        console.log(" dégat sans terreur("+terreur+"):"+(res.blessure[1]-hdcterreur)+" "+res.blessure[2]+" "+res.blessure[3]+" "+res.blessure[4]);
        console.log(" recul sans terreur ("+terreur+"):"+(res.recul[1]-reculterreur)+" "+res.recul[2]+" "+res.recul[3]+" "+res.recul[4]);

        if (hasriposte&&group1.melee&&!group1.noriposte) console.log(group2.nom+" riposte");
    }
    if (!group1.noriposte&&group1.melee) {
        if (hasriposte) {
            ret=0;
            let r=attaque(riposte,(x,y,z)=>[x,y,z],group2,group1/* pas de feinte */);
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
            let pr=distribution(group2.defense,group2/*pas de feinte*/);
            let n=group2.defense.length;
            ret=0;
            console.log("defense length:"+n);
            for (p=0; p<=n; p++) 
	        for (h=0; h<=n-p; h++)
	            for (k=0; k<=n-h-p; k++) {
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
            console.log("res.infligehdc="+res.infligehdc);
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
    const MAX=8;
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
        $("#hex3").append("<div><span class='xtra'>&#10230;</span>esquive "+Math.floor(1000*push)/10+"%</div>");
    b+="<tr><td colspan='2'>"+m+"</td></tr>";
    if (p1[1]>0.01) 
        b+="<tr><td style='text-align:right'>"+(Math.floor(100*p1[0])/100)+" pdv</td><td  style='text-align:left'>"+Math.floor(p1[1]*1000)/10+"%</td></tr>";
    else fin+=emptyline;
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
        perso2.d=perso2.toHTML()[4];
     }
    if (perso1) $("#hex1").html(tableStat(perso1,perso1.a,[perso1.pdv,1],0,0,0,0));
    if (perso2) $("#hex2").html(tableStat(perso2,perso2.d,[perso2.pdv,1],0,0,0,0)); 
    
    if (perso1&&perso2) {
        perso1.a=perso1.toMelee(perso2);
        let c=combat(perso1,perso2,true);
        let b=0;
        let cb=0;
        let ci=0;
        for (i=1;i<MAX;i++) { b+=c.blessure[i]; cb+=c.blessure[i]*i; ci+=c.inflige[i]*i; }
        b+=c.blessure[0];
        drawValues(perso1,perso2,perso1.a,perso2.d,[perso1.pdv-ci,1-c.infligetue-c.infligehdc],[perso2.pdv-cb,b],[1,c.recul],c.infligetue,c.tue,c.infligehdc,c.hdc,c.esquive);
     
    }
}

$( document ).ready(function() {
    troupes=Unite.troupes();

    persolist=troupes.filter((x)=>typeof x.dates!="undefined").sort((a,b)=>(a.text>b.text)).filter(unique);

    dl=new dateline("dl",{
        start:"1297-09-10",
        end:"1475-08",
        url:"top",
        info:(e=>e.info(persolist)),
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
        /*"scrollY":        "300px",*/
        /*scrollCollapse: true,*/
        "paging":         true,
        /*ordering:true,
          order: [[ 3, "asc" ]],*/
        responsive:true,
        "columnDefs": [
            { "width": "20%", "targets": 0 }
        ],
        "columns": [
            {"width": "15%"},
            {"width":"3%"},
            {"width":"3%"},
            {"width":"10%"},
            {"width":"10%"},
            {"width":"3%"},
            {"width":"5%"},
            {"width": "45%"},
        ]
    });

    //var u = touslesduels(troupes.filter((x)=>x.troupe));
    $("#tabletroupes tbody").append(troupes.filter((x)=>x.troupe).join(''));
    $("#tabletroupes").DataTable({
        /*"scrollY":        "300px",*/
        /*"scrollCollapse": true,*/
        "paging":         true,
        /*"ordering":true,*/
        "columnDefs": [
            { "width": "20%", "targets": 0 }
        ],
        responsive:true,
        "columns": [
            {"width": "15%"},
            {"width":"3%"},
            {"width":"3%"},
            {"width":"10%"},
            {"width":"10%"},
            {"width":"3%"},
            {"width":"5%"},
            {"width": "40%"},
        ]
    });

});
