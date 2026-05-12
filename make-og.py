"""
Generates og-image.png (1200×630) for Qlarify Health.

Design:
 - Dark navy (#1a4a6b) background
 - Rust (#f07030) diagonal right panel
 - Q monogram circle, "Qlarify Health" wordmark, tagline, domain
 - Subtle geometric accents
"""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630

# ── Colours ──────────────────────────────────────────────────────────────────
INK       = (26, 74, 107)      # #1a4a6b  dark navy
INK_DEEP  = (15, 40, 62)       # slightly darker for depth
RUST      = (240, 112, 48)     # #f07030
RUST_DK   = (208, 90, 24)      # #d05a18
WHITE     = (255, 255, 255)
SILVER    = (200, 216, 228)    # #c8d8e4  light blue-grey for tagline
PANEL_W   = 260                # right rust panel width

# ── Fonts ─────────────────────────────────────────────────────────────────────
FONT_DIR  = "/System/Library/Fonts"
SUPP      = f"{FONT_DIR}/Supplemental"

def load(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

font_brand   = load(f"{SUPP}/Georgia Bold.ttf",   88)   # "Qlarify"
font_health  = load(f"{SUPP}/Georgia Bold.ttf",   54)   # "Health"
font_tagline = load(f"{FONT_DIR}/HelveticaNeue.ttc", 30)
font_domain  = load(f"{FONT_DIR}/HelveticaNeue.ttc", 22)
font_mono    = load(f"{SUPP}/Georgia Bold.ttf",  320)   # watermark "Q"
font_badge   = load(f"{FONT_DIR}/HelveticaNeue.ttc", 20)

# ── Canvas ────────────────────────────────────────────────────────────────────
img  = Image.new("RGB", (W, H), INK)
draw = ImageDraw.Draw(img)

# ── Background gradient simulation (horizontal bands) ─────────────────────────
for y in range(H):
    t = y / H
    r = int(INK[0] * (1 - t * 0.18))
    g = int(INK[1] * (1 - t * 0.12))
    b = int(INK[2] * (1 - t * 0.08))
    draw.line([(0, y), (W - PANEL_W - 40, y)], fill=(r, g, b))

# ── Right rust panel with diagonal leading edge ──────────────────────────────
panel_x = W - PANEL_W
diag_offset = 80   # how far the diagonal cuts into the left

panel_poly = [
    (panel_x - diag_offset, 0),
    (W, 0),
    (W, H),
    (panel_x, H),
]
draw.polygon(panel_poly, fill=RUST)

# Darker rust strip on far right edge for depth
draw.rectangle([(W - 12, 0), (W, H)], fill=RUST_DK)

# ── Subtle horizontal rule across full width (behind panel) ──────────────────
draw.rectangle([(60, H - 72), (panel_x - diag_offset - 20, H - 69)], fill=(*RUST, 120) if hasattr(draw, 'alpha_composite') else RUST_DK)

# ── "Q" watermark on right panel (very faint) ────────────────────────────────
wm_img  = Image.new("RGBA", (PANEL_W + 60, H), (0, 0, 0, 0))
wm_draw = ImageDraw.Draw(wm_img)
wm_draw.text((-10, H // 2 - 200), "Q", font=font_mono, fill=(255, 255, 255, 28))
img.paste(wm_img, (panel_x - 30, 0), mask=wm_img)

# ── Left content area ─────────────────────────────────────────────────────────
LEFT_PAD   = 72
CONTENT_W  = panel_x - diag_offset - LEFT_PAD - 40

# Q monogram circle
CX, CY = LEFT_PAD + 36, 80
draw.ellipse([(CX - 36, CY - 36), (CX + 36, CY + 36)], fill=RUST)
font_q = load(f"{SUPP}/Georgia Bold.ttf", 40)
q_bbox = draw.textbbox((0, 0), "Q", font=font_q)
q_w    = q_bbox[2] - q_bbox[0]
q_h    = q_bbox[3] - q_bbox[1]
draw.text((CX - q_w // 2, CY - q_h // 2 - 2), "Q", font=font_q, fill=WHITE)

# ── Brand label beside circle ─────────────────────────────────────────────────
font_label = load(f"{FONT_DIR}/HelveticaNeue.ttc", 16)
draw.text((CX + 44, CY - 10), "QLARIFY HEALTH", font=font_label, fill=SILVER, spacing=3)

# ── Main wordmark: "Qlarify" ──────────────────────────────────────────────────
WORD_Y = 170
draw.text((LEFT_PAD, WORD_Y), "Qlarify", font=font_brand, fill=WHITE)

# "Health" on next line in rust
brand_bbox = draw.textbbox((LEFT_PAD, WORD_Y), "Qlarify", font=font_brand)
brand_h    = brand_bbox[3] - brand_bbox[1]
HEALTH_Y   = WORD_Y + brand_h + 4
draw.text((LEFT_PAD, HEALTH_Y), "Health", font=font_health, fill=RUST)

# ── Divider rule ──────────────────────────────────────────────────────────────
health_bbox = draw.textbbox((LEFT_PAD, HEALTH_Y), "Health", font=font_health)
health_h    = health_bbox[3] - health_bbox[1]
RULE_Y      = HEALTH_Y + health_h + 24
draw.rectangle([(LEFT_PAD, RULE_Y), (LEFT_PAD + 72, RULE_Y + 4)], fill=RUST)

# ── Tagline ───────────────────────────────────────────────────────────────────
TAGLINE_Y = RULE_Y + 26
tagline   = "India's Healthcare Marketing Agency"
draw.text((LEFT_PAD, TAGLINE_Y), tagline, font=font_tagline, fill=SILVER)

# ── Sub-tagline ───────────────────────────────────────────────────────────────
sub_y = TAGLINE_Y + 44
draw.text((LEFT_PAD, sub_y), "Video · SEO · Paid Media · OPD Growth", font=font_badge, fill=(*SILVER[:3],) , spacing=2)

# ── Domain ────────────────────────────────────────────────────────────────────
draw.text((LEFT_PAD, H - 54), "qlarify.health", font=font_domain, fill=RUST)

# ── Save ──────────────────────────────────────────────────────────────────────
out = os.path.join(os.path.dirname(__file__), "og-image.png")
img.save(out, "PNG", optimize=True)
print(f"✓ Saved {out}  ({W}×{H}px, {os.path.getsize(out)//1024}KB)")
