#!/usr/bin/env python3
"""
ReinventOps - share card for the /partners referral page.

Mirrors assets/images/og-card-v3.png (the landing-page card): white ground,
primary lockup, eyebrow, H1 with one accent phrase, CTA pill, meta row.
The lockup is lifted pixel-for-pixel out of og-card-v3.png so the two cards
cannot drift apart.

Rules this encodes:
  * Brand palette only (#0F3D37 / #1B5C52 / #2E3338 / #8FA3B5), never the ad palette.
  * Headline is the page's own promise, letter-spaced -0.035em like the site H1.
    PIL has no tracking, so the line is drawn character by character.
  * When the art changes, CHANGE THE FILENAME - LinkedIn caches og:image by URL.

Usage: python3 make-og-partners.py <path to og-card-v3.png> <inter.ttf> <out.png>
"""
import sys
from PIL import Image, ImageDraw, ImageFont

SRC, INTER, OUT = sys.argv[1], sys.argv[2], sys.argv[3]

W, H = 1200, 630
BG = "#FFFFFF"
INK = "#2E3338"
ACCENT = "#0F3D37"
ACCENT_LIGHT = "#1B5C52"
SLATE = "#8FA3B5"

card = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(card)


def inter(size, weight):
    f = ImageFont.truetype(INTER, size)
    f.set_variation_by_axes([14.0, float(weight)])  # axes order: opsz, wght
    return f


# --- lockup, lifted from the landing-page card -------------------------------
src = Image.open(SRC).convert("RGB")
top = src.crop((0, 0, W, 170))
bbox = top.point(lambda v: 255 if v < 245 else 0).convert("L").getbbox()
lockup = src.crop((bbox[0], bbox[1], bbox[2], bbox[3]))
card.paste(lockup, (bbox[0], bbox[1]))


def tracked(text, font, y, fill, tracking, center=True, x=None, spans=None):
    """Draw text char by char with tracking. spans: list of (substring, colour)."""
    widths = [d.textlength(ch, font=font) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = (W - total) / 2 if center else x
    colours = [fill] * len(text)
    for sub, colour in (spans or []):
        i = text.find(sub)
        if i >= 0:
            for k in range(i, i + len(sub)):
                colours[k] = colour
    for ch, w, colour in zip(text, widths, colours):
        d.text((x, y), ch, font=font, fill=colour)
        x += w + tracking
    return total


# --- eyebrow -----------------------------------------------------------------
eyebrow_f = inter(20, 700)
tracked("PARTNER PROGRAM", eyebrow_f, 190, ACCENT_LIGHT, tracking=0.22 * 20)

# --- headline ----------------------------------------------------------------
h1 = inter(68, 900)
tracked("Know someone who'd be a fit?", h1, 232, INK, tracking=-0.035 * 68)
tracked(
    "Earn 10% of their first project.",
    h1,
    308,
    INK,
    tracking=-0.035 * 68,
    spans=[("10%", ACCENT)],
)

# --- CTA pill ----------------------------------------------------------------
pill_f = inter(21, 700)
label = "See How It Works"
text_w = d.textlength(label, font=pill_f)
arrow_w = 26
pad_x, pad_h = 36, 54
pill_w = text_w + arrow_w + pad_x * 2
pill_x = (W - pill_w) / 2
pill_y = 440
d.rounded_rectangle(
    [pill_x, pill_y, pill_x + pill_w, pill_y + pad_h], radius=4, fill=ACCENT
)
d.text((pill_x + pad_x, pill_y + 15), label, font=pill_f, fill="#FFFFFF")
ax = pill_x + pad_x + text_w + 14
ay = pill_y + pad_h / 2
d.line([(ax, ay), (ax + 15, ay)], fill="#FFFFFF", width=2)
d.line([(ax + 9, ay - 6), (ax + 15, ay), (ax + 9, ay + 6)], fill="#FFFFFF", width=2)

# --- meta row ----------------------------------------------------------------
meta_f = inter(19, 500)
parts = ["You just make the intro", "Paid in 5 business days", "Nothing to sign"]
gap, dot_gap = 0, 28
widths = [d.textlength(p, font=meta_f) for p in parts]
total = sum(widths) + dot_gap * 2 * (len(parts) - 1)
x = (W - total) / 2
for i, (p, w) in enumerate(zip(parts, widths)):
    d.text((x, 528), p, font=meta_f, fill=SLATE)
    x += w
    if i < len(parts) - 1:
        cx = x + dot_gap
        d.ellipse([cx - 2, 528 + 11, cx + 2, 528 + 15], fill="#C9D3DB")
        x += dot_gap * 2

card.save(OUT, "PNG", optimize=True)
print("wrote", OUT, card.size)
