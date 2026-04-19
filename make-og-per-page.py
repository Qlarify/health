"""
Per-route Open Graph image generator for Qlarify Health.

For each route, renders a 1200x630 PNG with the route-specific headline
in large type. Reuses the brand template from make-og.py
(navy bg + rust diagonal panel + Q monogram).

Output: og-images/<route-id>.png

Run after editing this file's `pages` dict, or after adding a new route:
    python3 make-og-per-page.py

The build script then copies og-images/ into dist/ and points each
route's <meta property="og:image"> at the matching file.

NOTE: keep the `pages` dict here in sync with build.js. Source of truth
for routes is build.js — this file just owns the per-route OG headline.
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ── Per-route headline + sub-tagline ─────────────────────────────────────────
# Two-line headline (line1, line2) + short sub-line. Keep line1+line2 short
# enough that they fit at ~88pt within 760px content width.
pages = {
    'home':                       ('Healthcare',  'Marketing Agency',  "India's specialist hospital marketing partner"),
    'video':                      ('Video as',    'Infrastructure',    'Patient-journey video systems for hospitals'),
    'seo':                        ('Hospital',    'SEO',               'Rank for what your patients actually search'),
    'paid':                       ('Paid Media',  'for Hospitals',     'Ads tracked to confirmed OPD appointment'),
    'social':                     ('Social Media','for Hospitals',     'Specialist-led content. Patient familiarity.'),
    'email':                      ('Email &',     'WhatsApp',          'Reactivate your patient database at lower CAC'),
    'opd':                        ('OPD',         'Growth',            'End-to-end patient acquisition for hospitals'),
    'about':                      ('About',       'Qlarify Health',    "Built from inside India's leading hospital systems"),
    'contact':                    ('Talk to',     'Qlarify Health',    'Free 30-min hospital marketing call'),
    'privacy':                    ('Privacy',     'Policy',            'How Qlarify Health protects your data'),
    'terms':                      ('Terms &',     'Conditions',        'Website use and acceptable use policies'),
    'blog':                       ('Hospital',    'Marketing Insights','Expert strategies for healthcare leaders'),
    'blog-hospital-marketing':    ('What is',     'Hospital Marketing?','The complete guide for healthcare leaders'),
    'blog-opd-footfall':          ('Increase',    'OPD Footfall',      '10 proven strategies for hospital growth'),
    'blog-video-marketing':       ('Video',       'for Hospitals',     'Why structured video systems work'),
    'blog-hospital-seo':          ('Hospital SEO','Ultimate Guide',    'Rank on Google for searches that bring patients'),
    'blog-healthcare-agency':     ('Healthcare',  'vs Agency',         'Why specialised matters for hospitals'),
    'blog-social-media-hospitals':('Social Media','Framework',         'A practical framework for hospital teams'),
    'blog-vs-generic-agencies':   ('Qlarify vs',  'Generic Agencies',  'A hospital CMO\'s decision framework'),
    'blog-in-house-vs-agency':    ('In-House vs', 'Agency',            'When to hire vs build hospital marketing'),
    'glossary':                   ('Hospital',    'Marketing Glossary','Definitions every hospital team should know'),
}

# ── Canvas + colours ─────────────────────────────────────────────────────────
W, H      = 1200, 630
INK       = (26, 74, 107)
INK_DEEP  = (15, 40, 62)
RUST      = (240, 112, 48)
RUST_DK   = (208, 90, 24)
WHITE     = (255, 255, 255)
SILVER    = (200, 216, 228)
PANEL_W   = 260

# ── Fonts ────────────────────────────────────────────────────────────────────
FONT_DIR = "/System/Library/Fonts"
SUPP     = f"{FONT_DIR}/Supplemental"

def load(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

font_label   = load(f"{FONT_DIR}/HelveticaNeue.ttc", 16)
font_q       = load(f"{SUPP}/Georgia Bold.ttf",      40)
font_brand   = load(f"{SUPP}/Georgia Bold.ttf",      78)   # headline lines
font_sub     = load(f"{FONT_DIR}/HelveticaNeue.ttc", 24)   # sub-tagline
font_domain  = load(f"{FONT_DIR}/HelveticaNeue.ttc", 22)
font_mono    = load(f"{SUPP}/Georgia Bold.ttf",     320)   # watermark Q

# Auto-fit headline so longer titles don't overflow content width
def fit_headline(text: str, max_width: int, start_pt: int = 88, min_pt: int = 48) -> ImageFont.ImageFont:
    pt = start_pt
    while pt >= min_pt:
        f = load(f"{SUPP}/Georgia Bold.ttf", pt)
        # Use a temp draw to measure
        tmp_img = Image.new("RGB", (10, 10))
        tmp = ImageDraw.Draw(tmp_img)
        bbox = tmp.textbbox((0, 0), text, font=f)
        if (bbox[2] - bbox[0]) <= max_width:
            return f
        pt -= 4
    return load(f"{SUPP}/Georgia Bold.ttf", min_pt)


def render(route_id: str, line1: str, line2: str, sub: str, out_dir: str) -> None:
    img  = Image.new("RGB", (W, H), INK)
    draw = ImageDraw.Draw(img)

    # ── Background gradient (navy → slightly darker bottom) ──────────────
    for y in range(H):
        t = y / H
        r = int(INK[0] * (1 - t * 0.18))
        g = int(INK[1] * (1 - t * 0.12))
        b = int(INK[2] * (1 - t * 0.08))
        draw.line([(0, y), (W - PANEL_W - 40, y)], fill=(r, g, b))

    # ── Right rust diagonal panel ────────────────────────────────────────
    panel_x     = W - PANEL_W
    diag_offset = 80
    draw.polygon(
        [(panel_x - diag_offset, 0), (W, 0), (W, H), (panel_x, H)],
        fill=RUST,
    )
    draw.rectangle([(W - 12, 0), (W, H)], fill=RUST_DK)

    # ── Faint Q watermark on rust panel ──────────────────────────────────
    wm_img  = Image.new("RGBA", (PANEL_W + 60, H), (0, 0, 0, 0))
    wm_draw = ImageDraw.Draw(wm_img)
    wm_draw.text((-10, H // 2 - 200), "Q", font=font_mono, fill=(255, 255, 255, 28))
    img.paste(wm_img, (panel_x - 30, 0), mask=wm_img)

    # ── Top-left Q monogram + brand label ────────────────────────────────
    LEFT_PAD = 72
    CX, CY   = LEFT_PAD + 36, 80
    draw.ellipse([(CX - 36, CY - 36), (CX + 36, CY + 36)], fill=RUST)
    qb = draw.textbbox((0, 0), "Q", font=font_q)
    draw.text((CX - (qb[2] - qb[0]) // 2, CY - (qb[3] - qb[1]) // 2 - 2),
              "Q", font=font_q, fill=WHITE)
    draw.text((CX + 44, CY - 10), "QLARIFY HEALTH", font=font_label, fill=SILVER, spacing=3)

    # ── Headline (auto-fit per line) ─────────────────────────────────────
    CONTENT_W = panel_x - diag_offset - LEFT_PAD - 40
    f1 = fit_headline(line1, CONTENT_W)
    f2 = fit_headline(line2, CONTENT_W)
    Y1 = 200
    draw.text((LEFT_PAD, Y1), line1, font=f1, fill=WHITE)
    b1 = draw.textbbox((LEFT_PAD, Y1), line1, font=f1)
    Y2 = b1[3] + 6
    draw.text((LEFT_PAD, Y2), line2, font=f2, fill=RUST)

    # ── Divider rule ─────────────────────────────────────────────────────
    b2 = draw.textbbox((LEFT_PAD, Y2), line2, font=f2)
    RULE_Y = b2[3] + 28
    draw.rectangle([(LEFT_PAD, RULE_Y), (LEFT_PAD + 72, RULE_Y + 4)], fill=RUST)

    # ── Sub-tagline ──────────────────────────────────────────────────────
    draw.text((LEFT_PAD, RULE_Y + 26), sub, font=font_sub, fill=SILVER)

    # ── Domain bottom-left ───────────────────────────────────────────────
    draw.text((LEFT_PAD, H - 54), "qlarify.health", font=font_domain, fill=RUST)

    out_path = os.path.join(out_dir, f"{route_id}.png")
    img.save(out_path, "PNG", optimize=True)
    print(f"  ✓ {route_id:<32s} → {os.path.basename(out_path)}  ({os.path.getsize(out_path)//1024} KB)")


def main() -> None:
    here    = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(here, "og-images")
    os.makedirs(out_dir, exist_ok=True)
    print(f"Generating {len(pages)} per-route OG images → og-images/")
    for route_id, (l1, l2, sub) in pages.items():
        render(route_id, l1, l2, sub, out_dir)
    print("Done.")


if __name__ == "__main__":
    main()
