/* ============================================
   FLONE — Interactions
   ============================================ */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- 1. Hero Carousel (cross-fade) ---------- */
const heroImgs = ['hero.jpg', 'hero-2.jpg', 'hero-3.jpg', 'hero-4.jpg', 'hero-5.jpg'];
const slides = $$('.hero-slide');
let slideIndex = 0;

heroImgs.forEach(src => { const img = new Image(); img.src = src; });

slides[0].style.backgroundImage = `url('${heroImgs[0]}')`;
slides[0].classList.add('is-active');

setInterval(() => {
  slideIndex = (slideIndex + 1) % heroImgs.length;
  const nextIdx = slideIndex % 2;
  const prevIdx = 1 - nextIdx;
  slides[nextIdx].style.backgroundImage = `url('${heroImgs[slideIndex]}')`;
  slides[nextIdx].classList.add('is-active');
  slides[prevIdx].classList.remove('is-active');
}, 5000);

/* ---------- 2. Mobile Dropdown ---------- */
const dropBtn  = $('#dropBtn');
const dropdown = $('#dropdown');

dropBtn.addEventListener('click', () => {
  const isOpen = dropdown.classList.toggle('active');
  dropBtn.setAttribute('aria-expanded', String(isOpen));
  dropBtn.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
});

$$('.dropdown-list a').forEach(link => {
  link.addEventListener('click', () => {
    dropdown.classList.remove('active');
    dropBtn.setAttribute('aria-expanded', 'false');
    dropBtn.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });
});

/* ---------- 3. Dark Mode ---------- */
const themeBtn = $('#themeBtn');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('flone-theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add('dark');
  themeBtn.innerHTML = '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
}

themeBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('flone-theme', isDark ? 'dark' : 'light');
  themeBtn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
});

/* ---------- 4. Products Data ---------- */
const products = [
  { id: 'p1', name: 'Nike white bag',    price: 79,  img: 'nike.jpg', tag: 'new' },
  { id: 'p2', name: 'Canvas tote',       price: 45,  img: 'canvas-tote.jpg', tag: 'new' },
  { id: 'p3', name: 'Leather crossbody', price: 129, img: 'leather-crossbody.jpg', tag: 'new' },
  { id: 'p4', name: 'Mini backpack',     price: 89,  img: 'mini-backpack.jpg', tag: 'new' },
  { id: 'p5', name: 'Weekend duffel',    price: 149, img: 'weekend-duffel.jpg', tag: 'new' },
  { id: 'p6', name: 'Everyday sling',    price: 59,  img: 'everyday-sling.jpg', tag: 'new' },
  { id: 'p7', name: 'Structured hobo',   price: 99,  img: 'structured-hobo.jpg', tag: 'new' },
  { id: 'p8', name: 'Belt bag',          price: 39,  img: 'belt-bag.jpg', tag: 'new' }
];

const heartSVG = `
  <svg viewBox="0 0 25 25" width="20" height="20" aria-hidden="true">
    <path d="M20.8 4.6c-2.1-2.1-5.5-2.1-7.6 0L12 5.8l-1.2-1.2c-2.1-2.1-5.5-2.1-7.6 0s-2.1 5.5 0 7.6L12 21l8.8-8.8c2.1-2.1 2.1-5.5 0-7.6Z"
      fill="none" stroke="currentColor" stroke-width="1.2"/>
  </svg>`;

/* ---------- 5. State ---------- */
const state = {
  wishlist: JSON.parse(localStorage.getItem('flone-wishlist') || '[]'),
  cart:     JSON.parse(localStorage.getItem('flone-cart')     || '[]')
};

