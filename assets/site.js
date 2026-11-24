/* Maziar naar Shiraz: shared script. Header/footer, i18n, content data and page renderers. */
(function(){
const PAGES = [
 {id:"home",file:"index.html",t:"nav.home"},
 {id:"verhaal",file:"verhaal.html",t:"nav.story"},
 {id:"deloop",file:"detocht.html",t:"nav.run"},
 {id:"kalender",file:"kalender.html",t:"nav.calendar"},
 {id:"vlog",file:"vlog.html",t:"nav.vlog"},
 {id:"partners",file:"partners.html",t:"nav.partners"},
 {id:"steun",file:"steun.html",t:"nav.support"},
 {id:"shop",file:"shop.html",t:"nav.shop"},
 {id:"contact",file:"contact.html",t:"nav.contact"}
];

/* ===== i18n: NL and EN complete, FA core strings with EN fallback ===== */
const T = {
nl:{
 "cal.legend.country":"kleur per land, zodra de route bekend is",
 "home.cause.p":"Toen Maziar te horen kreeg dat hij het land moest verlaten, gaf een advocaat hem tijd, en vooral hoop. Wie naar België vlucht, staat vaak alleen tegenover procedures, papieren en lange onzekerheid. Juridische hulp en psychosociale steun maken dan een groot verschil.",
 "home.cause.p2":"Daarom zamelt Maziar met Eigen Koers geld in voor Casa Legal, een Brusselse vzw waar advocaten en maatschappelijk werkers samen mensen in een kwetsbare positie bijstaan. Hij wil ook de mensen achter de cijfers over migratie tonen: de verhalen van vluchtelingen en asielzoekers die hier hun leven opbouwen.",
 "home.cause.h":"Eén mens kan het verschil maken.",
 "home.cause":"Het goede doel",
 "home.quote.more":"Waarom ik loop",
 "nav.home":"Home","nav.story":"Verhaal","nav.run":"De tocht","nav.calendar":"Kalender","nav.vlog":"Vlog","nav.partners":"Partners","nav.support":"Steun","nav.shop":"Shop","nav.contact":"Contact","nav.menu":"Menu",
 "hero.eyebrow":"Eigen Koers · Leuven → Iran · vertrek 1 maart 2027","hero.arrow":"te voet naar",
 "hero.lede":"Ooit liep Maziar Toghraie weg uit Iran, omdat blijven geen optie meer was. Op 1 maart 2027 vertrekt hij opnieuw. Deze keer loopt hij van België naar Iran. Vier tot zes maanden onderweg, elke dag een marathon.",
 "hero.cta1":"Steun de tocht","hero.cta2":"Lees zijn verhaal",
 "stat.km":"kilometer","stat.day":"km per dag","stat.months":"maanden","ph.portrait":"Placeholder portret","ph":"placeholder beeld",
 "route.note":"indicatieve route, etappes volgen na vertrek",
 "home.next":"Eerstvolgende","home.teaser.story":"Het verhaal","home.teaser.story.p":"Weggelopen van huis, tien jaar wachten, negen jaar Life Bar. En nu terug, te voet.",
 "home.teaser.run":"De tocht","home.teaser.run.p":"Ruim 5.000 kilometer. Elke dag een marathon. Vier tot zes maanden.",
 "home.teaser.support":"Koop een kilometer","home.teaser.support.p":"Steun de tocht en het goede doel.","home.more":"Lees verder",
 "home.partners":"Zij lopen mee","home.vlog":"Laatste video",
 "story.crumb":"Verhaal","story.title":"Ik loop niet weg. Ik loop terug.","story.lede":"Het verhaal van Maziar Toghraie, in zijn eigen woorden.",
 "story.p1":"Maziar Toghraie is kok, ondernemer en langeafstandsloper uit Leuven. Hij werd geboren in Shiraz, in het zuiden van Iran. Ruim twintig jaar geleden vertrok hij. Niet omdat hij wilde, en niet voor het avontuur. Blijven was geen optie meer. Hij liet familie, vrienden en een jong bedrijf achter.",
 "story.p2":"In België dacht hij dat de zwaarste kilometers achter hem lagen. Er volgden tien jaar van procedures, papieren, wachten en opnieuw beginnen. Een marathon zonder finishlijn, noemt hij het zelf. Een advocaat gaf hem geen wonderen, maar tijd, en vooral hoop. Daar houdt hij een overtuiging aan over: een mens kan het verschil maken voor een ander, vaak met iets heel klein.",
 "story.p3":"Toen hij mocht blijven, begon hij te bouwen. In 2017 opende hij Life Bar in de Parijsstraat in Leuven, volledig plantaardig, negen jaar lang een plek waar mensen elkaar tegenkwamen. Op 26 juli 2026 sloot hij zelf de deur. Nu kookt hij voor kleine groepen onder de naam AfterLife, en traint hij voor de loop van zijn leven.",
 "story.quote":"Ik ben niet boos op wat me overkomen is. Integendeel. De pijn heeft me gevormd.","story.cite":"Maziar",
 "story.timeline":"Tijdslijn","story.food":"Eten als brandstof",
 "story.food.p":"Eten moet kracht geven, zegt hij. Niet alleen om te overleven, maar om op te staan. Hij kookt met de kruiden waarmee hij opgroeide. In Life Bar deed hij Perzische dineravonden, Diner aan een Perzische tafel. Met AfterLife kookt hij nu voor groepen tot twintig mensen: verse, lokale ingrediënten, groenten in de hoofdrol, Perzische specerijen.",
 "story.mom":"Zijn moeder zei dat hij altijd het moeilijke pad koos: je draait de lepel rond je hoofd voor je hem in je mond steekt.",
 "run.crumb":"De tocht","run.eyebrow":"Eigen Koers · De tocht","run.title":"Elke dag een marathon, naar waar zijn verhaal begon","run.lede":"Niet om iets te bewijzen, zegt hij, maar om zijn afkomst eer aan te doen. Zijn toekomst ligt in België. Iran heeft hem gemaakt tot wie hij is.",
 "run.route":"De route","run.faq.h":"Vragen over de tocht","run.stories.title":"De verhalen onderweg",
 "run.stories.p":"Verhalen van mensen die hun thuis verloren. Mensen die moesten vertrekken. Mensen die nog altijd onderweg zijn. Ik wil een ander gezicht tonen van vluchtelingen en migranten. Niet de cijfers. Niet de dossiers. Maar de mensen. Want niemand verlaat zomaar zijn thuis.",
 "run.prep.title":"De voorbereiding",
 "run.prep.p":"Februari 2026: Marathon des Sables Atlantic Coast, Marokko. 120 km door het zand in drie dagen, zelfvoorzienend met 9 kg op de rug, tiende bij de mannen. Mei 2026: GTLC, 88 km en 3.250 hoogtemeters. September 2026: testblok van 145 km in drie dagen.",
 "run.faq":"Praktisch",
 "faq.q1":"Waar slaapt hij?","faq.a1":"In een camper.",
 "faq.q2":"Wat eet hij?","faq.a2":"“Fueled by nature”: zo weinig mogelijk bewerkte voeding.",
 "faq.q3":"Wie volgt hem?","faq.a3":"Zijn vrouw Jolien reist mee in de camper. Onderweg nodigt Maziar lopers uit om een stuk van de route mee te lopen.",
 "faq.q4":"Hoe eindigt het?","faq.a4":"Dat ligt niet vast. Het kan in Iran zijn, of aan de grens. De veiligheid van Maziar en zijn familie gaat boven het verhaal.",
 "cal.crumb":"Kalender","cal.title":"Wanneer","cal.lede":"Wat vastligt en wat nog volgt. Zodra de route bekend is, krijgt elk land hier een eigen kleur.",
 "cal.upcoming":"Binnenkort","cal.tbd":"datum volgt","cal.legend.event":"evenement","cal.legend.today":"vandaag",
 "cal.prev":"Vorige maand","cal.next":"Volgende maand",
 "vlog.crumb":"Vlog","vlog.title":"Volg de tocht","vlog.lede":"Elke etappe een korte video. Abonneer op het kanaal en mis geen kilometer.","vlog.watch":"Bekijk op YouTube","vlog.featured":"Uitgelicht","vlog.all":"Alle video's","vlog.sub":"Abonneer op YouTube",
 "partners.crumb":"Partners","partners.title":"Wie loopt mee","partners.lede":"Schoenen, kledij, voeding, verzekering, kilometers. Elke partner krijgt hier een plek, en een plek in de vlog van onderweg.",
 "partners.cta":"Word partner","partners.slot":"Jouw logo hier","partners.how":"Hoe je kunt meelopen",
 "ptier.1":"Hoofdpartner","ptier.1.p":"Eén partner die de hele tocht draagt. Naam op alle communicatie, eigen verhaal in de vlog.",
 "ptier.2":"Etappepartner","ptier.2.p":"Een week van de tocht op jouw naam. Vermelding in de kalender en in de video's van die etappe.",
 "ptier.3":"In natura","ptier.3.p":"Schoenen, kledij, voeding, verzekering. Alles wat de tocht lichter maakt.",
 "fund.crumb":"Steun","fund.title":"Koop een kilometer","fund.lede":"Elke kilometer van Eigen Koers is € 12 waard. Daarvan gaat € 10 naar Casa Legal en € 2 naar de tocht.",
 "fund.goal":"doel € 60.000","fund.note":"De betaalpagina volgt binnenkort.","fund.btn":"Steun","fund.split":"Waar je bijdrage naartoe gaat","fund.split.a":"naar de tocht","fund.split.b":"naar Casa Legal","fund.split.note":"5.000 kilometer × € 12 = € 60.000",
 "fund.faq":"Vragen",
 "ffaq.q1":"Wat gebeurt er als de tocht stopt?","ffaq.a1":"Dan gaat het deel voor Casa Legal er alsnog naartoe, en verantwoorden we het restant van het tochtbudget op deze pagina.",
 "ffaq.q2":"Krijg ik een fiscaal attest?","ffaq.a2":"Dat klaren we uit met Casa Legal voor het vertrek.",
 "ffaq.q3":"Kan ik als bedrijf steunen?","ffaq.a3":"Ja. Kijk bij Partners, of neem contact op.",
 "shop.crumb":"Shop","shop.title":"Neem iets mee","shop.lede":"Elke aankoop steunt de tocht. Het assortiment en de prijzen zijn voorlopig.","shop.btn":"In winkelmand","shop.soon":"binnenkort","shop.ship":"Verzending in België en Nederland. Afhalen in Leuven kan ook.",
 "contact.crumb":"Contact","contact.title":"Loop mee","contact.lede":"Pers, partners, en lopers die een stuk van de route willen meelopen.",
 "form.name":"Naam","form.email":"E-mail","form.why":"Waarvoor","form.msg":"Bericht","form.send":"Verstuur","form.ok":"Bedankt. Je bericht is klaar om te verzenden zodra het formulier gekoppeld is.",
 "form.o1":"Pers","form.o2":"Partner","form.o3":"Een stuk meelopen","form.o4":"Iets anders",
 "contact.press":"Perskit","contact.press.p":"Foto's, bio en de feiten op een rij. Binnenkort beschikbaar.",
 "foot.p":"Met Eigen Koers loopt Maziar Toghraie in 2027 van Leuven naar Iran. Elke dag een marathon, vier tot zes maanden lang.","foot.copy":"kopieer","foot.copied":"gekopieerd","foot.follow":"Volg","foot.pages":"Foto's",
"home.intro":"Als wij onze koffer pakken, gaan we op reis. Maziar pakte zijn koffer en er was geen weg terug. Drieëntwintig jaar later keert hij terug naar Iran. Te voet, en deze keer op zijn eigen voorwaarden.",
 "home.read":"Lees het verhaal","home.run":"Over de tocht","home.support":"Steun een kilometer","home.stories":"Verhalen onderweg","home.stories.p":"Onderweg zoekt Maziar mensen op die hun thuis verloren. Niet de cijfers, de mensen.",
 "home.when":"Wanneer","home.all":"Alle data","home.allvideos":"Alle video's","home.partner":"Loop mee als partner",
 "news.title":"Loop mee in je mailbox","news.p":"Af en toe een mail van onderweg. Meer niet.","news.btn":"Inschrijven","news.ok":"Dank. Je staat op de lijst zodra de nieuwsbrief gekoppeld is.","news.ph":"je@mail.be",
 "story.read.run":"Over de tocht","run.read.support":"Steun de tocht","cal.read.contact":"Heb je een bed onderweg?","fund.choose":"Kies","fund.soon":"binnenkort","shop.soon.long":"Binnenkort beschikbaar","vlog.more":"Alle video's op YouTube","partners.contact":"Neem contact op",
 "story.title.a":"Ooit moest hij vluchten.","story.title.b":"Nu loopt hij terug.","run.route.h":"Meer dan 5.000 kilometer, elf landen",
"hero.sub":"Elke dag een marathon, van België naar Iran",
 "home.about":"Over Maziar","home.about.h":"Achter de loper zit een bijzonder verhaal.",
 "home.about.p":"Kok, ondernemer en ultraloper uit Leuven. Geboren in het zuiden van Iran. Tien jaar wachten op papieren, negen jaar Life Bar. Op 1 maart 2027 vertrekt hij al lopend richting Iran.","home.when.h":"Tussen nu en vertrek",
 "home.life":"Het leven van Maziar","home.life.h":"Koken, lopen, leven. Op zijn eigen ritme.",
 "home.quote":"Niet omdat ik iets wil bewijzen. Maar omdat ik iets wil begrijpen.","home.quote.cite":"Maziar, over de tocht naar Iran",
 "f1.big":"Ooit liep ik weg uit Iran.","f1.p1":"Niet omdat ik dat wilde. Niet omdat ik avontuur zocht. Ik liep weg omdat blijven geen optie meer was.","f1.p2":"Ik liet alles achter. Mijn familie. Mijn vrienden. Mijn thuis. Zelfs het bedrijf dat ik samen met een vriend had opgebouwd. Een leven waar niets mis mee leek. Maar soms kiest het leven voor jou.",
 "f2.big":"De volgende tien jaar werden een marathon zonder finishlijn.","f2.p1":"Elke dag opnieuw een gevecht om te mogen blijven. Opnieuw beginnen. Papieren. Procedures. Wachten. Hopen. Teleurstelling. Overleven.","f2.p2":"Ik herinner me dagen waarop ik vooral blij was dat het avond werd. Niet omdat de dag goed was geweest, maar omdat hij voorbij was. Morgen zou ik opnieuw proberen.",
 "f3.big":"Hoop. Dat is misschien het enige wat ik nooit ben kwijtgeraakt.","f3.p1":"Toen ik hoorde dat ik het land moest verlaten, kwam er een advocaat op mijn pad. Eén persoon. Hij gaf me geen wonderen. Hij gaf me tijd. Maar vooral gaf hij me hoop.","f3.p2":"Tot vandaag geloof ik dat één mens het verschil kan maken in het leven van een ander. Soms met iets groots. Vaak met iets heel kleins.",
 "f4.big":"Na tien jaar voelde ik voor het eerst vaste grond onder mijn voeten.","f4.p1":"Ik kreeg te horen dat ik mocht blijven. Eindelijk had ik ruimte om een leven uit te bouwen in plaats van enkel te overleven. Ik volgde een opleiding tot kok, begon als werknemer in een vegan restaurant, werd daar zaakvoerder en startte uiteindelijk mijn eigen plantaardige ontbijt- en lunchbar, Life Bar.","f4.p2":"Mijn moeder zei vroeger al dat ik altijd de moeilijke weg koos. “Jij draait de lepel eerst rond je hoofd voor je hem in je mond steekt.” Misschien had ze gelijk. Maar ik hield vol. Wat begon als een kleine ontbijtbar groeide uit tot een plek vol leven.",
 "f5.big":"Ik loop omdat lopen mij iets geeft wat ik lange tijd niet had: controle over mijn eigen richting.","f5.p1":"Niet om sneller te worden. Niet om records te breken. Maar om mijn eigen kracht te voelen. Stap voor stap. Ademhaling na ademhaling. Kilometer na kilometer.","f5.p2":"Wanneer het leven goed is, trek ik mijn loopschoenen aan en geniet ik met volle teugen. Wanneer het leven moeilijk wordt, trek ik ook mijn loopschoenen aan. Niet weg van het verdriet, maar erdoorheen.",
 "f6.big":"Soms is loslaten geen einde. Soms is het een begin.","f6.p1":"Na negen jaar ondernemen met veel passie en toewijding sloot ik Life Bar af. Als je ooit je land, je familie, je vrienden en je toekomst hebt moeten achterlaten, dan leer je dat loslaten soms nodig is om ruimte te maken voor iets nieuws.","f6.p2":"Op 1 maart 2027 vertrek ik. Niet om weg te lopen. Dat heb ik al eens gedaan. Deze keer loop ik terug, naar de plek waar mijn verhaal begon.",
 "story.cl.label":"Eigen Koers","story.cl.big":"Nu wil hij die hoop doorgeven.","story.cl.p1":"Op 1 maart 2027 vertrekt Maziar voor Eigen Koers: meer dan 5.000 kilometer te voet, van Leuven naar de grens met Iran. Onderweg zamelt hij geld in voor Casa Legal, een Brusselse vzw waar advocaten, maatschappelijk werkers en psychologen samen mensen in een kwetsbare situatie bijstaan.","story.cl.p2":"Het is exact de hulp die hij zelf gemist heeft toen hij 13 jaar geleden in een precaire situatie zat. Alles op één plek, zonder van loket naar loket te moeten.",
 "run.sub":"Van België naar de stad waar ik geboren werd",
 "run.why":"Waarom hij loopt","run.why.p":"Niet omdat ik iets wil bewijzen. Maar omdat ik iets wil begrijpen. Misschien omdat een deel van mij nog altijd onderweg is. Misschien omdat ik wil voelen hoe het is om terug te keren naar de plek waar mijn verhaal begon.",
 "run.gallery":"Onderweg naar het vertrek",
 "partners.why":"Waarom bedrijven meelopen","partners.why.p":"Doorzettingsvermogen, ondernemerschap, een migratieverhaal, mentale veerkracht en maatschappelijke impact. Dat is wat deze tocht draagt, en wat een partner mee uitdraagt.",
 "fund.quote":"Ik geloof dat één persoon het verschil kan maken. Een advocaat veranderde mijn leven. Jouw bijdrage, hoe klein of groot ook, maakt een wezenlijk verschil voor mensen in een kwetsbare situatie.",
 "fund.cl.more":"Lees hier meer over Casa Legal",
 "fund.cl.r3.t":"voor wat iemand met zich meedraagt",
 "fund.cl.r3":"Psychologen",
 "fund.cl.r2.t":"voor alles wat rond een dossier speelt",
 "fund.cl.r2":"Maatschappelijk werkers",
 "fund.cl.r1.t":"met verschillende expertises",
 "fund.cl.r1":"Advocaten",
 "fund.cl.roof":"Onder één dak",
 "fund.cl.p3":"De holistische aanpak is zo vernieuwend dat ze wetenschappelijk onderzocht wordt. In het project Scala Legal (2025 tot 2028) bestuderen onderzoekers van de ULB en UCLouvain welke impact de werking van Casa Legal heeft, en hoe ze ook elders kan werken.",
 "fund.cl.p2":"Voor mensen in een kwetsbare situatie verlaagt dat de drempel enorm. Ze moeten niet van loket naar loket, en hun verhaal niet telkens opnieuw doen. Op één plek krijgen ze juridische hulp, en de steun die ze nodig hebben om hun leven op te bouwen. Het is exact de soort hulp die Maz gemist heeft toen hij 13 jaar geleden in een precaire situatie zat.",
 "fund.cl.p1":"Casa Legal is een innoverende vzw met een holistische aanpak. Het is een one-stop shop voor juridische hulp op verschillende domeinen en psychosociale ondersteuning.",
 "fund.cl.h":"Casa Legal: alle hulp onder één dak",
 "fund.cl":"Het goede doel",
 "fund.give.btn":"Steun met {a}",
 "fund.give.split":"{a} naar Casa Legal · {b} naar de tocht",
 "fund.kms":"{n} kilometer",
 "fund.km1":"1 kilometer",
 "fund.range":"Kies je bedrag",
 "fund.your":"Jouw bijdrage",
 "fund.km.done":"{n} van de {t} kilometer gesteund",
 "fund.raised":"ingezameld",
 "fund.meter.h":"Elke kilometer telt.",
 "fund.meter":"Samen naar € 60.000",
 "fund.split.b.t":"€ 50.000 in totaal",
 "fund.split.a.t":"€ 10.000 in totaal, voor een deel van de kosten onderweg",
 "fund.split.h":"€ 12 per kilometer",
 "credits":"Foto's: Elke Smit Photography, Marathon des Sables, Sergio Pro Foto, Kai P., JA Films, en Maziar zelf",
 "foot.note":"Deze site is een voorstel met placeholders. Het verhaal van Maziar is gebaseerd op wat hij zelf publiek deelde."
},
en:{
 "cal.legend.country":"one colour per country, once the route is known",
 "home.cause.p":"When Maziar was told he had to leave the country, a lawyer gave him time, and above all hope. People who flee to Belgium often face procedures, paperwork and long uncertainty on their own. Legal and psychosocial support can make all the difference.",
 "home.cause.p2":"That is why Maziar is using Eigen Koers to raise money for Casa Legal, a Brussels non-profit where lawyers and social workers work side by side to support people in vulnerable situations. He also wants to show the people behind the migration figures: the stories of refugees and asylum seekers building their lives here.",
 "home.cause.h":"One person can make all the difference.",
 "home.cause":"The cause",
 "home.quote.more":"Why I run",
 "nav.home":"Home","nav.story":"Story","nav.run":"The journey","nav.calendar":"Calendar","nav.vlog":"Vlog","nav.partners":"Partners","nav.support":"Support","nav.shop":"Shop","nav.contact":"Contact","nav.menu":"Menu",
 "hero.eyebrow":"Eigen Koers · Leuven → Iran · departure 1 March 2027","hero.arrow":"on foot to",
 "hero.lede":"Once, Maziar Toghraie fled Iran because staying was no longer an option. On 1 March 2027 he sets off again. This time he runs from Belgium to Iran. Four to six months on the road, a marathon every day.",
 "hero.cta1":"Support the run","hero.cta2":"Read his story",
 "stat.km":"kilometres","stat.day":"km per day","stat.months":"months","ph.portrait":"Placeholder portrait","ph":"placeholder image",
 "route.note":"indicative route, stages follow after departure",
 "home.next":"Coming up","home.teaser.story":"The story","home.teaser.story.p":"Ran away from home, ten years of waiting, nine years of Life Bar. Now back, on foot.",
 "home.teaser.run":"The journey","home.teaser.run.p":"Over 5,000 kilometres. A marathon every day. Four to six months.",
 "home.teaser.support":"Buy a kilometre","home.teaser.support.p":"Support the run and the cause behind it.","home.more":"Read more",
 "home.partners":"Running with him","home.vlog":"Latest video",
 "story.crumb":"Story","story.title":"I am not running away. I am running back.","story.lede":"The story of Maziar Toghraie, in his own words.",
 "story.p1":"Maziar Toghraie is a cook, entrepreneur and long-distance runner from Leuven, Belgium. He was born in Shiraz, in southern Iran. More than twenty years ago he left. Not because he wanted to, and not for adventure. Staying was no longer an option. He left behind family, friends and a young business.",
 "story.p2":"In Belgium he thought the hardest kilometres were behind him. Ten years of procedures, paperwork, waiting and starting over followed. A marathon without a finish line, he calls it. A lawyer gave him no miracles, but time, and above all hope. One conviction stayed with him: one person can make the difference for another, often with something very small.",
 "story.p3":"Once he was allowed to stay, he started building. In 2017 he opened Life Bar on Parijsstraat in Leuven, fully plant-based, for nine years a place where people met. On 26 July 2026 he closed the door himself. Today he cooks for small groups as AfterLife, and trains for the run of his life.",
 "story.quote":"I'm not angry about what happened to me. On the contrary. The pain has shaped me.","story.cite":"Maziar",
 "story.timeline":"Timeline","story.food":"Food as fuel",
 "story.food.p":"Food has to give strength, he says. Not just to survive, but to get up. He cooks with the spices he grew up with. At Life Bar he hosted Persian dinner nights. With AfterLife he now cooks for groups of up to twenty: fresh local ingredients, vegetables in the lead, Persian spices.",
 "story.mom":"His mother said he always chose the hard path: you spin the spoon around your head before you put it in your mouth.",
 "run.crumb":"The journey","run.eyebrow":"Eigen Koers · The journey","run.title":"A marathon every day, back to where his story began","run.lede":"Not to prove anything, he says, but to honour where he comes from. His future is in Belgium. Iran made him who he is.",
 "run.route":"The route","run.faq.h":"Questions about the journey","run.stories.title":"The stories along the way",
 "run.stories.p":"Stories of people who lost their home. People who had to leave. People who are still on their way. I want to show another side of refugees and migrants. Not the numbers. Not the case files. The people. Because nobody leaves home for no reason.",
 "run.prep.title":"The preparation",
 "run.prep.p":"February 2026: Marathon des Sables Atlantic Coast, Morocco. 120 km through sand in three days, self-supported with 9 kg on his back, tenth among the men. May 2026: GTLC, 88 km with 3,250 m of climbing. September 2026: a 145 km test block in three days.",
 "run.faq":"Practical",
 "faq.q1":"Where does he sleep?","faq.a1":"In a camper van.",
 "faq.q2":"What does he eat?","faq.a2":"“Fueled by nature”: as little processed food as possible.",
 "faq.q3":"Who follows him?","faq.a3":"His wife Jolien travels with him in the camper van. Along the way, Maziar invites runners to join him for part of the route.",
 "faq.q4":"How does it end?","faq.a4":"That isn't decided. It may be in Iran, or at the border. The safety of Maziar and his family comes before the story.",
 "cal.crumb":"Calendar","cal.title":"When","cal.lede":"What's set, and what's still to come. Once the route is known, each country gets its own colour here.",
 "cal.upcoming":"Coming up","cal.tbd":"date to be confirmed","cal.legend.event":"event","cal.legend.today":"today",
 "cal.prev":"Previous month","cal.next":"Next month",
 "vlog.crumb":"Vlog","vlog.title":"Follow the run","vlog.lede":"A short video for every stage. Subscribe to the channel and don't miss a kilometre.","vlog.watch":"Watch on YouTube","vlog.featured":"Featured","vlog.all":"All videos","vlog.sub":"Subscribe on YouTube",
 "partners.crumb":"Partners","partners.title":"Who's running with him","partners.lede":"Shoes, clothing, food, insurance, kilometres. Every partner gets a place here, and a place in the vlog from the road.",
 "partners.cta":"Become a partner","partners.slot":"Your logo here","partners.how":"How to join",
 "ptier.1":"Main partner","ptier.1.p":"One partner carrying the whole run. Your name on everything we publish, and your own story in the vlog.",
 "ptier.2":"Stage partner","ptier.2.p":"One week of the run in your name. Credited in the calendar and in that stage's videos.",
 "ptier.3":"In kind","ptier.3.p":"Shoes, clothing, food, insurance. Anything that makes the run lighter.",
 "fund.crumb":"Support","fund.title":"Buy a kilometre","fund.lede":"Every kilometre of Eigen Koers is worth €12. €10 of it goes to Casa Legal and €2 to the journey.",
 "fund.goal":"goal €60,000","fund.note":"The payment page is coming soon.","fund.btn":"Support","fund.split":"Where your contribution goes","fund.split.a":"to the journey","fund.split.b":"to Casa Legal","fund.split.note":"5,000 kilometres × €12 = €60,000",
 "fund.faq":"Questions",
 "ffaq.q1":"What if the run stops?","ffaq.a1":"Casa Legal's share still goes to them, and we account for the remainder of the journey budget on this page.",
 "ffaq.q2":"Do I get a tax certificate?","ffaq.a2":"We'll settle this with Casa Legal before departure.",
 "ffaq.q3":"Can my company contribute?","ffaq.a3":"Yes. See Partners, or get in touch.",
 "shop.crumb":"Shop","shop.title":"Take something with you","shop.lede":"Every purchase supports the run. Range and prices are provisional.","shop.btn":"Add to cart","shop.soon":"coming soon","shop.ship":"Shipping within Belgium and the Netherlands, or pick up in Leuven.",
 "contact.crumb":"Contact","contact.title":"Join the run","contact.lede":"Press, partners, and runners who'd like to join for part of the route.",
 "form.name":"Name","form.email":"Email","form.why":"Reason","form.msg":"Message","form.send":"Send","form.ok":"Thank you. Your message is ready to send once the form is connected.",
 "form.o1":"Press","form.o2":"Partner","form.o3":"Running part of the route","form.o4":"Something else",
 "contact.press":"Press kit","contact.press.p":"Photos, bio and the key facts in one place. Available soon.",
 "foot.p":"With Eigen Koers, Maziar Toghraie runs from Leuven to Iran in 2027. A marathon every day, for four to six months.","foot.copy":"copy","foot.copied":"copied","foot.follow":"Follow","foot.pages":"Photos",
"home.intro":"When we pack a suitcase, we go on a trip. Maziar packed his suitcase and there was no way back. Twenty-three years later he returns to Iran. On foot, and this time on his own terms.",
 "home.read":"Read the story","home.run":"About the journey","home.support":"Support a kilometre","home.stories":"Stories on the road","home.stories.p":"Along the way Maziar seeks out people who lost their home. Not the numbers, the people.",
 "home.when":"When","home.all":"All dates","home.allvideos":"All videos","home.partner":"Join as a partner",
 "news.title":"Follow along by email","news.p":"An email from the road now and then. Nothing more.","news.btn":"Subscribe","news.ok":"Thanks. You are on the list once the newsletter is connected.","news.ph":"you@mail.com",
 "story.read.run":"About the journey","run.read.support":"Support the run","cal.read.contact":"Do you have a bed on the route?","fund.choose":"Choose this amount","fund.soon":"soon","shop.soon.long":"Available soon","vlog.more":"All videos on YouTube","partners.contact":"Get in touch",
 "story.title.a":"Once he had to flee.","story.title.b":"Now he runs back.","run.route.h":"More than 5,000 kilometres, eleven countries",
"hero.sub":"A marathon every day, from Belgium to Iran",
 "home.about":"About Maziar","home.about.h":"Behind the runner lies a remarkable story.",
 "home.about.p":"Cook, entrepreneur and ultrarunner from Leuven. Born in southern Iran. Ten years waiting for his papers, nine years of Life Bar. On 1 March 2027 he sets off running towards Iran.","home.when.h":"Between now and departure",
 "home.life":"Maziar's life","home.life.h":"Cooking, running, living. At his own pace.",
 "home.quote":"Not because I want to prove something. But because I want to understand something.","home.quote.cite":"Maziar, about the journey to Iran",
 "f1.big":"Once, I fled Iran.","f1.p1":"Not because I wanted to. Not because I was looking for adventure. I left because staying was no longer an option.","f1.p2":"I left everything behind. My family. My friends. My home. Even the business I had built with a friend. A life that seemed to have nothing wrong with it. But sometimes life chooses for you.",
 "f2.big":"The next ten years became a marathon without a finish line.","f2.p1":"Every day, a new fight to be allowed to stay. Starting over. Papers. Procedures. Waiting. Hoping. Disappointment. Surviving.","f2.p2":"I remember days when I was mainly glad when evening came. Not because the day had been good, but because it was over. Tomorrow I would try again.",
 "f3.big":"Hope. Perhaps the only thing I never lost.","f3.p1":"When I heard I had to leave the country, a lawyer crossed my path. One person. He gave me no miracles. He gave me time. But above all, he gave me hope.","f3.p2":"To this day I believe one person can make all the difference in someone else's life. Sometimes with something big. Often with something very small.",
 "f4.big":"After ten years, for the first time, I felt solid ground under my feet.","f4.p1":"I was told I could stay. At last I had room to build a life instead of just surviving. I trained as a cook, started out as an employee at a vegan restaurant, became its manager, and finally opened my own plant-based breakfast and lunch bar, Life Bar.","f4.p2":"My mother used to say I always chose the hard way. “You spin the spoon around your head before you put it in your mouth.” Maybe she was right. But I kept going. What began as a small breakfast bar grew into a place full of life.",
 "f5.big":"I run because running gives me something I did not have for a long time: control over my own direction.","f5.p1":"Not to get faster. Not to break records. But to feel my own strength. Step by step. Breath by breath. Kilometre by kilometre.","f5.p2":"When life is good, I put on my running shoes and enjoy every moment. When life gets hard, I put on my running shoes too. Not away from the grief, but through it.",
 "f6.big":"Sometimes letting go is not an end. Sometimes it is a beginning.","f6.p1":"After nine years of running a business with great passion and dedication, I closed Life Bar. If you have ever had to leave your country, your family, your friends and your future behind, you learn that letting go is sometimes needed to make room for something new.","f6.p2":"On 1 March 2027 I set off. Not to run away. I have done that once. This time I run back, to the place where my story began.",
 "story.cl.label":"Eigen Koers","story.cl.big":"Now he wants to pass that hope on.","story.cl.p1":"On 1 March 2027 Maziar sets off on Eigen Koers: more than 5,000 kilometres on foot, from Leuven to the border with Iran. Along the way he is raising money for Casa Legal, a Brussels non-profit where lawyers, social workers and psychologists work together to support people in vulnerable situations.","story.cl.p2":"It is exactly the help he went without when he was in a precarious situation 13 years ago. Everything in one place, without being sent from one office to the next.",
 "run.sub":"From Belgium to the city where I was born",
 "run.why":"Why he runs","run.why.p":"Not because I want to prove something. But because I want to understand something. Perhaps because a part of me is still on the road. Perhaps because I want to feel what it is like to return to the place where my story began.",
 "run.gallery":"The road to departure",
 "partners.why":"Why companies join","partners.why.p":"Perseverance, entrepreneurship, a migration story, mental resilience and social impact. That is what carries this run, and what a partner carries with it.",
 "fund.quote":"I believe one person can make a difference. A lawyer changed my life. Your contribution, however small or large, makes a real difference for people in a vulnerable situation.",
 "fund.cl.more":"Read more about Casa Legal",
 "fund.cl.r3.t":"for what people carry with them",
 "fund.cl.r3":"Psychologists",
 "fund.cl.r2.t":"for everything surrounding a case",
 "fund.cl.r2":"Social workers",
 "fund.cl.r1.t":"with different areas of expertise",
 "fund.cl.r1":"Lawyers",
 "fund.cl.roof":"Under one roof",
 "fund.cl.p3":"This holistic approach is so innovative that it is the subject of scientific research. In the Scala Legal project (2025 to 2028), researchers from ULB and UCLouvain are studying the impact of Casa Legal's work, and how it could work elsewhere.",
 "fund.cl.p2":"For people in a vulnerable situation, that makes help far easier to reach. They don't have to go from office to office, or tell their story again each time. In one place they get legal help, and the support they need to build their lives. It is exactly the kind of help Maz missed when he was in a precarious situation 13 years ago.",
 "fund.cl.p1":"Casa Legal is an innovative non-profit with a holistic approach. It is a one-stop shop for legal help across different areas of law and for psychosocial support.",
 "fund.cl.h":"Casa Legal: all the help under one roof",
 "fund.cl":"The cause",
 "fund.give.btn":"Give {a}",
 "fund.give.split":"{a} to Casa Legal · {b} to the journey",
 "fund.kms":"{n} kilometres",
 "fund.km1":"1 kilometre",
 "fund.range":"Choose your amount",
 "fund.your":"Your contribution",
 "fund.km.done":"{n} of {t} kilometres supported",
 "fund.raised":"raised",
 "fund.meter.h":"Every kilometre counts.",
 "fund.meter":"Together towards €60,000",
 "fund.split.b.t":"€50,000 in total",
 "fund.split.a.t":"€10,000 in total, towards part of the costs on the road",
 "fund.split.h":"€12 per kilometre",
 "credits":"Photos: Elke Smit Photography, Marathon des Sables, Sergio Pro Foto, Kai P., JA Films, and Maziar himself",
 "foot.note":"This site is a proposal with placeholders. Maziar's story is based on what he shared publicly himself."
},
fa:{
 "home.cause":"هدف خیریه",
 "home.quote.more":"چرا می‌دوم",
 "nav.home":"خانه","nav.story":"داستان","nav.run":"دویدن","nav.calendar":"تقویم","nav.vlog":"ولاگ","nav.partners":"همراهان","nav.support":"حمایت","nav.shop":"فروشگاه","nav.contact":"تماس","nav.menu":"منو",
 "hero.eyebrow":"لوون ← ایران · حرکت: ۱ مارس ۲۰۲۷","hero.arrow":"پیاده تا",
 "hero.lede":"روزی مازیار تغرایی ناچار شد از ایران برود، چون ماندن دیگر ممکن نبود. در ۱ مارس ۲۰۲۷ دوباره راه می‌افتد، این بار پیاده، از بلژیک تا ایران. چهار تا شش ماه در راه، هر روز یک ماراتن.",
 "hero.cta1":"از سفر حمایت کن","hero.cta2":"داستان او را بخوان",
 "stat.km":"کیلومتر","stat.day":"کیلومتر در روز","stat.months":"ماه",
 "home.next":"به‌زودی","home.teaser.story":"داستان","home.teaser.run":"دویدن","home.teaser.support":"یک کیلومتر بخر","home.more":"ادامه","home.partners":"همراهان","home.vlog":"آخرین ویدیو",
 "story.crumb":"داستان","story.title":"روزی ناچار شد بگریزد. حالا به خانه برمی‌گردد.",
 "story.quote":"«این بار با شرایط خودم می‌دوم.»","story.cite":"مازیار","story.timeline":"گاه‌شمار",
 "run.crumb":"دویدن","run.title":"هر روز یک ماراتن، تا جایی که داستانش آغاز شد","run.route":"مسیر",
 "cal.crumb":"تقویم","cal.title":"کی","cal.upcoming":"به‌زودی","cal.tbd":"تاریخ متعاقباً",
 "vlog.crumb":"ولاگ","vlog.title":"سفر را دنبال کن",
 "partners.crumb":"همراهان","partners.title":"همراهان","partners.cta":"همراه شوید","partners.slot":"لوگوی شما",
 "fund.crumb":"حمایت","fund.title":"یک کیلومتر بخر","fund.btn":"حمایت",
 "shop.crumb":"فروشگاه","shop.title":"چیزی با خود ببر","shop.btn":"افزودن به سبد","shop.soon":"به‌زودی",
 "contact.crumb":"تماس","contact.title":"همراه شو","form.send":"ارسال",
"home.read":"داستان را بخوان","home.run":"درباره دویدن","home.support":"یک کیلومتر حمایت کن","home.when":"کی","news.title":"در ایمیل همراه شو","news.btn":"عضویت","fund.choose":"انتخاب",
 "story.title.a":"روزی ناچار شد بگریزد.","story.title.b":"حالا به خانه برمی‌گردد.","run.route.h":"لوون ← ایران",
"hero.sub":"هر روز یک ماراتن، از بلژیک تا ایران","home.about":"درباره مازیار","home.life":"زندگی مازیار",
 "f1.big":"روزی از ایران گریختم.","f6.big":"این بار برمی‌گردم.",
 "foot.copy":"کپی","foot.copied":"کپی شد","foot.follow":"دنبال کنید","foot.pages":"عکس‌ها","ph":"تصویر موقت"
}};
const MONTHS = {
 nl:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
 en:["January","February","March","April","May","June","July","August","September","October","November","December"],
 fa:["ژانویه","فوریه","مارس","آوریل","مه","ژوئن","ژوئیه","اوت","سپتامبر","اکتبر","نوامبر","دسامبر"]};
const DOW = {nl:["ma","di","wo","do","vr","za","zo"],en:["mo","tu","we","th","fr","sa","su"],fa:["د","س","چ","پ","ج","ش","ی"]};

/* Farsi-versie tijdelijk verborgen. Zet op true om de FA-knop terug te tonen; de Farsi-teksten blijven bewaard. */
const SHOW_FA = false;
const LANGS = SHOW_FA ? ["nl","en","fa"] : ["nl","en"];
let lang = "nl";
try{ const s = localStorage.getItem("maz-lang"); if(T[s] && LANGS.includes(s)) lang = s; }catch(e){}
const t = k => (T[lang] && T[lang][k]) || T.en[k] || T.nl[k] || k;
const L = o => (o && (o[lang] || o.en || o.nl)) || "";

/* ===== content data (a CMS will replace these) ===== */
const TIMELINE = [
 {y:"± 2003",title:{nl:"Weg uit Iran",en:"Leaving Iran"},txt:{nl:"Hij laat familie, vrienden en een bedrijf in auto-onderdelen achter. Aankomst in België, zonder zekerheid.",en:"He leaves family, friends and a car-parts business behind. Arrival in Belgium, with no certainty."}},
 {y:"2003–2013",title:{nl:"Jarenlang wachten",en:"Years of waiting"},txt:{nl:"Procedures, papieren, opnieuw beginnen. Een marathon zonder finishlijn.",en:"Procedures, paperwork, starting over. A marathon without a finish line."}},
 {y:"± 2013",title:{nl:"Verblijfsvergunning",en:"Residence permit"},txt:{nl:"Eindelijk vaste grond onder zijn voeten.",en:"At last, solid ground under his feet."}},
 {y:"2013–2017",title:{nl:"Kok",en:"Cook"},txt:{nl:"Opleiding tot kok, daarna werknemer en zaakvoerder in een vegan restaurant.",en:"Trains as a cook, then works at a vegan restaurant and becomes its manager."}},
 {y:"2017",title:{nl:"Life Bar opent",en:"Life Bar opens"},txt:{nl:"Zijn visie komt tot leven in zijn eigen plantaardige ontbijt- en brunchbar. Negen jaar lang een ontmoetingsplek voor velen.",en:"His vision comes to life in his own plant-based breakfast and brunch bar. For nine years, a meeting place for many."}},
 {y:"2020",title:{nl:"Beginnen lopen",en:"Starting to run"},txt:{nl:"COVID geeft tijd en ruimte. Wandelen gaat over in lopen.",en:"COVID brings time and space. Walking turns into running."}},
 {y:"dec 2023",title:{nl:"Eerste marathon",en:"First marathon"},txt:{nl:"Na veel trainen en een overwonnen blessure loopt hij zijn eerste marathon, in Valencia.",en:"After a lot of training and overcoming an injury, he runs his first marathon, in Valencia."}},
 {y:"feb 2026",title:{nl:"Marathon des Sables",en:"Marathon des Sables"},txt:{nl:"Atlantic Coast, Marokko. 120 km in drie dagen, 12:44:06, tiende bij de mannen.",en:"Atlantic Coast, Morocco. 120 km in three days, 12:44:06, tenth among the men."}},
 {y:"26 jul 2026",title:{nl:"Life Bar sluit",en:"Life Bar closes"},txt:{nl:"The end of an era. Ruimte om de expeditie Eigen Koers vorm te geven.",en:"The end of an era. Room to shape the Eigen Koers expedition."}},
 {y:"31 okt 2026",title:{nl:"100 km",en:"100 km"},txt:{nl:"Een ultramarathon van 100 km in de Kempen. 12:03, tiende bij de mannen.",en:"A 100 km ultramarathon in the Kempen. 12:03, tenth among the men."}},
 {y:"1 mrt 2027",title:{nl:"Richting Iran",en:"Towards Iran"},txt:{nl:"Vertrek in Leuven, al lopend naar waar zijn leven begon.",en:"Departure from Leuven, running back to where his life began."}}
];
/* ===== Inhoud uit content/*.json (via /admin bewerkbaar), gebundeld in assets/content.js ===== */
const C = window.CONTENT || {deloop:{},kalender:{},vlog:{},partners:{},shop:{},route:null};
const RUNCARDS = [];
const PREP = (C.deloop.voorbereiding||[]).map(p=>({y:p.periode,title:p.titel,txt:p.tekst}));
const FAQ = C.deloop.faq||[];
/* enkel_maand:true = maand bekend, dag niet; staat in de lijst maar niet in het raster */
const EVENTS = (C.kalender.evenementen||[]).map(e=>({date:e.datum,tbd:!!e.enkel_maand,kind:e.soort,title:e.titel,sub:e.tekst}));
/* Etappes per land kleuren hun dagen in de kalender */
const STAGES = (C.kalender.etappes||[]).map(x=>({from:x.van,to:x.tot,country:x.land,color:x.kleur||"#123C74"}));
/* Enkel echte YouTube-id's (11 tekens) worden getoond; plaatshouders zoals VIDEO_ID_1 blijven verborgen */
const VLOG = (C.vlog.videos||[]).filter(v=>/^[A-Za-z0-9_-]{11}$/.test(v.youtube_id||"")).map(v=>({id:v.youtube_id,featured:!!v.uitgelicht,title:v.titel,sub:v.ondertitel}));
const PARTNERS = (C.partners.partners||[]).map(p=>({real:true,name:p.naam,role:p.rol,url:p.url,logo:p.logo}))
  .concat(Array.from({length:+(C.partners.lege_plekken||0)},()=>({slot:true})));
/* Steun. raised: het opgehaalde bedrag, met de hand bij te werken. payUrl: adres van de betaalpagina (leeg = nog niet klaar). */
const FUND = {raised:0, goal:60000, perKm:12, toCause:10, toRun:2, maxKm:500, payUrl:""};
const IMG = "assets/img/";
const LIFE = [
 {img:"kitchen-cut.jpg",title:{nl:"De kok",en:"The cook"},meta:{nl:"Gezonde voeding als basis",en:"Healthy food as the foundation"},credit:"Elke Smit"},
 {img:"trail-red.jpg",title:{nl:"De ultraloper",en:"The ultrarunner"},meta:{nl:"Drie jaar onafgebroken training",en:"Three years of training without a break"},credit:"Sergio Pro Foto"},
 {img:"portrait-laugh.jpg",title:{nl:"De ondernemer",en:"The entrepreneur"},meta:{nl:"Negen jaar Life Bar",en:"Nine years of Life Bar"},credit:"Elke Smit"}
];
const GALLERY = ["dune-wide.jpg","sand-kick.jpg","finish-prague.jpg","trail-forest.jpg","beach.jpg","road-run.jpg","winter-run.jpg","city-run.jpg","bib-mds.jpg"];
const PRODUCTS = (C.shop.producten||[]).map(p=>({name:p.naam,price:(p.prijs===""||p.prijs==null)?null:+p.prijs,img:p.foto}));

/* Teksten uit de inhoudsbestanden overschrijven de vaste teksten in T */
(function(){
  const put=(k,o)=>{ if(!o) return; ["nl","en","fa"].forEach(l=>{ if(o[l]) (T[l]=T[l]||{})[k]=o[l]; }); };
  const d=C.deloop; put("run.title",d.titel); put("run.sub",d.ondertitel); put("run.lede",d.intro); put("run.why",d.waarom_titel); put("run.why.p",d.waarom_tekst); put("route.note",d.route_opmerking);
  (d.cijfers||[]).forEach((c,i)=>put("stat."+i,c.label));
  put("cal.lede",C.kalender.intro); put("vlog.lede",C.vlog.intro); put("partners.lede",C.partners.intro); put("shop.lede",C.shop.intro); put("shop.ship",C.shop.verzending);
})();

/* ===== helpers ===== */
const $ = id => document.getElementById(id);
const el = h => { const d=document.createElement("div"); d.innerHTML=h.trim(); return d.firstElementChild; };
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const eur = n => new Intl.NumberFormat(lang==="nl"?"nl-BE":"en-IE",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
const page = document.body.dataset.page || "home";
const photo = (img, cls, alt, credit) => `<div class="photo ${cls||""}"><img src="${IMG}${img}" alt="${esc(alt||"")}" loading="lazy">${credit?`<span class="credit">© ${esc(credit)}</span>`:""}</div>`;

/* ===== header & footer ===== */
function renderChrome(){
  const links = PAGES.filter(p=>p.id!=="home" && p.id!=="steun" && (p.id!=="shop" || window.SHOP_OPEN!==false)).map(p => `<li><a href="${p.file}"${p.id===page?' aria-current="page"':''} data-t="${p.t}"></a></li>`).join("");
  $("hdr").innerHTML = `
    <div class="wrap">
      <div class="bar">
        <a class="brand" href="index.html"><b>Maziar Toghraie</b><small>Eigen Koers · Leuven → Iran</small></a>
        <div class="right">
          <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="menu" data-t="nav.menu"></button>
          <nav class="menu" id="menu" hidden><ul>${links}<li><a class="cta" href="steun.html" data-t="nav.support"></a></li></ul></nav>
          <div class="langs" role="group" aria-label="Language">${LANGS.map(l=>`<button data-lang="${l}">${l.toUpperCase()}</button>`).join("")}</div>
        </div>
      </div>
    </div>`;
  $("ftr").innerHTML = `
    <div class="wrap cols">
      <div><div class="ft">Maziar Toghraie</div><p style="margin-top:.7rem;max-width:30em" data-t="foot.p"></p>
        <p class="copy" style="margin-top:.9rem"><span id="mail">team@mazruns.be</span><button id="copyMail" data-t="foot.copy"></button></p></div>
      <div><div class="ft" data-t="foot.pages"></div><ul>
        <li>Elke Smit Photography</li><li>Marathon des Sables</li><li>Sergio Pro Foto</li><li>Kai P.</li><li>JA Films</li></ul></div>
      <div><div class="ft" data-t="foot.follow"></div><ul>
        <li><a href="https://www.instagram.com/maz.runs/">Instagram @maz.runs</a></li>
        <li><a href="https://www.instagram.com/lifebar_be/">Instagram @lifebar_be</a></li></ul></div>
    </div>
    <div class="wrap bottom"><span>© 2026 Maziar Toghraie</span><span>Leuven · 50°53′ N 4°42′ O</span></div>`;
  document.querySelectorAll(".langs button").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang; try{ localStorage.setItem("maz-lang", lang); }catch(e){} renderAll();
  }));
  const menu = $("menu"), menuBtn = $("menuBtn");
  const mq = window.matchMedia("(min-width:900px)");
  const syncMenu = () => { if(mq.matches){ menu.hidden=false; } else { menu.hidden=true; menuBtn.setAttribute("aria-expanded","false"); } };
  menuBtn.addEventListener("click", () => { menu.hidden = !menu.hidden; menuBtn.setAttribute("aria-expanded", String(!menu.hidden)); });
  mq.addEventListener("change", syncMenu); syncMenu();
  $("copyMail").addEventListener("click", function(){
    const node=$("mail"), b=this;
    const done = () => { b.textContent = t("foot.copied"); setTimeout(()=>b.textContent=t("foot.copy"),1500); };
    const sel = () => { const r=document.createRange(); r.selectNodeContents(node); const s=getSelection(); s.removeAllRanges(); s.addRange(r); };
    try{ navigator.clipboard.writeText(node.textContent).then(done).catch(sel); }catch(e){ sel(); }
  });
}

