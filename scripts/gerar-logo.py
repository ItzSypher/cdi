"""Gera o logo da CDI em vetor a partir da geometria abaixo.

Saídas:
  public/cdi-logo.svg         selo completo, texto convertido em curvas (arquivo independente)
  src/lib/logo-geometry.ts    os mesmos paths, usados pelo componente animado do site

Uso: python3 scripts/gerar-logo.py
"""
import math
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "node_modules/@fontsource/manrope/files"

BLUE = "#1F6FEB"
BLUE_DEEP = "#0B4FC4"
INK = "#07090D"
WHITE = "#F4F7FB"


def text_path(text, weight, x_left, baseline, width, size, tracking=0.0):
    """Converte texto em um único path SVG, esticado para caber em `width`."""
    font = TTFont(FONT_DIR / f"manrope-latin-{weight}-normal.woff")
    upm = font["head"].unitsPerEm
    cmap = font.getBestCmap()
    glyphs = font.getGlyphSet()
    hmtx = font["hmtx"]
    scale = size / upm

    names = [cmap[ord(ch)] for ch in text]
    advances = [hmtx[n][0] * scale + tracking for n in names]
    natural = sum(advances) - tracking
    stretch = width / natural

    pen = SVGPathPen(glyphs)
    x = x_left
    for ch, name, adv in zip(text, names, advances):
        if ch != " ":
            tp = TransformPen(pen, (scale * stretch, 0, 0, -scale, x, baseline))
            glyphs[name].draw(tp)
        x += adv * stretch
    return pen.getCommands()


def crescent(cx, cy, rx, ry, rot_deg, a0, a1, w_max, steps=64):
    """Faixa curva que afina nas pontas (o 'swoosh' do logo)."""
    rot = math.radians(rot_deg)

    def pt(a, r_off):
        t = math.radians(a)
        x = (rx + r_off) * math.cos(t)
        y = (ry + r_off) * math.sin(t)
        return (
            cx + x * math.cos(rot) - y * math.sin(rot),
            cy + x * math.sin(rot) + y * math.cos(rot),
        )

    outer, inner = [], []
    for i in range(steps + 1):
        a = a0 + (a1 - a0) * i / steps
        w = w_max * math.sin(math.pi * i / steps) ** 0.8
        outer.append(pt(a, w / 2))
        inner.append(pt(a, -w / 2))
    pts = outer + inner[::-1]
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + " Z"


def snowflake(cx, cy, r):
    parts = []
    for k in range(6):
        a = math.radians(90 + k * 60)
        ex, ey = cx + r * math.cos(a), cy - r * math.sin(a)
        parts.append(f"M{cx:.1f} {cy:.1f} L{ex:.1f} {ey:.1f}")
        bx, by = cx + 0.6 * r * math.cos(a), cy - 0.6 * r * math.sin(a)
        for side in (-1, 1):
            b = a + side * math.radians(40)
            parts.append(
                f"M{bx:.1f} {by:.1f} L{bx + 0.32 * r * math.cos(b):.1f} {by - 0.32 * r * math.sin(b):.1f}"
            )
    return " ".join(parts)


geo = {
    # letras desenhadas como traço grosso (permite animar com pathLength)
    "letterC": "M262 167 H184 A47 47 0 0 0 137 214 V236 A47 47 0 0 0 184 283 H262",
    "letterD": "M292 283 V167 H366 A47 47 0 0 1 413 214 V236 A47 47 0 0 1 366 283 Z",
    "letterI": "M462 202 V300",
    "swooshTop": crescent(305, 228, 228, 92, -9, 148, 272, 26),
    "snowTop": snowflake(466, 166, 22),
    "snowLeft": snowflake(172, 454, 26),
    "acBody": "M238 428 H362 A8 8 0 0 1 370 436 V458 A8 8 0 0 1 362 466 H238 A8 8 0 0 1 230 458 V436 A8 8 0 0 1 238 428 Z",
    "acSlot": "M244 452 H356",
    "acAir": "M262 476 L256 492 M282 476 L279 492 M300 476 V492 M318 476 L321 492 M338 476 L344 492",
    "tools": "M407 445 L440 478 M393.6 423.8 A13 13 0 1 1 385.8 431.6 M436 434 L404 466",
    "toolsGrip": "M447 423 L436 434",
    "refrigeracao": text_path("REFRIGERAÇÃO", 800, 86, 372, 428, 54),
    "tagline": text_path("PEÇAS · INSTALAÇÃO · MANUTENÇÃO", 700, 98, 408, 404, 18, tracking=0.5),
    "rule": "M70 386 H530",
    # a faixa de baixo passa por baixo das letras, da esquerda para a direita
    "swooshBottom": crescent(305, 228, 228, 92, -9, -10, 115, 22),
}


def standalone_svg():
    stroke = f'fill="none" stroke-width="34" stroke-linejoin="miter"'
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img" aria-label="CDI Refrigeração">
  <defs>
    <linearGradient id="sw" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{WHITE}"/><stop offset="1" stop-color="{BLUE}"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="{BLUE}" stop-opacity="0"/><stop offset=".5" stop-color="{BLUE}"/><stop offset="1" stop-color="{BLUE}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <circle cx="300" cy="300" r="284" fill="{INK}" stroke="{BLUE}" stroke-width="16"/>
  <path d="{geo['swooshTop']}" fill="url(#sw)"/>
  <path d="{geo['swooshBottom']}" fill="{BLUE}"/>
  <path d="{geo['letterC']}" {stroke} stroke="{WHITE}"/>
  <path d="{geo['letterD']}" {stroke} stroke="{BLUE}"/>
  <path d="{geo['letterI']}" {stroke} stroke="{WHITE}"/>
  <path d="{geo['snowTop']}" fill="none" stroke="{WHITE}" stroke-width="4" stroke-linecap="round"/>
  <path d="{geo['refrigeracao']}" fill="{WHITE}"/>
  <path d="{geo['rule']}" stroke="url(#rule)" stroke-width="2"/>
  <path d="{geo['tagline']}" fill="{WHITE}"/>
  <path d="{geo['snowLeft']}" fill="none" stroke="{WHITE}" stroke-width="4" stroke-linecap="round"/>
  <path d="{geo['acBody']}" fill="{WHITE}"/>
  <path d="{geo['acSlot']}" stroke="{INK}" stroke-width="3"/>
  <path d="{geo['acAir']}" stroke="{BLUE}" stroke-width="3" stroke-linecap="round"/>
  <path d="{geo['tools']}" fill="none" stroke="{WHITE}" stroke-width="7" stroke-linecap="round"/>
  <path d="{geo['toolsGrip']}" stroke="{WHITE}" stroke-width="12" stroke-linecap="round"/>
</svg>
"""


(ROOT / "public/cdi-logo.svg").write_text(standalone_svg(), encoding="utf-8")

lines = ["// Gerado por scripts/gerar-logo.py. Não edite à mão.", "export const LOGO = {"]
for k, v in geo.items():
    lines.append(f'  {k}: "{v}",')
lines.append("} as const;")
lines.append(f'export const LOGO_COLORS = {{ blue: "{BLUE}", blueDeep: "{BLUE_DEEP}", ink: "{INK}", white: "{WHITE}" }} as const;')
(ROOT / "src/lib/logo-geometry.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("ok")
