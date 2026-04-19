"""
Slide-deck renderer for the public Video as Infrastructure page.

Renders 13 web-optimized slides (1600x900, 16:9) carrying the framework
narrative from the proposal deck. Brand template mirrors make-og.py /
make-og-per-page.py — same navy/rust palette, Georgia Bold headings,
Helvetica labels, Q-monogram corner mark.

Output: /slides/slide-01.png … slide-13.png
Run: python3 make-slides.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ── Canvas + brand ───────────────────────────────────────────────────────────
W, H        = 1600, 900
INK         = (26, 74, 107)
INK_DEEP    = (15, 40, 62)
RUST        = (240, 112, 48)
RUST_DK     = (208, 90, 24)
WHITE       = (255, 255, 255)
SILVER      = (200, 216, 228)
CREAM       = (241, 231, 210)
INK_LIGHT   = (44, 95, 132)
GREEN_OK    = (212, 234, 215)
AMBER_PART  = (251, 232, 196)
RED_GAP     = (245, 197, 176)

PAD_X       = 96
PAD_TOP     = 88

FONT_DIR = "/System/Library/Fonts"
SUPP     = f"{FONT_DIR}/Supplemental"

def load(path: str, size: int) -> ImageFont.ImageFont:
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

f_label   = load(f"{FONT_DIR}/HelveticaNeue.ttc", 18)
f_label_b = load(f"{SUPP}/Helvetica.ttc",          18)
f_eyebrow = load(f"{FONT_DIR}/HelveticaNeue.ttc", 22)
f_h1      = load(f"{SUPP}/Georgia Bold.ttf",      88)
f_h2      = load(f"{SUPP}/Georgia Bold.ttf",      54)
f_h3      = load(f"{SUPP}/Georgia Bold.ttf",      36)
f_q       = load(f"{SUPP}/Georgia Bold.ttf",      40)
f_body    = load(f"{FONT_DIR}/HelveticaNeue.ttc", 26)
f_body_md = load(f"{FONT_DIR}/HelveticaNeue.ttc", 22)
f_body_sm = load(f"{FONT_DIR}/HelveticaNeue.ttc", 18)
f_step_n  = load(f"{SUPP}/Georgia Bold.ttf",      72)
f_pg      = load(f"{FONT_DIR}/HelveticaNeue.ttc", 16)
f_quote   = load(f"{SUPP}/Georgia.ttf",            28)


def wrap(text: str, font: ImageFont.ImageFont, max_w: int) -> list[str]:
    if not text:
        return [""]
    words = text.split()
    lines, cur = [], ""
    tmp = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    for w in words:
        trial = (cur + " " + w).strip()
        if tmp.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def base_canvas(bg=CREAM) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(img)
    return img, draw


def chrome(draw: ImageDraw.ImageDraw, page_num: int, ink=INK):
    # Top-left Q monogram + brand name
    cx, cy = PAD_X + 22, 56
    draw.ellipse([(cx - 22, cy - 22), (cx + 22, cy + 22)], fill=RUST)
    qb = draw.textbbox((0, 0), "Q", font=f_label_b)
    draw.text((cx - (qb[2] - qb[0]) // 2, cy - (qb[3] - qb[1]) // 2 - 2),
              "Q", font=f_label_b, fill=WHITE)
    draw.text((cx + 30, cy - 9), "QLARIFY HEALTH", font=f_label, fill=ink, spacing=2)

    # Bottom rule + footer text
    draw.rectangle([(PAD_X, H - 60), (W - PAD_X, H - 59)], fill=ink)
    draw.text((PAD_X, H - 44), "qlarify.health   ·   Video as Infrastructure",
              font=f_pg, fill=ink)
    page_str = f"{page_num} / 13"
    pw = draw.textlength(page_str, font=f_pg)
    draw.text((W - PAD_X - pw, H - 44), page_str, font=f_pg, fill=ink)


def section_label(draw: ImageDraw.ImageDraw, label: str, num: str, ink=INK, accent=RUST):
    draw.text((PAD_X, PAD_TOP + 18), label, font=f_eyebrow, fill=accent, spacing=2)
    draw.text((PAD_X, PAD_TOP + 50), num, font=f_label, fill=ink, spacing=1)


# ── Slide builders ──────────────────────────────────────────────────────────

def slide_01_title():
    img, draw = base_canvas(INK)
    # Right rust diagonal panel
    panel_w = 360
    diag = 90
    draw.polygon([(W - panel_w - diag, 0), (W, 0), (W, H), (W - panel_w, H)], fill=RUST)
    draw.rectangle([(W - 14, 0), (W, H)], fill=RUST_DK)
    # Faint big Q on rust
    big_q = load(f"{SUPP}/Georgia Bold.ttf", 420)
    overlay = Image.new("RGBA", (panel_w + 80, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.text((-30, H // 2 - 260), "Q", font=big_q, fill=(255, 255, 255, 30))
    img.paste(overlay, (W - panel_w - 30, 0), mask=overlay)

    # Top-left brand
    cx, cy = PAD_X + 22, 64
    draw.ellipse([(cx - 22, cy - 22), (cx + 22, cy + 22)], fill=WHITE)
    qb = draw.textbbox((0, 0), "Q", font=f_label_b)
    draw.text((cx - (qb[2] - qb[0]) // 2, cy - (qb[3] - qb[1]) // 2 - 2),
              "Q", font=f_label_b, fill=INK)
    draw.text((cx + 30, cy - 9), "QLARIFY HEALTH", font=f_label, fill=SILVER, spacing=2)

    # Eyebrow + headline
    draw.text((PAD_X, 230), "PROPOSAL  ·  2026", font=f_eyebrow, fill=RUST, spacing=2)
    draw.text((PAD_X, 280), "Video as", font=f_h1, fill=WHITE)
    draw.text((PAD_X, 380), "Infrastructure.", font=f_h1, fill=RUST)

    # Sub
    sub = "A strategic framework for structuring hospital video content across the patient journey."
    for i, line in enumerate(wrap(sub, f_body, 880)):
        draw.text((PAD_X, 510 + i * 36), line, font=f_body, fill=SILVER)

    # Bottom domain
    draw.text((PAD_X, H - 80), "qlarify.health", font=f_eyebrow, fill=RUST)
    return img


def slide_02_observation():
    img, draw = base_canvas()
    section_label(draw, "THE OBSERVATION", "01.")

    draw.text((PAD_X, 230), "Hospitals don't have a", font=f_h2, fill=INK)
    draw.text((PAD_X, 296), "video", font=f_h2, fill=RUST)
    draw.text((PAD_X + 168, 296), "problem.", font=f_h2, fill=INK)
    draw.text((PAD_X, 380), "They have a", font=f_h2, fill=INK)
    draw.text((PAD_X + 320, 380), "structure", font=f_h2, fill=RUST)
    draw.text((PAD_X + 632, 380), "problem.", font=f_h2, fill=INK)

    body = ("India's best hospitals are producing more video than ever — doctor "
            "interviews, facility tours, patient stories, procedure explainers. "
            "Yet the patient watching at 11 PM still leaves confused, still calls "
            "a friend, still hesitates before booking.")
    for i, line in enumerate(wrap(body, f_body, W - 2 * PAD_X)):
        draw.text((PAD_X, 500 + i * 38), line, font=f_body, fill=INK_LIGHT)

    chrome(draw, 2)
    return img


def slide_03_reality():
    img, draw = base_canvas()
    section_label(draw, "THE CURRENT REALITY", "02.")
    draw.text((PAD_X, 240), "What patients experience today.", font=f_h3, fill=INK)
    draw.text((PAD_X, 296), "Three failure modes across the path to care.", font=f_body_md, fill=INK_LIGHT)

    cards = [
        ("01", "SCATTERED CONTENT",
         "Videos live across YouTube, Instagram, the website, WhatsApp forwards. No inventory. No one knows what exists."),
        ("02", "NO JOURNEY LOGIC",
         "A patient researching a knee replacement watches an anniversary reel, then a 2019 doctor interview. The order is accidental."),
        ("03", "NO SENSE OF THE GAP",
         "Some specialties have 40 videos. Others have 2. Pre-op is covered; post-op is silent. Nobody has mapped it."),
    ]
    card_w = (W - 2 * PAD_X - 32) // 3
    for i, (n, label, body) in enumerate(cards):
        x = PAD_X + i * (card_w + 16)
        y = 400
        draw.rectangle([(x, y), (x + card_w, y + 380)], fill=WHITE)
        draw.rectangle([(x, y), (x + card_w, y + 6)], fill=RUST)
        draw.text((x + 24, y + 28), n, font=f_step_n, fill=RUST)
        draw.text((x + 24, y + 124), label, font=f_label, fill=INK, spacing=2)
        for li, line in enumerate(wrap(body, f_body_sm, card_w - 48)):
            draw.text((x + 24, y + 168 + li * 26), line, font=f_body_sm, fill=INK_LIGHT)

    chrome(draw, 3)
    return img


def slide_04_shift():
    img, draw = base_canvas()
    section_label(draw, "THE SHIFT", "03.")
    draw.text((PAD_X, 240), "From video as", font=f_h3, fill=INK)
    draw.text((PAD_X + 320, 240), "assets", font=f_h3, fill=INK_LIGHT)
    draw.text((PAD_X + 460, 240), "to video as", font=f_h3, fill=INK)
    draw.text((PAD_X + 720, 240), "infrastructure.", font=f_h3, fill=RUST)

    # Definition card
    card_y = 340
    draw.rectangle([(PAD_X, card_y), (W - PAD_X, card_y + 200)], fill=INK)
    draw.text((PAD_X + 36, card_y + 28), "DEFINITION", font=f_label, fill=RUST, spacing=2)
    body = ("Treat video the way a hospital treats its information architecture — "
            "as a system with defined roles, clear coverage, and a logical path "
            "for every patient who enters it.")
    for i, line in enumerate(wrap(body, f_body, W - 2 * PAD_X - 72)):
        draw.text((PAD_X + 36, card_y + 70 + i * 36), line, font=f_body, fill=WHITE)

    # Before / After bar
    bar_y = 600
    half = (W - 2 * PAD_X - 24) // 2
    draw.rectangle([(PAD_X, bar_y), (PAD_X + half, bar_y + 130)], fill=WHITE)
    draw.rectangle([(PAD_X, bar_y), (PAD_X + half, bar_y + 6)], fill=INK_LIGHT)
    draw.text((PAD_X + 24, bar_y + 22), "BEFORE", font=f_label, fill=INK_LIGHT, spacing=2)
    draw.text((PAD_X + 24, bar_y + 56), "Isolated files.", font=f_body, fill=INK)

    x2 = PAD_X + half + 24
    draw.rectangle([(x2, bar_y), (x2 + half, bar_y + 130)], fill=WHITE)
    draw.rectangle([(x2, bar_y), (x2 + half, bar_y + 6)], fill=RUST)
    draw.text((x2 + 24, bar_y + 22), "AFTER", font=f_label, fill=RUST, spacing=2)
    draw.text((x2 + 24, bar_y + 56), "A navigable system.", font=f_body, fill=INK)

    chrome(draw, 4)
    return img


def slide_05_approach():
    img, draw = base_canvas()
    section_label(draw, "THE APPROACH", "04.")
    draw.text((PAD_X, 240), "Four moves, in order.", font=f_h3, fill=INK)
    draw.text((PAD_X, 296), "We don't start with a camera. We start with a map.", font=f_body_md, fill=INK_LIGHT)

    steps = [
        ("01", "AUDIT",     "Inventory every existing video across channels. Tag by specialty, stage, format, performance."),
        ("02", "MAP",       "Place each video on a two-axis grid: specialty × patient journey stage."),
        ("03", "IDENTIFY",  "Surface the gaps. Rank by patient volume and business impact."),
        ("04", "CREATE",    "Produce targeted video for the gaps that matter — tuned to viewer intent."),
    ]
    card_w = (W - 2 * PAD_X - 48) // 4
    for i, (n, label, body) in enumerate(steps):
        x = PAD_X + i * (card_w + 16)
        y = 400
        draw.rectangle([(x, y), (x + card_w, y + 380)], fill=WHITE)
        draw.rectangle([(x, y), (x + card_w, y + 6)], fill=RUST)
        draw.text((x + 22, y + 28), n, font=f_step_n, fill=RUST)
        draw.text((x + 22, y + 124), label, font=f_label_b, fill=INK, spacing=2)
        for li, line in enumerate(wrap(body, f_body_sm, card_w - 44)):
            draw.text((x + 22, y + 164 + li * 24), line, font=f_body_sm, fill=INK_LIGHT)

    chrome(draw, 5)
    return img


def slide_06_framework():
    img, draw = base_canvas()
    section_label(draw, "THE FRAMEWORK", "05.")
    draw.text((PAD_X, 240), "Video across the patient journey.", font=f_h3, fill=INK)
    draw.text((PAD_X, 296), "Each stage has a specific job. Video that works at one stage may fail at another.",
              font=f_body_md, fill=INK_LIGHT)

    stages = [
        ("AWARENESS",     "Educate",      "“I think something's wrong.”",   "Symptom explainers, condition primers, trust signals."),
        ("CONSIDERATION", "Credibilize",  "“Is this the right hospital?”",  "Doctor POVs, treatment walk-throughs, facility tours."),
        ("DECISION",      "Reassure",     "“Am I making the right call?”",  "Patient stories, what-to-expect, cost clarity."),
        ("POST-OP",       "Guide",        "“What happens now?”",            "Recovery protocols, red-flag signs, follow-up."),
    ]
    card_w = (W - 2 * PAD_X - 48) // 4
    for i, (st, job, q, body) in enumerate(stages):
        x = PAD_X + i * (card_w + 16)
        y = 400
        draw.rectangle([(x, y), (x + card_w, y + 380)], fill=WHITE)
        draw.text((x + 22, y + 26), st, font=f_label_b, fill=RUST, spacing=2)
        draw.text((x + 22, y + 60), job, font=f_h3, fill=INK)
        # quote in italic-ish via Georgia
        for li, line in enumerate(wrap(q, f_quote, card_w - 44)):
            draw.text((x + 22, y + 130 + li * 32), line, font=f_quote, fill=INK_LIGHT)
        for li, line in enumerate(wrap(body, f_body_sm, card_w - 44)):
            draw.text((x + 22, y + 250 + li * 24), line, font=f_body_sm, fill=INK_LIGHT)

    chrome(draw, 6)
    return img


def slide_07_matrix():
    img, draw = base_canvas()
    section_label(draw, "GAP IDENTIFICATION", "06.")
    draw.text((PAD_X, 240), "The matrix reveals the gaps.", font=f_h3, fill=INK)
    draw.text((PAD_X, 296), "Illustrative — your real matrix is built from your inventory in Phase 1.",
              font=f_body_md, fill=INK_LIGHT)

    # Table
    cols = ["Specialty", "Awareness", "Consideration", "Decision", "Post-op"]
    rows = [
        ("Cardiology",  ["Strong",  "Strong",  "Partial", "Gap"]),
        ("Orthopedics", ["Strong",  "Partial", "Partial", "Gap"]),
        ("Oncology",    ["Partial", "Strong",  "Gap",     "Gap"]),
        ("Maternity",   ["Strong",  "Partial", "Strong",  "Partial"]),
    ]
    cell_color = {"Strong": GREEN_OK, "Partial": AMBER_PART, "Gap": RED_GAP}

    tx, ty = PAD_X, 380
    col_w = (W - 2 * PAD_X) // 5
    row_h = 64

    # Header row
    draw.rectangle([(tx, ty), (tx + col_w * 5, ty + row_h)], fill=INK)
    for ci, c in enumerate(cols):
        draw.text((tx + ci * col_w + 18, ty + 18), c, font=f_body_md, fill=WHITE)
    # Data rows
    for ri, (sp, vals) in enumerate(rows):
        y = ty + (ri + 1) * row_h
        draw.rectangle([(tx, y), (tx + col_w, y + row_h)], fill=WHITE)
        draw.text((tx + 18, y + 18), sp, font=f_body_md, fill=INK)
        for ci, val in enumerate(vals):
            x = tx + (ci + 1) * col_w
            draw.rectangle([(x, y), (x + col_w, y + row_h)], fill=cell_color[val])
            tw = draw.textlength(val, font=f_body_md)
            draw.text((x + (col_w - tw) // 2, y + 18), val, font=f_body_md, fill=INK)

    # Legend
    ly = ty + row_h * 5 + 24
    items = [("Strong coverage", GREEN_OK), ("Partial coverage", AMBER_PART), ("Gap — priority area", RED_GAP)]
    lx = PAD_X
    for label, color in items:
        draw.rectangle([(lx, ly + 4), (lx + 18, ly + 22)], fill=color)
        draw.text((lx + 28, ly), label, font=f_body_sm, fill=INK)
        lx += draw.textlength(label, font=f_body_sm) + 80

    chrome(draw, 7)
    return img


def slide_08_transformation():
    img, draw = base_canvas()
    section_label(draw, "THE TRANSFORMATION", "07.")
    draw.text((PAD_X, 240), "From", font=f_h3, fill=INK)
    draw.text((PAD_X + 110, 240), "content", font=f_h3, fill=INK_LIGHT)
    draw.text((PAD_X + 270, 240), "to", font=f_h3, fill=INK)
    draw.text((PAD_X + 320, 240), "clarity.", font=f_h3, fill=RUST)

    half = (W - 2 * PAD_X - 24) // 2
    cy = 340
    # Before
    draw.rectangle([(PAD_X, cy), (PAD_X + half, cy + 460)], fill=WHITE)
    draw.rectangle([(PAD_X, cy), (PAD_X + half, cy + 6)], fill=INK_LIGHT)
    draw.text((PAD_X + 28, cy + 28), "BEFORE", font=f_label_b, fill=INK_LIGHT, spacing=2)
    draw.text((PAD_X + 28, cy + 64), "Scattered assets.", font=f_h3, fill=INK)
    bullets_b = [
        "Videos exist everywhere, tracked nowhere.",
        "Volume mistaken for strategy.",
        "Patients consume in random order.",
        "Gaps invisible until leadership asks.",
    ]
    for i, b in enumerate(bullets_b):
        draw.text((PAD_X + 28, cy + 160 + i * 56), "—  " + b, font=f_body_md, fill=INK_LIGHT)

    # After
    x2 = PAD_X + half + 24
    draw.rectangle([(x2, cy), (x2 + half, cy + 460)], fill=WHITE)
    draw.rectangle([(x2, cy), (x2 + half, cy + 6)], fill=RUST)
    draw.text((x2 + 28, cy + 28), "AFTER", font=f_label_b, fill=RUST, spacing=2)
    draw.text((x2 + 28, cy + 64), "A navigable system.", font=f_h3, fill=INK)
    bullets_a = [
        "Full inventory, mapped by specialty + stage.",
        "Every asset has a defined role.",
        "Patient pathways designed end-to-end.",
        "Gaps ranked. Next video is obvious.",
    ]
    for i, b in enumerate(bullets_a):
        draw.text((x2 + 28, cy + 160 + i * 56), "✓  " + b, font=f_body_md, fill=INK)

    chrome(draw, 8)
    return img


def slide_09_engagement():
    img, draw = base_canvas()
    section_label(draw, "ENGAGEMENT MODEL", "08.")
    draw.text((PAD_X, 240), "How we'd work together.", font=f_h3, fill=INK)
    draw.text((PAD_X, 296), "A phased engagement. Start with audit, expand on proven value.",
              font=f_body_md, fill=INK_LIGHT)

    # Recommended pill
    pill = "RECOMMENDED FIRST STEP — Phases 1–3 as a 4–5 week pilot audit."
    draw.rectangle([(PAD_X, 350), (W - PAD_X, 396)], fill=INK)
    draw.text((PAD_X + 22, 360), pill, font=f_body_md, fill=WHITE)

    rows = [
        ("01", "Audit",                   "2 weeks",   "Full inventory across channels. Tagging, performance read."),
        ("02", "Strategy & Mapping",      "2 weeks",   "Build the specialty × journey matrix with marketing + clinical."),
        ("03", "Gap Identification",      "1 week",    "Ranked list of gaps. Impact-weighted by volume and conversion."),
        ("04", "Targeted Production",     "Ongoing",   "Produce videos to close priority gaps first. Measured rollouts."),
        ("05", "Optimization",            "Quarterly", "Measure performance, refresh underperformers, evolve the matrix."),
    ]
    ry = 430
    rh = 70
    for i, (n, name, dur, body) in enumerate(rows):
        y = ry + i * rh
        bg = WHITE if i % 2 == 0 else (245, 240, 228)
        draw.rectangle([(PAD_X, y), (W - PAD_X, y + rh - 6)], fill=bg)
        draw.text((PAD_X + 22, y + 22), n,    font=f_body, fill=RUST)
        draw.text((PAD_X + 90, y + 22), name, font=f_body, fill=INK)
        draw.text((PAD_X + 480, y + 22), dur, font=f_body_md, fill=INK_LIGHT)
        draw.text((PAD_X + 660, y + 22), body, font=f_body_sm, fill=INK_LIGHT)

    chrome(draw, 9)
    return img


def slide_10_impact():
    img, draw = base_canvas()
    section_label(draw, "BUSINESS IMPACT", "09.")
    draw.text((PAD_X, 240), "What changes downstream.", font=f_h3, fill=INK)
    draw.text((PAD_X, 296), "Four levers your marketing team already reports on.",
              font=f_body_md, fill=INK_LIGHT)

    cards = [
        ("PATIENT UNDERSTANDING", "Informed choice",
         "Patients arrive at consultation already oriented. Less clinician time on basics, more on decisions."),
        ("TRUST", "Fewer hesitations",
         "Doctor credibility, facility clarity, and patient stories move trust from implicit to demonstrable."),
        ("CONVERSION", "Shorter paths to booking",
         "When the next video answers the next question, the patient keeps moving instead of researching elsewhere."),
        ("BRAND", "A distinctive voice",
         "Most hospital video looks the same. A structured system is also a branded system — owned and recognizable."),
    ]
    card_w = (W - 2 * PAD_X - 24) // 2
    for i, (lbl, head, body) in enumerate(cards):
        col, row = i % 2, i // 2
        x = PAD_X + col * (card_w + 24)
        y = 400 + row * 220
        draw.rectangle([(x, y), (x + card_w, y + 200)], fill=WHITE)
        draw.rectangle([(x, y), (x + 6, y + 200)], fill=RUST)
        draw.text((x + 28, y + 22), lbl,  font=f_label_b, fill=RUST, spacing=2)
        draw.text((x + 28, y + 56), head, font=f_h3, fill=INK)
        for li, line in enumerate(wrap(body, f_body_sm, card_w - 56)):
            draw.text((x + 28, y + 124 + li * 24), line, font=f_body_sm, fill=INK_LIGHT)

    chrome(draw, 10)
    return img


def slide_11_why_qlarify():
    img, draw = base_canvas()
    section_label(draw, "WHY QLARIFY", "10.")
    draw.text((PAD_X, 240), "Built for healthcare. Not adapted to it.", font=f_h3, fill=INK)

    # Stats row
    stats = [("10+", "years of healthcare video focus"),
             ("10,000+", "videos produced for healthcare brands"),
             ("1", "focus — video as infrastructure")]
    sy = 340
    sw = (W - 2 * PAD_X - 32) // 3
    for i, (n, l) in enumerate(stats):
        x = PAD_X + i * (sw + 16)
        draw.rectangle([(x, sy), (x + sw, sy + 160)], fill=INK)
        draw.text((x + 28, sy + 22), n, font=f_h2, fill=RUST)
        for li, line in enumerate(wrap(l, f_body_sm, sw - 56)):
            draw.text((x + 28, sy + 110 + li * 24), line, font=f_body_sm, fill=SILVER)

    # Three principles
    principles = [
        ("Patient-first storytelling",
         "Every frame is built around the person watching, not the institution shooting."),
        ("Clinical credibility",
         "Medical accuracy is non-negotiable. We work alongside clinicians, not around them."),
        ("Systems thinking",
         "We think in journeys and matrices before scripts — which is why our output compounds."),
    ]
    py = 540
    pw = (W - 2 * PAD_X - 32) // 3
    for i, (h, b) in enumerate(principles):
        x = PAD_X + i * (pw + 16)
        draw.rectangle([(x, py), (x + pw, py + 240)], fill=WHITE)
        draw.rectangle([(x, py), (x + 6, py + 240)], fill=RUST)
        draw.text((x + 22, py + 22), h, font=f_body, fill=INK)
        for li, line in enumerate(wrap(b, f_body_sm, pw - 44)):
            draw.text((x + 22, py + 90 + li * 24), line, font=f_body_sm, fill=INK_LIGHT)

    chrome(draw, 11)
    return img


def slide_12_sample_work():
    img, draw = base_canvas()
    section_label(draw, "SAMPLE WORK", "11.")
    draw.text((PAD_X, 240), "Selected case examples.", font=f_h3, fill=INK)
    draw.text((PAD_X, 296),
              "A curated set demonstrating journey-stage fit and production craft.",
              font=f_body_md, fill=INK_LIGHT)

    tiles = [
        ("AWARENESS",     "Symptom-Explainer Series",
         "60-second condition primers — early funnel patient education."),
        ("CONSIDERATION", "Surgeon-Led Walk-through",
         "Specialist explains procedure, recovery, and outcomes on camera."),
        ("DECISION / POST-OP", "Patient Recovery Story",
         "Real patient testimonial covering decision, treatment, and follow-up."),
    ]
    ty = 380
    tw = (W - 2 * PAD_X - 32) // 3
    th = 380
    for i, (stage, name, body) in enumerate(tiles):
        x = PAD_X + i * (tw + 16)
        # Video poster placeholder
        draw.rectangle([(x, ty), (x + tw, ty + 200)], fill=INK)
        # Play triangle
        cx, cy = x + tw // 2, ty + 100
        draw.ellipse([(cx - 36, cy - 36), (cx + 36, cy + 36)], fill=WHITE)
        draw.polygon([(cx - 12, cy - 18), (cx - 12, cy + 18), (cx + 22, cy)], fill=INK)

        draw.rectangle([(x, ty + 200), (x + tw, ty + th)], fill=WHITE)
        draw.text((x + 22, ty + 220), stage, font=f_label_b, fill=RUST, spacing=2)
        draw.text((x + 22, ty + 250), name, font=f_body, fill=INK)
        for li, line in enumerate(wrap(body, f_body_sm, tw - 44)):
            draw.text((x + 22, ty + 296 + li * 22), line, font=f_body_sm, fill=INK_LIGHT)

    chrome(draw, 12)
    return img


def slide_13_next_steps():
    img, draw = base_canvas(INK)
    # Override chrome colours for dark slide
    cx, cy = PAD_X + 22, 56
    draw.ellipse([(cx - 22, cy - 22), (cx + 22, cy + 22)], fill=RUST)
    qb = draw.textbbox((0, 0), "Q", font=f_label_b)
    draw.text((cx - (qb[2] - qb[0]) // 2, cy - (qb[3] - qb[1]) // 2 - 2),
              "Q", font=f_label_b, fill=WHITE)
    draw.text((cx + 30, cy - 9), "QLARIFY HEALTH", font=f_label, fill=SILVER, spacing=2)

    draw.text((PAD_X, 200), "NEXT STEPS  ·  12.", font=f_eyebrow, fill=RUST, spacing=2)
    draw.text((PAD_X, 250), "Let's start with a", font=f_h3, fill=WHITE)
    draw.text((PAD_X + 380, 250), "2-week", font=f_h3, fill=RUST)
    draw.text((PAD_X + 540, 250), "audit.", font=f_h3, fill=WHITE)

    body = ("We'd like to propose a low-commitment first engagement: a structured "
            "audit of your hospital's existing video content, mapped against the "
            "patient journey, with a prioritized gap report delivered at the end.")
    for i, line in enumerate(wrap(body, f_body, W - 2 * PAD_X)):
        draw.text((PAD_X, 360 + i * 38), line, font=f_body, fill=SILVER)

    # CTA pill
    by = 580
    btn_text = "Schedule a 30-min call  →"
    bw = draw.textlength(btn_text, font=f_body) + 64
    draw.rectangle([(PAD_X, by), (PAD_X + bw, by + 60)], fill=RUST)
    draw.text((PAD_X + 32, by + 14), btn_text, font=f_body, fill=WHITE)

    # Contact
    draw.text((PAD_X, 700), "CONTACT", font=f_label, fill=RUST, spacing=2)
    draw.text((PAD_X, 730), "Qlarify Health  ·  hello@qlarify.health  ·  qlarify.health",
              font=f_body_md, fill=SILVER)

    # Footer rule + page
    draw.rectangle([(PAD_X, H - 60), (W - PAD_X, H - 59)], fill=SILVER)
    draw.text((PAD_X, H - 44), "qlarify.health   ·   Video as Infrastructure",
              font=f_pg, fill=SILVER)
    pg = "13 / 13"
    pw_ = draw.textlength(pg, font=f_pg)
    draw.text((W - PAD_X - pw_, H - 44), pg, font=f_pg, fill=SILVER)
    return img


# ── Driver ───────────────────────────────────────────────────────────────────
SLIDES = [
    ("slide-01", slide_01_title,          "Title — Video as Infrastructure"),
    ("slide-02", slide_02_observation,    "The Observation"),
    ("slide-03", slide_03_reality,        "The Current Reality"),
    ("slide-04", slide_04_shift,          "The Shift"),
    ("slide-05", slide_05_approach,       "The Approach"),
    ("slide-06", slide_06_framework,      "The Framework"),
    ("slide-07", slide_07_matrix,         "Gap Identification"),
    ("slide-08", slide_08_transformation, "The Transformation"),
    ("slide-09", slide_09_engagement,     "Engagement Model"),
    ("slide-10", slide_10_impact,         "Business Impact"),
    ("slide-11", slide_11_why_qlarify,    "Why Qlarify"),
    ("slide-12", slide_12_sample_work,    "Sample Work"),
    ("slide-13", slide_13_next_steps,     "Next Steps"),
]


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(here, "slides")
    os.makedirs(out_dir, exist_ok=True)
    print(f"Generating {len(SLIDES)} slides → slides/")
    for fn, builder, label in SLIDES:
        img = builder()
        path = os.path.join(out_dir, fn + ".png")
        img.save(path, "PNG", optimize=True)
        kb = os.path.getsize(path) // 1024
        print(f"  ✓ {fn}.png  ({label})  {kb} KB")
    print("Done.")


if __name__ == "__main__":
    main()
