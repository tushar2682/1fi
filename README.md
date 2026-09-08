# 1Fi Marketplace

A fullstack EMI marketplace — React frontend talking to a plain Java HTTP backend, no framework, no database. Browse products, pick a variant, run the EMI calculator, and simulate a 1Fi Mutual Fund Credit checkout in under a minute.

---

## What it is

1Fi lets users buy electronics on EMI backed by their mutual fund holdings instead of a regular credit card. This project is a working prototype of that shopping experience — product listing, variant selection, an EMI plan calculator (real compound interest math, not made-up numbers), and a checkout flow that confirms the booking instantly.

The backend is a plain Java HTTP server using only the JDK. No Spring, no Hibernate, no external jars. The frontend is React + TypeScript built with Vite.

---

## Quick start

**You need:** Java 11+ and Node.js 18+ on your PATH.

### One command (Windows)

```bat
run-app.bat
```

This opens two terminal windows — one for the Java backend, one for the React dev server — and prints the URLs when both are ready.

### Manually

**Backend:**
```bat
cd java-backend
run-backend.bat
```
The server starts on http://localhost:8085

**Frontend:**
```bat
cd frontend
npm install
npm run dev
```
The app opens on http://localhost:5173

---

## Architecture

```
+-----------------------------------+
|   React Frontend  (Vite + TS)     |
|   localhost:5173                  |
|                                   |
|   Header     -> credit limit      |
|   ShopTabs   -> tab navigation    |
|   MarketplaceHub -> product grid  |
|   ProductDetailModal -> variants  |
|   EMICalculator -> plan picker    |
|   CheckoutModal -> booking        |
+----------------+------------------+
                 |  fetch() over HTTP
                 | (falls back to
                 |  local mock data
                 |  if backend is down)
+----------------+------------------+
|   Java REST Backend               |
|   localhost:8085                  |
|                                   |
|   /api/v1/products         GET    |
|   /api/v1/products/{id}    GET    |
|   /api/v1/emi/calculate    GET    |
|   /api/v1/user/credit-limit GET   |
|   /api/v1/checkout/apply-emi POST |
|   /health                  GET    |
+-----------------------------------+
```

No database. Products are seeded in `ProductRepository.java` in memory. Data survives the request, not the process restart.

---

## Backend

### How it's built

Plain `com.sun.net.httpserver.HttpServer` — the HTTP server that ships with the JDK. Each route is a static inner class that implements `HttpHandler`. CORS headers are set on every response so the frontend can talk to it without a proxy.

The compilation script (`run-backend.bat`) compiles all `.java` files into `bin/` and runs from there. No build tool needed.

### Package layout

```
java-backend/src/com/onefi/marketplace/
├── Main.java                  <- server entry point, all route handlers
├── model/
│   ├── Product.java           <- product with variants, pricing, EMI flag
│   ├── ProductVariant.java    <- color, storage, price offset per variant
│   ├── EmiPlan.java           <- one EMI tenure (monthly amount, total, savings)
│   └── UserCredit.java        <- user's credit limit and mutual fund pledge
├── repository/
│   └── ProductRepository.java <- in-memory product store, filter + sort logic
├── service/
│   └── EmiCalculatorService.java <- compound interest EMI math
└── util/
    └── JsonUtils.java         <- hand-rolled JSON serializer (no external libs)
```

### API endpoints

| Method | Path | What it returns |
|---|---|---|
| `GET` | `/api/v1/products` | All products. Supports `?category=`, `?brand=`, `?search=`, `?minPrice=`, `?maxPrice=`, `?sortBy=` |
| `GET` | `/api/v1/products/{id}` | Single product by ID |
| `GET` | `/api/v1/emi/calculate` | EMI plans. Params: `?price=` and `?noCost=true/false` |
| `GET` | `/api/v1/user/credit-limit` | Hardcoded test user credit profile |
| `POST` | `/api/v1/checkout/apply-emi` | Confirms booking, returns a generated booking ID |
| `GET` | `/health` | Health check |

### EMI calculation

`EmiCalculatorService` runs the standard reducing-balance formula:

```
EMI = P * r * (1+r)^n / ((1+r)^n - 1)
```

Where `r = 10.5% / 12`. For the 3-month and 6-month tenures on eligible products, interest rate drops to 0% (no-cost EMI — the merchant absorbs it). Savings shown in the UI are calculated against what the same plan would cost on a standard credit card at 16% APR + 1% processing fee.

