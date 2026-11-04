import os, json
OUT = os.path.dirname(os.path.abspath(__file__))

# Inhoud die via /admin (Sveltia CMS) bewerkt wordt: content/*.json.
# Die wordt hier gebundeld tot assets/content.js, zodat site.js ze kan lezen.
CONTENT = {}
for name in ["deloop","kalender","vlog","partners","shop"]:
    with open(os.path.join(OUT,"content",name+".json"), encoding="utf-8") as f:
        CONTENT[name] = json.load(f)
with open(os.path.join(OUT,"assets","content.js"),"w",encoding="utf-8") as f:
    f.write("/* Gegenereerd door build.py uit content/*.json. Niet bewerken: pas de JSON aan of gebruik /admin. */\n")
    f.write("window.CONTENT = " + json.dumps(CONTENT, ensure_ascii=False) + ";\n")
YT = CONTENT["vlog"].get("kanaal") or "https://www.youtube.com/@maz.runs"

FONTS = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Vazirmatn:wght@400;700&display=swap'
I = "assets/img/"

def photo(img, cls="", alt="", credit="", extra=""):
    c = f'<span class="credit">© {credit}</span>' if credit else ''
    return f'<div class="photo {cls}" {extra}><img src="{I}{img}" alt="{alt}" loading="lazy">{c}</div>'

def hero(img, pos, label_key, label, h1_html, sub_key=None, sub=None, lede_key=None, lede=None, ctas="", short=False, credit=""):
    s = f'<p class="sub" data-t="{sub_key}">{sub}</p>' if sub_key else ''
    l = f'<p class="lede" data-t="{lede_key}">{lede}</p>' if lede_key else ''
    cr = f'<span class="credit">© {credit}</span>' if credit else ''
    return f'''<section class="hero on-photo{' short' if short else ''}">
  <img src="{I}{img}" alt="" style="object-position:{pos}" fetchpriority="high">
  <div class="wrap"><div class="over">
    <p class="label" data-t="{label_key}">{label}</p>
    <h1>{h1_html}</h1>
    {s}{l}
    <div class="cta-row">{ctas}</div>
  </div></div>{cr}
</section>'''

def frag(img, key, rev=False, credit=""):
    return f'''<div class="frag{' rev' if rev else ''}">
  {photo(img,"",credit=credit)}
  <div class="txt"><p class="big" data-t="{key}.big"></p><p data-t="{key}.p1"></p><p class="muted" data-t="{key}.p2"></p></div>
</div>'''

NEWS = '''<section class="band dark"><div class="wrap news">
  <p class="label" data-t="news.title">Loop mee in je mailbox</p>
  <h2 data-t="news.p">Af en toe een mail van onderweg. Meer niet.</h2>
  <form id="newsForm"><input id="newsMail" type="email" required data-t-ph="news.ph" placeholder="je@mail.be" aria-label="E-mail"><button class="btn" type="submit" data-t="news.btn">Inschrijven</button></form>
  <p class="toast" id="newsToast" hidden></p>
</div></section>'''

FACTS = '<div class="facts">' + "".join(
    f'<div class="fact"><b>{c["getal"]}</b><span data-t="stat.{i}">{c["label"]["nl"]}</span></div>'
    for i,c in enumerate(CONTENT["deloop"]["cijfers"][:3])) + '</div>'

PAGES = {}

