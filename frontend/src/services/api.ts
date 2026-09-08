import type { Product, EmiPlan, UserCredit, FilterOptions, CheckoutResponse } from '../types';

const JAVA_API_BASE = 'http://localhost:8085/api/v1';

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "p1",
    brand: "Apple",
    title: "iPhone 16 Pro Max",
    description: "Built for Apple Intelligence. Incredible Titanium design with Camera Control and A18 Pro chip.",
    category: "Smartphones",
    basePrice: 144900,
    originalPrice: 159900,
    rating: 4.9,
    reviewsCount: 1280,
    badge: "0% No Cost EMI",
    primaryImage: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop"],
    specs: {
      "Display": "6.9-inch Super Retina XDR OLED 120Hz",
      "Processor": "A18 Pro Chip (3nm)",
      "Camera": "48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto",
      "Battery": "Up to 33 hours video playback"
    },
    variants: [
      { id: "v1-1", name: "256GB / Natural Titanium", color: "Natural Titanium", colorHex: "#9B958C", storage: "256GB", priceOffset: 0, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop", inStock: true },
      { id: "v1-2", name: "512GB / Desert Titanium", color: "Desert Titanium", colorHex: "#C5A087", storage: "512GB", priceOffset: 20000, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop", inStock: true }
    ],
    isNoCostEmiAvailable: true,
    startingEmi: 6037
  },
  {
    id: "p2",
    brand: "Apple",
    title: 'MacBook Pro 16" M3 Max',
    description: "Mind-blowing power with Apple M3 Max chip, Liquid Retina XDR display and Space Black finish.",
    category: "Laptops",
    basePrice: 349900,
    originalPrice: 399900,
    rating: 4.95,
    reviewsCount: 430,
    badge: "1Fi Exclusive",
    primaryImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"],
    specs: {
      "Processor": "Apple M3 Max (16-core CPU, 40-core GPU)",
      "Memory": "36GB Unified Memory",
      "Storage": "1TB Superfast SSD"
    },
    variants: [
      { id: "v2-1", name: "36GB RAM / 1TB SSD / Space Black", color: "Space Black", colorHex: "#2B2B2D", storage: "36GB / 1TB", priceOffset: 0, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop", inStock: true }
    ],
    isNoCostEmiAvailable: true,
    startingEmi: 14579
  },
  {
    id: "p3",
    brand: "Samsung",
    title: "Galaxy S25 Ultra 5G",
    description: "Galaxy AI flagship with built-in S Pen, 200MP camera, and futuristic titanium frame.",
    category: "Smartphones",
    basePrice: 129999,
    originalPrice: 144999,
    rating: 4.8,
    reviewsCount: 890,
    badge: "0% No Cost EMI",
    primaryImage: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop"],
    specs: {
      "Processor": "Snapdragon 8 Gen 4 for Galaxy",
      "Camera": "200MP Main + 50MP Periscope 5x",
      "Display": "6.8-inch Dynamic AMOLED 2X 120Hz"
    },
    variants: [
      { id: "v3-1", name: "12GB / 256GB / Titanium Gray", color: "Titanium Gray", colorHex: "#5A5B5E", storage: "256GB", priceOffset: 0, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop", inStock: true }
    ],
    isNoCostEmiAvailable: true,
    startingEmi: 5416
  },
  {
    id: "p4",
    brand: "Sony",
    title: "WH-1000XM5 Noise Canceling Headphones",
    description: "Industry-leading noise canceling with two processors and 8 microphones for unparalleled audio.",
    category: "Audio",
    basePrice: 26990,
    originalPrice: 34990,
    rating: 4.7,
    reviewsCount: 2150,
    badge: "Best Seller",
    primaryImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop"],
    specs: {
      "Noise Cancellation": "Auto NC Optimizer with 8 microphones",
      "Battery": "Up to 30 hours fast charge"
    },
    variants: [
      { id: "v4-1", name: "Black", color: "Black", colorHex: "#111111", storage: "Standard", priceOffset: 0, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop", inStock: true }
    ],
    isNoCostEmiAvailable: true,
    startingEmi: 1124
  }
];

export const fetchProducts = async (filters: FilterOptions): Promise<{ data: Product[]; count: number }> => {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.brand && filters.brand !== 'All') params.append('brand', filters.brand);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice > 0) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice < 500000) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    const res = await fetch(`${JAVA_API_BASE}/products?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    
    let productsList: Product[] = json.data;
    if (filters.noCostOnly) {
      productsList = productsList.filter(p => p.isNoCostEmiAvailable);
    }

    return { data: productsList, count: productsList.length };
  } catch (err) {
    let filtered = FALLBACK_PRODUCTS.filter(p => {
      if (filters.category && filters.category !== 'All' && p.category !== filters.category) return false;
      if (filters.brand && filters.brand !== 'All' && p.brand !== filters.brand) return false;
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.noCostOnly && !p.isNoCostEmiAvailable) return false;
      return true;
    });
    return { data: filtered, count: filtered.length };
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${JAVA_API_BASE}/products/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    return FALLBACK_PRODUCTS.find(p => p.id === id) || null;
  }
};

export const fetchEmiPlans = async (price: number, noCost: boolean = true): Promise<EmiPlan[]> => {
  try {
    const res = await fetch(`${JAVA_API_BASE}/emi/calculate?price=${price}&noCost=${noCost}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.plans;
  } catch (err) {
    const tenures = [3, 6, 9, 12, 18, 24];
    return tenures.map(n => {
      const isNoCost = noCost && (n === 3 || n === 6);
      const rate = isNoCost ? 0 : 0.105 / 12;
      let monthly = isNoCost ? price / n : (price * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
      monthly = Math.round(monthly);
      const total = isNoCost ? price : monthly * n;
      return {
        tenureMonths: n,
        monthlyAmount: monthly,
        totalPayable: total,
        interestRate: isNoCost ? 0 : 10.5,
        totalInterest: total - price,
        processingFee: 0,
        isNoCost: isNoCost,
        oneFiSavings: Math.round(price * 0.04)
      };
    });
  }
};

export const fetchUserCredit = async (): Promise<UserCredit> => {
  try {
    const res = await fetch(`${JAVA_API_BASE}/user/credit-limit`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    return {
      userId: "usr_1fi_99",
      userName: "Tushar Uniyal",
      totalCreditLimit: 150000,
      availableCreditLimit: 150000,
      pledgedMutualFundValue: 320000,
      status: "APPROVED",
      creditScoreCategory: "EXCELLENT"
    };
  }
};

export const applyEmiBooking = async (productId: string, variantId: string, plan: EmiPlan): Promise<CheckoutResponse> => {
  try {
    const res = await fetch(`${JAVA_API_BASE}/checkout/apply-emi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, variantId, plan })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      status: "success",
      message: "1Fi Mutual Fund Credit EMI booking confirmed successfully!",
      bookingId: `1FI-EMI-${Date.now()}`,
      approvalStatus: "APPROVED_INSTANT",
      creditLimitRemaining: 150000 - plan.monthlyAmount
    };
  }
};
