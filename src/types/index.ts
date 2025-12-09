// Database Types
export type ProductType = 'digital' | 'physical' | 'formation';
export type InteractionType = 'view' | 'interest' | 'cart' | 'purchase' | 'download';
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  preferences: UserPreferences | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  interests: string[];
  notifications_email: boolean;
  notifications_promo: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string | null;
  price: number;
  category_id: string | null;
  category?: Category;
  product_type: ProductType;
  image_url: string | null;
  download_url: string | null;
  stripe_price_id: string | null;
  is_active: boolean;
  stock: number | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Interaction {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  interaction_type: InteractionType;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  stripe_session_id: string | null;
  status: OrderStatus;
  total_amount: number;
  shipping_address: ShippingAddress | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  unit_price: number;
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
  onInterest?: (productId: string) => void;
  isInterested?: boolean;
}

export interface FilterState {
  category?: string;
  type?: ProductType;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