---

## Frontend

### Tech

- React 19 + TypeScript
- Vite 8
- Lucide React for icons
- No UI library — plain CSS

### Component tree

```
App
├── Header              <- 1Fi logo, credit limit pill, wide-mode toggle
├── ShopTabs            <- Marketplace / Top Brands / Nearby Stores tabs
├── main
│   ├── MarketplaceHub  <- filter bar, product grid, loads from API
│   │   └── ProductCard <- one product tile with badge and EMI teaser
│   ├── TopBrandsTab    <- static brand showcase
│   └── NearbyStoresTab <- static store list (placeholder)
├── ProductDetailModal  <- full product detail, variant picker, EMICalculator
│   └── EMICalculator   <- fetches plans, renders tenure options
├── CheckoutModal       <- confirms booking via POST /checkout/apply-emi
└── BottomNav           <- mobile bottom navigation bar
```

### API service (`src/services/api.ts`)

Every API function has a fallback. If the Java backend is not running, the app falls back to a set of hardcoded products and calculates EMI plans locally with the same formula. So the frontend works standalone for demos — you just won't see the backend filtering.

### Product categories

- Smartphones
- Laptops
- Audio
- Wearables

---

## Data model

A `Product` has:
- Basic info: `id`, `brand`, `title`, `description`, `category`
- Pricing: `basePrice`, `originalPrice`, `startingEmi`
- Display: `badge` (e.g. "No Cost EMI", "Best Seller"), `primaryImage`, `images[]`
- Specs: freeform `Map<String, String>`
- Variants: list of `ProductVariant` (color, storage, price offset)
- EMI eligibility: `isNoCostEmiAvailable`

A `UserCredit` has:
- `totalCreditLimit`, `availableCreditLimit`
- `pledgedMutualFundValue` — this is what backs the credit
- `status` (APPROVED), `creditScoreCategory`

---

## Project layout

```
1fi/
├── run-app.bat               <- starts both backend and frontend
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── layout/       <- Header, BottomNav
│   │   │   └── shop/
│   │   │       ├── ShopTabs.tsx
│   │   │       ├── TopBrandsTab.tsx
│   │   │       ├── NearbyStoresTab.tsx
│   │   │       └── Marketplace/
│   │   │           ├── MarketplaceHub.tsx
│   │   │           ├── ProductCard.tsx
│   │   │           ├── ProductDetailModal.tsx
│   │   │           ├── EMICalculator.tsx
│   │   │           └── CheckoutModal.tsx
│   │   ├── services/api.ts   <- all fetch calls + fallback data
│   │   └── types/index.ts    <- shared TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
└── java-backend/
    ├── run-backend.bat
    ├── src/com/onefi/marketplace/
    │   ├── Main.java
    │   ├── model/
    │   ├── repository/
    │   ├── service/
    │   └── util/
    ├── bin/                   <- compiled .class files (generated)
    └── 1Fi-Marketplace-API.postman_collection.json
```

---

## Testing the API

Import `java-backend/1Fi-Marketplace-API.postman_collection.json` into Postman. It has ready-made requests for all five endpoints — health check, product list with filters, single product lookup, EMI calculation, and checkout.

Or just curl:

```bash
# All products
curl http://localhost:8085/api/v1/products

# Filter by category
curl "http://localhost:8085/api/v1/products?category=Smartphones"

# EMI plans for Rs. 72,900
curl "http://localhost:8085/api/v1/emi/calculate?price=72900&noCost=true"

# User credit
curl http://localhost:8085/api/v1/user/credit-limit

# Checkout (POST)
curl -X POST http://localhost:8085/api/v1/checkout/apply-emi \
  -H "Content-Type: application/json" \
  -d '{"productId":"p1","variantId":"v1-1","plan":{"tenureMonths":6}}'
```

---

## Notes

- The user profile in the backend is hardcoded (`Tushar Uniyal`, 1.5L credit limit, 3.2L pledged MF). Replace in `Main.java` if needed.
- No authentication. This is a prototype — all endpoints are open.
- The frontend proxy is not configured. The Vite dev server and the Java backend run on different ports; CORS is handled by the backend sending `Access-Control-Allow-Origin: *`.