/* ===== renderers ===== */
function renderStatic(){
  document.documentElement.lang = lang;
  document.documentElement.dir = lang==="fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-t]").forEach(n => n.textContent = t(n.dataset.t));
  document.querySelectorAll("[data-t-aria]").forEach(n => n.setAttribute("aria-label", t(n.dataset.tAria)));
  document.querySelectorAll("[data-t-ph]").forEach(n => n.setAttribute("placeholder", t(n.dataset.tPh)));
  document.querySelectorAll(".langs button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang===lang)));
}
function renderTimeline(){
  const ol = $("timeline"); if(!ol) return; ol.innerHTML="";
  TIMELINE.forEach(e => ol.append(el(`<li><time>${esc(e.y)}</time><div><strong>${esc(L(e.title))}</strong><span>${esc(L(e.txt))}</span></div></li>`)));
}
function renderRoute(){
  const R = C.route; if(!R || !$("routeCountries")) return;
  document.querySelectorAll(".routemap [data-nl]").forEach(x => x.textContent = lang==="nl" ? x.dataset.nl : x.dataset.en);
  $("routeCountries").textContent = R.landen.map(x => lang==="nl" ? x.nl : x.en).join(" → ");
}
function renderRun(){
  renderRoute();
  const c = $("runCards"); if(!c) return; c.innerHTML="";
  RUNCARDS.forEach(r => c.append(el(`<div class="tile"><div class="num">${esc(r.num)}</div><h3>${esc(L(r.title))}</h3><p class="muted">${esc(L(r.txt))}</p></div>`)));
}
function renderFaq(){
  const c = $("faq"); if(!c) return; c.innerHTML="";
  FAQ.forEach(q => c.append(el(`<details><summary>${esc(L(q.vraag))}</summary><p>${esc(L(q.antwoord))}</p></details>`)));
}
function renderPrep(){
  const ol = $("prepList"); if(!ol) return; ol.innerHTML="";
  PREP.forEach(e => ol.append(el(`<li><time>${esc(L(e.y))}</time><div><strong>${esc(L(e.title))}</strong>${L(e.txt)?`<span>${esc(L(e.txt))}</span>`:""}</div></li>`)));
}
function renderLife(){
  const c = $("life");
  if(c){ c.innerHTML=""; LIFE.forEach(x => c.append(el(`<div class="tile">${photo(x.img,"",L(x.title),x.credit)}<h3>${esc(L(x.title))}</h3><span class="meta">${esc(L(x.meta))}</span></div>`))); }
  const g = $("gallery"); if(g){ g.innerHTML=""; GALLERY.forEach(im => g.append(el(`<div class="photo"><img src="${IMG}${im}" alt="" loading="lazy"></div>`))); }
}
let calCursor = (()=>{ const n=new Date(); return new Date(n.getFullYear(), n.getMonth(), 1); })();
function todayKey(){ const n=new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`; }
function upcoming(){ const k=todayKey(); return EVENTS.filter(e=>e.date>=k).sort((a,b)=>a.date.localeCompare(b.date)); }
function eventCard(e){
  const dt = new Date(e.date+"T12:00:00");
  const day = e.tbd ? "" : `${DOW[lang][(dt.getDay()+6)%7]} ${dt.getDate()} `;
  const mon = MONTHS[lang][dt.getMonth()].slice(0,3);
  const kind = e.kind ? L(e.kind) : (e.tbd ? t("cal.tbd") : "");
  return el(`<div class="card"><span class="pill${e.tbd?"":" accent"}">${esc(kind)}</span><div class="when">${esc(day)}${esc(mon)} ${dt.getFullYear()}</div><div class="t">${esc(L(e.title))}</div><div class="s">${esc(L(e.sub))}</div></div>`);
}
function renderCalendar(){
  const grid = $("cal"); if(!grid) return;
  const y=calCursor.getFullYear(), m=calCursor.getMonth();
  $("calMonth").textContent = `${MONTHS[lang][m]} ${y}`;
  grid.innerHTML="";
  DOW[lang].forEach(d => grid.append(el(`<div class="dow">${d}</div>`)));
  const offset = (new Date(y,m,1).getDay()+6)%7, days = new Date(y,m+1,0).getDate(), tKey = todayKey();
  for(let i=0;i<offset;i++) grid.append(el(`<div class="day out" aria-hidden="true"></div>`));
  for(let d=1; d<=days; d++){
    const key = `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const ev = EVENTS.find(e=>e.date===key && !e.tbd);
    const st = STAGES.find(x=>key>=x.from && key<=x.to);
    const tip = [ev?L(ev.title):"", st?L(st.country):""].filter(Boolean).join(" · ");
    grid.append(el(`<div class="day${ev?" has":""}${st?" stage":""}${key===tKey?" today":""}" role="gridcell"${st?` style="--stage:${esc(st.color)}"`:""}${tip?` title="${esc(tip)}"`:""}>${d}</div>`));
  }
  const lg = $("calCountries");
  if(lg){ lg.innerHTML=""; const seen={};
    STAGES.forEach(x=>{ const n=L(x.country); if(seen[n]) return; seen[n]=1; lg.append(el(`<span><i style="background:${esc(x.color)}"></i>${esc(n)}</span>`)); });
    if(!STAGES.length) lg.append(el(`<span><i style="background:repeating-linear-gradient(45deg,var(--wine) 0 3px,var(--blue) 3px 6px)"></i>${esc(t("cal.legend.country"))}</span>`)); }
  const list = $("eventList"); list.innerHTML=""; upcoming().forEach(e => list.append(eventCard(e)));
}
function renderNextEvent(){
  const box = $("nextEvent"); if(!box) return; box.innerHTML="";
  upcoming().slice(0,4).forEach(e => box.append(eventCard(e)));
}
function videoCard(v, big, img){
  /* Live site: this <a class="video"> becomes <iframe src="https://www.youtube-nocookie.com/embed/ID"> */
  return `<a class="video${big?" big":""}" href="https://www.youtube.com/watch?v=${esc(v.id)}" data-yt="${esc(v.id)}" aria-label="${esc(L(v.title))}">${photo(img,"l169",L(v.title))}<span class="play">▶</span></a>`;
}
const VIMG = ["dune-ridge.jpg","road-run.jpg","kitchen-bw.jpg","field-sun.jpg"];
function renderVlog(){
  document.querySelectorAll("[data-vlog-videos]").forEach(x => x.hidden = !VLOG.length);
  if(!VLOG.length) return;
  const f = $("vlogFeatured");
  if(f){ const v = VLOG.find(x=>x.featured) || VLOG[0]; f.innerHTML = `${videoCard(v,true,VIMG[0])}<div class="stack" style="margin-top:1.2rem;gap:.3rem"><h3>${esc(L(v.title))}</h3><p class="muted">${esc(L(v.sub))}</p></div>`; }
  const c = $("vlogCards"); if(c){ c.innerHTML="";
    VLOG.forEach((v,i) => c.append(el(`<div class="tile wide">${videoCard(v,false,VIMG[i%VIMG.length])}<h3>${esc(L(v.title))}</h3><span class="meta">${esc(L(v.sub))}</span></div>`))); }
  const h = $("homeVideo"); if(h){ const v = VLOG.find(x=>x.featured) || VLOG[0]; h.innerHTML = `${videoCard(v,true,VIMG[0])}<h3 style="margin-top:1rem">${esc(L(v.title))}</h3>`; }
}
function renderPartners(){
  const c = $("logos"); if(!c) return; c.innerHTML="";
  const list = c.dataset.limit ? PARTNERS.slice(0, +c.dataset.limit) : PARTNERS;
  list.forEach(p => c.append(p.slot
    ? el(`<div class="logo"><span>${esc(t("partners.slot"))}</span></div>`)
    : el(`<a class="logo real" href="${esc(p.url||"#")}">${p.logo?`<img src="${esc(p.logo)}" alt="${esc(p.name)}" loading="lazy">`:""}<div><strong>${esc(p.name)}</strong><br><span>${esc(L(p.role))}</span></div></a>`)));
}
function renderFund(){
  const bar = $("meterBar"); if(!bar) return;
  /* ?demo in het adres toont een voorbeeldbedrag, enkel om het ontwerp te bekijken */
  const raised = /[?&]demo\b/.test(location.search) ? 18400 : FUND.raised;
  const nf = n => new Intl.NumberFormat(lang==="nl"?"nl-BE":"en-IE").format(n);
  const pct = Math.min(100, raised/FUND.goal*100);
  requestAnimationFrame(()=>{ bar.style.width = pct+"%"; });
  $("raised").textContent = eur(raised);
  $("goal").textContent = t("fund.goal");
  $("kmDone").textContent = t("fund.km.done").replace("{n}", nf(Math.floor(raised/FUND.perKm))).replace("{t}", nf(Math.round(FUND.goal/FUND.perKm)));
  const r = $("giveRange"); if(!r) return;
  const kmOf = v => Math.max(1, Math.round(1 + (FUND.maxKm-1)*Math.pow(v/100,2)));
  $("rangeMin").textContent = eur(FUND.perKm); $("rangeMax").textContent = eur(FUND.maxKm*FUND.perKm);
  const upd = () => {
    const v = +r.value, km = kmOf(v), amt = km*FUND.perKm;
    $("giveAmt").textContent = eur(amt);
    $("giveKm").textContent = km===1 ? t("fund.km1") : t("fund.kms").replace("{n}", nf(km));
    $("giveSplit").textContent = t("fund.give.split").replace("{a}", eur(km*FUND.toCause)).replace("{b}", eur(km*FUND.toRun));
    r.style.setProperty("--fill", v+"%");
    r.setAttribute("aria-valuetext", eur(amt));
    const add = Math.min(100-pct, amt/FUND.goal*100);
    const ad = $("meterAdd"); ad.style.left = pct+"%"; ad.style.width = `max(8px, ${add}%)`;
    const tag = $("meterTag"); tag.textContent = "+ "+eur(amt); tag.style.left = Math.min(94, Math.max(6, pct+add))+"%";
    const btn = $("giveBtn"); btn.textContent = t("fund.give.btn").replace("{a}", eur(amt));
    btn.href = FUND.payUrl ? `${FUND.payUrl}${FUND.payUrl.includes("?")?"&":"?"}bedrag=${amt}` : "#";
  };
  if(!r.dataset.wired){ r.dataset.wired = 1; r.addEventListener("input", upd);
    $("giveBtn").addEventListener("click", e => { if(!FUND.payUrl){ e.preventDefault(); $("payNote").classList.add("flash"); setTimeout(()=>$("payNote").classList.remove("flash"),900); } }); }
  upd();
}
function renderShop(){
  const c = $("products"); if(!c) return; c.innerHTML="";
  PRODUCTS.forEach((p,i) => c.append(el(`<div class="tile">${p.img?`<div class="photo square"><img src="${esc(p.img)}" alt="${esc(L(p.name))}" loading="lazy"></div>`:photo(PIMG[i%PIMG.length],"square",L(p.name))}<h3>${esc(L(p.name))}</h3><div class="price-tag">${p.price!=null?eur(p.price):esc(t("shop.soon"))}</div><span class="link muted">${esc(t("shop.soon.long"))}</span></div>`)));
}
function wireForms(){
  const f = $("contactForm");
  if(f) f.addEventListener("submit", e => { e.preventDefault(); $("formToast").hidden=false; $("formToast").textContent=t("form.ok"); f.reset(); });
  const n = $("newsForm");
  if(n) n.addEventListener("submit", e => { e.preventDefault(); $("newsToast").hidden=false; $("newsToast").textContent=t("news.ok"); n.reset(); });
}
function wireCalendar(){
  if(!$("calPrev")) return;
  $("calPrev").addEventListener("click", () => { calCursor = new Date(calCursor.getFullYear(), calCursor.getMonth()-1, 1); renderCalendar(); });
  $("calNext").addEventListener("click", () => { calCursor = new Date(calCursor.getFullYear(), calCursor.getMonth()+1, 1); renderCalendar(); });
}
function renderAll(){ renderTimeline(); renderPrep(); renderFaq(); renderRun(); renderLife(); renderCalendar(); renderNextEvent(); renderVlog(); renderPartners(); renderFund(); renderShop(); renderStatic(); }

renderChrome(); wireForms(); wireCalendar(); renderAll();

/* every page opens at the top; the viewer otherwise restores the previous page's scroll position */
try{ if("scrollRestoration" in history) history.scrollRestoration = "manual"; }catch(e){}
(function toTop(){
  const hash = location.hash && /^#[\w.~-]+$/.test(location.hash) ? location.hash : "";
  const target = hash ? document.querySelector(hash) : null;
  const go = () => { if(target) target.scrollIntoView({block:"start"}); else { window.scrollTo(0,0); document.documentElement.scrollTop=0; document.body.scrollTop=0; } };
  go(); requestAnimationFrame(go); window.addEventListener("load", go, {once:true}); setTimeout(go, 50);
  window.addEventListener("pageshow", e => { if(e.persisted) go(); });
})();
})();
