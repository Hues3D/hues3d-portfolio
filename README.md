# Hues Studios Devlog

Static site (plain HTML/CSS, no build step) documenting the development of a solo-built,
line-stylized survival game.

## Pages

- `index.html`: devlog home, with the latest entry featured plus the full entry list
- `game.html`: about the game (pillars, art direction, details)
- `about.html`: about the developer, plus contact links
- `devlog/*.html`: individual devlog entries

## Adding a devlog entry

1. Export images, then add web-sized copies to `assets/images/web/`:
   a full image around 1600px wide (`name.jpg`) and a thumbnail around 720px wide (`name-sm.jpg`).
   Keep originals in `assets/images/` if you like; they are only used for full-size zoom.
2. Copy `devlog/_template.html`, rename it, and fill in the ALL-CAPS placeholders.
3. In `index.html`:
   - Replace the **featured** entry with the new one.
   - Add a new `.post-row` at the **top** of `.post-list`. `data-tags` should be `art` or `update`
     (for a new tag such as `systems`, also add a matching button to `.filters`).
   - Update the **Progress** checklist if needed.
4. On the previous entry, add a "Next entry" link in its `.post-nav`.

Any `<img data-zoom="...">` opens in a full-screen lightbox when clicked.

## Styling

All styles live in `assets/css/style.css`. Colors are defined as variables at the top.
