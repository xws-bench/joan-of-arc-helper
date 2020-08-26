const BIEN=0,MAL=1,FRANCAIS=2,ECOSSAIS=3,OTTOMAN=4,ANGLAIS=5,BOURGUIGNON=6,VALAQUE=7,MERCENAIRE=8,AUTRE=9,LITUANIEN=10,POLONAIS=11,TEUTONIQUE=12,MAX=13;
const INFANTERIE=0,CAVALERIE=1,VOLANT=2,ARTILLERIE=3,MAXTYPE=4;
const TENDU=0,CLOCHE=1,MELEE=2,AUCUN=3;
const AA=0;
const NOM_FACTION=["bien","mal","francais","ecossais","ottoman","anglais","bourguignon","valaque","mercenaire","neutre","lituanien","polonais","teutonique"];
const NOM_TYPE=["infanterie","cavalerie","volant","artillerie"];
const NOM_CAPACITE=["cette unité n'est pas affectée par les effets de terrain","ignifugé",null,null,null,null,null,null,null,null,null,null,"grand","gigantesque","soin","soin <span class='bien combat-cond'></span>","cruel","relance","garde du corps","bouclier","pourfendeur","charge",null,"prière",null,null,"esquive",null,null,"charisme","ralliement","impétueux","survie","génie",null,"immortel","mercenaire","visée","masse","cohésion","transport",null,"immunisé aux ripostes",null,"immunisé à la terreur",null,null,null,null,"légendaire","<span class='melee combat'></span>: -1 <span class='deblanc'></span><span class='defense combat-cond'></span>"];
const NOM_CAPACITE_EN=["this unit is not affected by hex effects","fireproof",null,null,null,null,null,null,null,null,null,null,"big","gigantic","heal","heal </span> <span class='hereandthere combat-cond'></span>","ruthless","reroll","bodyguard","shield","slayer","charge",null,"prayer",null,null,"dodge",null,null,"charisma","rally","impetuous","survival","engineer",null,"immortal","mercenary","targeting","support","cohesion","carrier",null,"immune to retaliation",null,"immune to terror",null,null,null,null,"legendary","<span class='melee combat'></span>: -1 <span class='deblanc'></span><span class='defense combat-cond'></span>"];
const B1=1,B2=2,B3=3;
const LISTE_CAPACITES=["noterrain","ignifuge","tir","melee","type","faction","typetir","portee","defense","pdv","maj","commandement","grand","gigantesque","soin","soinbienthere","cruel","relance","gardeducorps","shield","pourfendeur","charge","celerite","priere","riposte","terreur","esquive","saut","feinte","charisme","ralliement","impetueux","survie","genie","parade","immortel","mercenaire","visee","masse","cohesion","transport","recultue","noriposte","contrecoup","noterreur","modattaque","source","dates","civil","legendaire","enleve1d"];

