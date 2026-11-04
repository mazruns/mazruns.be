# mazruns.be

Website van Maziar Toghraie, die vanaf 1 maart 2027 te voet van Leuven naar Iran loopt.

Statische site in drie talen (Nederlands, Engels, Farsi), zonder databank. De inhoud van De loop, Kalender, Vlog, Partners en Shop staat in `content/*.json` en is te bewerken op `/admin` (Sveltia CMS). De rest staat in `assets/site.js`. `build.py` maakt de pagina's.

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

## Beheren via /admin

Ga naar [mazruns.be/admin](https://mazruns.be/admin) en meld je aan met GitHub. Je hebt schrijfrechten op deze repository nodig. Wat je opslaat, staat binnen een minuut online.

Het inloggen loopt via een kleine hulpdienst (`sveltia-cms-auth.hinnovation.workers.dev`, in het Cloudflare-account van Hans) en de GitHub OAuth App "Hotel Anywhere CMS". Beide worden gedeeld met hotelanywhere.world. Wil je dat loskoppelen, zet dan een eigen [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) in het Cloudflare-account Mazruns, maak een OAuth App aan onder de GitHub-organisatie mazruns en pas `base_url` in `admin/config.yml` aan.

## Aanpassen

De makkelijkste weg: open deze repository in Claude en vraag wat je wil, bijvoorbeeld "zet het afscheidsdiner op 20 februari" of "voeg een etappe toe door Duitsland van 5 tot 18 maart". Claude volgt de afspraken in `CLAUDE.md`.

Zelf aanpassen kan ook: teksten en lijsten in `assets/site.js`, pagina-opbouw in `build.py` (daarna `python3 build.py` draaien), stijl in `assets/site.css`.

## Mappen

```
build.py            pagina-opbouw, genereert de .html-bestanden en assets/content.js
content/            inhoud die via /admin beheerd wordt (de loop, kalender, vlog, partners, shop)
admin/              het beheerscherm (Sveltia CMS) en zijn configuratie
assets/content.js   gegenereerd uit content/, niet bewerken
assets/site.js      vaste teksten (nl, en, fa), verhaal, steun en de pagina-logica
assets/site.css     vormgeving en merkkleuren
assets/img/         foto's en favicon; assets/img/upload/ is voor foto's die via /admin komen
*.html              gegenereerd, niet rechtstreeks bewerken
```

## Foto's

Elke Smit Photography, Marathon des Sables, Sergio Pro Foto, Kai P., JA Films, en Maziar zelf.
