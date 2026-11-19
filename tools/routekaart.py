"""Maakt de routekaart (assets/route.svg) en content/route.json (totale afstand en landen) uit een GPX-bestand.

Bewust GEEN etappes of dagposities: die liggen niet vast, en samen met de vertrekdatum zouden ze tonen
waar Maziar op welke dag is (veiligheid). Ook de lijn wordt vereenvoudigd, zodat ze geen exacte weg toont.

Gebruik:  python3 tools/routekaart.py route.gpx countries-50m.json cities.json
- countries-50m.json: uit het npm-pakket world-atlas@2 (Natural Earth, publiek domein)
- cities.json: niet meer nodig (mag weggelaten worden)
"""
import json, math, re, sys, bisect, collections
from shapely.geometry import Polygon, MultiPolygon, Point, LineString, box
from shapely.prepared import prep

GPX, WORLD = sys.argv[1:3]
# Veiligheid: de lijn stopt CUT_KM voor het einde en gaat verder als een gestippelde pijl richting de grens,
# zodat de exacte eindplaats en grenspost niet te zien zijn. 0 = volledige lijn.
CUT_KM = float(sys.argv[3]) if len(sys.argv) > 3 else 0
ARROW_TO = (43.55, 39.25)   # lon, lat waar de pijlpunt stopt: ruim voor de grens, niet bij een grenspost
ISO = {'Belgium':'BE','Netherlands':'NL','Germany':'DE','Czechia':'CZ','Austria':'AT','Hungary':'HU','Croatia':'HR',
       'Serbia':'RS','Bulgaria':'BG','Greece':'GR','Turkey':'TR','Iran':'IR'}
NAMES = {'BE':('België','Belgium'),'NL':('Nederland','Netherlands'),'DE':('Duitsland','Germany'),'CZ':('Tsjechië','Czechia'),
         'AT':('Oostenrijk','Austria'),'HU':('Hongarije','Hungary'),'HR':('Kroatië','Croatia'),'RS':('Servië','Serbia'),
         'BG':('Bulgarije','Bulgaria'),'GR':('Griekenland','Greece'),'TR':('Turkije','Turkey')}

def load_topo(path):
    t = json.load(open(path)); sc = t['transform']['scale']; tr = t['transform']['translate']; arcs = []
    for a in t['arcs']:
        x = y = 0; out = []
        for dx, dy in a:
            x += dx; y += dy; out.append((x*sc[0]+tr[0], y*sc[1]+tr[1]))
        arcs.append(out)
    arc = lambda i: arcs[i] if i >= 0 else arcs[~i][::-1]
    def ring(r):
        pts = []
        for i in r:
            a = arc(i); pts.extend(a if not pts else a[1:])
        return pts
    for g in t['objects']['countries']['geometries']:
        rings = [g['arcs']] if g['type'] == 'Polygon' else g['arcs'] if g['type'] == 'MultiPolygon' else []
        polys = [Polygon(ring(p[0]), [ring(h) for h in p[1:]]) for p in rings]
        polys = [p for p in polys if p.is_valid or True]
        if polys: yield g.get('properties', {}).get('name'), MultiPolygon(polys).buffer(0)

def hav(la1, lo1, la2, lo2):
    r = math.radians; x = math.sin(r(la2-la1)/2)**2 + math.cos(r(la1))*math.cos(r(la2))*math.sin(r(lo2-lo1)/2)**2
    return 2*6371.0088*math.asin(math.sqrt(x))

s = open(GPX).read()
pts = [(float(a), float(b)) for a, b in re.findall(r'<trkpt lat="([-\d.]+)" lon="([-\d.]+)"', s)]
cum = [0.0]
for i in range(1, len(pts)): cum.append(cum[-1] + hav(*pts[i-1], *pts[i]))
total = cum[-1]

countries = list(load_topo(WORLD))
route_c = {ISO[n]: prep(g) for n, g in countries if n in ISO}
def country(la, lo):
    p = Point(lo, la)
    for k, g in route_c.items():
        if g.contains(p): return 'TR' if k == 'IR' else k   # grensrimpels in de kaartdata
    return None

order = []
for i in range(0, len(pts), 200):
    cc = country(*pts[i])
    if cc and (not order or order[-1] != cc): order.append(cc)
json.dump({'totaal_km': round(total), 'landen': [{'code': c, 'nl': NAMES[c][0], 'en': NAMES[c][1]} for c in dict.fromkeys(order)]},
          open('content/route.json', 'w'), ensure_ascii=False, indent=1)

