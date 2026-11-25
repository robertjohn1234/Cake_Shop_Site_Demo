# Layer & Lace — Cake Shop Website (demo)

An elegant, boutique-style cake shop site. Customers can order **signature cakes** or **design their own cake** with a live preview, then send the order to the shop's **Messenger**. No backend or database needed.

**How ordering works:** customer adds cakes (or a custom design) → fills name, contact, pickup/delivery, date & time → taps **Send order via Messenger**. The site copies a neat order summary and opens the shop's Messenger chat. The customer pastes, sends, and adds a design photo if they have one.

## Features

- **Design your cake** builder: occasion, size/tiers, flavor, filling, frosting color, drip, topper, message on the cake and design notes. The cake drawing updates live and shows an **estimated price**.
- **Lead time**: the date picker blocks dates that are too soon (ready cakes 2 days, custom cakes 3 days by default).
- **Downpayment note** (50% via GCash) and delivery-fee note.
- Cakes are drawn with CSS, so no product photos are needed to start.
- Cart and the customer's name/contact/address are remembered on their device.

## Run it locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

## Make it a real shop's site

Almost everything is in **`src/shop.js`**:

| What | Where in `shop.js` |
|---|---|
| Shop name, tagline, Messenger link, Facebook, phone, address, map link, hours | `shop` |
| Days of notice needed | `shop.leadDays` → `{ ready: 2, custom: 3 }` |
| GCash details, downpayment text, payment choices | `shop.payment`, `shop.paymentOptions` |
| Ready-made cakes, prices, sizes, badges | `cakes` (and `categories` for the tabs) |
| Builder sizes and base prices | `builder.sizes` |
| Builder flavors / fillings and their add-on prices | `builder.flavors`, `builder.fillings` |
| Frosting colors, drips, toppers (+ add-on prices) | `frostings`, `drips`, `toppers` |
| Occasions | `occasions` |

**Changing a cake's look:** each cake has `look: { frosting, drip, topper, tiers }`, using the names from `frostings`, `drips` and `toppers`. Add `mini: true` for bento cakes and cupcake boxes.

Colors, fonts and animation speeds are at the top of **`src/index.css`** (`:root`).

**Finding the Messenger link:** open the shop's Facebook Page → its username is in the page URL (facebook.com/**username**) → use `https://m.me/username`.

## Project structure

```
src/
  shop.js                 ← shop details, cakes, builder options (edit this)
  index.css               ← all styles
  App.jsx                 ← page sections in order
  lib/cart.jsx            ← cart (saved in the browser)
  lib/order.js            ← builds the Messenger order message + copy helpers
  components/
    Cake.jsx              ← the CSS cake drawing (tiers, drip, topper)
    Hero.jsx              ← headline + cake that builds itself
    Menu.jsx              ← signature cakes with category tabs
    Builder.jsx           ← "Design your cake" with live preview + price
    CartDrawer.jsx        ← cart, order form, lead-time check, Messenger button
    OrderSentModal.jsx    ← "paste & send" instructions
    ...                   ← Navbar, OccasionStrip, HowToOrder, Visit, Footer
```

## Deploy free on Render

1. Push to a GitHub repo.
2. Render → **New → Static Site** → pick the repo.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`

## Notes

- Prices in the builder are **estimates**; the shop confirms the final price in Messenger.
- This is a demo for a fictional shop. Use a real shop's name, logo and photos only with the owner's permission.
