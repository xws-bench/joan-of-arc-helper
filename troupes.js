const BIEN=0,MAL=1,FRANCAIS=2,ECOSSAIS=3,OTTOMAN=4,ANGLAIS=5,BOURGUIGNON=6,VALAQUE=7,MERCENAIRE=8,AUTRE=9,MAX=10;
const INFANTERIE=0,CAVALERIE=1,VOLANT=2,ARTILLERIE=3,MAXTYPE=4;
const TENDU=0,CLOCHE=1;
const AA=0;
const NOM_FACTION=["bien","mal","francais","ecossais","ottoman","anglais","bourguignon","valaque","mercenaire","neutre"];
const NOM_TYPE=["infanterie","cavalerie","volant","artillerie"];
const NOM_CAPACITE=["ignifugé",null,null,null,null,null,null,null,null,null,null,"grand","soin","soin </span> <span class='hereandthere combat-cond'></span>","cruel","relance","garde du corps","pourfendeur","charge",null,"prière",null,null,"esquive",null,"feinte","charisme","ralliement","impétueux","survie","génie","parade","immortel","mercenaire","visée","masse","cohésion","transport",null,"immunisé aux ripostes",null,"immunisé à la terreur",null,null,null,null,"légendaire"];

const LISTE_CAPACITES=["ignifuge","tir","melee","type","faction","typetir","portee","defense","pdv","maj","commandement","grand","soin","soinbienthere","cruel","relance","gardeducorps","pourfendeur","charge","celerite","priere","riposte","terreur","esquive","saut","feinte","charisme","ralliement","impetueux","survie","genie","parade","immortel","mercenaire","visee","masse","cohesion","transport","recultue","noriposte","contrecoup","noterreur","modattaque","source","dates","civil","legendaire"];
/* bonusmelee: blancsimal,rougesiinfanterie,blancsiinfanterie,blancsicavalerie,blanctouchesicavalerie, riposte et contrecoup: sicavalerie ou ftrue.  */

const blancsimal=(d,a)=>(a.faction==MAL?d.concat([blanc]):d);
const rougesiinfanterie=(d,a)=>(a.type==INFANTERIE?d.concat([rouge]):d);
const blancsiinfanterie=(d,a)=>(a.type==INFANTERIE?d.concat([blanc]):d);
const blancsicavalerie=(d,a)=>(a.type==CAVALERIE?d.concat([blanc]):d);
const blanctouchesicavalerie=(d,a)=>(a.type==CAVALERIE?[blanc_blanctouche]:d);
const sicavalerie=(a)=>(a.type==CAVALERIE?true:false);
const ftrue=()=>true;