PAGES["index"] = ("home", "Mazruns", hero(
  "hero-dunes.jpg","68% 55%","hero.eyebrow","Leuven → Iran · vertrek 1 maart 2027",
  '<span data-t="story.title.a">Ooit moest hij vluchten.</span><br><em data-t="story.title.b">Nu loopt hij terug.</em>',
  "hero.sub","Elke dag een marathon, van België naar Iran",
  "hero.lede","Ooit liep Maziar Toghraie weg uit Iran, omdat blijven geen optie meer was. Op 1 maart 2027 vertrekt hij opnieuw, deze keer te voet van België naar Iran. Vier tot zes maanden onderweg, elke dag een marathon.",
  '<a class="btn fill" href="steun.html" data-t="home.support">Steun een kilometer</a><a class="btn" href="verhaal.html" data-t="home.read">Lees zijn verhaal</a>',
  credit="Marathon des Sables") + f'''
<section class="band"><div class="wrap">
  <div class="feature">
    {photo("portrait-bowl.jpg","",credit="Elke Smit Photography")}
    <div class="txt">
      <p class="label" data-t="home.about">Over Maziar</p>
      <h2 data-t="home.about.h">Achter de loper zit een lang verhaal.</h2>
      <p class="lede" data-t="home.about.p">Kok, ondernemer en ultraloper uit Leuven. Geboren in het zuiden van Iran. Tien jaar wachten op papieren, negen jaar Life Bar. Op 1 maart 2027 vertrekt hij te voet richting Iran.</p>
      <div class="actions"><a class="btn fill" href="verhaal.html" data-t="home.read">Lees zijn verhaal</a><a class="link" href="deloop.html" data-t="home.run">Over de loop</a></div>
    </div>
  </div>
</div></section>

<section class="wrap" style="padding-bottom:clamp(3rem,7vw,5.5rem)">{FACTS}</section>

<section class="band alt"><div class="wrap stack lg">
  <div class="head"><div class="stack"><p class="label" data-t="home.when">Wanneer</p><h2 data-t="home.when.h">Tussen nu en vertrek</h2></div><a class="link" href="kalender.html" data-t="home.all">Volledige kalender</a></div>
  <div class="cards three" id="nextEvent"></div>
</div></section>

<section class="band"><div class="wrap stack lg">
  <div class="head"><div class="stack"><p class="label" data-t="home.life">Het leven van Maziar</p><h2 data-t="home.life.h">Koken, lopen, leven. Op zijn eigen ritme.</h2></div></div>
  <div class="tiles three" id="life"></div>
</div></section>

<section class="band dark"><a class="wrap quote quote-link" href="deloop.html">
  <blockquote data-t="home.quote">Niet omdat ik iets wil bewijzen. Maar omdat ik iets wil begrijpen.</blockquote>
  <cite data-t="home.quote.cite">Maziar, over de loop naar Iran</cite>
  <span class="more" data-t="home.quote.more">Waarom ik loop</span>
</a></section>

<section class="band"><div class="wrap">
  <div class="feature rev">
    {photo("greens.jpg","",credit="Elke Smit Photography")}
    <div class="txt">
      <p class="label" data-t="home.cause">Het goede doel</p>
      <h2 data-t="home.cause.h">Eén mens kan het verschil maken.</h2>
      <p class="lede" data-t="home.cause.p">Toen Maziar te horen kreeg dat hij het land moest verlaten, gaf een advocaat hem tijd, en vooral hoop. Daarom gaat een deel van elke bijdrage naar een vzw. Welke, maken we binnenkort bekend.</p>
      <div class="actions"><a class="btn fill" href="steun.html" data-t="home.support">Steun een kilometer</a></div>
    </div>
  </div>
</div></section>

<section class="band alt"><div class="wrap stack lg">
  <div class="head"><div class="stack"><p class="label" data-t="home.vlog">Volg de tocht</p><h2>Vlog</h2></div><a class="link" href="vlog.html" data-t="home.allvideos">Alle video's</a></div>
  <div id="homeVideo"></div>
</div></section>

<section class="band"><div class="wrap stack lg">
  <div class="head"><div class="stack"><p class="label" data-t="home.partners">Zij lopen mee</p><h2>Partners</h2></div><a class="link" href="partners.html" data-t="home.partner">Loop mee als partner</a></div>
  <div class="logos" id="logos"></div>
</div></section>
{NEWS}
''')

PAGES["verhaal"] = ("verhaal", "Verhaal · Mazruns", hero(
  "portrait-stand.jpg","50% 16%","story.crumb","Verhaal",
  '<span data-t="story.title">Ik loop niet weg. Ik loop terug.</span>',
  None,None,"story.lede","Het verhaal van Maziar Toghraie, in zijn eigen woorden.","",short=True,credit="Elke Smit Photography") + f'''
<section class="band"><div class="wrap stack" style="gap:clamp(3rem,7vw,5rem)">
  {frag("desert-empty.jpg","f1",credit="Marathon des Sables")}
  {frag("road-run.jpg","f2",rev=True)}
  {frag("hands-mortar.jpg","f3",credit="Elke Smit Photography")}
</div></section>
<section class="band dark"><div class="wrap quote">
  <blockquote data-t="story.quote">Ik ben niet boos op wat me overkomen is. Integendeel. De pijn heeft me gevormd.</blockquote>
  <cite data-t="story.cite">Maziar</cite>
</div></section>
<section class="band"><div class="wrap stack" style="gap:clamp(3rem,7vw,5rem)">
  {frag("lifebar.jpg","f4",rev=True)}
  {frag("winter-run.jpg","f5")}
  {frag("portrait-laugh.jpg","f6",rev=True,credit="Elke Smit Photography")}
</div></section>
<section class="band alt"><div class="wrap stack lg">
  <div class="stack"><p class="label" data-t="story.timeline">Tijdslijn</p><h2 data-t="story.title.a">Ooit moest hij vluchten.</h2></div>
  <ol class="timeline" id="timeline"></ol>
  <div><a class="btn fill" href="deloop.html" data-t="story.read.run">Over de loop</a></div>
</div></section>
''')

