const BIEN=0,MAL=1,FRANCAIS=2,ECOSSAIS=3,OTTOMAN=4,ANGLAIS=5,BOURGUIGNON=6,VALAQUE=7,MERCENAIRE=8,AUTRE=9,LITUANIEN=10,POLONAIS=11,TEUTONIQUE=12,MAX=13;
const INFANTERIE=0,CAVALERIE=1,VOLANT=2,ARTILLERIE=3,MAXTYPE=4;
const TENDU=0,CLOCHE=1,MELEE=2,AUCUN=3;
const AA=0;
const NOM_FACTION=["bien","mal","francais","ecossais","ottoman","anglais","bourguignon","valaque","mercenaire","neutre","lituanien","polonais","teutonique"];
const NOM_TYPE=["infanterie","cavalerie","volant","artillerie"];
const NOM_CAPACITE=["cette unité n'est pas affectée par les effets de terrain","ignifugé",null,null,null,null,null,null,null,null,null,null,"grand","soin","soin </span> <span class='hereandthere combat-cond'></span>","cruel","relance","garde du corps","pourfendeur","charge",null,"prière",null,null,"esquive",null,null,"charisme","ralliement","impétueux","survie","génie",null,"immortel","mercenaire","visée","masse","cohésion","transport",null,"immunisé aux ripostes",null,"immunisé à la terreur",null,null,null,null,"légendaire","<span class='melee combat'></span>: -1 <span class='deblanc'></span><span class='defense combat-cond'></span>"];
const B1=1,B2=2,B3=3;
const LISTE_CAPACITES=["noterrain","ignifuge","tir","melee","type","faction","typetir","portee","defense","pdv","maj","commandement","grand","soin","soinbienthere","cruel","relance","gardeducorps","pourfendeur","charge","celerite","priere","riposte","terreur","esquive","saut","feinte","charisme","ralliement","impetueux","survie","genie","parade","immortel","mercenaire","visee","masse","cohesion","transport","recultue","noriposte","contrecoup","noterreur","modattaque","source","dates","civil","legendaire","enleve1d"];
/* bonusmelee: blancsimal,rougesiinfanterie,blancsiinfanterie,blancsicavalerie,blanctouchesicavalerie, riposte et contrecoup: sicavalerie ou ftrue.  */

const blancsimal=(d,a)=>(a.faction==MAL?d.concat([blanc]):d);
const rougesiinfanterie=(d,a)=>(a.type==INFANTERIE?d.concat([rouge]):d);
const rougesicharge=(d,a)=>(d); // TODO: rouge si charge
const blancsiinfanterie=(d,a)=>(a.type==INFANTERIE?d.concat([blanc]):d);
const blancsicavalerie=(d,a)=>(a.type==CAVALERIE?d.concat([blanc]):d);
const blanctouchesicavalerie=(d,a)=>(a.type==CAVALERIE?[blanc_blanctouche]:d);
const sicavalerie=(a)=>(a.type==CAVALERIE?true:false);
const siinfanterie=(a)=>(a.type==INFANTERIE?true:false);
const ftrue=()=>true;
const PERSONNAGE=0,CHEVALERIE_M=1,CHEVALERIE=2,HAST=3,MILICE=4,ARME=5,MUSICIEN=6,ETENDARD=7,ARBA=8,ARCHERS=9,SOUTIEN=10,CAVAL=11,PAYSANS=12,CANON=13,PIQUIERS=14,PAVOISIERS=15,BOMBARDE=16,TOURDESIEGE=17,FANTASSINS=18,PAVOIS=19,BELIER=20,SAPEURS=21,CIVIL=22,DEVOTS=23,INFANTERIEELITE=24,CHIENS=25,CHEVALERIEMONTEE=26,HERETIQUE=27,VOLANTS=28,SQUELETTES=29,DEMONS=30,ARCHERS_M=31;
const LISTE_CATEGORIES=["Personnages","Chevaliers montés","Chevaliers à pied","Armes d'Hast","Milice","Gens d'armes","Bannière/Musicien","Etendard","Arbalétriers","Archers","Soutien","Cavaliers","Paysans","Canons","Piquiers","Pavoisiers","Pièce d'artillerie","Engins de siège","Fantassins","Pavois","Bélier","Sapeurs","Civils","Dévôts","Infanterie d'élite","Chiens","Chevaliers montés","Hérétiques","Volants","Squelettes","Démons","Archers montés"];
const LISTE_ARMEES=[
    {id:"_",blason:-1,text:"Aucune liste"}, 
    {id:"f1",blason:FRANCAIS,text:"Début de Guerre (1ère moitié)"},
    {id:"f2",blason:FRANCAIS,text:"Levée du Peuple (1ère moitié)"},
    {id:"f3",blason:FRANCAIS,text:"Fin de Guerre (2ème moitié)"},
    {id:"a1",blason:ANGLAIS,text:"Début de Guerre (1ère moitié)"},
    {id:"a2",blason:ANGLAIS,text:"Pillards d'entre deux Guerres (1ère moitié)"},
    {id:"a3",blason:ANGLAIS,text:"Fin de Guerre (2ème moitié)"},
    {id:"b1",blason:BIEN,text:"Alliés fantastiques"},
    {id:"b2",blason:BIEN,text:"Martyr de Dieu (1ère moitié)"},
    {id:"b3",blason:BIEN,text:"Cohorte angélique"},
    {id:"m1",blason:MAL,text:"Pillards sans foi"},
    {id:"m2",blason:MAL,text:"Destructeurs de monde"},
    {id:"m3",blason:MAL,text:"Sauvagerie bestiale"},
    {id:"s1",blason:AUTRE,text:"Armée de siège"},
    {id:"s2",blason:AUTRE,text:"Armée d'assiégé"},
    {id:"e1",blason:ECOSSAIS,text:"Armée écossaise"},
    {id:"o1",blason:OTTOMAN,text:"Armée ottomane"},
    {id:"pb",blason:BIEN,text:"Armée du Bien"},
    {id:"pm",blason:MAL,text:"Armée du Mal"}];

