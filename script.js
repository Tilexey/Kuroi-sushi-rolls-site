/* ==========================================================================
   KUROI SUSHI & ROLLS — Classic Vanilla JavaScript Application
   ========================================================================== */

const NEIGHBORHOODS = [
  'Downtown, New York',
  'West Village, New York',
  'Williamsburg, Brooklyn',
  'Midtown East, New York',
];

const MAKE_IT_YOURS_EXTRAS = [
  { id: 'extra-soy', label: 'Extra soy sauce', price: 1.0 },
  { id: 'extra-wasabi', label: 'Extra wasabi', price: 0.5 },
  { id: 'extra-ginger', label: 'Extra ginger', price: 0.5 },
];

const MENU_ITEMS = [
  {
    id: 'salmon-signature',
    name: 'Salmon signature',
    weight: '280g',
    pieces: '8 pcs',
    ingredients: 'Salmon, avocado, cream cheese',
    description:
      'Our most-loved roll. Silky salmon, creamy avocado and a little crunch in every bite.',
    craftNote:
      'Rolled fresh for your order, with responsibly sourced Atlantic salmon and Japanese rice.',
    price: 18.0,
    image: './assets/images/salmon_signature.jpg',
    modalImage: './assets/images/salmon_signature_modal.jpg',
    badge: 'HIT',
    kicker: 'SIGNATURE ROLLS / HIT',
    category: 'Rolls',
    tags: [],
    popularity: 100,
    nutrition: { kcal: 198, protein: '9g', carbs: '24g', fat: '7g' },
    allergens: 'fish, milk, soy, sesame.',
    featured: true,
  },
  {
    id: 'green-dragon',
    name: 'Green dragon',
    weight: '290g',
    pieces: '8 pcs',
    ingredients: 'Shrimp tempura, avocado, unagi',
    description:
      'Crisp prawn tempura wrapped in paper-thin avocado slices, finished with roasted sesame and sweet unagi glaze.',
    craftNote:
      'Tempura fried to order in light rice-bran oil so every piece arrives warm and crisp.',
    price: 22.0,
    image: './assets/images/green_dragon.jpg',
    badge: "CHEF'S PICK",
    kicker: "SIGNATURE ROLLS / CHEF'S PICK",
    category: 'Rolls',
    tags: [],
    popularity: 96,
    nutrition: { kcal: 224, protein: '10g', carbs: '26g', fat: '9g' },
    allergens: 'crustaceans, gluten, soy, sesame.',
    featured: true,
  },
  {
    id: 'baked-scallop',
    name: 'Baked scallop',
    weight: '260g',
    pieces: '8 pcs',
    ingredients: 'Scallop, crab, spicy mayo',
    description:
      'Sweet Hokkaido scallop and snow crab folded in house spicy mayo, torched under high heat until golden.',
    craftNote:
      'Broiled to order in small ceramic trays for a rich, smoky finish over seasoned sushi rice.',
    price: 20.0,
    image: './assets/images/baked_scallop.jpg',
    badge: 'SPICY',
    kicker: 'BAKED ROLLS / SPICY',
    category: 'Baked rolls',
    tags: ['Spicy', 'Baked'],
    popularity: 92,
    nutrition: { kcal: 236, protein: '11g', carbs: '22g', fat: '11g' },
    allergens: 'molluscs, crustaceans, egg, soy, sesame.',
    featured: true,
  },
  {
    id: 'garden-roll',
    name: 'Garden roll',
    weight: '240g',
    pieces: '8 pcs',
    ingredients: 'Avocado, cucumber, asparagus',
    description:
      'Bright, crisp garden vegetables — charred green asparagus, English cucumber, and buttery avocado.',
    craftNote:
      'Balanced with toasted white sesame and crisp nori harvested from Ariake Bay.',
    price: 14.0,
    image: './assets/images/garden_roll.jpg',
    badge: 'VEGETARIAN',
    homeBadge: 'PLANT BASED',
    kicker: 'PLANT BASED / VEGETARIAN',
    category: 'Rolls',
    tags: ['Vegetarian'],
    popularity: 88,
    nutrition: { kcal: 152, protein: '4g', carbs: '23g', fat: '5g' },
    allergens: 'soy, sesame.',
    featured: true,
  },
  {
    id: 'salmon-nigiri',
    name: 'Salmon nigiri',
    weight: '100g',
    pieces: '2 pcs',
    ingredients: 'Fresh Atlantic salmon, seasoned rice',
    description:
      'Pure, hand-pressed nigiri featuring thick-cut sashimi-grade Atlantic salmon over warm akazu-seasoned rice.',
    craftNote:
      'Sliced by hand right before packing to preserve silky texture and clean ocean sweetness.',
    price: 9.0,
    image: './assets/images/salmon_nigiri.jpg',
    badge: 'CLASSIC',
    kicker: 'NIGIRI / CLASSIC',
    category: 'Nigiri',
    tags: [],
    popularity: 85,
    nutrition: { kcal: 168, protein: '11g', carbs: '19g', fat: '5g' },
    allergens: 'fish, soy.',
  },
  {
    id: 'spicy-tuna',
    name: 'Spicy tuna',
    weight: '250g',
    pieces: '8 pcs',
    ingredients: 'Yellowfin tuna, cucumber, spicy mayo',
    description:
      'Line-caught yellowfin tuna tossed in house chili-garlic mayo with crisp Persian cucumber and scallions.',
    craftNote:
      'Finished with shichimi togarashi and toasted sesame for a clean, lingering warmth.',
    price: 19.0,
    image: './assets/images/spicy_tuna.jpg',
    badge: 'SPICY',
    kicker: 'SIGNATURE ROLLS / SPICY',
    category: 'Rolls',
    tags: ['Spicy'],
    popularity: 89,
    nutrition: { kcal: 192, protein: '12g', carbs: '21g', fat: '6g' },
    allergens: 'fish, egg, soy, sesame.',
  },
  {
    id: 'baked-salmon',
    name: 'Baked salmon',
    weight: '270g',
    pieces: '8 pcs',
    ingredients: 'Salmon, cream cheese, teriyaki',
    description:
      'Caramelized Atlantic salmon baked over creamy Philadelphia cheese and brushed with house-reduced teriyaki.',
    craftNote:
      'A comforting warm roll glazed with slow-simmered tare and toasted sesame seeds.',
    price: 20.0,
    image: './assets/images/baked_salmon.jpg',
    badge: 'NEW',
    kicker: 'BAKED ROLLS / NEW',
    category: 'Baked rolls',
    tags: ['Baked', 'New'],
    popularity: 84,
    nutrition: { kcal: 245, protein: '10g', carbs: '24g', fat: '12g' },
    allergens: 'fish, milk, soy, gluten, sesame.',
  },
  {
    id: 'crispy-shrimp',
    name: 'Crispy shrimp',
    weight: '260g',
    pieces: '8 pcs',
    ingredients: 'Shrimp tempura, avocado, sesame',
    description:
      'Golden tempura prawn paired with cool avocado, Japanese mayo, and a crunchy roasted sesame crust.',
    craftNote:
      'Packed separately from warm dipping sauces so every bite keeps its delicate crunch.',
    price: 18.0,
    image: './assets/images/crispy_shrimp.jpg',
    badge: 'HIT',
    kicker: 'SIGNATURE ROLLS / HIT',
    category: 'Rolls',
    tags: [],
    popularity: 91,
    nutrition: { kcal: 215, protein: '9g', carbs: '25g', fat: '8g' },
    allergens: 'crustaceans, gluten, egg, soy, sesame.',
  },
  {
    id: 'kuroi-combo-box',
    name: 'Kuroi signature set',
    weight: '790g',
    pieces: '24 pcs',
    ingredients: 'Salmon signature, Green dragon, Garden roll',
    description:
      'Our curated trio for two: three full signature rolls crafted for effortless sharing and balanced flavor.',
    craftNote:
      'Includes two pairs of bamboo chopsticks, house-brewed soy sauce, pickled ginger, and fresh wasabi.',
    price: 49.0,
    image: './assets/images/hero_platter.jpg',
    badge: 'SAVE 10%',
    kicker: 'COMBO SETS / SHARING BOX',
    category: 'Sets',
    tags: ['New'],
    popularity: 95,
    nutrition: { kcal: 196, protein: '8g', carbs: '24g', fat: '7g' },
    allergens: 'fish, crustaceans, milk, soy, gluten, sesame.',
  },
  {
    id: 'omakase-duo-set',
    name: 'Baked & nigiri duo',
    weight: '630g',
    pieces: '18 pcs',
    ingredients: 'Baked scallop, Baked salmon, 2x Salmon nigiri',
    description:
      'A warm-and-chilled pairing combining two rich baked rolls with classic hand-pressed salmon nigiri.',
    craftNote:
      'Prepared in sequence so chilled nigiri and warm baked rolls arrive at ideal serving temperatures.',
    price: 44.0,
    image: './assets/images/baked_salmon.jpg',
    badge: 'COMBO',
    kicker: 'COMBO SETS / CHEF CURATED',
    category: 'Sets',
    tags: ['Baked', 'Spicy'],
    popularity: 82,
    nutrition: { kcal: 218, protein: '11g', carbs: '22g', fat: '9g' },
    allergens: 'fish, molluscs, crustaceans, milk, egg, soy, sesame.',
  },
  {
    id: 'yuzu-green-tea',
    name: 'Yuzu green tea',
    weight: '330ml',
    pieces: '1 bottle',
    ingredients: 'Cold-brew sencha, Japanese yuzu juice',
    description:
      'Bright, aromatic Uji sencha cold-brewed for 14 hours and lightly lifted with pressed Kochi yuzu citrus.',
    craftNote:
      'Zero refined sugar — crisp, floral, and naturally refreshing alongside rich sushi rolls.',
    price: 4.0,
    image: './assets/images/yuzu_green_tea.jpg',
    badge: 'HOUSE BREW',
    kicker: 'DRINKS / COLD BREW',
    category: 'Drinks',
    tags: ['Vegetarian', 'New'],
    popularity: 80,
    nutrition: { kcal: 18, protein: '0g', carbs: '4g', fat: '0g' },
    allergens: 'none.',
  },
  {
    id: 'house-soy-bottle',
    name: 'House soy sauce',
    weight: '30ml',
    pieces: '1 bottle',
    ingredients: 'Aged cedar-barrel shoyu, dashi infusion',
    description:
      'Our signature mellowed soy sauce infused gently with kombu kelp and mirin for dipping nigiri and rolls.',
    craftNote: 'Small-batch blended in-house for lower sodium and deeper umami.',
    price: 1.0,
    image: './assets/images/house_soy_sauce.jpg',
    badge: 'PANTRY',
    kicker: 'DRINKS & PANTRY / CONDIMENT',
    category: 'Drinks',
    tags: ['Vegetarian'],
    popularity: 75,
    nutrition: { kcal: 15, protein: '2g', carbs: '2g', fat: '0g' },
    allergens: 'soy, wheat.',
  },
];

