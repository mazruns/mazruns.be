# Instructies voor Claude: website mazruns.be

Lees dit volledig voor je iets aan deze site verandert. De afspraken hieronder komen van Maziar, Jolien en Hans en gelden voor elke wijziging.

## Waarover gaat het

Website van Maziar Toghraie. Hij vluchtte ooit uit Iran en loopt vanaf 1 maart 2027 (voorlopige datum) te voet van Leuven naar Iran, vier tot zes maanden, elke dag een marathon.

- Beheer: Jolien (dagelijkse opvolging) en Hans De Reydt (overzicht, keurt grotere wijzigingen goed). Maziar beheert zelf niets.
- Mailadres van het team: team@mazruns.be
- Instagram: @maz.runs

## Hoe de site in elkaar zit

| Bestand | Wat erin staat |
|---|---|
| `content/*.json` | De inhoud die Jolien via `/admin` beheert: De loop, Kalender, Vlog, Partners, Shop. Elke tekst heeft `nl`, `en` en `fa` |
| `admin/` | Het beheerscherm (Sveltia CMS): `config.yml` beschrijft de velden, `sveltia-cms.js` is de CMS zelf |
| `assets/content.js` | Gegenereerd door `build.py` uit `content/*.json`. Nooit rechtstreeks bewerken |
| `assets/site.js` | De vaste teksten in drie talen (woordenboek `T`: `nl`, `en`, `fa`), de rest van de inhoud (Verhaal, Steun, homepagina) en alle pagina-logica |
| `build.py` | De opbouw van elke pagina. Genereert de `.html`-bestanden |
| `assets/site.css` | Vormgeving, merkkleuren, lettertypes |
| `assets/img/` | Foto's (max 2400 px lange zijde) en het favicon |
| `*.html` | Gegenereerd door `build.py`. Nooit rechtstreeks bewerken |

### Inhoud aanpassen

**Via `/admin`** (Jolien): De loop, Kalender, Vlog, Partners en Shop. Opslaan = meteen online. De velden staan in `admin/config.yml`; wat daar niet in staat, kan Jolien niet aanpassen.

**In `content/*.json`** (Claude, zelfde inhoud als `/admin`):
- **Kalender** `kalender.json`: `evenementen` met `datum` (JJJJ-MM-DD), `soort`, `titel`, `tekst`. `enkel_maand: true` als enkel de maand vastligt; zo'n item komt in de lijst maar niet in het kalenderraster. `etappes` (`van`, `tot`, `land`, `kleur`) kleuren hun dagen in de kalender; één vaste kleur per land, afgeleid van de merkkleuren.
- **De tocht** `deloop.json` (pagina `detocht.html`; het oude adres /deloop stuurt door via `_redirects`): titel, intro, de drie cijfers (ook op de homepagina), "waarom hij loopt", de voorbereiding, de FAQ.
- **Route** `route.json` en `assets/route.svg`: gemaakt met `tools/routekaart.py` uit de GPX-route van Komoot (meer dan 5.000 km, elf landen; de exacte afstand staat bewust niet op de site). Nieuwe route? Draai het script opnieuw; uitleg staat bovenaan het script. Niet met de hand bewerken.
- **Veiligheid: geen etappes, dagplanning of exacte locaties op de site** (ook niet verborgen in de code). Met de vertrekdatum erbij zou iedereen kunnen zien waar Maziar op welke dag is. De routelijn blijft vereenvoudigd.
- **Vlog** `vlog.json`: kanaal-url en video's met YouTube-id. **Partners** `partners.json`: partners en het aantal lege plekken. **Shop** `shop.json`: producten met prijs (leeg = binnenkort).
- Na een wijziging: `python3 build.py` (maakt `assets/content.js` en de html opnieuw). Cloudflare doet dat zelf bij elke push.

**In `assets/site.js`** (enkel Claude):
- **Teksten**: zoek de sleutel in `T`. Pas `nl` en `en` altijd samen aan. `fa` (Farsi) mag ontbreken; dan toont de site Engels. Teksten die ook in `content/*.json` staan, worden door die bestanden overschreven.
- **Tijdslijn** (pagina Verhaal): `TIMELINE`. **Steun**: `FUND` (opgehaald bedrag, doel, verdeling, bedragen). **Tegels op de homepagina**: `LIFE`. **Fotomuur op De loop**: `GALLERY`.
- Wil Jolien iets kunnen aanpassen dat nu nog in `site.js` zit? Verhuis het naar een `content/*.json`, voeg de velden toe in `admin/config.yml` en lees het uit `window.CONTENT` in `site.js`.

### Pagina-opbouw aanpassen

Wijzig `build.py` en draai daarna `python3 build.py`. Dat schrijft alle `.html`-bestanden opnieuw. `python3 build.py --artifact` maakt een voorbeeldversie voor een Claude-artifact; gebruik die niet voor de echte site.

### Nieuwe foto

Verklein tot maximaal 2400 px aan de lange zijde, JPG-kwaliteit rond 78, en zet hem in `assets/img/`. Vermeld de fotograaf bij de foto (`credit`) en voeg een nieuwe fotograaf toe aan de lijst in de footer (functie `renderChrome` in `site.js`). Controleer het fotokader op desktop én mobiel en stuur bij met `object-position`. **Nooit lichaamsdelen afsnijden** (hoofd, armen, handen, voeten): kies een ander kader, zoom uit, of neem een andere foto.

## Vaste afspraken over de inhoud

