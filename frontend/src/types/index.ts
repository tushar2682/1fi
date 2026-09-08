export interface ProductVariant {
  id: string;
  name: string;
  color: string;
  colorHex: string;
  storage: string;
  priceOffset: number;
  image: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  brand: string;
  title: string;
  description: string;
  category: string;
  basePrice: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  primaryImage: string;
  images: string[];
  specs: Record<string, string>;
  variants: ProductVariant[];
  isNoCostEmiAvailable: boolean;
  startingEmi: number;
}

export interface EmiPlan {
  tenureMonths: number;
  monthlyAmount: number;
  totalPayable: number;
  interestRate: number;
  totalInterest: number;
  processingFee: number;
  isNoCost: boolean;
  oneFiSavings: number;
}

export interface UserCredit {
  userId: string;
  userName: string;
  totalCreditLimit: number;
  availableCreditLimit: number;
  pledgedMutualFundValue: number;
  status: string;
  creditScoreCategory: string;
}

export interface FilterOptions {
  category: string;
  brand: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  noCostOnly: boolean;
}

export interface CheckoutResponse {
  status: string;
  message: string;
  bookingId: string;
  approvalStatus: string;
  creditLimitRemaining: number;
}