function uniquecapa(value, index, self) { 
    return index==self.length-1||self[index]!=self[index+1];
}
function feintesichamp() {
    if (this.terrain=="ble"||this.terrain=="plain") return true;
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

let bouclierrecule=function (t) { return "<span class='combat "+t+"'></span> : <span class='bouclier face"+this.couleur+"'></span>&rarr;<span class='recul face"+this.couleur+"'></span>"; }
let boucliertouche=function (t) { return "<span class='combat "+t+"'></span> : <span class='bouclier face"+this.couleur+"'></span>&rarr;<span class='touche face"+this.couleur+"'></span>"; }
let blanctouche=function(t) { return "<span class='combat "+t+"'></span> : <span class='vierge face"+this.couleur+"'></span>&rarr;<span class='touche face"+this.couleur+"'></span>";}
let blanctue=function(t) { return "<span class='combat "+t+"'></span> : <span class='vierge face"+this.couleur+"'></span>&rarr;<span class='tue face"+this.couleur+"'></span>";}
let blancrecule=function(t) { return "<span class='combat "+t+"'></span> : <span class='vierge face"+this.couleur+"'></span>&rarr;<span class='recul face"+this.couleur+"'></span>"; }
let blancbouclier=function(t) { return "<span class='combat "+t+"'></span> : <span class='vierge face"+this.couleur+"'></span>&rarr;<span class='bouclier face"+this.couleur+"'></span>"; }
let tuebouclier=function(t) { return "<span class='combat "+t+"'></span> : <span class='tue face"+this.couleur+"'></span>&rarr;<span class='bouclier face"+this.couleur+"'></span>"; }
let recultouche=function(t) { return "<span class='combat "+t+"'></span> : <span class='recul face"+this.couleur+"'></span>&rarr;<span class='touche face"+this.couleur+"'></span>";}
let toucherecule=function(t) { return "<span class='combat "+t+"'></span> : <span class='touche face"+this.couleur+"'></span>&rarr;<span class='recul face"+this.couleur+"'></span>";}

/* Capacités Speciales */
rouge.capacite=noir.capacite=blanc.capacite=jaune.capacite=(() => null);
jaune_blanctouche.capacite=blanctouche;
jaune_boucliertouche.capacite=boucliertouche;
jaune_blanctue.capacite=blanctue;
jaune_blancbouclier.capacite=blancbouclier;
jaune_relance.capacite=(()=>"relancer <span class='vierge facejaune'></span>");
jaune_blancrecule.capacite=blancrecule;
jaune_bouclierrecule.capacite=bouclierrecule;
rouge_recultouche.capacite=recultouche;
rouge_toucherecule.capacite=toucherecule;
rouge_bouclierrelance.capacite=((t)=>"<span class='combat "+t+"'></span> : relancer <span class='bouclier facerouge'></span>");
rouge_bouclierrecule.capacite=bouclierrecule;
noir_toucherecule.capacite=toucherecule;
noir_bouclierrecule.capacite=bouclierrecule;
noir_boucliertouche.capacite=boucliertouche;
noir_tuebouclier.capacite=tuebouclier;
blanc_blancbouclier.capacite=blancbouclier;
blanc_bouclierrecule.capacite=bouclierrecule;
blanc_blanctouche.capacite=blanctouche;
blanc_blanctue.capacite=blanctue;
blanc_parade.capacite=(()=>"parade <span class='faceblanc'></span>");

/* bonusmelee: blancsimal,rougesiinfanterie,rougesicharge,blancsiinfanterie,blancsicavalerie,blanctouchesicavalerie, riposte et contrecoup: sicavalerie, siinfanterie ou ftrue.  */



class Unite {
    static tps() { return [
        {nom:"Chariot de guerre",png:true,pdv:5,type:ARTILLERIE,grand:true,tir:[rouge,blanc,blanc],portee:1,typetir:TENDU,defense:[noir,noir],desc:"%DEFENSE%: %TOUCHE%%HERE%, %TUE%%HERE% peuvent être alloués à %THIS%%BR%%THIS% ne peut pas subir de résultats %RECUL%%BR%Pour effectuer un déplacement, %THIS% utilise l'action de %INFANTERIE%%HERE% en plus de la sienne",v15:true},
        {nom:"Sergents Teutoniques",png:true,faction:TEUTONIQUE,type:INFANTERIE,melee:[rouge],riposte:ftrue,defense:[noir,blanc],v15:true},
        {nom:"Chevaliers Teutoniques",png:true,faction:TEUTONIQUE,type:INFANTERIE,melee:[rouge,noir],charge:true,impetueux:true,priere:true,defense:[noir_tuebouclier],v15:true},
        {nom:"Chevaliers Teutoniques Montés",png:true,faction:TEUTONIQUE,type:CAVALERIE,melee:[rouge,noir],charge:true,impetueux:true,priere:true,defense:[noir],bonusmelee:blancsiinfanterie,v15:true},
        {nom:"Cavaliers Polonais",png:true,faction:POLONAIS,type:CAVALERIE,melee:[rouge,blanc],charge:true,defense:[blanc],bonusmelee:rougesicharge,v15:true},
        {nom:"Cavalerie lourde Lituanienne",png:true,faction:LITUANIEN,type:CAVALERIE,melee:[rouge,rouge],charge:true,feinte:ftrue,defense:[noir,blanc],modattaque:annule1recul,v15:true},
        {nom:"Archers Tatars",png:true,type:CAVALERIE,tir:[noir,jaune],portee:1,typetir:TENDU,defense:[blanc],v15:true},
        {nom:"Arbalétriers montés",png:true,type:CAVALERIE,tir:[rouge,jaune],portee:1,typetir:TENDU,defense:[blanc],celerite:2,bonusattaque:recultouchesiplaine,v15:true},
        {nom:"Lanciers montés",png:true,melee:[jaune,jaune,jaune],celerite:2,esquive:true,type:CAVALERIE,defense:[jaune],v15:true},
        {nom:"Piquiers avec pavois",png:true,melee:[blanc_bouclierrecule],masse:true,type:INFANTERIE,defense:[noir],riposte:sicavalerie,v15:true},
        {nom:"Fantassins d'infanterie légère",png:true,melee:[blanc,jaune],type:INFANTERIE,defense:[jaune],v15:true,riposte:siinfanterie,parade:siinfanterie},
        {nom:"Coureurs des bois",png:true,faction:LITUANIEN,melee:[jaune],/*portee:1,typetir:TENDU,tir:[jaune,jaune],*/type:INFANTERIE,defense:[jaune],esquive:true,celerite:2,v15:true,bonusattaque:doublereculsiforet},
        {nom:"Adeptes",m2:[80,1,FANTASSINS,0,0,1,0],pdf:true,melee:[rouge],defense:[noir],type:INFANTERIE,faction:MAL,desc:"quand ils sont dans une zone de marais, %THIS% ignorent les effets de terrain liés aux marais et peuvent réaliser un mouvement vers n'importe quelle autre zone de marais du plateau de jeu"},
        {nom:"Almogavres",f2:[65,1,HAST,0,5],f3:[70,1,HAST,2,6],a2:[65,1,HAST,2,6],a3:[65,1,HAST,0,5],pdf:true,melee:[blanc],defense:[jaune],type:INFANTERIE,esquive:true,noriposte:true,cout:65},
        {nom:"Ange",b2:[230,4,VOLANTS,0,0,0,2],b3:[230,4,VOLANTS,0,0,2,2],pdf:true,melee:[rouge,blanc],bonusmelee:blancsimal,defense:[noir,noir],type:VOLANT,faction:BIEN,saut:2,transport:true,faction:BIEN,priere:true}, 
        {nom:"Ange destructeur",b3:[220,3,VOLANTS,0,0,0,2],tir:[rouge,noir],defense:[noir,noir],type:VOLANT,faction:BIEN,genie:true,faction:BIEN,typetir:TENDU,portee:3,desc:"%MELEE%: %BOUCLIER%, élément de terrain%HERE% &rarr; +1 %DETRUIT%"}, /*TODO: pas tout a fait ca: en attaque sur un element de terrain */
        {nom:"Arbalétriers Génois",pdf:true,prenom:"Retranchés",typetir:TENDU,portee:1,tir:[rouge,blanc],defense:[noir,blanc],type:INFANTERIE,recultue:true,desc:"%THIS% ne peut pas se déplacer"},
        {nom:"Arbalétriers Génois",f1:[80,1,ARBA,0,4],pdf:true,typetir:TENDU,portee:1,tir:[rouge],defense:[noir],type:INFANTERIE,cout:80,desc:"%ACTIVATED%: en fin ou début d'activation, %THIS% peut être remplacée par les Arbalétriers Génois retranchés"},
        {nom:"Arbalétriers",b2:[80,1,ARBA,0,0,0,3],f1:[75,1,ARBA,0,4],f3:[80,1,ARBA,0,0,0,4],pdf:true,typetir:TENDU,portee:1,tir:[rouge_bouclierrelance],defense:[blanc],type:INFANTERIE,cout:80},
        {nom:"Archers Arc Court",b1:[140,1,ARCHERS,0,0,0,4],f2:[125,1,ARCHERS,2,5],pdf:true,tir:[noir, noir],defense:[blanc],type:INFANTERIE,typetir:TENDU,portee:1,desc:"pendant le tour adverse %ROUNDCOND%: +1 %TIRTENDU%",cout:125},
        {nom:"Archers Azab",o1:[100,2,ARCHERS,0,6],pdf:true,tir:[jaune,jaune],defense:[jaune],faction:OTTOMAN,type:INFANTERIE,typetir:TENDU,portee:1,esquive:true,celerite:2,desc:"%ACTIVATED%: %THIS% peut placer 1 haie de pieux issue de la réserve sur une frontière libre de sa zone"},
        {nom:"Archers bourguignons",typetir:TENDU,portee:1,tir:[noir,noir],defense:[blanc],type:INFANTERIE,masse:true,desc:"%TOURCOND%: %MOVEENNEMI%%THERE% &rarr; +1 %TIRTENDU%"},
        {nom:"Archers",prenom:"derrière les pieux",tir:[jaune_boucliertouche,jaune_boucliertouche],defense:[blanc,blanc],type:INFANTERIE,typetir:CLOCHE,portee:2},
        {nom:"Archers montés",a1:[130,1,CAVAL,0,3],a2:[125,1,CAVAL,2,4],a3:[135,1,CAVAL,0,0,0,3],pdf:true,tir:[blanc,blanc],typetir:CLOCHE,portee:2,defense:[noir],type:CAVALERIE,celerite:2, cout:130},
        {nom:"Archers",e1:[140,1,ARCHERS,2,4],a1:[125,1,ARCHERS,0,0,3,3],a2:[115,1,ARCHERS,0,0,2,2],a3:[135,1,ARCHERS,0,0,4,4],pdf:true,tir:[jaune_boucliertouche,jaune_boucliertouche],defense:[blanc],type:INFANTERIE,typetir:CLOCHE,portee:2,desc:"%ACTIVATED%: %THIS% peut placer 1 haie de pieux issue de la réserve sur une frontière libre de sa zone",cout:125},
        {nom:"Bourreau",b2:[55,1,DEVOTS,0,0,0,1],b3:[55,3,CIVIL,0,0,0,1],pdf:true,melee:[jaune_blanctue],defense:[blanc],type:INFANTERIE,desc:"%MELEE%, activé par commandement: +1 <span class='derouge'></span>"},
        {nom:"Cavalerie Légère",a1:[120,1,CAVAL,0,3],a2:[115,1,CAVAL,2,4],melee:[blanc],defense:[jaune],type:CAVALERIE,celerite:3,esquive:true,desc:"%POURSUITE%%TOURCOND%: +1 %MELEE%",cout:120},
        {nom:"Cavaliers Archers",o1:[120,2,ARCHERS_M,0,0,0,3],tir:[jaune,jaune],defense:[blanc],faction:OTTOMAN,type:CAVALERIE,celerite:2,esquive:true,typetir:TENDU,portee:1},
        {nom:"Cavaliers damnés",m2:[250,4,CAVAL,0,0,0,2],melee:[rouge,rouge],defense:[noir,rouge],faction:MAL,type:CAVALERIE,saut:2,riposte:ftrue,charge:true,modattaque:annule1recul},
        {nom:"Cavaliers Nobles",o1:[190,3,CAVAL,0,0,0,4],pdf:true,type:CAVALERIE,melee:[rouge,blanc],defense:[blanc,rouge],faction:OTTOMAN,riposte:ftrue,charge:true,desc:"%DEFENSE%: <span class='recul'></span> &rarr; %CHOOSERECUL%"},
        {nom:"Cavaliers Sipahi",o1:[140,2,CAVAL,0,0,0,4],pdf:true,type:CAVALERIE,melee:[blanc_blanctue],defense:[blanc],faction:OTTOMAN,type:INFANTERIE,esquive:true,celerite:2,charge:true},
        {nom:"Chevaliers Impétueux",f1:[160,2,CHEVALERIE,0,4],pdf:true,melee:[rouge,rouge],defense:[noir],riposte:ftrue,type:INFANTERIE,impetueux:true,modattaque:annule1recul},
        {nom:"Chevaliers montés",f1:[135,2,CHEVALERIE_M,2,6],f3:[135,2,CHEVALERIE_M,2,6],a2:[135,2,CHEVALERIEMONTEE,0,0,0,2],pdf:true,prenom:"Petite noblesse",type:CAVALERIE,melee:[rouge_bouclierrecule,noir_bouclierrecule],defense:[noir],charge:true,cout:135,moral:2},
        {nom:"Chevaliers montés",prenom:"Français",f3:[130,2,CHEVALERIE_M,2,6],type:CAVALERIE,melee:[rouge,rouge],defense:[noir],charge:true,faction:FRANCAIS,impetueux:true,cout:130,moral:2},
        {nom:"Chevaliers montés",b2:[145,2,CHEVALERIE_M,0,0,0,4],b1:[145,2,CHEVALERIE_M,0,0,2,2],f1:[130,2,CHEVALERIE_M,2,6],a3:[140,2,CHEVALERIEMONTEE,0,0,0,4],pdf:true,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],charge:true},
        {nom:"Chevaliers à pied",b1:[155,2,CHEVALERIE,0,4],b2:[130,2,CHEVALERIE,2,6],a1:[145,2,CHEVALERIE,0,4],a2:[140,2,CHEVALERIE,0,3],f1:[145,2,CHEVALERIE,0,4],f2:[130,2,CHEVALERIE,0,2],pdf:true,prenom:"Armes à 2 mains",bonusmelee:rougesiinfanterie,melee:[rouge,rouge],defense:[noir],type:INFANTERIE},
        {nom:"Chevaliers à pied",b1:[130,2,CHEVALERIE,0,4],b2:[155,2,CHEVALERIE,2,6],a1:[165,2,CHEVALERIE,0,4],f2:[155,2,CHEVALERIE,0,2],pdf:true,melee:[rouge,rouge],defense:[noir],type:INFANTERIE,modattaque:annule1recul,cout:155,moral:2},
        {nom:"Chevaliers squelettes",m2:[160,2,CAVAL,0,0,0,4],melee:[rouge,blanc],defense:[blanc],type:CAVALERIE,modattaque:annule1recul,charge:true,survie:true,masse:true,faction:MAL},
        {nom:"Chiens de Chasse",a1:[75,1,CHIENS,0,0,0,4],a2:[70,1,CHIENS,0,4],a3:[65,1,CHIENS,2,4],pdf:true,melee:[blanc,jaune],defense:[jaune],type:INFANTERIE,celerite:2},
        {nom:"Chiens de Guerre",m3:[110,1,CHIENS,2,6],a2:[120,1,CHIENS,0,4],a3:[120,1,CHIENS,2,4],pdf:true,melee:[rouge,blanc],defense:[jaune],celerite:2,type:INFANTERIE,gardeducorps:true,cout:120},
        {nom:"Démons Voraces",m1:[125,2,DEMONS,0,0,0,2],m3:[125,2,FANTASSINS,0,0,2,0],pdf:true,melee:[rouge],defense:[blanc_blanctue,blanc_blanctue],contrecoup:ftrue,type:INFANTERIE,faction:MAL},
        {nom:"Démons Volants",m1:[160,2,VOLANTS,0,0,0,3],m3:[160,2,VOLANTS,0,0,0,3],pdf:true,tir:[rouge,jaune],defense:[noir],type:VOLANT,saut:2,immortel:true,typetir:TENDU,portee:1,faction:MAL,desc:"%MELEE%: <span class='vierge facejaune'></span> &rarr; %LEGENDE%"},
        {nom:"Dévoreurs",m3:[135,2,VOLANTS,0,0,0,4],melee:[rouge],tir:[noir],defense:[blanc,jaune],type:VOLANT,transport:true,typetir:TENDU,portee:1,faction:MAL,desc:"%LEGENDE% %TIRTENDU%: <span class='bouclier facenoir'></span> &rarr; <span class='touche facenoir'></span> "},
        {nom:"Dévots",b2:[150,1,DEVOTS,0,0,0,2],melee:[blanc],type:INFANTERIE,genie:true,ralliement:true,faction:BIEN},
        {nom:"Fantômes",m2:[160,1,FANTASSINS,0,0,0,2],pdf:true,type:INFANTERIE,melee:[blanc,blanc,blanc],defense:[blanc,blanc,blanc],noterrain:true,immortel:true,faction:MAL,desc:"%ACTIVATED%%TOURCOND% %LEGENDE%: + %SAUT% 2"},
        {nom:"Flagellants",b2:[70,1,DEVOTS,0,0,1,0],pdf:true,melee:[blanc],defense:[],type:INFANTERIE,survie:true,faction:BIEN,desc:"%MELEE% Pénitents%HERE%: +1 <span class='deblanc'></span>"},
        {nom:"Gargouilles",m3:[90,1,VOLANTS,0,0,0,3],tir:[jaune_blancrecule],defense:[noir],type:VOLANT,celerite:2,typetir:TENDU,portee:2,faction:MAL},
        {nom:"Guisarmiers",a2:[75,1,HAST,2,6],a3:[80,1,HAST,0,5],e1:[75,1,HAST,2,2,0,1],f1:[70,1,HAST,2,5],f2:[75,1,HAST,0,5],f3:[80,1,HAST,2,6],pdf:true,melee:[blanc_blanctouche],defense:[blanc_parade],type:INFANTERIE,parade:ftrue,cohesion:true,cout:75},
        {nom:"Hacquebutiers",s3:[100,1,ARCHERS,0,0,0,2],tir:[jaune_blanctue],defense:[noir],type:INFANTERIE,terreur:1,typetir:TENDU,portee:1,pdf:true},
        {nom:"Hallebardiers",a3:[125,1,HAST,0,5],e1:[130,2,HAST,2,2,0,1],f1:[110,1,HAST,2,5],f2:[130,2,HAST,0,5],f3:[135,1,HAST,2,6],pdf:true,bonusmelee:blancsiinfanterie,melee:[blanc],defense:[rouge,blanc],type:INFANTERIE,riposte:ftrue,moral:2,cout:110},
        {nom:"Hérétiques",m1:[90,1,HERETIQUE,0,0,1,0],pdf:true,melee:[noir,jaune],defense:[jaune],type:INFANTERIE,cout:90,desc:"%MELEE%<span class='niveau2 combat-cond'></span>: <span class='recul'></span> &rarr; <span class='niveau1 combat'></span>%BR%%DEFENSE%: <span class='facejaune vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Infanterie légère",o1:[80,1,FANTASSINS,0,0,2,6],pdf:true,melee:[blanc],defense:[jaune],esquive:true,faction:OTTOMAN,type:INFANTERIE,celerite:2},
        {nom:"Janissaires",o1:[105,1,INFANTERIEELITE,2,4],pdf:true,melee:[noir],defense:[blanc],esquive:true,charge:true,masse:true,faction:OTTOMAN,type:INFANTERIE,desc:"%MELEE% %XP%: <span class='facenoir bouclier'></span> &rarr; <span class='touche facenoir'></span>"},
        {nom:"Loups",m2:[70,1,FANTASSINS,0,0,0,4],m3:[60,1,CHIENS,2,6],pdf:true,melee:[blanc,jaune],defense:[jaune],celerite:2,type:INFANTERIE,esquive:true,faction:MAL},
        {nom:"Milice Bourgeoise",s2:[35,1,MILICE,0,0,2,4],b3:[35,1,MILICE,0,0,3,3],b2:[35,1,MILICE,0,0,0,6],m1:[35,1,MILICE,0,4],a1:[35,1,PIQUIERS,2,6],e1:[40,1,PIQUIERS,2,2,2,2],f1:[35,1,MILICE,0,6],f2:[35,1,MILICE,0,0,3,3],pdf:true,melee:[blanc], defense:[jaune],type:INFANTERIE,cout:35},
        {nom:"Milice Paysanne",f1:[25,1,MILICE,0,6],f2:[25,1,PAYSANS,3,6],pdf:true,melee:[blanc], defense:[],type:INFANTERIE,masse:true,feinte:feintesichamp,cout:25},
        {nom:"Milice d'Archers",s2:[75,1,ARCHERS,0,0,2,2],e1:[70,1,ARCHERS,2,4],f2:[65,1,ARCHERS,2,5],pdf:true,tir:[noir],defense:[jaune],typetir:TENDU,portee:1,type:INFANTERIE,esquive:true,cout:65},
        {nom:"Montreur d'ours",pdf:true,melee:[rouge,jaune,blanc], defense:[noir],type:INFANTERIE,riposte:ftrue,terreur:1,desc:"%POURSUITE% %ROUNDCOND%: +1 %MELEE%"},
        {nom:"Okchu",o1:[85,2,ARCHERS,0,6],pdf:true,tir:[jaune_boucliertouche],defense:[jaune],type:INFANTERIE,faction:OTTOMAN,typetir:CLOCHE,portee:2,celerite:2},
        {nom:"Ours",pdf:true,melee:[rouge,jaune_blancrecule], defense:[noir],riposte:ftrue,type:INFANTERIE,terreur:1, desc:"%POURSUITE% %ROUNDCOND%: +1 %MELEE%"},/* TODO: pas de rouge vierge !! */
        {nom:"Paysans Révoltés",pdf:true,melee:[blanc], defense:[],type:INFANTERIE,masse:true},
        {nom:"Paysans",b3:[20,1,PAYSANS,0,0,0,6],f2:[20,1,PAYSANS,3,6],pdf:true,melee:[jaune], defense:[],type:INFANTERIE,masse:true,desc:"%SPECIAL%: -1 %INCENDIE%%HEREANDTHERE%",cout:20},
        {nom:"Pestiférés",m2:[115,1,FANTASSINS,0,0,2,2],pdf:true,melee:[blanc],defense:[],type:INFANTERIE,masse:true,terreur:2,modattaque:annule1touche},
        {nom:"Piquiers Ecossais",e1:[65,1,PIQUIERS,2,2,2,2],pdf:true,melee:[blanc],defense:[jaune],contrecoup:sicavalerie,type:INFANTERIE,masse:true,faction:ECOSSAIS,cout:65},
        {nom:"Piquiers Flamands",pdf:true,melee:[blanc],defense:[blanc],type:INFANTERIE,riposte:sicavalerie,cohesion:true},
        {nom:"Piquiers",b1:[65,1,PIQUIERS,0,0,3,3],a1:[60,1,PIQUIERS,2,6],a2:[60,1,PIQUIERS,0,0,0,6],a3:[60,1,PIQUIERS,0,0,0,6],pdf:true,bonusmelee:blancsicavalerie,f3:[60,1,PIQUIERS,0,0,0,6],melee:[blanc],type:INFANTERIE,defense:[jaune],riposte:sicavalerie,cout:60},
        {nom:"Pénitents",b2:[75,1,DEVOTS,0,0,1,0],pdf:true,melee:[blanc],defense:[],type:INFANTERIE,faction:BIEN,survie:true,desc:"%ACTIVATED%%TOURCOND% %CARTELEGENDE%: +1 %GRIS%"},
        {nom:"Repentants hérétiques",m1:[180,2,HERETIQUE,0,0,0,3],melee:[blanc,blanc],defense:[noir],charge:true,celerite:2,survie:true,type:INFANTERIE,survie:true,faction:MAL,desc:"%POURSUITE%: +1 %MELEE%"},
        {nom:"Expiateurs hérétiques",m1:[150,2,HERETIQUE,0,0,0,3],melee:[jaune],defense:[noir],genie:true,priere:true,cruel:true,type:INFANTERIE,faction:MAL,desc:"%DEFENSE%: 1 %TOUTTYPE% + %PARADE%%BR%%DEFENSE%: <span class='facejaune vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Sapeurs",s1:[120,1,SAPEURS,0,0,0,3],melee:[blanc],defense:[blanc],genie:true,type:INFANTERIE,pdf:true},
        {nom:"Sergents d'armes",a1:[125,2,ARME,0,0,0,4],a2:[135,2,ARME,0,0,0,4],a3:[150,2,ARME,0,4],pdf:true,prenom:"Gascons & Bretons",melee: [rouge],defense:[noir], riposte:ftrue,type:INFANTERIE,charge:true,impetueux:true,modattaque:annule1recul,cout:125,moral:2},
        {nom:"Sergents d'armes",f2:[135,2,ARME,0,4],e1:[130,2,ARME,0,0,0,3],pdf:true,prenom:"Lourds",melee: [rouge,noir],defense:[noir], riposte:ftrue,type:INFANTERIE,cohesion:true,cout:135,moral:2},
        {nom:"Sergents d'armes montés",a1:[120,1,ARME,0,0,0,4],a2:[115,1,ARME,0,0,0,4],f2:[110,1,CAVAL,0,0,0,6],e1:[110,2,CAVAL,0,0,0,3],type:CAVALERIE,melee:[rouge],defense:[blanc],charge:true,celerite:2,moral:2,cout:110},
        {nom:"Sergents d'armes",e1:[90,1,ARME,0,0,3,3],f1:[90,1,ARME,0,0,0,4],f2:[100,2,ARME,0,4],a3:[140,2,ARME,0,4],pdf:true,melee: [rouge],defense:[rouge], riposte:ftrue,type:INFANTERIE,moral:2,cout:100},
        {nom:"Légion démoniaque",m1:[65,1,DEMONS,0,0,2,1],melee:[blanc],defense:[jaune,jaune],type:INFANTERIE,faction:MAL,cout:65,desc:"%ACTIVATED%%TOURCOND%: %MOVE% %TROUPE%%THERE% dans la zone de %THIS%%BR%%DEFENSE%: <span class='facejaune vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Spectres montés",m2:[200,1,CAVAL,0,0,0,4],melee:[rouge,blanc,blanc,],defense:[noir],type:CAVALERIE,immortel:true,charge:true,esquive:true,faction:MAL,desc:"Quand elle se déplace sur un nouvel hexagone, %THIS% peut se placer sur n'importe quelle zone de l'hexagone"},
        {nom:"Squelettes",m2:[60,1,FANTASSINS,0,0,0,4],pdf:true,prenom:"Danse Macabre",melee:[jaune],defense:[],type:INFANTERIE,immortel:true,faction:MAL,desc:"%MELEE%: Squelettes%HERE% &rarr; +1 <span class='dejaune'></span>"},
        {nom:"Squelettes",m1:[75,1,SQUELETTES,0,4],pdf:true,prenom:"Démoniaques",melee:[jaune],defense:[],charge:true,type:INFANTERIE,masse:true,faction:MAL,modattaque:annule1recul,desc:"%MELEE%: Squelettes%HERE% &rarr; +1 <span class='dejaune'></span>"},
        {nom:"Squelettes",m1:[55,2,SQUELETTES,0,4],m3:[55,1,FANTASSINS,0,0,0,9],pdf:true,melee:[jaune],defense:[],type:INFANTERIE,faction:MAL,modattaque:annule1recul,desc:"%MELEE%: Squelettes%HERE% &rarr; +1 <span class='dejaune'></span>"},
        {nom:"Vougiers",a2:[115,2,HAST,2,6],a3:[120,1,HAST,0,5],f2:[115,2,HAST,0,5],f3:[120,1,HAST,2,6],pdf:true,bonusmelee:blanctouchesicavalerie,melee:[blanc],defense:[rouge,blanc],riposte:ftrue,type:INFANTERIE,cohesion:true,cout:115},
        {nom:"Yerli Kulu",o1:[70,1,INFANTERIEELITE,2,4],pdf:true,melee:[jaune_blancrecule],defense:[jaune],esquive:true,faction:OTTOMAN,type:INFANTERIE,masse:true},
        {nom:"Canon",o1:[190,3,CANON,0,0,0,2],tir:[rouge,rouge],defense:[blanc],type:ARTILLERIE,typetir:CLOCHE,portee:3,pdv:2,faction:OTTOMAN},
        {nom:"Bombarde",s2:[260,3,BOMBARDE,0,0,0,2],s1:[220,3,BOMBARDE,0,0,0,1],tir: [rouge,rouge,blanc_blanctue],defense:[unbouclier],type:ARTILLERIE,typetir:CLOCHE,portee:2,pdv:2,pdf:true,desc:"%MELEE%: 1+ %TUE% &rarr; %DETRUIT%"},
        {nom:"Couleuvrine",f3:[130,1,CANON,0,0,0,1],s1:[140,2,CANON,0,0,0,2],s2:[160,2,CANON,0,0,0,3],pdf:true,tir:[jaune_blancrecule,jaune_blancrecule,jaune_blancrecule],defense:[unbouclier],visee:true,typetir:TENDU,portee:2,type:ARTILLERIE,cout:155,moral:2},
        {nom:"Baliste",s2:[120,2,CANON,0,0,1,1],tir:[noir_boucliertouche],defense:[unbouclier],type:ARTILLERIE,typetir:TENDU,portee:3,pdv:2,visee:true,pdf:true},
        {nom:"Echelles",type:ARTILLERIE,s1:[20,0,TOURDESIEGE,0,0,2,4]},
        {nom:"Trébuchet",s1:[150,2,BOMBARDE,0,0,0,2],tir:[blanc_blanctue,blanc_blanctue],defense:[unbouclier,unbouclier],type:ARTILLERIE,typetir:CLOCHE,visee:true,grand:true,pdv:2,portee:3,moral:2,pdf:true,desc:"%MELEE%: 1+ %TUE% &rarr; %DETRUIT%"},
        {nom:"Tour de Siège",s1:[260,4,TOURDESIEGE,0,0,0,1],defense:[unbouclier,unbouclier],ralliement:true,grand:true,type:ARTILLERIE,pdv:8,pdf:true,desc:"Lorsque %THIS% est adjacent à une fortification, %THIS% rend sa zone et toutes les zones adjacentes à elle adjacentes à cette fortification, et annule le bonus de défense de celle-ci."},
        {nom:"Bélier",s1:[100,3,TOURDESIEGE,0,0,0,1],defense:[unbouclier,unbouclier],pdv:4,type:ARTILLERIE,cout:100,moral:3,pdf:true,desc:"%ACTIVATED%%TOURCOND%: +1 %DETRUIT% à une zone adjacente contenant une porte fortifiée"},
        {nom:"Ribaudequin",tir:[rouge,blanc],defense:[noir],terreur:2,typetir:TENDU,type:ARTILLERIE,portee:1,desc:"%STARTGAME%: placez 1 haie de pieux dans la zone du Ribaudequin"},
        {nom:"Pavois",s1:[100,1,PAVOIS,0,0,2,2],defense:[noir,blanc],pdv:4,type:INFANTERIE,desc:"%DEFENSE%: %TUE%%HERE%, %TOUCHE%%HERE% peuvent être alloués à %THIS%",pdf:true},
        {nom:"Musicien",a1:[200,3,MUSICIEN,0,0,0,1],a2:[190,4,MUSICIEN,0,0,0,1],a3:[200,2,MUSICIEN,0,0,0,2],e1:[150,2,MUSICIEN,0,0,0,1],f1:[170,2,MUSICIEN,0,0,0,1],f3:[160,2,MUSICIEN,0,0,0,1],pdf:true,defense:[blanc],type:INFANTERIE,terreur:1,commandement:[3,1],cout:170,moral:2,desc:"%TOUTTYPE%%HERE% %MELEEONLY% / %TIRTENDU% / %TIRCLOCHE%: +1 <span class='deblanc'></span>%BR%%CAMP%: <span class='touche'></span> &rarr; <span class='rallie'></span>"},
        {nom:"Porte-Etendard",a1:[230,3,MUSICIEN,0,0,0,1],a3:[240,3,MUSICIEN,0,0,0,1],e1:[250,3,MUSICIEN,0,0,0,1],f1:[240,3,MUSICIEN,0,0,0,1],f2:[260,3,MUSICIEN,0,0,0,1],f3:[280,3,MUSICIEN,0,0,0,1],pdf:true,defense:[blanc],type:INFANTERIE,esquive:true,ralliement:true,commandement:[3,1],modattaque:annule2touche,moral:4,cout:260,desc:"%CAMP%: <span class='touche'></span> &rarr; <span class='rallie'></span>"},
        {nom:"Pavoisiers",defense:[noir,blanc],e1:[100,1,PAVOISIERS,0,0,0,3],f3:[110,1,PAVOISIERS,0,0,0,2],type:INFANTERIE,desc:"%TOUTTYPE%%HERE%, %DEFENSE%:  + %PARADE%",cout:110},
        {nom:"Prêtre",b3:[100,2,CIVIL,0,0,1,0],pdf:true,civil:true,type:INFANTERIE,priere:true,soinbienthere:true,commandement:[1,2],commandefaction:BIEN,faction:BIEN},
        {nom:"Marchande",pdf:true,civil:true,type:INFANTERIE,desc:"%ACTIVATED%%TOURCOND%: +1 %RUMEUR%"},
        {nom:"Forgeron",f2:[160,2,SOUTIEN,0,1],pdf:true,civil:true,type:INFANTERIE,melee:[jaune],cout:160,moral:2,desc:"Paysans%HERE%: + %RIPOSTE%, <span class='melee'></span> +1 <span class='dejaune'></span>"},
        {nom:"Apothicaire",pdf:true,civil:true,type:INFANTERIE,defense:[blanc],soin:true,desc:"%ACTIVATED%%TOURCOND% %CARTELEGENDE%: +1 %LEGENDE% / %XP% / %CARTELEGENDE%"},
        {nom:"Bourgeois",pdf:true,civil:true,type:INFANTERIE,desc:"%ACTIVATED%%TOURCOND%: +1 %XP%"},
        {nom:"Fermier",pdf:true,civil:true,type:INFANTERIE},
        {nom:"Chasseur",civil:true,type:INFANTERIE,desc:"%ACTIVATED%%TOURCOND%: consultez un jeton scénario placé dans la zone de %THIS%"},
        {nom:"Médecin",e1:[130,2,CIVIL,0,0,0,1],pdf:true,civil:true,type:INFANTERIE,defense:[blanc],soin:true,celerite:2,cout:130,moral:2,desc:"%TOUTTYPE%%HERE% %MORT%: %ROLL% <span class='dejaune'></span>, <span class='facejaune vierge'></span> &rarr; %TOUCHE%"},
        {nom:"Noble dame",civil:true,type:INFANTERIE,desc:"%ACTIVATED%%ROUNDCOND%: +1 %LEGENDE% / %RUMEUR%%BR%%PERSONNAGE%%HERE%: + %CHARISME%"},
        {nom:"Guide",pdf:true,civil:true,type:INFANTERIE,defense:[blanc],modattaque:annule1recul,desc:"%ACTIVATED% %XP%%XP%%ROUNDCOND%: %MOVE% %TOUTTYPE%%HERE%"},
        {nom:"Devin",pdf:true,civil:true,type:INFANTERIE,defense:[unbouclier],desc:"%ACTIVATED% %XP%%XP%%XP%: %CHOOSE% %CARTELEGENDE%"},
        {nom:"Monsieur Quirk",civil:true,type:INFANTERIE,immortel:true,desc:"%ACTIVATED% %MONTOUR%: un unité ennemie%THERE% &rarr; +1 %RUMEUR%"},
        {nom:"Léo l'aubergiste",civil:true,type:INFANTERIE,terreur:2,soin:true,desc:"%ACTIVATED%%ROUNDCOND%: %PERSONNAGE%%HERE%  + <span class='commandement' style='color:black'>1</span>"},
        {nom:"Jacques le troubadour",civil:true,type:INFANTERIE,terreur:1,desc:"%DEFENSE%: 'Le Bon Endroit'%HEREANDTHERE% &rarr;  annulez tous les %RECUL%"},
        {nom:"Rebouteuse",pdf:true,civil:true,type:INFANTERIE,desc:"%CAMP%, %REROLL% une fois le dé du Destin pour deux unités alliés %TOUCHE%"},
    ];
                 }

    static pgs() { return [
        {nom:"Dragon",pm:[1250,10,PERSONNAGE,1,2],f:'DRG',faction:MAL,type:VOLANT,melee:[rouge,rouge,rouge,blanc],tir:[rouge],portee:2,typetir:TENDU,defense:[unbouclier,unbouclier],pdv:20,terreur:2},
        {nom:"La Bête",pm:[1110,10,PERSONNAGE,1,2],f:'LBE',faction:MAL,type:VOLANT,melee:[rouge,rouge,rouge],tir:[rouge],portee:2,typetir:TENDU,defense:[unbouclier,unbouclier],pdv:14,terreur:2},
        {nom:"Le Léviathan",pm:[750,4,PERSONNAGE,1,2],f:'LLH',faction:MAL,type:INFANTERIE,melee:[unrecul,blanc,blanc,blanc],defense:[unbouclier,unbouclier],pdv:16,terreur:2,desc:"%DEFENSE%: annulez tous les reculs%BR%Les unités mises Hors de Combat par %THIS% sont posées sur ce plateau au lieu de l’Infirmerie. Durant la phase de Camp, elles sont détruites sur un %TOUCHE%%BR%À chaque fois que %THIS% attaque une zone contenant un élément de terrain ou un bâtiment, ces derniers reçoivent 1 %DETRUIT%"},
        {nom:"Le Diable",pm:[1175,9,PERSONNAGE,1,2],f:'LDL',faction:MAL,type:VOLANT,melee:[untue,rouge,rouge],defense:[unbouclier,unbouclier],pdv:14,terreur:2,visee:true,ignifuge:true,cout:1165,commandement:[5,5]},
        {nom:"Prigent de Coétivy",f:'E',f3:[270,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,jaune],defense:[rouge],pdv:2,commandement:[1,2],survie:true,genie:true,charisme:true,maj:3,dates:[1399,1450],source:"https://fr.wikipedia.org/wiki/Prigent_VII_de_Co%C3%ABtivy",blason:true,desc:"une zone ennemie%THERE% vient d'être activée,%ROUNDCOND%: + %MELEE%"},
        {nom:"Prigent de Coétivy",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[rouge,rouge],pdv:2,commandement:[1,3],survie:true,genie:true,riposte:ftrue,dates:[1399,1450],source:"https://fr.wikipedia.org/wiki/Prigent_VII_de_Co%C3%ABtivy",blason:true,desc:"une zone ennemie%THERE% vient d'être activée,%ROUNDCOND%: + %MELEE%%BR%%MONTOUR%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Maréchal Jean de Clermont",f:'F',f2:[190,5,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge_bouclierrecule,blanc_bouclierrecule],defense:[noir,blanc],charge:true,impetueux:true,pdv:2,commandement:[1,2],maj:4,dates:[1352,1356],source:"https://fr.wikipedia.org/wiki/Jean_de_Clermont",blason:true,desc:"%TROUPE%%HERE%: + %COHESION%"},
        {nom:"Maréchal Jean de Clermont",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir,rouge],charge:true,impetueux:true,riposte:ftrue,legendaire:true,pdv:3,commandement:[1,2],dates:[1352,1356],source:"https://fr.wikipedia.org/wiki/Jean_de_Clermont",blason:true,desc:"%TROUPE%%HERE%: + %COHESION%"},
        {nom:"Jean II Le Bon",pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,impetueux:true,pdv:3,commandement:[1,2],maj:3,dates:[1350,1364],source:"https://fr.wikipedia.org/wiki/Jean_II_le_Bon",blason:true,desc:"%MONTOUR%: +1 %VERT%"},
        {nom:"Jean II Le Bon",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,blanc],defense:[rouge],charge:true,impetueux:true,riposte:ftrue,pdv:4,commandement:[1,3],dates:[1350,1364],source:"https://fr.wikipedia.org/wiki/Jean_II_le_Bon",blason:true,desc:"%MONTOUR%: +1 %VERT% / %JAUNE%%BR%%CONSEIL%: -1 %XP%"},
        {nom:"Philippe le Hardi",f:'A',f2:[225,3,SOUTIEN,0,1],pdf:true,faction:FRANCAIS,type:INFANTERIE,defense:[noir,blanc],charge:true,parade:ftrue,feinte:ftrue,dates:[1352,1404],source:"https://fr.wikipedia.org/wiki/Philippe_II_de_Bourgogne",blason:true,cout:225,moral:3 , desc:"%PERSONNAGE%%HERE% : + %PARADE%%BR%Les unités dans sa zone ne peuvent subir d'attaque de tir"},
        {nom:"Maréchal Arnoul d'Audrehem",f:'MAA',f1:[190,4,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,impetueux:true,modattaque:annule2recul,pourfendeur:true,pdv:2,commandement:[2,1],maj:4,dates:[1351,1370],source:"https://fr.wikipedia.org/wiki/Arnoul_d%27Audrehem",blason:true},
        {nom:"Maréchal Arnoul d'Audrehem",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,impetueux:true,riposte:ftrue,pdv:3,commandement:[2,2],dates:[1351,1370],source:"https://fr.wikipedia.org/wiki/Arnoul_d%27Audrehem",blason:true,desc:"%ACTIVATED%%TOURCOND% %XP%: %GRIS% &rarr; %VERT%%BR%%PERSONNAGE%%HERE%: + %PARADE%"},
        {nom:"Philippe d'Orléans",f:'PhO',f2:[240,3,0,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir],charge:true,ralliement:true,charisme:true,pdv:2,commandement:[1,2],maj:4,dates:[1352,1356],source:"https://fr.wikipedia.org/wiki/Philippe_d%27Orl%C3%A9ans_(1336-1375)",blason:true,desc:"X %BLESSURE% &rarr; %MELEE%: +X %RECUL%%BR%%THIS% compte comme n'importe quelle troupe lors du décompte pour le trait %MASSE%"},
        {nom:"Philippe d'Orléans",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir,jaune],charge:true,ralliement:true,charisme:true,gardeducorps:true,modattaque:annule1recul,pdv:3,commandement:[1,3],dates:[1352,1356],source:"https://fr.wikipedia.org/wiki/Philippe_d%27Orl%C3%A9ans_(1336-1375)",blason:true,desc:"X %BLESSURE% &rarr; %MELEE%: +X %RECUL%"},
        {nom:"Jean, fils du Roi",b:[1,110,2,PERSONNAGE,1,2],c:110,moral:2,pdf:true,faction:FRANCAIS,type:INFANTERIE,melee:[blanc],defense:[noir],charge:true,visee:true,dates:[1356,1416], source:"https://fr.wikipedia.org/wiki/Jean_Ier_de_Berry"/* C'est Jean I de berry */,blason:true,desc:"%MONTOUR% %LEGENDE%: %PERSONNAGE%%HERE% + Survie%BR%%MELEE%: 1+ %MORT% &rarr; %LEGENDE%"},
        {nom:"Gautier VI de Brienne",pdf:true,faction:FRANCAIS,type:INFANTERIE,melee:[rouge_bouclierrecule,blanc_bouclierrecule],defense:[noir],mercenaire:true,cruel:true,pdv:2,commandement:[1,2],dates:[1311,1356],source:"https://fr.wikipedia.org/wiki/Gautier_VI_de_Brienne",blason:true},
        {nom:"Jean de Bourbon",f:'B',f3:[250,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[rouge,rouge],charge:true,riposte:ftrue,pdv:2,commandement:[2,3],maj:4,dates:[1426,1488],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Bourbon",blason:true,cout:205,moral:3,legendaire:true},
        {nom:"Jean de Bourbon",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc,noir],defense:[noir,noir],charge:true,riposte:ftrue,pdv:3,commandement:[2,2],maj:4,dates:[1426,1488],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Bourbon",blason:true,moral:3,legendaire:true,desc:"%ACTIVATED%%TOURCOND% %XP%: %GRIS% &rarr; %VERT%"},
        {nom:"Charles d'Albret",f:'C',f3:[220,2,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[noir],charge:true,impetueux:true,charisme:true,pdv:3,commandement:[2,2],maj:4,dates:[1388,1415],source:"https://fr.wikipedia.org/wiki/Charles_Ier_d%27Albret",blason:true,desc:"%MONTOUR% %XP%: %GRIS% &rarr; %VERT%%BR%%MELEE%: %MORT% &rarr; %XP%"},
        {nom:"Charles d'Albret",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir,noir],charge:true,pdf:true,impetueux:true,ralliement:true,pdv:4,commandement:[2,2],maj:4,dates:[1388,1415],source:"https://fr.wikipedia.org/wiki/Charles_Ier_d%27Albret",blason:true,desc:"%MONTOUR% %XP%: %GRIS% &rarr; %VERT%%BR%une zone ennemie adjacente vient d'être activée: + %MELEE%"},
        {nom:"Jean Jourdain",f:'C',f3:[180,2,PERSONNAGE,1,2],faction:FRANCAIS,type:INFANTERIE,melee:[blanc],defense:[noir],pdv:2,dates:[1418,1419],source:"https://www.paris-normandie.fr/rouen/l-histoire-revisitee--le-siege-de-rouen-entre-1418-et-1419-CN13969319"/*Siege de Rouen */,desc:"Couleuvrine%HERE%%TIRTENDU%: +1 <span class='derouge'></span>%BR%Couleuvrine%HERE%%TIRTENDU%: %MORT% &rarr; %XP%"},
        {nom:"Guy le Bouteiller",f:'F',f3:[190,5,PERSONNAGE,1,2],faction:FRANCAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[blanc],pdv:2,dates:[1414,1438],source:"http://www.mesqui.net/Articles_fortif/pdf/Guy-le-Bouteillier-et-La-Roche-Guyon.pdf",desc:"%MELEE%: %MORT% &rarr; %XP%%BR%%LEGENDE% %DEFENSE%: <span class='facerouge tue'></span> &rarr; <span class='facerouge bouclier'></span>"},
        {nom:"Alain Blanchard",f:'C',f3:[230,2,PERSONNAGE,1,2],faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[rouge],pdv:2,tir:[noir_bouclierrecule,noir_bouclierrecule],portee:3,typetir:TENDU,dates:[1394,1419],source:"https://fr.wikipedia.org/wiki/Alain_Blanchard_(capitaine)"},
        {nom:"Jeanne d'Arc",pdf:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,jaune],defense:[noir,noir],pdv:3,commandement:[3,2],survie:true,priere:true,terreur:1,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ACTIVATED%%ROUNDCOND%: en fin d'activation, jouez %JAUNE% depuis la réserve commune dans la zone sitée jusqu'à 3 zones de distance de %THIS%%BR%%CAMP%: %RETARDE% &rarr; %RALLIE%"},
        {nom:"Jeanne d'Arc",pdf:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[rouge,jaune],pdv:4,commandement:[2,2],terreur:2,riposte:ftrue,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ACTIVATED%%ROUNDCOND%: en fin d'activation, jouez un %JAUNE%  depuis la réserve commune dans la zone sitée jusqu'à 3 zones de distance de %THIS%%BR%%ROUND%: +1 %LEGENDE%, +1 %CARTELEGENDE%"},
        {nom:"Jeanne d'Arc",f:"JJ",f3:[390,5,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc],defense:[noir],pdv:2,commandement:[1,1],terreur:1,survie:true,priere:true,maj:2,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ACTIVATED%%ROUNDCOND%: en fin d'activation, jouez %JAUNE% depuis la réserve commune dans la zone sitée jusqu'à 3 zones de distance de %THIS%%BR%%CAMP%: %RETARDE% &rarr; %RALLIE%"},
        {nom:"Jeanne d'Arc",pdf:true,faction:FRANCAIS,niv:0,type:INFANTERIE,defense:[noir],pdv:2,survie:true,priere:true,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ONCEINGAME%: +1 %CARTELEGENDE%, +1 %LEGENDE%"},
        {nom:"Bertrand du Guesclin",b:[1,435,6,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,noir],defense:[rouge],pdv:5,charge:true,riposte:ftrue,pourfendeur:true,commandement:[1,1],maj:5,dates:[1337,1380],source:"https://fr.wikipedia.org/wiki/Bertrand_du_Guesclin",blason:true,moral:6,cout:435,enleve1d:true,desc:"Lorsqu'il est mis hors de combat, %THIS% est directement placé dans la zone d'attente de l'infirmerie"},
        {nom:"Bertrand du Guesclin",pdf:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[rouge,blanc],pdv:5,cruel:true,gardeducorps:true,pourfendeur:true,commandement:[1,2],dates:[1337,1380],source:"https://fr.wikipedia.org/wiki/Bertrand_du_Guesclin",blason:true,moral:6,desc:"%XP%%XP% %MELEE%: 1 <span class='derouge'></span> &rarr; <span class='facerouge tue'></span>%BR%%MELEE%: %MORT% &rarr; %XP%"},
        {nom:"Bertrand du Guesclin",pdf:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,noir,jaune],defense:[rouge,blanc],pdv:5,charge:true,riposte:ftrue,pourfendeur:true,commandement:[1,1],dates:[1337,1380],source:"https://fr.wikipedia.org/wiki/Bertrand_du_Guesclin",blason:true,moral:6,desc:"%CAMP%: %RALLIE%<span class='troupe combat-cond'></span>%BR%%ACTIVATED%%ROUNDCOND%: +1 %BLEU%"},
        {nom:"Amaury de Sévérac",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[rouge,rouge],pdv:2,mercenaire:true,riposte:ftrue,commandement:[1,2],maj:3,dates:[1385,1427],source:"https://fr.wikipedia.org/wiki/Amaury_de_S%C3%A9v%C3%A9rac",blason:true,desc:"%BLESSURE% &rarr; %XP%"},
        {nom:"Amaury de Sévérac",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc,jaune],defense:[rouge,rouge],pdv:3,pourfendeur:true,riposte:ftrue,commandement:[1,2],dates:[1385,1427],source:"https://fr.wikipedia.org/wiki/Amaury_de_S%C3%A9v%C3%A9rac",blason:true,desc:"%BLESSURE% &rarr; %XP%"},
        {nom:"Jeanne d'Arc",f3:[325,5,PERSONNAGE,1,2],f:"JJ",pdf:true,acheval:true,niv:1,faction:FRANCAIS,type:CAVALERIE,defense:[blanc],pdv:2,celerite:2,priere:true,parade:ftrue,commandement:[AA,2],maj:4,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,cout:325,desc:"%ACTIVATED%%ROUNDCOND%: +1 %JAUNE%"},
        {nom:"Jeanne d'Arc",pdf:true,acheval:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,blanc],defense:[rouge,jaune],pdv:4,celerite:2,riposte:ftrue,terreur:2,commandement:[2,2],dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,legendaire:true,desc:"%MELEE% / %DEFENSE%: <span class='faceblanc vierge'></span> &rarr; %LEGENDE% / %CARTELEGENDE%"},
        {nom:"Jeanne d'Arc",pdf:true,acheval:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:CAVALERIE,pdv:3,celerite:2,priere:true,ralliement:true,commandement:[3,2],dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ACTIVATED%%ROUNDCOND%: +1 %JAUNE% et jouez cet ordre immédiatement dans n'importe quelle zone alliée%BR%%ACTIVATED% %ROLL% le dé du Destin: %RALLIE% &rarr; %TOUTTYPE%%RALLIE%"},
        {nom:"Héros",niv:1,f:'D',b2:[170,3,PERSONNAGE,1,2],b1:[150,3,PERSONNAGE,1,2],b2:[160,3,PERSONNAGE,1,2],f1:[170,3,PERSONNAGE,1,2],f3:[160,3,PERSONNAGE,1,2],f2:[160,3,SOUTIEN,0,1],faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[noir],priere:true,feinte:ftrue,commandement:[AA,1],maj:3,cout:160,moral:3},
        {nom:"Héros",niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,priere:true,parade:ftrue,commandement:[1,1],moral:3},
        {nom:"Héros",niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[blanc_blanctouche,jaune_blanctouche],defense:[blanc,blanc],pdv:2,priere:true,terreur:1,commandement:[AA,2],moral:3},
        {nom:"Héros",f:'D',a1:[160,3,PERSONNAGE,1,2],a2:[170,3,PERSONNAGE,1,2],niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],priere:true,feinte:ftrue,commandement:[AA,1],maj:3,moral:3,cout:160},
        {nom:"Héros",niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,priere:true,parade:ftrue,commandement:[1,1],cout:160,moral:3},
        {nom:"Héros",niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[blanc_blanctouche,jaune_blanctouche],defense:[blanc,blanc],pdv:2,priere:true,terreur:1,commandement:[AA,2],moral:3},
        {nom:"Boucicaut",f:'BCC',f1:[405,5,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[noir,noir],pdv:3,ralliement:true,commandement:[2,2],maj:4,modattaque:annule2recul,dates:[1340,1415],source:"https://fr.wikipedia.org/wiki/Jean_II_Le_Meingre",blason:true,moral:5,cout:405,desc:"%ACTIVATED% %XP%%XP%%XP% %ROUNDCOND%: +1 %BLEU%"},
        {nom:"Boucicaut",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,blanc],defense:[noir,noir],pdv:3,ralliement:true,celerite:2,commandement:[3,2],dates:[1340,1415],source:"https://fr.wikipedia.org/wiki/Jean_II_Le_Meingre",blason:true,desc:"%BLEU%%HERE%%ROUNDCOND%: vous pouvez jouer un %BLEU%%HERE% après celui-ci%BR%%ACTIVATED%%TOURCOND% %XP%%XP%%XP%: +1 %BLEU%"},
        {nom:"Poton de Xaintrailles",f:'A',f3:[260,4,SOUTIEN,0,1],pdf:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:CAVALERIE,melee:[noir,noir],defense:[noir],pourfendeur:true,pdv:3,commandement:[1,2],dates:[1423,1450],source:"https://fr.wikipedia.org/wiki/Jean_Poton_de_Xaintrailles",blason:true,moral:4,desc:"%BLEU%%HERE%%ROUNDCOND%: vous pouvez jouer  %BLEU%%HERE% à la suite%BR%une zone adjacente ennemie vient de recevoir un ordre %ROUNDCOND%: +1 %MELEE%"},
        {nom:"Poton de Xaintrailles",pdf:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:CAVALERIE,melee:[noir,noir],defense:[noir],celerite:2,survie:true,pdv:3,commandement:[1,2],dates:[1423,1450],source:"https://fr.wikipedia.org/wiki/Jean_Poton_de_Xaintrailles",blason:true,moral:4,cout:260,desc:"%BLEU%%HERE%%ROUNDCOND%: vous pouvez jouer  %BLEU%%HERE% à la suite%BR%une zone adjacente ennemie vient de recevoir un ordre %ROUNDCOND%: +1 %MELEE%"},
        {nom:"Poton de Xaintrailles",pdf:true,niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[noir,jaune],defense:[noir],survie:true,pdv:2,maj:3,dates:[1423,1450],source:"https://fr.wikipedia.org/wiki/Jean_Poton_de_Xaintrailles",blason:true,desc:"%XP% %MELEE%: %REROLL% <span class='denoir'></span>%BR%La Hire%HEREANDTHERE% %DEFENSE% +1 <span class='denoir'></span>"},
        {nom:"Charles de Bourbon",f:'CdB',f3:[200,3,PERSONNAGE,1,2],niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,jaune],defense:[noir],pdv:2,maj:4,dates:[1416,1456],source:"https://fr.wikipedia.org/wiki/Charles_Ier_de_Bourbon",blason:true,cout:200,moral:3,desc:"%MELEE%: <span class='facejaune vierge'></span> &rarr; %LEGENDE%%BR%%ACTIVATED% %LEGENDE%%LEGENDE%: +1 %RUMEUR%"},
        {nom:"Charles de Bourbon",niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge,jaune],defense:[noir],impetueux:true,pdv:3,dates:[1416,1456],source:"https://fr.wikipedia.org/wiki/Charles_Ier_de_Bourbon",blason:true,moral:3,desc:"%MELEE%: <span class='facejaune vierge'></span> &rarr; %LEGENDE%%BR%%ACTIVATED% %LEGENDE%%LEGENDE%: +1 %RUMEUR%"},
        {nom:"La Hire",f:'LH',f3:[375,5,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,blanc],defense:[rouge,rouge],pdv:3,riposte:ftrue,charge:true,maj:4,dates:[1418,1443],source:"https://fr.wikipedia.org/wiki/%C3%89tienne_de_Vignolles",blason:true,cout:375,moral:5,desc:"X %BLESSURE% &rarr; %MELEE%: +X <span class='deblanc'></span>%BR%%MELEE%: %MORT% &rarr; %XP%"},
        {nom:"La Hire",pdf:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[rouge,rouge],pdv:4,riposte:ftrue,charge:true,commandement:[AA,2],dates:[1418,1443],source:"https://fr.wikipedia.org/wiki/%C3%89tienne_de_Vignolles",blason:true,moral:5,desc:"X %BLESSURE% &rarr; %MELEE%: +X <span class='denoir'></span>%BR%quand %THIS% charge, + %PARADE%"},
        {nom:"La Hire",pdf:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,blanc,blanc],defense:[rouge,blanc],pdv:4,terreur:2,dates:[1418,1443],source:"https://fr.wikipedia.org/wiki/%C3%89tienne_de_Vignolles",blason:true,moral:5,desc:"X %BLESSURE% &rarr; %MELEE%: +X <span class='derouge'></span>%BR%%MELEE%: %MORT% &rarr; %XP%%XP%"},
        {nom:"Jean de Dunois",f:'E',f3:[410,5,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune,blanc],defense:[noir,noir],pdv:2,parade:ftrue,celerite:2,maj:4,commandement:[AA,1],dates:[1422,1468],source:"https://fr.wikipedia.org/wiki/Jean_de_Dunois",blason:true,cout:410,enleve1d:true,moral:5,desc:"%ONCEINGAME%: %GRIS% &rarr; %BLEU%"},
        {nom:"Jean de Dunois",pdf:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune,noir],defense:[noir,noir],pdv:3,relance:true,survie:true,commandement:[1,2],dates:[1422,1468],source:"https://fr.wikipedia.org/wiki/Jean_de_Dunois",blason:true,moral:5,desc:"%ACTIVATED% %LEGENDE%%ROUNDCOND% : %GRIS% &rarr; %BLEU%%BR%%ACTIVATED%%ROUNDCOND%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Jean de Dunois",pdf:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,noir,blanc],defense:[noir],pdv:3,priere:true,cruel:true,commandement:[AA,1],dates:[1422,1468],source:"https://fr.wikipedia.org/wiki/Jean_de_Dunois",blason:true,moral:5,desc:"%ACTIVATED%%TOURCOND% 1 %TROUPE%%THERE%%MELEE%: +1 <span class='denoir'></span>%BR%%DEFENSE%: %LEGENDE%%LEGENDE% &rarr; %REROLL% <span class='deblanc'></span><span class='melee combat-cond'></span>"},
        {nom:"Jacques de Bourbon",f:'C',f2:[205,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,maj:4,commandement:[AA,2],dates:[1342,1362,1393,1438],source:"https://fr.wikipedia.org/wiki/Jacques_Ier_de_Bourbon-La_Marche https://fr.wikipedia.org/wiki/Jacques_II_de_Bourbon",blason:true},
        {nom:"Jacques de Bourbon",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],pdv:3,commandement:[1,2],dates:[1342,1362],source:"https://fr.wikipedia.org/wiki/Jacques_Ier_de_Bourbon-La_Marche",blason:true,desc:"%DEFENSE%: %TOUTTYPE%%HERE% &rarr; +1 %BOUCLIER%"},
        {nom:"Bertrand de Poulengy",pdf:true,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],tir:[noir_bouclierrecule],typetir:TENDU,portee:1,defense:[rouge],pdv:2,relance:true,gardeducorps:true,dates:[1412,1456],source:"https://fr.wikipedia.org/wiki/Bertrand_de_Poulengy"},
        {nom:"Comte d'Auxerre",f:'C',f2:[190,3,PERSONNAGE,1,2],pdf:true,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune,blanc],defense:[blanc,blanc],pdv:3,gardeducorps:true,commandement:[AA,1],dates:[1350,1364],source:"https://fr.wikipedia.org/wiki/Jean_III_de_Chalon-Auxerre",blason:true,cout:190,moral:3},
        {nom:"Barral de Pontevès",f:'A',f3:[240,4,SOUTIEN,0,1],pdf:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir,blanc],charge:true,feinte:ftrue,pourfendeur:true,pdv:3,commandement:[AA,2],dates:[1370,1390],source:"https://fr.wikipedia.org/wiki/Pontev%C3%A8s#Moyen_%C3%82ge",moral:4},    
        {nom:"Barral de Pontevès",pdf:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[jaune,jaune,jaune],pdv:3,charge:true,riposte:ftrue,immortel:true,commandement:[1,2],dates:[1370,1390],source:"https://fr.wikipedia.org/wiki/Pontev%C3%A8s#Moyen_%C3%82ge",moral:4,cout:240},    
        {nom:"Barral de Pontevès",pdf:true,niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],charge:true,pdv:2,commandement:[AA,1],maj:4,dates:[1370,1390],source:"https://fr.wikipedia.org/wiki/Pontev%C3%A8s#Moyen_%C3%82ge"},    
        {nom:"Amaury de Craon",pdf:true,niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir,noir],pdv:2,commandement:[AA,2],dates:[1345,1373],source:"https://fr.wikipedia.org/wiki/Amaury_IV_de_Craon",blason:true,cout:280,moral:3,desc:"%ACTIVATED%%ROUNDCOND%: %MOVE% %THIS% de 2 zones"},    
        {nom:"Amaury de Craon",f:'A',f1:[280,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge],defense:[noir,noir],pdv:2,commandement:[AA,1],maj:3,dates:[1345,1373],source:"https://fr.wikipedia.org/wiki/Amaury_IV_de_Craon",blason:true,desc:"%ACTIVATED%%TOURCOND%: en début ou fin d'activation, %MOVE% %THIS%"},    
        {nom:"Héros monté",f:'A',f1:[220,3,PERSONNAGE,1,2],f3:[220,3,PERSONNAGE,1,2],niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[AA,1],maj:3,cout:220,moral:3},    
        {nom:"Héros monté",niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[1,1],moral:3},    
        {nom:"Héros monté",f:'A',b1:[200,4,PERSONNAGE,1,2],b2:[210,3,PERSONNAGE,1,2],niv:1,faction:BIEN,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[AA,1],maj:3},    
        {nom:"Héros monté",niv:2,faction:BIEN,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[1,1]},    
        {nom:"Philippe VI de Valois",pdf:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir,noir],pdv:3,priere:true,commandement:[3,2],dates:[1328,1350],source:"https://fr.wikipedia.org/wiki/Philippe_VI_de_Valois",blason:true,desc:"%TROUPE%%HERE%%DEFENSE%: + %GARDEDUCORPS%%BR%%ACTIVATED% %LEGENDE%: au début d'activation,  + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>"},    
        {nom:"Philippe VI de Valois",pdf:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir,noir],pdv:3,priere:true,commandement:[3,2],dates:[1328,1350],legendaire:true,source:"https://fr.wikipedia.org/wiki/Philippe_VI_de_Valois",blason:true,desc:"%TROUPE%%HERE%: + %CHARGE%"},
        {nom:"Philippe VI de Valois",f:'A',f1:[300,4,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge],defense:[noir,noir],pdv:2,priere:true,commandement:[1,1],modattaque:annule1recul,maj:4,dates:[1328,1350],source:"https://fr.wikipedia.org/wiki/Philippe_VI_de_Valois",blason:true,cout:300,moral:4,desc:"%ACTIVATED%%ROUNDCOND%: %MOVE% 1 %CAVALERIE% d'une zone en direction d'une zone ennemie"},
        {nom:"Charles II le Magnanime",pdf:true,niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,jaune],defense:[blanc,blanc,jaune],pdv:3,riposte:ftrue,impetueux:true,commandement:[AA,2],dates:[1324,1346],source:"https://fr.wikipedia.org/wiki/Charles_II_d%27Alen%C3%A7on",blason:true,desc:"%POURSUITE%: +1 %LEGENDE%%BR%%DEFENSE%: <span class='faceblanc vierge'></span> &rarr; %CARTELEGENDE%"},
        {nom:"Charles II le Magnanime",f:'A',f1:[310,4,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[jaune_relance,jaune_relance],defense:[blanc,blanc],pdv:2,riposte:ftrue,impetueux:true,commandement:[AA,1],maj:4,dates:[1324,1346],source:"https://fr.wikipedia.org/wiki/Charles_II_d%27Alen%C3%A7on",blason:true,cout:310,moral:4,desc:"%DEFENSE%: <span class='faceblanc vierge'></span> &rarr; %CARTELEGENDE%"},
        {nom:"Baudoin de Lens",f:'A',f2:[175,3,SOUTIEN,0,1],pdf:true,faction:FRANCAIS,type:CAVALERIE,melee:[noir_bouclierrecule,noir_bouclierrecule],defense:[noir],pdv:2,impetueux:true,priere:true,dates:[1358,1364],source:"https://fr.wikipedia.org/wiki/Ma%C3%AEtre_des_arbal%C3%A9triers",cout:175,moral:3},
        {nom:"Jean de Metz",f:'B',f3:[155,3,SOUTIEN,0,1],pdf:true,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[rouge],pdv:2,riposte:ftrue,impetueux:true,dates:[1428,1456],source:"https://fr.wikipedia.org/wiki/Jean_de_Metz",blason:true,cout:155,moral:3,desc:"%LEGENDE% %DEFENSE%: <span class='facerouge tue'></span> &rarr; <span class='facerouge bouclier'></span>%BR%%MELEE%: %MORT% &rarr; %XP%"},
        {nom:"Arthur de Richemont",pdf:true,niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,jaune],pdv:2,priere:true,cruel:true,commandement:[AA,2],maj:5,dates:[1414,1458],source:"https://fr.wikipedia.org/wiki/Arthur_III_de_Bretagne",blason:true,desc:"%ACTIVATED%%TOURCOND% %LEGENDE%: %MOVE% %THIS%%BR%%TOUTTYPE%%HERE%: - Impetueux"},
        {nom:"Arthur de Richemont",pdf:true,niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge,blanc],pdv:3,priere:true,relance:true,commandement:[1,3],dates:[1414,1458],source:"https://fr.wikipedia.org/wiki/Arthur_III_de_Bretagne",blason:true,desc:"%ACTIVATED%%TOURCOND% %LEGENDE%%LEGENDE%: %CHOOSE% 1 %CARTELEGENDE%%BR%%CONSEIL%: %ROLL% <span class='denoir'></span>: <span class='facenoir touche'></span> &rarr; -1 %GRIS% / %VERT% / %BLEU% / %JAUNE% %ADVERSAIRE%"},
        {nom:"Jean 1er de Luxembourg",pdf:true,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge,noir],defense:[rouge],pdv:2,parade:ftrue,impetueux:true,dates:[1310,1346],source:"https://fr.wikipedia.org/wiki/Jean_Ier_de_Boh%C3%AAme",blason:true,desc:"%ACTIVATED% %ROLL% <span class='denoir'></span>: <span class='facenoir tue'></span> &rarr; un adversaire joue %THIS% pendant cette activation"},
        {nom:"Erwan de Romorantin",f:'B',f2:[240,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[noir,noir],pdv:2,commandement:[1,1],maj:3,dates:[1356,1356],cout:240,moral:3,desc:"Paysans%HERE%, Milice bourgeoise%HERE%, %MELEE% +1 <span class='deblanc'></span>"},
        {nom:"Erwan de Romorantin",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir,noir],pdv:3,pdf:true,commandement:[1,2],dates:[1356,1356],moral:3,desc:"Paysans%HERE%, Milice bourgeoise%HERE%, %MELEE% +1 <span class='dejaune'></span>"},
        {nom:"Jean de Vienne",f:'B',f2:[255,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[jaune,jaune],defense:[noir],priere:true,pdv:3,modattaque:annule1touche,maj:3,dates:[1347,1347,1358,1396],source:"https://fr.wikipedia.org/wiki/Jean_de_Vienne",blason:true,cout:255,moral:3,desc:"%ACTIVATED%%ROUNDCOND%: %ROLL% 1 <span class='denoir'></span>, <span class='facenoir touche'></span> &rarr; -1 %LEGENDE% %ADVERSAIRE%"},
        {nom:"Jean de Vienne",pdf:true,niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[jaune,jaune,jaune],defense:[noir],pdv:3,gardeducorps:true,soin:true,dates:[1347,1347,1358,1396],source:"https://fr.wikipedia.org/wiki/Jean_de_Vienne",blason:true,moral:3,desc:"%ACTIVATED%: %CARTELEGENDE% &rarr; %CARTELEGENDE%%BR%%ACTIVATED% %CARTELEGENDE%%CARTELEGENDE%%TOURCOND%: + %GRIS%"},
        {nom:"Le Veneur",pdf:true,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[blanc],commandement:[1,1],desc:"%THIS% ne peut commander que les chiens de chasse%BR%%TOUTTYPE%%HEREANDTHEREHEXA% doit être révélées"},
        {nom:"Gilles de Rais",f:'GdR',f3:[305,4,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,jaune],defense:[noir],charisme:true,pdv:3,maj:4,dates:[1420,1436],source:"https://fr.wikipedia.org/wiki/Gilles_de_Rais",blason:true,moral:4,cout:305,desc:"%ACTIVATED% %XP%%TOURCOND%: %RALLIE%<span class='troupe combat-cond'></span>%HERE%%BR%%MELEE%: 1+ <span class='facerouge vierge'></span> / <span class='facejaune vierge'></span> &rarr; %REROLL% 1 <span class='derouge'></span> / <span class='dejaune'></span>"},
        {nom:"Gilles de Rais",pdf:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,jaune,jaune],defense:[noir,jaune],pdv:3,charisme:true,pourfendeur:true,commandement:[1,1],dates:[1420,1436],source:"https://fr.wikipedia.org/wiki/Gilles_de_Rais",blason:true,moral:4,desc:"%ACTIVATED%: au début d'activation, %MOVE% %RALLIEMENT%%BR%%MELEE%: 1+ <span class='facerouge vierge'></span> / <span class='facejaune vierge'></span> &rarr; %REROLL% 1 <span class='derouge'></span> / <span class='dejaune'></span>"},
        {nom:"Gilles de Rais",pdf:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[noir,jaune],defense:[blanc,blanc],pdv:2,charisme:true,commandement:[AA,3],dates:[1420,1436],source:"https://fr.wikipedia.org/wiki/Gilles_de_Rais",blason:true,moral:4,desc:"%ACTIVATED%%TOURCOND% %XP%%XP% : placez une troupe alliée détruite dans la zone de %THIS%%BR%%ACTIVATED%%TOURCOND% %XP%%XP%%XP%: une troupe ennemie adjacente à %THIS% rejoint sa zone et passe sous votre controle"},
        {nom:"Ambroise de Loré",f:"A",f3:[270,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge],defense:[noir],charge:true,pdv:2,maj:4,commandement:[AA,1],commandetype:CAVALERIE,dates:[1410,1446],source:"https://fr.wikipedia.org/wiki/Ambroise_de_Lor%C3%A9",blason:true,cout:270,moral:3,desc:"%ACTIVATED%%ROUNDCOND%: +1 %VERT%"},
        {nom:"Ambroise de Loré",pdf:true,niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[AA,1],commandetype:CAVALERIE,dates:[1410,1446],source:"https://fr.wikipedia.org/wiki/Ambroise_de_Lor%C3%A9",blason:true,moral:3,desc:"%ACTIVATED%%ROUNDCOND%: +1 %VERT%"},
        {nom:"Edmond de Sommerset",f:'C',a3:[210,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[rouge],riposte:ftrue,charisme:true,pdv:3,maj:4,commandement:[1,1],dates:[1420,1455],source:"https://fr.wikipedia.org/wiki/Edmond_Beaufort_(1er_duc_de_Somerset)",blason:true,enleve1d:true},
        {nom:"Edmond de Sommerset",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,jaune],defense:[blanc,rouge],riposte:ftrue,relance:true,charisme:true,pdv:3,commandement:[1,2],dates:[1420,1455],source:"https://fr.wikipedia.org/wiki/Edmond_Beaufort_(1er_duc_de_Somerset)",blason:true,enleve1d:true,desc:"%MONTOUR%: +1 %LEGENDE%"},
        {nom:"Thomas Kyriel",a3:[280,2,PERSONNAGE,1,2],f:'PN',pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[noir],genie:true,visee:true,pdv:2,maj:4,commandement:[2,2],dates:[1416,1461],source:"https://fr.wikipedia.org/wiki/Thomas_Kyriell",blason:true,desc:"Archers%HERE%%TOURCOND% %TIRCLOCHE%: +1 <span class='derouge'></span>%BR%%MELEE%:  <span class='facejaune vierge'></span> / <span class='facenoir vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Thomas Kyriel",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,jaune],defense:[jaune,rouge],feinte:ftrue,visee:true,pdv:3,commandement:[2,2],dates:[1416,1461],source:"https://fr.wikipedia.org/wiki/Thomas_Kyriell",blason:true,desc:"Archers%HERE%%TOURCOND% %TIRCLOCHE%: +1 <span class='derouge'></span>%BR%%MELEE%:  <span class='facejaune vierge'></span> / <span class='facenoir vierge'></span> &rarr %LEGENDE%"},
        {nom:"Mathieu Goth",pdf:true,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,unrecul],defense:[rouge],impetueux:true,charge:true,mercenaire:true,pdv:3,commandement:[2,2],dates:[1406,1450],source:"http://formigny.free.fr/acteurs.html",desc:"%POURSUITE%%TOURCOND%: +1 %MELEE%"},
        {nom:"Edouard d'York",f:'B',a1:[280,4,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[rouge],charge:true,genie:true,pdv:3,maj:4,commandement:[2,2],dates:[1401,1415],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Norwich",blason:true,desc:"%ACTIVATED%%TOURCOND%: %MOVE% %TOUTTYPE%<span class='tircloche combat-cond'></span> / %TOUTTYPE%<span class='tirtendu combat-cond'></span>%HERE%%BR%%MONTOUR%: +1 %LEGENDE%"},
        {nom:"Edouard d'York",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,jaune],defense:[noir,rouge],cruel:true,charge:true,gardeducorps:true,pdv:3,commandement:[2,3],dates:[1401,1415],modattaque:transformetoucherecul,source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Norwich",blason:true,desc:"%MONTOUR%: +1 %LEGENDE%"},
        {nom:"William Glasdale",f:'C',a3:[300,4,PERSONNAGE,1,2],niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[jaune,blanc],riposte:ftrue,visee:true,pdv:2,maj:3,modattaque: transformetoucherecul,commandement:[1,2],dates:[1409,1429],source:"https://fr.wikipedia.org/wiki/William_Glasdale",blason:true},
        {nom:"William Glasdale",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[blanc,blanc],riposte:ftrue/*,feinte:true*/,pdv:3,modattaque:annule1touche,commandement:[1,3],dates:[1409,1429],source:"https://fr.wikipedia.org/wiki/William_Glasdale",blason:true},
        {nom:"Guillaume de Molins",f:'B',a3:[180,3,PERSONNAGE,1,2],niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],priere:true,feinte:ftrue,pdv:2,maj:3,commandement:[AA,1],dates:[1429,1429],source:"https://www.persee.fr/docAsPDF/bec_0373-6237_1847_num_8_1_452089.pdf"},
        {nom:"Guillaume de Molins",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],priere:true,feinte:ftrue,parade:ftrue,pdv:3,commandement:[1,1],dates:[1429,1429],source:"https://www.persee.fr/docAsPDF/bec_0373-6237_1847_num_8_1_452089.pdf"},
        {nom:"Comte de Northampton",f:'C',a2:[290,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[blanc,blanc],parade:ftrue,pdv:2,maj:3,commandement:[1,1],dates:[1339,1360],source:"https://fr.wikipedia.org/wiki/Guillaume_de_Bohun",blason:true,moral:3,cout:290,desc:"%MELEE%: %INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE% &rarr; +1 <span class='dejaune'></span>%BR%%TROUPE%%HERE%: + %MASSE%"},
        {nom:"Comte de Northampton",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir],priere:true,pdv:2,commandement:[1,2],dates:[1339,1360],source:"https://fr.wikipedia.org/wiki/Guillaume_de_Bohun",blason:true,cout:290,moral:3,desc:"%DEFENSE%: %INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE% &rarr; +1 <span class='dejaune'></span>%BR%%TROUPE%%HERE%: + %MASSE%"},
        {nom:"Jean de Lancastre",f:'P',a3:[270,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[blanc],defense:[jaune,jaune,blanc_blancbouclier],riposte:ftrue,pdv:2,commandement:[AA,1],maj:4,dates:[1403,1435],source:"https://fr.wikipedia.org/wiki/Jean_de_Lancastre",blason:true,cout:270,moral:3,desc:"+X %CARTELEGENDE% &rarr; +1 %CARTELEGENDE%"},
        {nom:"Jean de Lancastre",pdf:true,niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[jaune,jaune,blanc_blancbouclier],ralliement:true,riposte:ftrue,pdv:2,commandement:[1,1],dates:[1403,1435],source:"https://fr.wikipedia.org/wiki/Jean_de_Lancastre",blason:true, desc:"%MONTOUR%: %GRIS%/%VERT%/%BLEU%/%JAUNE% &rarr; %GRIS%/%VERT%/%BLEU%/%JAUNE%"},
        {nom:"Jean de Lancastre",pdf:true,niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,jaune],defense:[noir,noir],pdv:2,ralliement:true,modattaque:annule1touche,riposte:ftrue,commandement:[1,2],dates:[1403,1435],source:"https://fr.wikipedia.org/wiki/Jean_de_Lancastre",blason:true,moral:3,desc:"%MELEE%: <span class='facenoir bouclier'></span> / <span class='facejaune vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Sir John Jouel",a1:[205,3,PERSONNAGE,1,2],a2:[205,3,PERSONNAGE,1,2],f:'H',pdf:true,faction:ANGLAIS,type:INFANTERIE,melee:[blanc_blanctouche,blanc_blanctouche],defense:[blanc,noir],gardeducorps:true,pdv:2,commandement:[AA,1],dates:[1353,1374],source:"https://fr.wikipedia.org/wiki/Bataille_de_Cocherel",cout:205,moral:3},
        {nom:"John Talbot",f:'CSY',a3:[330,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir],charge:true,feinte:ftrue,pdv:2,commandement:[1,1],maj:3,dates:[1404,1453],source:"https://fr.wikipedia.org/wiki/John_Talbot_(1er_comte_de_Shrewsbury)",blason:true,cout:330,moral:3,desc:"%TROUPE%%HERE%: + %CHARGE%"},
        {nom:"John Talbot",pdf:true,niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],feinte:ftrue,parade:ftrue,charge:true,pdv:4,commandement:[1,3],dates:[1404,1453],source:"https://fr.wikipedia.org/wiki/John_Talbot_(1er_comte_de_Shrewsbury)",blason:true,moral:3,desc:"%MONTOUR%: +1 %GRIS%"},
        {nom:"John Talbot",pdf:true,niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,terreur:1,pdv:3,commandement:[1,2],dates:[1404,1453],source:"https://fr.wikipedia.org/wiki/John_Talbot_(1er_comte_de_Shrewsbury)",blason:true,moral:3,desc:"%ONCEINGAME%: +2 Chiens de guerre%HERE%%BR% Chiens de guerre%HERE%: + %CHARGE%"},
        {nom:"Comte de Suffolk",f:'G',a1:[190,3,PERSONNAGE,1,2],a3:[260,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[blanc,blanc],ralliement:true,pdv:2,maj:3,commandement:[AA,1],dates:[1337,1369],source:"https://fr.wikipedia.org/wiki/Robert_d%27Ufford",blason:true,cout:260,moral:3, desc:"%ACTIVATED%%XP% %TOURCOND%: %RALLIE% %TROUPE%%HERE%"},
        {nom:"Comte de Suffolk",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[blanc,blanc],survie:true,pdv:2,commandement:[1,2],dates:[1337,1369],source:"https://fr.wikipedia.org/wiki/Robert_d%27Ufford", blason:true,moral:3,desc:"%TROUPE%%HERE%: + %COHESION%"},
        {nom:"Comte de Salisbury",f:'CSY',a1:[260,2,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[noir],ralliement:true,survie:true,pdv:2,maj:4,commandement:[1,1],dates:[1344,1397,1414,1428],source:"https://fr.wikipedia.org/wiki/William_Montagu_(2e_comte_de_Salisbury) https://fr.wikipedia.org/wiki/Thomas_Montaigu",blason:true,desc:"1 Archers%HERE%%TIRCLOCHE%: +1 <span class='derouge'></span>%BR%%MELEE%: <span class='facerouge vierge'></span> /  <span class='facejaune vierge'></span> &rarr; %XP%"},
        {nom:"Comte de Salisbury",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[rouge,noir],riposte:ftrue,survie:true,visee:true,pdv:3,commandement:[1,2],dates:[1344,1397,1414,1428],source:"https://fr.wikipedia.org/wiki/William_Montagu_(2e_comte_de_Salisbury) https://fr.wikipedia.org/wiki/Thomas_Montaigu",blason:true,desc:"1 Archers%HERE%%TIRCLOCHE%: +1 <span class='derouge'></span>%BR%%LEGENDE% %ACTIVATED%%TOURCOND%: + %CELERITE% 2"},
        {nom:"Comte d'Arundel",f:'CAR',a1:[265,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir,jaune],riposte:ftrue,pdv:2,maj:3,commandement:[1,1],dates:[1313,1376],source:"https://fr.wikipedia.org/wiki/Richard_FitzAlan_(3e_comte_d%27Arundel)",blason:true,cout:265,moral:3,desc:"%SPECIAL%%TOURCOND%: %MOVE% %THIS% %HEREANDTHEREHEXA%"},
        {nom:"Comte d'Arundel",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],genie:true,pdv:3,commandement:[1,3],dates:[1313,1376],source:"https://fr.wikipedia.org/wiki/Richard_FitzAlan_(3e_comte_d%27Arundel)",blason:true,moral:3,desc:"%ACTIVATED%%TOURCOND%: %MOVE% %THIS% %HEREANDTHEREHEXA%"},
        {nom:"Comte d'Oxford",f:'C',a2:[290,5,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[blanc,rouge],charge:true,riposte:ftrue,pdv:3,maj:4,commandement:[1,2],dates:[1331,1360,1400,1417],source:"http://www.luminarium.org/encyclopedia/devere7.htm https://fr.wikipedia.org/wiki/Richard_de_Vere",blason:true,desc:"%MELEE%: %INFANTERIE%%INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE% &rarr; +1 <span class='deblanc'></span>"},
        {nom:"Comte d'Oxford",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[rouge,blanc,blanc],charge:true,riposte:ftrue,terreur:1,pdv:3,commandement:[1,2],dates:[1331,1360,1400,1417],source:"http://www.luminarium.org/encyclopedia/devere7.htm https://fr.wikipedia.org/wiki/Richard_de_Vere",blason:true,desc:"%MELEE%: %INFANTERIE%%INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE% &rarr; +1 <span class='derouge'></span>%BR%%DEFENSE%, %NOPLAIN%: %TOUCHE% &rarr; %RECUL%" },
        {nom:"Comte de Warwick",a2:[250,5,PERSONNAGE,1,2],f:'CWW',pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir],charge:true,pourfendeur:true,pdv:3,maj:4,commandement:[1,2],dates:[1329,1369],source:"https://fr.wikipedia.org/wiki/Thomas_Beauchamp_(11e_comte_de_Warwick)",blason:true,desc:"%ACTIVATED%%TOURCOND% %XP%: %INFANTERIE%<span class='troupe combat-cond'></span>%HERE% + %CELERITE% 2"},
        {nom:"Comte de Warwick",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir,blanc],defense:[rouge,noir],charge:true,parade:ftrue,gardeducorps:true,pdv:4,commandement:[1,3],dates:[1329,1369],source:"https://fr.wikipedia.org/wiki/Thomas_Beauchamp_(11e_comte_de_Warwick)",blason:true,desc:"%ACTIVATED%%TOURCOND% %XP%: %INFANTERIE%<span class='troupe combat-cond'></span>%HERE% + %CELERITE% 2%BR%%MONTOUR% %LEGENDE%: + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>" },
        {nom:"John de la Pôle",f:'C',a3:[275,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[blanc,noir],genie:true,pdv:2,maj:3,commandement:[AA,1],dates:[1423,1428],source:"https://fr.wikipedia.org/wiki/Bataille_de_la_Brossini%C3%A8re#John_de_la_Pole",blason:true,moral:3,cout:275,modattaque:transformetoucherecul},/* TODO: n'existe pas ?*/
        {nom:"John de la Pôle",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[blanc,jaune],ralliement:true,pdv:3,commandement:[1,1],dates:[1423,1428],source:"https://fr.wikipedia.org/wiki/Bataille_de_la_Brossini%C3%A8re#John_de_la_Pole",blason:true,moral:3,desc:"%MELEE%: %BOUCLIER% &rarr; %LEGENDE% %CARTELEGENDE%"},
        {nom:"William de la Pôle",pdf:true,niv:1,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,jaune],defense:[noir],charge:true,maj:3,commandement:[AA,1],dates:[1415,1450],source:"https://fr.wikipedia.org/wiki/William_de_la_Pole",blason:true,modattaque:transformetoucherecul},
        {nom:"William de la Pôle",pdf:true,niv:2,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],charge:true,pdv:2,commandement:[1,1],dates:[1415,1450],source:"https://fr.wikipedia.org/wiki/William_de_la_Pole",blason:true,desc:"1 Archers dans cet hexagone %TIRCLOCHE%: +1 <span class='derouge'></span>"},
        {nom:"Le Prince Noir",pdf:true,niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,terreur:1,pdv:3,commandement:[1,2],dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:4,desc:"%MONTOUR%: +1 %BLEU%%BR%%ACTIVATED%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Le Prince Noir",pdf:true,niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir],cruel:true,terreur:2,pdv:3,commandement:[1,2],dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:4,desc:"au début de votre tour, %ROLL% 1 <span class='denoir'></span>: <span class='facenoir touche'></span> &rarr; -1 %LEGENDE% %ADVERSAIRE%%BR%%ACTIVATED% %XP%%XP%: +2 %CARTELEGENDE%"},
        {nom:"Le Prince Noir",a1:[300,4,PERSONNAGE,1,2],f:'PN',pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charisme:true,terreur:1,pdv:2,commandement:[1,1],maj:5,dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:4,cout:300,desc:"%CAVALERIE%<span class='troupe combat-cond'></span>%HERE%: + %CELERITE% 2%BR%%ACTIVATED%: %MOVE% %RALLIEMENT%"},
        {nom:"Thomas de Scales",f:'TdS',a3:[210,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:CAVALERIE,melee:[rouge],defense:[noir],relance:true,gardeducorps:true,pdv:2,maj:3,dates:[1419,1460],source:"https://fr.wikipedia.org/wiki/Thomas_de_Scales",blason:true,cout:210,moral:3,desc:"%PERSONNAGE%%HERE%: + %ESQUIVE%"},
        {nom:"Thomas de Scales",pdf:true,niv:2,faction:ANGLAIS,type:CAVALERIE,melee:[rouge],defense:[noir,noir],pourfendeur:true,riposte:ftrue,pdv:3,commandement:[1,1],dates:[1419,1460],source:"https://fr.wikipedia.org/wiki/Thomas_de_Scales",blason:true,desc:"une fois pendant votre tour, %POURSUITE%: +1 %MELEE%"},
        {nom:"Edouard III",f:'B',a1:[385,5,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir,noir],charisme:true,priere:true,pdv:2,maj:4,commandement:[2,2],dates:[1327,1377],source:"https://fr.wikipedia.org/wiki/%C3%89douard_III",blason:true,cout:385,moral:5, desc:"%CAMP%: %RALLIE%<span class='troupe combat-cond'></span>%BR%%ACTIVATED%: 1 Archers situés à 2 zones + %MELEE%"},
        {nom:"Edouard III",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir,noir],charisme:true,ralliement:true,soin:true,pdv:2,commandement:[2,3],dates:[1327,1377],source:"https://fr.wikipedia.org/wiki/%C3%89douard_III",blason:true,moral:5,desc:"%CAMP%: %RALLIE%<span class='troupe combat-cond'></span>%BR%%ACTIVATED% %LEGENDE%%LEGENDE%%ROUNDCOND%: %GRIS% &rarr; %JAUNE%"},
        {nom:"Henry V",pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[blanc,blanc],feinte:ftrue,riposte:ftrue,pdv:3,maj:4,commandement:[1,2],dates:[1410,1422],source:"https://fr.wikipedia.org/wiki/Henri_V_(roi_d%27Angleterre)",blason:true,desc:"%MONTOUR% %XP%%LEGENDE%: %BLEU%%BR%%MELEE%: <span class='facejaune bouclier'></span> / <span class='facenoir bouclier'></span> &rarr; %XP%"},
        {nom:"Henry V",pdf:true,niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[noir],visee:true,genie:true,pdv:2,commandement:[2,2],dates:[1410,1422],source:"https://fr.wikipedia.org/wiki/Henri_V_(roi_d%27Angleterre)",blason:true,desc:"%BLEU%%ROUNDCOND%: vous pouvez jouer  %BLEU% à la suite%BR%%MONTOUR%: %MOVE% %THIS% vers une zone adjacente"},
        {nom:"Henry V",pdf:true,niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir,noir],visee:true,genie:true,charge:true,pdv:3,commandement:[3,3],dates:[1410,1422],source:"https://fr.wikipedia.org/wiki/Henri_V_(roi_d%27Angleterre)",blason:true,desc:"<span class='blason-large mal'></span>%HERE%: + %CHARGE%%BR%%MONTOUR%: +1 %BLEU%"},
        // Le meme que le francais
        {nom:"Héros monté",a3:[200,3,PERSONNAGE,1,2],a2:[210,3,PERSONNAGE,1,2],a1:[200,3,PERSONNAGE,1,2],niv:1,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[AA,1],maj:3},    
        {nom:"Héros monté",niv:2,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[1,1]},    
        {nom:"Espion",pdf:true,faction:ANGLAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[noir,jaune],pdv:2,esquive:true,parade:ftrue,desc:"%THIS% peut emprunter un Passage secret sans dépenser de jeton"},    
        {nom:"Assassin",pdf:true,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir],pdv:2,riposte:ftrue,feinte:ftrue, enleve1d:true,desc:"%REVEALED%, %MELEE%: +1 <span class='derouge'></span>"},
        {nom:"Jean II de Luxembourg",pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,blanc],defense:[blanc],mercenaire:true,charisme:true,pdv:2,maj:3,commandement:[AA,1],dates:[1414,1441],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Luxembourg-Ligny",blason:true,desc:"%DEFENSE%: pas d'unité%HERE% &rarr; +1 <span class='deblanc'></span>"},
        {nom:"Jean II de Luxembourg",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,blanc],defense:[blanc,jaune],charisme:true,mercenaire:true,pdv:2,commandement:[AA,1],dates:[1414,1441],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Luxembourg-Ligny",blason:true,desc:"%DEFENSE%:  si %THIS% ne peut se déplacer dans une zone adjacente à la suite d'un %RECUL%, annulez ce %RECUL%"},
        {nom:"Archange saint Michel",pb:[620,8,PERSONNAGE,1,2],f:'ASM',niv:1,faction:BIEN,type:VOLANT,melee:[rouge,rouge,rouge,blanc],defense:[noir,blanc,blanc],pdv:6,pourfendeur:true,saut:2,riposte:ftrue,tir:[rouge,rouge],typetir:TENDU,portee:2,commandement:[AA,2],maj:5,dates:[1409,1409],desc:"%MELEE%: %LEGENDE% &rarr; +1 <span class='derouge'></span>"},    
        {nom:"Archange saint Michel",niv:2,faction:BIEN,type:VOLANT,melee:[rouge,rouge,rouge,blanc,blanc],defense:[noir,blanc,blanc],pdv:6,pourfendeur:true,saut:2,riposte:ftrue,commandement:[AA,3],dates:[1409,1409],desc:"%ACTIVATED%%TOURCOND% %XP%: +1 %BLEU%%BR%%MELEE%: %LEGENDE% &rarr; +1 <span class='derouge'></span>"},    
        {nom:"Cola di Renzo",f:'C',b2:[195,3,PERSONNAGE,1,2],faction:BIEN,type:INFANTERIE,melee:[rouge],defense:[jaune_blancbouclier,jaune_blancbouclier],pdv:2,pourfendeur:true,ralliement:true,commandement:[AA,2]},    
        {nom:"La Grande Faucheuse",f:'LGF',m2:[480,1,PERSONNAGE,1,2],pdf:true,faction:MERCENAIRE,type:VOLANT,melee:[rouge,blanc_blanctue,blanc_blanctue], defense:[noir],pdv:4,immortel:true,terreur:2,survie:true,commandement:[AA,4],desc:"%CAMP% %LEGENDE%: choisissez une unité, %ROLL% le dé du destin, %MORT% / %RETARDE% &rarr; %MORT%"},    
        {nom:"Le Prince Noir",pdf:true,acheval:true,niv:2,subfaction:BIEN,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge,jaune],defense:[noir],charge:true,celerite:2,pdv:4,commandement:[1,2],dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:5,desc:"%MONTOUR%: +3 %CARTELEGENDE%, %DEFAUSSEZEN% 2%BR%%MONTOUR% %LEGENDE%: %GRIS% &rarr; %VERT%"},
        {nom:"Le Prince Noir",pdf:true,acheval:true,niv:2,subfaction:MAL,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge,rouge,jaune],defense:[noir],charge:true,feinte:ftrue,pdv:3,commandement:[AA,3],dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:5,desc:"%ACTIVATED% %LEGENDE%: <span class='commandement'><span style='color:black;text-shadow:1px 1px;'>3</span>&nbsp;&nbsp;6</span>%BR%le trait %VISEE% ne peut pas être utilisé contre %THIS%"},
        {nom:"Le Prince Noir",a1:[435,5,PERSONNAGE,1,2],f:'PN',pdf:true,acheval:true,niv:1,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge,blanc],defense:[noir],charge:true,ralliement:true,celerite:2,pdv:3,commandement:[1,1],maj:5,dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:5,cout:435,desc:"%CAVALERIE%%HERE%: + %CELERITE% 2%BR%%MELEE%: <span class='faceblanc bouclier'></span> &rarr; %LEGENDE%"},
        {nom:"Captal de Buch",a1:[285,3,PERSONNAGE,1,2],f:'G',pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,charge:true,commandement:[1,2],maj:4,dates:[1348,1372],source:"https://fr.wikipedia.org/wiki/Jean_de_Grailly",blason:true,moral:3,cout:285,desc:"%ACTIVATED% %LEGENDE%%TOURCOND%: + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span> / <span class='commandement'><span style='color:black;text-shadow:1px 1px;'>1</span></span>"},    
        {nom:"Captal de Buch",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir,rouge],pdv:3,charge:true,visee:true,commandement:[2,2],dates:[1348,1376],source:"https://fr.wikipedia.org/wiki/Jean_de_Grailly",blason:true,moral:3,desc:"%ACTIVATED%%TOURCOND% %LEGENDE% : + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span> / <span class='commandement'><span style='color:black;text-shadow:1px 1px;'>1</span></span>%BR%%ACTIONPLAYER%%TOURCOND% %XP%: +1 %BLEU%"},    
        {nom:"Thomas Montagu",f:'G',a3:[370,5,PERSONNAGE,1,2],faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge,blanc],defense:[noir],pdv:2,genie:true,charisme:true,commandement:[AA,3],dates:[1414,1428],source:"https://fr.wikipedia.org/wiki/Thomas_Montaigu",blason:true,desc:"%MONTOUR% %XP%%LEGENDE% : %CARTERIVIERE%%BR%%MONTOUR% %XP%%XP%: +1 %JAUNE%"},    
        {nom:"John Chandos",pdf:true,niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[rouge,rouge,rouge],pdv:3,riposte:ftrue,survie:true,commandement:[1,2],dates:[1339,1370],source:"https://fr.wikipedia.org/wiki/John_Chandos",blason:true,moral:3,desc:"%CONSEIL%: +1 %GRIS%, +1 %XP%"},    
        {nom:"John Chandos",pdf:true,niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[noir,noir,noir],defense:[noir],pdv:4,pourfendeur:true,gardeducorps:true,commandement:[AA,3],dates:[1339,1370],source:"https://fr.wikipedia.org/wiki/John_Chandos",bonusattaque:untouchetue,blason:true,moral:3,desc:"%MONTOUR%: +1 %GRIS%"},
        {nom:"John Chandos",a1:[290,3,PERSONNAGE,1,2],f:'G',pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[rouge],pdv:2,riposte:ftrue,mercenaire:true,commandement:[AA,1],maj:2,dates:[1339,1370],source:"https://fr.wikipedia.org/wiki/John_Chandos",blason:true,moral:3,cout:290,desc:"%CONSEIL%: +1 %CARTELEGENDE%"},
        {nom:"Simon Morhier",f:'C',a3:[195,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,genie:true,maj:2,dates:[1422,1429],source:"https://fr.wikipedia.org/wiki/Simon_Morhier",cout:195,moral:3,desc:"%INFANTERIE%<span class='troupe combat-cond'></span>%HERE%%MELEE%: +1 <span class='deblanc'></span>"},    
        {nom:"Simon Morhier",pdf:true,niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir,noir],pdv:2,genie:true,parade:ftrue,commandement:[AA,1],dates:[1422,1429],source:"https://fr.wikipedia.org/wiki/Simon_Morhier",desc:"%INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE%%MELEE%: +1 <span class='deblanc'></span>"},    
        {nom:"John Fastolf",pdf:true,niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge_recultouche,rouge_recultouche],defense:[noir],pdv:2,riposte:ftrue,charge:true,commandement:[1,2],dates:[1410,1459],source:"https://fr.wikipedia.org/wiki/John_Fastolf",blason:true,desc:"%ACTIVATED% %XP%: %MOVE% 1 %CAVALERIE% alliée d'une zone"},    
        {nom:"John Fastolf",pdf:true,niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:3,cruel:true,parade:ftrue,commandement:[2,1],dates:[1410,1459],source:"https://fr.wikipedia.org/wiki/John_Fastolf",blason:true,desc:"%DEFENSE%: %TOUCHE% &rarr; %RECUL%, vous pouvez l'affecter à une autre de vos unités%HEREANDTHERE%"},
        {nom:"John Fastolf",f:'H',a3:[260,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[jaune,jaune],pdv:2,riposte:ftrue,esquive:true,commandement:[AA,1],maj:3,dates:[1410,1459],source:"https://fr.wikipedia.org/wiki/John_Fastolf",blason:true,desc:"%DEFENSE%: %RECUL% &rarr; vous pouvez déplacer %THIS% jusqu'à 2 zones"},
        {nom:"Jean Stuart de Derneley",f:'JSD',e1:[320,4,PERSONNAGE,1,2],pdf:true,niv:1,faction:ECOSSAIS,type:INFANTERIE,melee:[noir,noir],defense:[noir],pdv:2,impetueux:true,charge:true,feinte:ftrue,maj:2,commandement:[AA,1],dates:[1421,1429],source:"https://fr.wikipedia.org/wiki/John_Stuart_de_Darnley",blason:true,cout:320,moral:4,desc:"%MELEE%: %MORT% &rarr; reprenez le jeton de relance si vous ne l'avez plus"},
        {nom:"Jean Stuart de Derneley",pdf:true,niv:2,faction:ECOSSAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir],pdv:3,feinte:ftrue,charge:true,modattaque:annule1recul,commandement:[AA,2],dates:[1421,1429],source:"https://fr.wikipedia.org/wiki/John_Stuart_de_Darnley",blason:true,moral:4,desc:"%MELEE%: %MORT% &rarr; reprenez le jeton de relance si vous ne l'avez plus%BR%%POURSUITE%: +1 %LEGENDE%"},    
        {nom:"William Wallace",f:'WWC',e1:[250,3,PERSONNAGE,1,2],pdf:true,niv:2,subfaction:BIEN,faction:ECOSSAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[blanc,jaune],pdv:2,impetueux:true,charge:true,commandement:[1,3],dates:[1296,1305],source:"https://fr.wikipedia.org/wiki/William_Wallace",blason:true,moral:3,desc:"%POURSUITE%%ROUNDCOND%: +1 %MELEE%%BR%%DEFENSE%: %RECUL% &rarr; %CHOOSERECUL%"},    
        {nom:"William Wallace",pdf:true,niv:1,faction:ECOSSAIS,type:INFANTERIE,melee:[blanc,jaune],defense:[blanc],pdv:2,relance:true,charge:true,commandement:[1,2],maj:2,dates:[1296,1305],source:"https://fr.wikipedia.org/wiki/William_Wallace",blason:true,moral:3,cout:250,desc:"%ACTIVATED%%TOURCOND% %TROUPE%%THERE%: + Charge%BR%%ACTIVATED%%ROUNDCOND%: %CHOOSEZONE%%THERE% &rarr; %1ORDERTOACTIVATE%"},    
        {nom:"William Wallace",pdf:true,niv:2,subfaction:MAL,faction:ECOSSAIS,type:INFANTERIE,melee:[noir],defense:[rouge,noir],pdv:2,charge:true,impetueux:true,commandement:[AA,2],dates:[1296,1305],source:"https://fr.wikipedia.org/wiki/William_Wallace",blason:true,cout:250,desc:"%POURSUITE%%ROUNDCOND%: +1 %MELEE%%BR%%MELEE%: <span class='facenoir bouclier'></span> &rarr; %BONUSMOVE% / %XP%"},
        {nom:"Jean Stuart de Buchan",f:'B',e1:[300,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:ECOSSAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir],commandement:[AA,1],pdv:2,feinte:ftrue,charge:true,maj:4,dates:[1404,1424],source:"https://fr.wikipedia.org/wiki/John_Stuart_(3e_comte_de_Buchan)",blason:true,cout:300,moral:3,desc:"%TROUPE%%TROUPE%<span class='combat-cond tirtendu'></span><span class='combat-cond tircloche'></span>%HERE%: +1 <span class='dejaune'></span>"},    
        {nom:"Jean Stuart de Buchan",pdf:true,niv:2,faction:ECOSSAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,genie:true,ralliement:true,modattaque:annule1recul,commandement:[1,2],dates:[1404,1424],source:"https://fr.wikipedia.org/wiki/John_Stuart_(3e_comte_de_Buchan)",blason:true,moral:3,desc:"%TROUPE%%TROUPE%<span class='combat-cond tirtendu'></span><span class='combat-cond tircloche'>%HERE%: +1 <span class='dejaune'></span>"},    
        {nom:"Arnaud Amanieu d'Albret",pdf:true,faction:MERCENAIRE,type:INFANTERIE,melee:[noir,jaune],defense:[noir],pdv:2,mercenaire:true,ralliement:true,parade:ftrue,commandement:[1,1],dates:[1351,1401],source:"https://fr.wikipedia.org/wiki/Arnaud-Amanieu_d%27Albret",blason:true,desc:"%MELEE%: %BOUCLIER% &rarr; %BONUSMOVE%%BR%%LEGENDE% %ACTIVATED%%ROUNDCOND%: + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>"}, 
        {nom:"Arnaud de Cervole",pdf:true,faction:MERCENAIRE,type:INFANTERIE,melee:[rouge,blanc],defense:[noir,rouge],pdv:3,mercenaire:true,charge:true,riposte:ftrue,priere:true,commandement:[1,2],dates:[1351,1366],source:"https://fr.wikipedia.org/wiki/Arnaud_de_Cervole",blason:true,desc:"aucun %BLEU% ne peut être joué par un adversaire dans une zone adjacente à %THIS%"}, 
        {nom:"John Hawkwood",pdf:true,faction:MERCENAIRE,type:INFANTERIE,melee:[noir_bouclierrecule],defense:[blanc],pdv:2,mercenaire:true,feinte:ftrue,commandement:[1,2],dates:[1342,1394],source:"https://fr.wikipedia.org/wiki/John_Hawkwood",blason:true,desc:"%ACTIVATED%%ROUNDCOND% %XP%: +1 %BLEU%"}, 
        {nom:"Seguin de Badefol",pdf:true,faction:MERCENAIRE,type:INFANTERIE,melee:[noir,blanc],defense:[blanc],pdv:3,mercenaire:true,cruel:true,genie:true,parade:ftrue,commandement:[AA,1],dates:[1350,1366],source:"https://fr.wikipedia.org/wiki/Seguin_de_Badefol",desc:"%ACTIVATED% %LEGENDE%%ROUNDCOND%: +2 %CARTELEGENDE%, %DEFAUSSEZEN% 1%BR%%ACTIVATED%%TOURCOND%:  réduisez le coût d'une %CARTELEGENDE%"}, 
        {nom:"Robert Knolles",pdf:true,faction:MERCENAIRE,type:INFANTERIE,melee:[rouge,jaune],defense:[noir,blanc],pdv:3,mercenaire:true,cruel:true,charge:true,commandement:[1,1],dates:[1351,1407],source:"https://fr.wikipedia.org/wiki/Robert_Knolles",blason:true,desc:"%MELEE%:%MORT% &rarr; %XP%"},
        {nom:"Petit Meschin",pdf:true,faction:MERCENAIRE,type:INFANTERIE,melee:[rouge_bouclierrecule,blanc_bouclierrecule],defense:[noir,rouge],pdv:3,mercenaire:true,riposte:ftrue,charge:true,gardeducorps:true,commandement:[1,2],dates:[1362,1369],source:"https://fr.wikipedia.org/wiki/Chefs_routiers_c%C3%A9l%C3%A8bres#Le_Petit_Meschin",desc:"%ACTIVATED%%TOURCOND%:  réduisez le coût d'une %CARTELEGENDE%"},
        {nom:"Claude de Chastellux",faction:BOURGUIGNON,type:INFANTERIE,melee:[noir,blanc],defense:[noir,jaune],pdv:2,immortel:true,esquive:true,commandement:[1,1],dates:[1409,1453],source:"https://fr.wikipedia.org/wiki/Claude_de_Chastellux",blason:true,desc:"%DEFENSE%: <span class='facenoir vierge'></span> / <span class='facejaune vierge'></span>&rarr; %LEGENDE%"},
        {nom:"Jean de Brimeu",pdf:true,faction:BOURGUIGNON,type:INFANTERIE,melee:[rouge],defense:[blanc,noir],pdv:2,charge:true,modattaque:annule1recul,commandement:[AA,2],dates:[1388,1415],source:"https://www.pagedhistoire.com/bataille/1/Azincourt.php",desc:"une unité adjacente %DEFENSE%: -1 <span class='recul'></span>"},
        {nom:"Jean de Murs",f:'JDM',b2:[110,3,PERSONNAGE,1,2],faction:BIEN,type:INFANTERIE,civil:true,genie:true,desc:"lorsque %THIS% est dans un bâtiment, ce dernier gagne 1 point de résistance%BR%%LEGEND%%ROUNDCOND%: choisissez %CARTELEGENDE%"},
        {nom:"Jean de Toulongeon",niv:2,faction:BOURGUIGNON,type:INFANTERIE,melee:[noir,blanc],defense:[rouge,noir],pdv:3,riposte:ftrue,ralliement:true,commandement:[2,3],dates:[1395,1427],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Toulongeon",blason:true,desc:"%MELEE%: 1+ %MORT% &rarr; 2 %CARTELEGENDE%%BR%Compte comme 1 unité pour toutes les unités dans sa zone dotées de Masse"},
        {nom:"Jean de Toulongeon",niv:1,faction:BOURGUIGNON,type:INFANTERIE,melee:[noir],defense:[rouge,noir],pdv:2,riposte:ftrue,ralliement:true,commandement:[1,2],maj:4,dates:[1395,1427],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Toulongeon",blason:true,desc:"%MELEE%: 1+ %MORT% &rarr; %CARTELEGENDE%%BR%Compte comme 1 unité pour toutes les unités dans sa zone dotées de Masse"},
        {nom:"Héros",faction:BOURGUIGNON,type:INFANTERIE,melee:[rouge,blanc],defense:[blanc],charge:true,survie:true,modattaque:annule1recul,pdv:2},
        {nom:"Jean de Croy",pdf:true,faction:BOURGUIGNON,type:INFANTERIE,melee:[blanc,blanc],defense:[blanc,jaune],riposte:ftrue,pdv:2,commandement:[AA,1],dates:[1380,1415],source:"https://fr.wikipedia.org/wiki/Jean_Ier_de_Cro%C3%BF",blason:true, desc:"%DEFENSE%: <span class='faceblanc vierge'></span> / <span class='facejaune vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Lala Sahin Pacha",o1:[325,4,PERSONNAGE,1,2],f:'LL',niv:1,faction:OTTOMAN,type:INFANTERIE,melee:[rouge,jaune],defense:[noir_toucherecule],celerite:2,ralliement:true,pdv:2,commandement:[1,2],maj:5,dates:[1360,1388],source:"https://en.wikipedia.org/wiki/Lala_%C5%9Eahin_Pasha",desc:"%ACTIVATED%: %LEGENDE% &rarr; + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>"},
        {nom:"Lala Sahin Pacha",niv:2,faction:OTTOMAN,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],celerite:2,ralliement:true,terreur:1,pdv:3,commandement:[2,2],dates:[1360,1388],source:"https://en.wikipedia.org/wiki/Lala_%C5%9Eahin_Pasha",desc:"%ACTIVATED%%TOURCOND% %LEGENDE%: %GRIS% &rarr; %JAUNE%/%BLEU%%BR%%BLEU%%HERE%%ROUNDCOND%: vous pouvez jouer  %BLEU%%HERE% à la suite"},
        {nom:"Yildirim Bayezid",f:'Y',o1:[415,4,PERSONNAGE,1,2],niv:1,faction:OTTOMAN,type:INFANTERIE,melee:[rouge_bouclierrecule,noir_bouclierrecule],defense:[noir,noir],celerite:2,charge:true,cruel:true,pdv:3,commandement:[AA,3],maj:6,dates:[1389,1402],source:"https://fr.wikipedia.org/wiki/Bajazet_Ier",desc:"%MONTOUR% %LEGENDE%%LEGENDE%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Yildirim Bayezid",niv:2,faction:OTTOMAN,type:INFANTERIE,melee:[rouge_bouclierrecule,rouge_bouclierrecule,noir_bouclierrecule],defense:[noir,noir],celerite:2,charge:true,cruel:true,pdv:4,commandement:[1,3],dates:[1389,1402],source:"https://fr.wikipedia.org/wiki/Bajazet_Ier",desc:"%MONTOUR% %XP%: %TROUPE%%HERE% + Célérité 2"},
        {nom:"Mehmet II",f:'M2',o1:[285,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:OTTOMAN,type:INFANTERIE,melee:[noir],defense:[noir,blanc],relance:true,priere:true,ralliement:true,pdv:2,commandement:[1,1],maj:4,dates:[1444,1481],source:"https://fr.wikipedia.org/wiki/Mehmed_II"},
        {nom:"Mehmet II",pdf:true,niv:2,faction:OTTOMAN,type:INFANTERIE,melee:[rouge],defense:[noir,blanc],priere:true,relance:true,ralliement:true,pdv:2,commandement:[1,2],dates:[1444,1481],source:"https://fr.wikipedia.org/wiki/Mehmed_II",desc:"%ACTIVATED%%ROUNDCOND% %XP%: +1 %GRIS%%BR%%XP%%ACTIVATED%%ROUNDCOND%: +1 %GRIS%"},
        {nom:"Mehmet le Conquérant",f:'M2C',o1:[550,6,PERSONNAGE,1,2],pdf:true,faction:OTTOMAN,type:VOLANT,melee:[rouge,noir,jaune,jaune],defense:[noir,noir],grand:true,celerite:2,terreur:2,ignifuge:true,pdv:6,commandement:[2,2],dates:[1453,1481],source:"https://fr.wikipedia.org/wiki/Mehmed_II", desc:"%MELEE%: <span class='facerouge vierge'></span> / <span class='facenoir vierge'></span> / <span class='facejaune vierge'></span> &rarr; %INCENDIE%<span class='melee combat-cond'></span>"},
        {nom:"Radu III le Beau",pdf:true,niv:1,faction:VALAQUE,type:INFANTERIE,melee:[blanc],defense:[blanc],charisme:true,pdv:2,commandement:[1,1],maj:2,dates:[1462,1475],source:"https://fr.wikipedia.org/wiki/Radu_III_le_Beau",blason:true,desc:"%MELEE%: 1+ %BOUCLIER% &rarr; %BONUSMOVE%"},
        {nom:"Radu III le Beau",pdf:true,niv:2,faction:VALAQUE,type:INFANTERIE,melee:[blanc,blanc],defense:[noir],charisme:true,feinte:ftrue,pdv:2,commandement:[1,1],dates:[1462,1475],source:"https://fr.wikipedia.org/wiki/Radu_III_le_Beau",blason:true,desc:"%ACTIVATED% %XP%: %MOVE% une unité ennemie d'une zone"},
        {nom:"Vlad Tepes",pdf:true,niv:1,faction:VALAQUE,type:INFANTERIE,melee:[rouge],defense:[rouge,noir],celerite:2,feinte:ftrue,parade:ftrue,terreur:1,pdv:2,commandement:[1,1],modattaque:annule2recul,maj:4,dates:[1448,1476],source:"https://fr.wikipedia.org/wiki/Vlad_III_l%27Empaleur",desc:"%MELEE%: un des %RECUL% ne peut être annulé par %BOUCLIER%"},
        {nom:"Vlad Tepes",pdf:true,niv:2,faction:VALAQUE,type:INFANTERIE,melee:[rouge,noir],defense:[noir,blanc],celerite:2,terreur:1,feinte:ftrue,parade:ftrue,pdv:3,commandement:[3,2],dates:[1448,1476],source:"https://fr.wikipedia.org/wiki/Vlad_III_l%27Empaleur",desc:"%MELEE%: un des %RECUL% ne peut être annulé par %BOUCLIER%%BR%%ACTIVATED%%TOURCOND% %XP%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Sorcière des marais",pdf:true,niv:1,faction:MAL,type:INFANTERIE,melee:[blanc],defense:[noir,rouge],pdv:2,commandement:[1,1],maj:2,desc:"quand elle est dans une zone de marais, %THIS% ignore les effets de terrains liés aux marais et peut réaliser une action de mouvement vers n'importe quelle autre zone de marais du plateau de jeu%BR%%ACTIVATED%%TOURCOND% %LEGENDE%%LEGENDE%: posez ou déplacez un jeton Marais sur une zone qui n'est pas une zone de village"},
        {nom:"Sorcière des marais",pdf:true,niv:2,faction:MAL,type:INFANTERIE,melee:[blanc],defense:[noir,noir],pdv:3,commandement:[1,1],desc:"quand elle est dans une zone de marais, %THIS% ignore les effets de terrains liés aux marais et peut réaliser une action de mouvement vers n'importe quelle autre zone de marais du plateau de jeu%BR%%ACTIVATED%%TOURCOND% %LEGENDE%%LEGENDE%: posez ou déplacez un jeton Marais sur une zone qui n'est pas une zone de village"},
        {nom:"Sorcière de Sabbat",f:'SdS',m1:[340,3,PERSONNAGE,1,2],faction:MAL,type:VOLANT,melee:[rouge,rouge],defense:[noir],pdv:3,priere:true,saut:2,cruel:true,visee:true,desc:"%MONTOUR%: %TUE%%HERE% &rarr; +1 %LEGENDE%%BR%%TOUTTYPE%%HERE%: + Cruel"},
        {nom:"Sorcière",f:'SCR',m1:[145,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:MAL,type:INFANTERIE,melee:[jaune],defense:[jaune],esquive:true,commandement:[AA,1],maj:4,cout:145,moral:3,desc:"%MONTOUR%: +1 %CARTELEGENDE%"},
        {nom:"Sorcière",pdf:true,niv:2,faction:MAL,type:INFANTERIE,melee:[blanc],defense:[blanc],pdv:2,saut:2,moral:3,desc:"%MELEE%: <span class='faceblanc vierge'></span> &rarr; %LEGENDE%%BR%%ACTIVATED%: %ROLL% <span class='dejaune'></span>: <span class='facejaune vierge'></span>&rarr; -1 %LEGENDE% %ADVERSAIRE%"},
        {nom:"La Tarasque",f:'TRQ',m3:[475,8,PERSONNAGE,1,2],pdf:true,niv:1,faction:MAL,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir,noir],pdv:8,grand:true,riposte:ftrue,maj:4,dates:[1382,1382],source:"https://fr.wikipedia.org/wiki/Tarasque",desc:"%MELEE%: %BLESSURE% &rarr; +1 %BLESSURE%"},
        {nom:"La Tarasque",pdf:true,niv:2,postattaque:doubleblessure,faction:MAL,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir,noir],pdv:10,grand:true,terreur:1,dates:[1382,1382],source:"https://fr.wikipedia.org/wiki/Tarasque",desc:"%MELEE%: %BLESSURE% &rarr; +1 %BLESSURE%"},
        {nom:"Loup-garou",f:'LGU',m3:[145,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:MAL,type:INFANTERIE,melee:[jaune,jaune],defense:[noir],maj:4,desc:"%MONTOUR%: +1 %GRIS%"},
        {nom:"Loup-garou",pdf:true,niv:2,faction:MAL,type:INFANTERIE,melee:[noir,blanc],defense:[noir],celerite:2,pourfendeur:true,pdv:2,commandement:[1,1],desc:"%THIS% passe niveau 2: +1 Loups%HERE%"},
        {nom:"Magog",f:'MGG',m2:[430,7,PERSONNAGE,1,2],faction:MAL,type:INFANTERIE,melee:[rouge,rouge,noir,blanc],defense:[noir,noir,blanc],pdv:7,charge:true,grand:true,gardeducorps:true,pourfendeur:true,desc:"%ACTIVATED%%ROUNDCOND% %LEGENDE%:  1 unité ennemie%THERE% ne se déplace pas%BR%%CHOOSE% %PERSONNAGE%%THERE% %ROUNDCOND%: ce personnage n'attaque pas %THIS% durant le round &rarr; -1 %LEGENDE% / %XP%"},
        {nom:"Gog",f:'GOG',m2:[275,5,PERSONNAGE,1,2],faction:MAL,type:INFANTERIE,melee:[jaune,jaune,blanc],defense:[noir,jaune,blanc],pdv:5,grand:true,soin:true,cruel:true,legendaire:true,relance:true,desc:"%TOUTTYPE% ennemie à 1 hexagone: -1 <span class='deblanc'></span><span class='melee combat-cond'></span>"},
        {nom:"La Cocatrix",f:'CCX',m3:[350,5,PERSONNAGE,1,2],pdf:true,faction:MAL,type:VOLANT,tir:[jaune_blanctouche,jaune_blanctouche,blanc_blanctouche],defense:[blanc,blanc],portee:1,typetir:TENDU,pdv:5,grand:true,visee:true,terreur:1,desc:"%CONSEIL%: +1 %LEGENDE%"},
        {nom:"Dracula",f:'DRL',m2:[335,6,PERSONNAGE,1,2],pdf:true,niv:1,faction:MAL,type:INFANTERIE,melee:[rouge,rouge],defense:[rouge,noir],pdv:3,saut:2,terreur:1,commandement:[2,1],maj:5,desc:"%ACTIVATED% %LEGENDE% %ROUNDCOND%: + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>%BR%+1 %BLESSURE% &rarr; %LEGENDE% / %XP%"},
        {nom:"Dracula",pdf:true,niv:2,faction:MAL,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir,noir],pdv:4,saut:3,terreur:2,commandement:[3,1], desc:"%MELEE%: %MORT% &rarr; -1 %BLESSURE% à %THIS%%BR% %LEGENDE% %MELEE%: <span class='facerouge bouclier'></span>&rarr;<span class='facerouge tue'></span>"},
        {nom:"La Licorne",f:'LLI',b1:[250,4,PERSONNAGE,1,2],pdf:true,faction:BIEN,type:INFANTERIE,melee:[blanc,blanc],defense:[blanc,blanc],parade:ftrue,pdv:5,soin:true,celerite:2,legendaire:true,desc:"%MELEE% / %DEFENSE%: 1 <span class='faceblanc vierge'></span> &rarr;  <span class='faceblanc touche'></span>  / <span class='faceblanc bouclier'></span>  / <span class='faceblanc recul'></span>"},
        {nom:"L'Inquisiteur",f:'IQ',b3:[150,2,PERSONNAGE,1,2],b2:[185,3,PERSONNAGE,1,2],pdf:true,faction:BIEN,type:INFANTERIE,defense:[noir],pdv:2,priere:true,commandement:[2,1],desc:"%MONTOUR%: %ROLL% <span class='denoir'></span>: <span class='facenoir bouclier'></span> &rarr; prenez 1 %XP% / %LEGENDE% %ADVERSAIRE%%BR%%ACTIVATED% %LEGENDE%%LEGENDE%: +1 %RUMEUR%%BR%%THIS% peut seulement commander le Bourreau"},
        {nom:"Le Griffon",b1:[320,8,PERSONNAGE,1,2],f:'LGR',pdf:true,faction:BIEN,type:VOLANT,melee:[noir_bouclierrecule,jaune_bouclierrecule,blanc_bouclierrecule],defense:[blanc,blanc],pdv:4,grand:true,saut:2,feinte:ftrue,pourfendeur:true,charge:true,desc:"%THIS% peut utiliser le trait charge à partir d'un hexagone de ciel"},
        {nom:"Archange Gabriel",pb:[260,2,PERSONNAGE,1,2],f:'AGL',pdf:true,niv:1,faction:BIEN,type:VOLANT,melee:[rouge,rouge,rouge],defense:[noir,noir],pdv:6,saut:2,gardeducorps:true,commandement:[1,1],maj:4,desc:"%MELEE%: %BOUCLIER% &rarr; %BONUSMOVE%"},
        {nom:"Archange Gabriel",pdf:true,niv:2,faction:BIEN,type:VOLANT,melee:[rouge,rouge,rouge,noir],defense:[noir,noir],pdv:6,saut:2,transport:true,gardeducorps:true,commandement:[2,2],desc:"%MELEE%: %BOUCLIER% &rarr; %BONUSMOVE%%BR%%ACTIVATED%%TOURCOND%: vous pouvez regarder jusqu'à 2 %CARTELEGENDE% tirées au hasard dans la main d'un joueur"},
        {nom:"Philippe de Vitry",f:'P',b2:[125,3,PERSONNAGE,1,2],faction:BIEN,type:INFANTERIE,defense:[noir,jaune],soin:true,desc:"%LEGEND%%ROUNDCOND%: %MOVE% <span class='blason-large mal'></span> d'une zone%BR%%ROUND%: %REROLL% le dé du destin"},
        {nom:"Archevêque Pierre de Cros",f:'P',b2:[195,3,PERSONNAGE,1,2],pdf:true,niv:1,faction:BIEN,type:INFANTERIE,defense:[rouge],pdv:2,priere:true,commandement:[AA,2],maj:2,dates:[1362,1388],source:"https://fr.wikipedia.org/wiki/Pierre_de_Cros"},
        {nom:"Archevêque Pierre de Cros",pdf:true,niv:2,faction:BIEN,type:INFANTERIE,defense:[noir],pdv:3,priere:true,ralliement:true,commandement:[1,2],dates:[1361,1388],source:"https://fr.wikipedia.org/wiki/Pierre_de_Cros"},
        {nom:"Pape Clément VI",f:'LPCV',b3:[200,3,PERSONNAGE,1,2],niv:1,faction:BIEN,type:INFANTERIE,defense:[noir],pdv:3,priere:true,terreur:1,commandement:[1,1],desc:"%XP%%ROUNDCOND%: +1 %RUMEUR%"},
        {nom:"Sainte Marthe",f:'SME',b3:[175,1,PERSONNAGE,1,2],pdf:true,niv:1,faction:BIEN,type:INFANTERIE,melee:[jaune],defense:[noir],priere:true,maj:5,noterreur:true,modattaque:touchetuerecul},
        {nom:"Sainte Marthe",pdf:true,niv:2,faction:BIEN,type:INFANTERIE,melee:[jaune,jaune,jaune],defense:[noir],pdv:2,priere:true,terreur:2,noterreur:true,modattaque:touchetuerecul},
    ];}
    
