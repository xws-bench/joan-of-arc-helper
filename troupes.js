
function uniquecapa(value, index, self) { 
    return index==self.length-1||self[index]!=self[index+1];
}

var UNITEID=0;
class Unite {
    constructor(u,n) {
        if (typeof n=="undefined") n=1;
        this.feinte=()=>false;
        Object.assign(this,u);
        this.pdv=n*u.pdv;
        this.id=UNITEID++;
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
    static changeLang() {
      /*
        $(":lang(fr) [data-fr]").each(function() {
            $(this).html(decodeURI($(this).data("fr")));
        });
        $(":lang(en) [data-fr]").each(function() {
            $(this).html(decodeURI($(this).data("en")));
        });*/
    }
    static troupes() {
        let i,j=0,l=[];
        for (i=0;i<liste_unites.length;i++) {
            let u=liste_unites[i];
            for (j=0;j<u.carac.length;j++) {
                switch(u.carac[j]) {
                case '#': u.pdf=true; break;
                case '@': u.png=true; break;
                case '*': u.niv=parseInt(u.carac[j+1],10); j++;break;
                case 'A': u.type=ARTILLERIE; break;
                case 'C': u.type=CAVALERIE; break;
                case 'D': u.grand=true; break;
                case 'E': u.mercenaire=true; break;
                case 'F': u.feinte=ftrue; if (u.carac[j+1]=='2') u.feinte=feintesichamp; j++; break;
                case 'G': u.genie=true; break;
                case 'H': u.gigantesque=true;break;
                case 'I': u.type=INFANTERIE; break;
                case 'L': u.legendaire=true; break;
                case 'M': if (u.carac[j+1]=='A') u.commandement=[AA,parseInt(u.carac[j+2],10)];
                    else u.commandement=[parseInt(u.carac[j+1],10),parseInt(u.carac[j+2],10)];
                    j+=2;
                    break;
                case 'N': u.soinbienthere=true; break;
                case 'O': u.moral=parseInt(u.carac[j+1],10); j++; break;
                case 'P': u.parade=ftrue; if (u.carac[j+1]=='3') u.parade=siinfanterie;
                    j++;
                    break;
                case 'R': if (u.carac[j+1]=='0') u.noriposte=true;
                    else if (u.carac[j+1]=='1') u.riposte=ftrue;
                    else if (u.carac[j+1]=='2') u.riposte=sicavalerie;
                    else if (u.carac[j+1]=='3') u.riposte=siinfanterie;
                    j++;
                    break;
                case 'S': u.soin=true; break;
                case 'T': if (u.carac[j+1]=='0') u.noterreur=true;
                    else u.terreur=parseInt(u.carac[j+1],10);
                    j++;
                    break;
                case 'U': u.cruel=true; break;
                case 'V': u.type=VOLANT; break;
                case '_': u.acheval=true; break;
                case 'a': u.charisme=true; break;
                case 'c': u.charge=true; break;
                case 'd': u.enleve1d=true; break;
                case 'e': u.relance=true; break;
                case 'f': u.shield=true; break;
                case 'g': u.gardeducorps=true; break;
                case 'h': u.cohesion=true; break;
                case 'i': u.ignifuge=true; break;
                case 'j': u.maj=parseInt(u.carac[j+1],10); j++; break;
                case 'k': u.reculetue=true; break;
                case 'l': u.immortel=true; break;
                case 'm': u.masse=true; break;
                case 'n': u.noterrain=true; break;
                case 'o': u.pourfendeur=true; break;
                case 'p': u.priere=true; break;
                case 'q': u.esquive=true; break;                    
                case 'r': u.celerite=parseInt(u.carac[j+1],10); j++; break;
                case 's': u.saut=parseInt(u.carac[j+1],10); j++; break;
                case 't': u.transport=true; break;
                case 'u': u.survie=true; break;
                case 'v': u.visee=true; break;
                case 'w': u.civil=true; break;
                case 'x': u.impetueux=true; break;
                case 'y': u.ralliement=true; break;
                case '£': u.faction=ANGLAIS; break;
                case '%': u.faction=FRANCAIS; break;
                case '?': u.faction=OTTOMAN; break;
                case 'é': u.faction=ECOSSAIS; break;
                case '!': u.faction=VALAQUE; break;
                case 'â': u.faction=MAL; break;
                case 'ï': u.faction=BIEN; break;
                case 'ù': u.faction=LITUANIEN; break;
                case 'à': u.faction=POLONAIS; break;
                case '€': u.faction=TEUTONIQUE; break;
                case '~': u.faction=BOURGUIGNON; break;
                case '$': u.faction=MERCENAIRE; break;
                case 'J': if (u.carac[j+1]=='0') u.commandefaction=BIEN;
                    else if (u.carac[j+1]=='1') u.commandetype=CAVALERIE;
                    j++;
                    break;
                default: console.log(u.nom+" :: "+u.carac[j]);
                }
            }
            u.id=j++;
            if (!u.pdv) u.pdv=1;
            let n=u.nom;
            if (u.prenom) n=n+" "+u.prenom;
            if (u.acheval) n=n+" a cheval";
            //if (typeof u.faction != "undefined") n=n+" "+NOM_FACTION[u.faction];
            u.troupe=true;
            if (dictionnaire_unites[n]) {
                if (dictionnaire_unites[n].f) u.troupe=false;
                else u.i=dictionnaire_unites[n].i;
                u.en=dictionnaire_unites[n].en;
                if (typeof u.en=="undefined") u.en=n;
                u.blason=dictionnaire_unites[n].blason;
                u.dates=dictionnaire_unites[n].dates;
                u.box=dictionnaire_unites[n].box;
                Object.assign(u,dictionnaire_unites[n]);
            } else {
                console.log("No dict for "+n+" "+u.faction);
            }
            if (u.troupe==true&&!u.civil&&!(u.B1||u.o1||u.a1||u.a2||u.a3||u.f1||u.f2||u.s1||u.s2||u.f3||u.b1||u.b2||u.b3||u.m1||u.m2||u.m3||u.e1)) console.log("no cost:"+n);
            l.push(new Unite(u));
        }
        return l;
    }
    toMelee(u) {
        let m="";
        let mm;
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
    getName(nostar,english) {
        let n=this.nom;
        let en=this.nom;
        if (this.en) en=this.en;
        if (this.prenom) n+=" <br/><small class='text-muted'>"+this.prenom+"</small>";
        if (this.acheval) n+=" à cheval";
        if (!nostar) {
            if (this.niv==1) n=n+" *";
            if (this.niv==2) n=n+" **";
            if (this.niv==1) en=en+" *";
            if (this.niv==2) en=en+" **";
        }
        n="<span lang='fr'>"+n+"</span><span lang='en'>"+en+"</span>";
        if (english==true) return "<span lang='en'>"+en+"</span>";
        return n;
    }
    getAttack() {
        let mmm=[];
        let m="";
        if (this.melee||this.tir) {
            let mm=[];
            let type="",v=0;
            if (this.melee) {
                mm=this.melee;
                type="melee";
                //m+="<span class='hval'>"+mm.reduce((acc,val)=>acc+val.toAttack(),0)+"</span>";
                m+="<span class='combat melee'></span> "+mm.map((x)=>x.toHTML()).join(' ');
                mmm=mmm.concat(mm.map((x)=>x.capacite(type)).filter((x)=>x!=null).filter(uniquecapa));
            } else {
                //m+="<span class='hval'>"+this.tir.reduce((acc,val) => acc+val.toAttack(),0)+"</span>";                
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
        let mmm=[];
        if (this.defense) {
            let mm=this.defense;
            let type="defense";
            //d+="<span class='hval'>"+mm.reduce((acc,val)=>acc+val.toDefense(),0)+"</span>";

            d+="<span class='combat defense'></span> "+mm.map((x)=>x.toHTML()).join(' ');
            mmm=mmm.concat(mm.map((x)=>x.capacite(type)).filter((x)=>x!=null).filter(uniquecapa));
        }
        return [mmm,d];
    }
    getCommand() {
        let c,command="";
        if (this.commandement) {
            c=[this.commandement[0]==0?'A':this.commandement[0],this.commandement[1]];
            if (typeof this.commandefaction!="undefined") command+=" &nbsp;<span class='commandement combat-cond "+NOM_FACTION[this.commandefaction]+"'>";
            else if (typeof this.commandetype!="undefined") command+="<span class='commandement combat-cond "+NOM_TYPE[this.commandetype]+"'>";
            else command+="<span class='commandement'>";
            command+="<span style='color:black;text-shadow:1px 1px;'>"+c[0]+"</span>&nbsp; "+c[1]+"</span>";
        }
        return command;
    }
    toHTML() {
        let da="",urls="",urla=[];
        let f="",m="",d="",c=[],mod="";

        let n=this.getName(false);
        let en=this.getName(false,true);
        n=this.getHrefImg(n);
        en=this.getHrefImg(en);
        if (this.source) {
            urla=this.source.split(" ");
        }
        if (this.dates) {
            if (typeof urla[0]!="undefined") da="<a href='http://"+urla[0]+"'>"+this.dates[0]+"-"+this.dates[1]+"</a>";
            else da=this.dates[0]+"-"+this.dates[1];
            if (typeof urla[1]!="undefined"&&this.dates[2]) 
                da+=", <a href='http://"+urla[1]+"'>"+this.dates[2]+"-"+this.dates[3]+"</a>";
            if (this.blason) {
                let b=this.nom.replace(/ô/g,"o").replace(/ë/g,"e").replace(/ï/g,"i").replace(/é/g,"e").replace(/ê/g,"e").replace(/'/g,"-").replace(/,/g,"").replace(/ /g,"-");
                da+=" <span class='coat coat-"+b+"'></span>";
            }
        }
        else da="";
        if (da!="") {
            n+="<br/><small class='text-muted' >"+da+"</small>";
            en+="<br/><small class='text-muted' >"+da+"</small>";
        }
        let subfaction="";
        if (this.subfaction==MAL) {
            subfaction="<span class='subfaction blason mal'></span>";
        } else if (this.subfaction==BIEN) {
            subfaction="<span class='subfaction blason bien'></span>";
        }

        let aa=this.getAttack();
        m+=aa[1];
        if (aa[0].length>0) c.push(aa[0].join(', '));

        let ad=this.getDefense();
        d+=ad[1];
        if (ad[0].length>0) c.push(ad[0].join(', '));

        for (j=0;j<LISTE_CAPACITES.length;j++) {
            if (this[LISTE_CAPACITES[j]]&&NOM_CAPACITE[j]!=null)
                c.push("<span class='fr'>"+NOM_CAPACITE[j]+"</span><span class='en'>"+NOM_CAPACITE_EN[j]+"</span>");
        }
        //if (this.desc) c.push(this.desc);
        if (this.terreur)
            c.push("<span class='fr'>terreur "+this.terreur+"</span><span class='en'>terror "+this.terreur+"</span>");
        if (this.celerite)
            c.push("<span class='fr'>célérité "+this.celerite+"</span><span class='en'>haste "+this.celerite+"</span>");
        if (this.saut)
            c.push("<span class='fr'>saut "+this.saut+"</span><span class='en'>jump "+this.saut+"</span>");
        if (this.feinte==ftrue) c.push("<span class='fr'>feinte</span><span class='en'>feint</span>");
        else if (this.feinte==feintesichamp) c.push("feinte<span class='combat-cond ble'></span>");
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
            c.push("<span class='melee combat'></span><span class='cavalerie combat-cond'></span> : <span class='vierge faceblanc'></span> &rarr; <span class='touche'></span>");
        if (this.recultue==true) c.push("<span class='defense combat'></span>: <span class='recul'></span> &rarr; <span class='mort'></span>");
        if (this.riposte==ftrue) c.push("<span class='fr'>riposte</span><span class='en'>retaliation</span>");
        else if (this.riposte==sicavalerie) c.push("<span class='fr'>riposte</span><span class='en'>retaliation</span> <span class='cavalerie combat-cond'></span>");
        else if (this.riposte==siinfanterie) c.push("<span class='fr'>riposte</span><span class='en'>retaliation</span> <span class='infanterie combat-cond'></span>");
        if (this.parade==ftrue) c.push("<span class='fr'>parade</span><span class='en'>parry</span>");
        else if (this.parade==siinfanterie) c.push("<span class='fr'>parade</span><span class='en'>parry</span> <span class='infanterie combat-cond'></span>");
        if (this.modattaque==annule1recul)
            c.push("<br/><span class='defense combat'></span>: -1 <span class='recul'></span>");
        else if (this.modattaque==annule2recul)
            c.push("<br/><span class='defense combat'></span>: -2 <span class='recul'></span>");
        else if (this.modattaque==annuletoutrecul)
            c.push("<br/><span class='defense combat'></span>: 0 <span class='recul'></span>");
        else if (this.modattaque==annule1touche)
            c.push("<br/><span class='defense combat'></span>: -1 <span class='touche'></span>");
        else if (this.modattaque==annule2touche)
            c.push("<br/><span class='defense combat'></span>: -2 <span class='touche'></span>");
        else if (this.modattaque==transformetoucherecul)
            c.push("<br/><span class='defense combat'></span>: <span class='touche'></span><span class='melee combat-cond'></span> &rarr; <span class='recul'></span>");
        else if (this.modattaque==touchetuerecul)
            c.push("<br/><span class='defense combat'></span>: <span class='tue combat'></span> /  <span class='touche combat'></span> &rarr; <span class='recul combat'></span>");
        if (this.bonusattaque==untouchetue)
            c.push("<span class='melee combat'></span>: 1 <span class='touche combat'></span> &rarr; <span class='tue combat'></span>");
        else if (this.bonusattaque==recultouchesiplaine) c.push("<span class='melee combat'></span> <span class='plaine combat-cond'></span><span class='ble combat-cond'></span>: <span class='recul combat'></span> &rarr; <span class='touche combat'></span>");
        else if (this.bonusattaque==doublereculsiforet) c.push("<span class='melee combat'></span><span class='forest combat-cond'></span>: <span class='recul combat facejaune'></span> &rarr; <span class='recul'></span><span class='recul'></span>");
        //else if (this.bonusattaque=meleefacevierge2legende) c.push("<span class='melee combat'></span>: Toute face vierge génère un jeton <span class='jetonlegende jeton'></span>");
        if (this.postattaque==doubleblessure)
            c.push("<span class='melee combat'></span>: <span class='jetonblessure jeton'></span> &rarr; +1  <span class='jetonblessure jeton'></span>");
        
        if (this.contrecoup) {
            let s="<span class='combat-cond melee'></span>";
            if (this.contrecoup==sicavalerie)
                s="<span class='combat-cond cavalerie'></span>";
            c.push("<span class='defense combat'></span>"+s+": <span class='vierge face"+this.defense[0].couleur+"'></span>&rarr;<span class='tue'></span>");
        }
        let dd="";
        let attaque=[];
        if (this.melee) attaque.push("<span class='melee combat'></span>");
        if (this.tir&&this.typetir==TENDU) attaque.push("<span class='tirtendu combat'></span>");
        if (this.tir&&this.typetir==CLOCHE) attaque.push("<span class='tircloche combat'></span>");
        
        if (typeof this.desc!="undefined") {
            dd=this.desc;
            let re = /%UNITE\(([^)]*)\)%/g;
            let res;
            while ((res = re.exec(dd)) !== null) {
                if (typeof res[1]!="undefined"
                    &&typeof dictionnaire_unites[res[1]]!="undefined") {
                    dd=dd.replace("%UNITE\("+res[1]+"\)%","<span class='fr'>"+res[1]+"</span><span class='en'>"+dictionnaire_unites[res[1]].en+"</span>");
                }
            }
            dd=dd.replace(/%LEGENDE%/g,"<span class='jetonlegende jeton'></span>")
                .replace(/%MELEE%/g,attaque.join(' / '))
                .replace(/%BR%/g,"<br/>")
                .replace(/%MELEEONLY%/g,"<span class='melee combat'></span>")
                .replace(/%POURSUITE%/g,"<span class='poursuiteaprescombat combat'></span>")  
                .replace(/%HERE%/g,"<span class='here combat-cond'></span>")
                .replace(/%HEREHEXA%/g,"<span class='herehexa combat-cond'></span>")
                .replace(/%HEREANDTHERE%/g,"<span class='hereandthere combat-cond'></span>")
                .replace(/%HEREANDTHERE2%/g,"<span class='hereandthere2 combat-cond'></span>")
                .replace(/%HEREANDTHEREHEXA%/g,"<span class='fr'>d'un hexagone</span><span class='en'>of an hex</span>")
                .replace(/%THERE%/g,"<span class='there combat-cond'></span>")
                .replace(/%ROUNDCOND%/g,"<span class='fr'>une fois par round</span><span class='en'>once per round</span>")
                .replace(/%TOURCOND%/g,"<span class='fr'>une fois par tour</span><span class='en'>once per turn</span>")
                .replace(/%ANNULER%/g,"<span class='fr'>annuler</span><span class='en'>cancel</span>")
                .replace(/%NORECUL%/g,"<span class='fr'>cette unité ne peut subir de <span class='recul'></span></span><span class='en'>this unit cannot take <span class='recul'></span></span>")
                .replace(/%DEPLACEMENTINFANTERIE%/g,"<span class='fr'>pour effectuer un déplacement, cette unité utilise l'action d'une infanterie de la même zone en plus de la sienne</span><span class='en'>To perform a move, this unit uses a move from an infantery in the same area in addition to its own</span>")
                .replace(/%MONTOUR%/g,"<span class='fr'>au début de votre tour</span><span class='en'>at the beginning of your turn</span>")
                .replace(/%DEBUTACTIVATION%/g,"<span class='fr'>au début de son activation</span><span class='en'>at the beginning of its activation</span>")
                .replace(/%SONTOUR%/g,"<span class='fr'>après une activation adverse</span><span class='en'>after an opponent activation</span>")
                .replace(/%MOVEENNEMI%/g,"<span class='fr'>une unité ennemie vient d'entrer ou déclare une action de mouvement pour sortir d'une zone</span><span class='en'>an opponent unit goes in or out of an area</span>")
                .replace(/%TIRTENDU%/g,"<span class='tirtendu combat'></span>")
                .replace(/%TIRCLOCHE%/g,"<span class='tircloche combat'></span>")
                .replace(/%GEANT%/g,"<span class='geant combat'></span>")
                .replace(/%DEFENSE%/g,"<span class='defense combat'></span>")
                .replace(/%CONSEIL%/g,"<b class='fr'>entretien</b><b class='en'>upkeep</b>")
                .replace(/%CAMP%/g,"<b class='fr'>contrôle des dégâts</b><b class='en'>casualties check</b>")
                .replace(/%LOOK2%/g,"<span class='fr'>vous pouvez regarder jusqu'à 2 <span class='cartelegende carte'></span> tirées au hasard dans la main d'un joueur</span><span class='en'>you can look up to 2 <span class='cartelegende carte'></span> taken randomly from the hand of a player</span>")
                .replace(/%XP%/g,"<span class='jetonxp jeton'></span>")
                .replace(/%INCENDIE%/g,"<span class='jetonincendie jeton'></span>")
                .replace(/%DETRUIT%/g,"<span class='jetondetruit jeton'></span>")
                .replace(/%BLESSURE%/g,"<span class='jetonblessure jeton'></span>")
                .replace(/%CARTELEGENDE%/g,"<span class='cartelegende carte'></span>")
                .replace(/%CARTERIVIERE%/g,"<span class='carteriviere carte'></span>")
                         .replace(/%BOUCLIER%/g,"<span class='bouclier'></span>")
                .replace(/%THIS%/g,"<span class='fr'>cette unité</span><span class='en'>this unit</span>")
                .replace(/%CANPUTSTAKEHEDGE%/g,"<span class='fr'>peut placer une haie de pieux (prise à la réserve) sur une frontière libre de sa zone</span><span class='en'>can place a stake hedge (taken from reserve) on a free border of his area</span>")
                .replace(/%TOFORTIFIEDGATE%/g,"<span class='fr'>à une porte fortifiée dans une zone adjacente</span><span class='en'>to fortified gate in an adjacent area</span>")
            .replace(/%OPPONENT%/g,"<span class='fr'>un adversaire</span><span class='en'>an opponent</span>")
                .replace(/%NO%/g,"<span class='no'></span>")
                .replace(/%ADVERSAIRE%/g,"<span class='fr'>à l'adversaire</span><span class='en'>to the opponent</span>")
                .replace(/%COHESION%/g,"<span class='fr'>cohésion</span><span class='en'>cohesion</span>")
                .replace(/%ESQUIVE%/g,"<span class='fr'>esquive</span><span class='en'>dodge</span>")
                .replace(/%CHARISME%/g,"<span class='fr'>charisme</span><span class='en'>charisma</span>")
                .replace(/%MASSE%/g,"<span class='fr'>masse</span><span class='en'>support</span>")
                .replace(/%RIPOSTE%/g,"<span class='fr'>riposte</span><span class='en'>retaliation</span>")
                .replace(/%PARADE%/g,"<span class='fr'>parade</span><span class='en'>parry</span>")
                .replace(/%FEINTE%/g,"<span class='fr'>feinte</span><span class='en'>feint</span>")
                .replace(/%CELERITE%/g,"<span class='fr'>célérité</span><span class='en'>haste</span>") 
                .replace(/%SAUT%/g,"<span class='fr'>saut</span><span class='en'>jump</span>") 
                .replace(/%CHARGE%/g,"charge")
                .replace(/%LEGENDAIRE%/g,"<span class='fr'>légendaire</span><span class='en'>legendary</span>")
                .replace(/%IMPETUOUS%/g,"<span class='fr'>impétueux</span><span class='en'>impetuous</span>")
                .replace(/%CANDOACTION%/g,"<span class='fr'>peut faire une action</span><span class='en'>can do an action</span>")
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
                         .replace(/%TOUTTYPE%/g,"<span class='fr'>unité(s)</span><span class='en'>unit(s)</span>")
                .replace(/%TROUPE%/g,"<span class='type troupe'></span>")
                .replace(/%PERSONNAGE%/g,"<span class='type personnage'></span>")
                .replace(/%RALLIEMENT%/g,"<span class='jeton ralliement'></span>")
                .replace(/%GARDEDUCORPS%/g,"<span class='fr'>Garde du corps</span><span class='en'>bodyguard</span>")
                .replace(/%MOVE%/g,"<span class='fr'>vous pouvez déplacez</span><span class='en'>you can move</span>")
                .replace(/%ENTRENCH%/g,"<span class='fr'>retranchez</span><span class='en'>entrench</span>")
                .replace(/%CHAMP%/g,"<span class='ble combat-cond'></span>")
                .replace(/%PLAINE%/g,"<span class='plaine combat-cond'></span>")
                .replace(/%FORET%/g,"<span class='foret combat-cond'></span>")
                .replace(/%ZONELIBREHEXA%/g,"<span class='fr'>sur une zone libre d'un hexagone</span><span class='en'>on a free area of an hex</span>")
                .replace(/%ROLL%/g,"<span class='fr'>lancez</span><span class='en'>roll</span>")
                .replace(/%VISEE%/g,"<span class='fr'>Visée</span><span class='en'>Targeting</span>")
                .replace(/%CHOOSE%/g,"<span class='fr'>choisissez</span><span class='en'>choose</span>")
                .replace(/%REROLL%/g,"<span class='fr'>relancez</span><span class='en'>reroll</span>")
                .replace(/%ONCEINGAME%/g,"<span class='fr'><b>action bonus</b>: une fois par partie,</span><span class='en'><b>bonus action</b>:  once in a game,</span>")
                .replace(/%STARTGAME%/g,"<span class='fr'>au début de la partie</span><span class='en'>at the beginning of the game</span>")
                .replace(/%NOPLAIN%/g,"<span class='fr'>dans une zone qui n'est pas une plaine</span><span class='en'>in a non-plain area</span>")
                .replace(/%CHOOSEZONE%/g,"<span class='fr'>choisissez une zone</span><span class='en'>choose an area</span>")
                .replace(/%DEJAUNE%/g,"<span class='dejaune'></span>")
                .replace(/%DEROUGE%/g,"<span class='derouge'></span>")
                .replace(/%DENOIR%/g,"<span class='denoir'></span>")
                .replace(/%DEBLANC%/g,"<span class='deblanc'></span>")
                .replace(/%1ORDERTOACTIVATE%/g,"<span class='fr'>il faut un ordre de plus pour l'activer</span><span class='en'>it needs an additional order to activate</span>")
                .replace(/%ACTIVATED%/g,"<b class='fr'>action bonus</b><b class='en'>bonus action</b>")
                .replace(/%SPECIAL%/g,"<b class='fr'>action spéciale</b><b class='en'>special action</b>")
                .replace(/%BONUSMOVE%/g,"<span class='fr'>peut effectuer une action bonus de déplacement</span><span class='en'>+1 move as bonus action</span>")
                .replace(/%NOMOVE%/g,"<span class='fr'>ne peut pas se déplacer</span><span class='en'>cannot move</span>")
                .replace(/%ACTIONPLAYER%/g,"<b class='fr'>action joueur</b><b class='en'>player action</b>")
                .replace(/%REVEALED%/g,"<span class='fr'>quand cette unité est révélée</span><span class='en'>when the unit is revealed</span>")
                .replace(/%DEFAUSSEZEN%/g,"<span class='fr'>défaussez en</span><span class='en'>discard</span>")
                         .replace(/%CHOOSERECUL%/g,"<span class='fr'>choisissez où cette unité est repoussée</span><span class='en'>choose where this unit is pushed</span>");
            if (c.length>0) dd="<br/>"+dd;
            c.push(dd);
        }
        if (typeof this.faction!="undefined") f="<span style='display:none'>"+this.faction+"</span><span class='blason-large "+NOM_FACTION[this.faction]+"'></span>";
        let command=null;
        if (this.commandement) 
            command=[this.commandement[0]==0?'A':this.commandement[0],this.commandement[1]];
        let nbox=this.box.map(x=>NOM_BOITE[x]).join(",");
        //if (IMAGE_BOITE[this.box]) nbox="<span class='combat "+IMAGE_BOITE[this.box]+"'></span>";
        return [n,en,
                f+subfaction,
                "<span style='display:none'>"+this.type+"</span><span class='blason "+NOM_TYPE[this.type]+" type'></span>",
                " "+m,
                " "+d,
                this.pdv,
                c.join(', '),
                command,
                nbox
               ];         
    }
    
    toString() {
        let j=this.toHTML();
        return "<tr><td>"+j[0]+"</td><td>"+j[1]+"</td><td>"+j[9]+"</td><td>"+j[2]+"</td><td>"+j[3]+"</td><td><div>"+j[4]+"</div><div class='hvalr'>"+j[5]+"</div></td><td>"+this.getCommand()+"</td><td><span class='pdv'>"+j[6]+"</span></td><td>"+j[7]+"</td></tr>";
    }
    getHTMLName(n) {
       let nn=this.nom;
        
        if (this.prenom) nn+="_"+this.prenom;
        nn=nn.replace(/ /g,"_").replace(/'/g,"_").replace(/,/g,"_").replace(/&/g,"");
        if (this.acheval) nn+="_à_cheval";
        if (this.niv==0) nn+="__";
        if (this.niv==1) nn+="_n1";
        if (this.niv==2) nn+="_n2";
        if ((this.nom=="Héros"||this.nom=="Héros monté")) {
                nn+="_"+NOM_FACTION[this.faction];
        }
        if (typeof this.subfaction!="undefined") {
            if (this.subfaction==BIEN) nn+="_Bien";
            if (this.subfaction==MAL) nn+="_Mal";
        }
        return nn;
    }
    getHrefImg(n) {
        let nn=this.getHTMLName(n);
        //if (typeof this.i!="undefined") nn=this.i;
        
        if (!this.troupe) { 
            n="<a href='#card' data-name='"+nn+"' data-toggle='modal' data-target='#card' data-embed='#mycard' onclick=\"document.getElementById('mycard').setAttribute('src','cards/persos/"+nn+".png')\">"+n+"</a>";
        } else {
            n="<a href='#card-troop' data-name='"+nn+"' data-toggle='modal' data-target='#card-troop' data-embed='#mycardtroop' onclick=\"document.getElementById('mycardtroop').setAttribute('src','cards/troupes/"+nn+".png')\">"+n+"</a>";
        }
        return n;
    }
    toArmy(at,min,max) {
        let r="";
        let i;
        let mini="";
        if (typeof min=="undefined") min=this[at][3];
        if (typeof max=="undefined") max=this[at][4];
        let ar = LISTE_ARMEES.filter(x=>x.id==at)[0];
        let checked="checked";
        if (this.f) { mini="data-mini='"+this.f+"'"; }
        for (i=0;i<min;i++)
            r+="<input "+mini+" data-moral='"+this[at][1]+"' data-pts='"+this[at][0]+"' "+checked+" type='radio' class='form-check-input' ' name='g"+this[at][2]+"_"+i+"'>";
        for (i=min;i<max;i++) r+="<input "+mini+" class='form-check-input' type='radio' data-moral='"+this[at][1]+"' data-pts='"+this[at][0]+"' name='g"+this[at][2]+"_"+i+"'>";
        if (this[at].length>5) {
            for (i=0;i<this[at][5];i++) r+="<input checked disabled class='form-check-input' type='checkbox' data-moral='"+this[at][1]+"' data-pts='"+this[at][0]+"'>";
            for (i=0;i<this[at][6];i++) r+="<input class='form-check-input' type='checkbox' data-moral='"+this[at][1]+"' data-pts='"+this[at][0]+"'>";
        }

        let n=this.getName(false);
        let hn=this.getHTMLName(n);
        n=this.getHrefImg(n);
        r="<tr id='P"+hn+"'><td class='form-check-inline'>"+r+"</td><td>"+n+"</td></td><td>"+this[at][0]/*cout*/+"</td><td>"+this[at][1]/*moral*/+"</td></tr>";
        return r;
    }
    format(dates) {
        let d="";
        if (dates&&this.dates) d="["+this.dates[0]+"-"+this.dates[1]+"] "+this.text;
        else d=this.text+(this.acheval?" à cheval":"")+(this.niv==1?"*":(this.niv==2?"**":""))+(this.subfaction==MAL?" - Mal":(this.subfaction==BIEN?" - Bien":""));
        return $("<span class='blason "+NOM_FACTION[this.faction]+"'>"+d+"</span>");      
    }
}

