## Brief project snapshot

- This repository is a small collection of static multi-page websites (HTML + CSS + images). No build system, no server-side code, no JS bundler.
- Major folders: `A web try/`, `try1/`, `WEB CV/`. Each contains an `index.html` and one or more `*.css` files. Images live in `A web try/images/`.

## Big picture & intent

- Purpose: simple static pages showcasing European capitals (Romanian content). Pages link to other pages using relative paths (e.g., `index.html`, `capitale.html`, `popular.html`). Keep links relative and preserve folder structure when moving files.
- Styling is split into multiple stylesheet files per folder (e.g., `style.css`, `home.css`, `capitale.css`, `popular.css`). Components are identified by class names such as `.capital-card`, section IDs like `#capitaleGrid`, and small data attributes like `data-region` used for filtering.

## Key files to inspect

- `A web try/index.html` — main landing page (uses `home.css`, `style.css`, `popular.css`). Good example of header/footer structure and Font Awesome CDN usage.
- `A web try/capitale.html` — list/grid of capitals. Shows patterns you'll likely need when adding behavior: `#searchInput`, `.capital-card[data-region="..."]`, images under `A web try/images/`.
- `A web try/style.css`, `A web try/home.css`, `A web try/capitale.css` — local styling conventions and variable naming (look for repeated selectors and layout rules here).

## Developer workflow notes

- No build step: open `*.html` files directly in a browser. For iterative edits, use a Live Server / simple static server to reload pages.
- When editing CSS for a page, prefer the CSS file colocated with that page (e.g., edit `A web try/capitale.css` for layout changes to `capitale.html`).
- Images are referenced by relative paths (e.g., `images/paris.jpg`); preserve relative structure when moving files.

## Patterns & conventions an AI should follow

- Preserve existing relative links and folder names (notably there are folders with spaces like `A web try` and `WEB CV`). Use the exact filenames shown in HTML.
- Use selectors that already exist: target `.capital-card`, `#capitaleGrid`, `#searchInput` when adding JS or tests. Example: filtering should use `data-region` on `.capital-card` elements.
- Keep language attribute `lang="ro"` in HTML files — content is Romanian.

## Integration points & external deps

- Font Awesome is loaded via CDN in `A web try/index.html`. No other external build tools or package manifests (no `package.json`, etc.).

## Safe modifications and low-risk enhancements

- Add minimal JS in the same folder (e.g., `A web try/main.js`) and reference it at the end of the relevant HTML if you need interactivity for `#searchInput` or filter dropdowns.
- Add a `README.md` per subfolder if you introduce a new feature that requires explanation (example: a small `A web try/README.md` describing the intended behavior of the search/filter UI).

## What not to change

- Don't rename files or change link targets unless you update all pages that reference them. Because pages link relatively, a rename will break navigation across the site.

## Examples (copy-paste friendly)

- To target the capital cards in `capitale.html` use: `.capital-card[data-region]` or `#capitaleGrid .capital-card`.
- To attach simple client-side filtering, query `document.querySelectorAll('.capital-card')` and read `el.dataset.region`.

---
If any part of this guidance is unclear or you'd like more detail (tests, sample JS for search/filtering, or a per-folder README), tell me which area and I'll iterate.
