# Dokan Marketplace Architecture — Favor Mapping

**Status:** Investigation notes, 2026-08-08.  
**Context:** WordPress + WooCommerce + Dokan as the reference stack for per-user favor storefronts.

---

## Decision in one line

**Each Favor user can be a Dokan-style vendor with their own storefront catalog of verb and noun favors; multi-party settlements use parent/sub-order splitting so each provider gets an isolated obligation.**

---

## What Dokan is

Dokan is a multi-vendor layer on WooCommerce. One marketplace becomes many seller storefronts.

| Role | Responsibility |
|------|----------------|
| **Admin** | Marketplace operator; only role with wp-admin |
| **Vendor** | Frontend dashboard only — products, orders, payouts, store settings |
| **Customer** | Single cart; may mix products from many vendors |

Products are tagged to a vendor. Commission is calculated per vendor slice. Pro modules (optional) add subscriptions, verification, analytics, shipping, RMA, and gateway split-pay.

---

## WooCommerce multi-vendor order pattern

WooCommerce is single-merchant by default. Multi-vendor plugins share one architecture:

1. **Parent order** — customer pays once; one receipt.
2. **Sub-orders (children)** — one per vendor; only that vendor’s line items, shipping share, coupons, commission.
3. **Vendor stamp** — product and child order carry seller ID (`_dokan_vendor_id` in Dokan).

Reports filter children so revenue is not double-counted.

---

## Dokan sub-order split logic

**Trigger:** `woocommerce_checkout_update_order_meta` → `dokan()->order->maybe_split_orders( $parent_order_id )`. Admin multi-vendor orders can also split on status change.

**Decision:**

| Sellers on order | Behavior |
|------------------|----------|
| 0 | Skip |
| 1 | No sub-orders; tag parent `_dokan_vendor_id`; fire `dokan_create_parent_order` |
| 2+ | Set parent `has_sub_order = true`; `create_sub_order` per vendor |

**Each sub-order:** real `shop_order` with `post_parent` = parent ID; copies billing/shipping/payment method; only that seller’s line items; `_dokan_vendor_id` set.

**Status / money:** Customer pays parent. Parent payment cascades to children. Vendors manage their sub-orders. When all children complete, parent completes.

**Key hooks:** `dokan_checkout_update_order_meta`, `dokan()->order->create_sub_order()`, `dokan_after_create_sub_order`, child status hooks that roll up to parent.

---

## Commission

**Built-in priority:** product → vendor → category → global.  
**Types:** percentage, flat, or combined. Computed on sub-orders (not parents with `has_sub_order`).

**Custom logic:**

- Rate-only rules: `dokan_get_seller_percentage` filter (e.g. new-vendor intro rates).
- Deep math: extend `WeDevs\Dokan\Commission\OrderCommission` and register via Dokan container. Prefer this over deprecated `dokan_get_earning_by_order` (Dokan 4.x).
- Persist custom amounts as order meta for withdrawals and reports.

**Favor overlay:** Cash leg can use Dokan’s engine. Barter share, proof-tier caps, and cash-plus-favor mix should attach **per sub-order** so each favor provider’s obligation stays isolated.

---

## Mapping to Favor

| Dokan concept | Favor concept |
|---------------|---------------|
| Vendor | Registered user with a personal storefront |
| Vendor product catalog | Proposed verb/noun favors (favor bank / arsenal) |
| Public store page | User’s favor toolkit surface |
| Parent order | Multi-party settlement / checkout |
| Sub-order | Per-provider obligation (cash and/or favor legs) |
| Commission | Platform take on cash leg; favor legs governed by barter + proof rules |
| Vendor dashboard | Manage listings, incoming requests, delivery, reputation-facing history |
| Withdraw / split-pay | Cash payout path; escrow alternative already in barter model |

**Product language reminder:** Favor is a personal ledger for trust, access, and relationships — not a chore board. Dokan is infrastructure for per-user catalogs and multi-party settlement, not a shift to marketplace-first positioning.

**Favor bank / arsenal toolkit:** User-built inventory of offerable favors with scores and situation fit (verb vs noun, proof tier, delivery history). Analogous to a loadout with rated tools — not a second ranking authority; scores counsel, policy authorizes.

---

## Related

- [What Favor Is](./favor-product.md)
- [Verb / Noun Favors](./verb-noun-favors.md)
- [Favor Barter & Solvency](./favor-barter-solvency.md)
- [Desktop Stack](./desktop-stack.md) — WordPress + WooCommerce as catalog engine
- [Open Work](./open-work.md)