const CART_ADDONS = [
  {
    id: 'addon-soy',
    dishId: 'house-soy-bottle',
    name: 'House soy sauce',
    size: '30ml',
    price: 1.0,
    image: './assets/images/house_soy_sauce.jpg',
  },
  {
    id: 'addon-yuzu',
    dishId: 'yuzu-green-tea',
    name: 'Yuzu green tea',
    size: '330ml',
    price: 4.0,
    image: './assets/images/yuzu_green_tea.jpg',
  },
  {
    id: 'addon-nigiri',
    dishId: 'salmon-nigiri',
    name: 'Salmon nigiri',
    size: '2 pcs',
    price: 9.0,
    image: './assets/images/salmon_nigiri.jpg',
  },
  {
    id: 'addon-garden',
    dishId: 'garden-roll',
    name: 'Garden roll',
    size: '8 pcs',
    price: 14.0,
    image: './assets/images/garden_roll.jpg',
  },
];

const PROMO_CODES = {
  KUROI5: { type: 'percent', value: 0.05, label: '5% off (Kuroi Club)' },
  WELCOME10: { type: 'fixed', value: 10, label: '$10.00 off welcome offer' },
};

const TIME_SLOTS = [
  'Today, 12:30 – 1:00 PM',
  'Today, 1:30 – 2:00 PM',
  'Today, 6:00 – 6:30 PM',
  'Today, 7:00 – 7:30 PM',
  'Today, 8:00 – 8:30 PM',
];

const MENU_TABS = ['All menu', 'Rolls', 'Nigiri', 'Baked rolls', 'Sets', 'Drinks'];
const TASTE_FILTERS = ['Spicy', 'Baked', 'Vegetarian', 'New'];
const SORT_LABELS = {
  popular: 'Popular first',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
};