const APO=0,CORE=1,CRA=2,DRA=3,HEL=4,LEG=5,OTT=6,REL=7,SE=8,SIE=9,SIQ=10,TEU=11,VIL=12;
const NOM_BOITE=["Apo.","Core","Cravant","Dragon","Hell","Legend.","Ottoman","Reliq.","Super Excl.","Siege","Siege Ext.","Teuton.","Village"];
const IMAGE_BOITE=["Apocalypse",null,null,"Dragon","Hell","Legendary",null,null,null,"Siege",null,"Chevaliers_teutoniques","Village"];
const blancsimal=(d,a)=>(a.faction==MAL?d.concat([blanc]):d);
const rougesiinfanterie=(d,a)=>(a.type==INFANTERIE?d.concat([rouge]):d);
const rougesicharge=(d,a)=>(d); // TODO: rouge si charge
const blancsiinfanterie=(d,a)=>(a.type==INFANTERIE?d.concat([blanc]):d);
const blancsicavalerie=(d,a)=>(a.type==CAVALERIE?d.concat([blanc]):d);
const blanctouchesicavalerie=(d,a)=>(a.type==CAVALERIE?[blanc_blanctouche]:d);
const sicavalerie=(a)=>(a.type==CAVALERIE?true:false);
const siinfanterie=(a)=>(a.type==INFANTERIE?true:false);
const ftrue=()=>true;
const PERSONNAGE=0,CHEVALERIE_M=1,CHEVALERIE=2,HAST=3,MILICE=4,ARME=5,MUSICIEN=6,ETENDARD=7,ARBA=8,ARCHERS=9,SOUTIEN=10,CAVAL=11,PAYSANS=12,CANON=13,PIQUIERS=14,PAVOISIERS=15,BOMBARDE=16,TOURDESIEGE=17,FANTASSINS=18,PAVOIS=19,BELIER=20,SAPEURS=21,CIVIL=22,DEVOTS=23,INFANTERIEELITE=24,CHIENS=25,HERETIQUE=27,VOLANTS=28,SQUELETTES=29,DEMONS=30,ARCHERS_M=31,MERCEN=32,APOCALYPSE=33;
const LISTE_CATEGORIES=["Personnages","Chevaliers montés","Chevaliers à pied","Armes d'Hast","Milice","Gens d'armes","Bannière/Musicien","Etendard","Arbalétriers","Archers","Soutien","Cavaliers","Paysans","Canons","Piquiers","Pavoisiers","Pièce d'artillerie","Engins de siège","Fantassins","Pavois","Bélier","Sapeurs","Civils","Dévôts","Infanterie d'élite","Chiens","XXX","Hérétiques","Volants","Squelettes","Démons","Archers montés","Mercenaires","Apocalypse"];
const LISTE_CATEGORIES_EN=["Characters","Mounted Knights","Knights","Hast","Militia","Men-at-arms","Standard Bearer/Musician","Standard Bearer","Crossbowmen","Bowmen","Support","Cavalery","Peasans","Cannons","Pikemen","Pavisiers","Artillery","Siege weapons","Infantry","Pavise shield","Battering Ram","Sappers","Civilians","Devotees","Elite Infantry","Dogs","XXX","Heretics","Flying","Skeletons","Demons","Mounted Bowmen","Mercenaries","Apocalypse"];
const LISTE_ARMEES=[
    {id:"f",group:true,blason:FRANCAIS,ftext:"Armée française",etext:"French Army"},
    {id:"a",group:true,blason:ANGLAIS,ftext:"Armée anglaise",etext:"English Army"},
     {id:"b",group:true,blason:BIEN,ftext:"Armée du Bien",etext:"Holy Army"},
    {id:"m",group:true,blason:MAL,ftext:"Armée du mal",etext:"Unholy Army"},
    {parent:"f",id:"f1",blason:FRANCAIS,ftext:"Début de Guerre (1ère moitié)",etext:"Beginning of War (First half)"},
    {parent:"f",id:"f2",blason:FRANCAIS,ftext:"Levée du Peuple (1ère moitié)",etext:"Crowd Rise (First half)"},
    {parent:"f",id:"f3",blason:FRANCAIS,ftext:"Fin de Guerre (2ème moitié)",etext:"End of War (Second half)"},
    {parent:"a",id:"a1",blason:ANGLAIS,ftext:"Début de Guerre (1ère moitié)",etext:"Beginning of War (First half)"},
    {parent:"a",id:"a2",blason:ANGLAIS,ftext:"Pillards d'entre deux Guerres (1ère moitié)",etext:"Looters between two Wars (First half)"},
    {parent:"a",id:"a3",blason:ANGLAIS,ftext:"Fin de Guerre (2ème moitié)",etext:"End of War (Second half)"},
    {parent:"b",id:"b1",blason:BIEN,ftext:"Alliés fantastiques",etext:"Fantastic Allies"},
    {parent:"b",id:"b2",blason:BIEN,ftext:"Martyr de Dieu (1ère moitié)",etext:"God's Martyr (First half)"},
    {parent:"b",id:"b3",blason:BIEN,ftext:"Cohorte angélique",etext:"Angelic Cohort"},
    {parent:"m",id:"m1",blason:MAL,ftext:"Pillards sans foi",etext:"Faithless Looters"},
    {parent:"m",id:"m2",blason:MAL,ftext:"Destructeurs de monde",etext:"World Enders"},
    {parent:"m",id:"m3",blason:MAL,ftext:"Sauvagerie bestiale",etext:"Bestial Savagery"},
    {id:"B1",blason:BOURGUIGNON,ftext:"Armée bourguignonne",etext:"Burgundian Army"},
    {id:"e1",blason:ECOSSAIS,ftext:"Armée écossaise",etext:"Scottish Army"},
    {id:"o1",blason:OTTOMAN,ftext:"Armée ottomane",etext:"Ottoman Army"},
    {noselect:true,id:"pb",blason:BIEN,ftext:"Armée du Bien",etext:"Holy Army"},
    {noselect:true,id:"pm",blason:MAL,ftext:"Armée du Mal",etext:"Unholy Army"},
    {noselect:true,id:"s1",blason:AUTRE,ftext:"Armée de siège",etext:"Siege: Attacker's Army"},
    {noselect:true,id:"s2",blason:AUTRE,ftext:"Armée d'assiégé",etext:"Siege: Defender's Army"},
];

