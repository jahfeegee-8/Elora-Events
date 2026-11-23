# Elora Events — Marketing Website

A complete, production-ready multi-page marketing website for **Elora Events**, a Kempton Park, Johannesburg–based full-service event planning, decoration, and catering company.

---

## 📁 Folder Structure

```
elora-events/
├── index.html          ← Home page
├── about.html          ← About / Company Story
├── services.html       ← Services (Planning, Decoration, Catering)
├── gallery.html        ← Full image gallery with lightbox
├── contact.html        ← Contact form + map
├── css/
│   └── styles.css      ← All styles (design tokens, layout, components)
├── js/
│   └── main.js         ← Vanilla JavaScript (nav, lightbox, animations, form)
├── assets/
│   └── images/
│       ├── logo.jpg          ← Elora Events logo
│       ├── hero-bg.jpg       ← Hero background photo
│       ├── gallery-1.jpg     ← Boho picnic table setting
│       ├── gallery-2.jpg     ← Aerial picnic table
│       ├── gallery-3.jpg     ← Becoming Mrs Cele backdrop
│       ├── gallery-4.jpg     ← Marquee tent
│       ├── gallery-5.jpg     ← Outdoor canopy event
│       ├── gallery-6.jpg     ← Outdoor reception
│       ├── gallery-7.jpg     ← Formal table layout
│       ├── gallery-8.jpg     ← Birthday balloon/cake
│       ├── gallery-9.jpg     ← Festive celebration
│       ├── gallery-10.jpg    ← Floral centrepieces (blue/white)
│       ├── gallery-11.jpg    ← Styled marquee setup
│       ├── gallery-12.jpg    ← Pallet picnic with cushions
│       ├── gallery-13.jpg    ← Picnic closeup
│       ├── gallery-14.jpg    ← Evening outdoor event
│       ├── gallery-15.jpg    ← Themed party decor
│       ├── gallery-16.jpg    ← Formal dinner table
│       └── gallery-17.jpg    ← Draped ceiling reception
└── README.md
```

---

## 🚀 Running Locally

### Option 1 — Open directly in browser
Simply open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari). The site is pure HTML/CSS/JS with no build step required.

> **Note:** The Google Maps embed on the contact page requires an internet connection to load. All other features work offline.

### Option 2 — Local dev server (recommended for full feature parity)
If you want live-reload during editing, use any static server:

```bash
# With Node.js / npx
npx serve .

# With Python 3
python -m http.server 3000

# With VS Code: install "Live Server" extension, right-click index.html → Open with Live Server
```

Then navigate to `http://localhost:3000` (or whatever port is shown).

---

## 🎨 Brand System

### Colour Palette (CSS Custom Properties in `:root`)

| Token | Value | Use |
|---|---|---|
| `--color-pink` | `#EC4899` | Primary CTA buttons, accents, hover states |
| `--color-pink-dark` | `#BE185D` | Button hover, deep pink |
| `--color-pink-light` | `#F9A8D4` | Hero text accents, light overlays |
| `--color-green` | `#22A559` | Secondary accent, icon badges, green CTA |
| `--color-green-dark` | `#166534` | Utility bar background, deep text |
| `--color-green-light` | `#4ADE80` | Footer tints, light accents |
| `--color-blush` | `#FDF2F8` | Section backgrounds (pink tint) |
| `--color-sage` | `#F0FDF4` | Section backgrounds (green tint) |
| `--color-offwhite` | `#FFFBFA` | Body background |
| `--color-ink` | `#1F2937` | Body text, dark UI |

All colours are defined as CSS custom properties in `css/styles.css` for easy rebranding.

### Typography

| Role | Font | Source |
|---|---|---|
| Display headings | Cormorant Garamond | Google Fonts |
| Accent/script phrases | Great Vibes | Google Fonts |
| Body / UI / buttons | Inter | Google Fonts |

---

## ⚙️ JavaScript Features (`js/main.js`)

