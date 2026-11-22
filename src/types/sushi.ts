export type DishCategory = 'Rolls' | 'Nigiri' | 'Baked rolls' | 'Sets' | 'Drinks';

export type TasteTag = 'Spicy' | 'Baked' | 'Vegetarian' | 'New';

export type RouteView = 'home' | 'menu' | 'cart';

export interface ExtraOption {
  id: string;
  label: string;
  price: number;
}

export interface NutritionInfo {
  kcal: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface MenuItem {
  id: string;
  name: string;
  weight: string;
  pieces: string;
  ingredients: string;
  description: string;
  craftNote: string;
  price: number;
  image: string;
  modalImage?: string;
  badge: string;
  homeBadge?: string;
  kicker: string;
  category: DishCategory;
  tags: TasteTag[];
  popularity: number;
  nutrition: NutritionInfo;
  allergens: string;
  featured?: boolean;
}

export interface CartItem {
  cartKey: string;
  dishId: string;
  name: string;
  weightLabel: string;
  unitPrice: number;
  image: string;
  quantity: number;
  extras: ExtraOption[];
}

export interface CartAddon {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  dishId: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  mode: 'delivery' | 'pickup';
  customerName: string;
  address: string;
  eta: string;
  paymentMethod: 'card' | 'cash';
  total: number;
  itemsCount: number;
  chopsticks: number;
}
