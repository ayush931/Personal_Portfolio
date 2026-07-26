import os
from PIL import Image, ImageDraw, ImageFilter

def create_adaptive_favicon_svg():
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
  <style>
    /* Default / Light Theme */
    .bg-rect { fill: url(#bg-light); stroke: #2563eb; stroke-opacity: 0.85; }
    .grid-path { stroke: #2563eb; stroke-opacity: 0.16; }
    .corner-tick { stroke: #2563eb; stroke-opacity: 0.75; }
    .code-bracket { stroke: #0f172a; stroke-opacity: 0.85; }
    .a-leg { stroke: url(#cobalt-grad); }
    .a-bar { stroke: #0f172a; }
    .apex-node { fill: #2563eb; }
    .apex-inner { fill: #ffffff; }

    /* Dark Theme Preference */
    @media (prefers-color-scheme: dark) {
      .bg-rect { fill: url(#bg-dark); stroke: #2563eb; stroke-opacity: 0.5; }
      .grid-path { stroke: #2563eb; stroke-opacity: 0.22; }
      .corner-tick { stroke: #3b82f6; stroke-opacity: 0.6; }
      .code-bracket { stroke: #38bdf8; stroke-opacity: 0.75; }
      .a-bar { stroke: #38bdf8; }
      .apex-node { fill: #ffffff; }
      .apex-inner { fill: #38bdf8; }
    }
  </style>

  <defs>
    <!-- Background Gradient (Light Theme Canvas) -->
    <linearGradient id="bg-light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </linearGradient>

    <!-- Background Gradient (Dark Theme Canvas) -->
    <linearGradient id="bg-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="100%" stop-color="#111827" />
    </linearGradient>

    <!-- Cobalt Gradient -->
    <linearGradient id="cobalt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>

    <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
      <path class="grid-path" d="M 16 0 L 0 0 0 16" fill="none" stroke-width="0.8" />
    </pattern>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="0.8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Base Squircle Container -->
  <rect class="bg-rect" x="2" y="2" width="60" height="60" rx="14" stroke-width="1.8" />
  
  <!-- Blueprint Grid Overlay -->
  <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#grid)" />

  <!-- Corner Ticks -->
  <path class="corner-tick" d="M 8 13 V 8 H 13 M 51 8 H 56 V 13 M 8 51 V 56 H 13 M 56 51 V 56 H 51" 
        fill="none" stroke-width="1.4" stroke-linecap="round" />

  <!-- Code Brackets [ ] -->
  <path class="code-bracket" d="M 17 20 H 13 V 44 H 17" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path class="code-bracket" d="M 47 20 H 51 V 44 H 47" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Central 'A' Monogram -->
  <path class="a-leg" d="M 32 17 L 22 43" fill="none" stroke-width="3.8" stroke-linecap="round" filter="url(#glow)" />
  <path class="a-leg" d="M 32 17 L 42 43" fill="none" stroke-width="3.8" stroke-linecap="round" filter="url(#glow)" />
  <path class="a-bar" d="M 25.5 35 H 38.5" fill="none" stroke-width="2.5" stroke-linecap="round" />

  <!-- Blueprint Apex Node -->
  <circle class="apex-node" cx="32" cy="17" r="2.8" />
  <circle class="apex-inner" cx="32" cy="17" r="1.4" />

  <!-- Live Pulse Indicator Dot -->
  <circle cx="48" cy="14" r="2.6" fill="#65a30d" stroke="#ffffff" stroke-width="0.8" />
</svg>
'''
    return svg_content

def draw_supersampled_light_icon(size):
    scale = 4
    S = size * scale
    
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    radius = int(S * 0.22)
    padding = int(S * 0.03)
    
    bg_rect = [padding, padding, S - padding, S - padding]
    draw.rounded_rectangle(bg_rect, radius=radius, fill=(255, 255, 255, 255), outline=(37, 99, 235, 220), width=int(S * 0.03))
    
    grid_step = int(S / 4)
    for x in range(padding + grid_step, S - padding, grid_step):
        draw.line([(x, padding), (x, S - padding)], fill=(37, 99, 235, 40), width=int(S * 0.009))
    for y in range(padding + grid_step, S - padding, grid_step):
        draw.line([(padding, y), (S - padding, y)], fill=(37, 99, 235, 40), width=int(S * 0.009))

    tick_len = int(S * 0.08)
    margin = int(S * 0.12)
    stroke_w = int(S * 0.02)
    tick_color = (37, 99, 235, 210)
    
    draw.line([(margin, margin), (margin + tick_len, margin)], fill=tick_color, width=stroke_w)
    draw.line([(margin, margin), (margin, margin + tick_len)], fill=tick_color, width=stroke_w)
    draw.line([(S - margin - tick_len, margin), (S - margin, margin)], fill=tick_color, width=stroke_w)
    draw.line([(S - margin, margin), (S - margin, margin + tick_len)], fill=tick_color, width=stroke_w)
    draw.line([(margin, S - margin - tick_len), (margin, S - margin)], fill=tick_color, width=stroke_w)
    draw.line([(margin, S - margin), (margin + tick_len, S - margin)], fill=tick_color, width=stroke_w)
    draw.line([(S - margin - tick_len, S - margin), (S - margin, S - margin)], fill=tick_color, width=stroke_w)
    draw.line([(S - margin, S - margin - tick_len), (S - margin, S - margin)], fill=tick_color, width=stroke_w)

    b_top = int(S * 0.30)
    b_bot = int(S * 0.70)
    b_left_x = int(S * 0.21)
    b_right_x = int(S * 0.79)
    b_arm = int(S * 0.06)
    bracket_color = (15, 23, 42, 220)
    b_width = int(S * 0.03)

    draw.line([(b_left_x + b_arm, b_top), (b_left_x, b_top)], fill=bracket_color, width=b_width)
    draw.line([(b_left_x, b_top), (b_left_x, b_bot)], fill=bracket_color, width=b_width)
    draw.line([(b_left_x, b_bot), (b_left_x + b_arm, b_bot)], fill=bracket_color, width=b_width)
    draw.line([(b_right_x - b_arm, b_top), (b_right_x, b_top)], fill=bracket_color, width=b_width)
    draw.line([(b_right_x, b_top), (b_right_x, b_bot)], fill=bracket_color, width=b_width)
    draw.line([(b_right_x, b_bot), (b_right_x - b_arm, b_bot)], fill=bracket_color, width=b_width)

    apex = (int(S * 0.50), int(S * 0.26))
    left_foot = (int(S * 0.35), int(S * 0.68))
    right_foot = (int(S * 0.65), int(S * 0.68))
    cross_left = (int(S * 0.40), int(S * 0.55))
    cross_right = (int(S * 0.60), int(S * 0.55))
    
    a_width = int(S * 0.058)
    cobalt_main = (37, 99, 235, 255)
    dark_cross = (15, 23, 42, 255)

    draw.line([apex, left_foot], fill=cobalt_main, width=a_width)
    draw.line([apex, right_foot], fill=cobalt_main, width=a_width)
    draw.line([cross_left, cross_right], fill=dark_cross, width=int(S * 0.04))

    r_node = int(S * 0.048)
    draw.ellipse([apex[0] - r_node, apex[1] - r_node, apex[0] + r_node, apex[1] + r_node], fill=(37, 99, 235, 255))
    r_node_inner = int(S * 0.024)
    draw.ellipse([apex[0] - r_node_inner, apex[1] - r_node_inner, apex[0] + r_node_inner, apex[1] + r_node_inner], fill=(255, 255, 255, 255))

    dot_pos = (int(S * 0.75), int(S * 0.22))
    r_green = int(S * 0.042)
    draw.ellipse([dot_pos[0] - r_green, dot_pos[1] - r_green, dot_pos[0] + r_green, dot_pos[1] + r_green], fill=(101, 163, 13, 255))

    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

if __name__ == "__main__":
    svg = create_adaptive_favicon_svg()
    
    with open("app/icon.svg", "w") as f:
        f.write(svg)
    with open("public/icon.svg", "w") as f:
        f.write(svg)
    with open("public/favicon.svg", "w") as f:
        f.write(svg)

    img16 = draw_supersampled_light_icon(16)
    img32 = draw_supersampled_light_icon(32)
    img48 = draw_supersampled_light_icon(48)
    img180 = draw_supersampled_light_icon(180)
    img192 = draw_supersampled_light_icon(192)
    img512 = draw_supersampled_light_icon(512)

    img32.save("app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    img32.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

    img180.save("app/apple-icon.png", format="PNG")
    img180.save("public/apple-touch-icon.png", format="PNG")
    img192.save("public/icon-192.png", format="PNG")
    img512.save("public/icon-512.png", format="PNG")

    print("Light/Adaptive favicons successfully generated!")