| Feature | Description |
|---|---|
| Sticky Nav | Box shadow appears after 20px scroll |
| Mobile Drawer | Hamburger → slide-in nav panel, closes on link click / outside click / Escape |
| Scroll Reveal | `IntersectionObserver`-based fade-up animation on `.reveal` elements |
| Hero Ken Burns | Subtle background image scale on page load |
| Counter Animation | Numbers count up when stats bar enters viewport |
| Lightbox | Click any gallery image → full-screen lightbox; keyboard arrows + touch swipe to navigate |
| Gallery Filters | Filter gallery by event category (Picnics, Decor, Birthdays, Formal) |
| Contact Form | Client-side validation + mailto: fallback; success state shown after submit |
| Active Nav Link | Highlights current page link |
| Footer Year | Auto-updates copyright year |

---

## 📋 TODO / Integration Notes

### Email / Form Backend
The contact form currently uses a `mailto:` fallback. To connect to a real backend, replace the form submission logic in `js/main.js` → `initContactForm()` with one of:

- **[Formspree](https://formspree.io/)** — add `action="https://formspree.io/f/YOUR_FORM_ID"` to `<form>` and remove the JS submit handler
- **[EmailJS](https://www.emailjs.com/)** — call `emailjs.sendForm()` inside the submit handler
- **[Netlify Forms](https://www.netlify.com/products/forms/)** — add `netlify` attribute to `<form>` if deploying on Netlify

### Email Address
The email `info@eloraevents.co.za` is a **placeholder**. Search for `TODO: replace with real email` in the codebase to find every occurrence. Replace with the actual email address when available.

### Analytics
Add Google Analytics or another tracking script before `</body>` on each page once the site is live.

### Deployment
Upload the entire `elora-events/` folder to any static hosting provider:
- [Netlify](https://netlify.com) (drag-and-drop deploy)
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com)
- Any shared web hosting (cPanel → public_html)

---

## 🧑‍🎨 Design Decisions & Assumptions

1. **Multi-page architecture** chosen over single-page: better for SEO, cleaner navigation, page-specific meta descriptions, and more predictable browser back-button behaviour for a business site this size.

2. **Tagline selected:** *"Where Every Detail Blooms"* — evokes both the floral/nature motif in the logo and the care-for-detail positioning. The alternatives considered were "Elevating Every Occasion" (more corporate) and "Every Moment, Perfectly Planned" (clearer on service, less poetic).

3. **Hero background image:** `IMG_0222.jpg` (outdoor table setup) was selected as it showcases the aesthetic without being event-specific; it overlays well with the gradient mask.

4. **Stats (150+ events, 98% happy clients, 5+ years):** Placeholder figures — replace with real data in `index.html` `data-target` attributes.

5. **Gallery categories:** Assigned based on visual inspection of the provided images. Adjust `data-category` attributes in `gallery.html` as needed.

6. **SVG icons:** All icons are inline SVG (Feather Icons / Heroicons style) — no icon library dependency, no extra HTTP requests.

7. **No CSS framework:** Vanilla CSS with custom properties gives maximum control and zero bloat. The stylesheet is ~700 lines with full comments.

8. **Responsive breakpoints:** 480px (phone), 768px (tablet), 1024px (desktop), 1280px (wide desktop). Mobile-first throughout.

---

## 📞 Business Details

| Field | Value |
|---|---|
| Business Name | Elora Events |
| Phone / WhatsApp | +27 78 021 6190 |
| Instagram | @eloraeventsee |
| Location | Kempton Park, Johannesburg, Gauteng |
| Email (placeholder) | info@eloraevents.co.za |
| WhatsApp link | [wa.me/27780216190](https://wa.me/27780216190) |

---

*Built with HTML5, vanilla CSS (custom properties, Flexbox, Grid), and vanilla JavaScript. No frameworks, no build tools, no dependencies — just open and go.*
