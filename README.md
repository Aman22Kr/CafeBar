# Cafe Bar — Rooftop Lounge & Artisanal Dining

> A high-fidelity, multi-page static web application recreating the atmospheric dining, artisanal baking, and nightlife experience of **Tattva Bar & Cafe** under the new brand **Cafe Bar**.

---

## 🌟 Overview & Concept

Perched on the 7th floor overlooking the Mumbai skyline near the International Airport, **Cafe Bar** translates the Sanskrit philosophy of *Tattva* (Earth, Water, Fire, Air, Space) into an elevated dining and rooftop lounge destination:

- **Woodfired Sourdough Hearth**: 72-hour naturally leavened doughs blistered at 450°C.
- **Elemental Craft Mixology**: 35+ signature botanical cocktails, smoke-infused cloches, and zero-proof elixirs.
- **Morning Artisanal Viennoiserie & Coffee**: 72-layer butter croissants and single-origin nitrogen cold brews.
- **Nightlife & Events**: Soulful acoustic sunset sessions, DJ club nights, and VIP cabanas.
- **Bottom Partner Spotlight**: Curated ad placements above the footer across all views.

---

## 🚀 Key Features

| Module | Features |
| :--- | :--- |
| **Multi-Page Static Routing** | Built with `react-router-dom` using `HashRouter` for 100% reliable GitHub Pages direct linking and refresh survival. |
| **Digital Tasting Menu** | Interactive filters by Category, Dietary (`Veg`, `Non-Veg`), Chef's Specials, Live Keyword Search, and Price/Rating sorting. |
| **Item Detail View (`/menu/:slug`)** | Detailed culinary stories, ingredient profiles, sommelier pairings, allergen notices, and custom kitchen notes. |
| **VIP Table Booking Engine** | 3-step reservation flow (Guests, Occasion, Atmosphere, Date & Time, Contact) with instant printable **Digital VIP Table Pass**. |
| **Nightlife & Events** | Curated weekly schedule with Guestlist RSVP and Private Banquet/Birthday Inquiry form (10% celebration discount). |
| **Atmospheric Gallery** | Filterable high-definition photo gallery with interactive full-screen lightbox modal. |
| **Persistent Cart Drawer** | Persistent order building with table location selection, kitchen prep notes, subtotal, GST calculation, and order dispatch. |
| **Client-Side Persistence** | All cart items, reservations, favorites, and submitted inquiries are preserved safely in browser `localStorage`. |
| **Bottom Ad Section** | Curated sponsor showcase component seamlessly embedded at the bottom of every page. |

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8 with relative base path (`./`)
- **Styling**: Tailwind CSS v4 + Playfair Display & Plus Jakarta Sans typography
- **Routing**: React Router (HashRouter for static GitHub Pages)
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS Compositor transitions
- **State & Storage**: React Context + Browser `localStorage`

---

## 💻 Local Development

Clone the repository and run:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (port 3000)
npm run dev

# 3. Build production bundle for static hosting
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 🌐 GitHub Pages Deployment via GitHub Actions

This repository is pre-configured with a GitHub Actions workflow located at `.github/workflows/deploy.yml`.

### Step-by-Step Setup:

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Cafe Bar static multi-page release"
   git branch -M main
   git remote add origin https://github.com/Aman22kr/cafebar.git
   git push -u origin main
   ```

2. Enable GitHub Pages in your repository settings:
   - Go to your repository on GitHub: `https://github.com/Aman22kr/cafebar`
   - Navigate to **Settings** → **Pages**
   - Under **Build and deployment** → **Source**, select **GitHub Actions**

3. The automated deployment workflow will trigger on push to `main` and publish the site to:
   ```
   https://Aman22kr.github.io/cafebar/
   ```

Because this project utilizes `HashRouter` and relative asset paths (`base: './'`), the site works out-of-the-box without requiring 404 rewrite rules or custom server redirects.