const save = () => {
  localStorage.setItem('flone-wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('flone-cart',     JSON.stringify(state.cart));
};

/* ---------- 6. Render Products ---------- */
const itemsGrid = $('#itemsGrid');

itemsGrid.innerHTML = products.map(p => `
  <div class="item-card" data-id="${p.id}">
    <span class="tag">${p.tag}</span>
    <img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" width="400" height="200">
    <div class="item-info">
      <div class="item-name">
        <h3>${p.name}</h3>
        <button class="heart-btn" type="button"
                aria-label="Add ${p.name} to wishlist"
                aria-pressed="false"
                data-id="${p.id}">
          ${heartSVG}
        </button>
      </div>
      <div class="item-bottom">
        <p>$${p.price.toFixed(2)}</p>
        <button class="add-cart-btn" type="button" data-id="${p.id}">
          Add to cart
        </button>
      </div>
    </div>
  </div>
`).join('');

/* ---------- 7. Render Blog ---------- */
const blogs = [
  { title: 'How to build a timeless wardrobe.', author: 'Ragin Jafaar', img: 'flower.jpg',   tag: 'Beauty' },
  { title: 'Embrace your drawing skills.',      author: 'John Doe',     img: 'painting.jpg', tag: 'Creativity' },
  { title: 'Coffee that tastes like morning.',  author: 'Ragin Jafaar', img: 'cofee.jpg',    tag: 'Lifestyle' }
];

$('#blogGrid').innerHTML = blogs.map(b => `
  <div class="blog-card">
    <span class="tag">${b.tag}</span>
    <img src="${b.img}" alt="${b.title}" loading="lazy" decoding="async" width="400" height="260">
    <div class="blog-text">
      <h3>${b.title}</h3>
      <p>By ${b.author}</p>
    </div>
  </div>
`).join('');

/* ---------- 8. Scroll Reveal ---------- */
const revealTargets = $$('.item-card, .blog-card, .stat-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealTargets.forEach(el => observer.observe(el));

/* ---------- 9. Toast ---------- */
const toast = $('#toast');
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------- 10. Wishlist ---------- */
function syncWishlistUI() {
  $$('.heart-btn').forEach(btn => {
    const id = btn.dataset.id;
    const isActive = state.wishlist.includes(id);
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  const badge = $('#wishlistBadge');
  if (badge) {
    badge.textContent = state.wishlist.length;
    badge.classList.toggle('show', state.wishlist.length > 0);
  }
}

itemsGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.heart-btn');
  if (!btn) return;

  const id = btn.dataset.id;
  const idx = state.wishlist.indexOf(id);

  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.push(id);
    showToast('Added to wishlist ❤');
  }

  btn.classList.add('pop');
  setTimeout(() => btn.classList.remove('pop'), 400);

  save();
  syncWishlistUI();
});

/* ---------- 11. Wishlist FAB ---------- */
$('#wishlistFab').addEventListener('click', () => {
  if (!state.wishlist.length) {
    showToast('Your wishlist is empty');
    return;
  }
  const names = state.wishlist
    .map(id => products.find(p => p.id === id)?.name)
    .filter(Boolean);
  const preview = names.slice(0, 2).join(', ');
  const suffix = names.length > 2 ? ` +${names.length - 2} more` : '';
  showToast(`${state.wishlist.length} saved: ${preview}${suffix}`);
});

/* ---------- 12. Cart ---------- */
const cartDrawer  = $('#cartDrawer');
const cartOverlay = $('#cartOverlay');
const cartItemsEl = $('#cartItems');
const cartTotalEl = $('#cartTotal');
const cartBadge   = $('#cartBadge');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

function syncCartUI() {
  const totalCount = state.cart.reduce((n, item) => n + item.qty, 0);
  const totalPrice = state.cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  cartBadge.textContent = totalCount;
  cartBadge.classList.toggle('show', totalCount > 0);

  if (!state.cart.length) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
  } else {
    cartItemsEl.innerHTML = state.cart.map(item => {
      const p = products.find(x => x.id === item.id);
      if (!p) return '';
      return `
        <div class="cart-row" data-id="${p.id}">
          <img src="${p.img}" alt="${p.name}" width="60" height="60">
          <div class="cart-row-info">
            <h4>${p.name}</h4>
            <p>$${p.price.toFixed(2)} × ${item.qty}</p>
          </div>
          <div class="cart-row-actions">
            <button class="qty-btn" data-action="dec" data-id="${p.id}" aria-label="Decrease quantity">−</button>
            <button class="qty-btn" data-action="inc" data-id="${p.id}" aria-label="Increase quantity">+</button>
            <button class="remove-btn" data-action="remove" data-id="${p.id}" aria-label="Remove item">×</button>
          </div>
        </div>
      `;
    }).join('');
  }

  cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;
}

function addToCart(id) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else state.cart.push({ id, qty: 1 });
  save();
  syncCartUI();
  showToast('Added to cart');
}

itemsGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-cart-btn');
  if (!btn) return;
  addToCart(btn.dataset.id);
});

$('#cartBtn').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

cartItemsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const { action, id } = btn.dataset;
  const item = state.cart.find(x => x.id === id);
  if (!item) return;

  if (action === 'inc')    item.qty += 1;
  if (action === 'dec')    item.qty = Math.max(1, item.qty - 1);
  if (action === 'remove') state.cart = state.cart.filter(x => x.id !== id);

  save();
  syncCartUI();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCart();
});

/* ---------- 13. Newsletter ---------- */
const form = $('#newsletterForm');
const formStatus = $('#formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = $('#email').value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = 'Please enter a valid email.';
    formStatus.style.color = '#e74c3c';
    return;
  }

  formStatus.textContent = 'Thanks! Check your inbox to confirm.';
  formStatus.style.color = 'var(--accent)';
  form.reset();
});

