const BATAILLE=0,SIEGE=1,CHEVAUCHEE=2,TRAITE=3,CROISADE=4,REVOLTE=5;
const COULEUR_BATAILLES=["col-blue","col-yellow","col-red","col-green","col-red","col-black"];

class Evenement {
    static el() {
        return [{start:"1297-09-11",text:"Bataille du Pont de Stirling", victoire:ECOSSAIS,desc:"La bataille du pont de Stirling constitue une des batailles des guerres d’indépendance de l’Écosse. Le 11 septembre 1297, les armées d'Andrew de Moray et de William Wallace affrontent celles de John de Warenne, 6e comte de Surrey, leur infligeant une défaite.",flag:[ECOSSAIS,ANGLAIS],commandants:["Wallace"]},
                {start:"1298-07",text:"Bataille de Falkirk", flag:[ECOSSAIS,ANGLAIS],desc:"La bataille de Falkirk, qui eut lieu en juillet 1298, marqua la fin de l'épopée de William Wallace lors de la Première Guerre d'indépendance de l'Écosse.",victoire:ANGLAIS,commandants:["Wallace"]},
                {start:"1327-01-25",text:"Début du règne d'Edouard III",flag:[ANGLAIS]},
                {start:"1339-10",stop:"1339-11",text:"Siège de Cambrai",flag:[FRANCAIS,ANGLAIS],commandants:["Edouard III"],desc:"Cambrai résiste à tous les assauts des Anglais pendant 2 semaines. Les forces anglaises se retirent quand l'armée de soutien de Philippe IV arrive.",source:"https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_Cambrai_(1339)",campagne:"Chevauchée d'Edouard III"},
                {start:"1340-05-24",text:"Bataille de l'Ecluse",flag:[FRANCAIS,ANGLAIS],desc:"Une bataille navale où la flotte anglaise écrase la flotte française.",victoire:ANGLAIS,source:"https://fr.wikipedia.org/wiki/Bataille_de_L%27%C3%89cluse_(1340)",campagne:"Chevauchée d'Edouard III"},
                {start:"1340-07-23",stop:"1340-09-25",text:"Siège de Tournai", flag:[FRANCAIS,ANGLAIS],commandants:["Edouard III","Philippe VI de Valois"],desc:"Edouard III assiège Tournai, Philippe VI approche avec une puissante armée. Jeanne de Valois, la belle-mère d'Edouard et soeur de Philippe, négocie une trève et chacun retourne en son pays.",source:"https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_Tournai_(1340)",campagne:"Chevauchée d'Edouard III"},
                {start:"1340-07-26",text:"Bataille de Saint-Omer", flag:[FRANCAIS,ANGLAIS],victoire:FRANCAIS,campagne:"Chevauchée d'Edouard III",desc:"L'arrière garde et les bagages de l'armée anglo-flamande est massacrée devant Saint-Omer par les Français.",source:"https://fr.wikipedia.org/wiki/Bataille_de_Saint-Omer_(1340)"},
                {start:"1341-10-14",text:"Bataille de Champtoceaux", flag:[FRANCAIS,ANGLAIS],campagne:"Guerre de succession de Bretagne",victoire:FRANCAIS,desc:"La bataille inaugure le conflit dynastique en Bretagne, opposant Charles de Blois à Jean de Montfort, soutenu par les Anglais. Les deux rivaux s'opposent pendant 2 jours près d'une ferme et finalement Jean de Montfort s'enfuie à Nantes.",commandants:["Brienne"]},
                {start:"1342-04",text:"Bataille de Quimperlé", flag:[FRANCAIS,ANGLAIS],campagne:"Guerre de succession de Bretagne",victoire:ANGLAIS,desc:"Louis de la Cerda , commandant de l'armée de Charles de Blois de 6000 hommes, rencontre 3000 archers anglais. Les premiers finissent par fuir.",source:"https://fr.wikipedia.org/wiki/Bataille_de_Quimperl%C3%A9"},
                {start:"1342-05",start:"1342-06",text:"Siège d'Hennebont", flag:[FRANCAIS,ANGLAIS],campagne:"Guerre de succession de Bretagne",victoire:ANGLAIS,source:"https://fr.wikipedia.org/wiki/Si%C3%A8ge_d%27Hennebont",desc:"Les troupes montfortistes font le siège d'Hennebont, dans laquelle est Jeanne de Flandre, mère de Jean de Montfort. Grace à des ruses, Jeanne parvient à sortir de la ville et revient avec des renforts. Le siège est levé par la suite."},
                {start:"1342-12-05",stop:"1343-01-19",text:"Siège de Vannes", flag:[FRANCAIS,ANGLAIS,BIEN],victoire:BIEN,campagne:"Guerre de succession de Bretagne",commandants:["Edouard III","Salisbury"],desc:"Quatre sièges successifs et la ville sera remise aux légats du pape, après intervention du pape Clément VI",source:"https://fr.wikipedia.org/wiki/Si%C3%A8ges_de_Vannes_(1342)"},
                {start:"1342-09-19",text:"Bataille de Morlaix", flag:[FRANCAIS,ANGLAIS],campagne:"Guerre de succession de Bretagne",victoire:FRANCAIS,commandants:["Northampton"],source:"https://fr.wikipedia.org/wiki/Bataille_de_Morlaix",desc:"Northampton, assiegeant Morlaix, intercepte l'armée Francaise-Bretonne de Charles de Blois qui vient libérer la ville"},
                {start:"1345-06-17",text:"Bataille de Cadoret", campagne:"Guerre de succession de Bretagne",flag:[FRANCAIS,ANGLAIS],victoire:ANGLAIS,desc:"Charles de Blois combat Thomas Dagworth toute une après-midi. Pris sous une pluie de flèches, l'armée de Charles de Blois subit de nombreuses pertes."},
                {start:"1345-08",text:"Bataille de Bergerac", flag:[FRANCAIS,ANGLAIS],victoire:ANGLAIS,desc:"Les armées anglo-gasconnes commandées par le comte de Derby combatent les Français autour du pont de Bergerac qui est sur la frontière de la Gascogne (anglaise) et devant les murs, avant la prise de la ville."},
                {start:"1345-10-21",text:"Bataille d'Auberoche", flag:[FRANCAIS,ANGLAIS],victoire:ANGLAIS,desc:"Les anglo-gascons commandés par le comte de Derby, en infériorité numérique attaquent les Français pendant le déjeuner. Déroute totale des Français.",victoire:ANGLAIS},
                {start:"1346-06-09",text:"Bataille de Saint-Pol-de-Léon", flag:[FRANCAIS,ANGLAIS],campagne:"Guerre de succession de Bretagne",victoire:ANGLAIS,desc:"Charles de Blois lance des multiples assauts frontaux de fantassins contre des archers anglais retranchés. Il ne peut remporter la victoire et du retourner dans ses bastions.",source:"https://fr.wikipedia.org/wiki/Bataille_de_Saint-Pol-de-L%C3%A9on"},
                {start:"1346-07-02",stop:"1347-10-12",text:"Chevauchée d'Édouard III", flag:[FRANCAIS,ANGLAIS]},
                {start:"1346-07-26",text:"Siège de Caen", flag:[FRANCAIS,ANGLAIS],campagne:"Chevauchée d'Edouard III, le retour",victoire:ANGLAIS,commandants:["Edouard III","Le Prince Noir","Warwick","Northampton"],source:"https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_Caen_(1346)",desc:"Prise de la ville française, peu défendue et pillage."},
                {start:"1346-08-24",text:"Bataille du gué de Blanquetaque",campagne:"Chevauchée d'Edouard III, le retour",victoire:ANGLAIS,commandants:["Edouard III","Le Prince Noir","Warwick","Northampton"], flag:[FRANCAIS,ANGLAIS],desc:"La bataille se déroule au milieu du gué de la Somme.",source:"https://fr.wikipedia.org/wiki/Bataille_du_gu%C3%A9_de_Blanquetaque",desc:"L'armée anglaise se retrouve sur un gué devant la Somme, avec une armée française sur la rive opposée. Quelques Anglais traversent et les Français se précipitent à leur rencontre dans le fleuve.",commandant:["Edouard III"]},
                {start:"1346-08-26",type:BATAILLE,scenario:true,campagne:"Chevauchée d'Edouard III, le retour",victoire:ANGLAIS,commandants:["Edouard III","Le Prince Noir","Northampton","Philippe VI le Valois","Chandos","Jean 1er de Luxembourg","Arundel","Charles II"],text:"La bataille de Crécy",joueurs:[2],stars:2,flag:[FRANCAIS,ANGLAIS],desc:"Sur le chemin de retour de sa chevauchée, Edouard III obtient une victoire écrasante face à l'armée de Philippe VI, pourtant supérieure numériquement."},
                {start:"1346-09-04",stop:"1347-08-03",type:SIEGE,scenario:true,text:"Siège de Calais", joueurs:[2],stars:2,flag:[FRANCAIS,ANGLAIS],commandants:["Jean de Vienne","Edouard III"],victoire:ANGLAIS,desc:"6 bourgeois de Calais, la corde au cou, pieds nus et en chemise, se rendent à Edouard III pour épargner la ville.",source:"https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_Calais_(1346-1347)"},/* Jean de Vienne a 5 ans */
                {start:"1346-10-17",text:"Bataille de Neville's Cross", victoire:ANGLAIS,flag:[ECOSSAIS,ANGLAIS],source:"https://fr.wikipedia.org/wiki/Bataille_de_Neville%27s_Cross",desc:"Espérant vaincre les Anglais alors concentrés en France, les Ecossais avec le roi David II envahissent le nord de l'Angleterre. Ils se heurtent à une force bien retranchée qui les bat et capture le roi.",},
                {start:"1347-06-18",text:"Bataille de La Roche-Derrien", flag:[FRANCAIS,ANGLAIS],victoire:ANGLAIS,campagne:"Guerre de succession de Bretagne",source:"https://fr.wikipedia.org/wiki/Bataille_de_La_Roche-Derrien",desc:"Les anglo-monfortistes commandés par Thomas Dagworth gagnent contre les Bretons de Charles de Blois. Celui-ci est fait prisonnier."},
                {start:"1348-02",type:BATAILLE,scenario:true,text:"La Peste",flag:[BIEN,MAL]},
                {start:"1349-07",text:"Bataille de Lunalonge", commandants:["Captal","Boucicaut"],flag:[FRANCAIS,ANGLAIS],desc:"Un raid des Français contre les Anglais. La bataille a lieu sur une colline occupée par les Anglais, combattant avec des lances. Boucicaut est capturé.",source:"https://fr.wikipedia.org/wiki/Bataille_de_Lunalonge"},
                {start:"1349-12-31",stop:"1350-01-01",text:"Siège de Calais", flag:[FRANCAIS,ANGLAIS],victoire:ANGLAIS,commandants:["Edouard III","Salisbury","Suffolk"],desc:"Le gouverneur de Calais s'apprête à livrer Calais aux Français. Edouard III l'apprend et embusque les Français."},
                {start:"1351-06",text:"Bataille de Saintes", flag:[FRANCAIS,ANGLAIS],victoire:ANGLAIS,desc:"Les Français, assiégeant Saintes, sont mis en déroute par une armée de secours anglaise.",source:"https://fr.wikipedia.org/wiki/Bataille_de_Saintes"},
                {start:"1351-03",stop:"1351-08-07",text:"Siège de Saint-Jean-d'Angély", flag:[FRANCAIS,ANGLAIS],commandants:["Jean II","Amanieu"],victoire:FRANCAIS,desc:"Un siège Français sur une petite ville non stratégique. La ville se rend sans combat.",source:"https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_Saint-Jean-d%27Ang%C3%A9ly_(1351)"},
                {start:"1351-03-26",type:BATAILLE,text:"Combat des Trente", flag:[FRANCAIS,ANGLAIS],campagne:"Guerre de succession de Bretagne",commandants:["Knolles"],victoire:FRANCAIS,source:"https://fr.wikipedia.org/wiki/Combat_des_Trente",desc:"À la suite d'un défi lancé par Jean IV de Beaumanoir, un combat est organisé entre trente partisans de Charles de Blois et trente partisans de Jean de Montfort"},
                {start:"1351-06-06",text:"Bataille d'Ardres", flag:[FRANCAIS,ANGLAIS],victoire:FRANCAIS,desc:"Les Anglais sont vaincus après êtres pris par une armée Française alors qu'ils se retiraient d'un raid.",source:"https://fr.wikipedia.org/wiki/Bataille_d%27Ardres"},
                {start:"1352-08-14",text:"Bataille de Mauron", flag:[FRANCAIS,ANGLAIS],campagne:"Guerre de succession de Bretagne",victoire:ANGLAIS,source:"https://fr.wikipedia.org/wiki/Bataille_de_Mauron",desc:"Les Français attaquent les Anglais sur une colline, forcent les archers à combattre comme des fantassins mais finissent par se faire battre puis massacrer. Les pertes furent importantes des deux cotés."},
                {start:"1354-04-10",text:"Bataille de Montmuran", campagne:"Guerre de succession de Bretagne",commandants:["Guesclin"],victoire:FRANCAIS,flag:[FRANCAIS,ANGLAIS],desc:"Les Franco-Bretons dirigés par Du Guesclin se vengent de la bataille de Mauron.",source:"https://fr.wikipedia.org/wiki/Bataille_de_Montmuran"},
                {start:"1355-10-10",stop:"1355-12-09",text:"Chevauchée du Prince noir", commandants:["Prince Noir"],flag:[FRANCAIS,ANGLAIS]},
                {start:"1356-08-04",stop:"1356-09-19",scenario:true,type:CHEVAUCHEE,type:CHEVAUCHEE,text:"La Chevauchée du Prince Noir",flag:[FRANCAIS,ANGLAIS],commandants:["Prince Noir"],joueurs:[2,4],stars:3}, /* TODO: Boucicaut n'est pas la */
                {start:"1356-09-19",scenario:true,type:BATAILLE,text:"La bataille de Poitiers", joueurs:[2,6],stars:3,flag:[FRANCAIS,ANGLAIS],victoire:ANGLAIS,commandants:["Jean II","Le Prince Noir","Salisbury","Philippe d'Orléans","Andrehem","Gautier VI","Clermont","Chandos","Warwick","Captal"],source:"https://fr.wikipedia.org/wiki/Bataille_de_Poitiers_(1356)",desc:"Déroute francaise, Jean II est capturé."},
                {start:"1356-10-03",stop:"1357-06-30",text:"Siège de Rennes",flag:[ANGLAIS,FRANCAIS]},
                {start:"1356-12",type:BATAILLE,scenario:true, text:"Du Guesclin au siège de Rennes",joueurs:[2],stars:1,flag:[ANGLAIS,FRANCAIS],commandants:["Guesclin"]}, /* TODO: Un an plus tot que le scenario*/
                {start:"1358-04-18",stop:"1358-08-02",text:"Siège de Paris", flag:[FRANCAIS,AUTRE]},
                {start:"1358-06-09",text:"Siège de Meaux", flag:[FRANCAIS,AUTRE]},
                {start:"1358-08-01",stop:"1359-04-29",text:"Siège de Saint-Valery", flag:[FRANCAIS,ANGLAIS]},
                {start:"1358-09-16",text:"Bataille d'Amiens", flag:[FRANCAIS,ANGLAIS]},
                {start:"1359-10-28",stop:"1360-05-08",text:"Chevauchée d'Edouard III", flag:[FRANCAIS,ANGLAIS]},
                {start:"1359-12-20",stop:"1360-01-11",text:"Siège de Reims",commandants:["Edouard III"],campagne:"Chevauchée d'Edouard III",flag:[FRANCAIS,ANGLAIS],desc:"Le siège est abandonné, faute de matériel de siège."},
                {start:"1360-03-12",text:"Attaque de Winchelsea", flag:[FRANCAIS,ANGLAIS],victoire:FRANCAIS,desc:"Un raid francais en Angleterre pour libérer Jean II, supposé être à Winchelsea."},
                {start:"1360-03-31",stop:"1360-04-12",text:"Siège de Paris", flag:[FRANCAIS,ANGLAIS],commandants:["Edouard III"],campagne:"Chevauchée d'Edouard III"},
                {start:"1360-03-31",text:"Siège de l'église fortifiée de Chastres",flag:[FRANCAIS,ANGLAIS],commandants:["Edouard III"],campagne:"Chevauchée d'Edouard III",victoire:ANGLAIS,desc:"Les Anglais passent le temps autour d'une église fortifiée."},
                {start:"1360-04-13",text:"Lundi noir", victoire:BIEN,flag:[ANGLAIS,BIEN],commandants:["Edouard III","Le Prince Noir","Warwick"],campagne:"Chevauchée d'Edouard III",desc:"Un orage décime les troupes anglaises, et conclue la chevauchée d'Edouard III"},
                {start:"1360-05",text:"Traité de Brétigny",flag:[FRANCAIS,ANGLAIS]},
                {start:"1361-04",text:"Bataille de Briouze", flag:[FRANCAIS,ANGLAIS],commandants:["Guesclin"],victoire:FRANCAIS,campagne:"Campagne contre les grandes compagnies",desc:"La flatterie fut l'élément essentiel qu'utilisèrent les Anglais pour que Du Guesclin les laisse se déployer en rase campagne afin qu'ils puissent utiliser toutes leurs forces"},
                {start:"1362-04",text:"Bataille de Mortain",flag:[FRANCAIS,ANGLAIS],commandants:["Guesclin"],victoire:FRANCAIS,campagne:"Campagne contre les grandes compagnies"},
                {start:"1362-04",text:"Bataille de Livarot", flag:[FRANCAIS,ANGLAIS],commandants:["Jouel","Guesclin"],victoire:FRANCAIS,campagne:"Campagne contre les grandes compagnies"},
                {start:"1362-04-06",scenario:true,type:BATAILLE,text:"La bataille de Brignais", joueurs:[2,3,4],stars:3,flag:[FRANCAIS,MERCENAIRE],victoire:MERCENAIRE,commandants:["Seguin","Meschin","Jacques de Bourbon"],campagne:"Campagne contre les grandes compagnies"},
                {start:"1362-04",text:"Bataille de Saint-Martin-de-Seez", flag:[FRANCAIS,ANGLAIS,MERCENAIRE],victoire:FRANCAIS,commandants:["Guesclin"],campagne:"Campagne contre les grandes compagnies"},
                {start:"1364-03",stop:"1364-04-09",text:"Siège de Rolleboise", flag:[FRANCAIS,ANGLAIS],commandants:["Guesclin","Auxerre"],victoire:FRANCAIS,campagne:"Campagne contre les grandes compagnies"},
                {start:"1364-04-07",text:"Siège de Mantes", flag:[FRANCAIS,ANGLAIS],campagne:"Reconquête contre Charles le Mauvais",victoire:FRANCAIS,commandants:["Guesclin","Boucicaut"]},
                {start:"1364-04-10",text:"Siège de Meulan", flag:[FRANCAIS,ANGLAIS],commandants:["Guesclin","Boucicaut"],victoire:FRANCAIS,campagne:"Reconquête contre Charles le Mauvais"},
                {start:"1364-05-16",text:"Bataille de Cocherel", flag:[FRANCAIS,ANGLAIS,MERCENAIRE],stars:3,joueurs:[2,3],commandants:["Guesclin","Auxerre","Captal","Amanieu","Cervole","Jouel","Lens"],campagne:"Reconquête contre Charles le Mauvais",victoire:FRANCAIS},
    {start:"1365-09-29",text:"Bataille d'Auray", flag:[FRANCAIS,ANGLAIS]},
    {start:"1367-04-03",text:"Bataille de Nájera", flag:[FRANCAIS,ANGLAIS]},
    {start:"1369-03-14",text:"Bataille de Montiel", flag:[FRANCAIS]},
    {start:"1369-06",text:"Bataille de Lusignan", flag:[FRANCAIS,ANGLAIS]},
    {start:"1369-07-01",stop:"1369-07-30",text:"Siège de La Roche-Posay", flag:[FRANCAIS,ANGLAIS]},
    {start:"1369-12-31",text:"Siège de Saint-Savin-sur-Gartempe", flag:[FRANCAIS,ANGLAIS]},
    {start:"1370-01-01",type:BATAILLE,text:"Combat du Pont de Lussac", flag:[FRANCAIS,ANGLAIS]},
    {start:"1370-09-19",text:"Sac de Limoges", flag:[FRANCAIS,ANGLAIS]},
    {start:"1370-09-23",text:"Siège de Paris", flag:[FRANCAIS,ANGLAIS]},
    {start:"1370-12-04",text:"Bataille de Pontvallain", flag:[FRANCAIS,ANGLAIS]},
    {start:"1372-06",text:"Siège de Guernesey", flag:[FRANCAIS,ANGLAIS]},
    {start:"1372-06-22",stop:"1372-08-23",text:"Siège de La Rochelle", flag:[FRANCAIS,ANGLAIS]},
    {start:"1372-08-22",text:"Siège de Soubise", flag:[FRANCAIS,ANGLAIS]},
    {start:"1373-03-21",text:"Bataille de Chizé", flag:[FRANCAIS,ANGLAIS]},
    {start:"1373-06-12",stop:"1373-12",text:"Chevauchée de Lancastre", flag:[FRANCAIS,ANGLAIS]},
    {start:"1373-06-16",stop:"1373-06-28",text:"Siège de Mauvezin", flag:[FRANCAIS,ANGLAIS]},
    {start:"1374-06",text:"Siège de Bayonne", flag:[FRANCAIS,ANGLAIS]},
    {start:"1376-09",scenario:true,type:BATAILLE,text:"L'Offensive contre Plymouth",joueurs:[4],stars:3, flag:[FRANCAIS]},
    {start:"1377-06-21",text:"Début du règne de Richard II",flag:[ANGLAIS]},
    {start:"1377-06-29",type:CHEVAUCHEE,text:"Raid sur Rye", flag:[FRANCAIS,ANGLAIS]},
    {start:"1377-07",text:"Bataille de Lewes", flag:[FRANCAIS,ANGLAIS]},
    {start:"1377-08-21",text:"Bataille de l'île de Wight", flag:[FRANCAIS,ANGLAIS]},
    {start:"1377-08-22",text:"Bataille de Yarmouth", flag:[FRANCAIS,ANGLAIS]},
    {start:"1377-09-01",text:"Bataille d'Eymet", flag:[FRANCAIS,ANGLAIS]},
    {start:"1378-08-14",stop:"1378-09",text:"Siège de Saint-Malo", flag:[FRANCAIS,ANGLAIS]},
    {start:"1380-06-20",stop:"1380-06-26",text:"Siège de Chaliers", flag:[FRANCAIS,MERCENAIRE]},
    {start:"1380-02-28",stop:"1380-07-14",text:"Siège de Châteauneuf-de-Randon", flag:[FRANCAIS,ANGLAIS]},
    {start:"1380-11-08",stop:"1381-01-14",text:"Siège de Nantes", flag:[FRANCAIS,ANGLAIS]},
    {start:"1381-03",text:"Tournoi de Vannes", flag:[FRANCAIS,ANGLAIS]},
    {start:"1382-04",text:"Passage de Comines", flag:[FRANCAIS,AUTRE]},
    {start:"1382-06-29",type:BATAILLE,scenario:true,text:"La revanche de la Tarasque",stars:3,joueurs:[3],flag:[FRANCAIS,MAL,BIEN]},
    {start:"1382-07-29",type:BATAILLE,scenario:true,text:"L'Enfant",joueurs:[2],stars:3,flag:[MAL,BIEN]},
    {start:"1382-11-27",text:"Bataille de Roosebeke", flag:[FRANCAIS,AUTRE]},
    {start:"1382-12-21",stop:"1383-09-17",text:"Croisade d'Henri le Despenser", flag:[FRANCAIS,ANGLAIS]},
    {start:"1383-06-08",stop:"1383-08-08",text:"Siège d'Ypres", flag:[FRANCAIS,ANGLAIS]},
    {start:"1383-12-25",type:BATAILLE,text:"La Croix du Loup-Pendu",scenario:true,joueurs:[2],stars:2,flag:[FRANCAIS,MAL]},
    {start:"1385-07",text:"Siège de Wark", flag:[FRANCAIS,ANGLAIS,ECOSSAIS]},
    {start:"1385-08-14",text:"Bataille d'Aljubarrota", flag:[FRANCAIS,ANGLAIS]/* Boulangere tueuse */},
    {start:"1387-03-24",text:"Bataille de Margate", flag:[FRANCAIS,ANGLAIS]},
    {start:"1395-05-17",text:"Bataille de Rovines", flag:[VALAQUE,OTTOMAN]},
    {start:"1396-09-25",text:"Bataille de Nicopolis", flag:[OTTOMAN,FRANCAIS,ANGLAIS,VALAQUE]},
    {start:"1399-09-30",text:"Début du règne de Henry IV",flag:[ANGLAIS]},
    {start:"1402-05-19",type:BATAILLE,text:"Combat des Sept", flag:[FRANCAIS,ANGLAIS]},
    {start:"1404-04",text:"Bataille de Blackpool Sands", flag:[ANGLAIS,FRANCAIS]},
    {start:"1404-04",text:"Siège de Harlech", flag:[FRANCAIS,ANGLAIS]},
    {start:"1404-04",text:"Siège de Caernarfon", flag:[FRANCAIS,ANGLAIS]},
    {start:"1404-11",text:"Siège de Falmouth", flag:[FRANCAIS,ANGLAIS,MAL]},
    {start:"1405-06-2",stop:"1405-07-04",type:CHEVAUCHEE,text:"Raid contre Saint-Vaast-la-Hougue", flag:[FRANCAIS,ANGLAIS]},
    {start:"1405-08",text:"Siège de Haverford", flag:[FRANCAIS,ANGLAIS]},
    {start:"1405-08",text:"Siège de Tenby", flag:[FRANCAIS,ANGLAIS]},
    {start:"1405-08",text:"Siège de Carmarthen", flag:[FRANCAIS,FRANCAIS]},
    {start:"1405-09",text:"Bataille de Worcester", flag:[FRANCAIS,ANGLAIS]},
    {start:"1406-01-01",stop:"1407-10-12",text:"Siège de Lourdes", flag:[FRANCAIS,ANGLAIS]},
    {start:"1406-09",type:CHEVAUCHEE,text:"Raid sur Jersey", flag:[FRANCAIS,ANGLAIS]},
    {start:"1409-08",type:BATAILLE,text:"Saint Michel et le Dragon",scenario:true,joueurs:[2],stars:2,flag:[MAL,BIEN]},
    {start:"1411-04",text:"Siège de Rethel", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1412-05-09",text:"Bataille de Saint-Rémy-du-Plain", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1412-06-11",stop:"1412-07-12",text:"Siège de Bourges", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1412-07-10",stop:"1412-07-15",text:"Siège de Dreux", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1413-03-20",text:"Début du règne de Henry V",flag:[ANGLAIS]},
    {start:"1413-04-27",stop:"1413-09-05",text:"Révolte des Cabochiens", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1415-08-18",text:"Siège d'Harfleur", flag:[FRANCAIS,ANGLAIS]},
    {start:"1415-10-25",type:BATAILLE,scenario:true,text:"La bataille d'Azincourt", joueurs:[2,4],stars:3,flag:[FRANCAIS,ANGLAIS]},
    {start:"1416-03-09",text:"Bataille de Valmont", flag:[FRANCAIS,ANGLAIS]},
    {start:"1416-08-15",text:"Bataille de Chef-de-Caux", flag:[FRANCAIS,ANGLAIS]},
    {start:"1417-08-18",text:"Siège de Caen", flag:[FRANCAIS,ANGLAIS]},
    {start:"1418-07-29",stop:"1419-01-19",type:SIEGE,text:"Siège de Rouen", joueurs:[2],stars:2,scenario:true,flag:[FRANCAIS,ANGLAIS]},
    {start:"1420-06-16",stop:"1420-07-01",text:"Siège de Montereau-Fault-Yonne", flag:[FRANCAIS,ANGLAIS,BOURGUIGNON]},
    {start:"1420-07-07",stop:"1420-11-17",text:"Siège de Melun", flag:[FRANCAIS,ANGLAIS,BOURGUIGNON]},
    {start:"1420-04",text:"Prise de Paris", flag:[FRANCAIS,ANGLAIS,BOURGUIGNON]},
    {start:"1421-03-22",text:"Bataille de Baugé", flag:[FRANCAIS,ANGLAIS,ECOSSAIS]},
    {start:"1421-08-30",text:"Bataille de Mons-en-Vimeu", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1421-10-06",stop:"1422-05-10",text:"Siège de Meaux", flag:[FRANCAIS,ANGLAIS]},
    {start:"1421-10-31",type:BATAILLE,scenario:true,text:"Plus de place en Enfer", joueurs:[1],stars:3,flag:[FRANCAIS,MAL]},
    {start:"1421-10",text:"Traité de Troyes",flag:[FRANCAIS,ANGLAIS]},
    {start:"1422-08",text:"Bataille de Bernay", flag:[FRANCAIS,ANGLAIS]},
    {start:"1423-07-31",scenario:true,type:BATAILLE,text:"La bataille de Cravant", joueurs:[2,3,4],stars:3,flag:[FRANCAIS,ANGLAIS,BOURGUIGNON,ECOSSAIS]},
    {start:"1423-09-26",type:BATAILLE,text:"La Brossinière",scenario:true,joueurs:[2],stars:1,flag:[FRANCAIS,ANGLAIS]},
    /*{start:"1424-08-15",text:"Siège de Verneuil", flag:[FRANCAIS,ECOSSAIS,ANGLAIS]},*/
    {start:"1424-08-17",text:"Bataille de Verneuil", flag:[FRANCAIS,ANGLAIS,BOURGUIGNON,ECOSSAIS]},
    {start:"1425-06-16",text:"Bataille du Mont-Saint-Michel", flag:[FRANCAIS,ANGLAIS]},
    {start:"1426-03-06",text:"Bataille de Saint-James", flag:[FRANCAIS,ANGLAIS]},
    {start:"1427-07-15",stop:"1427-09-05",text:"Siège de Montargis", flag:[FRANCAIS,ANGLAIS]},
    {start:"1428-02-13",type:BATAILLE,text:"L'Epée de Fierbois",scenario:true,joueurs:[2],stars:1,flag:[FRANCAIS,ANGLAIS]},
    {start:"1428-03-13",text:"Siège de Laval", flag:[FRANCAIS,ANGLAIS]},
    {start:"1428-10-12",stop:"1429-05-08",text:"Siège d'Orléans", flag:[FRANCAIS,ANGLAIS,ECOSSAIS]},
    {start:"1429-02-12",text:"La bataille des Harengs",scenario:true,joueurs:[2,3],stars:2,type:BATAILLE, flag:[FRANCAIS,ANGLAIS,ECOSSAIS]}, /* Jean Stuart de Buchan est mort avant cette date, 1424!! C'est bien Derneley qui est aux harengs */
    {start:"1429-02-25",text:"La cour de Chinon",scenario:true,type:BATAILLE,flag:[FRANCAIS,ANGLAIS],joueurs:[2,4],stars:3},
    {start:"1429-05-05",type:BATAILLE,text:"La bastille Saint-Loup",joueurs:[2],stars:2,scenario:true,flag:[FRANCAIS,ANGLAIS]},
    {start:"1429-05-06",type:BATAILLE,text:"L'attaque des Tourelles",scenario:true,joueurs:[2],stars:2,flag:[FRANCAIS,ANGLAIS]},
    {start:"1429-06-10",text:"Bataille de Jargeau", flag:[FRANCAIS,ANGLAIS]},
    {start:"1429-06-15",text:"La bataille de Meung-sur-Loire", scenario:true,type:BATAILLE,joueurs:[2,4],stars:1,flag:[FRANCAIS,ANGLAIS]},
    {start:"1429-06-16",text:"Bataille de Beaugency", flag:[FRANCAIS,ANGLAIS]},
    {start:"1429-06-18",type:BATAILLE,scenario:true,text:"La bataille de Patay",joueurs:[2],stars:1, flag:[FRANCAIS,ANGLAIS]},
    {start:"1429-07-04",/*stop:"1429-07-16",*/text:"Prendre Troyes par la foi", joueurs:[2],stars:3,scenario:true, type:BATAILLE,flag:[FRANCAIS,BOURGUIGNON]},/* Brimeu et de Croy sont morts a Azincourt */
    {start:"1429-08-15",text:"Bataille de Montépilloy", flag:[FRANCAIS,ANGLAIS]},
    {start:"1429-09-03",text:"Siège de Paris", flag:[FRANCAIS,ANGLAIS,BOURGUIGNON]},
    {start:"1429-09-25",text:"Siège de Laval", flag:[FRANCAIS,ANGLAIS]},
    {start:"1429-11",text:"Siège de Saint-Pierre-le-Moûtier", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1429-11-24",stop:"1429-12-25",text:"Siège de La Charité-sur-Loire", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1430-05-20",stop:"1430-10-28",text:"Siège de Compiègne", flag:[FRANCAIS,BOURGUIGNON]},
    {start:"1430-05-23",type:BATAILLE,text:"La capture de Jeanne d'Arc",scenario:true,joueurs:[2,4],stars:2,flag:[FRANCAIS,ANGLAIS]},
    {start:"1431-02-19",text:"La libération de Jeanne d'Arc",scenario:true,joueurs:[2,4],stars:3,flag:[FRANCAIS,ANGLAIS]},
    {start:"1431-07-02",text:"Bataille de Bulgnéville", flag:[BOURGUIGNON,FRANCAIS]},
    {start:"1432-07",stop:"1432-08-20",text:"Siège de Lagny-sur-Marne", flag:[FRANCAIS,ANGLAIS,BOURGUIGNON,ECOSSAIS]},
    {start:"1435-05-09",text:"Bataille de Gerberoy", flag:[FRANCAIS,ANGLAIS]},
    {start:"1436-04",text:"Siège de Paris", flag:[FRANCAIS,ANGLAIS]},
    {start:"1436-07-09",stop:"1436-07-29",text:"Siège de Calais", flag:[BOURGUIGNON,ANGLAIS]},
    {start:"1441-08-31",stop:"1442-06-24",text:"Siège de Tartas", flag:[FRANCAIS,ANGLAIS]},
    {start:"1442-11-02",stop:"1443-08-15",text:"Siège de Dieppe", flag:[FRANCAIS,ANGLAIS]},
    {start:"1449-03-23",stop:"1449-11-04",text:"Siège de Fougères", flag:[FRANCAIS,ANGLAIS]},
    {start:"1449-07-19",stop:"1449-08",type:BATAILLE,text:"Prise de Verneuil", flag:[FRANCAIS,ANGLAIS]},
    {start:"1450-04-15",type:BATAILLE,scenario:true,text:"La bataille de Formigny", stars:3,joueurs:[2,6],flag:[FRANCAIS,ANGLAIS]},
    {start:"1450-10-19",stop:"1450-07-01",text:"Siège de Caen", flag:[FRANCAIS,ANGLAIS]},
    {start:"1450-11-01",text:"Bataille de la Male Jornade", flag:[FRANCAIS,ANGLAIS]},
    {start:"1453-06-25",text:"Bataille de Martignas", flag:[FRANCAIS,ANGLAIS]},
    {start:"1453-07-17",text:"Bataille de Castillon", flag:[FRANCAIS,ANGLAIS]},
    {start:"1462-06-17",scenario:true,type:BATAILLE,text:"Vlad Tepes à Targoviste",joueurs:[2],stars:2,flag:[VALAQUE,OTTOMAN]},
    {start:"1462-06-18",scenario:true,type:BATAILLE,text:"Soif de sang",stars:2,joueurs:[2,3],flag:[VALAQUE,OTTOMAN,MAL]},
    {start:"1463-04-06",text:"Chute de Constantinople", flag:[OTTOMAN]},
    {start:"1475-08",text:"Traité de Picquigny",flag:[FRANCAIS,ANGLAIS]},
               ];
    }
    constructor(e) {
        Object.assign(this,e);
        if (this.text.startsWith("Bataille")) this.type=BATAILLE;
        if (this.text.startsWith("Siège")) this.type=SIEGE;
        if (this.text.startsWith("Chevauchée")) this.type=CHEVAUCHEE;
        if (this.text.startsWith("Croisade")) this.type=CROISADE;
        if (this.text.startsWith("Début")) this.type=TRAITE;
        if (this.text.startsWith("Traité")) this.type=TRAITE;
        if (this.text.startsWith("Révolte")) this.type=REVOLTE;
        if (typeof this.type!="undefined"&&this.type!=BATAILLE)
            this.class=COULEUR_BATAILLES[this.type];
        if (this.scenario) this.text=this.text+"*";
    }
    static liste() {
        let i,l=[];
        let liste=Evenement.el();
        for (i=0;i<liste.length;i++) {
            let e=liste[i];
            e.id=i;
            l[i]=new Evenement(e);
        }
        return l;
    }
    format(withdate) {
        let t=this.text,j;
        if (this.scenario&&withdate) {
            if (this.stars>=2) t+="*";
            if (this.stars==3) t+="*";
        }
        if (this.start&&withdate) {
            t=this.start.getFullYear()+" "+t;
        }
        if (this.flag) {
            t+=" ";
            for (j=0;j<this.flag.length;j++)
                t+="<span class='blason"+NOM_FACTION[this.flag[j]]+"'/>";
        }
        if (!withdate) return t;
        if (this.joueurs) t+=" [p"+this.joueurs.join(", p")+"]";
        return $("<span>"+t+"</span>");
    }/*
    info(persolist) {
        let i,s=[],s1="",s2="",ss,p="";
        for (i=0;i<persolist.length;i++) {
            let p=persolist[i];
            let es=this.start.getFullYear();
            if (p.dates[0]<=es&&p.dates[1]>=es) s.push(p);
            if (p.dates[2]<=es&&p.dates[3]>=es) s.push(p);
        }
        s.sort((a,b)=>(a.faction<b.faction));
        ss=s.filter((x)=>this.flag.includes(x.faction))
            .map((x)=>"<span class='blason"+NOM_FACTION[x.faction]+"'>"+x.text+"</span><br/>");
        for (i=0;i<=Math.floor(ss.length/2);i++) {
            s1+=ss[i];
            if (i+1+Math.floor(ss.length/2)<ss.length)
                s2+=ss[i+1+Math.floor(ss.length/2)];
        }
        p="<h5>"+this.text+"</h5>";
        if (this.desc) p+=this.desc+"<br/>";
        if (this.victoire) p+="<b class='text-muted blason"+NOM_FACTION[this.victoire]+"'>Victoire :</b><br/>";
        p+="<p class='text-muted'><b>Liste des personnages vivants cette année</b></p><div class='row'><div class='col-6'>"+s1
            +"</div>"
            +"<div class='col-6'>"+s2+"</div></div>";
        return p;        
    }*/
}

var evenements=Evenement.liste();