PAGES["deloop"] = ("deloop", "De loop · Mazruns", hero(
  "rocks.jpg","62% 45%","run.crumb","De loop",
  '<span data-t="run.title">Elke dag een marathon, naar waar zijn verhaal begon</span>',
  "run.sub","Van België naar de stad waar ik geboren werd",
  "run.lede","Niet om iets te bewijzen, zegt hij, maar om zijn afkomst eer aan te doen. Zijn toekomst ligt in België. Iran heeft hem gemaakt tot wie hij is.",
  '<a class="btn fill" href="steun.html" data-t="run.read.support">Steun de tocht</a>',credit="Marathon des Sables") + f'''
<section class="wrap" style="padding-block:clamp(3rem,7vw,5.5rem)">{FACTS}</section>
<section class="band"><div class="wrap">
  <div class="feature">
    {photo("dune-ridge.jpg","",credit="Marathon des Sables")}
    <div class="txt">
      <p class="label" data-t="run.crumb">De loop</p>
      <h2 data-t="run.why">Waarom hij loopt</h2>
      <p class="lede" data-t="run.why.p"></p>
    </div>
  </div>
</div></section>
<section class="band alt"><div class="wrap stack lg">
  <div class="stack"><p class="label" data-t="run.prep.title">De voorbereiding</p><h2 data-t="run.gallery">Onderweg naar het vertrek</h2></div>
  <ol class="timeline prep" id="prepList"></ol>
</div></section>
<section class="band"><div class="wrap stack lg">
  <div class="mosaic" id="gallery"></div>
</div></section>
<section class="band alt"><div class="wrap two" style="display:grid;gap:3rem">
  <div class="stack"><p class="label" data-t="run.route">De route</p><h2 data-t="run.route.h">Leuven → Iran</h2><p class="note" data-t="route.note">indicatieve route, etappes volgen na vertrek</p></div>
  <div id="faq"></div>
</div></section>
{NEWS}
''')

PAGES["kalender"] = ("kalender", "Kalender · Mazruns", hero(
  "field-sun.jpg","50% 60%","cal.crumb","Kalender",
  '<span data-t="cal.title">Wanneer</span>',None,None,
  "cal.lede","Wat vastligt en wat nog volgt. Zodra de route bekend is, krijgt elk land hier een eigen kleur.","",short=True) + '''
<section class="band"><div class="wrap two" style="display:grid;gap:3rem">
  <div>
    <div class="cal-head">
      <button id="calPrev" data-t-aria="cal.prev" aria-label="Vorige maand">‹</button>
      <h3 id="calMonth"></h3>
      <button id="calNext" data-t-aria="cal.next" aria-label="Volgende maand">›</button>
    </div>
    <div class="cal" id="cal" role="grid"></div>
    <p class="legend" style="margin-top:1.2rem"><span><i style="background:var(--accent)"></i><span data-t="cal.legend.event">evenement</span></span><span><i style="box-shadow:inset 0 0 0 2px var(--ink)"></i><span data-t="cal.legend.today">vandaag</span></span></p>
    <p class="legend" id="calCountries" style="margin-top:.6rem"></p>
  </div>
  <div class="stack lg">
    <div class="stack"><p class="label" data-t="cal.upcoming">Binnenkort</p></div>
    <div class="cards" style="grid-template-columns:1fr" id="eventList"></div>
  </div>
</div></section>
''' + NEWS)

