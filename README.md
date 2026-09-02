# VIE KING

*Every head deserves a crown.*

The digital home of VIE KING — a Martinique-born house at the meeting point
of luxury fashion, contemporary art and streetwear, founded by Yannis Cinna.
This is not an ecommerce template: it's an editorial, gallery-like experience
with a full storefront, cart, checkout and admin dashboard underneath it.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens in `tailwind.config.ts`
- **Framer Motion** — page-load and scroll-triggered reveals
- **Supabase** — products, orders, and photo storage (optional — the site
  runs on sample data until you connect it)
- Architecture prepared for **SumUp** as the payment processor

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values described below
npm run dev
```

The site runs immediately with a built-in sample catalogue
(`src/data/mock-products.ts`) — you don't need Supabase to preview or design
against it. Connect Supabase when you're ready to manage real products,
stock and orders.

## Project structure

```
src/
  app/
    (site)/            → storefront: home, /collections, /product/[slug], /checkout
    admin/              → password-protected admin dashboard
    api/                → checkout + admin CRUD routes
  components/
    home/                → the seven homepage sections
    layout/              → header, footer, cart drawer
    ui/                  → buttons, product card, reveal animation, crown mark
    admin/                → admin nav + product form
  lib/                    → Supabase clients, cart context, product/order data layer
  data/mock-products.ts  → fallback catalogue used until Supabase is connected
supabase/schema.sql       → run this once in the Supabase SQL editor
```

## Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run `supabase/schema.sql` — it creates the `products`
   and `orders` tables with row-level security already locked down (the
   public can only *read* active products; all writes go through the
   service role key from your server routes, never the browser).
3. In **Storage**, create a public bucket named `product-photos`.
4. In **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret —
     server-only, never exposed to the browser)
5. Restart the dev server. The homepage, collection and admin dashboard now
   read/write real data automatically — no code changes required.

## Admin dashboard

Visit `/admin`. Set a strong `ADMIN_PASSWORD` in your environment first —
without it, login is disabled. From the dashboard you can add, edit and
remove products, upload photos, adjust stock and prices, and view incoming
orders.

This uses a simple password-gated session cookie, which is enough for a
single-owner storefront. If you later add staff accounts, swap it for
Supabase Auth.

## Connecting SumUp

The checkout flow (`/checkout` → `POST /api/checkout`) already validates the
order, recomputes totals server-side from trusted product data, and saves a
`pending` order. The one piece left is creating the actual payment session.
In `src/app/api/checkout/route.ts`, where the code says:

```ts
// --- SumUp integration point -------------------------------------------
```

add a call to SumUp's Checkout API:

```ts
const sumupRes = await fetch("https://api.sumup.com/v0.1/checkouts", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${sumupAccessToken}`, // from OAuth using SUMUP_CLIENT_ID/SECRET
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    checkout_reference: orderId,
    amount: total_cents / 100,
    currency: "EUR",
    merchant_code: process.env.SUMUP_MERCHANT_CODE,
    description: `VIE KING order ${orderId}`,
  }),
});
const { id: checkoutId } = await sumupRes.json();
```

Then return `checkoutId` to the client and use SumUp's hosted checkout page
or embeddable widget to collect payment, updating the order's `status` to
`paid` via a webhook once SumUp confirms it.

## Shipping

Checkout only accepts French postal codes starting with `972`
(Martinique). This is enforced both in the UI and server-side in
`/api/checkout`, so it can't be bypassed from the browser.

## Design system

- **Colors** — warm ivory paper, deep ink black, sand, and a muted antique
  gold accent. See `tailwind.config.ts` for exact values.
- **Type** — Fraunces (display serif, used italic for an editorial voice),
  Inter (body), Space Mono (small-caps "museum placard" labels used on
  every product — colorway, edition, material — treating each piece like an
  exhibited artwork rather than a product-card SKU).
- **Signature mark** — an abstract, single-line crown (`CrownMark.tsx`),
  used sparingly in the footer and on the order confirmation page.

## Production checklist

- [ ] Replace placeholder photography (`picsum.photos` URLs) with real
      product and editorial images, either via `/admin` or directly in
      `src/data/mock-products.ts` / Supabase.
- [ ] Add `/public/og-image.jpg` and `/public/favicon.ico`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your real domain.
- [ ] Connect Supabase (see above).
- [ ] Wire SumUp (see above).
- [ ] Set a strong, unique `ADMIN_PASSWORD`.