function feintesichamp() {
    if (this.terrain=="ble") return true;
    return false;
}
function doublereculsiforet(p,h,k,type) {
    if (this.terrain=="forest"&&type==MELEE) p=p+1;// Seulement un recul
    return [p,h,k];
}
function untouchetue(p,h,k,type) {
    if (h>0) { k=k+1; h=h-1; }
    return [p,h,k];
}
function recultouchesiplaine(p,h,k,type) {
    if (this.terrain=="plain") { h=h+p; p=0; }
    return [p,h,k];
}
function touchetuerecul(p,h,k) {
    return [p+h+k,0,0];
}
function annule1recul(p,h,k) {
    if (p>0) p=p-1;
    return [p,h,k];
}
function annuletoutrecul(p,h,k) {
    return [0,h,k];
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

class De extends Array { 
    toHTML() {
        return "<span class='de"+this.couleur+"'></span>";
    }
    toAttack() {
        return Math.round((this[2]*1000)+(this[1]*100)+(this[0]*10));
    }
    toDefense() {
        return Math.round(this[3]*100);
    }
    capacite() {
        return null;
    }
}

let jaune = new De(2/6,1/6,0,1/6); // recule, touche, tue, bouclier
let jaune_blanctouche = new De(2/6,3/6,0,1/6);
let jaune_boucliertouche = new De(2/6,2/6,0,0);
let jaune_blanctue = new De(1/3,1/6,1/3,1/6);
let jaune_relance = new De(14/36,7/36,0,1/36);
let jaune_blancrecule = new De(2/3,1/6,0,1/6);
let jaune_blancbouclier = new De(2/6,1/6,0,1/2);
let jaune_bouclierrecule = new De(3/6,1/6,0,0);

let rouge = new De(1/6,2/6,2/6,1/6);
let rouge_recultouche = new De(0,1/2,2/6,1/6);
let rouge_toucherecule=new De(3/6,0,2/6,1/6);
let rouge_bouclierrelance = new De(7/36,14/36,14/36,1/36);
let rouge_bouclierrecule = new De(2/6,2/6,2/6,0);

let noir = new De(0,2/6,1/6,3/6);
let noir_toucherecule = new De(2/6,0,1/6,3/6);
let noir_bouclierrecule = new De(1/2,2/6,1/6,0);
let noir_boucliertouche = new De(0,5/6,1/6,0);
let noir_tuebouclier = new De(0,2/6,0,4/6);

let blanc = new De(1/6,2/6,0,2/6);
let blanc_blancbouclier = new De(1/6,2/6,0,3/6);
let blanc_bouclierrecule = new De(1/2,2/6,0,0);
let blanc_blanctouche=new De(1/6,1/2,0,2/6);
let blanc_blanctue=new De(1/6,2/6,1/6,2/6);
let blanc_parade=new De(4/36,2/9,0,20/36);

let violet = new De(1/6,2/6,1/6,2/6); // recule, touche, tue, pietinne
let violet_recultue=new De(0,3/6,1/6,2/6);

let unbouclier=new De(0,0,0,1);
let untue=new De(0,0,1,0);
let unrecul=new De(1,0,0,0);
let unblanc=new De(0,0,0,0);
let untouche=new De(0,1,0,0);

jaune.couleur=jaune_blanctouche.couleur
    =jaune_boucliertouche.couleur
    =jaune_blanctue.couleur
    =jaune_relance.couleur
    =jaune_blancrecule.couleur
    =jaune_bouclierrecule.couleur
    =jaune_blancbouclier.couleur
    ="jaune"; 
rouge.couleur=rouge_recultouche.couleur
    =rouge_toucherecule.couleur
    =rouge_bouclierrelance.couleur
    =rouge_bouclierrecule.couleur
    ="rouge";
noir.couleur=noir_toucherecule.couleur
    =noir_bouclierrecule.couleur
    =noir_boucliertouche.couleur
    =noir_tuebouclier.couleur
    ="noir";
blanc.couleur=blanc_blancbouclier.couleur
    =blanc_bouclierrecule.couleur
    =blanc_blanctouche.couleur
    =blanc_blanctue.couleur
    =blanc_parade.couleur
    ="blanc";
violet.couleur=violet_recultue.couleur
    ="violet";

let bouclierrecule=function (t) { return "<span class='combat "+t+"'></span> : <span class='bouclier face"+this.couleur+"'></span>&rarr;<span class='recul'></span>"; }
let boucliertouche=function (t) { return "<span class='combat "+t+"'></span> : <span class='bouclier face"+this.couleur+"'></span>&rarr;<span class='touche'></span>"; }
let blanctouche=function(t) { return "<span class='combat "+t+"'></span> : <span class='vierge face"+this.couleur+"'></span>&rarr;<span class='touche'></span>";}
let blanctue=function(t) { return "<span class='combat "+t+"'></span> : <span class='vierge face"+this.couleur+"'></span>&rarr;<span class='tue'></span>";}
let blancrecule=function(t) { return "<span class='combat "+t+"'></span> : <span class='vierge face"+this.couleur+"'></span>&rarr;<span class='recul'></span>"; }
let blancbouclier=function(t) { return "<span class='combat "+t+"'></span> : <span class='vierge face"+this.couleur+"'></span>&rarr;<span class='bouclier'></span>"; }
let tuebouclier=function(t) { return "<span class='combat "+t+"'></span> : <span class='tue face"+this.couleur+"'></span>&rarr;<span class='bouclier'></span>"; }
let recultouche=function(t) { return "<span class='combat "+t+"'></span> : <span class='recul face"+this.couleur+"'></span>&rarr;<span class='touche'></span>";}
let recultue=function(t) { return "<span class='combat "+t+"'></span> : <span class='recul face"+this.couleur+"'></span>&rarr;<span class='tue'></span>";}
let toucherecule=function(t) { return "<span class='combat "+t+"'></span> : <span class='touche face"+this.couleur+"'></span>&rarr;<span class='recul'></span>";}

/* Capacités Speciales */
violet_recultue.capacite=recultue;
jaune_blanctouche.capacite=blanctouche;
jaune_boucliertouche.capacite=boucliertouche;
jaune_blanctue.capacite=blanctue;
jaune_blancbouclier.capacite=blancbouclier;
jaune_relance.capacite=(()=>"relancer <span class='vierge facejaune'></span>");
jaune_blancrecule.capacite=blancrecule;
jaune_bouclierrecule.capacite=bouclierrecule;
rouge_recultouche.capacite=recultouche;
rouge_toucherecule.capacite=toucherecule;
rouge_bouclierrelance.capacite=((t)=>"<span class='combat "+t+"'></span> : <span class='fr'>relancer tous les</span><span class='en'>reroll all</span> <span class='bouclier facerouge'></span>");
rouge_bouclierrecule.capacite=bouclierrecule;
noir_toucherecule.capacite=toucherecule;
noir_bouclierrecule.capacite=bouclierrecule;
noir_boucliertouche.capacite=boucliertouche;
noir_tuebouclier.capacite=tuebouclier;
blanc_blancbouclier.capacite=blancbouclier;
blanc_bouclierrecule.capacite=bouclierrecule;
blanc_blanctouche.capacite=blanctouche;
blanc_blanctue.capacite=blanctue;
/* TODO:pas utilisé*/
blanc_parade.capacite=(()=>"<span class='fr'>parade</span><span class='en'>parry</span> <span class='faceblanc'></span>");

/* bonusmelee: blancsimal,rougesiinfanterie,rougesicharge,blancsiinfanterie,blancsicavalerie,blanctouchesicavalerie, riposte et contrecoup: sicavalerie, siinfanterie ou ftrue.  */


