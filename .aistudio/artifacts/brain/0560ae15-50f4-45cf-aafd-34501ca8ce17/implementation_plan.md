# Cafe Bar — Rooftop Lounge & Artisanal Dining

An upscale, multi-page static web application recreating the atmospheric dining and nightlife experience of Tattva Bar & Cafe under the brand identity **Cafe Bar**. Built with Vite, React, Tailwind CSS, Lucide icons, Framer Motion, and client-side persistence via browser `localStorage`.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The brand name is confirmed as **Cafe Bar** per your latest instruction:
> - **Brand Identity**: **Cafe Bar** (and **CafeBar**), presenting an upscale rooftop lounge, craft mixology, global small plates, artisanal bakery, and nightlife experience.
> - **Visual Aesthetic**: Atmospheric dark-luxe lounge palette (`#0B0D10` deep obsidian background, warm amber `#F59E0B`, vintage gold `#D97706`, and warm slate surfaces `#161A22`), inspired by the rooftop ambiance and natural elemental dining (Earth, Water, Fire, Air, Space).
> - **Interactive Highlights**: Fully functional digital menu with real-time search & filters, interactive table & event reservation engine with instant confirmation pass, persistent shopping bag/order drawer in `localStorage`, media lightbox gallery, and bottom sponsor/ad banners across all pages.
> - **GitHub Pages & Routing**: Hash-based client-side routing (`HashRouter` from `react-router-dom`) with standard Vite base path configuration ensuring zero-error direct navigation and refresh survival on static hosting.

---

## 1. Overview & Core Concept

