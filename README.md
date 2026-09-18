# Flone — Fashion Template

A modern, responsive fashion store template built with vanilla HTML, CSS, and JavaScript.

## Features
- Responsive from 280px to ultrawide
- Dark mode with localStorage persistence
- Working cart drawer (localStorage)
- Functional wishlist with animations
- Hero image carousel with cross-fade
- Newsletter form with validation
- Secret easter egg mini-game (click the year in the footer, or type "flone")

## Files
- `index.html` — main page
- `flone.css` — all styles (design tokens at the top)
- `flone.js` — all interactions
- `assets/` — images (replace with your own)

## Customization

### Colors
Edit the `:root` block at the top of `flone.css`:
- `--accent` — primary brand color
- `--bg`, `--bg-2` — background colors
- `--text-header`, `--text` — typography colors

### Products
Edit the `products` array in `flone.js`:
\`\`\`js
const products = [
  { id: 'p1', name: 'Your product', price: 79, img: 'your-image.jpg', tag: 'new' },
  // ...
];
\`\`\`

### Hero images
Edit the `heroImgs` array in `flone.js`.

## Browser Support
Chrome, Firefox, Safari, Edge — latest 2 versions.

## License
   [Personal]
Purchasing grants you the right to use this template on one project. Redistribution or resale is not permitted.

## Support
[wisdomobinna12123@email.com]