/* ============================================
   14. EASTER EGG — Catch the Falling Bags
   Trigger: click the year in footer OR type "flone"
   ============================================ */

/* ============================================
   14. EASTER EGG — Catch the Falling Bags
   Trigger: click the year in footer OR type "flone"
   ============================================ */

/* --- Tunable game settings --- */
const GAME_CONFIG = {
  duration:    60,      // total seconds
  spawnEvery:  900,     // ms between bags (higher = fewer bags)
  fallMin:     2.5,     // seconds to fall (min)
  fallMax:     3.5      // seconds to fall (max)
};

const eggModal   = $('#eggModal');
const eggClose   = $('#eggClose');
const eggStage   = $('#eggStage');
const eggScoreEl = $('#eggScore');
const eggTimeEl  = $('#eggTime');
const eggStart   = $('#eggStart');

const gameState = {
  running: false,
  score: 0,
  time: GAME_CONFIG.duration,
  spawnTimer: null,
  tickTimer: null
};

function openEgg() {
  eggModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  resetGame();
}

function closeEgg() {
  eggModal.classList.remove('open');
  document.body.style.overflow = '';
  stopGame();
}

function resetGame() {
  stopGame();
  gameState.score = 0;
  gameState.time  = GAME_CONFIG.duration;
  eggScoreEl.textContent = '0';
  eggTimeEl.textContent  = GAME_CONFIG.duration;
  eggStage.innerHTML = '';
  eggStage.appendChild(eggStart);
  eggStart.style.display = 'inline-block';
}

function spawnBag() {
  if (!gameState.running) return;

  const bag = document.createElement('button');
  bag.className = 'falling-bag';
  bag.type = 'button';
  bag.textContent = '👜';
  bag.setAttribute('aria-label', 'Catch the bag');

  const stageWidth = eggStage.clientWidth;
  const x = Math.random() * Math.max(0, stageWidth - 44);
  bag.style.left = `${x}px`;

  // Slower fall speed — random between fallMin and fallMax seconds
  const duration = GAME_CONFIG.fallMin
    + Math.random() * (GAME_CONFIG.fallMax - GAME_CONFIG.fallMin);
  bag.style.animationDuration = `${duration}s`;

  bag.addEventListener('click', () => {
    if (!gameState.running) return;
    gameState.score += 1;
    eggScoreEl.textContent = gameState.score;
    bag.classList.add('popped');
    setTimeout(() => bag.remove(), 200);
  });

  bag.addEventListener('animationend', () => bag.remove());
  eggStage.appendChild(bag);
}

function startGame() {
  resetGame();
  gameState.running = true;
  eggStart.style.display = 'none';

  gameState.spawnTimer = setInterval(spawnBag, GAME_CONFIG.spawnEvery);
  gameState.tickTimer = setInterval(() => {
    gameState.time -= 1;
    eggTimeEl.textContent = gameState.time;
    if (gameState.time <= 0) endGame();
  }, 1000);
}

function stopGame() {
  gameState.running = false;
  clearInterval(gameState.spawnTimer);
  clearInterval(gameState.tickTimer);
}

function endGame() {
  stopGame();
  eggStage.innerHTML = `
    <div class="egg-end">
      <h3>Time's up!</h3>
      <p>You caught <strong>${gameState.score}</strong> bag${gameState.score === 1 ? '' : 's'}.</p>
      <button class="cta egg-start-btn" id="eggPlayAgain" type="button">Play again</button>
    </div>
  `;
  $('#eggPlayAgain').addEventListener('click', startGame);
}

eggStart.addEventListener('click', startGame);
eggClose.addEventListener('click', closeEgg);
eggModal.addEventListener('click', (e) => {
  if (e.target === eggModal) closeEgg();
});

// Trigger 1: click the year
const yearEl = $('#year');
if (yearEl) {
  yearEl.style.cursor = 'pointer';
  yearEl.style.userSelect = 'none';
  yearEl.addEventListener('click', openEgg);
}

// Trigger 2: type "flone"
let typed = '';
document.addEventListener('keydown', (e) => {
  if (eggModal.classList.contains('open')) return;

  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;

  if (e.key.length !== 1) return;
  typed = (typed + e.key.toLowerCase()).slice(-5);
  if (typed === 'flone') openEgg();
});

// Escape closes the egg
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && eggModal.classList.contains('open')) closeEgg();
});
/* ---------- 15. Initialize UI State ---------- */
syncWishlistUI();
syncCartUI();

