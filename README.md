# Royce Trieu — Portfolio Website

A modern, dark, single-page portfolio for an **IT Support Technician**.
No build step, no dependencies — just HTML, CSS, and a little vanilla
JavaScript. It's already populated with your real résumé content.

```
portfolio/
├── index.html        # Page content (edit your text here)
├── css/styles.css    # All styling (theme colors at the top)
├── js/script.js      # Scroll reveal, mobile menu, hover effects
└── assets/
    ├── Royce_Trieu_Resume_IT_Technician.pdf   # linked for download
    ├── Royce_Trieu_Resume_IT_Technician.docx
    ├── Royce_Trieu_Resume_Data_Entry.pdf      # linked for download
    └── Royce_Trieu_Resume_Data_Entry.docx
```

**Already filled in for you:** your name, contact info (christr0812@gmail.com,
(714) 677-7616, Alhambra CA), your LinkedIn, education (Cal Poly Pomona),
your full work history (LA County, Apple, Target, Tick Tick Times), skills,
and downloadable résumés in both PDF and Word.

## Customize it (the fun part)

Everything you need to change lives in `index.html`. Search for these and
replace with your real info:

- **Name & tagline** — the hero section near the top.
- **About** — your real story (there's a placeholder note in italics to delete).
- **Projects** — four `<article class="card">` blocks. Update the title,
  description, tags, and the two link `href="#"` (live demo + source).
- **Experience** — the `.tl-item` blocks (jobs + education). Edit titles,
  companies, dates, and descriptions.
- **Contact links** — update the GitHub / LinkedIn / Twitter URLs and the
  email address (it already uses royce.ptrieu@gmail.com).

### Change the colors

Open `css/styles.css` and edit the variables at the very top:

```css
:root {
  --bg: #0a0a0f;        /* page background       */
  --accent: #7c5cff;    /* primary accent (purple) */
  --accent-2: #00d4ff;  /* secondary accent (cyan) */
}
```

### Add a real photo

Put an image in `assets/` and replace the avatar letter in the About card:

```html
<!-- swap this -->
<div class="about__avatar">R</div>
<!-- for this -->
<img class="about__avatar" src="assets/me.jpg" alt="Royce" />
```

## Preview locally

Just open `index.html` in a browser, or run a tiny local server:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000

# or with Node
npx serve
```

## Deploy

### GitHub Pages (free)
1. Create a new GitHub repo and push these files to it.
2. Repo → **Settings → Pages**.
3. Under *Build and deployment*, set **Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/`.

### Netlify (free, drag-and-drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `portfolio` folder onto the page.
3. Done — you'll get a live URL instantly. Add a custom domain anytime in
   Site settings.

### Vercel
Run `npx vercel` in this folder and follow the prompts, or import the repo
at [vercel.com/new](https://vercel.com/new).

---

Built with care. Make it yours. ⚡