// SVG Icon Helpers
const ICONS = {
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5v14" stroke-linecap="round"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14" stroke-linecap="round"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUpRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronDown: `<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  reset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

// Application State
const state = {
  view: 'home',
  category: 'All menu',
  selectedTags: [],
  sortBy: 'popular',
  neighborhood: NEIGHBORHOODS[0],
  cart: ['salmon-signature', 'green-dragon', 'garden-roll'].map((id) => {
    const dish = MENU_ITEMS.find((m) => m.id === id);
    return {
      cartKey: dish.id,
      dishId: dish.id,
      name: dish.name,
      weightLabel: `${dish.weight} / ${dish.pieces}`,
      unitPrice: dish.price,
      image: dish.image,
      quantity: 1,
      extras: [],
    };
  }),
  chopsticks: 2,
  fulfillment: 'delivery',
  deliveryTimeMode: 'asap',
  scheduledSlot: TIME_SLOTS[2],
  paymentMethod: 'card',
  form: {
    fullName: 'Alex Morgan',
    phone: '(212) 555-0142',
    street: '128 Spring Street',
    apt: 'Apt 4B',
    zip: '10012',
  },
  promoInput: '',
  appliedPromo: null,
  promoError: '',
  formError: '',
  orderConfirmation: null,
  modalDishId: null,
  modalQty: 1,
  modalExtras: [],
};

let toastTimer = null;

// DOM References
const appMain = document.getElementById('app-main');
const headerCartCount = document.getElementById('header-cart-count');
const headerCartSubtotal = document.getElementById('header-cart-subtotal');
const drawerCartSummary = document.getElementById('drawer-cart-summary');
const locationTrigger = document.getElementById('location-trigger');
const locationMenu = document.getElementById('location-menu');
const selectedNeighborhoodLabel = document.getElementById('selected-neighborhood-label');
const mobileDrawer = document.getElementById('mobile-drawer');
const productModal = document.getElementById('product-modal');
const productModalDialog = document.getElementById('product-modal-dialog');
const legalModal = document.getElementById('legal-modal');
const legalModalDialog = document.getElementById('legal-modal-dialog');
const toastBanner = document.getElementById('toast-banner');
const toastMessage = document.getElementById('toast-message');

// Utilities
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getCartStats() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  return { count, subtotal };
}

function getDishCartQuantity(dishId) {
  return state.cart
    .filter((item) => item.dishId === dishId)
    .reduce((sum, item) => sum + item.quantity, 0);
}

function showToast(msg) {
  toastMessage.textContent = msg;
  toastBanner.classList.add('is-visible');
  toastBanner.setAttribute('aria-hidden', 'false');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastBanner.classList.remove('is-visible');
    toastBanner.setAttribute('aria-hidden', 'true');
  }, 2200);
}

function updateHeaderUI(animateCount = false) {
  const { count, subtotal } = getCartStats();
  headerCartCount.textContent = String(count);
  headerCartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  drawerCartSummary.textContent = `${count} · $${subtotal.toFixed(2)}`;
  selectedNeighborhoodLabel.textContent = state.neighborhood;

  if (animateCount) {
    headerCartCount.classList.remove('pop-anim');
    void headerCartCount.offsetWidth;
    headerCartCount.classList.add('pop-anim');
  }

  // Highlight active desktop nav link
  document.querySelectorAll('.desktop-nav .nav-link').forEach((btn) => {
    const navTarget = btn.getAttribute('data-nav');
    const navCat = btn.getAttribute('data-category');
    const isActive =
      (state.view === 'menu' && navTarget === 'menu' && (navCat === state.category || (navCat === 'All menu' && state.category !== 'Sets'))) ||
      (state.view === 'cart' && navTarget === 'cart');
    btn.classList.toggle('is-active', Boolean(isActive));
  });

  // Highlight active mobile drawer nav link
  document.querySelectorAll('.drawer-nav-btn').forEach((btn) => {
    const navTarget = btn.getAttribute('data-nav');
    const navCat = btn.getAttribute('data-category');
    const hasScroll = btn.hasAttribute('data-scroll');
    const isActive =
      !hasScroll &&
      ((state.view === 'home' && navTarget === 'home') ||
        (state.view === 'menu' && navTarget === 'menu' && (navCat === state.category || (navCat === 'All menu' && state.category !== 'Sets'))) ||
        (state.view === 'cart' && navTarget === 'cart'));
    btn.classList.toggle('is-active', Boolean(isActive));
  });

  renderNeighborhoodMenus();
}

function renderNeighborhoodMenus() {
  const desktopContainer = document.getElementById('location-options');
  const mobileContainer = document.getElementById('mobile-location-options');

  const html = NEIGHBORHOODS.map((area) => {
    const selected = state.neighborhood === area;
    return `
      <button
        type="button"
        class="dropdown-item ${selected ? 'is-selected' : ''}"
        data-select-area="${escapeHtml(area)}"
        role="option"
        aria-selected="${selected}"
      >
        ${ICONS.pin}
        <span>${escapeHtml(area)}</span>
      </button>
    `;
  }).join('');

  const mobileHtml = NEIGHBORHOODS.map((area) => {
    const selected = state.neighborhood === area;
    return `
      <button
        type="button"
        class="drawer-area-btn ${selected ? 'is-selected' : ''}"
        data-select-area="${escapeHtml(area)}"
      >
        ${ICONS.pin}
        <span>${escapeHtml(area)}</span>
      </button>
    `;
  }).join('');

  desktopContainer.innerHTML = html;
  mobileContainer.innerHTML = mobileHtml;
}

// Cart Mutations
function addToCart(dish, quantity = 1, extras = []) {
  const extraIds = extras
    .map((e) => e.id)
    .sort()
    .join(',');
  const cartKey = extraIds ? `${dish.id}::${extraIds}` : dish.id;
  const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = dish.price + extrasPrice;

  state.orderConfirmation = null;
  const existing = state.cart.find((item) => item.cartKey === cartKey);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      cartKey,
      dishId: dish.id,
      name: dish.name,
      weightLabel: `${dish.weight} / ${dish.pieces}`,
      unitPrice,
      image: dish.image,
      quantity,
      extras,
    });
  }

  updateHeaderUI(true);
  showToast(`Added ${dish.name} to cart`);
}

function incrementDish(dishId) {
  const item = state.cart.find((i) => i.dishId === dishId);
  if (item) {
    item.quantity += 1;
    updateHeaderUI(true);
  }
}

function decrementDish(dishId) {
  const idx = state.cart.findIndex((i) => i.dishId === dishId);
  if (idx === -1) return;
  if (state.cart[idx].quantity <= 1) {
    state.cart.splice(idx, 1);
  } else {
    state.cart[idx].quantity -= 1;
  }
  updateHeaderUI(true);
}

function updateCartKeyQty(cartKey, delta) {
  const idx = state.cart.findIndex((i) => i.cartKey === cartKey);
  if (idx === -1) return;
  state.cart[idx].quantity += delta;
  if (state.cart[idx].quantity <= 0) {
    state.cart.splice(idx, 1);
  }
  updateHeaderUI(true);
}

function removeCartKey(cartKey) {
  state.cart = state.cart.filter((i) => i.cartKey !== cartKey);
  updateHeaderUI(true);
}

// Navigation
function navigateTo(view, category = null, scrollTarget = null) {
  const viewChanged = state.view !== view;
  if (category) {
    state.category = category;
  }
  state.view = view;
  if (view !== 'cart') {
    state.orderConfirmation = null;
  }

  closeMobileDrawer();
  closeLocationDropdown();
  renderCurrentView(viewChanged);
  updateHeaderUI(false);

  if (scrollTarget) {
    setTimeout(() => {
      const el = document.getElementById(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Image Helper HTML
function renderImg(src, alt, className = '') {
  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="${escapeHtml(className)}" loading="lazy" onerror="this.outerHTML='<div class=\\'img-fallback\\'>${escapeHtml(alt)}</div>'" />`;
}

// Shared Dish Card Renderer
function renderDishCard(dish, variant = 'menu', index = 0) {
  const qty = getDishCartQuantity(dish.id);
  const delay = Math.min(index * 45, 220);
  const badgeText = variant === 'home' && dish.homeBadge ? dish.homeBadge : dish.badge;

  const actionHtml =
    qty > 0
      ? `
        <div class="qty-stepper" data-stop-card="true">
          <button type="button" class="qty-btn" data-dish-dec="${dish.id}" aria-label="Remove one ${escapeHtml(dish.name)}">
            ${ICONS.minus}
          </button>
          <span class="qty-val tabular-nums">${qty}</span>
          <button type="button" class="qty-btn" data-dish-inc="${dish.id}" aria-label="Add one more ${escapeHtml(dish.name)}">
            ${ICONS.plus}
          </button>
        </div>
      `
      : variant === 'home'
      ? `
        <button type="button" class="btn-card-add-home" data-dish-add="${dish.id}" data-stop-card="true">
          <span>Add</span>
          ${ICONS.plus}
        </button>
      `
      : `
        <button type="button" class="btn-card-add-menu" data-dish-add="${dish.id}" data-stop-card="true">
          <span>Add to Cart</span>
          ${ICONS.plus}
        </button>
      `;

  return `
    <article class="dish-card card-stagger" style="animation-delay: ${delay}ms" data-open-modal="${dish.id}">
      <div>
        <div class="dish-card-img-wrap">
          ${renderImg(dish.image, `${dish.name} — ${dish.ingredients}`)}
          ${
            badgeText
              ? `<span class="dish-badge ${badgeText === 'SPICY' ? 'is-spicy' : ''}">${escapeHtml(badgeText)}</span>`
              : ''
          }
        </div>
        <div class="dish-card-body">
          <h3 class="dish-card-title">${escapeHtml(dish.name)}</h3>
          <p class="dish-card-weight tabular-nums">${escapeHtml(dish.weight)} / ${escapeHtml(dish.pieces)}</p>
          <p class="dish-card-ingredients">${escapeHtml(dish.ingredients)}</p>
        </div>
      </div>
      <div class="dish-card-footer" data-stop-card="true">
        <span class="dish-price tabular-nums">$${dish.price.toFixed(2)}</span>
        ${actionHtml}
      </div>
    </article>
  `;
}

// ==========================================================================
// Views Rendering
// ==========================================================================

