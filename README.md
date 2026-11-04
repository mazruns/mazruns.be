# mazruns.be

Website van Maziar Toghraie, die vanaf 1 maart 2027 te voet van Leuven naar Iran loopt.

Statische site in drie talen (Nederlands, Engels, Farsi), zonder databank of CMS. Alle inhoud staat in `assets/site.js`; `build.py` maakt de pagina's.

## Bekijken

Open `index.html` in een browser. Er is geen server nodig.

## Online zetten (Cloudflare)

In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, kies deze repository en stel in:

| Instelling | Waarde |
|---|---|
| Production branch | `main` |
| Build command | `python3 build.py` |
| Build output directory | `/` |

Elke wijziging op `main` staat binnen een minuut online. Elke andere tak krijgt een eigen voorbeeldlink.

## Aanpassen

De makkelijkste weg: open deze repository in Claude en vraag wat je wil, bijvoorbeeld "zet het afscheidsdiner op 20 februari" of "voeg een etappe toe door Duitsland van 5 tot 18 maart". Claude volgt de afspraken in `CLAUDE.md`.

Zelf aanpassen kan ook: teksten en lijsten in `assets/site.js`, pagina-opbouw in `build.py` (daarna `python3 build.py` draaien), stijl in `assets/site.css`.

## Mappen

```
build.py            pagina-opbouw, genereert de .html-bestanden
assets/site.js      teksten (nl, en, fa) en inhoud: kalender, etappes, vlog, partners, steun, shop
assets/site.css     vormgeving en merkkleuren
assets/img/         foto's en favicon
*.html              gegenereerd, niet rechtstreeks bewerken
```

## Foto's

Elke Smit Photography, Marathon des Sables, Sergio Pro Foto, Kai P., JA Films, en Maziar zelf.