PAGES["vlog"] = ("vlog", "Vlog · Mazruns", hero(
  "dune-wide.jpg","50% 50%","vlog.crumb","Vlog",
  '<span data-t="vlog.title">Volg de tocht</span>',None,None,
  "vlog.lede","Elke etappe een korte video. Abonneer op het kanaal en mis geen kilometer.",
  f'<a class="btn fill" href="{YT}" data-t="vlog.sub">Abonneer op YouTube</a>',short=True,credit="Marathon des Sables") + f'''
<section class="band"><div class="wrap">
  <div id="vlogFeatured"></div>
</div></section>
<section class="band alt"><div class="wrap stack lg">
  <div class="head"><div class="stack"><p class="label" data-t="vlog.all">Alle video's</p></div><a class="link" href="{YT}" data-t="vlog.more">Alle video's op YouTube</a></div>
  <div class="tiles three" id="vlogCards"></div>
</div></section>
''' + NEWS)

PAGES["partners"] = ("partners", "Partners · Mazruns", hero(
  "finish-prague.jpg","50% 12%","partners.crumb","Partners",
  '<span data-t="partners.title">Wie loopt mee</span>',None,None,
  "partners.lede","Schoenen, kledij, voeding, verzekering, kilometers. Elke partner krijgt hier een plek, en een plek in de vlog van onderweg.",
  '<a class="btn fill" href="contact.html" data-t="partners.cta">Word partner</a>',short=True) + '''
<section class="band"><div class="wrap stack lg">
  <div class="logos" id="logos"></div>
</div></section>
<section class="band alt"><div class="wrap stack lg">
  <div class="stack"><p class="label" data-t="partners.why">Waarom bedrijven meelopen</p><p class="lede" data-t="partners.why.p"></p></div>
  <h2 data-t="partners.how">Hoe je kunt meelopen</h2>
  <div class="steps">
    <div class="card"><span class="pill accent">01</span><h3 data-t="ptier.1">Hoofdpartner</h3><p class="s" data-t="ptier.1.p"></p></div>
    <div class="card"><span class="pill accent">02</span><h3 data-t="ptier.2">Etappepartner</h3><p class="s" data-t="ptier.2.p"></p></div>
    <div class="card"><span class="pill accent">03</span><h3 data-t="ptier.3">In natura</h3><p class="s" data-t="ptier.3.p"></p></div>
  </div>
  <div><a class="btn fill" href="contact.html" data-t="partners.contact">Neem contact op</a></div>
</div></section>
''')

PAGES["steun"] = ("steun", "Steun · Mazruns", hero(
  "sand-kick.jpg","60% 22%","fund.crumb","Steun",
  '<span data-t="fund.title">Koop een kilometer</span>',None,None,
  "fund.lede","Een deel van elke bijdrage dekt de tocht. De rest gaat naar een vzw. Welke, maken we binnenkort bekend.","",short=True,credit="Marathon des Sables") + f'''
<section class="band"><div class="wrap stack lg">
  <div>
    <div class="meter"><i id="meterBar"></i></div>
    <div class="amounts"><span id="raised">€ 0</span><span id="goal" data-t="fund.goal">doel: nog te bepalen</span></div>
  </div>
  <ul class="tiers" id="tiers"></ul>
  <p class="note" data-t="fund.note"></p>
</div></section>
<section class="band dark"><div class="wrap quote">
  <blockquote data-t="fund.quote"></blockquote>
  <cite data-t="story.cite">Maziar</cite>
</div></section>
<section class="band alt"><div class="wrap two" style="display:grid;gap:3rem">
  <div class="stack">
    <p class="label" data-t="fund.split">Waar je bijdrage naartoe gaat</p>
    <div class="split"><div><b id="splitA">50%</b><span data-t="fund.split.a">de tocht</span></div><div><b id="splitB">50%</b><span data-t="fund.split.b">de vzw</span></div></div>
    <p class="note" data-t="fund.split.note">verdeling voorlopig</p>
  </div>
  <div>
    <details><summary data-t="ffaq.q1"></summary><p data-t="ffaq.a1"></p></details>
    <details><summary data-t="ffaq.q2"></summary><p data-t="ffaq.a2"></p></details>
    <details><summary data-t="ffaq.q3"></summary><p data-t="ffaq.a3"></p></details>
  </div>
</div></section>
''')

PAGES["shop"] = ("shop", "Shop · Mazruns", hero(
  "veg-board.jpg","50% 50%","shop.crumb","Shop",
  '<span data-t="shop.title">Neem iets mee</span>',None,None,
  "shop.lede","Elke aankoop steunt de tocht. Het assortiment en de prijzen zijn voorlopig.","",short=True,credit="Elke Smit Photography") + '''
<section class="band"><div class="wrap stack lg">
  <div class="tiles four" id="products"></div>
  <p class="note" data-t="shop.ship"></p>
</div></section>
''' + NEWS)