function renderHomeView(animate = true) {
  const featured = MENU_ITEMS.filter((i) => i.featured).slice(0, 4);
  const homeCategories = [
    { label: 'All menu', value: 'All menu', dark: true },
    { label: 'Rolls', value: 'Rolls' },
    { label: 'Nigiri', value: 'Nigiri' },
    { label: 'Baked Rolls', value: 'Baked rolls' },
    { label: 'Sets', value: 'Sets' },
    { label: 'Drinks', value: 'Drinks' },
  ];

  appMain.innerHTML = `
    <div class="${animate ? 'view-enter' : ''}">
      <!-- Hero -->
      <section class="container hero-section">
        <div class="hero-grid">
          <div>
            <p class="eyebrow-red">FRESHLY MADE. NEVER RUSHED.</p>
            <h1 class="hero-headline">
              A little Japan.<br />A lot of flavor.
            </h1>
            <p class="hero-subtitle">
              Beautiful ingredients. Handcrafted rolls. Your favorite ritual, delivered in 35 minutes.
            </p>
            <div class="hero-cta-wrap">
              <button type="button" class="btn-primary-red" data-nav="menu" data-category="All menu">
                <span>Explore Menu</span>
                ${ICONS.arrowRight}
              </button>
              <span class="hero-subnote">Made to order. Made for you.</span>
            </div>
          </div>

          <div class="hero-media-card">
            ${renderImg('./assets/images/hero_platter.jpg', 'Handcrafted Kuroi Sushi platter with salmon nigiri and rolls')}
            <div class="hero-photo-caption">Fresh fish. Every single day.</div>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="container category-strip-section">
        <p class="eyebrow-muted">FIND YOUR FAVORITE</p>
        <div class="category-strip-row no-scrollbar">
          ${homeCategories
            .map(
              (cat) => `
              <button
                type="button"
                class="category-pill-btn ${cat.dark ? 'is-dark' : ''}"
                data-nav="menu"
                data-category="${cat.value}"
              >
                <span>${cat.label}</span>
                ${cat.dark ? ICONS.arrowUpRight : ''}
              </button>
            `
            )
            .join('')}
        </div>
      </section>

      <!-- Chef's Specials -->
      <section class="container featured-section">
        <div class="section-header-row">
          <div>
            <p class="eyebrow-red">CHEF&apos;S SPECIALS / POPULAR</p>
            <h2 class="section-title">The ones you come back for.</h2>
          </div>
          <button type="button" class="link-arrow-btn" data-nav="menu" data-category="All menu">
            <span>View full menu</span>
            ${ICONS.arrowUpRight}
          </button>
        </div>

        <div class="dish-grid">
          ${featured.map((dish, idx) => renderDishCard(dish, 'home', idx)).join('')}
        </div>
      </section>

      <!-- Our Craft -->
      <section class="container craft-section reveal-on-scroll" id="our-craft">
        <div class="craft-grid">
          <div class="craft-media">
            ${renderImg('./assets/images/craft_chef.jpg', 'Sushi chef shaping salmon nigiri by hand')}
          </div>

          <div class="craft-content">
            <p class="eyebrow-red">OUR CRAFT</p>
            <h2 class="craft-headline">
              Good sushi starts<br />long before the roll.
            </h2>
            <p class="craft-prose">
              Ocean-fresh fish, carefully sourced. Japanese rice, seasoned in small batches.
              Every roll made by hand, only when you order. Nothing extra. Nothing less.
            </p>
            <div class="craft-points">
              <div>
                <p class="eyebrow-red tabular-nums">01 / FRESH DAILY</p>
                <p class="craft-point-label">Responsibly sourced fish</p>
              </div>
              <div>
                <p class="eyebrow-red tabular-nums">02 / PERFECTLY SEASONED</p>
                <p class="craft-point-label">Authentic Japanese rice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Promo Banner -->
      <section class="container promo-section reveal-on-scroll">
        <div class="promo-banner">
          <div>
            <p class="promo-eyebrow">BETTER TOGETHER</p>
            <h2 class="promo-title">More rolls. More reasons to stay in.</h2>
            <p class="promo-sub">
              Discover our combo sets. Join Kuroi Club and earn 5% back on every order.
            </p>
            <button type="button" class="btn-promo-white" data-nav="menu" data-category="Sets">
              <span>Find your combo</span>
              ${ICONS.arrowUpRight}
            </button>
          </div>

          <div class="promo-stat-block">
            <div class="promo-stat-num tabular-nums">5%</div>
            <p class="promo-stat-caption">BACK IN KUROI POINTS</p>
          </div>
        </div>
      </section>
    </div>
  `;

  setupScrollReveal();
}