- **What It Does**: Transposes the rich, multi-sensory rooftop dining concept of Tattva Bar & Cafe into the high-end **Cafe Bar** digital platform. Guests can explore seasonal tasting menus, artisanal bakery & craft cocktail collections, reserve tables with instant booking confirmation, view upcoming nightlife/DJ events, browse an atmospheric photo gallery, and assemble mock dining orders with persistent cart state.
- **Target Audience / Persona**: Urban diners, nightlife enthusiasts, cocktail connoisseurs, celebratory groups, and brunch lovers seeking an elevated artisanal dining and bar experience.
- **Key Value**: Captures the warm, soulful ambiance of a premier rooftop cafe and cocktail bar while providing seamless, fast client-side utilities (instant reservation passes, dietary filtering, persistent cart, interactive search).

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Home Experience**: Immersive cinematic hero banner showcasing rooftop golden hour & signature mixology $\to$ Quick Table Reservation widget $\to$ Culinary Philosophy & Elemental Dining highlights $\to$ Featured Menu Carousel $\to$ Upcoming Nightlife Events $\to$ Guest Testimonials $\to$ Sponsor/Ad section $\to$ Footer.
2. **Digital Menu & Discovery (`/menu`)**: Live search bar and category tabs (Small Plates & Tapas, Mains & Pizzas, Signature Cocktails, Artisanal Bakery & Brews, Decadent Desserts) $\to$ Dietary filters (Veg, Non-Veg, Chef's Special) $\to$ Dynamic pricing sort $\to$ One-click add-to-bag with micro-animations.
3. **Item Detail View (`/menu/:id`)**: High-res visual, ingredient story, taste notes, food & cocktail pairing recommendations, allergen guidance, customer review snippets, quantity selector, and instant order placement.
4. **Table & Event Reservations (`/reservations`)**: 3-step booking flow (Party Size & Occasion $\to$ Date, Time Slot & Seating Area: Rooftop Terrace, Indoor Lounge, or Private Booth $\to$ Contact Details & Dietary Notes) $\to$ Saves booking to `localStorage` and generates a downloadable/printable Reservation Confirmation Pass.
5. **Nightlife & Events (`/events`)**: Curated list of upcoming events (Acoustic Sunset Sessions, DOJA Nights, Weekend DJ sets, Festive banquets) with RSVP and private event booking inquiry form.
6. **Visual Gallery (`/gallery`)**: Filterable media grid (Ambiance, Mixology, Culinary, Private Gatherings) with full-screen lightbox modal.
7. **About Cafe Bar (`/about`)**: The 5-element philosophy (Earth, Water, Fire, Air, Space) woven into culinary craft, head chef profile, sustainability practices, and awards.
8. **Cart & Mock Order Flow (`/cart` & Slide Drawer)**: Persistent shopping bag with item quantity modifications, order notes, total calculation with taxes/discounts, and mock checkout receipt.
9. **Contact & Location (`/contact`)**: Opening hours, live operating status (Open/Closed indicator based on local time), address, interactive message form with localStorage feedback, interactive FAQ.
10. **Bottom Ad Placement**: A dedicated, clean, responsive sponsor/curated partner showcase at the bottom of every page as required by the specification.

### Visual Identity & Theme
- **Color Discipline (60-30-10)**:
  - `60% Neutral Canvas`: Deep velvety obsidian (`#0B0D10` background, `#12161F` body surfaces).
  - `30% Structural Surfaces`: Hairline borders (`rgba(255,255,255,0.08)`), dark slate card cards (`#181D27`), muted cream typography (`#E2E8F0` text, `#94A3B8` secondary).
  - `10% Accent Radiance`: Warm amber & burnished gold (`#F59E0B`, `#D97706`) for interactive CTAs, active filters, badge kickers, and hover highlights.
- **Typography**:
  - *Display / Headings*: Elegant high-contrast serif (`Playfair Display` or `Cinzel` display fallback) for brand voice, menu headers, and hero titles.
  - *Body Prose*: Clean, highly legible neo-grotesque (`Plus Jakarta Sans` / `Outfit`) with optical dark-mode compensation.
  - *Data & Pricing*: Tabular numbers (`tabular-nums`, `font-mono`) for menu prices, times, and reservation passes.
- **Top Bar Contract**:
  - `Zone 1 (Brand)`: Single wordmark element `Cafe Bar` with subtle subtitle in hero.
  - `Zone 2 (Nav)`: Clean single-line links (`Home`, `Menu`, `Reservations`, `Events`, `About`, `Gallery`, `Contact`).
  - `Zone 3 (Actions)`: Quick Search toggle, Cart drawer button with badge count, and primary "Book a Table" CTA button.

---

## 3. Key Product Decisions & Trade-Offs

- **Routing Strategy**: Use `HashRouter` from `react-router-dom` to guarantee 100% reliability on GitHub Pages static deployment without requiring custom server rewrites or 404 hacks.
- **State Persistence**: Store cart items, table reservations, favorite dishes, theme preferences, and submitted contact messages under a dedicated namespace `cafebar_app_state_v1` in `localStorage`.
- **Image Strategy**: Curate high-fidelity photography featuring authentic rooftop lounge ambiance, handcrafted cocktails, artisanal bakery items, and gourmet plates, paired with resilient styled CSS/SVG fallback wrappers to guarantee zero broken images.
- **Bottom Ad Section**: Implemented as a polished, modular component (`AdSection.tsx`) placed consistently above the footer across all views, featuring realistic partner highlights (e.g. Fine Wine Importers, Rooftop Jazz Festival, Gourmet Artisan Coffee Roasters).

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   App.tsx (HashRouter)                 │
└────────┬───────────────────┬───────────────────┬───────┘
         │                   │                   │
         ▼                   ▼                   ▼
┌──────────────────┐┌──────────────────┐┌──────────────────┐
│  Navbar (3-Zone) ││ Route View Pages ││   Cart Drawer    │
│  - Brand         ││  - HomePage      ││   & Lightbox     │
│  - Single Links  ││  - MenuPage      ││                  │
│  - Search & Cart ││  - MenuItemDetail││                  │
│  - Book Table CTA││  - ReservePage   ││                  │
└──────────────────┘│  - EventsPage    ││                  │
                    │  - AboutPage     ││                  │
                    │  - GalleryPage   ││                  │
                    │  - ContactPage   ││                  │
                    │  - NotFoundPage  ││                  │
                    └────────┬─────────┘└──────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Bottom Ad Banner│
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Unified Footer  │
                    └──────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│      Persistent Client State Layer (localStorage)      │
│  - Cart items & totals                                 │
│  - Confirmed Table Bookings & Passes                   │
│  - Saved Favorite Menu Items                           │
│  - Dietary Preferences & UI state                      │
└────────────────────────────────────────────────────────┘
```

---

## 5. Implementation Roadmap & Verification

1. **Setup Dependencies**: Install `react-router-dom` for client routing and verify existing packages (`lucide-react`, `motion`).
2. **Mock Data Layer (`src/data/`)**: Comprehensive data structures for menu items (tapas, pizzas, cocktails, desserts), events schedule, chef highlights, photo gallery, and advertising partners.
3. **Core State Hooks & Context (`src/context/`)**: Create CartContext & ReservationContext backed by safe `localStorage` read/write handlers.
4. **Layout Components (`src/components/`)**:
   - `Navbar`: 3-zone contract, sticky blur, responsive mobile drawer.
   - `Footer`: Hours, location, contact, social links, legal notices.
   - `AdSection`: Refined bottom sponsor banner present on every page.
   - `CartDrawer`: Slide-in cart with quantity adjustments and mock checkout.
   - `SearchModal`: Global search overlay filtering menu items and events.
5. **Page Implementations (`src/pages/`)**:
   - `HomePage`: Hero with video/curated visual, quick reservation widget, elemental story, signature tastes, reviews, events teaser.
   - `MenuPage`: Filterable category views, search bar, dietary toggles, card grid.
   - `MenuItemDetailPage`: Comprehensive individual dish/drink spotlight with pairings.
   - `ReservationsPage`: Step-by-step table booking with instant ticket pass.
   - `EventsPage`: Weekly nightlife lineup & private celebration booking.
   - `AboutPage`: Ambiance story, elemental culinary philosophy, team.
   - `GalleryPage`: Filterable photo gallery with full-screen modal.
   - `ContactPage`: Map preview, opening hours, contact form with saved feedback.
   - `NotFoundPage`: Atmospheric 404 page with return link.
6. **GitHub Pages & Build Config**:
   - Ensure Vite config supports base path for deployment.
   - Update `metadata.json` and `index.html` titles/descriptions for Cafe Bar.
   - Run compilation and verify zero errors across all components.
