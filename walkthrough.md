# Mayur Range Portfolio — Build Complete ✅

## Project Structure

```
c:\Hack\portfolio\
├── index.html              ← Main single-page portfolio
├── css/
│   ├── style.css           ← Full design system (glassmorphism, dark mode)
│   └── animations.css      ← Scroll reveals, keyframes, micro-interactions
├── js/
│   ├── main.js             ← Nav, particles, typing, tilt, scroll-to-top
│   ├── animations.js       ← IntersectionObserver reveals, counters
│   └── form.js             ← Form validation + Formspree + mailto fallback
├── assets/
│   ├── hero_background.png ← AI-generated hero background
│   ├── finlearn_project.png← AI-generated FinLearn project image
│   └── ai_doc_verification.png ← AI-generated doc verification image
├── vercel.json             ← Ready for Vercel deployment
└── .gitignore
```

## Sections Implemented

| Section | Features |
|---------|---------|
| **Hero** | Particle canvas, typing animation, orb effects, 3 CTA buttons, social links |
| **About** | Text + 4 quick-info cards, animated stat counters |
| **Education** | Timeline layout with icons |
| **Skills** | 4 category cards with staggered skill tags |
| **Experience** | PHP Backend Intern at Upturn India Technologies |
| **Projects** | 2 cards with AI images, tech badges, GitHub & Demo buttons |
| **Achievements** | 2 achievement cards (Runner-Up + Finalist) |
| **Stats** | 4 animated counters (Projects, Hackathons, Technologies, Certifications) |
| **Services** | 3 service cards (Web Dev, Backend, AI) |
| **Certifications** | Placeholder section (ready to fill) |
| **Contact** | Form with validation + Formspree + mailto fallback |
| **Footer** | Branding, quick links, social icons, copyright |

## 🔧 Setup Required

### 1. Contact Form (Formspree)
1. Go to [formspree.io](https://formspree.io) and sign up with `rangemayur@gmail.com`
2. Create a new form — you'll get a form ID like `xpwzogkr`
3. In `js/form.js` line ~80, replace `YOUR_FORM_ID`:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

### 2. Resume
Place your resume PDF at: `assets/MayurRange_Resume.pdf`

### 3. LinkedIn URL
Search for `Add your LinkedIn URL` in `index.html` and update the 3 `href="#"` links for LinkedIn.

### 4. Update Stats (if needed)
In `index.html`, search for `data-counter` attributes to update numbers:
```html
<div class="stat-number" data-counter="5" data-suffix="+">5+</div>
```

## 🚀 Deploy to Vercel
```bash
npm i -g vercel
cd c:\Hack\portfolio
vercel --prod
```
Or drag-and-drop the folder at [vercel.com/new](https://vercel.com/new).

## Design Features
- ✅ Glassmorphism dark theme
- ✅ Blue/purple accent palette
- ✅ Interactive particle canvas (hero)
- ✅ Typing animation (5 rotating roles)
- ✅ Smooth scroll reveal animations
- ✅ 3D card tilt effect (projects/achievements)
- ✅ Animated counter numbers
- ✅ Staggered skill tag animations
- ✅ Mobile-first responsive design
- ✅ Scroll-to-top button
- ✅ Loading screen with logo
- ✅ Hamburger mobile navigation
- ✅ Active nav link highlighting
- ✅ SEO metadata + structured data
- ✅ Accessibility (ARIA labels, semantic HTML)