function uniquecapa(value, index, self) { 
    return index==self.length-1||self[index]!=self[index+1];
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
    ="jaune"; 
rouge.couleur=rouge_recultouche.couleur
    =rouge_toucherecule.couleur
    =rouge_bouclierrelance.couleur
    =rouge_bouclierrecule.couleur
    ="rouge";
noir.couleur=noir_toucherecule.couleur
    =noir_bouclierrecule.couleur
    =noir_boucliertouche.couleur
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
let recultouche=function(t) { return "<span class='combat "+t+"'></span> : <span class='recul face"+this.couleur+"'></span>&rarr;<span class='touche face"+this.couleur+"'></span>";}
let toucherecule=function(t) { return "<span class='combat "+t+"'></span> : <span class='touche face"+this.couleur+"'></span>&rarr;<span class='recul face"+this.couleur+"'></span>";}

/* Capacités Speciales */
rouge.capacite=noir.capacite=blanc.capacite=jaune.capacite=(() => null);
jaune_blanctouche.capacite=blanctouche;
jaune_boucliertouche.capacite=boucliertouche;
jaune_blanctue.capacite=blanctue;
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
blanc_blancbouclier.capacite=blancbouclier;
blanc_bouclierrecule.capacite=bouclierrecule;
blanc_blanctouche.capacite=blanctouche;
blanc_blanctue.capacite=blanctue;
blanc_parade.capacite=(()=>"parade <span class='faceblanc'></span>");

/* bonusmelee: blancsimal,rougesiinfanterie,blancsiinfanterie,blancsicavalerie,blanctouchesicavalerie, riposte et contrecoup: sicavalerie ou ftrue.  */



class Unite {
    static tps() { return [
        {nom:"Archers Tatars légers montés",type:CAVALERIE,tir:[noir,jaune],portee:1,typetir:TENDU,defense:[blanc]},
        {nom:"Arbalétriers montés",type:CAVALERIE,tir:[rouge,jaune],portee:1,typetir:TENDU,defense:[blanc],celerite:2},
        {nom:"Lanciers montés",melee:[jaune,jaune,jaune],type:CAVALERIE,defense:[jaune]},
        {nom:"Coureurs des bois",melee:[jaune],portee:1,typetir:TENDU,tir:[jaune,jaune],type:INFANTERIE,defense:[jaune],esquive:true,celerite:2},
        {nom:"Adeptes",melee:[rouge],defense:[noir],type:INFANTERIE,faction:MAL,desc:"quand ils sont dans une zone de marais, %THIS% ignorent les effets de terrain liés aux marais et peuvent réaliser un mouvement vers n'importe quelle autre zone de marais du plateau de jeu"},
        {nom:"Almograves",melee:[blanc],defense:[jaune],type:INFANTERIE,esquive:true,noriposte:true,moral:1,cout:65},
        {nom:"Ange",melee:[rouge,blanc],bonusmelee:blancsimal,defense:[noir,noir],type:VOLANT,faction:BIEN,saut:2,transport:true,faction:BIEN,priere:true}, 
        {nom:"Arbalétriers Génois",prenom:"Retranchés",typetir:TENDU,portee:1,tir:[rouge,blanc],defense:[noir,blanc],type:INFANTERIE,recultue:true,moral:1,desc:"%THIS% ne peut pas se déplacer%BR%%DEFENSE%: <span class='recul'></span> &rarr; <span class='mort'></span>"},
        {nom:"Arbalétriers Génois",typetir:TENDU,portee:1,tir:[rouge],defense:[noir],type:INFANTERIE,cout:80,moral:1,desc:"%ACTIVATED%: en fin ou début d'activation, %THIS% peut être remplacée par les Arbalétriers Génois retranchés"},
        {nom:"Arbalétriers",typetir:TENDU,portee:1,tir:[rouge_bouclierrelance],defense:[blanc],type:INFANTERIE,cout:80,moral:1},
        {nom:"Archers Arc Court",tir:[noir, noir],defense:[blanc],type:INFANTERIE,typetir:TENDU,portee:1,desc:"pendant le tour adverse %ROUNDCOND%: +1 %TIRTENDU%",moral:1,cout:125},
        {nom:"Archers Azab",tir:[jaune,jaune],defense:[jaune],faction:OTTOMAN,type:INFANTERIE,typetir:TENDU,portee:1,esquive:true,celerite:2,desc:"au début du jeu: recevez une haie de pieux%BR%Vous pouvez placer 1 haie de pieux dans la zone des Archers pour une action bonus"},
        {nom:"Archers bourguignons",typetir:TENDU,portee:1,tir:[noir,noir],defense:[blanc],type:INFANTERIE,masse:true,desc:"%MOVEENNEMI%%THERE% %TOURCOND%: +1 %TIRTENDU%"},
        {nom:"Archers",prenom:"derrière les pieux",tir:[jaune_boucliertouche,jaune_boucliertouche],defense:[blanc,blanc],type:INFANTERIE,typetir:CLOCHE,portee:2},
        {nom:"Archers montés",tir:[blanc,blanc],typetir:CLOCHE,portee:2,defense:[noir],type:CAVALERIE,celerite:2, cout:130,moral:1},
        {nom:"Archers",tir:[jaune_boucliertouche,jaune_boucliertouche],defense:[blanc],type:INFANTERIE,typetir:CLOCHE,portee:2,desc:"%ACTIVATED%: %THIS% peut placer 1 haie de pieux issue de la réserve sur une frontière libre de sa zone",cout:125,moral:1},
        {nom:"Bourreau",melee:[jaune_blanctue],defense:[blanc],type:INFANTERIE,desc:"%MELEE%, activé par commandement: +1 <span class='derouge'></span>"},
        {nom:"Cavalerie Légère",melee:[blanc],defense:[jaune],type:CAVALERIE,celerite:3,esquive:true,desc:"%POURSUITE%%TOURCOND%: +1 %MELEE%",cout:120,moral:1},
        {nom:"Cavaliers Archers",tir:[jaune,jaune],defense:[blanc],faction:OTTOMAN,type:CAVALERIE,celerite:2,esquive:true,typetir:TENDU,portee:1},
        {nom:"Cavaliers Nobles",type:CAVALERIE,melee:[rouge,blanc],defense:[blanc,rouge],faction:OTTOMAN,riposte:ftrue,charge:true,desc:"%DEFENSE%: <span class='recul'></span> &rarr; %CHOOSERECUL%"},
        {nom:"Cavaliers Sipahi",type:CAVALERIE,melee:[blanc_blanctue],defense:[blanc],faction:OTTOMAN,type:INFANTERIE,esquive:true,celerite:2,charge:true},
        {nom:"Chevaliers Impétueux",melee:[rouge,rouge],defense:[noir],riposte:ftrue,type:INFANTERIE,impetueux:true,modattaque:annule1recul,cout:140,moral:2},
        {nom:"Chevaliers montés",prenom:"Petite noblesse",type:CAVALERIE,melee:[rouge_bouclierrecule,noir_bouclierrecule],defense:[noir],charge:true,cout:135,moral:2},
        {nom:"Chevaliers montés",prenom:"Français",type:CAVALERIE,melee:[rouge,rouge],defense:[noir],charge:true,faction:FRANCAIS,impetueux:true,cout:130,moral:2},
        {nom:"Chevaliers montés",type:CAVALERIE,melee:[rouge,rouge],defense:[noir],charge:true},
        {nom:"Chevaliers à pied",prenom:"Armes à 2 mains",bonusmelee:rougesiinfanterie,melee:[rouge,rouge],defense:[noir],type:INFANTERIE,moral:2,cout:120},
        {nom:"Chevaliers à pied",melee:[rouge,rouge],defense:[noir],type:INFANTERIE,modattaque:annule1recul,cout:155,moral:2},
        {nom:"Chiens de Chasse",melee:[blanc,jaune],defense:[jaune],type:INFANTERIE,celerite:2,moral:1,cout:70},
        {nom:"Chiens de Guerre",melee:[rouge,blanc],defense:[jaune],celerite:2,type:INFANTERIE,gardeducorps:true,moral:1,cout:120},
        {nom:"Démon Vorace",melee:[rouge],defense:[blanc_blanctue,blanc_blanctue],contrecoup:ftrue,type:INFANTERIE,faction:MAL},
        {nom:"Démons Volants",tir:[rouge,jaune],defense:[noir],type:VOLANT,saut:2,immortel:true,typetir:TENDU,portee:1,faction:MAL,desc:"%MELEE%: <span class='vierge facejaune'></span> &rarr; %LEGENDE%"},
        {nom:"Fantômes",type:INFANTERIE,melee:[blanc,blanc,blanc],defense:[blanc,blanc,blanc],immortel:true,faction:MAL,desc:"%ACTIVATED%%TOURCOND% %LEGENDE%: + %SAUT% 2%BR%%THIS% n'est pas affectée par les effets de terrain"},
        {nom:"Flagellants",melee:[blanc],defense:[],type:INFANTERIE,survie:true,faction:BIEN,desc:"%MELEE% Pénitents%HERE%: +1 <span class='deblanc'></span>"},
        {nom:"Guisarmiers",melee:[blanc_blanctouche],defense:[blanc_parade],type:INFANTERIE,parade:true,cohesion:true,moral:1,cout:75},
        {nom:"Hacquebutiers",tir:[jaune_blanctue],defense:[noir],type:INFANTERIE,terreur:1,typetir:TENDU,portee:1,cout:100,moral:1},
        {nom:"Hallebardiers",bonusmelee:blancsiinfanterie,melee:[blanc],defense:[rouge,blanc],type:INFANTERIE,riposte:ftrue,moral:2,cout:110},
        {nom:"Hérétiques",melee:[noir,jaune],defense:[jaune],type:INFANTERIE,cout:90,moral:1,desc:"%MELEE%<span class='niveau2 combat-cond'></span>: <span class='recul'></span> &rarr; <span class='niveau1 combat'></span>%BR%%DEFENSE%: <span class='facejaune vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Infanterie Légère",melee:[blanc],defense:[jaune],esquive:true,faction:OTTOMAN,type:INFANTERIE,celerite:2},
        {nom:"Janissaires",melee:[noir],defense:[blanc],esquive:true,charge:true,masse:true,faction:OTTOMAN,type:INFANTERIE,desc:"%MELEE% %XP%: <span class='facenoir bouclier'></span> &rarr; <span class='touche facenoir'></span>"},
        {nom:"Loups",melee:[blanc,jaune],defense:[jaune],celerite:2,type:INFANTERIE,esquive:true,faction:MAL},
        {nom:"Milice Bourgeoise",melee:[blanc], defense:[jaune],type:INFANTERIE,moral:1,cout:35},
        {nom:"Milice Paysanne",melee:[blanc], defense:[],type:INFANTERIE,masse:true,desc:"%MELEE%: zone de champ%HERE% &rarr; + %FEINTE%",cout:25,moral:1},
        {nom:"Milice d'Archers",tir:[noir],defense:[jaune],typetir:TENDU,portee:1,type:INFANTERIE,esquive:true,cout:65,moral:1},
        {nom:"Montreur d'ours",melee:[rouge,jaune,blanc], defense:[noir],type:INFANTERIE,riposte:ftrue,terreur:1,desc:"%POURSUITE% %ROUNDCOND%: +1 %MELEE%"},
        {nom:"Okchu",tir:[jaune_boucliertouche],defense:[jaune],type:INFANTERIE,faction:OTTOMAN,typetir:CLOCHE,portee:2,celerite:2},
        {nom:"Ours",melee:[rouge,jaune_blancrecule], defense:[noir],riposte:ftrue,type:INFANTERIE,terreur:1, desc:"%POURSUITE% %ROUNDCOND%: +1 %MELEE%"},/* TODO: pas de rouge vierge !! */
        {nom:"Paysans Révoltés",melee:[blanc], defense:[],type:INFANTERIE,masse:true},
        {nom:"Paysans",melee:[jaune], defense:[],type:INFANTERIE,masse:true,desc:"%SPECIAL%: -1 %INCENDIE%%HEREANDTHERE%",moral:1,cout:20},
        {nom:"Pestiférés",melee:[blanc],defense:[],type:INFANTERIE,masse:true,terreur:2,modattaque:annule1touche},
        {nom:"Piquiers Ecossais",melee:[blanc],defense:[jaune],contrecoup:sicavalerie,type:INFANTERIE,masse:true,faction:ECOSSAIS,cout:65,moral:1},
        {nom:"Piquiers Flamands",melee:[blanc],defense:[blanc],type:INFANTERIE,riposte:sicavalerie,cohesion:true},
        {nom:"Piquiers",bonusmelee:blancsicavalerie,melee:[blanc],type:INFANTERIE,defense:[jaune],riposte:sicavalerie,cout:60,moral:1},
        {nom:"Pénitents",melee:[blanc],defense:[],type:INFANTERIE,survie:true,faction:BIEN,desc:"%ACTIVATED%%TOURCOND% %CARTELEGENDE%: +1 %GRIS%"},
        {nom:"Sapeurs",melee:[blanc],defense:[blanc],genie:true,type:INFANTERIE,cout:120,moral:1},
        {nom:"Sergents d'armes",prenom:"Gascons et Bretons",melee: [rouge],defense:[noir], riposte:ftrue,type:INFANTERIE,charge:true,impetueux:true,modattaque:annule1recul,cout:125,moral:2},
        {nom:"Sergents d'armes",prenom:"Lourds",melee: [rouge,noir],defense:[noir], riposte:ftrue,type:INFANTERIE,cohesion:true,cout:135,moral:2},
        {nom:"Sergents d'armes montés",type:CAVALERIE,melee:[rouge],defense:[blanc],charge:true,celerite:2,moral:2,cout:110},
        {nom:"Sergents d'armes",melee: [rouge],defense:[rouge], riposte:ftrue,type:INFANTERIE,moral:2,cout:100},
        {nom:"Légion démoniaque",melee:[blanc],defense:[jaune,jaune],type:INFANTERIE,faction:MAL,moral:1,cout:65},
        {nom:"Squelettes",prenom:"Danse Macabre",melee:[jaune],defense:[],type:INFANTERIE,immortel:true,faction:MAL,desc:"%MELEE%: Squelettes%HERE% &rarr; +1 <span class='dejaune'></span>"},
        {nom:"Squelettes",prenom:"Démoniaques",melee:[jaune],defense:[],charge:true,type:INFANTERIE,masse:true,faction:MAL,modattaque:annule1recul,desc:"%MELEE%: Squelettes%HERE% &rarr; +1 <span class='dejaune'></span>",cout:75,moral:1},
        {nom:"Squelettes",melee:[jaune],defense:[],type:INFANTERIE,faction:MAL,modattaque:annule1recul,desc:"%MELEE%: Squelettes%HERE% &rarr; +1 <span class='dejaune'></span>",moral:1,cout:55},
        {nom:"Vougiers",bonusmelee:blanctouchesicavalerie,melee:[blanc],defense:[rouge,blanc],riposte:ftrue,type:INFANTERIE,cohesion:true,cout:115},
        {nom:"Yerli Kurlu",melee:[jaune_blancrecule],defense:[jaune],esquive:true,faction:OTTOMAN,type:INFANTERIE,masse:true},
        {nom:"Canon",tir:[rouge,rouge],defense:[blanc],type:ARTILLERIE,typetir:CLOCHE,portee:3,pdv:2,faction:OTTOMAN},
        {nom:"Bombarde",tir: [rouge,rouge,blanc_blanctue],defense:[blanc],type:ARTILLERIE,typetir:CLOCHE,portee:2,pdv:2,cout:220,moral:3},
        {nom:"Couleuvrine",tir:[jaune_blancrecule,jaune_blancrecule,jaune_blancrecule],defense:[noir],visee:true,typetir:TENDU,portee:2,type:ARTILLERIE,cout:155,moral:2},
        {nom:"Baliste",tir:[noir_boucliertouche],defense:[blanc],type:ARTILLERIE,typetir:TENDU,portee:3,pdv:2,visee:true,cout:120,moral:2},
        {nom:"Trébuchet",tir:[blanc_blanctue,blanc_blanctue],defense:[blanc],type:ARTILLERIE,typetir:CLOCHE,visee:true,grand:true,pdv:2,portee:3,moral:2,cout:150},
        {nom:"Tour de Siège",defense:[blanc,blanc],ralliement:true,grand:true,type:ARTILLERIE,pdv:8,cout:260,moral:4},
        {nom:"Bélier",defense:[noir,noir],pdv:4,type:ARTILLERIE,cout:100,moral:3},
        {nom:"Ribaudequin",tir:[rouge,blanc],defense:[noir],terreur:2,typetir:TENDU,type:ARTILLERIE,portee:1,desc:"%STARTGAME%: placez 1 haie de pieux dans la zone du Ribaudequin"},
        {nom:"Pavois",defense:[noir,blanc],pdv:4,type:INFANTERIE,cout:100,moral:1,desc:"%DEFENSE%: %TUE%%HERE%, %TOUCHE%%HERE% peuvent être alloués à %THIS%"},
        {nom:"Musicien",defense:[blanc],melee:[blanc],type:INFANTERIE,terreur:1,commandement:[3,1],cout:170,moral:2,desc:"%TOUTTYPE%%HERE% %MELEE% / %DEFENSE%: +1 <span class='deblanc'></span>%BR%%CAMP%: <span class='touche'></span> &rarr; <span class='rallie'></span>"},
        {nom:"Porte-étendard",defense:[blanc],type:INFANTERIE,esquive:true,ralliement:true,commandement:[3,1],modattaque:annule2touche,moral:4,cout:260,desc:"%CAMP%: <span class='touche'></span> &rarr; <span class='rallie'></span>"},
        {nom:"Pavoisiers",defense:[noir,blanc],type:INFANTERIE,desc:"%TOUTTYPE%%HERE%, %DEFENSE%:  + %PARADE%",moral:1,cout:110},
        {nom:"Prêtre",civil:true,type:INFANTERIE,priere:true,soinbienthere:true,commandement:[1,2],faction:BIEN,desc:"%THIS% ne peut commander que <span class='blason-large bien'></span>"},
        {nom:"Marchande",civil:true,type:INFANTERIE,desc:"%ACTIVATED%%TOURCOND%: +1 %RUMEUR%"},
        {nom:"Fermier",civil:true,type:INFANTERIE},
        {nom:"Forgeron",civil:true,type:INFANTERIE,melee:[jaune],cout:160,moral:2,desc:"Paysans%HERE%: + %RIPOSTE%, <span class='melee'></span> +1 <span class='dejaune'></span>"},
        {nom:"Apothicaire",civil:true,type:INFANTERIE,defense:[blanc],soin:true,desc:"%ACTIVATED%%TOURCOND% %CARTELEGENDE%: +1 %LEGENDE% / %XP% / %CARTELEGENDE%"},
        {nom:"Bourgeois",civil:true,type:INFANTERIE,desc:"%ACTIVATED%%TOURCOND%: +1 %XP%"},
        {nom:"Fermier",civil:true,type:INFANTERIE},
        {nom:"Chasseur",civil:true,type:INFANTERIE,desc:"%ACTIVATED%%TOURCOND%: consultez un jeton scénario placé dans la zone de %THIS%"},
        {nom:"Médecin",civil:true,type:INFANTERIE,defense:[blanc],soin:true,celerite:2,cout:130,moral:2,desc:"%TOUTTYPE%%HERE% %MORT%: %ROLL% <span class='dejaune'></span>, <span class='facejaune vierge'></span> &rarr; %TOUCHE%"},
        {nom:"Noble dame",civil:true,type:INFANTERIE,desc:"%ACTIVATED%%ROUNDCOND%: +1 %LEGENDE% / %RUMEUR%%BR%%PERSONNAGE%%HERE%: + %CHARISME%"},
        {nom:"Guide",civil:true,type:INFANTERIE,defense:[blanc],modattaque:annule1recul,desc:"%ACTIVATED% %XP%%XP%%ROUNDCOND%: %MOVE% %TOUTTYPE%%HERE%"},
        {nom:"Devin",civil:true,type:INFANTERIE,defense:[unbouclier],desc:"%ACTIVATED% %XP%%XP%%XP%: %CHOOSE% %CARTELEGENDE%"},
        {nom:"Monsieur Quirk",civil:true,type:INFANTERIE,immortel:true,desc:"%ACTIVATED% %MONTOUR%: un unité ennemie%THERE% &rarr; +1 %RUMEUR%"},
        {nom:"Léo l'aubergiste",civil:true,type:INFANTERIE,terreur:2,soin:true,desc:"%ACTIVATED%%ROUNDCOND%: %PERSONNAGE%%HERE%  + <span class='commandement'>1</span>"},
        {nom:"Jacques le troubadour",civil:true,type:INFANTERIE,terreur:1,desc:"%DEFENSE%: 'Le Bon Endroit'%HEREANDTHERE% &rarr;  annulez tous les %RECUL%"},
        {nom:"Rebouteuse",civil:true,type:INFANTERIE,desc:"%CAMP%, %REROLL% une fois le dé du Destin pour deux unités alliés %TOUCHE%"},
    ];
                 }

    static pgs() { return [
        {nom:"Dragon",faction:MAL,type:VOLANT,melee:[rouge,rouge,rouge,blanc],tir:[rouge],portee:2,typetir:TENDU,defense:[unbouclier,unbouclier],pdv:20,terreur:2,dates:[1409,1409]},
        {nom:"La Bête",faction:MAL,type:VOLANT,melee:[rouge,rouge,rouge],tir:[rouge],portee:2,typetir:TENDU,defense:[unbouclier,unbouclier],pdv:14,terreur:2},
        {nom:"Le Diable",faction:MAL,type:VOLANT,melee:[untue,rouge,rouge],defense:[unbouclier,unbouclier],pdv:14,terreur:2,visee:true,ignifuge:true,moral:12,cout:1165,commandement:[5,5]},
        {nom:"Prigent de Coëtivy",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,jaune],defense:[rouge],pdv:2,commandement:[1,2],survie:true,genie:true,charisme:true,maj:3,dates:[1399,1450],source:"https://fr.wikipedia.org/wiki/Prigent_VII_de_Co%C3%ABtivy",blason:true,desc:"une zone ennemie%THERE% vient d'être activée,%ROUNDCOND%: + %MELEE%"},
        {nom:"Prigent de Coëtivy",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[rouge,rouge],pdv:2,commandement:[1,3],survie:true,genie:true,riposte:ftrue,dates:[1399,1450],source:"https://fr.wikipedia.org/wiki/Prigent_VII_de_Co%C3%ABtivy",blason:true,desc:"une zone ennemie%THERE% vient d'être activée,%ROUNDCOND%: + %MELEE%%BR%%MONTOUR%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Maréchal Jean de Clermont",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge_bouclierrecule,blanc_bouclierrecule],defense:[noir,blanc],charge:true,impetueux:true,pdv:2,commandement:[1,2],maj:4,dates:[1352,1356],source:"https://fr.wikipedia.org/wiki/Jean_de_Clermont",blason:true,desc:"%TROUPE%%HERE%: + %COHESION%"},
        {nom:"Maréchal Jean de Clermont",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir,rouge],charge:true,impetueux:true,riposte:ftrue,legendaire:true,pdv:3,commandement:[1,2],dates:[1352,1356],source:"https://fr.wikipedia.org/wiki/Jean_de_Clermont",blason:true,desc:"%TROUPE%%HERE%: + %COHESION%"},
        {nom:"Jean II Le Bon",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,impetueux:true,pdv:3,commandement:[1,2],maj:3,dates:[1350,1364],source:"https://fr.wikipedia.org/wiki/Jean_II_le_Bon",blason:true,desc:"%MONTOUR%: +1 %VERT%"},
        {nom:"Jean II Le Bon",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,blanc],defense:[rouge],charge:true,impetueux:true,riposte:ftrue,pdv:4,commandement:[1,3],dates:[1350,1364],source:"https://fr.wikipedia.org/wiki/Jean_II_le_Bon",blason:true,desc:"%MONTOUR%: +1 %VERT% / %JAUNE%%BR%%CONSEIL%: -1 %XP%"},
        {nom:"Philippe le Hardi",faction:FRANCAIS,type:INFANTERIE,defense:[noir,blanc],charge:true,parade:true,feinte:true,dates:[1352,1404],source:"https://fr.wikipedia.org/wiki/Philippe_II_de_Bourgogne",blason:true,cout:225,moral:3 , desc:"%PERSONNAGE%%HERE% : + %PARADE%%BR%Les unités dans sa zone ne peuvent subir d'attaque de tir"},
        {nom:"Maréchal Arnoul d'Audrehem",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,impetueux:true,modattaque:annule2recul,pourfendeur:true,pdv:2,commandement:[2,1],maj:4,dates:[1351,1370],source:"https://fr.wikipedia.org/wiki/Arnoul_d%27Audrehem",blason:true},
        {nom:"Maréchal Arnoul d'Audrehem",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,impetueux:true,riposte:ftrue,pdv:3,commandement:[2,2],dates:[1351,1370],source:"https://fr.wikipedia.org/wiki/Arnoul_d%27Audrehem",blason:true,desc:"%ACTIVATED%%TOURCOND% %XP%: %GRIS% &rarr; %VERT%%BR%%PERSONNAGE%%HERE%: + %PARADE%"},
        {nom:"Philippe d'Orléans",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir],charge:true,ralliement:true,charisme:true,pdv:2,commandement:[1,2],maj:4,dates:[1352,1356],source:"https://fr.wikipedia.org/wiki/Philippe_d%27Orl%C3%A9ans_(1336-1375)",blason:true,desc:"X %BLESSURE% &rarr; %MELEE%: +X %RECUL%%BR%%THIS% compte comme n'importe quelle troupe lors du décompte pour le trait %MASSE%"},
        {nom:"Philippe d'Orléans",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir,jaune],charge:true,ralliement:true,charisme:true,gardeducorps:true,modattaque:annule1recul,pdv:3,commandement:[1,3],dates:[1352,1356],source:"https://fr.wikipedia.org/wiki/Philippe_d%27Orl%C3%A9ans_(1336-1375)",blason:true,desc:"X %BLESSURE% &rarr; %MELEE%: +X %RECUL%"},
        {nom:"Jean, fils du Roi",faction:FRANCAIS,type:INFANTERIE,melee:[blanc],defense:[noir],charge:true,visee:true,dates:[1356,1416], source:"https://fr.wikipedia.org/wiki/Jean_Ier_de_Berry"/* C'est Jean I de berry */,blason:true,desc:"%MONTOUR% %LEGENDE%: %PERSONNAGE%%HERE% + Survie%BR%%MELEE%: 1+ %MORT% &rarr; %LEGENDE%"},
        {nom:"Gautier VI de Brienne",faction:FRANCAIS,type:INFANTERIE,melee:[rouge_bouclierrecule,blanc_bouclierrecule],defense:[noir],mercenaire:true,cruel:true,pdv:2,commandement:[1,2],dates:[1311,1356],source:"https://fr.wikipedia.org/wiki/Gautier_VI_de_Brienne",blason:true},
        {nom:"Jean de Bourbon",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[rouge,rouge],charge:true,riposte:ftrue,pdv:2,commandement:[2,3],maj:4,dates:[1426,1488],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Bourbon",blason:true,cout:205,moral:3,legendaire:true},
        {nom:"Jean de Bourbon",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc,noir],defense:[noir,noir],charge:true,riposte:ftrue,pdv:3,commandement:[2,2],maj:4,dates:[1426,1488],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Bourbon",blason:true,moral:3,legendaire:true,desc:"%ACTIVATED%%TOURCOND% %XP%: %GRIS% &rarr; %VERT%"},
        {nom:"Charles d'Albret",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[noir],charge:true,impetueux:true,charisme:true,pdv:3,commandement:[2,2],maj:4,dates:[1388,1415],source:"https://fr.wikipedia.org/wiki/Charles_Ier_d%27Albret",blason:true,desc:"%MONTOUR% %XP%: %GRIS% &rarr; %VERT%%BR%%MELEE%: %MORT% &rarr; %XP%"},
        {nom:"Charles d'Albret",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir,noir],charge:true,impetueux:true,ralliement:true,pdv:4,commandement:[2,2],maj:4,dates:[1388,1415],source:"https://fr.wikipedia.org/wiki/Charles_Ier_d%27Albret",blason:true,desc:"%MONTOUR% %XP%: %GRIS% &rarr; %VERT%%BR%une zone ennemie adjacente vient d'être activée: + %MELEE%"},
        {nom:"Jean Jourdain",faction:FRANCAIS,type:INFANTERIE,melee:[blanc],defense:[noir],pdv:2,dates:[1418,1419],source:"https://www.paris-normandie.fr/rouen/l-histoire-revisitee--le-siege-de-rouen-entre-1418-et-1419-CN13969319"/*Siege de Rouen */,desc:"Couleuvrine%HERE%%TIRTENDU%: +1 <span class='derouge'></span>%BR%Couleuvrine%HERE%%TIRTENDU%: %MORT% &rarr; %XP%"},
        {nom:"Guy le Bouteiller",faction:FRANCAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[blanc],pdv:2,dates:[1414,1438],source:"http://www.mesqui.net/Articles_fortif/pdf/Guy-le-Bouteillier-et-La-Roche-Guyon.pdf",desc:"%MELEE%: %MORT% &rarr; %XP%%BR%%LEGENDE% %DEFENSE%: <span class='facerouge tue'></span> &rarr; <span class='facerouge bouclier'></span>"},
        {nom:"Alain Blanchard",faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[rouge],pdv:2,tir:[noir_bouclierrecule,noir_bouclierrecule],portee:3,typetir:TENDU,dates:[1394,1419],source:"https://fr.wikipedia.org/wiki/Alain_Blanchard_(capitaine)"},
        {nom:"Jeanne d'Arc",niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,jaune],defense:[noir,noir],pdv:3,commandement:[3,2],survie:true,priere:true,terreur:1,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ACTIVATED%%ROUNDCOND%: en fin d'activation, jouez %JAUNE% depuis la réserve commune dans la zone sitée jusqu'à 3 zones de distance de %THIS%%BR%%CAMP%: %RETARDE% &rarr; %RALLIE%"},
        {nom:"Jeanne d'Arc",niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[rouge,jaune],pdv:4,commandement:[2,2],terreur:2,riposte:ftrue,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ACTIVATED%%ROUNDCOND%: en fin d'activation, jouez un %JAUNE%  depuis la réserve commune dans la zone sitée jusqu'à 3 zones de distance de %THIS%%BR%%ROUND%: +1 %LEGENDE%, +1 %CARTELEGENDE%"},
        {nom:"Jeanne d'Arc",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc],defense:[noir],pdv:2,commandement:[1,1],terreur:1,survie:true,priere:true,maj:2,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ACTIVATED%%ROUNDCOND%: en fin d'activation, jouez %JAUNE% depuis la réserve commune dans la zone sitée jusqu'à 3 zones de distance de %THIS%%BR%%CAMP%: %RETARDE% &rarr; %RALLIE%"},
        {nom:"Jeanne d'Arc",faction:FRANCAIS,niv:0,type:INFANTERIE,defense:[noir],pdv:2,survie:true,priere:true,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ONCEINGAME%: +1 %CARTELEGENDE%, +1 %LEGENDE%"},
        {nom:"Bertrand du Guesclin",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,noir],defense:[rouge],pdv:5,charge:true,riposte:ftrue,pourfendeur:true,commandement:[1,1],maj:5,dates:[1337,1380],source:"https://fr.wikipedia.org/wiki/Bertrand_du_Guesclin",blason:true,moral:6,cout:435,desc:"%MELEE%: -1 <span class='deblanc'></span><span class='defense combat-cond'></span>%BR%Lorsqu'il est mis hors de combat, %THIS% est directement placé dans la zone d'attente de l'infirmerie"},
        {nom:"Bertrand du Guesclin",niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[rouge,blanc],pdv:5,cruel:true,gardeducorps:true,pourfendeur:true,commandement:[1,2],dates:[1337,1380],source:"https://fr.wikipedia.org/wiki/Bertrand_du_Guesclin",blason:true,moral:6,desc:"%XP%%XP% %MELEE%: 1 <span class='derouge'></span> &rarr; <span class='facerouge tue'></span>%BR%%MELEE%: %MORT% &rarr; %XP%"},
        {nom:"Bertrand du Guesclin",niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,noir,jaune],defense:[rouge,blanc],pdv:5,charge:true,riposte:ftrue,pourfendeur:true,commandement:[1,1],dates:[1337,1380],source:"https://fr.wikipedia.org/wiki/Bertrand_du_Guesclin",blason:true,moral:6,desc:"%CAMP%: %RALLIE%<span class='troupe combat-cond'></span>%BR%%ACTIVATED%%ROUNDCOND%: +1 %BLEU%"},
        {nom:"Amaury de Sévérac",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[rouge,rouge],pdv:2,mercenaire:true,riposte:ftrue,commandement:[1,2],maj:3,dates:[1385,1427],source:"https://fr.wikipedia.org/wiki/Amaury_de_S%C3%A9v%C3%A9rac",blason:true,desc:"%BLESSURE% &rarr; %XP%"},
        {nom:"Amaury de Sévérac",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc,jaune],defense:[rouge,rouge],pdv:3,pourfendeur:true,riposte:ftrue,commandement:[1,2],dates:[1385,1427],source:"https://fr.wikipedia.org/wiki/Amaury_de_S%C3%A9v%C3%A9rac",blason:true,desc:"%BLESSURE% &rarr; %XP%"},
        {nom:"Jeanne d'Arc",acheval:true,niv:1,faction:FRANCAIS,type:CAVALERIE,defense:[blanc],pdv:2,celerite:2,priere:true,parade:true,commandement:[AA,2],maj:4,dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,cout:325,desc:"%ACTIVATED%%ROUNDCOND%: +1 %JAUNE%"},
        {nom:"Jeanne d'Arc",acheval:true,niv:2,subfaction:MAL,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,blanc],defense:[rouge,jaune],pdv:4,celerite:2,riposte:ftrue,terreur:2,commandement:[2,2],dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,legendaire:true,desc:"%MELEE% / %DEFENSE%: <span class='faceblanc vierge'></span> &rarr; %LEGENDE% / %CARTELEGENDE%"},
        {nom:"Jeanne d'Arc",acheval:true,niv:2,subfaction:BIEN,faction:FRANCAIS,type:CAVALERIE,pdv:3,celerite:2,priere:true,ralliement:true,commandement:[3,2],dates:[1428,1431],source:"https://fr.wikipedia.org/wiki/Jeanne_d%27Arc",blason:true,moral:5,desc:"%ACTIVATED%%ROUNDCOND%: +1 %JAUNE% et jouez cet ordre immédiatement dans n'importe quelle zone alliée%BR%%ACTIVATED% %ROLL% le dé du Destin: %RALLIE% &rarr; %TOUTTYPE%%RALLIE%"},
        {nom:"Héros",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[noir],priere:true,feinte:true,commandement:[AA,1],maj:3,cout:160,moral:3},
        {nom:"Héros",niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,priere:true,parade:true,commandement:[1,1],moral:3},
        {nom:"Héros",niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[blanc_blanctouche,jaune_blanctouche],defense:[blanc,blanc],pdv:2,priere:true,terreur:1,commandement:[AA,2],moral:3},
        {nom:"Héros",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],priere:true,feinte:true,commandement:[AA,1],maj:3,moral:3,cout:160},
        {nom:"Héros",niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,priere:true,parade:true,commandement:[1,1],cout:160,moral:3},
        {nom:"Héros",niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[blanc_blanctouche,jaune_blanctouche],defense:[blanc,blanc],pdv:2,priere:true,terreur:1,commandement:[AA,2],moral:3},
        {nom:"Boucicaut",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[noir,noir],pdv:3,ralliement:true,commandement:[2,2],maj:4,modattaque:annule2recul,dates:[1340,1415],source:"https://fr.wikipedia.org/wiki/Jean_II_Le_Meingre",blason:true,moral:5,cout:405,desc:"%ACTIVATED% %XP%%XP%%XP% %ROUNDCOND%: +1 %BLEU%"},
        {nom:"Boucicaut",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,blanc],defense:[noir,noir],pdv:3,ralliement:true,celerite:2,commandement:[3,2],dates:[1340,1415],source:"https://fr.wikipedia.org/wiki/Jean_II_Le_Meingre",blason:true,desc:"%BLEU%%HERE%%ROUNDCOND%: vous pouvez jouer %BLEU%%HERE% après celui-ci%BR%%ACTIVATED%%TOURCOND% %XP%%XP%%XP%: +1 %BLEU%"},
        {nom:"Poton de Xaintrailles",niv:2,subfaction:MAL,faction:FRANCAIS,type:CAVALERIE,melee:[noir,noir],defense:[noir],pourfendeur:true,pdv:3,commandement:[1,2],dates:[1423,1450],source:"https://fr.wikipedia.org/wiki/Jean_Poton_de_Xaintrailles",blason:true,moral:4,desc:"%BLEU%%HERE%%ROUNDCOND%: vous pouvez jouer  %BLEU%%HERE% à la suite%BR%une zone adjacente ennemie vient de recevoir un ordre %ROUNDCOND%: +1 %MELEE%"},
        {nom:"Poton de Xaintrailles",niv:2,subfaction:BIEN,faction:FRANCAIS,type:CAVALERIE,melee:[noir,noir],defense:[noir],celerite:2,survie:true,pdv:3,commandement:[1,2],dates:[1423,1450],source:"https://fr.wikipedia.org/wiki/Jean_Poton_de_Xaintrailles",blason:true,moral:4,cout:260,desc:"%BLEU%%HERE%%ROUNDCOND%: vous pouvez jouer  %BLEU%%HERE% à la suite%BR%une zone adjacente ennemie vient de recevoir un ordre %ROUNDCOND%: +1 %MELEE%"},
        {nom:"Poton de Xaintrailles",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[noir,jaune],defense:[noir],survie:true,pdv:2,maj:3,dates:[1423,1450],source:"https://fr.wikipedia.org/wiki/Jean_Poton_de_Xaintrailles",blason:true,desc:"%XP% %MELEE%: %REROLL% <span class='denoir'></span>%BR%La Hire%HEREANDTHERE% %DEFENSE% +1 <span class='denoir'></span>"},
        {nom:"Charles de Bourbon",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,jaune],defense:[noir],pdv:2,maj:4,dates:[1416,1456],source:"https://fr.wikipedia.org/wiki/Charles_Ier_de_Bourbon",blason:true,cout:200,moral:3,desc:"%MELEE%: <span class='facejaune vierge'></span> &rarr; %LEGENDE%%BR%%ACTIVATED% %LEGENDE%%LEGENDE%: +1 %RUMEUR%"},
        {nom:"Charles de Bourbon",niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge,jaune],defense:[noir],impetueux:true,pdv:3,dates:[1416,1456],source:"https://fr.wikipedia.org/wiki/Charles_Ier_de_Bourbon",blason:true,moral:3,desc:"%MELEE%: <span class='facejaune vierge'></span> &rarr; %LEGENDE%%BR%%ACTIVATED% %LEGENDE%%LEGENDE%: +1 %RUMEUR%"},
        {nom:"La Hire",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,blanc],defense:[rouge,rouge],pdv:3,riposte:ftrue,charge:true,maj:4,dates:[1418,1443],source:"https://fr.wikipedia.org/wiki/%C3%89tienne_de_Vignolles",blason:true,cout:375,moral:5,desc:"X %BLESSURE% &rarr; %MELEE%: +X <span class='deblanc'></span>%BR%%MELEE%: %MORT% &rarr; %XP%"},
        {nom:"La Hire",niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[rouge,rouge],pdv:4,riposte:ftrue,charge:true,commandement:[AA,2],dates:[1418,1443],source:"https://fr.wikipedia.org/wiki/%C3%89tienne_de_Vignolles",blason:true,moral:5,desc:"X %BLESSURE% &rarr; %MELEE%: +X <span class='denoir'></span>%BR%quand %THIS% charge, + %PARADE%"},
        {nom:"La Hire",niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,blanc,blanc],defense:[rouge,blanc],pdv:4,terreur:2,dates:[1418,1443],source:"https://fr.wikipedia.org/wiki/%C3%89tienne_de_Vignolles",blason:true,moral:5,desc:"X %BLESSURE% &rarr; %MELEE%: +X <span class='derouge'></span>%BR%%MELEE%: %MORT% &rarr; %XP%%XP%"},
        {nom:"Jean de Dunois",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune,blanc],defense:[noir,noir],pdv:2,parade:true,celerite:2,maj:4,commandement:[AA,1],dates:[1422,1468],source:"https://fr.wikipedia.org/wiki/Jean_de_Dunois",blason:true,cout:410,moral:5,desc:"%MELEE%: -1 <span class='deblanc'></span><span class='defense combat-cond'></span>%BR%%ONCEINGAME%: %GRIS% &rarr; %BLEU%"},
        {nom:"Jean de Dunois",niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune,noir],defense:[noir,noir],pdv:3,relance:true,survie:true,commandement:[1,2],dates:[1422,1468],source:"https://fr.wikipedia.org/wiki/Jean_de_Dunois",blason:true,moral:5,desc:"%ACTIVATED% %LEGENDE%%ROUNDCOND% : %GRIS% &rarr; %BLEU%%BR%%ACTIVATED%%ROUNDCOND%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Jean de Dunois",niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,noir,blanc],defense:[noir],pdv:3,priere:true,cruel:true,commandement:[AA,1],dates:[1422,1468],source:"https://fr.wikipedia.org/wiki/Jean_de_Dunois",blason:true,moral:5,desc:"%ACTIVATED%%TOURCOND% 1 %TROUPE%%THERE%%MELEE%: +1 <span class='denoir'></span>%BR%%DEFENSE%: %LEGENDE%%LEGENDE% &rarr; %REROLL% <span class='deblanc'></span><span class='melee combat-cond'></span>"},
        {nom:"Jacques de Bourbon",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,maj:4,commandement:[AA,2],dates:[1342,1362],source:"https://fr.wikipedia.org/wiki/Jacques_Ier_de_Bourbon-La_Marche",blason:true},
        {nom:"Jacques de Bourbon",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],pdv:3,commandement:[1,2],dates:[1342,1362],source:"https://fr.wikipedia.org/wiki/Jacques_Ier_de_Bourbon-La_Marche",blason:true,desc:"%DEFENSE%: %TOUTTYPE%%HERE% &rarr; +1 %BOUCLIER%"},
        {nom:"Bertrand de Poulengy",faction:FRANCAIS,type:INFANTERIE,melee:[rouge],tir:[noir_bouclierrecule],typetir:TENDU,portee:1,defense:[rouge],pdv:2,relance:true,gardeducorps:true,dates:[1412,1456],source:"https://fr.wikipedia.org/wiki/Bertrand_de_Poulengy"},
        {nom:"Comte d'Auxerre",faction:FRANCAIS,type:INFANTERIE,melee:[rouge,jaune,blanc],defense:[blanc,blanc],pdv:3,gardeducorps:true,commandement:[AA,1],dates:[1350,1364],source:"https://fr.wikipedia.org/wiki/Jean_III_de_Chalon-Auxerre",blason:true,cout:190,moral:3},
        {nom:"Barral de Pontevès",niv:2,subfaction:BIEN,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir,blanc],charge:true,feinte:true,pourfendeur:true,pdv:3,commandement:[AA,2],dates:[1370,1390],source:"https://fr.wikipedia.org/wiki/Pontev%C3%A8s#Moyen_%C3%82ge",moral:4},    
        {nom:"Barral de Pontevès",niv:2,subfaction:MAL,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[jaune,jaune,jaune],pdv:3,charge:true,riposte:ftrue,immortel:true,commandement:[1,2],dates:[1370,1390],source:"https://fr.wikipedia.org/wiki/Pontev%C3%A8s#Moyen_%C3%82ge",moral:4,cout:240},    
        {nom:"Barral de Pontevès",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],charge:true,pdv:2,commandement:[AA,1],maj:4,dates:[1370,1390],source:"https://fr.wikipedia.org/wiki/Pontev%C3%A8s#Moyen_%C3%82ge"},    
        {nom:"Amaury de Craon",niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir,noir],pdv:2,commandement:[AA,2],dates:[1345,1373],source:"https://fr.wikipedia.org/wiki/Amaury_IV_de_Craon",blason:true,cout:280,moral:3,desc:"%ACTIVATED%%ROUNDCOND%: %MOVE% %THIS% de 2 zones"},    
        {nom:"Amaury de Craon",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge],defense:[noir,noir],pdv:2,commandement:[AA,1],maj:3,dates:[1345,1373],source:"https://fr.wikipedia.org/wiki/Amaury_IV_de_Craon",blason:true,desc:"%ACTIVATED%%TOURCOND%: en début ou fin d'activation, %MOVE% %THIS%"},    
        {nom:"Héros monté",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[AA,1],maj:3,cout:220,moral:3},    
        {nom:"Héros monté",niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[1,1],moral:3},    
        {nom:"Héros monté",niv:1,faction:BIEN,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[AA,1],maj:3},    
        {nom:"Héros monté",niv:2,faction:BIEN,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[1,1]},    
        {nom:"Philippe VI de Valois",niv:2,subfaction:MAL,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir,noir],pdv:3,priere:true,commandement:[3,2],dates:[1328,1350],source:"https://fr.wikipedia.org/wiki/Philippe_VI_de_Valois",blason:true,desc:"%TROUPE%%HERE%%DEFENSE%: + %GARDEDUCORPS%%BR%%ACTIVATED% %LEGENDE%: au début d'activation,  + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>"},    
        {nom:"Philippe VI de Valois",niv:2,subfaction:BIEN,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir,noir],pdv:3,priere:true,commandement:[3,2],dates:[1328,1350],legendaire:true,source:"https://fr.wikipedia.org/wiki/Philippe_VI_de_Valois",blason:true,desc:"%TROUPE%%HERE%: + %CHARGE%"},
        {nom:"Philippe VI de Valois",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge],defense:[noir,noir],pdv:2,priere:true,commandement:[1,1],modattaque:annule1recul,maj:4,dates:[1328,1350],source:"https://fr.wikipedia.org/wiki/Philippe_VI_de_Valois",blason:true,cout:300,moral:4,desc:"%ACTIVATED%%ROUNDCOND%: %MOVE% 1 %CAVALERIE% d'une zone en direction d'une zone ennemie"},
        {nom:"Charles II le Magnanime",niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,jaune],defense:[blanc,blanc,jaune],pdv:3,riposte:ftrue,impetueux:true,commandement:[AA,2],dates:[1324,1346],source:"https://fr.wikipedia.org/wiki/Charles_II_d%27Alen%C3%A7on",blason:true,desc:"%POURSUITE%: +1 %LEGENDE%%BR%%DEFENSE%: <span class='faceblanc vierge'></span> &rarr; %CARTELEGENDE%"},
        {nom:"Charles II le Magnanime",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[jaune_relance,jaune_relance],defense:[blanc,blanc],pdv:2,riposte:ftrue,impetueux:true,commandement:[AA,1],maj:4,dates:[1324,1346],source:"https://fr.wikipedia.org/wiki/Charles_II_d%27Alen%C3%A7on",blason:true,cout:310,moral:4,desc:"%DEFENSE%: <span class='faceblanc vierge'></span> &rarr; %CARTELEGENDE%"},
        {nom:"Baudoin de Lens",faction:FRANCAIS,type:CAVALERIE,melee:[noir_bouclierrecule,noir_bouclierrecule],defense:[noir],pdv:2,impetueux:true,priere:true,dates:[1358,1364],source:"https://fr.wikipedia.org/wiki/Ma%C3%AEtre_des_arbal%C3%A9triers",cout:175,moral:3},
        {nom:"Jean de Metz",faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[rouge],pdv:2,riposte:ftrue,impetueux:true,dates:[1428,1456],source:"https://fr.wikipedia.org/wiki/Jean_de_Metz",blason:true,cout:155,moral:3,desc:"%LEGENDE% %DEFENSE%: <span class='facerouge tue'></span> &rarr; <span class='facerouge bouclier'></span>%BR%%MELEE%: %MORT% &rarr; %XP%"},
        {nom:"Arthur de Richemont",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,jaune],pdv:2,priere:true,cruel:true,commandement:[AA,2],maj:5,dates:[1414,1458],source:"https://fr.wikipedia.org/wiki/Arthur_III_de_Bretagne",blason:true,desc:"%ACTIVATED%%TOURCOND% %LEGENDE%: %MOVE% %THIS%%BR%%TOUTTYPE%%HERE%: - Impetueux"},
        {nom:"Arthur de Richemont",niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge,blanc],pdv:3,priere:true,relance:true,commandement:[1,3],dates:[1414,1458],source:"https://fr.wikipedia.org/wiki/Arthur_III_de_Bretagne",blason:true,desc:"%ACTIVATED%%TOURCOND% %LEGENDE%%LEGENDE%: %CHOOSE% 1 %CARTELEGENDE%%BR%%CONSEIL%: %ROLL% <span class='denoir'></span>: <span class='facenoir touche'></span> &rarr; -1 %GRIS% / %VERT% / %BLEU% / %JAUNE% %ADVERSAIRE%"},
        {nom:"Jean 1er de Luxembourg",faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge,noir],defense:[rouge],pdv:2,parade:true,impetueux:true,dates:[1310,1346],source:"https://fr.wikipedia.org/wiki/Jean_Ier_de_Boh%C3%AAme",blason:true,desc:"%ACTIVATED% %ROLL% <span class='denoir'></span>: <span class='facenoir tue'></span> &rarr; un adversaire joue %THIS% pendant cette activation"},
        {nom:"Erwan de Romorantin",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge],defense:[noir,noir],pdv:2,commandement:[1,1],maj:3,dates:[1356,1356],cout:240,moral:3,desc:"Paysans%HERE%, Milice bourgeoise%HERE%, %MELEE% +1 <span class='deblanc'></span>"},
        {nom:"Erwan de Romorantin",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir,noir],pdv:3,commandement:[1,2],dates:[1356,1356],moral:3,desc:"Paysans%HERE%, Milice bourgeoise%HERE%, %MELEE% +1 <span class='dejaune'></span>"},
        {nom:"Jean de Vienne",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[jaune,jaune],defense:[noir],priere:true,pdv:3,modattaque:annule1touche,maj:3,dates:[1347,1347,1358,1396],source:"https://fr.wikipedia.org/wiki/Jean_de_Vienne",blason:true,cout:255,moral:3,desc:"%ACTIVATED%%ROUNDCOND%: %ROLL% 1 <span class='denoir'></span>, <span class='facenoir touche'></span> &rarr; -1 %LEGENDE% %ADVERSAIRE%"},
        {nom:"Jean de Vienne",niv:2,faction:FRANCAIS,type:INFANTERIE,melee:[jaune,jaune,jaune],defense:[noir],pdv:3,gardeducorps:true,soin:true,dates:[1347,1347,1358,1396],source:"https://fr.wikipedia.org/wiki/Jean_de_Vienne",blason:true,moral:3,desc:"%ACTIVATED%: %CARTELEGENDE% &rarr; %CARTELEGENDE%%BR%%ACTIVATED% %CARTELEGENDE%%CARTELEGENDE%%TOURCOND%: + %GRIS%"},
        {nom:"Le Veneur",faction:FRANCAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[blanc],commandement:[1,1],desc:"%THIS% ne peut commander que les chiens de chasse%BR%%TOUTTYPE%%HEREANDTHEREHEXA% doit être révélées"},
        {nom:"Gilles de Rais",niv:1,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,jaune],defense:[noir],charisme:true,pdv:3,maj:4,dates:[1420,1436],source:"https://fr.wikipedia.org/wiki/Gilles_de_Rais",blason:true,moral:4,cout:305,desc:"%ACTIVATED% %XP%%TOURCOND%: %RALLIE%<span class='troupe combat-cond'></span>%HERE%%BR%%MELEE%: 1+ <span class='facerouge vierge'></span> / <span class='facejaune vierge'></span> &rarr; %REROLL% 1 <span class='derouge'></span> / <span class='dejaune'></span>"},
        {nom:"Gilles de Rais",niv:2,subfaction:BIEN,faction:FRANCAIS,type:INFANTERIE,melee:[rouge,rouge,jaune,jaune],defense:[noir,jaune],pdv:3,charisme:true,pourfendeur:true,commandement:[1,1],dates:[1420,1436],source:"https://fr.wikipedia.org/wiki/Gilles_de_Rais",blason:true,moral:4,desc:"%ACTIVATED%: au début d'activation, %MOVE% %RALLIEMENT%%BR%%MELEE%: 1+ <span class='facerouge vierge'></span> / <span class='facejaune vierge'></span> &rarr; %REROLL% 1 <span class='derouge'></span> / <span class='dejaune'></span>"},
        {nom:"Gilles de Rais",niv:2,subfaction:MAL,faction:FRANCAIS,type:INFANTERIE,melee:[noir,jaune],defense:[blanc,blanc],pdv:2,charisme:true,commandement:[AA,3],dates:[1420,1436],source:"https://fr.wikipedia.org/wiki/Gilles_de_Rais",blason:true,moral:4,desc:"%ACTIVATED%%TOURCOND% %XP%%XP% : placez une troupe alliée détruite dans la zone de %THIS%%BR%%ACTIVATED%%TOURCOND% %XP%%XP%%XP%: une troupe ennemie adjacente à %THIS% rejoint sa zone et passe sous votre controle"},
        {nom:"Ambroise de Loré",niv:1,faction:FRANCAIS,type:CAVALERIE,melee:[rouge],defense:[noir],charge:true,pdv:2,maj:4,commandement:[AA,1],dates:[1410,1446],source:"https://fr.wikipedia.org/wiki/Ambroise_de_Lor%C3%A9",blason:true,cout:270,moral:3,desc:"%ACTIVATED%%ROUNDCOND%: +1 %VERT%"},
        {nom:"Ambroise de Loré",niv:2,faction:FRANCAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[AA,1],dates:[1410,1446],source:"https://fr.wikipedia.org/wiki/Ambroise_de_Lor%C3%A9",blason:true,moral:3,desc:"%ACTIVATED%%ROUNDCOND%: +1 %VERT%"},
        {nom:"Edmond de Somerset",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[rouge],riposte:ftrue,charisme:true,pdv:3,maj:4,commandement:[1,1],dates:[1420,1455],source:"https://fr.wikipedia.org/wiki/Edmond_Beaufort_(1er_duc_de_Somerset)",blason:true,desc:"%MELEE%: -1 <span class='deblanc'></span><span class='defense combat-cond'></span>"},
        {nom:"Edmond de Somerset",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,jaune],defense:[blanc,rouge],riposte:ftrue,relance:true,charisme:true,pdv:3,commandement:[1,2],dates:[1420,1455],source:"https://fr.wikipedia.org/wiki/Edmond_Beaufort_(1er_duc_de_Somerset)",blason:true,desc:"%MELEE%: -1 <span class='deblanc'></span><span class='defense combat-cond'></span>%BR%%MONTOUR%: +1 %LEGENDE%"},
        {nom:"Thomas Kyriell",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[noir],genie:true,visee:true,pdv:2,maj:4,commandement:[2,2],dates:[1416,1461],source:"https://fr.wikipedia.org/wiki/Thomas_Kyriell",blason:true,desc:"Archers%HERE%%TOURCOND% %TIRCLOCHE%: +1 <span class='derouge'></span>%BR%%MELEE%:  <span class='facejaune vierge'></span> / <span class='facenoir vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Thomas Kyriell",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,jaune],defense:[jaune,rouge],feinte:true,visee:true,pdv:3,commandement:[2,2],dates:[1416,1461],source:"https://fr.wikipedia.org/wiki/Thomas_Kyriell",blason:true,desc:"Archers%HERE%%TOURCOND% %TIRCLOCHE%: +1 <span class='derouge'></span>%BR%%MELEE%:  <span class='facejaune vierge'></span> / <span class='facenoir vierge'></span> &rarr %LEGENDE%"},
        {nom:"Mathieu Goth",faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,unrecul],defense:[rouge],impetueux:true,charge:true,mercenaire:true,pdv:3,commandement:[2,2],dates:[1406,1450],source:"http://formigny.free.fr/acteurs.html",desc:"%POURSUITE%%TOURCOND%: +1 %MELEE%"},
        {nom:"Edouard d'York",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[rouge],charge:true,genie:true,pdv:3,maj:4,commandement:[2,2],dates:[1401,1415],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Norwich",blason:true,desc:"%ACTIVATED%%TOURCOND%: %MOVE% %TOUTTYPE%<span class='tircloche combat-cond'></span> / %TOUTTYPE%<span class='tirtendu combat-cond'></span>%HERE%%BR%%MONTOUR%: +1 %LEGENDE%"},
        {nom:"Edouard d'York",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,jaune],defense:[noir,rouge],cruel:true,charge:true,gardeducorps:true,pdv:3,commandement:[2,3],dates:[1401,1415],modattaque:transformetoucherecul,source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Norwich",blason:true,desc:"%MONTOUR%: +1 %LEGENDE%"},
        {nom:"William Glasdale",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[jaune,blanc],riposte:ftrue,visee:true,pdv:2,maj:3,modattaque: transformetoucherecul,commandement:[1,2],dates:[1409,1429],source:"https://fr.wikipedia.org/wiki/William_Glasdale",blason:true},
        {nom:"William Glasdale",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[blanc,blanc],riposte:ftrue/*,feinte:true*/,pdv:3,modattaque:annule1touche,commandement:[1,3],dates:[1409,1429],source:"https://fr.wikipedia.org/wiki/William_Glasdale",blason:true},
        {nom:"Guillaume de Molins",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],priere:true,feinte:true,pdv:2,maj:3,commandement:[AA,1],dates:[1429,1429],source:"https://www.persee.fr/docAsPDF/bec_0373-6237_1847_num_8_1_452089.pdf"},
        {nom:"Guillaume de Molins",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],priere:true,feinte:true,parade:true,pdv:3,commandement:[1,1],dates:[1429,1429],source:"https://www.persee.fr/docAsPDF/bec_0373-6237_1847_num_8_1_452089.pdf"},
        {nom:"Comte de Northampton",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[blanc,blanc],parade:true,pdv:2,maj:3,commandement:[1,1],dates:[1339,1360],source:"https://fr.wikipedia.org/wiki/Guillaume_de_Bohun",blason:true,moral:3,cout:290,desc:"%MELEE%: %INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE% &rarr; +1 <span class='dejaune'></span>%BR%%TROUPE%%HERE%: + %MASSE%"},
        {nom:"Comte de Northampton",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir],priere:true,pdv:2,commandement:[1,2],dates:[1339,1360],source:"https://fr.wikipedia.org/wiki/Guillaume_de_Bohun",blason:true,cout:290,moral:3,desc:"%DEFENSE%: %INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE% &rarr; +1 <span class='dejaune'></span>%BR%%TROUPE%%HERE%: + %MASSE%"},
        {nom:"Jean de Lancastre",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[blanc],defense:[jaune,jaune,blanc_blancbouclier],riposte:ftrue,pdv:2,commandement:[AA,1],maj:4,dates:[1403,1435],source:"https://fr.wikipedia.org/wiki/Jean_de_Lancastre",blason:true,cout:270,moral:3,desc:"+X %CARTELEGENDE% &rarr; +1 %CARTELEGENDE%"},
        {nom:"Jean de Lancastre",niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[jaune,jaune,blanc_blancbouclier],ralliement:true,riposte:ftrue,pdv:2,commandement:[1,1],dates:[1403,1435],source:"https://fr.wikipedia.org/wiki/Jean_de_Lancastre",blason:true, desc:"%MONTOUR%: %GRIS%/%VERT%/%BLEU%/%JAUNE% &rarr; %GRIS%/%VERT%/%BLEU%/%JAUNE%"},
        {nom:"Jean de Lancastre",niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune,jaune],defense:[noir,noir],pdv:2,ralliement:true,modattaque:annule1touche,riposte:ftrue,commandement:[1,2],dates:[1403,1435],source:"https://fr.wikipedia.org/wiki/Jean_de_Lancastre",blason:true,moral:3,desc:"%MELEE%: <span class='facenoir bouclier'></span> / <span class='facejaune vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Sir John Jouel",faction:ANGLAIS,type:INFANTERIE,melee:[blanc_blanctouche,blanc_blanctouche],defense:[blanc,noir],gardeducorps:true,pdv:2,commandement:[AA,1],dates:[1353,1374],source:"https://fr.wikipedia.org/wiki/Bataille_de_Cocherel",cout:205,moral:3},
        {nom:"John Talbot",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir],charge:true,feinte:true,pdv:2,commandement:[1,1],maj:3,dates:[1404,1453],source:"https://fr.wikipedia.org/wiki/John_Talbot_(1er_comte_de_Shrewsbury)",blason:true,cout:330,moral:3,desc:"%TROUPE%%HERE%: + %CHARGE%"},
        {nom:"John Talbot",niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],feinte:true,parade:true,charge:true,pdv:4,commandement:[1,3],dates:[1404,1453],source:"https://fr.wikipedia.org/wiki/John_Talbot_(1er_comte_de_Shrewsbury)",blason:true,moral:3,desc:"%MONTOUR%: +1 %GRIS%"},
        {nom:"John Talbot",niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,terreur:1,pdv:3,commandement:[1,2],dates:[1404,1453],source:"https://fr.wikipedia.org/wiki/John_Talbot_(1er_comte_de_Shrewsbury)",blason:true,moral:3,desc:"%ONCEINGAME%: +2 Chiens de guerre%HERE%%BR% Chiens de guerre%HERE%: + %CHARGE%"},
        {nom:"Comte de Suffolk",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[blanc,blanc],ralliement:true,pdv:2,maj:3,commandement:[AA,1],dates:[1337,1369],source:"https://fr.wikipedia.org/wiki/Robert_d%27Ufford",blason:true,cout:260,moral:3, desc:"%ACTIVATED%%XP% %TOURCOND%: %RALLIE% %TROUPE%%HERE%"},
        {nom:"Comte de Suffolk",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[blanc,blanc],survie:true,pdv:2,commandement:[1,2],dates:[1337,1369],source:"https://fr.wikipedia.org/wiki/Robert_d%27Ufford", blason:true,moral:3,desc:"%TROUPE%%HERE%: + %COHESION%"},
        {nom:"Comte de Salisbury",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[noir],ralliement:true,survie:true,pdv:2,maj:4,commandement:[1,1],dates:[1344,1397,1414,1428],source:"https://fr.wikipedia.org/wiki/William_Montagu_(2e_comte_de_Salisbury) https://fr.wikipedia.org/wiki/Thomas_Montaigu",blason:true,desc:"1 Archers%HERE%%TIRCLOCHE%: +1 <span class='derouge'></span>%BR%%MELEE%: <span class='facerouge vierge'></span> /  <span class='facejaune vierge'></span> &rarr; %XP%"},
        {nom:"Comte de Salisbury",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[rouge,noir],riposte:ftrue,survie:true,visee:true,pdv:3,commandement:[1,2],dates:[1344,1397,1414,1428],source:"https://fr.wikipedia.org/wiki/William_Montagu_(2e_comte_de_Salisbury) https://fr.wikipedia.org/wiki/Thomas_Montaigu",blason:true,desc:"1 Archers%HERE%%TIRCLOCHE%: +1 <span class='derouge'></span>%BR%%LEGENDE% %ACTIVATED%%TOURCOND%: + %CELERITE% 2"},
        {nom:"Comte d'Arundel",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir,jaune],riposte:ftrue,pdv:2,maj:3,commandement:[1,1],dates:[1313,1376],source:"https://fr.wikipedia.org/wiki/Richard_FitzAlan_(3e_comte_d%27Arundel)",blason:true,cout:265,moral:3,desc:"%SPECIAL%%TOURCOND%: %MOVE% %THIS% %HEREANDTHEREHEXA%"},
        {nom:"Comte d'Arundel",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],genie:true,pdv:3,commandement:[1,3],dates:[1313,1376],source:"https://fr.wikipedia.org/wiki/Richard_FitzAlan_(3e_comte_d%27Arundel)",blason:true,moral:3,desc:"%ACTIVATED%%TOURCOND%: %MOVE% %THIS% %HEREANDTHEREHEXA%"},
        {nom:"Comte d'Oxford",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[blanc,rouge],charge:true,riposte:ftrue,pdv:3,maj:4,commandement:[1,2],dates:[1331,1360,1400,1417],source:"http://www.luminarium.org/encyclopedia/devere7.htm https://fr.wikipedia.org/wiki/Richard_de_Vere",blason:true,desc:"%MELEE%: %INFANTERIE%%INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE% &rarr; +1 <span class='deblanc'></span>"},
        {nom:"Comte d'Oxford",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[rouge,blanc,blanc],charge:true,riposte:ftrue,terreur:1,pdv:3,commandement:[1,2],dates:[1331,1360,1400,1417],source:"http://www.luminarium.org/encyclopedia/devere7.htm https://fr.wikipedia.org/wiki/Richard_de_Vere",blason:true,desc:"%MELEE%: %INFANTERIE%%INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE% &rarr; +1 <span class='derouge'></span>%BR%%DEFENSE%, %NOPLAIN%: %TOUCHE% &rarr; %RECUL%" },
        {nom:"Comte de Warwick",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir],charge:true,pourfendeur:true,pdv:3,maj:4,commandement:[1,2],dates:[1329,1369],source:"https://fr.wikipedia.org/wiki/Thomas_Beauchamp_(11e_comte_de_Warwick)",blason:true,desc:"%ACTIVATED%%TOURCOND% %XP%: %INFANTERIE%<span class='troupe combat-cond'></span>%HERE% + %CELERITE% 2"},
        {nom:"Comte de Warwick",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir,blanc],defense:[rouge,noir],charge:true,parade:true,gardeducorps:true,pdv:4,commandement:[1,3],dates:[1329,1369],source:"https://fr.wikipedia.org/wiki/Thomas_Beauchamp_(11e_comte_de_Warwick)",blason:true,desc:"%ACTIVATED%%TOURCOND% %XP%: %INFANTERIE%<span class='troupe combat-cond'></span>%HERE% + %CELERITE% 2%BR%%MONTOUR% %LEGENDE%: + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>" },
        {nom:"John de la Pôle",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[blanc,noir],genie:true,pdv:2,maj:3,commandement:[AA,1],dates:[1423,1428],source:"https://fr.wikipedia.org/wiki/Bataille_de_la_Brossini%C3%A8re#John_de_la_Pole",blason:true,moral:3,cout:275,modattaque:transformetoucherecul},/* TODO: n'existe pas ?*/
        {nom:"John de la Pôle",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[blanc,jaune],ralliement:true,pdv:3,commandement:[1,1],dates:[1423,1428],source:"https://fr.wikipedia.org/wiki/Bataille_de_la_Brossini%C3%A8re#John_de_la_Pole",blason:true,moral:3,desc:"%MELEE%: %BOUCLIER% &rarr; %LEGENDE% %CARTELEGENDE%"},
        {nom:"William de la Pôle",niv:1,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,jaune],defense:[noir],charge:true,maj:3,commandement:[AA,1],dates:[1415,1450],source:"https://fr.wikipedia.org/wiki/William_de_la_Pole",blason:true,modattaque:transformetoucherecul},
        {nom:"William de la Pôle",niv:2,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],charge:true,pdv:2,commandement:[1,1],dates:[1415,1450],source:"https://fr.wikipedia.org/wiki/William_de_la_Pole",blason:true,desc:"1 Archers dans cet hexagone %TIRCLOCHE%: +1 <span class='derouge'></span>"},
        {nom:"Le Prince Noir",niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charge:true,terreur:1,pdv:3,commandement:[1,2],dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:4,desc:"%MONTOUR%: +1 %BLEU%%BR%%ACTIVATED%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Le Prince Noir",niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir],cruel:true,terreur:2,pdv:3,commandement:[1,2],dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:4,desc:"%MONTOUR%, %ROLL% 1 <span class='denoir'></span>: <span class='facenoir touche'></span> &rarr; -1 %LEGENDE% %ADVERSAIRE%%BR%%ACTIVATED% %XP%%XP%: +2 %CARTELEGENDE%"},
        {nom:"Le Prince Noir",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],charisme:true,terreur:1,pdv:2,commandement:[1,1],maj:5,dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:4,cout:300,desc:"%CAVALERIE%<span class='troupe combat-cond'></span>%HERE%: + %CELERITE% 2%BR%%ACTIVATED%: %MOVE% %RALLIEMENT%"},
        {nom:"Thomas de Scales",niv:1,faction:ANGLAIS,type:CAVALERIE,melee:[rouge],defense:[noir],relance:true,gardeducorps:true,pdv:2,maj:3,dates:[1419,1460],source:"https://fr.wikipedia.org/wiki/Thomas_de_Scales",blason:true,cout:210,moral:3,desc:"%PERSONNAGE%%HERE%: + %ESQUIVE%"},
        {nom:"Thomas de Scales",niv:2,faction:ANGLAIS,type:CAVALERIE,melee:[rouge],defense:[noir,noir],pourfendeur:true,riposte:ftrue,pdv:3,commandement:[1,1],dates:[1419,1460],source:"https://fr.wikipedia.org/wiki/Thomas_de_Scales",blason:true,desc:"une fois pendant votre tour, %POURSUITE%: +1 %MELEE%"},
        {nom:"Edouard III",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir,noir],charisme:true,priere:true,pdv:2,maj:4,commandement:[2,2],dates:[1327,1377],source:"https://fr.wikipedia.org/wiki/%C3%89douard_III",blason:true,cout:385,moral:5, desc:"%CAMP%: %RALLIE%<span class='troupe combat-cond'></span>%BR%%ACTIVATED%: 1 Archers situés à 2 zones + %MELEE%"},
        {nom:"Edouard III",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir,noir],charisme:true,ralliement:true,soin:true,pdv:2,commandement:[2,3],dates:[1327,1377],source:"https://fr.wikipedia.org/wiki/%C3%89douard_III",blason:true,moral:5,desc:"%CAMP%: %RALLIE%<span class='troupe combat-cond'></span>%BR%%ACTIVATED% %LEGENDE%%LEGENDE%%ROUNDCOND%: %GRIS% &rarr; %JAUNE%"},
        {nom:"Henry V",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[blanc,blanc],feinte:true,riposte:ftrue,pdv:3,maj:4,commandement:[1,2],dates:[1410,1422],source:"https://fr.wikipedia.org/wiki/Henri_V_(roi_d%27Angleterre)",blason:true,desc:"%MONTOUR% %XP%%LEGENDE%: %BLEU%%BR%%MELEE%: <span class='facejaune bouclier'></span> / <span class='facenoir bouclier'></span> &rarr; %XP%"},
        {nom:"Henry V",niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,jaune],defense:[noir],visee:true,genie:true,pdv:2,commandement:[2,2],dates:[1410,1422],source:"https://fr.wikipedia.org/wiki/Henri_V_(roi_d%27Angleterre)",blason:true,desc:"%BLEU%%ROUNDCOND%: vous pouvez jouer  %BLEU% à la suite%BR%%MONTOUR%: %MOVE% %THIS% vers une zone adjacente"},
        {nom:"Henry V",niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir,noir],visee:true,genie:true,charge:true,pdv:3,commandement:[3,3],dates:[1410,1422],source:"https://fr.wikipedia.org/wiki/Henri_V_(roi_d%27Angleterre)",blason:true,desc:"<span class='blason-large mal'></span>%HERE%: + %CHARGE%%BR%%MONTOUR%: +1 %BLEU%"},
        // Le meme que le francais
        {nom:"Héros monté",niv:1,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[AA,1],maj:3},    
        {nom:"Héros monté",niv:2,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,commandement:[1,1]},    
        {nom:"Espion",faction:ANGLAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[noir,jaune],pdv:2,esquive:true,parade:true,desc:"%THIS% peut emprunter un Passage secret sans dépenser de jeton"},    
        {nom:"Assassin",faction:ANGLAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir],pdv:2,riposte:ftrue,feinte:true, desc:"%REVEALED%, %MELEE%: +1 <span class='derouge'></span>%BR%%MELEE%: -1 <span class='deblanc'></span><span class='defense combat-cond'></span>"},
        {nom:"Jean II de Luxembourg",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,blanc],defense:[blanc],mercenaire:true,charisme:true,pdv:2,maj:3,commandement:[AA,1],dates:[1414,1441],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Luxembourg-Ligny",blason:true,desc:"%DEFENSE%: pas d'unité%HERE% &rarr; +1 <span class='deblanc'></span>"},
        {nom:"Jean II de Luxembourg",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[noir,blanc],defense:[blanc,jaune],charisme:true,mercenaire:true,pdv:2,commandement:[AA,1],dates:[1414,1441],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Luxembourg-Ligny",blason:true,desc:"%DEFENSE%:  si %THIS% ne peut se déplacer dans une zone adjacente à la suite d'un %RECUL%, annulez ce %RECUL%"},
        {nom:"Archange saint Michel",niv:1,faction:BIEN,type:VOLANT,melee:[rouge,rouge,rouge,blanc],defense:[noir,blanc,blanc],pdv:6,pourfendeur:true,saut:2,riposte:ftrue,tir:[rouge,rouge],typetir:TENDU,portee:2,commandement:[AA,2],maj:5,dates:[1409,1409],desc:"%MELEE%: %LEGENDE% &rarr; +1 <span class='derouge'></span>"},    
        {nom:"Archange saint Michel",niv:2,faction:BIEN,type:VOLANT,melee:[rouge,rouge,rouge,blanc,blanc],defense:[noir,blanc,blanc],pdv:6,pourfendeur:true,saut:2,riposte:ftrue,commandement:[AA,3],dates:[1409,1409],desc:"%ACTIVATED%%TOURCOND% %XP%: +1 %BLEU%%BR%%MELEE%: %LEGENDE% &rarr; +1 <span class='derouge'></span>"},    
        {nom:"La Grande Faucheuse",faction:MERCENAIRE,type:VOLANT,melee:[rouge,blanc_blanctue,blanc_blanctue], defense:[noir],pdv:4,immortel:true,terreur:2,survie:true,commandement:[AA,4],desc:"%CAMP% %LEGENDE%: choisissez une unité, %ROLL% le dé du destin, %MORT% / %RETARDE% &rarr; %MORT%"},    
        {nom:"Le Prince Noir",acheval:true,niv:2,subfaction:BIEN,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge,jaune],defense:[noir],charge:true,celerite:2,pdv:4,commandement:[1,2],dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:5,desc:"%MONTOUR%: +3 %CARTELEGENDE%, %DEFAUSSEZEN% 2%BR%%MONTOUR% %LEGENDE%: %GRIS% &rarr; %VERT%"},
        {nom:"Le Prince Noir",acheval:true,niv:2,subfaction:MAL,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge,rouge,jaune],defense:[noir],charge:true,feinte:true,pdv:3,commandement:[AA,3],dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:5,desc:"%ACTIVATED% %LEGENDE%: <span class='commandement'><span style='color:black;text-shadow:1px 1px;'>3</span>&nbsp;&nbsp;6</span>%BR%le trait %VISEE% ne peut pas être utilisé contre %THIS%"},
        {nom:"Le Prince Noir",acheval:true,niv:1,faction:ANGLAIS,type:CAVALERIE,melee:[rouge,rouge,blanc],defense:[noir],charge:true,ralliement:true,celerite:2,pdv:3,commandement:[1,1],maj:5,dates:[1346,1376],source:"https://fr.wikipedia.org/wiki/%C3%89douard_de_Woodstock",blason:true,moral:5,cout:435,desc:"%CAVALERIE%%HERE%: + %CELERITE% 2%BR%%MELEE%: <span class='faceblanc bouclier'></span> &rarr; %LEGENDE%"},
        {nom:"Captal de Buch",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,charge:true,commandement:[1,2],maj:4,dates:[1348,1376],source:"https://fr.wikipedia.org/wiki/Jean_de_Grailly",blason:true,moral:3,cout:285,desc:"%ACTIVATED% %LEGENDE%%TOURCOND%: + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span> / <span class='commandement'><span style='color:black;text-shadow:1px 1px;'>1</span></span>"},    
        {nom:"Captal de Buch",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir,rouge],pdv:3,charge:true,visee:true,commandement:[2,2],dates:[1348,1376],source:"https://fr.wikipedia.org/wiki/Jean_de_Grailly",blason:true,moral:3,desc:"%ACTIVATED%%TOURCOND% %LEGENDE% : + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span> / <span class='commandement'><span style='color:black;text-shadow:1px 1px;'>1</span></span>%BR%%ACTIONPLAYER%%TOURCOND% %XP%: +1 %BLEU%"},    
        {nom:"Thomas Montaigu",faction:ANGLAIS,type:INFANTERIE,melee:[rouge,rouge,blanc],defense:[noir],pdv:2,genie:true,charisme:true,commandement:[AA,3],dates:[1414,1428],source:"https://fr.wikipedia.org/wiki/Thomas_Montaigu",blason:true,desc:"%MONTOUR% %XP%%LEGENDE% : %CARTERIVIERE%%BR%%MONTOUR% %XP%%XP%: +1 %JAUNE%"},    
        {nom:"John Chandos",niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge,noir],defense:[rouge,rouge,rouge],pdv:3,riposte:ftrue,survie:true,commandement:[1,2],dates:[1339,1370],source:"https://fr.wikipedia.org/wiki/John_Chandos",blason:true,moral:3,desc:"%CONSEIL%: +1 %GRIS%, +1 %XP%"},    
        {nom:"John Chandos",niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[noir,noir,noir],defense:[noir],pdv:4,pourfendeur:true,gardeducorps:true,commandement:[AA,3],dates:[1339,1370],source:"https://fr.wikipedia.org/wiki/John_Chandos",bonusattaque:untouchetue,blason:true,moral:3,desc:"%MONTOUR%: +1 %GRIS%%BR%%MELEE%: 1 <span class='facenoir touche'></span> &rarr; 1 <span class='facenoir tue'></span>"},
        {nom:"John Chandos",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[rouge],pdv:2,riposte:ftrue,mercenaire:true,commandement:[AA,1],maj:2,dates:[1339,1370],source:"https://fr.wikipedia.org/wiki/John_Chandos",blason:true,moral:3,cout:290,desc:"%CONSEIL%: +1 %CARTELEGENDE%"},
        {nom:"Simon Morhier",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:2,genie:true,maj:2,dates:[1422,1429],source:"https://fr.wikipedia.org/wiki/Simon_Morhier",cout:195,moral:3,desc:"%INFANTERIE%<span class='troupe combat-cond'></span>%HERE%%MELEE%: +1 <span class='deblanc'></span>"},    
        {nom:"Simon Morhier",niv:2,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir,noir],pdv:2,genie:true,parade:true,commandement:[AA,1],dates:[1422,1429],source:"https://fr.wikipedia.org/wiki/Simon_Morhier",desc:"%INFANTERIE%%INFANTERIE%<span class='troupe combat-cond'></span>%HERE%%MELEE%: +1 <span class='deblanc'></span>"},    
        {nom:"John Fastolf",niv:2,subfaction:BIEN,faction:ANGLAIS,type:INFANTERIE,melee:[rouge_recultouche,rouge_recultouche],defense:[noir],pdv:2,riposte:ftrue,charge:true,commandement:[1,2],dates:[1410,1459],source:"https://fr.wikipedia.org/wiki/John_Fastolf",blason:true,desc:"%ACTIVATED% %XP%: %MOVE% 1 %CAVALERIE% alliée d'une zone"},    
        {nom:"John Fastolf",niv:2,subfaction:MAL,faction:ANGLAIS,type:INFANTERIE,melee:[rouge],defense:[noir],pdv:3,cruel:true,parade:true,commandement:[2,1],dates:[1410,1459],source:"https://fr.wikipedia.org/wiki/John_Fastolf",blason:true,desc:"%DEFENSE%: %TOUCHE% &rarr; %RECUL%, vous pouvez l'affecter à une autre de vos unités%HEREANDTHERE%"},
        {nom:"John Fastolf",niv:1,faction:ANGLAIS,type:INFANTERIE,melee:[noir,jaune],defense:[jaune,jaune],pdv:2,riposte:ftrue,esquive:true,commandement:[AA,1],maj:3,dates:[1410,1459],source:"https://fr.wikipedia.org/wiki/John_Fastolf",blason:true,desc:"%DEFENSE%: %RECUL% &rarr; vous pouvez déplacer %THIS% jusqu'à 2 zones"},
        {nom:"Jean Stuart de Derneley",niv:1,faction:ECOSSAIS,type:INFANTERIE,melee:[noir,noir],defense:[noir],pdv:2,impetueux:true,charge:true,feinte:true,maj:2,commandement:[AA,1],dates:[1421,1429],source:"https://fr.wikipedia.org/wiki/John_Stuart_de_Darnley",blason:true,cout:320,moral:4,desc:"%MELEE%: %MORT% &rarr; reprenez le jeton de relance si vous ne l'avez plus"},
        {nom:"Jean Stuart de Derneley",niv:2,faction:ECOSSAIS,type:INFANTERIE,melee:[rouge,noir],defense:[noir],pdv:3,feinte:true,charge:true,modattaque:annule1recul,commandement:[AA,2],dates:[1421,1429],source:"https://fr.wikipedia.org/wiki/John_Stuart_de_Darnley",blason:true,moral:4,desc:"%MELEE%: %MORT% &rarr; reprenez le jeton de relance si vous ne l'avez plus%BR%%POURSUITE%: +1 %LEGENDE%"},    
        {nom:"William Wallace",niv:2,subfaction:BIEN,faction:ECOSSAIS,type:INFANTERIE,melee:[blanc,blanc],defense:[blanc,jaune],pdv:2,impetueux:true,charge:true,commandement:[1,3],dates:[1296,1305],source:"https://fr.wikipedia.org/wiki/William_Wallace",blason:true,moral:3,desc:"%POURSUITE%%ROUNDCOND%: +1 %MELEE%%BR%%DEFENSE%: %RECUL% &rarr; %CHOOSERECUL%"},    
        {nom:"William Wallace",niv:1,faction:ECOSSAIS,type:INFANTERIE,melee:[blanc,jaune],defense:[blanc],pdv:2,relance:true,charge:true,commandement:[1,2],maj:2,dates:[1296,1305],source:"https://fr.wikipedia.org/wiki/William_Wallace",blason:true,moral:3,cout:250,desc:"%ACTIVATED%%TOURCOND% %TROUPE%%THERE%: + Charge%BR%%ACTIVATED%%ROUNDCOND%: %CHOOSEZONE%%THERE% &rarr; %1ORDERTOACTIVATE%"},    
        {nom:"William Wallace",niv:2,subfaction:MAL,faction:ECOSSAIS,type:INFANTERIE,melee:[noir],defense:[rouge,noir],pdv:2,charge:true,impetueux:true,commandement:[AA,2],dates:[1296,1305],source:"https://fr.wikipedia.org/wiki/William_Wallace",blason:true,cout:250,desc:"%POURSUITE%%ROUNDCOND%: +1 %MELEE%%BR%%MELEE%: <span class='facenoir bouclier'></span> &rarr; %BONUSMOVE% / %XP%"},
        {nom:"Jean Stuart de Buchan",niv:1,faction:ECOSSAIS,type:INFANTERIE,melee:[rouge,blanc],defense:[noir],commandement:[AA,1],pdv:2,feinte:true,charge:true,maj:4,dates:[1404,1424],source:"https://fr.wikipedia.org/wiki/John_Stuart_(3e_comte_de_Buchan)",blason:true,cout:300,moral:3,desc:"%TROUPE%%TROUPE%<span class='combat-cond tirtendu'></span><span class='combat-cond tircloche'></span>%HERE%: +1 <span class='dejaune'></span>"},    
        {nom:"Jean Stuart de Buchan",niv:2,faction:ECOSSAIS,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],pdv:3,charge:true,genie:true,ralliement:true,modattaque:annule1recul,commandement:[1,2],dates:[1404,1424],source:"https://fr.wikipedia.org/wiki/John_Stuart_(3e_comte_de_Buchan)",blason:true,moral:3,desc:"%TROUPE%%TROUPE%<span class='combat-cond tirtendu'></span><span class='combat-cond tircloche'>%HERE%: +1 <span class='dejaune'></span>"},    
        {nom:"Arnaud Amanieu d'Albret",faction:MERCENAIRE,type:INFANTERIE,melee:[noir,jaune],defense:[noir],pdv:2,mercenaire:true,ralliement:true,parade:true,commandement:[1,1],dates:[1351,1401],source:"https://fr.wikipedia.org/wiki/Arnaud-Amanieu_d%27Albret",blason:true,desc:"%MELEE%: %BOUCLIER% &rarr; %BONUSMOVE%%BR%%LEGENDE% %ACTIVATED%%ROUNDCOND%: + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>"}, 
        {nom:"Arnaud de Cervole",faction:MERCENAIRE,type:INFANTERIE,melee:[rouge,blanc],defense:[noir,rouge],pdv:3,mercenaire:true,charge:true,riposte:ftrue,priere:true,commandement:[1,2],dates:[1351,1366],source:"https://fr.wikipedia.org/wiki/Arnaud_de_Cervole",blason:true,desc:"aucun %BLEU% ne peut être joué par un adversaire dans une zone adjacente à %THIS%"}, 
        {nom:"John Hawkwood",faction:MERCENAIRE,type:INFANTERIE,melee:[noir_bouclierrecule],defense:[blanc],pdv:2,mercenaire:true,feinte:true,commandement:[1,2],dates:[1342,1394],source:"https://fr.wikipedia.org/wiki/John_Hawkwood",blason:true,desc:"%ACTIVATED%%ROUNDCOND% %XP%: +1 %BLEU%"}, 
        {nom:"Seguin de Badefol",faction:MERCENAIRE,type:INFANTERIE,melee:[noir,blanc],defense:[blanc],pdv:3,mercenaire:true,cruel:true,genie:true,parade:true,commandement:[AA,1],dates:[1350,1366],source:"https://fr.wikipedia.org/wiki/Seguin_de_Badefol",desc:"%ACTIVATED% %LEGENDE%%ROUNDCOND%: +2 %CARTELEGENDE%, %DEFAUSSEZEN% 1%BR%%ACTIVATED%%TOURCOND%:  réduisez le coût d'une %CARTELEGENDE%"}, 
        {nom:"Robert Knolles",faction:MERCENAIRE,type:INFANTERIE,melee:[rouge,jaune],defense:[noir,blanc],pdv:3,mercenaire:true,cruel:true,charge:true,commandement:[1,1],dates:[1351,1407],source:"https://fr.wikipedia.org/wiki/Robert_Knolles",blason:true,desc:"%MELEE%:%MORT% &rarr; %XP%"},
        {nom:"Petit Meschin",faction:MERCENAIRE,type:INFANTERIE,melee:[rouge_bouclierrecule,blanc_bouclierrecule],defense:[noir,rouge],pdv:3,mercenaire:true,riposte:ftrue,charge:true,gardeducorps:true,commandement:[1,2],dates:[1362,1369],source:"https://fr.wikipedia.org/wiki/Chefs_routiers_c%C3%A9l%C3%A8bres#Le_Petit_Meschin",desc:"%ACTIVATED%%TOURCOND%:  réduisez le coût d'une %CARTELEGENDE%"},
        {nom:"Claude de Chastellux",faction:BOURGUIGNON,type:INFANTERIE,melee:[noir,blanc],defense:[noir,jaune],pdv:2,immortel:true,esquive:true,commandement:[1,1],dates:[1409,1453],source:"https://fr.wikipedia.org/wiki/Claude_de_Chastellux",blason:true,desc:"%DEFENSE%: <span class='facenoir vierge'></span> / <span class='facejaune vierge'></span>&rarr; %LEGENDE%"},
        {nom:"Jean de Brimeu",faction:BOURGUIGNON,type:INFANTERIE,melee:[rouge],defense:[blanc,noir],pdv:2,charge:true,modattaque:annule1recul,commandement:[AA,2],dates:[1388,1415],source:"https://www.pagedhistoire.com/bataille/1/Azincourt.php",desc:"une unité adjacente %DEFENSE%: -1 <span class='recul'></span>"},
        {nom:"Jean de Toulongeon",niv:2,faction:BOURGUIGNON,type:INFANTERIE,melee:[noir,blanc],defense:[rouge,noir],pdv:3,riposte:ftrue,ralliement:true,commandement:[2,3],dates:[1395,1427],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Toulongeon",blason:true,desc:"%MELEE%: 1+ %MORT% &rarr; 2 %CARTELEGENDE%%BR%Compte comme 1 unité pour toutes les unités dans sa zone dotées de Masse"},
        {nom:"Jean de Toulongeon",niv:1,faction:BOURGUIGNON,type:INFANTERIE,melee:[noir],defense:[rouge,noir],pdv:2,riposte:ftrue,ralliement:true,commandement:[1,2],maj:4,dates:[1395,1427],source:"https://fr.wikipedia.org/wiki/Jean_II_de_Toulongeon",blason:true,desc:"%MELEE%: 1+ %MORT% &rarr; %CARTELEGENDE%%BR%Compte comme 1 unité pour toutes les unités dans sa zone dotées de Masse"},
        {nom:"Héros",faction:BOURGUIGNON,type:INFANTERIE,melee:[rouge,blanc],defense:[blanc],charge:true,survie:true,modattaque:annule1recul,pdv:2},
        {nom:"Jean de Croy",faction:BOURGUIGNON,type:INFANTERIE,melee:[blanc,blanc],defense:[blanc,jaune],riposte:ftrue,pdv:2,commandement:[AA,1],dates:[1380,1415],source:"https://fr.wikipedia.org/wiki/Jean_Ier_de_Cro%C3%BF",blason:true, desc:"%DEFENSE%: <span class='faceblanc vierge'></span> / <span class='facejaune vierge'></span> &rarr; %LEGENDE%"},
        {nom:"Lala Sahin Pacha",niv:1,faction:OTTOMAN,type:INFANTERIE,melee:[rouge,jaune],defense:[noir_toucherecule],celerite:2,ralliement:true,pdv:2,commandement:[1,2],maj:5,dates:[1360,1388],source:"https://en.wikipedia.org/wiki/Lala_%C5%9Eahin_Pasha",desc:"%ACTIVATED%: %LEGENDE% &rarr; + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>"},
        {nom:"Lala Sahin Pacha",niv:2,faction:OTTOMAN,type:INFANTERIE,melee:[rouge,rouge],defense:[noir],celerite:2,ralliement:true,terreur:1,pdv:3,commandement:[2,2],dates:[1360,1388],source:"https://en.wikipedia.org/wiki/Lala_%C5%9Eahin_Pasha",desc:"%ACTIVATED%%TOURCOND% %LEGENDE%: %GRIS% &rarr; %JAUNE%/%BLEU%%BR%%BLEU%%HERE%%ROUNDCOND%: vous pouvez jouer  %BLEU%%HERE% à la suite"},
        {nom:"Yildirim Bayezid",niv:1,faction:OTTOMAN,type:INFANTERIE,melee:[rouge_bouclierrecule,noir_bouclierrecule],defense:[noir,noir],celerite:2,charge:true,cruel:true,pdv:3,commandement:[AA,3],maj:6,dates:[1389,1402],source:"https://fr.wikipedia.org/wiki/Bajazet_Ier",desc:"%MONTOUR% %LEGENDE%%LEGENDE%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Yildirim Bayezid",niv:2,faction:OTTOMAN,type:INFANTERIE,melee:[rouge_bouclierrecule,rouge_bouclierrecule,noir_bouclierrecule],defense:[noir,noir],celerite:2,charge:true,cruel:true,pdv:4,commandement:[1,3],dates:[1389,1402],source:"https://fr.wikipedia.org/wiki/Bajazet_Ier",desc:"%MONTOUR% %XP%: %TROUPE%%HERE% + Célérité 2"},
        {nom:"Mehmet II",niv:1,faction:OTTOMAN,type:INFANTERIE,melee:[noir],defense:[noir,blanc],relance:true,priere:true,ralliement:true,pdv:2,commandement:[1,1],maj:4,dates:[1444,1481],source:"https://fr.wikipedia.org/wiki/Mehmed_II"},
        {nom:"Mehmet II",niv:2,faction:OTTOMAN,type:INFANTERIE,melee:[rouge],defense:[noir,blanc],priere:true,relance:true,ralliement:true,pdv:2,commandement:[1,2],dates:[1444,1481],source:"https://fr.wikipedia.org/wiki/Mehmed_II",desc:"%ACTIVATED%%ROUNDCOND% %XP%: +1 %GRIS%%BR%%XP%%ACTIVATED%%ROUNDCOND%: +1 %GRIS%"},
        {nom:"Mehmet le Conquérant",faction:OTTOMAN,type:VOLANT,melee:[rouge,noir,jaune,jaune],defense:[noir,noir],grand:true,celerite:2,terreur:2,ignifuge:true,pdv:6,commandement:[2,2],dates:[1453,1481],source:"https://fr.wikipedia.org/wiki/Mehmed_II", desc:"%MELEE%: <span class='facerouge vierge'></span> / <span class='facenoir vierge'></span> / <span class='facejaune vierge'></span> &rarr; %INCENDIE%<span class='melee combat-cond'></span>"},
        {nom:"Radu III le Beau",niv:1,faction:VALAQUE,type:INFANTERIE,melee:[blanc],defense:[blanc],charisme:true,pdv:2,commandement:[1,1],maj:2,dates:[1462,1475],source:"https://fr.wikipedia.org/wiki/Radu_III_le_Beau",blason:true,desc:"%MELEE%: 1+ %BOUCLIER% &rarr; %BONUSMOVE%"},
        {nom:"Radu III le Beau",niv:2,faction:VALAQUE,type:INFANTERIE,melee:[blanc,blanc],defense:[noir],charisme:true,feinte:true,pdv:2,commandement:[1,1],dates:[1462,1475],source:"https://fr.wikipedia.org/wiki/Radu_III_le_Beau",blason:true,desc:"%ACTIVATED% %XP%: %MOVE% une unité ennemie d'une zone"},
        {nom:"Vlad Tepes",niv:1,faction:VALAQUE,type:INFANTERIE,melee:[rouge],defense:[rouge,noir],celerite:2,feinte:true,parade:true,terreur:1,pdv:2,commandement:[1,1],modattaque:annule2recul,maj:4,dates:[1448,1476],source:"https://fr.wikipedia.org/wiki/Vlad_III_l%27Empaleur",desc:"%MELEE%: un des %RECUL% ne peut être annulé par %BOUCLIER%"},
        {nom:"Vlad Tepes",niv:2,faction:VALAQUE,type:INFANTERIE,melee:[rouge,noir],defense:[noir,blanc],celerite:2,terreur:1,feinte:true,parade:true,pdv:3,commandement:[3,2],dates:[1448,1476],source:"https://fr.wikipedia.org/wiki/Vlad_III_l%27Empaleur",desc:"%MELEE%: un des %RECUL% ne peut être annulé par %BOUCLIER%%BR%%ACTIVATED%%TOURCOND% %XP%: %MOVE% 1 %RALLIEMENT%"},
        {nom:"Sorcière des marais",niv:1,faction:MAL,type:INFANTERIE,melee:[blanc],defense:[noir,rouge],pdv:2,commandement:[1,1],maj:2,desc:"quand elle est dans une zone de marais, %THIS% ignore les effets de terrains liés aux marais et peut réaliser une action de mouvement vers n'importe quelle autre zone de marais du plateau de jeu%BR%%ACTIVATED%%TOURCOND% %LEGENDE%%LEGENDE%: posez ou déplacez un jeton Marais sur une zone qui n'est pas une zone de village"},
        {nom:"Sorcière des marais",niv:2,faction:MAL,type:INFANTERIE,melee:[blanc],defense:[noir,noir],pdv:3,commandement:[1,1],desc:"quand elle est dans une zone de marais, %THIS% ignore les effets de terrains liés aux marais et peut réaliser une action de mouvement vers n'importe quelle autre zone de marais du plateau de jeu%BR%%ACTIVATED%%TOURCOND% %LEGENDE%%LEGENDE%: posez ou déplacez un jeton Marais sur une zone qui n'est pas une zone de village"},
        {nom:"Sorcière",niv:1,faction:MAL,type:INFANTERIE,melee:[jaune],defense:[jaune],esquive:true,commandement:[AA,1],maj:4,cout:145,moral:3,desc:"%MONTOUR%: +1 %CARTELEGENDE%"},
        {nom:"Sorcière",niv:2,faction:MAL,type:INFANTERIE,melee:[blanc],defense:[blanc],pdv:2,saut:2,moral:3,desc:"%MELEE%: <span class='faceblanc vierge'></span> &rarr; %LEGENDE%%BR%%ACTIVATED%: %ROLL% <span class='dejaune'></span>: <span class='facejaune vierge'></span>&rarr; -1 %LEGENDE% %ADVERSAIRE%"},
        {nom:"La Tarasque",niv:1,faction:MAL,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir,noir],pdv:8,grand:true,riposte:ftrue,maj:4,dates:[1382,1382],source:"https://fr.wikipedia.org/wiki/Tarasque",desc:"%MELEE%: %BLESSURE% &rarr; +1 %BLESSURE%"},
        {nom:"La Tarasque",niv:2,postattaque:doubleblessure,faction:MAL,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir,noir],pdv:10,grand:true,terreur:1,dates:[1382,1382],source:"https://fr.wikipedia.org/wiki/Tarasque",desc:"%MELEE%: %BLESSURE% &rarr; +1 %BLESSURE%"},
        {nom:"Loup-garou",niv:1,faction:MAL,type:INFANTERIE,melee:[jaune,jaune],defense:[noir],maj:4,dates:[1383,1383],desc:"%MONTOUR%: +1 %GRIS%"},
        {nom:"Loup-garou",niv:2,faction:MAL,type:INFANTERIE,melee:[noir,blanc],defense:[noir],celerite:2,pourfendeur:true,pdv:2,commandement:[1,1],dates:[1383,1383],desc:"%THIS% passe niveau 2: +1 Loups%HERE%"},
        {nom:"Magog",faction:MAL,type:INFANTERIE,melee:[rouge,rouge,noir,blanc],defense:[noir,noir,blanc],pdv:7,charge:true,grand:true,gardeducorps:true,pourfendeur:true,desc:"%ACTIVATED%%ROUNDCOND% %LEGENDE%:  1 unité ennemie%THERE% ne se déplace pas%BR%%CHOOSE% %PERSONNAGE%%THERE% %ROUNDCOND%: ce personnage n'attaque pas %THIS% durant le round &rarr; -1 %LEGENDE% / %XP%"},
        {nom:"Gog",faction:MAL,type:INFANTERIE,melee:[jaune,jaune,blanc],defense:[noir,jaune,blanc],pdv:5,grand:true,soin:true,cruel:true,legendaire:true,relance:true,desc:"%TOUTTYPE% ennemie à 1 hexagone: -1 <span class='deblanc'></span><span class='melee combat-cond'></span>"},
        {nom:"La Cocatrix",faction:MAL,type:VOLANT,tir:[jaune_blanctouche,jaune_blanctouche,blanc_blanctouche],defense:[blanc,blanc],portee:1,typetir:TENDU,pdv:5,grand:true,visee:true,terreur:1,desc:"%CONSEIL%: +1 %LEGENDE%"},
        {nom:"Dracula",niv:1,faction:MAL,type:INFANTERIE,melee:[rouge,rouge],defense:[rouge,noir],pdv:3,saut:2,terreur:1,commandement:[2,1],maj:5,desc:"%ACTIVATED% %LEGENDE% %ROUNDCOND%: + <span class='commandement'>&nbsp;&nbsp;&nbsp; 1</span>%BR%+1 %BLESSURE% &rarr; %LEGENDE% / %XP%"},
        {nom:"Dracula",niv:2,faction:MAL,type:INFANTERIE,melee:[rouge,rouge,rouge],defense:[noir,noir],pdv:4,saut:3,terreur:2,commandement:[3,1], desc:"%MELEE%: %MORT% &rarr; -1 %BLESSURE% à %THIS%%BR% %LEGENDE% %MELEE%: <span class='facerouge bouclier'></span>&rarr;<span class='facerouge tue'></span>"},
        {nom:"La Licorne",faction:BIEN,type:INFANTERIE,melee:[blanc,blanc],defense:[blanc,blanc],parade:true,pdv:5,soin:true,celerite:2,legendaire:true,desc:"%MELEE% / %DEFENSE%: 1 <span class='faceblanc vierge'></span> &rarr;  <span class='faceblanc touche'></span>  / <span class='faceblanc bouclier'></span>  / <span class='faceblanc recul'></span>"},
        {nom:"L'Inquisiteur",faction:BIEN,type:INFANTERIE,defense:[noir],pdv:2,priere:true,commandement:[2,1],desc:"%MONTOUR%: %ROLL% <span class='denoir'></span>: <span class='facenoir bouclier'></span> &rarr; prenez 1 %XP% / %LEGENDE% %ADVERSAIRE%%BR%%ACTIVATED% %LEGENDE%%LEGENDE%: +1 %RUMEUR%%BR%%THIS% peut seulement commander le Bourreau"},
        {nom:"Le Griffon",faction:BIEN,type:VOLANT,melee:[noir_bouclierrecule,jaune_bouclierrecule,blanc_bouclierrecule],defense:[blanc,blanc],pdv:4,grand:true,saut:2,feinte:true,pourfendeur:true,charge:true,desc:"%THIS% peut utiliser le trait charge à partir d'un hexagone de ciel"},
        {nom:"Archange Gabriel",niv:1,faction:BIEN,type:VOLANT,melee:[rouge,rouge,rouge],defense:[noir,noir],pdv:6,saut:2,gardeducorps:true,commandement:[1,1],maj:4,desc:"%MELEE%: %BOUCLIER% &rarr; %BONUSMOVE%"},
        {nom:"Archange Gabriel",niv:2,faction:BIEN,type:VOLANT,melee:[rouge,rouge,rouge,noir],defense:[noir,noir],pdv:6,saut:2,transport:true,gardeducorps:true,commandement:[2,2],desc:"%MELEE%: %BOUCLIER% &rarr; %BONUSMOVE%%BR%%ACTIVATED%%TOURCOND%: vous pouvez regarder jusqu'à 2 %CARTELEGENDE% tirées au hasard dans la main d'un joueur"},
        {nom:"Archevêque Pierre de Cros",niv:1,faction:BIEN,type:INFANTERIE,defense:[rouge],pdv:2,priere:true,commandement:[AA,2],maj:2,dates:[1362,1388],source:"https://fr.wikipedia.org/wiki/Pierre_de_Cros"},
        {nom:"Archevêque Pierre de Cros",niv:2,faction:BIEN,type:INFANTERIE,defense:[noir],pdv:3,priere:true,ralliement:true,commandement:[1,2],dates:[1361,1388],source:"https://fr.wikipedia.org/wiki/Pierre_de_Cros"},
        {nom:"Sainte Marthe",niv:1,faction:BIEN,type:INFANTERIE,melee:[jaune],defense:[noir],priere:true,maj:5,noterreur:true,modattaque:touchetuerecul},
        {nom:"Sainte Marthe",niv:2,faction:BIEN,type:INFANTERIE,melee:[jaune,jaune,jaune],defense:[noir],pdv:2,priere:true,terreur:2,noterreur:true,modattaque:touchetuerecul},
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
    toHTML() {
        let n=this.nom,da="",urls="",urla=[];
        let f="",m="",d="",c=[],mod="";
        let lcapa=["ignifuge","grand","soin","cruel","relance","gardeducorps","pourfendeur","charge","celerite","priere","riposte","terreur","esquive","saut","feinte","charisme","ralliement","impetueux","survie","genie","parade","immortel","mercenaire","visee","masse","cohesion","transport","recultue","noriposte","noterreur"];
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
        if (this.prenom) n+=" <br/><small class='text-muted'>"+this.prenom+"</small>";
        if (this.acheval) n+=" à cheval";
        if (this.niv==1) n+=" *";
        if (this.niv==2) n+=" **";
        if (da!="")
            n+="<br/><small class='text-muted' >"+da+"</small>";
        
        let subfaction="";
        if (this.subfaction==MAL) {
            subfaction="<span class='subfaction blason mal'></span>";
        } else if (this.subfaction==BIEN) {
            subfaction="<span class='subfaction blason bien'></span>";
        }
        
        if (this.melee||this.tir) {
            let mm=[];
            let type="";
            if (this.melee) {
                mm=this.melee;
                type="melee";
                m+="<span class='combat melee'></span> "+mm.map((x)=>x.toHTML()).join(' ');
            }// pas de capacité sur le tir et la melee
            if (this.melee&&this.tir) m+="<br/>";
            if (this.tir&&this.typetir==TENDU) {
                mm=this.tir;
                type="tirtendu";
                m+="<span class='combat tirtendu"+this.portee+"'></span> "+this.tir.map((x)=>x.toHTML()).join(' ');
            } else if (this.tir&&this.typetir==CLOCHE) {
                mm=this.tir;
                type="tircloche";
                m+="<span class='combat tircloche"+this.portee+"'></span> "+this.tir.map((x)=>x.toHTML()).join(' ');
            }
            let mmm=mm.map((x)=>x.capacite(type)).filter((x)=>x!=null).filter(uniquecapa);
            if (mmm.length>0) c.push(mmm.join(', '));
        }
        if (this.defense) {
            let mm=this.defense;
            d+="<span class='combat defense'></span> "+mm.map((x)=>x.toHTML()).join(' ');
        }
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
        if (this.bonusmelee==blancsimal)
            c.push("<span class='melee combat'></span><span class='combat-cond mal'></span>: +1 <span class='deblanc'></span>");
        else if (this.bonusmelee==rougesiinfanterie)
            c.push("<span class='melee combat'></span><span class='infanterie combat-cond'></span>: +1 <span class='derouge'></span>");
        else if (this.bonusmelee==blancsiinfanterie)
            c.push("<span class='melee combat'></span><span class='infanterie combat-cond'></span>: +1 <span class='deblanc'></span>");
        else if (this.bonusmelee==blancsicavalerie)
            c.push("<span class='melee combat'></span><span class='cavalerie combat-cond'></span>: +1 <span class='deblanc'></span>");
        else if (this.bonusmelee==blanctouchesicavalerie)
            c.push("<span class='melee combat'></span><span class='cavalerie combat-cond'></span> : <span class='vierge faceblanc'></span> &rarr; <span class='faceblanc touche'></span>");
        if (this.riposte==ftrue) c.push("riposte");
        else if (this.riposte==sicavalerie) c.push("riposte <span class='cavalerie combat-cond'></span>");
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
            c.push("1 <span class='touche combat'></span> &rarr; <span class='tue combat'></span>");
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
                .replace(/%MONTOUR%/g,"<b>à votre tour</b>")
                .replace(/%MOVEENNEMI%/g,"une unité ennemie vient d'entrer ou déclare une action de mouvement pour sortir d'une zone")
                .replace(/%TIRTENDU%/g,"<span class='tirtendu combat'></span>")
                .replace(/%TIRCLOCHE%/g,"<span class='tircloche combat'></span>")
                .replace(/%DEFENSE%/g,"<span class='defense combat'></span>")
                .replace(/%CONSEIL%/g,"<b>entretien</b>")
                .replace(/%CAMP%/g,"<b>contrôle des dégâts</b>")
                .replace(/%XP%/g,"<span class='jetonxp jeton'></span>")
                .replace(/%INCENDIE%/g,"<span class='jetonincendie jeton'></span>")
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
                .replace(/%ACTIONPLAYER%/g,"<b>actino de joueur</b>")
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
        let command="";
        if (j[7]) command="<span class='commandement'><span style='color:black;text-shadow:1px 1px;'>"+j[7][0]+"</span>&nbsp; "+j[7][1]+"</span>";
        return "<tr><td>"+j[0]+"</td><td>"+j[1]+"</td><td>"+j[2]+"</td><td>"+j[3]+"</td><td>"+j[4]+"</td><td>"+command+"</td><td><span class='pdv'>"+j[5]+"</span></td><td>"+j[6]+"</td></tr>";
    }
    
    format(dates) {
        let d="";
        if (dates&&this.dates) d="["+this.dates[0]+"-"+this.dates[1]+"] "+this.text;
        else d=this.text+(this.acheval?" à cheval":"")+(this.niv==1?"*":(this.niv==2?"**":""))+(this.subfaction==MAL?" - Mal":(this.subfaction==BIEN?" - Bien":""));
        return $("<span class='blason "+NOM_FACTION[this.faction]+"'>"+d+"</span>");      
    }
}