- De bestemming is **Iran**. Niet "Shiraz" en niet "het dorp". Op de pagina De tocht staat: "Van België naar de grens met Iran".
- **Nooit "naar huis"** of "thuis" voor Iran. Iran is niet zijn thuis; gebruik "terug" of "naar waar zijn verhaal begon".
- Hij kreeg in 2013 een **verblijfsvergunning**, niet de Belgische nationaliteit.
- Hij slaapt onderweg in een **camper**. Jolien reist mee. Hij nodigt lopers uit om een stuk mee te lopen.
- Voeding: "fueled by nature", zo weinig mogelijk bewerkt. **Niet "plantaardig"** (Life Bar was wel plantaardig).
- Niet vermelden: verhalen onderweg verzamelen, rustdagen, koken voor vreemden, een bed onderweg vragen.
- **Niets over de reden van zijn vlucht of over familie in Iran** zonder uitdrukkelijk akkoord van Maziar. Ook het zwangerschapsverlies van Maziar en Jolien staat bewust niet op de site.
- **Geen zelfpromotie** van de beheerders (geen Hi!). Uitzonderingen: de podcastaflevering Hotel Anywhere #25 (8 december 2026) staat in de kalender (vraag van Maziar), en Hotel Anywhere staat als partner bij Partners (vraag van Jolien, 18 november 2026).
- Bijschrift onder citaten: enkel "Maziar".
- De vzw die gesteund wordt is **Casa Legal** (Brussel): advocaten en maatschappelijk werkers die samen mensen in een kwetsbare positie bijstaan. Op de homepagina sinds 18 november 2026, op vraag van Jolien.
- De naam van de expeditie is **Eigen Koers**. Altijd zo geschreven, ook in het Engels (eigennaam). Staat in de kop van elke pagina, de hero van Home en De loop, de footer, de paginatitel en beschrijving, en bij het vertrek in de kalender.

## Stijl

- Merkkleuren (uit het logo): navy `#123C74` en bordeaux `#722F2B` zijn de twee merkkleuren, goud `#C98B3B` is de accentkleur. Zand `#F1EDE6` is de achtergrond. Afgeleid: tekst `#14213A`, licht goud `#E3A853` (tekst op foto's, navy en bordeaux), donker bordeaux `#5E2622` (kaarten op bordeaux), donker zand `#E7E1D6`. Goud nooit als tekstkleur op een lichte achtergrond (te weinig contrast). Het oude roest en salie zijn vervallen. Alle kleuren staan als variabelen bovenaan `site.css`; gebruik die variabelen.
- Lettertypes: Barlow Condensed (koppen), Barlow (tekst), IBM Plex Mono (labels), Vazirmatn (Farsi).
- Schrijf kort, concreet en warm. Liever zijn eigen woorden dan een slogan. Geen gedachtestreepjes (—).

## Controle voor elke publicatie

1. **Elke taal native nalezen.** Lees de Engelse versie alsof je moedertaalspreker bent: let op dutchismen en dubbele betekenissen (bijvoorbeeld "run along" betekent "ga weg"). Controleer dat geen enkele tekst ongemerkt een oude versie terugkreeg. Farsi laten nakijken door een moedertaalspreker.
2. **Fotokaders** op 1280 px en 400 px breed: staat het gezicht of het onderwerp in beeld, en niet achter de tekst?
3. **Geen horizontaal scrollen** op 400 px.
4. Kloppen datums, bedragen en namen in alle talen?

## Werkwijze

- Kleine wijzigingen (een kalenderitem, een tekstcorrectie) mogen rechtstreeks op `main`. Wat via `/admin` wordt opgeslagen, komt ook rechtstreeks op `main`.
- Grotere wijzigingen (nieuwe pagina, andere opbouw, nieuwe foto's) op een aparte tak met een pull request. Cloudflare maakt automatisch een voorbeeldlink; Hans keurt goed voor het live gaat.
- Leg in elke commit in gewone taal uit wat er veranderde.

## Nog open (plaatshouders)

- Video's in `VLOG` hebben nog geen echte YouTube-id's; het YouTube-kanaal ligt nog niet vast. Video's zonder echte id (11 tekens) worden niet getoond; zonder echte video's verbergt de vlogpagina de videoblokken.
- Partners: enkel Hotel Anywhere (AfterLife is weg sinds 18 november 2026, op vraag van Jolien), de rest zijn lege plekken.
- Steun: doel € 60.000 (5.000 km × € 12). Per kilometer € 10 naar Casa Legal en € 2 naar de tocht (€ 50.000 / € 10.000). In `site.js`: `FUND.raised` met de hand bijwerken; `FUND.payUrl` invullen zodra de betaalpagina bestaat (de knop stuurt dan `?bedrag=` mee). `steun.html?demo` toont een voorbeeldbedrag om het ontwerp te bekijken.
- Shop: producten en prijzen zijn voorlopig; nog geen betaling. De pagina is tijdelijk verborgen (`SHOP_OPEN = False` bovenaan `build.py`): niet in het menu, niet in de sitemap, `noindex`. Zet op `True` en draai `python3 build.py` wanneer de shop opent.
- Contactformulier en nieuwsbrief tonen enkel een bevestiging; ze zijn nog nergens aan gekoppeld.
- Perskit: nog niet beschikbaar.
- Logo van de expeditie.
- Vlog staat niet op de homepagina tot de vlog start (`VLOG_ON_HOME = False` in `build.py`).

## Lancering

Gelanceerd op 4 november 2026: `LAUNCHED = True` in `build.py`. Zoekmachines mogen de site tonen; `build.py` maakt ook `robots.txt` (met `/admin/` uitgesloten) en `sitemap.xml`. Zet `LAUNCHED` op `False` om de site tijdelijk weer uit de zoekresultaten te halen.
