export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'egg';
export type ElementType = 'Earth' | 'Water' | 'Fire' | 'Air' | 'Space';

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  category: 'small-plates' | 'mains' | 'pizzas' | 'cocktails' | 'bakery-coffee' | 'desserts';
  categoryLabel: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  dietary: DietaryType;
  element: ElementType;
  spiceLevel?: 0 | 1 | 2 | 3;
  rating: number;
  reviewCount: number;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isSeasonal?: boolean;
  prepTime: string;
  calories?: number;
  ingredients: string[];
  allergens: string[];
  pairings: string[];
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingArea: 'rooftop' | 'indoor' | 'private-booth';
  occasion: 'casual' | 'birthday' | 'anniversary' | 'date-night' | 'business' | 'celebration';
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  date: string;
  time: string;
  dayOfWeek: string;
  category: 'Nightlife' | 'Acoustic Sundowner' | 'DJ Night' | 'Mixology Masterclass' | 'Private Feast';
  description: string;
  artistOrHost: string;
  entryFee: string;
  perks: string[];
  image: string;
  isFeatured?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended: string;
  avatar: string;
}

export interface AdItem {
  id: string;
  brand: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  tag: string;
  image: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
