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
| `assets/site.js` | Alle teksten in drie talen (woordenboek `T`: `nl`, `en`, `fa`) en alle lijsten met inhoud |
| `build.py` | De opbouw van elke pagina. Genereert de `.html`-bestanden |
| `assets/site.css` | Vormgeving, merkkleuren, lettertypes |
| `assets/img/` | Foto's (max 2400 px lange zijde) en het favicon |
| `*.html` | Gegenereerd door `build.py`. Nooit rechtstreeks bewerken |

### Inhoud aanpassen (meestal in `assets/site.js`)

- **Teksten**: zoek de sleutel in `T`. Pas `nl` en `en` altijd samen aan. `fa` (Farsi) mag ontbreken; dan toont de site Engels.
- **Kalender**: lijst `EVENTS`. Velden: `date` (JJJJ-MM-DD), `kind` (label), `title`, `sub`. Zet `tbd:true` als enkel de maand vastligt; zo'n item komt in de lijst maar niet in het kalenderraster.
- **Etappes per land**: lijst `STAGES`, met `from`, `to`, `country` en `color`. Elke etappe kleurt zijn dagen in de kalender en verschijnt in de legende. Gebruik per land een vaste kleur, afgeleid van de merkkleuren.
- **Tijdslijn** (pagina Verhaal): `TIMELINE`. **Voorbereiding** (pagina De loop): `PREP`.
- **Vlog**: `VLOG`, met het YouTube-id van elke video. **Partners**: `PARTNERS`. **Steun**: `FUND` (opgehaald bedrag, doel, verdeling, bedragen). **Shop**: `PRODUCTS`.
- **Tegels op de homepagina**: `LIFE`. **Fotomuur op De loop**: `GALLERY`.

### Pagina-opbouw aanpassen

Wijzig `build.py` en draai daarna `python3 build.py`. Dat schrijft alle `.html`-bestanden opnieuw. `python3 build.py --artifact` maakt een voorbeeldversie voor een Claude-artifact; gebruik die niet voor de echte site.

### Nieuwe foto

Verklein tot maximaal 2400 px aan de lange zijde, JPG-kwaliteit rond 78, en zet hem in `assets/img/`. Vermeld de fotograaf bij de foto (`credit`) en voeg een nieuwe fotograaf toe aan de lijst in de footer (functie `renderChrome` in `site.js`). Controleer het fotokader op desktop én mobiel en stuur bij met `object-position`.

## Vaste afspraken over de inhoud

- De bestemming is **Iran**. Niet "Shiraz" en niet "het dorp". Op de pagina De loop staat: "Van België naar de stad waar ik geboren werd".
- **Nooit "naar huis"** of "thuis" voor Iran. Iran is niet zijn thuis; gebruik "terug" of "naar waar zijn verhaal begon".
- Hij kreeg in 2013 een **verblijfsvergunning**, niet de Belgische nationaliteit.
- Hij slaapt onderweg in een **camper**. Jolien reist mee. Hij nodigt lopers uit om een stuk mee te lopen.
- Voeding: "fueled by nature", zo weinig mogelijk bewerkt. **Niet "plantaardig"** (Life Bar was wel plantaardig).
- Niet vermelden: verhalen onderweg verzamelen, rustdagen, koken voor vreemden, een bed onderweg vragen.
- **Niets over de reden van zijn vlucht of over familie in Iran** zonder uitdrukkelijk akkoord van Maziar. Ook het zwangerschapsverlies van Maziar en Jolien staat bewust niet op de site.
- **Geen zelfpromotie** van de beheerders (geen Hotel Anywhere, geen Hi!).
- Bijschrift onder citaten: enkel "Maziar".
- De vzw die gesteund wordt, komt pas met naam op de site als de samenwerking bevestigd is.

## Stijl

- Merkkleuren van Maziar: navy `#123C74`, roest `#9C421C`, salie `#587D55`, zand `#F1EDE6`. Afgeleid: tekst `#14213A`, lichte roest `#E08A5E` (op foto's en navy), donker zand `#E7E1D6`. Alle kleuren staan als variabelen bovenaan `site.css`; gebruik die variabelen.
- Lettertypes: Barlow Condensed (koppen), Barlow (tekst), IBM Plex Mono (labels), Vazirmatn (Farsi).
- Schrijf kort, concreet en warm. Liever zijn eigen woorden dan een slogan. Geen gedachtestreepjes (—).

## Controle voor elke publicatie

1. **Elke taal native nalezen.** Lees de Engelse versie alsof je moedertaalspreker bent: let op dutchismen en dubbele betekenissen (bijvoorbeeld "run along" betekent "ga weg"). Controleer dat geen enkele tekst ongemerkt een oude versie terugkreeg. Farsi laten nakijken door een moedertaalspreker.
2. **Fotokaders** op 1280 px en 400 px breed: staat het gezicht of het onderwerp in beeld, en niet achter de tekst?
3. **Geen horizontaal scrollen** op 400 px.
4. Kloppen datums, bedragen en namen in alle talen?

## Werkwijze

- Kleine wijzigingen (een kalenderitem, een tekstcorrectie) mogen rechtstreeks op `main`.
- Grotere wijzigingen (nieuwe pagina, andere opbouw, nieuwe foto's) op een aparte tak met een pull request. Cloudflare maakt automatisch een voorbeeldlink; Hans keurt goed voor het live gaat.
- Leg in elke commit in gewone taal uit wat er veranderde.

## Nog open (plaatshouders)

- Video's in `VLOG` hebben nog geen echte YouTube-id's; het YouTube-kanaal ligt nog niet vast.
- Partners: enkel AfterLife, de rest zijn lege plekken.
- Steun: doelbedrag, verdeling en betaallinks ontbreken; de knoppen doen nog niets. Voorstel: het deel voor de vzw via het platform van de vzw, het deel voor de tocht via partners en eventueel één crowdfundingpagina.
- Shop: producten en prijzen zijn voorlopig; nog geen betaling.
- Contactformulier en nieuwsbrief tonen enkel een bevestiging; ze zijn nog nergens aan gekoppeld.
- Perskit: nog niet beschikbaar.
- Naam van de expeditie (waarschijnlijk "Eigen Koers") en eventueel een logo.

## Lancering

Zet in `build.py` `LAUNCHED = True` en draai `python3 build.py`. Dat haalt de `noindex` weg, zodat zoekmachines de site mogen tonen. Doe dit pas als de plaatshouders hierboven opgelost of verwijderd zijn.
