"""
Generates raster icons for iOS bookmarks and the PWA manifest.

Outputs:
  - apple-touch-icon.png   180×180  (iOS home-screen / Safari pinned tab)
  - icon-192.png           192×192  (manifest, Android home-screen)
  - icon-512.png           512×512  (manifest, splash + maskable)

Brand design mirrors the inline SVG favicon in index.html:
  - Navy (#1a4a6b) rounded square background
  - Cream (#f5f5f5) inner rounded square (the "viewport")
  - Navy magnifying-glass handle line
iOS will add its own rounded-corner mask, but the icon already looks clean
when squared off too.
"""

from PIL import Image, ImageDraw
import os

INK    = (26, 74, 107)
CREAM  = (245, 245, 245)
RUST   = (240, 112, 48)

# Reference geometry from the SVG (viewBox 0 0 64) so all sizes stay proportional
# Outer square:   x=2, y=2, w=60, h=60 (we use the full canvas as the navy bg)
# Inner square:   x=13, y=12, w=26, h=27
# Handle line:    (44,46) → (57,61), stroke 7, round caps

def render(size: int, *, ios: bool, out: str) -> None:
    s = size
    img = Image.new("RGBA", (s, s), INK + (255,))
    draw = ImageDraw.Draw(img)

    def sc(v: float) -> float:
        return v * s / 64.0

    # Inner cream square (a bit larger than the SVG so the brand reads at thumbnail size)
    inset_x = sc(13)
    inset_y = sc(12)
    inset_w = sc(26)
    inset_h = sc(27)
    radius  = sc(3)
    draw.rounded_rectangle(
        [(inset_x, inset_y), (inset_x + inset_w, inset_y + inset_h)],
        radius=radius,
        fill=CREAM,
    )

    # Magnifying-glass handle line (rust accent for stronger brand recall at small sizes)
    handle_w = max(2, int(sc(7)))
    draw.line(
        [(sc(44), sc(46)), (sc(57), sc(61))],
        fill=RUST,
        width=handle_w,
    )

    img.save(out, "PNG", optimize=True)
    print(f"  ✓ {os.path.basename(out):<24s} {s}×{s}px  {os.path.getsize(out)//1024}KB")


here = os.path.dirname(os.path.abspath(__file__))
render(180, ios=True,  out=os.path.join(here, "apple-touch-icon.png"))
render(192, ios=False, out=os.path.join(here, "icon-192.png"))
render(512, ios=False, out=os.path.join(here, "icon-512.png"))
print("Done.")