# ---------- kaart ----------
LON0, LON1, LAT0, LAT1 = 1.2, 46.4, 35.6, 53.0
W = 1000
my = lambda la: math.log(math.tan(math.pi/4 + math.radians(la)/2))
sx = W/(LON1-LON0); Y1 = my(LAT1); Y0 = my(LAT0); H = round(W*(Y1-Y0)/math.radians(LON1-LON0))
def P(lo, la): return ((lo-LON0)*sx, (Y1-my(la))/(Y1-Y0)*H)
def path(geom, tol):
    geom = geom.simplify(tol, preserve_topology=True); out = []
    polys = geom.geoms if hasattr(geom, 'geoms') else [geom]
    for p in polys:
        if p.is_empty or p.geom_type != 'Polygon': continue
        for r in [p.exterior, *p.interiors]:
            c = [P(x, y) for x, y in r.coords]
            out.append('M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in c) + 'Z')
    return ''.join(out)
frame = box(LON0-1, LAT0-1, LON1+1, LAT1+1)
land, on = [], []
for name, g in countries:
    g = g.intersection(frame)
    if g.is_empty: continue
    d = path(g, 0.03)
    if not d: continue
    (on if name in ISO and name != 'Iran' else land).append(d)
cut = len(pts) if not CUT_KM else bisect.bisect_left(cum, total - CUT_KM)
line = LineString([(lo, la) for la, lo in pts[:cut]]).simplify(0.03)
rd = 'M' + 'L'.join('{:.1f},{:.1f}'.format(*P(x, y)) for x, y in line.coords)
# landnamen: midden van het routestuk in dat land, iets naast de lijn
lab = {}
for i in range(0, len(pts), 200):
    cc = country(*pts[i])
    if cc: lab.setdefault(cc, []).append({'lat': pts[i][0], 'lon': pts[i][1]})
# (dx, dy, anker) per land, zodat de namen naast de lijn staan
OFF = {'BE':(-4,34,'middle'),'NL':None,'DE':(10,-18,'middle'),'CZ':(22,0,'start'),'AT':(-22,6,'end'),'HU':(22,0,'start'),
       'HR':(-22,8,'end'),'RS':(22,6,'start'),'BG':(14,-22,'middle'),'GR':(-6,40,'end'),'TR':(-40,-26,'middle')}
labels = ''
for cc, sts in lab.items():
    o = OFF.get(cc, (12, -10, 'start'))
    if o is None: continue
    st = sts[len(sts)//2]; x, y = P(st['lon'], st['lat']); dx, dy, anc = o
    labels += f'<text x="{x+dx:.0f}" y="{y+dy:.0f}" text-anchor="{anc}" data-nl="{NAMES[cc][0]}" data-en="{NAMES[cc][1]}">{NAMES[cc][0]}</text>'
sx0, sy0 = P(pts[0][1], pts[0][0])
if CUT_KM:
    ax, ay = P(pts[cut-1][1], pts[cut-1][0]); bx, by = P(*ARROW_TO)
    ang = math.atan2(by-ay, bx-ax); hx, hy = bx-12*math.cos(ang), by-12*math.sin(ang)
    end = (f'<path class="rm-arrow" d="M{ax:.1f},{ay:.1f}L{hx:.1f},{hy:.1f}"/>'
           f'<path class="rm-head" d="M{bx:.1f},{by:.1f}L{hx-7*math.sin(ang):.1f},{hy+7*math.cos(ang):.1f}L{hx+7*math.sin(ang):.1f},{hy-7*math.cos(ang):.1f}Z"/>'
           f'<text class="rm-place" x="{bx+14:.0f}" y="{by+40:.0f}" text-anchor="end" data-nl="Naar de grens met Iran" data-en="To the Iranian border">Naar de grens met Iran</text>')
else:
    ex, ey = P(pts[-1][1], pts[-1][0])
    end = (f'<circle class="rm-end" cx="{ex:.1f}" cy="{ey:.1f}" r="7"/><text class="rm-place" x="{ex-16:.0f}" y="{ey+34:.0f}" text-anchor="end" '
           f'data-nl="Grens met Iran" data-en="Iranian border">Grens met Iran</text>')
svg = f'''<svg class="routemap" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Route van Leuven tot de grens met Iran">
<rect class="rm-sea" width="{W}" height="{H}"/>
<path class="rm-land" d="{''.join(land)}"/>
<path class="rm-on" d="{''.join(on)}"/>
<path class="rm-route" d="{rd}"/>
<g class="rm-labels">{labels}</g>
<circle class="rm-end" cx="{sx0:.1f}" cy="{sy0:.1f}" r="7"/><text class="rm-place rm-start" x="{sx0:.0f}" y="{sy0-16:.0f}" text-anchor="middle">Leuven</text>
{end}
</svg>'''
open('assets/route.svg', 'w').write(svg)
print(round(total, 1), 'km,', 'svg', len(svg)//1024, 'kB')
