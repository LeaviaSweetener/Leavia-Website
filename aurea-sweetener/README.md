# AUREA — Premium Natural Sweetener Website

A $7,000+ luxury landing page for AUREA, a premium natural sweetener brand. Built with React, Three.js, Framer Motion, and GSAP.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate into the project folder
cd aurea-sweetener

# Install dependencies (takes 1–2 minutes)
npm install

# Start the development server
npm run dev
```

Open your browser at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
aurea-sweetener/
├── public/
│   └── favicon.svg              # SVG favicon
├── src/
│   ├── components/
│   │   ├── Navigation/          # Sticky glassmorphism nav
│   │   ├── Hero/                # Full-screen hero with animations
│   │   ├── AnimatedLeaves/      # Floating SVG leaf animations
│   │   ├── Product3D/           # Three.js 3D glass jar product
│   │   ├── ValueProp/           # 3-column value proposition
│   │   ├── WhyBetter/           # Animated comparison charts
│   │   ├── Benefits/            # 6-card benefit grid
│   │   ├── Ingredients/         # Interactive ingredient explorer
│   │   ├── Testimonials/        # Auto-advancing testimonial slider
│   │   ├── CTA/                 # Full-width CTA section
│   │   ├── Footer/              # Premium multi-column footer
│   │   ├── FAQ/                 # Accordion FAQ component
│   │   ├── Contact/             # Contact form with success state
│   │   └── shared/
│   │       ├── Button/          # Multi-variant button component
│   │       ├── SectionTitle/    # Consistent section headers
│   │       └── ScrollReveal/    # Intersection Observer reveal
│   ├── pages/
│   │   ├── Home/                # Full homepage
│   │   ├── About/               # Brand story, team, timeline
│   │   ├── BenefitsPage/        # Full benefits page
│   │   ├── IngredientsPage/     # Full ingredients page
│   │   ├── Research/            # Scientific studies
│   │   ├── TestimonialsPage/    # Full testimonials page
│   │   ├── FAQPage/             # Full FAQ page
│   │   ├── ContactPage/         # Contact page with map info
│   │   ├── ProductDetails/      # 3D product + specs + nutrition
│   │   └── Purchase/            # E-commerce shop page
│   ├── hooks/
│   │   ├── useScrollAnimation.js  # Intersection Observer hook
│   │   ├── useParallax.js         # Scroll parallax hook
│   │   └── useMousePosition.js    # Smooth mouse tracking
│   ├── data/
│   │   ├── benefits.json
│   │   ├── ingredients.json
│   │   ├── testimonials.json
│   │   ├── faq.json
│   │   ├── research.json
│   │   └── products.json
│   ├── styles/
│   │   ├── globals.css           # Design system, CSS variables
│   │   └── animations.css        # All keyframe animations
│   ├── App.jsx                   # Router + layout
│   └── main.jsx                  # React entry point
├── index.html                    # HTML template with Google Fonts
├── vite.config.js                # Vite configuration
├── package.json
└── README.md
```

---

## 🎨 Design System

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--green-deep` | `#0d2818` | Primary background |
| `--green-forest` | `#1a3a2a` | Secondary background |
| `--green-emerald` | `#2d7a4f` | Primary accent |
| `--gold-luxury` | `#c9a84c` | Premium accent |
| `--gold-warm` | `#d4af37` | Highlights & CTAs |

### Typography
- **Display/Headings:** Playfair Display (Google Fonts)
- **Accent/Serif:** Cormorant Garamond (Google Fonts)
- **Body/UI:** Inter (Google Fonts)

---

## ✨ Key Features

### 3D Product Showcase
- `src/components/Product3D/Product3D.jsx`
- Realistic glass jar with `MeshPhysicalMaterial` (transmission, IOR, clearcoat)
- Canvas-generated premium label texture
- Golden metallic lid with knurling texture
- Sparkle particle effects (gold + green)
- Smooth auto-rotation + mouse-controlled tilt
- Three.js Environment preset for HDRI reflections
- Floating animation via `@react-three/drei` `<Float>`

### Animated Leaves
- `src/components/AnimatedLeaves/AnimatedLeaves.jsx`
- 18 unique leaf instances with randomized properties
- 4 different SVG leaf shapes with center veins and side veins
- CSS keyframe float animations (4 variations)
- Scroll-reactive: JS mutates transform on scroll velocity
- Parallax depth effect (each leaf has a `depth` multiplier)

### Premium Animations
- Cinematic hero entrance (staggered `fadeInUp` on all elements)
- Animated comparison bars (width transitions on scroll reveal)
- Dynamic word cycling in hero subtitle
- Gold shimmer button effects
- Ambient orb background animations
- Scroll-triggered reveals via custom `useScrollAnimation` hook

### Pages (10 total)
All pages are fully functional and navigable:
1. **/** — Home (full landing page)
2. **/about** — Brand story, timeline, team, sustainability
3. **/benefits** — Full benefits page
4. **/ingredients** — Interactive ingredient explorer
5. **/research** — 6 peer-reviewed study summaries
6. **/testimonials** — Full testimonial slider
7. **/faq** — Accordion FAQ (10 questions)
8. **/contact** — Contact form + contact info
9. **/product** — 3D product details + nutrition panel
10. **/purchase** — E-commerce shop with subscription toggle

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2 | UI Framework |
| React Router | 6.20 | Client-side routing |
| @react-three/fiber | 8.15 | Three.js React renderer |
| @react-three/drei | 9.92 | Three.js helpers |
| Three.js | 0.159 | 3D rendering |
| Framer Motion | 10.16 | Animation library |
| GSAP | 3.12 | Advanced animations |
| Vite | 5.0 | Build tool |

---

## 🔧 Customization

### Change Brand Colors
Edit `src/styles/globals.css` — all colors are CSS custom properties (variables).

### Update Product Content
All product data is in `src/data/products.json`. Update prices, names, and features there.

### Modify 3D Product
The 3D model is in `src/components/Product3D/Product3D.jsx`. Key functions:
- `createLabelTexture()` — draws the jar label on a Canvas element
- `ProductJar` component — the Three.js mesh group
- Adjust material properties in `meshPhysicalMaterial` for different glass looks

### Add/Edit Testimonials
Edit `src/data/testimonials.json` with new customer reviews.

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Changes |
|-----------|-------|---------|
| Desktop | > 1024px | Full 2-column layouts |
| Tablet | 768–1024px | Stacked layouts, mobile nav |
| Mobile | < 768px | Single column, compact UI |
| Small Mobile | < 480px | Further size reductions |

---

## 🌿 Performance Notes

- Three.js is code-split into a separate chunk (`three` + `react-three`)
- Framer Motion and GSAP are also separate chunks
- All animations use `will-change` and `requestAnimationFrame` for GPU acceleration
- Intersection Observer used instead of scroll listeners for reveal animations
- Google Fonts loaded with `display=swap` for non-blocking render

---

## 📄 License

This project was created as a premium design deliverable. All design, code, and content are original.

---

*AUREA — Nature's Golden Secret* 🌿✨
