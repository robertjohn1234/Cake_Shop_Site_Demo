// ============================================================
//  EDIT THIS FILE for each shop — name, links, cakes, prices,
//  and the options in the "Design your cake" builder.
// ============================================================

export const shop = {
  name: 'Layer & Lace',
  tagline: 'Handcrafted celebration cakes, made to order.',
  // The owner's Messenger link: https://m.me/<facebook-page-username>
  messenger: 'https://m.me/your.page.name',
  facebook: 'https://facebook.com/your.page.name',
  phone: '0917 000 0000',
  address: '123 Sample Street, Brgy. Example, Your City',
  mapsUrl: 'https://maps.google.com/?q=Your+City+Philippines',
  hours: [
    { days: 'Tue – Sat', time: '9:00 AM – 7:00 PM' },
    { days: 'Sunday', time: '10:00 AM – 4:00 PM' },
    { days: 'Monday', time: 'Closed (baking day)' },
  ],
  // How many days ahead customers must order
  leadDays: { ready: 2, custom: 3 },
  payment: {
    gcashName: 'M**A L.',
    gcashNumber: '0917 000 0000',
    note: '50% downpayment via GCash confirms your order. The balance is paid on pickup or delivery.',
  },
  paymentOptions: ['GCash (50% downpayment)', 'GCash (full payment)', 'Cash on pickup'],
  deliveryNote: "Delivery fee depends on your location — we'll confirm it in Messenger.",
  currency: '₱',
};

// Occasions shown in the strip under the hero and in the builder
export const occasions = ['Birthday', 'Wedding', 'Anniversary', 'Christening', 'Graduation', 'Just because'];

// ------------------------------------------------------------
//  Frosting colors (used by the cake drawings and the builder)
// ------------------------------------------------------------
export const frostings = {
  ivory: { label: 'Classic ivory', light: '#fffaf2', base: '#f6ecdd', dark: '#e2d2bb' },
  blush: { label: 'Blush pink', light: '#fbe3df', base: '#efc4bd', dark: '#d9a39a' },
  sage: { label: 'Sage green', light: '#e6eedf', base: '#c8d5bd', dark: '#a7b99a' },
  lavender: { label: 'Soft lavender', light: '#eee6f6', base: '#d5c6e8', dark: '#b5a1d3' },
  butter: { label: 'Butter yellow', light: '#fbf1cf', base: '#f2df9f', dark: '#dcc277' },
  cocoa: { label: 'Chocolate', light: '#8a6352', base: '#6b4a3a', dark: '#4a3128' },
};

export const drips = {
  none: { label: 'No drip', color: null, add: 0 },
  chocolate: { label: 'Chocolate drip', color: '#4a2f24', add: 150 },
  caramel: { label: 'Caramel drip', color: '#c98b45', add: 150 },
  gold: { label: 'Gold drip', color: '#c9a45c', add: 250 },
};

export const toppers = {
  none: { label: 'No topper', add: 0 },
  berries: { label: 'Fresh berries', add: 200 },
  flowers: { label: 'Fresh flowers', add: 300 },
  candles: { label: 'Gold candles', add: 100 },
};

// ------------------------------------------------------------
//  "Design your cake" builder options
// ------------------------------------------------------------
export const builder = {
  sizes: [
    // scale: how big the cake looks in the preview (1 = full size)
    { id: '6', label: '6" round', serves: 'Serves 8–10', tiers: 1, price: 1200, scale: 0.8 },
    { id: '8', label: '8" round', serves: 'Serves 15–20', tiers: 1, price: 1800, scale: 1 },
    { id: '2tier', label: '2-tier (6" + 8")', serves: 'Serves 30–35', tiers: 2, price: 3800, scale: 1 },
    { id: '3tier', label: '3-tier (4" + 6" + 8")', serves: 'Serves 45–50', tiers: 3, price: 6200, scale: 1 },
  ],
  // color: shown in the "Inside" slice of the preview
  flavors: [
    { label: 'Vanilla chiffon', add: 0, color: '#f2dfae' },
    { label: 'Moist chocolate', add: 0, color: '#5a3a2c' },
    { label: 'Red velvet', add: 150, color: '#a3283a' },
    { label: 'Ube', add: 100, color: '#8d68b3' },
    { label: 'Mocha', add: 100, color: '#9a7056' },
    { label: 'Carrot walnut', add: 200, color: '#c98d4f' },
  ],
  fillings: [
    { label: 'Buttercream', add: 0, color: '#fbf1dc' },
    { label: 'Chocolate ganache', add: 100, color: '#3a2219' },
    { label: 'Cream cheese', add: 100, color: '#fffbf2' },
    { label: 'Ube halaya', add: 100, color: '#5f3d8a' },
    { label: 'Mango cream', add: 150, color: '#f6be45' },
    { label: 'Salted caramel', add: 120, color: '#c98b45' },
  ],
  messageMax: 30,
};