function getFilteredMenuItems() {
  let list = MENU_ITEMS.filter((item) => {
    if (state.category === 'All menu') {
      if (state.selectedTags.length === 0) {
        return item.category !== 'Sets' && item.category !== 'Drinks';
      }
      return true;
    }
    return item.category === state.category;
  });

  if (state.selectedTags.length > 0) {
    list = list.filter((item) => state.selectedTags.every((t) => item.tags.includes(t)));
  }

  const sorted = [...list];
  if (state.sortBy === 'popular') sorted.sort((a, b) => b.popularity - a.popularity);
  if (state.sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
  if (state.sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  return sorted;
}

function renderMenuView(animate = true) {
  const filtered = getFilteredMenuItems();

  appMain.innerHTML = `
    <section class="container page-section ${animate ? 'view-enter' : ''}">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <button type="button" class="breadcrumb-link" data-nav="home">HOME</button>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">MENU</span>
      </nav>

      <div class="page-header-row">
        <div>
          <h1 class="page-title">Find your next favorite.</h1>
          <p class="page-subtitle">Handcrafted to order. Best enjoyed together.</p>
        </div>
        <p class="menu-delivery-note">Freshly rolled. At your door in 35 min.</p>
      </div>

      <!-- Category Tabs with Sliding Underline -->
      <div class="menu-tabs-bar no-scrollbar" id="menu-tabs-bar">
        ${MENU_TABS.map(
          (tab) => `
            <button
              type="button"
              class="menu-tab-btn ${state.category === tab ? 'is-active' : ''}"
              data-menu-tab="${tab}"
            >
              ${tab}
            </button>
          `
        ).join('')}
        <span class="menu-tab-indicator" id="menu-tab-indicator"></span>
      </div>

      <!-- Taste Filters & Sort -->
      <div class="menu-controls-row">
        <div class="taste-filters">
          <span class="taste-label">TASTE &amp; PREFERENCES</span>
          ${TASTE_FILTERS.map((tag) => {
            const active = state.selectedTags.includes(tag);
            return `
              <button
                type="button"
                class="taste-chip ${active ? 'is-active' : ''}"
                data-taste-tag="${tag}"
              >
                ${tag}
              </button>
            `;
          }).join('')}
          ${
            state.selectedTags.length > 0
              ? `<button type="button" class="clear-filters-btn" id="clear-taste-filters">${ICONS.reset} Clear</button>`
              : ''
          }
        </div>

        <div class="menu-sort-group">
          <span class="dish-count-text tabular-nums">
            ${filtered.length} ${filtered.length === 1 ? 'dish' : 'dishes'}
          </span>

          <div class="dropdown-wrap" id="sort-dropdown">
            <button type="button" class="sort-trigger" id="sort-trigger" aria-expanded="false">
              <span>${SORT_LABELS[state.sortBy]}</span>
              ${ICONS.chevronDown}
            </button>

            <div class="dropdown-menu sort-dropdown-menu" id="sort-menu">
              ${Object.keys(SORT_LABELS)
                .map(
                  (key) => `
                  <button
                    type="button"
                    class="dropdown-item ${state.sortBy === key ? 'is-selected' : ''}"
                    data-sort-val="${key}"
                  >
                    ${SORT_LABELS[key]}
                  </button>
                `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Dish Grid -->
      ${
        filtered.length > 0
          ? `<div class="dish-grid">
              ${filtered.map((dish, idx) => renderDishCard(dish, 'menu', idx)).join('')}
            </div>`
          : `<div class="empty-filter-box">
              <h3>No dishes match these filters</h3>
              <p>Try clearing a preference tag or switching back to the full menu.</p>
              <button type="button" class="btn-primary-red" id="reset-all-filters">Reset all filters</button>
            </div>`
      }
    </section>
  `;

  requestAnimationFrame(positionMenuTabIndicator);
}

function positionMenuTabIndicator() {
  const bar = document.getElementById('menu-tab-bar') || document.getElementById('menu-tabs-bar');
  const indicator = document.getElementById('menu-tab-indicator');
  if (!bar || !indicator) return;
  const activeTab = bar.querySelector('.menu-tab-btn.is-active');
  if (!activeTab) return;
  indicator.style.width = `${activeTab.offsetWidth}px`;
  indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
}

function renderCartView(animate = true) {
  if (state.orderConfirmation) {
    const conf = state.orderConfirmation;
    appMain.innerHTML = `
      <section class="confirmation-wrap ${animate ? 'view-enter' : ''}">
        <div class="confirmation-card">
          <div class="confirm-icon-box">${ICONS.checkCircle}</div>
          <p class="eyebrow-red tabular-nums">ORDER #${escapeHtml(conf.orderNumber)} CONFIRMED</p>
          <h1 class="confirm-title">It&apos;s rolling, ${escapeHtml(conf.customerName.split(' ')[0])}.</h1>
          <p class="confirm-sub">
            Our chefs have received your order and are preparing every roll fresh by hand.
          </p>

          <div class="confirm-grid">
            <div>
              <p class="eyebrow-muted">${conf.mode === 'delivery' ? 'DELIVERING TO' : 'PICKUP LOCATION'}</p>
              <p class="confirm-field-val">${escapeHtml(conf.address)}</p>
            </div>
            <div>
              <p class="eyebrow-muted">ESTIMATED TIME</p>
              <p class="confirm-field-val">
                <span style="color: var(--accent-red); display:inline-flex; width:16px; height:16px;">${ICONS.clock}</span>
                <span>${escapeHtml(conf.eta)}</span>
              </p>
            </div>
            <div>
              <p class="eyebrow-muted">ORDER SUMMARY</p>
              <p class="confirm-field-val tabular-nums">
                ${conf.itemsCount} ${conf.itemsCount === 1 ? 'dish' : 'dishes'} · ${conf.chopsticks} chopstick sets
              </p>
            </div>
            <div>
              <p class="eyebrow-muted">TOTAL PAID (${conf.paymentMethod === 'card' ? 'CARD' : 'CASH'})</p>
              <p class="confirm-field-val tabular-nums" style="font-family:var(--font-display); font-size:18px; font-weight:700;">
                $${conf.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div class="confirm-actions">
            <button type="button" class="btn-primary-red" id="conf-browse-menu">Browse Menu</button>
            <button type="button" class="btn-secondary-warm" id="conf-back-home">Back to Home</button>
          </div>
        </div>
      </section>
    `;
    return;
  }

  const { count, subtotal } = getCartStats();
  const promoRule = state.appliedPromo ? PROMO_CODES[state.appliedPromo] : null;
  const discountAmount = promoRule
    ? promoRule.type === 'percent'
      ? Number((subtotal * promoRule.value).toFixed(2))
      : Math.min(subtotal, promoRule.value)
    : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const deliveryFee =
    state.fulfillment === 'pickup'
      ? 0
      : discountedSubtotal >= 50 || discountedSubtotal === 0
      ? 0
      : 4.99;
  const salesTax = Number((discountedSubtotal * 0.08875).toFixed(2));
  const finalTotal = Number((discountedSubtotal + deliveryFee + salesTax).toFixed(2));

  appMain.innerHTML = `
    <section class="container page-section ${animate ? 'view-enter' : ''}">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <button type="button" class="breadcrumb-link" data-nav="home">HOME</button>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">YOUR CART</span>
      </nav>

      <div class="page-header-row">
        <div class="cart-header-title-wrap">
          <h1 class="page-title">Your next good meal.</h1>
          <span class="cart-count-sub tabular-nums">${count} ${count === 1 ? 'item' : 'items'}</span>
        </div>
        <button type="button" class="link-arrow-btn link-red-arrow" data-nav="menu" data-category="All menu">
          <span>Continue exploring</span>
          ${ICONS.arrowUpRight}
        </button>
      </div>

      <div class="cart-layout-grid">
        <!-- Left Column -->
        <div class="cart-left-col">
          ${
            state.cart.length > 0
              ? `<div class="cart-items-list">
                  ${state.cart
                    .map(
                      (item) => `
                      <div class="cart-item-card">
                        <div class="cart-item-info">
                          <div class="cart-item-thumb">
                            ${renderImg(item.image, item.name)}
                          </div>
                          <div>
                            <h2 class="cart-item-title">${escapeHtml(item.name)}</h2>
                            <p class="cart-item-meta tabular-nums">${escapeHtml(item.weightLabel)}</p>
                            ${
                              item.extras.length > 0
                                ? `<p class="cart-item-extras">+ ${item.extras.map((e) => escapeHtml(e.label)).join(', ')}</p>`
                                : ''
                            }
                          </div>
                        </div>

                        <div class="cart-item-controls">
                          <div class="qty-stepper is-subtle">
                            <button type="button" class="qty-btn" data-cart-dec="${escapeHtml(item.cartKey)}" aria-label="Decrease ${escapeHtml(item.name)}">
                              ${ICONS.minus}
                            </button>
                            <span class="qty-val tabular-nums">${item.quantity}</span>
                            <button type="button" class="qty-btn" data-cart-inc="${escapeHtml(item.cartKey)}" aria-label="Increase ${escapeHtml(item.name)}">
                              ${ICONS.plus}
                            </button>
                          </div>

                          <div class="cart-item-price-group">
                            <span class="cart-item-price tabular-nums">$${(item.unitPrice * item.quantity).toFixed(2)}</span>
                            <button type="button" class="remove-item-btn" data-cart-remove="${escapeHtml(item.cartKey)}" aria-label="Remove ${escapeHtml(item.name)}">
                              ${ICONS.close}
                            </button>
                          </div>
                        </div>
                      </div>
                    `
                    )
                    .join('')}
                </div>`
              : `<div class="empty-cart-card">
                  ${ICONS.bag}
                  <h2>Your bag is empty</h2>
                  <p>Explore our handcrafted rolls, nigiri, and combo sets to get started.</p>
                  <button type="button" class="btn-primary-red" data-nav="menu" data-category="All menu">
                    Explore Menu
                  </button>
                </div>`
          }

          <!-- Chopsticks & Napkins -->
          <div class="chopsticks-box">
            <div>
              <h3 class="chopsticks-title">A seat for everyone</h3>
              <p class="chopsticks-sub">How many sets of chopsticks &amp; napkins?</p>
            </div>
            <div class="qty-stepper is-white">
              <button type="button" class="qty-btn" id="chopsticks-dec" aria-label="Decrease chopstick sets">
                ${ICONS.minus}
              </button>
              <span class="qty-val tabular-nums">${state.chopsticks}</span>
              <button type="button" class="qty-btn" id="chopsticks-inc" aria-label="Increase chopstick sets">
                ${ICONS.plus}
              </button>
            </div>
          </div>

          <!-- A little something extra? -->
          <div>
            <div class="addons-header">
              <h3 class="addons-title">A little something extra?</h3>
              <div class="addons-nav">
                <button type="button" class="icon-circle-btn" id="addons-prev" aria-label="Scroll extras left">
                  ${ICONS.chevronLeft}
                </button>
                <button type="button" class="icon-circle-btn" id="addons-next" aria-label="Scroll extras right">
                  ${ICONS.chevronRight}
                </button>
              </div>
            </div>

            <div class="addons-scroll no-scrollbar" id="addons-scroll-track">
              ${CART_ADDONS.map(
                (addon) => `
                  <div class="addon-card">
                    <div class="addon-thumb">${renderImg(addon.image, addon.name)}</div>
                    <div class="addon-info">
                      <p class="addon-name">${escapeHtml(addon.name)}</p>
                      <p class="addon-meta tabular-nums">${escapeHtml(addon.size)} · $${addon.price.toFixed(2)}</p>
                      <button type="button" class="btn-addon-add" data-addon-id="${addon.id}">
                        <span>Add</span>
                        ${ICONS.plus}
                      </button>
                    </div>
                  </div>
                `
              ).join('')}
            </div>
          </div>

          <!-- Promo Code -->
          <div class="promo-card">
            <label for="promo-code-input" class="promo-label">Have a little secret code?</label>
            <form class="promo-form" id="promo-form">
              <div class="promo-input-wrap">
                ${ICONS.tag}
                <input
                  id="promo-code-input"
                  class="promo-input"
                  type="text"
                  value="${escapeHtml(state.promoInput)}"
                  placeholder="Enter promo code (e.g. KUROI5)"
                />
              </div>
              <button type="submit" class="btn-apply-promo">Apply</button>
            </form>

            ${
              state.appliedPromo && promoRule
                ? `<div class="promo-applied-bar">
                    <span>Applied <strong>${escapeHtml(state.appliedPromo)}</strong> — ${escapeHtml(promoRule.label)}</span>
                    <button type="button" class="promo-remove-btn" id="remove-promo-btn">Remove</button>
                  </div>`
                : ''
            }
            ${state.promoError ? `<p class="promo-error">${escapeHtml(state.promoError)}</p>` : ''}
          </div>

          <p class="cart-closing-note">Made to order. Packed with care. Delivered with a smile.</p>
        </div>

        <!-- Right Column: Checkout Form -->
        <div>
          <form class="checkout-card" id="checkout-form">
            <div>
              <h2 class="checkout-title">Almost at your door.</h2>

              <div class="segmented-toggle ${state.fulfillment === 'pickup' ? 'is-pickup' : ''}">
                <span class="segmented-pill-bg"></span>
                <button
                  type="button"
                  class="segmented-btn ${state.fulfillment === 'delivery' ? 'is-active' : ''}"
                  data-fulfillment="delivery"
                >
                  Delivery
                </button>
                <button
                  type="button"
                  class="segmented-btn ${state.fulfillment === 'pickup' ? 'is-active' : ''}"
                  data-fulfillment="pickup"
                >
                  Pickup
                </button>
              </div>

              <p class="checkout-eta">
                ${
                  state.fulfillment === 'delivery'
                    ? discountedSubtotal >= 50 || subtotal === 0
                      ? '35–45 min · Free delivery'
                      : '35–45 min · $4.99 delivery (free on $50+)'
                    : '15–20 min · Pickup at 128 Spring Street'
                }
              </p>
            </div>

            <div class="form-block">
              <p class="form-block-title">${state.fulfillment === 'delivery' ? 'Delivery details' : 'Pickup contact'}</p>
              <div class="form-row-2">
                <div>
                  <label class="field-label" for="input-full-name">Full name</label>
                  <input class="text-input" id="input-full-name" type="text" value="${escapeHtml(state.form.fullName)}" />
                </div>
                <div>
                  <label class="field-label" for="input-phone">Phone number</label>
                  <input class="text-input" id="input-phone" type="tel" value="${escapeHtml(state.form.phone)}" />
                </div>
              </div>

              ${
                state.fulfillment === 'delivery'
                  ? `<div>
                      <label class="field-label" for="input-street">Street address</label>
                      <input class="text-input" id="input-street" type="text" value="${escapeHtml(state.form.street)}" />
                    </div>
                    <div class="form-row-2-fixed">
                      <div>
                        <label class="field-label" for="input-apt">Apartment / floor</label>
                        <input class="text-input" id="input-apt" type="text" value="${escapeHtml(state.form.apt)}" />
                      </div>
                      <div>
                        <label class="field-label" for="input-zip">ZIP code</label>
                        <input class="text-input tabular-nums" id="input-zip" type="text" value="${escapeHtml(state.form.zip)}" />
                      </div>
                    </div>`
                  : ''
              }
            </div>

            <div>
              <p class="field-label" style="font-size:11.5px; color:var(--ink-muted); margin-bottom:8px;">
                ${state.fulfillment === 'delivery' ? 'Delivery time' : 'Pickup time'}
              </p>
              <div class="time-options-grid">
                <button
                  type="button"
                  class="time-btn ${state.deliveryTimeMode === 'asap' ? 'is-active' : ''}"
                  data-time-mode="asap"
                >
                  <span class="status-dot"></span>
                  <span>ASAP · ${state.fulfillment === 'delivery' ? '35–45 min' : '15–20 min'}</span>
                </button>
                <button
                  type="button"
                  class="time-btn ${state.deliveryTimeMode === 'later' ? 'is-active' : ''}"
                  data-time-mode="later"
                >
                  <span style="display:inline-flex; width:14px; height:14px;">${ICONS.clock}</span>
                  <span>Schedule for later</span>
                </button>
              </div>

              ${
                state.deliveryTimeMode === 'later'
                  ? `<div class="schedule-select-wrap">
                      <select class="schedule-select" id="schedule-slot-select" aria-label="Select scheduled time slot">
                        ${TIME_SLOTS.map(
                          (slot) =>
                            `<option value="${escapeHtml(slot)}" ${state.scheduledSlot === slot ? 'selected' : ''}>${escapeHtml(slot)}</option>`
                        ).join('')}
                      </select>
                    </div>`
                  : ''
              }
            </div>

            <div>
              <p class="form-block-title" style="margin-bottom:8px;">Payment method</p>
              <div class="payment-options">
                <label class="payment-option ${state.paymentMethod === 'card' ? 'is-selected' : ''}">
                  <input type="radio" name="payment" value="card" ${state.paymentMethod === 'card' ? 'checked' : ''} />
                  <div>
                    <p class="payment-title">Card online</p>
                    <p class="payment-sub">VISA · Mastercard · Apple Pay</p>
                  </div>
                </label>

                <label class="payment-option ${state.paymentMethod === 'cash' ? 'is-selected' : ''}">
                  <input type="radio" name="payment" value="cash" ${state.paymentMethod === 'cash' ? 'checked' : ''} />
                  <span class="payment-title" style="font-weight:500;">
                    ${state.fulfillment === 'delivery' ? 'Cash on delivery' : 'Pay on pickup'}
                  </span>
                </label>
              </div>
            </div>

            <div class="totals-block">
              <div class="totals-row">
                <span class="tabular-nums">Subtotal · ${count} ${count === 1 ? 'item' : 'items'}</span>
                <span class="val-dark tabular-nums">$${subtotal.toFixed(2)}</span>
              </div>

              ${
                discountAmount > 0
                  ? `<div class="totals-row is-accent">
                      <span>Promo (${escapeHtml(state.appliedPromo)})</span>
                      <span class="tabular-nums">-$${discountAmount.toFixed(2)}</span>
                    </div>`
                  : ''
              }

              <div class="totals-row">
                <span>${state.fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                <span class="${deliveryFee === 0 ? 'is-accent' : 'val-dark'} tabular-nums" style="${deliveryFee === 0 ? 'color:var(--accent-red); font-weight:500;' : ''}">
                  ${deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div class="totals-row">
                <span>Sales tax (8.875%)</span>
                <span class="val-dark tabular-nums">$${salesTax.toFixed(2)}</span>
              </div>

              <div class="totals-final">
                <span class="totals-final-label">Total</span>
                <span class="totals-final-val tabular-nums">$${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            ${state.formError ? `<p class="promo-error">${escapeHtml(state.formError)}</p>` : ''}

            <button type="submit" class="btn-place-order" ${state.cart.length === 0 ? 'disabled' : ''}>
              <span>Place order</span>
              <span class="tabular-nums" style="font-weight:700;">$${finalTotal.toFixed(2)}</span>
            </button>

            <p class="checkout-disclaimer">By placing your order, you agree to our Terms.</p>
          </form>
        </div>
      </div>
    </section>
  `;
}

function renderCurrentView(animate = true) {
  if (state.view === 'home') renderHomeView(animate);
  else if (state.view === 'menu') renderMenuView(animate);
  else if (state.view === 'cart') renderCartView(animate);
}

// ==========================================================================
// Product & Legal Modals
// ==========================================================================

function openProductModal(dishId) {
  const dish = MENU_ITEMS.find((m) => m.id === dishId);
  if (!dish) return;
  state.modalDishId = dishId;
  state.modalQty = 1;
  state.modalExtras = [];
  renderProductModalContent(dish);
  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function renderProductModalContent(dish) {
  const extrasSum = MAKE_IT_YOURS_EXTRAS.filter((ex) => state.modalExtras.includes(ex.id)).reduce(
    (sum, ex) => sum + ex.price,
    0
  );
  const lineTotal = (dish.price + extrasSum) * state.modalQty;

  productModalDialog.innerHTML = `
    <button type="button" class="modal-close-floating" id="close-product-modal" aria-label="Close product details">
      ${ICONS.close}
    </button>

    <div class="modal-left-col">
      <div class="modal-photo-wrap">
        ${renderImg(dish.modalImage || dish.image, dish.name)}
      </div>
      <div class="modal-craft-block">
        <p class="eyebrow-red">HANDCRAFTED, ALWAYS.</p>
        <h4 class="modal-craft-title">
          Simple ingredients.<br />Something extraordinary.
        </h4>
        <p class="modal-craft-copy">${escapeHtml(dish.craftNote)}</p>
      </div>
    </div>

    <div class="modal-right-col">
      <div class="modal-scroll-body">
        <div>
          <p class="eyebrow-red" style="padding-right:32px;">${escapeHtml(dish.kicker)}</p>
          <h2 class="modal-dish-title" id="modal-dish-title">${escapeHtml(dish.name)}</h2>
          <p class="modal-dish-weight tabular-nums">${escapeHtml(dish.weight)} / ${escapeHtml(dish.pieces)}</p>
          <p class="modal-dish-desc">${escapeHtml(dish.description)}</p>
        </div>

        <div class="modal-section-divider">
          <h3 class="modal-subheading">Ingredients</h3>
          <p class="modal-ingredients-text">
            ${escapeHtml(dish.ingredients)}. Prepared daily with short-grain Japanese sushi rice,
            seasoned vinegar, crisp roasted nori, and toasted sesame seeds.
          </p>
        </div>

        <div class="modal-section-divider">
          <p class="eyebrow-muted" style="margin-bottom:0;">NUTRITION PER 100G</p>
          <div class="nutrition-grid">
            <div>
              <div class="nutrition-val tabular-nums">${dish.nutrition.kcal}</div>
              <div class="nutrition-lbl">kcal</div>
            </div>
            <div>
              <div class="nutrition-val tabular-nums">${escapeHtml(dish.nutrition.protein)}</div>
              <div class="nutrition-lbl">Protein</div>
            </div>
            <div>
              <div class="nutrition-val tabular-nums">${escapeHtml(dish.nutrition.carbs)}</div>
              <div class="nutrition-lbl">Carbs</div>
            </div>
            <div>
              <div class="nutrition-val tabular-nums">${escapeHtml(dish.nutrition.fat)}</div>
              <div class="nutrition-lbl">Fat</div>
            </div>
          </div>
          <p class="allergens-note">Allergens: ${escapeHtml(dish.allergens)}</p>
        </div>

        <div class="modal-section-divider">
          <h3 class="modal-subheading">Make it yours</h3>
          <div class="extras-list">
            ${MAKE_IT_YOURS_EXTRAS.map((extra) => {
              const checked = state.modalExtras.includes(extra.id);
              return `
                <label class="extra-option-label ${checked ? 'is-checked' : ''}" data-modal-extra="${extra.id}">
                  <span class="extra-check-left">
                    <span class="extra-checkbox-box">${checked ? ICONS.check : ''}</span>
                    <span class="extra-name">${escapeHtml(extra.label)}</span>
                  </span>
                  <span class="extra-price tabular-nums">+$${extra.price.toFixed(2)}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="modal-sticky-bar">
        <div class="modal-action-row">
          <div class="qty-stepper modal-stepper">
            <button type="button" class="qty-btn" id="modal-qty-dec" aria-label="Decrease quantity">
              ${ICONS.minus}
            </button>
            <span class="qty-val tabular-nums" id="modal-qty-val">${state.modalQty}</span>
            <button type="button" class="qty-btn" id="modal-qty-inc" aria-label="Increase quantity">
              ${ICONS.plus}
            </button>
          </div>
          <button type="button" class="btn-modal-add" id="modal-confirm-add">
            <span>Add to Cart</span>
            <span class="tabular-nums" style="font-weight:700;" id="modal-line-total">$${lineTotal.toFixed(2)}</span>
          </button>
        </div>
        <p class="modal-footnote">Soy sauce, wasabi &amp; ginger included with every roll.</p>
      </div>
    </div>
  `;
}

function closeProductModal() {
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden', 'true');
  state.modalDishId = null;
  if (!mobileDrawer.classList.contains('is-open')) {
    document.body.style.overflow = '';
  }
}

function openLegalModal(type) {
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions';
  const copy =
    type === 'privacy'
      ? 'Kuroi Sushi respects your privacy. Delivery contact details and order preferences are used solely to prepare and deliver your handcrafted sushi order within our Manhattan & Brooklyn delivery zones.'
      : 'All sushi rolls and nigiri are prepared to order. Delivery is complimentary on orders of $50 or more within 5 miles of 128 Spring Street. Allergen inquiries can be noted at checkout or by calling +1 (212) 555-0198.';

  legalModalDialog.innerHTML = `
    <div class="legal-header">
      <h3 class="font-display" id="legal-modal-title" style="font-size:18px; font-weight:700;">${title}</h3>
      <button type="button" class="icon-circle-btn" id="close-legal-icon" aria-label="Close">
        ${ICONS.close}
      </button>
    </div>
    <p class="legal-copy">${copy}</p>
    <button type="button" class="btn-legal-close" id="close-legal-btn">Close</button>
  `;

  legalModal.classList.add('is-open');
  legalModal.setAttribute('aria-hidden', 'false');
}

function closeLegalModal() {
  legalModal.classList.remove('is-open');
  legalModal.setAttribute('aria-hidden', 'true');
}

// ==========================================================================
// Drawers, Dropdowns & Scroll Reveal
// ==========================================================================

function openMobileDrawer() {
  mobileDrawer.classList.add('is-open');
  mobileDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  mobileDrawer.classList.remove('is-open');
  mobileDrawer.setAttribute('aria-hidden', 'true');
  if (!state.modalDishId) {
    document.body.style.overflow = '';
  }
}

function closeLocationDropdown() {
  locationMenu.classList.remove('is-open');
  locationTrigger.setAttribute('aria-expanded', 'false');
}

function setupScrollReveal() {
  const els = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => observer.observe(el));
}

// ==========================================================================
// Event Delegation
// ==========================================================================

document.addEventListener('click', (e) => {
  const target = e.target;

  // Navigation buttons
  const navBtn = target.closest('[data-nav]');
  if (navBtn) {
    e.preventDefault();
    const view = navBtn.getAttribute('data-nav');
    const cat = navBtn.getAttribute('data-category');
    const scroll = navBtn.getAttribute('data-scroll');
    navigateTo(view, cat, scroll);
    return;
  }

  // Location dropdown trigger
  if (target.closest('#location-trigger')) {
    const isOpen = locationMenu.classList.toggle('is-open');
    locationTrigger.setAttribute('aria-expanded', String(isOpen));
    return;
  }

  // Select neighborhood
  const areaBtn = target.closest('[data-select-area]');
  if (areaBtn) {
    state.neighborhood = areaBtn.getAttribute('data-select-area');
    closeLocationDropdown();
    updateHeaderUI(false);
    return;
  }

  // Mobile drawer controls
  if (target.closest('#mobile-menu-open')) {
    openMobileDrawer();
    return;
  }
  if (target.closest('#mobile-menu-close') || target.closest('#mobile-drawer-backdrop')) {
    closeMobileDrawer();
    return;
  }

  // Menu category tabs
  const menuTab = target.closest('[data-menu-tab]');
  if (menuTab) {
    state.category = menuTab.getAttribute('data-menu-tab');
    renderMenuView(false);
    updateHeaderUI(false);
    return;
  }

  // Taste filter chips
  const tasteBtn = target.closest('[data-taste-tag]');
  if (tasteBtn) {
    const tag = tasteBtn.getAttribute('data-taste-tag');
    if (state.selectedTags.includes(tag)) {
      state.selectedTags = state.selectedTags.filter((t) => t !== tag);
    } else {
      state.selectedTags.push(tag);
    }
    renderMenuView(false);
    return;
  }

  if (target.closest('#clear-taste-filters')) {
    state.selectedTags = [];
    renderMenuView(false);
    return;
  }

  if (target.closest('#reset-all-filters')) {
    state.selectedTags = [];
    state.category = 'All menu';
    renderMenuView(false);
    return;
  }

  // Sort dropdown
  if (target.closest('#sort-trigger')) {
    const sortMenu = document.getElementById('sort-menu');
    const trigger = document.getElementById('sort-trigger');
    const isOpen = sortMenu.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
    return;
  }

  const sortOpt = target.closest('[data-sort-val]');
  if (sortOpt) {
    state.sortBy = sortOpt.getAttribute('data-sort-val');
    renderMenuView(false);
    return;
  }

  // Card Quick Add / Increment / Decrement
  const addBtn = target.closest('[data-dish-add]');
  if (addBtn) {
    const dish = MENU_ITEMS.find((m) => m.id === addBtn.getAttribute('data-dish-add'));
    if (dish) {
      addToCart(dish, 1, []);
      renderCurrentView(false);
    }
    return;
  }

  const incBtn = target.closest('[data-dish-inc]');
  if (incBtn) {
    incrementDish(incBtn.getAttribute('data-dish-inc'));
    renderCurrentView(false);
    return;
  }

  const decBtn = target.closest('[data-dish-dec]');
  if (decBtn) {
    decrementDish(decBtn.getAttribute('data-dish-dec'));
    renderCurrentView(false);
    return;
  }

  // Open Product Modal (click anywhere on card outside action footer)
  if (!target.closest('[data-stop-card]')) {
    const card = target.closest('[data-open-modal]');
    if (card) {
      openProductModal(card.getAttribute('data-open-modal'));
      return;
    }
  }

  // Product Modal Interactions
  if (target.closest('#close-product-modal') || target.closest('#product-modal-backdrop')) {
    closeProductModal();
    return;
  }

  const extraLabel = target.closest('[data-modal-extra]');
  if (extraLabel && state.modalDishId) {
    e.preventDefault();
    const extraId = extraLabel.getAttribute('data-modal-extra');
    if (state.modalExtras.includes(extraId)) {
      state.modalExtras = state.modalExtras.filter((id) => id !== extraId);
    } else {
      state.modalExtras.push(extraId);
    }
    const dish = MENU_ITEMS.find((m) => m.id === state.modalDishId);
    if (dish) renderProductModalContent(dish);
    return;
  }

  if (target.closest('#modal-qty-dec') && state.modalDishId) {
    state.modalQty = Math.max(1, state.modalQty - 1);
    const dish = MENU_ITEMS.find((m) => m.id === state.modalDishId);
    if (dish) renderProductModalContent(dish);
    return;
  }

  if (target.closest('#modal-qty-inc') && state.modalDishId) {
    state.modalQty += 1;
    const dish = MENU_ITEMS.find((m) => m.id === state.modalDishId);
    if (dish) renderProductModalContent(dish);
    return;
  }

  if (target.closest('#modal-confirm-add') && state.modalDishId) {
    const dish = MENU_ITEMS.find((m) => m.id === state.modalDishId);
    if (dish) {
      const selectedExtras = MAKE_IT_YOURS_EXTRAS.filter((ex) =>
        state.modalExtras.includes(ex.id)
      );
      addToCart(dish, state.modalQty, selectedExtras);
      closeProductModal();
      renderCurrentView(false);
    }
    return;
  }

  // Cart Interactions
  const cartInc = target.closest('[data-cart-inc]');
  if (cartInc) {
    updateCartKeyQty(cartInc.getAttribute('data-cart-inc'), 1);
    renderCartView(false);
    return;
  }

  const cartDec = target.closest('[data-cart-dec]');
  if (cartDec) {
    updateCartKeyQty(cartDec.getAttribute('data-cart-dec'), -1);
    renderCartView(false);
    return;
  }

  const cartRemove = target.closest('[data-cart-remove]');
  if (cartRemove) {
    removeCartKey(cartRemove.getAttribute('data-cart-remove'));
    renderCartView(false);
    return;
  }

  if (target.closest('#chopsticks-dec')) {
    state.chopsticks = Math.max(0, state.chopsticks - 1);
    renderCartView(false);
    return;
  }

  if (target.closest('#chopsticks-inc')) {
    state.chopsticks += 1;
    renderCartView(false);
    return;
  }

  if (target.closest('#addons-prev')) {
    const track = document.getElementById('addons-scroll-track');
    if (track) track.scrollBy({ left: -240, behavior: 'smooth' });
    return;
  }

  if (target.closest('#addons-next')) {
    const track = document.getElementById('addons-scroll-track');
    if (track) track.scrollBy({ left: 240, behavior: 'smooth' });
    return;
  }

  const addonBtn = target.closest('[data-addon-id]');
  if (addonBtn) {
    const addon = CART_ADDONS.find((a) => a.id === addonBtn.getAttribute('data-addon-id'));
    if (addon) {
      const dish = MENU_ITEMS.find((m) => m.id === addon.dishId);
      if (dish) {
        addToCart(dish, 1, []);
        renderCartView(false);
      }
    }
    return;
  }

  if (target.closest('#remove-promo-btn')) {
    state.appliedPromo = null;
    state.promoInput = '';
    state.promoError = '';
    renderCartView(false);
    return;
  }

  const fulfillmentBtn = target.closest('[data-fulfillment]');
  if (fulfillmentBtn) {
    state.fulfillment = fulfillmentBtn.getAttribute('data-fulfillment');
    renderCartView(false);
    return;
  }

  const timeModeBtn = target.closest('[data-time-mode]');
  if (timeModeBtn) {
    state.deliveryTimeMode = timeModeBtn.getAttribute('data-time-mode');
    renderCartView(false);
    return;
  }

  if (target.closest('#conf-browse-menu')) {
    state.orderConfirmation = null;
    navigateTo('menu', 'All menu');
    return;
  }

  if (target.closest('#conf-back-home')) {
    state.orderConfirmation = null;
    navigateTo('home');
    return;
  }

  // Legal Modal
  if (target.closest('#btn-privacy')) {
    openLegalModal('privacy');
    return;
  }
  if (target.closest('#btn-terms')) {
    openLegalModal('terms');
    return;
  }
  if (
    target.closest('#close-legal-icon') ||
    target.closest('#close-legal-btn') ||
    target.closest('#legal-modal-backdrop')
  ) {
    closeLegalModal();
    return;
  }

  // Close open dropdowns when clicking outside
  if (!target.closest('#neighborhood-dropdown')) {
    closeLocationDropdown();
  }
  if (!target.closest('#sort-dropdown')) {
    const sortMenu = document.getElementById('sort-menu');
    const sortTrigger = document.getElementById('sort-trigger');
    if (sortMenu && sortTrigger) {
      sortMenu.classList.remove('is-open');
      sortTrigger.setAttribute('aria-expanded', 'false');
    }
  }
});

// Input synchronization & Form submissions
document.addEventListener('input', (e) => {
  const t = e.target;
  if (t.id === 'promo-code-input') {
    state.promoInput = t.value;
    state.promoError = '';
  } else if (t.id === 'input-full-name') state.form.fullName = t.value;
  else if (t.id === 'input-phone') state.form.phone = t.value;
  else if (t.id === 'input-street') state.form.street = t.value;
  else if (t.id === 'input-apt') state.form.apt = t.value;
  else if (t.id === 'input-zip') state.form.zip = t.value;
});

document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.name === 'payment') {
    state.paymentMethod = t.value;
    renderCartView(false);
  } else if (t.id === 'schedule-slot-select') {
    state.scheduledSlot = t.value;
  }
});

document.addEventListener('submit', (e) => {
  if (e.target.id === 'promo-form') {
    e.preventDefault();
    const code = state.promoInput.trim().toUpperCase();
    if (!code) {
      state.promoError = 'Enter a promo code (try KUROI5)';
    } else if (PROMO_CODES[code]) {
      state.appliedPromo = code;
      state.promoError = '';
    } else {
      state.promoError = 'Code not recognized. Try KUROI5 or WELCOME10.';
    }
    renderCartView(false);
    return;
  }

  if (e.target.id === 'checkout-form') {
    e.preventDefault();
    if (state.cart.length === 0) return;

    if (!state.form.fullName.trim() || !state.form.phone.trim()) {
      state.formError = 'Please enter your name and phone number.';
      renderCartView(false);
      return;
    }

    if (state.fulfillment === 'delivery' && (!state.form.street.trim() || !state.form.zip.trim())) {
      state.formError = 'Please enter your street address and ZIP code.';
      renderCartView(false);
      return;
    }

    const { count, subtotal } = getCartStats();
    const promoRule = state.appliedPromo ? PROMO_CODES[state.appliedPromo] : null;
    const discount = promoRule
      ? promoRule.type === 'percent'
        ? Number((subtotal * promoRule.value).toFixed(2))
        : Math.min(subtotal, promoRule.value)
      : 0;
    const discountedSubtotal = Math.max(0, subtotal - discount);
    const deliveryFee = state.fulfillment === 'pickup' ? 0 : discountedSubtotal >= 50 ? 0 : 4.99;
    const tax = Number((discountedSubtotal * 0.08875).toFixed(2));
    const total = Number((discountedSubtotal + deliveryFee + tax).toFixed(2));

    state.formError = '';
    state.orderConfirmation = {
      orderNumber: `KR-${Math.floor(1000 + Math.random() * 9000)}`,
      mode: state.fulfillment,
      customerName: state.form.fullName.trim(),
      address:
        state.fulfillment === 'delivery'
          ? `${state.form.street.trim()}${state.form.apt.trim() ? `, ${state.form.apt.trim()}` : ''}, NY ${state.form.zip.trim()}`
          : '128 Spring Street, New York, NY 10012 (Pickup)',
      eta:
        state.deliveryTimeMode === 'asap'
          ? state.fulfillment === 'delivery'
            ? '35–45 minutes'
            : '15–20 minutes'
          : state.scheduledSlot,
      paymentMethod: state.paymentMethod,
      total,
      itemsCount: count,
      chopsticks: state.chopsticks,
    };

    state.cart = [];
    updateHeaderUI(true);
    renderCartView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Keyboard Esc support & Resize recalculation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductModal();
    closeLegalModal();
    closeMobileDrawer();
    closeLocationDropdown();
  }
});

window.addEventListener('resize', () => {
  if (state.view === 'menu') {
    positionMenuTabIndicator();
  }
});

// Initialize App
renderCurrentView(true);
updateHeaderUI(false);