PAGES["contact"] = ("contact", "Contact · Mazruns", hero(
  "beach.jpg","50% 50%","contact.crumb","Contact",
  '<span data-t="contact.title">Loop mee</span>',None,None,
  "contact.lede","Pers, partners, en lopers die een stuk van de route willen meelopen.","",short=True) + '''
<section class="band"><div class="wrap two" style="display:grid;gap:3rem">
  <form class="form" id="contactForm">
    <label><span data-t="form.name">Naam</span><input id="f-name" name="name" required></label>
    <label><span data-t="form.email">E-mail</span><input id="f-email" name="email" type="email" required></label>
    <label><span data-t="form.why">Waarvoor</span><select id="f-why" name="why">
      <option data-t="form.o1">Pers</option><option data-t="form.o2">Partner</option><option data-t="form.o3">Een stuk meelopen</option><option data-t="form.o4">Iets anders</option></select></label>
    <label><span data-t="form.msg">Bericht</span><textarea id="f-msg" name="msg" required></textarea></label>
    <div><button class="btn fill" type="submit" data-t="form.send">Verstuur</button></div>
    <p class="toast" id="formToast" hidden></p>
  </form>
  <div class="stack lg">
    <div class="card"><span class="pill">PDF</span><h3 data-t="contact.press">Perskit</h3><p class="s" data-t="contact.press.p"></p><span class="link muted" data-t="shop.soon.long"></span></div>
    <div class="card"><span class="pill">Instagram</span><p><a href="https://www.instagram.com/maz.runs/">@maz.runs</a> · <a href="https://www.instagram.com/lifebar_be/">@lifebar_be</a></p></div>
  </div>
</div></section>
''')

# ---------------------------------------------------------------------------
# Output
#   python3 build.py            -> standalone website (full HTML documents), for hosting
#   python3 build.py --artifact -> preview version for the Claude artifact (index without skeleton)
# Set LAUNCHED = True on launch day: removes the "noindex" so search engines may list the site.
# ---------------------------------------------------------------------------
import sys
LAUNCHED = True
SITE_URL = "https://mazruns.be"
DESCRIPTION = "Ooit moest Maziar Toghraie vluchten uit Iran. Op 1 maart 2027 loopt hij terug: van Leuven naar Iran, elke dag een marathon."
ARTIFACT = "--artifact" in sys.argv

def head(title, is_index, file):
    common = f"""<title>{title}</title>
<link rel="stylesheet" href="{FONTS}">
<link rel="stylesheet" href="assets/site.css">"""
    if ARTIFACT:
        common = '<meta name="claude:viewport-fit-sides" content="cover">\n' + common
        if is_index:
            return common
    robots = "" if LAUNCHED else '<meta name="robots" content="noindex">\n'
    url = SITE_URL + "/" + ("" if file == "index.html" else file)
    return f"""<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
{robots}<meta name="description" content="{DESCRIPTION}">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{DESCRIPTION}">
<meta property="og:image" content="{SITE_URL}/assets/img/hero-dunes.jpg">
<meta property="og:url" content="{url}">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
{common}
</head>"""

# robots.txt en sitemap.xml, enkel zinvol na de lancering
if LAUNCHED and not ARTIFACT:
    with open(os.path.join(OUT,"robots.txt"),"w") as f:
        f.write(f"User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: {SITE_URL}/sitemap.xml\n")
    with open(os.path.join(OUT,"sitemap.xml"),"w") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for name in PAGES:
            f.write(f"  <url><loc>{SITE_URL}/{'' if name=='index' else name}</loc></url>\n")
        f.write("</urlset>\n")

for name,(pid,title,body) in PAGES.items():
    is_index = name=="index"
    file = name+".html"
    bare = ARTIFACT and is_index
    html = head(title,is_index,file) + f"""
<body data-page="{pid}">
<header class="nav" id="hdr"></header>
<main>
{body}
</main>
<footer id="ftr"></footer>
<script src="assets/content.js"></script>
<script src="assets/site.js"></script>
</body>""" + ("" if bare else "\n</html>\n")
    if bare:
        html = html.replace('<body data-page="home">','').replace('</body>','')
        html = html.replace('<script src="assets/content.js"></script>','<script>document.body.dataset.page="home";</script>\n<script src="assets/content.js"></script>')
    with open(os.path.join(OUT, file),"w") as f: f.write(html)
    print("wrote", file, len(html), "(artifact)" if ARTIFACT else "(site)")