// ------------------------------------------------------------
//  Ready-made cakes on the menu
// ------------------------------------------------------------
export const categories = ['All', 'Signature cakes', 'Bento cakes', 'Cupcakes & minis'];

// look: how the cake is drawn — frosting (from `frostings`), drip, topper, tiers
export const cakes = [
  {
    id: 'ganache',
    name: 'Classic Chocolate Ganache',
    note: 'Moist chocolate · dark ganache',
    desc: 'Rich chocolate layers with silky ganache and a glossy chocolate drip.',
    category: 'Signature cakes',
    tag: 'Bestseller',
    look: { frosting: 'cocoa', drip: 'gold', topper: 'candles', tiers: 1 },
    sizes: [
      { label: '6"', price: 1250 },
      { label: '8"', price: 1850 },
    ],
  },
  {
    id: 'redvelvet',
    name: 'Red Velvet Dream',
    note: 'Red velvet · cream cheese',
    desc: 'Velvety red layers with tangy cream cheese frosting and fresh berries.',
    category: 'Signature cakes',
    look: { frosting: 'ivory', drip: 'none', topper: 'berries', tiers: 1 },
    sizes: [
      { label: '6"', price: 1350 },
      { label: '8"', price: 1950 },
    ],
  },
  {
    id: 'ube',
    name: 'Ube Macapuno',
    note: 'Ube chiffon · ube halaya',
    desc: 'Soft ube chiffon layered with halaya and macapuno, finished in lavender.',
    category: 'Signature cakes',
    tag: 'Pinoy favorite',
    look: { frosting: 'lavender', drip: 'none', topper: 'flowers', tiers: 1 },
    sizes: [
      { label: '6"', price: 1300 },
      { label: '8"', price: 1900 },
    ],
  },
  {
    id: 'mango',
    name: 'Mango Royale',
    note: 'Vanilla chiffon · mango cream',
    desc: 'Light chiffon with fresh Carabao mango and whipped cream.',
    category: 'Signature cakes',
    look: { frosting: 'butter', drip: 'caramel', topper: 'none', tiers: 1 },
    sizes: [
      { label: '6"', price: 1250 },
      { label: '8"', price: 1850 },
    ],
  },
  {
    id: 'strawberry',
    name: 'Strawberry Shortcake',
    note: 'Vanilla sponge · strawberries',
    desc: 'Fluffy sponge, fresh strawberries and soft whipped cream.',
    category: 'Signature cakes',
    look: { frosting: 'blush', drip: 'none', topper: 'berries', tiers: 1 },
    sizes: [
      { label: '6"', price: 1300 },
      { label: '8"', price: 1900 },
    ],
  },
  {
    id: 'bento-classic',
    name: 'Bento Cake',
    note: '4" lunchbox cake · any message',
    desc: 'A cute mini cake for one or two — add your message in the order notes.',
    category: 'Bento cakes',
    tag: 'Trending',
    look: { frosting: 'blush', drip: 'none', topper: 'none', tiers: 1, mini: true },
    sizes: [{ label: '4" box', price: 450 }],
  },
  {
    id: 'bento-choco',
    name: 'Chocolate Bento',
    note: '4" lunchbox cake · chocolate',
    desc: 'Mini chocolate cake with a chocolate drip — perfect as a small gift.',
    category: 'Bento cakes',
    look: { frosting: 'cocoa', drip: 'chocolate', topper: 'none', tiers: 1, mini: true },
    sizes: [{ label: '4" box', price: 480 }],
  },
  {
    id: 'cupcakes',
    name: 'Cupcake Box',
    note: 'Choose up to 2 flavors',
    desc: 'Buttercream cupcakes, beautifully boxed. Tell us your flavors in the notes.',
    category: 'Cupcakes & minis',
    look: { frosting: 'sage', drip: 'none', topper: 'flowers', tiers: 1, mini: true },
    sizes: [
      { label: 'Box of 6', price: 480 },
      { label: 'Box of 12', price: 900 },
    ],
  },
];
