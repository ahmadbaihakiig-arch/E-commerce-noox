# Nook

A curated e-commerce landing page built with vanilla TypeScript and Vite. Features API integration, shopping cart, wishlist, and a smooth mobile-first experience.

![Nook Preview](public/images/hero-desktop.webp)

---

## Overview

Nook is a single-page e-commerce demo that pulls product data from the DummyJSON API. It focuses on delivering a premium browsing experience with minimal dependencies and smooth interactions, prioritizing performance over framework bloat.

The project demonstrates a modular architecture where each feature lives in its own folder, keeping the codebase maintainable as it grows.

---

## Features

### Product Catalog
- Fetches products from DummyJSON API with pagination
- Category filter with quick chips (Smartphones, Laptops, Fragrances, Skincare, Groceries, Decor)
- Sort options: Newest, Price low to high, Price high to low, Top rated
- Load more button for infinite scrolling style navigation
- Skeleton loading state with shimmer effect
- Error and empty states designed with proper visual feedback

### Product Detail
- Opens as a side panel on desktop, bottom sheet on mobile
- Swipeable image gallery with dot indicators
- Product info: brand, title, rating, stock status, price with discount badge
- Description, warranty, and shipping information cards
- Three action buttons: Wishlist, View Cart, Add to Cart

### Shopping Cart
- Add, remove, and update quantity of items
- Persists to localStorage (survives page refresh)
- Free shipping progress bar (unlock at $50)
- Real-time subtotal, shipping cost, and total calculation
- Badge indicator on navigation with pulse animation

### Wishlist
- Toggle heart icon on any product card or detail panel
- Dedicated side sheet showing saved items
- Add to cart directly from wishlist
- Persists to localStorage

### Search
- Debounced search input (350ms delay)
- Mobile overlay for full-screen search
- Trending keyword chips
- Auto-scroll to results on submit
- Clear button and Cancel action

### Mobile Menu
- Drawer navigation from the left
- Browse links (New, Men, Women, Sale, Journal)
- Category shortcuts that apply filters directly
- Account shortcuts (Wishlist, Cart)
- Search input in menu header

### UX Details
- History API integration: browser back button closes panels instead of leaving the page
- Toast notifications for add to cart and wishlist actions
- Body scroll lock when panels are open
- Keyboard support (Escape closes any open panel)
- Drag scroll on desktop for image galleries

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build Tool | Vite 5 |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Framework | Vanilla TypeScript (no framework) |
| API | DummyJSON |
| Persistence | localStorage |
| Fonts | Inter, Space Grotesk (Google Fonts) |

---

## Project Structure
nook/
├── public/
│ └── images/
│ ├── hero-desktop.png
│ └── hero-mobile.png
├── src/
│ ├── api/
│ │ └── products.ts # API fetcher
│ ├── components/
│ │ ├── cart.ts # Cart sheet template
│ │ ├── detail.ts # Detail panel template
│ │ ├── footer.ts # Footer template
│ │ ├── header.ts # Header template
│ │ ├── mobileMenu.ts # Mobile drawer template
│ │ ├── products.ts # Product grid templates
│ │ ├── search.ts # Search overlay template
│ │ ├── toast.ts # Toast template
│ │ └── wishlist.ts # Wishlist sheet template
│ ├── features/
│ │ ├── cart.ts # Cart logic
│ │ ├── detail.ts # Detail panel logic
│ │ ├── footer.ts # Footer logic
│ │ ├── mobileMenu.ts # Mobile menu logic
│ │ ├── products.ts # Product grid logic
│ │ ├── search.ts # Search logic
│ │ ├── toast.ts # Toast logic
│ │ └── wishlist.ts # Wishlist logic
│ ├── lib/
│ │ ├── dragScroll.ts # Mouse drag scroll utility
│ │ └── modalHistory.ts # History API helper
│ ├── main.ts # Entry point
│ ├── style.css # Tailwind + custom CSS
│ └── types.ts # TypeScript interfaces
├── .htaccess # Apache config
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts


---

## Architecture Decisions

### Why Vanilla TypeScript

Frameworks like React or Vue add significant bundle size and abstraction. For a landing page of this scope, vanilla TypeScript with a modular structure offers the same maintainability with better performance and a smaller footprint.

### Why Modular Features

Each feature lives in its own file with a clear separation between template (in `components/`) and logic (in `features/`). This makes it easy to add new features or modify existing ones without touching unrelated code.

### Why No CSS-in-JS

Tailwind CSS provides utility classes that keep styles colocated with markup. No runtime cost, no style recalculation, and full control over what gets shipped.

### Performance Optimizations

- Animations use only transform and opacity properties (GPU-accelerated)
- No backdrop-blur filters applied (expensive on mobile GPUs)
- Image lazy loading for off-screen content
- RequestAnimationFrame for scroll-based updates
- Passive event listeners for scroll handlers
- Event delegation for click handlers (single listener per document)

### History API Integration

Panels and sheets push a fake history state when they open. When the user presses the browser back button or the mobile hardware back button, the panel closes instead of navigating away. This matches native app behavior and prevents accidental page exits.

---

## Getting Started

### Prerequisites

- Node.js version 18 or higher
- npm or yarn package manager

### Development Setup

Clone the repository, then install dependencies and start the development server. The dev server runs on port 5173 by default and opens automatically with hot module replacement enabled.

### Production Build

Run the build command to generate an optimized production bundle in the dist folder. Preview the build locally before deploying to ensure everything works correctly.

### Deployment to Vercel

Push the repository to GitHub, then import the project on Vercel. The platform auto-detects Vite and configures the build settings. Every push to the main branch triggers an automatic deployment.

### Deployment to Apache Hosting

Run the production build, then upload the contents of the dist folder along with the .htaccess file to the public_html directory. The .htaccess handles SPA fallback routing, security headers, gzip compression, and cache control.

---

## Known Limitations

- Cart and wishlist data persist only in the browser via localStorage. Cross-device sync would require a backend with authentication.
- The DummyJSON API has limited product counts per category. Some categories (like skincare) contain only 3 products.
- Checkout flow is visual only. There is no payment integration or order processing.
- No user authentication. Account icon is a placeholder.

---

## Future Improvements

- Backend integration for user accounts and order history
- Payment gateway integration (Stripe or Midtrans)
- Product reviews and ratings from real users
- Advanced filtering (price range slider, multi-category select)
- Recently viewed products section
- Email newsletter integration with real backend

---

## License

MIT License. Free to use, modify, and distribute.

---

## Credits

- Product data provided by DummyJSON
- Fonts by Google Fonts (Inter, Space Grotesk)
- Icons designed inline using SVG
- Inspiration from modern e-commerce brands like SSENSE and Mr Porter

---

Built with care in Jakarta.