/*    let tests={
        "recul":{melee:[unrecul],defense:[unblanc],type:INFANTERIE},
        "tue":{melee:[untue],defense:[unbouclier],type:INFANTERIE},
        "touche":{melee:[blanc_blanctouche,blanc_blanctouche,blanc_blanctouche],defense:[unbouclier],type:INFANTERIE},
        "riposte":{melee:[untue],defense:[untue,unbouclier],type:INFANTERIE,riposte:ftrue},
        "esquive":{melee:[untue],defense:[unblanc],type:INFANTERIE,esquive:true},
        "terreur":{melee:[unblanc,untue],type:INFANTERIE,terreur:2},
        "modattaque":{melee:[unblanc],defense:[unblanc],type:INFANTERIE,modattaque:annule1recul},
        "annuletouche":{melee:[unblanc],defense:[unblanc],type:INFANTERIE,modattaque:annule2touche},
        "survie":{melee:[unblanc],defense:[unblanc],type:INFANTERIE,survie:true},
    };
*/
    
    constructor(u,n) {
        if (typeof n=="undefined") n=1;
        this.feinte=()=>false;
        Object.assign(this,u);
        this.pdv=n*u.pdv;
        this.text=this.nom+(this.prenom?" "+this.prenom:"");
        if (this.melee) {
            if (n>1) this.melee=this.melee.concat(u.melee);
            if (n>2) this.melee=this.melee.concat(u.melee);
            if (this.masse==true&&n>2) this.melee.push(blanc);
            this.melee.sort((a,b)=>2*b[2]+b[1]-2*a[2]-a[1]);
        }
        if (this.tir) {
            if (n>1) this.tir=this.tir.concat(u.tir);
            if (n>2) this.tir=this.tir.concat(u.tir);
            this.tir.sort((a,b)=>b[2]+b[1]-a[2]-a[1]);
        }
        if (this.defense) {
            if (n>1) this.defense=this.defense.concat(u.defense);
            if (n>2) this.defense=this.defense.concat(u.defense);
            if (this.cohesion==true&&n>2) this.defense.push(blanc);
            this.defense.sort((a,b)=>b[3]-a[3]);
        }
        if (this.bonusmelee) {
            if (n>1) this.bonusmelee=((x,y)=>u.bonusmelee(u.bonusmelee(x,y),y))
            if (n>2) this.bonusmelee=((x,y)=>u.bonusmelee(u.bonusmelee(u.bonusmelee(x,y),y),y))
        }
    }    
    static troupes() {
        let i,j=0,l=[];
        let liste=Unite.tps();
        for (i=0;i<liste.length;i++) {
            let u=liste[i];
            u.id=j++;
            if (!u.pdv) u.pdv=1;
            u.troupe=true;
            l.push(new Unite(u));
        }
        liste=Unite.pgs();
        for (i=0;i<liste.length;i++) {
            let u=liste[i];
            u.id=j++;
            u.troupe=false;
            if (!u.pdv) u.pdv=1;
            l.push(new Unite(u));
        }
        return l;
    }
    toMelee(u) {
        let m="";
        let mm
        if (this.melee||this.tir) {
            if (this.melee) {
                mm=this.melee;
                if (this.bonusmelee&&u) mm=this.bonusmelee(mm,u);
                m+="<span class='melee combat'></span> "+mm.map((x)=>x.toHTML()).join(' ');
            }// pas de capacité sur le tir et la melee
            if (this.melee&&this.tir) m+="<br/>";
            if (this.tir&&this.typetir==TENDU) {
                m+="<span class='combat tirtendu"+this.portee+"'></span> "+this.tir.map((x)=>x.toHTML()).join(' ');
            } else if (this.tir&&this.typetir==CLOCHE) {
                m+="<span class='combat tircloche"+this.portee+"'></span> "+this.tir.map((x)=>x.toHTML()).join(' ');
            }
        }
        return m;
    }
    getName(nostar) {
        let n=this.nom;
        if (this.prenom) n+=" <br/><small class='text-muted'>"+this.prenom+"</small>";
        if (this.acheval) n+=" à cheval";
        if (nostar) return n;
        if (this.niv==1) n+=" *";
        if (this.niv==2) n+=" **";
        return n;
    }
    getAttack() {
        let mmm=[];
        let m="";
        if (this.melee||this.tir) {
            let mm=[];
            let type="";
            if (this.melee) {
                mm=this.melee;
                type="melee";
                m+="<span class='combat melee'></span> "+mm.map((x)=>x.toHTML()).join(' ');
                mmm=mmm.concat(mm.map((x)=>x.capacite(type)).filter((x)=>x!=null).filter(uniquecapa));
            }// pas de capacité sur le tir et la melee
            if (this.melee&&this.tir) m+="<br/>";
            if (this.tir&&this.typetir==TENDU) {
                mm=this.tir;
                type="tirtendu";
                m+="<span class='combat tirtendu"+this.portee+"'></span> "+this.tir.map((x)=>x.toHTML()).join(' ');
                mmm=mmm.concat(mm.map((x)=>x.capacite(type)).filter((x)=>x!=null).filter(uniquecapa));
            } else if (this.tir&&this.typetir==CLOCHE) {
                mm=this.tir;
                type="tircloche";
                m+="<span class='combat tircloche"+this.portee+"'></span> "+this.tir.map((x)=>x.toHTML()).join(' ');
                mmm=mmm.concat(mm.map((x)=>x.capacite(type)).filter((x)=>x!=null).filter(uniquecapa));
                
            }
        }
        return [mmm,m];
    }
    getDefense() {
        let d="";
        if (this.defense) {
            let mm=this.defense;
            d+="<span class='combat defense'></span> "+mm.map((x)=>x.toHTML()).join(' ');
        }
        return d;
    }
    getCommand() {
        let c,command="";
        if (this.commandement) {
            c=[this.commandement[0]==0?'A':this.commandement[0],this.commandement[1]];
            if (typeof this.commandefaction!="undefined") command+="<span class='commandement combat-cond "+NOM_FACTION[this.commandefaction]+"'>";
            else if (typeof this.commandetype!="undefined") command+="<span class='commandement combat-cond "+NOM_TYPE[this.commandetype]+"'>";
            else command+="<span class='commandement'>";
            command+="<span style='color:black;text-shadow:1px 1px;'>"+c[0]+"</span>&nbsp; "+c[1]+"</span>";
        }
        return command;
    }
    toHTML() {
        let da="",urls="",urla=[];
        let f="",m="",d="",c=[],mod="";
        let lcapa=["ignifuge","grand","soin","cruel","relance","gardeducorps","pourfendeur","charge","celerite","priere","riposte","terreur","esquive","saut","feinte","charisme","ralliement","impetueux","survie","genie","parade","immortel","mercenaire","visee","masse","cohesion","transport","recultue","noriposte","noterreur"];
        let nn=this.nom;
        if (this.prenom) nn+="_"+this.prenom;
        nn=nn.replace(/ /g,"_").replace(/'/g,"_").replace(/,/g,"_").replace(/&/g,"");
        if (this.acheval) nn+="_à_cheval";
        if (this.niv==0) nn+="__";
        if (this.niv==1) nn+="_*";
        if (this.niv==2) nn+="_**";
        if (this.subfaction==MAL) nn+="_Mal";
        else if (this.subfaction==BIEN) nn+="_Bien";

        let n=this.getName();

        if (this.pdf&&!this.troupe) n="<a href='#card' data-name='"+nn+"' data-toggle='modal' data-target='#card' data-embed='#mycard' onclick=\"document.getElementById('mycard').setAttribute('src','https://xws-bench.github.io/joan-of-arc-helper/cards/"+nn+".pdf#toolbar=0')\">"+n+"</a>";
        if (this.troupe&&this.pdf) n="<a href='#card-troop' data-name='"+nn+"' data-toggle='modal' data-target='#card-troop' data-embed='#mycardtroop' onclick=\"document.getElementById('mycardtroop').setAttribute('src','https://xws-bench.github.io/joan-of-arc-helper/cards/"+nn+".pdf#toolbar=0')\">"+n+"</a>";
        if (this.troupe&&this.png) n="<a href='#card-troop' data-name='"+nn+"' data-toggle='modal' data-target='#card-troop' data-embed='#mycardtroop' onclick=\"document.getElementById('mycardtroop').setAttribute('src','https://xws-bench.github.io/joan-of-arc-helper/cards/"+nn+".png')\">"+n+"</a>";

        if (this.source) {
            urla=this.source.split(" ");
        }
        if (this.dates) {
            if (typeof urla[0]!="undefined") da="<a href='"+urla[0]+"'>"+this.dates[0]+"-"+this.dates[1]+"</a>";
            else da=this.dates[0]+"-"+this.dates[1];
            if (typeof urla[1]!="undefined"&&this.dates[2]) 
                da+=", <a href='"+urla[1]+"'>"+this.dates[2]+"-"+this.dates[3]+"</a>";
            if (this.blason) {
                let b=this.nom.replace(/ô/g,"o").replace(/ë/g,"e").replace(/ï/g,"i").replace(/é/g,"e").replace(/ê/g,"e").replace(/'/g,"-").replace(/,/g,"").replace(/ /g,"-");
                da+=" <span class='coat coat-"+b+"'></span>";
            }
        }
        else da="";
        if (da!="")
            n+="<br/><small class='text-muted' >"+da+"</small>";
        if (this.v15) n+="<br/><span class='badge badge-secondary'>v1.5</span>";
        let subfaction="";
        if (this.subfaction==MAL) {
            subfaction="<span class='subfaction blason mal'></span>";
        } else if (this.subfaction==BIEN) {
            subfaction="<span class='subfaction blason bien'></span>";
        }

        let aa=this.getAttack();
        m+=aa[1];
        if (aa[0].length>0) c.push(aa[0].join(', '));

        d+=this.getDefense();

        for (j=0;j<LISTE_CAPACITES.length;j++) {
            if (this[LISTE_CAPACITES[j]]&&NOM_CAPACITE[j]!=null)
                c.push(NOM_CAPACITE[j]);
        }
        //if (this.desc) c.push(this.desc);
        if (this.terreur)
            c.push("terreur "+this.terreur);
        if (this.celerite)
            c.push("célérité "+this.celerite);
        if (this.saut)
            c.push("saut "+this.saut);
        if (this.feinte==ftrue) c.push("feinte");
        else if (this.feinte==feintesichamp) c.push("feinte<span class='combat-cond ble'></span><span class='combat-cond plain'></span>");
        if (this.bonusmelee==blancsimal)
            c.push("<span class='melee combat'></span><span class='combat-cond mal'></span>: +1 <span class='deblanc'></span>");
        else if (this.bonusmelee==rougesiinfanterie)
            c.push("<span class='melee combat'></span><span class='infanterie combat-cond'></span>: +1 <span class='derouge'></span>");
        else if (this.bonusmelee==rougesicharge)
            c.push("<span class='melee combat'></span><span class='actionverte combat-cond'></span>: +1 <span class='derouge'></span>");
        else if (this.bonusmelee==blancsiinfanterie)
            c.push("<span class='melee combat'></span><span class='infanterie combat-cond'></span>: +1 <span class='deblanc'></span>");
        else if (this.bonusmelee==blancsicavalerie)
            c.push("<span class='melee combat'></span><span class='cavalerie combat-cond'></span>: +1 <span class='deblanc'></span>");
        else if (this.bonusmelee==blanctouchesicavalerie)
            c.push("<span class='melee combat'></span><span class='cavalerie combat-cond'></span> : <span class='vierge faceblanc'></span> &rarr; <span class='faceblanc touche'></span>");
        if (this.recultue==true) c.push("<span class='defense combat'></span>: <span class='recul'></span> &rarr; <span class='mort'></span>");
        if (this.riposte==ftrue) c.push("riposte");
        else if (this.riposte==sicavalerie) c.push("riposte <span class='cavalerie combat-cond'></span>");
        else if (this.riposte==siinfanterie) c.push("riposte <span class='infanterie combat-cond'></span>");
        if (this.parade==ftrue) c.push("parade");
        else if (this.parade==siinfanterie) c.push("parade <span class='infanterie combat-cond'></span>");
        if (this.modattaque==annule1recul)
            c.push("<br/><span class='defense combat'></span>: -1 <span class='recul'></span>");
        else if (this.modattaque==annule2recul)
            c.push("<br/><span class='defense combat'></span>: -2 <span class='recul'></span>");
        else if (this.modattaque==annule1touche)
            c.push("<br/><span class='defense combat'></span>: -1 <span class='touche'></span>");
        else if (this.modattaque==annule2touche)
            c.push("<br/><span class='defense combat'></span>: -2 <span class='touche'></span>");
        else if (this.modattaque==transformetoucherecul)
            c.push("<br/><span class='defense combat'></span>: <span class='touche'></span> &rarr; <span class='recul'></span>");
        else if (this.modattaque==touchetuerecul)
            c.push("<br/><span class='defense combat'></span>: <span class='tue combat'></span> /  <span class='touche combat'></span> &rarr; <span class='recul combat'></span>");
        if (this.bonusattaque==untouchetue)
            c.push("<span class='melee combat'></span>: 1 <span class='touche combat'></span> &rarr; <span class='tue combat'></span>");
        else if (this.bonusattaque==recultouchesiplaine) c.push("<span class='melee combat'></span><span class='plaine combat-cond'></span>: <span class='recul combat'></span> &rarr; <span class='touche combat'></span>");
        else if (this.bonusattaque==doublereculsiforet) c.push("<span class='melee combat'></span><span class='forest combat-cond'></span>: <span class='recul combat'></span> &rarr; <span class='recul facejaune'></span><span class='recul facejaune'></span>");
        //else if (this.bonusattaque=meleefacevierge2legende) c.push("<span class='melee combat'></span>: Toute face vierge génère un jeton <span class='jetonlegende jeton'></span>");
        if (this.postattaque==doubleblessure)
            c.push("<span class='melee combat'></span>: <span class='blessure type'></span> &rarr; +1  <span class='blessure type'></span>");
        
        if (this.contrecoup) {
            let s="<span class='combat-cond melee'></span>";
            if (this.contrecoup==sicavalerie)
                s="<span class='combat-cond cavalerie'></span>";
            c.push("<br/><span class='defense combat'></span>"+s+": <span class='vierge face"+this.defense[0].couleur+"'></span>&rarr;<span class='tue'></span>");
        }
        let dd="";
        let attaque=[];
        if (this.melee) attaque.push("<span class='melee combat'></span>");
        if (this.tir&&this.typetir==TENDU) attaque.push("<span class='tirtendu combat'></span>");
        if (this.tir&&this.typetir==CLOCHE) attaque.push("<span class='tircloche combat'></span>");
        
        if (typeof this.desc!="undefined") {
            dd=this.desc.replace(/%LEGENDE%/g,"<span class='jetonlegende jeton'></span>")
                .replace(/%MELEE%/g,attaque.join(' / '))
                .replace(/%BR%/g,"<br/>")
                .replace(/%MELEEONLY%/g,"<span class='melee combat'></span>")
                .replace(/%POURSUITE%/g,"<span class='poursuiteaprescombat combat'></span>")  
                .replace(/%HERE%/g,"<span class='here combat-cond'></span>")
                .replace(/%HEREHEXA%/g,"<span class='herehexa combat-cond'></span>")
                .replace(/%HEREANDTHERE%/g,"<span class='hereandthere combat-cond'></span>")
                .replace(/%HEREANDTHERE2%/g,"<span class='hereandthere2 combat-cond'></span>")
                .replace(/%HEREANDTHEREHEXA%/g,"d'un hexagone")
                .replace(/%THERE%/g,"<span class='there combat-cond'></span>")
                .replace(/%ROUND%/g,"<b>1/round</b><span style='display:none'>tap</span>")
                .replace(/%ROUNDCOND%/g," <span class='tap combat'></span>")
                .replace(/%TOURCOND%/g," <span class='turn combat'></span>")
                .replace(/%MONTOUR%/g,"à votre tour")
                .replace(/%MOVEENNEMI%/g,"une unité ennemie vient d'entrer ou déclare une action de mouvement pour sortir d'une zone")
                .replace(/%TIRTENDU%/g,"<span class='tirtendu combat'></span>")
                .replace(/%TIRCLOCHE%/g,"<span class='tircloche combat'></span>")
                .replace(/%DEFENSE%/g,"<span class='defense combat'></span>")
                .replace(/%CONSEIL%/g,"<b>entretien</b>")
                .replace(/%CAMP%/g,"<b>contrôle des dégâts</b>")
                .replace(/%XP%/g,"<span class='jetonxp jeton'></span>")
                .replace(/%INCENDIE%/g,"<span class='jetonincendie jeton'></span>")
                .replace(/%DETRUIT%/g,"<span class='jetondetruit jeton'></span>")
                .replace(/%BLESSURE%/g,"<span class='jetonblessure jeton'></span>")
                .replace(/%CARTELEGENDE%/g,"<span class='cartelegende carte'></span>")
                .replace(/%CARTERIVIERE%/g,"<span class='carteriviere carte'></span>")
                .replace(/%BOUCLIER%/g,"<span class='bouclier'></span>")
                .replace(/%THIS%/g,"cette unité")
                .replace(/%NO%/g,"<span class='no'></span>")
                .replace(/%ADVERSAIRE%/g,"à l'adversaire")
                .replace(/%COHESION%/g,"Cohésion")
                .replace(/%ESQUIVE%/g,"Esquive")
                .replace(/%CHARISME%/g,"Charisme")
                .replace(/%MASSE%/g,"Masse")
                .replace(/%RIPOSTE%/g,"Riposte")
                .replace(/%PARADE%/g,"Parade")
                .replace(/%FEINTE%/g,"Feinte")
                .replace(/%CELERITE%/g,"Célérité") 
                .replace(/%SAUT%/g,"Saut") 
                .replace(/%CHARGE%/g,"Charge")
                .replace(/%LEGENDAIRE%/g,"Légendaire")
                .replace(/%IMPETUOUS%/g,"Impétueux")
               .replace(/%TUE%/g,"<span class='tue'></span>")
                .replace(/%MORT%/g,"<span class='mort'></span>")
                .replace(/%RETARDE%/g,"<span class='retarde'></span>")
                .replace(/%RALLIE%/g,"<span class='rallie'></span>")
                .replace(/%TOUCHE%/g,"<span class='touche'></span>")
                .replace(/%RECUL%/g,"<span class='recul'></span>")
                .replace(/%GRIS%/g,"<span class='actiongrise action'></span>")
                .replace(/%BLEU%/g,"<span class='actionbleue action'></span>")
                .replace(/%JAUNE%/g,"<span class='actionjaune action'></span>")
                .replace(/%VERT%/g,"<span class='actionverte action'></span>")
                .replace(/%RUMEUR%/g,"<span class='jetonrumeur jeton'></span>")
                .replace(/%CAVALERIE%/g,"<span class='type cavalerie'></span>")
                .replace(/%INFANTERIE%/g,"<span class='type infanterie'></span>")
                .replace(/%TOUTTYPE%/g,"une unité")
                .replace(/%TROUPE%/g,"<span class='type troupe'></span>")
                .replace(/%PERSONNAGE%/g,"<span class='type personnage'></span>")
                .replace(/%RALLIEMENT%/g,"<span class='jeton ralliement'></span>")
                .replace(/%MOVE%/g,"vous pouvez déplacez")
                .replace(/%CHAMP%/g,"<span class='ble combat-cond'></span>")
                .replace(/%PLAINE%/g,"<span class='plaine combat-cond'></span>")
                .replace(/%FORET%/g,"<span class='foret combat-cond'></span>")
                .replace(/%ZONELIBREHEXA%/g,"sur une zone libre d'un hexagone")
                .replace(/%2ACTIVATION%/g,"vous pouvez jouer à la suite")
                .replace(/%ROLL%/g,"lancez")
                .replace(/%VISEE%/g,"Visée")
                .replace(/%CHOOSE%/g,"choisissez")
                .replace(/%REROLL%/g,"relancez")
                .replace(/%ONCEINGAME%/g,"<b>action bonus</b> <span class='game type'></span>")
                .replace(/%STARTGAME%/g,"au début de la partie")
                .replace(/%NOPLAIN%/g,"dans une zone qui n'est pas une plaine")
                .replace(/%CHOOSEZONE%/g,"choisissez une zone")
                .replace(/%1ORDERTOACTIVATE%/g,"il faut un ordre de plus pour l'activer")
                .replace(/%ACTIVATED%/g,"<b>action bonus</b>")
                .replace(/%SPECIAL%/g,"<b>action spéciale</b>")
                .replace(/%BONUSMOVE%/g,"peut effectuer une action bonus de déplacement")
                .replace(/%ACTIONPLAYER%/g,"<b>action de joueur</b>")
                .replace(/%REVEALED%/g,"quand cette unité est révélée")
                .replace(/%DEFAUSSEZEN%/g,"défaussez en")
                .replace(/%CHOOSERECUL%/g,"choisissez où cette unité est repoussée");
            if (c.length>0) dd="<br/>"+dd;
            c.push(dd);
        }
        if (typeof this.faction!="undefined") f="<span style='display:none'>"+this.faction+"</span><span class='blason-large "+NOM_FACTION[this.faction]+"'></span>";
        let command=null;
        if (this.commandement) 
            command=[this.commandement[0]==0?'A':this.commandement[0],this.commandement[1]];
        return [n,
                f+subfaction,
                "<span style='display:none'>"+this.type+"</span><span class='"+NOM_TYPE[this.type]+" type'></span>",
                " "+m,
                " "+d,
                this.pdv,
                c.join(', '),
                command
               ];         
    }
    
    toString() {
        let j=this.toHTML();
        return "<tr><td>"+j[0]+"</td><td>"+j[1]+"</td><td>"+j[2]+"</td><td>"+j[3]+"</td><td>"+j[4]+"</td><td>"+this.getCommand()+"</td><td><span class='pdv'>"+j[5]+"</span></td><td>"+j[6]+"</td></tr>";
    }
    toArmy(at,min,max) {
        let r="";
        let i;
        let mini="";
        if (typeof min=="undefined") min=this[at][3];
        if (typeof max=="undefined") max=this[at][4];
        
        let checked="checked";
        if (this.f) { mini="data-mini='"+this.f+"'"; }
        for (i=0;i<min;i++)
            r+="<input "+mini+" data-moral='"+this[at][1]+"' data-pts='"+this[at][0]+"' "+checked+" type='radio' class='form-check-input' ' name='g"+this[at][2]+"_"+i+"'>";
        for (i=min;i<max;i++) r+="<input "+mini+" class='form-check-input' type='radio' data-moral='"+this[at][1]+"' data-pts='"+this[at][0]+"' name='g"+this[at][2]+"_"+i+"'>";
        if (this[at].length>5) {
            for (i=0;i<this[at][5];i++) r+="<input checked disabled class='form-check-input' type='checkbox' data-moral='"+this[at][1]+"' data-pts='"+this[at][0]+"'>";
            for (i=0;i<this[at][6];i++) r+="<input class='form-check-input' type='checkbox' data-moral='"+this[at][1]+"' data-pts='"+this[at][0]+"'>";
        }
        let nn=this.nom;
        if (this.prenom) nn+="_"+this.prenom;
        nn=nn.replace(/ /g,"_").replace(/'/g,"_").replace(/,/g,"_").replace(/&/g,"");
        if (this.acheval) nn+="_à_cheval";
        if (this.niv==0) nn+="__";
        if (this.niv==1) nn+="_*";
        if (this.niv==2) nn+="_**";
        if (this.subfaction==MAL) nn+="_Mal";
        else if (this.subfaction==BIEN) nn+="_Bien";

        let n=this.getName(true);
        if (this.pdf&&!this.troupe) n="<a href='#card' data-name='"+nn+"' data-toggle='modal' data-target='#card' data-embed='#mycard' onclick=\"document.getElementById('mycard').setAttribute('src','https://xws-bench.github.io/joan-of-arc-helper/cards/"+nn+".pdf#toolbar=0')\">"+n+"</a>";
        if (this.troupe&&this.pdf) n="<a href='#card-troop' data-name='"+nn+"' data-toggle='modal' data-target='#card-troop' data-embed='#mycardtroop' onclick=\"document.getElementById('mycardtroop').setAttribute('src','https://xws-bench.github.io/joan-of-arc-helper/cards/"+nn+".pdf#toolbar=0')\">"+n+"</a>";
        if (this.troupe&&this.png) n="<a href='#card-troop' data-name='"+nn+"' data-toggle='modal' data-target='#card-troop' data-embed='#mycardtroop' onclick=\"document.getElementById('mycardtroop').setAttribute('src','https://xws-bench.github.io/joan-of-arc-helper/cards/"+nn+".png')\">"+n+"</a>";

        if (!this.troupe) {
            n="<span class='blason "+NOM_FACTION[this.faction]+"'></span> "+n;
        }
        r="<tr><td class='form-check-inline'>"+r+"</td><td>"+n+"</td></td><td>"+this[at][0]/*cout*/+"</td><td>"+this[at][1]/*moral*/+"</td></tr>";
        return r;
    }
    format(dates) {
        let d="";
        if (dates&&this.dates) d="["+this.dates[0]+"-"+this.dates[1]+"] "+this.text;
        else d=this.text+(this.acheval?" à cheval":"")+(this.niv==1?"*":(this.niv==2?"**":""))+(this.subfaction==MAL?" - Mal":(this.subfaction==BIEN?" - Bien":""));
        return $("<span class='blason "+NOM_FACTION[this.faction]+"'>"+d+"</span>");      
    }
}

