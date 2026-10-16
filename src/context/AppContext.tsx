import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, Reservation, ContactMessage } from '../types';

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;

  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => Reservation;
  cancelReservation: (id: string) => void;

  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt'>) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'cafebar_app_state_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cart`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Error reading cart from localStorage', e);
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_favorites`);
      return saved ? JSON.parse(saved) : ['ck-1', 'sp-2', 'pz-1'];
    } catch (e) {
      console.warn('Error reading favorites from localStorage', e);
      return ['ck-1', 'sp-2', 'pz-1'];
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_reservations`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Error reading reservations from localStorage', e);
      return [];
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_messages`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_cart`, JSON.stringify(cart));
    } catch (e) {
      console.warn('Error persisting cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_favorites`, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Error persisting favorites', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_reservations`, JSON.stringify(reservations));
    } catch (e) {
      console.warn('Error persisting reservations', e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_messages`, JSON.stringify(contactMessages));
    } catch (e) {
      console.warn('Error persisting contact messages', e);
    }
  }, [contactMessages]);

  const addToCart = (item: MenuItem, quantity: number = 1, notes?: string) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity, notes: notes || ci.notes }
            : ci
        );
      }
      return [...prev, { item, quantity, notes }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const cartCount = cart.reduce((count, ci) => count + ci.quantity, 0);

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

  const addReservation = (data: Omit<Reservation, 'id' | 'status' | 'createdAt'>): Reservation => {
    const newReservation: Reservation = {
      ...data,
      id: `CB-RES-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const cancelReservation = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r))
    );
  };

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `CB-MSG-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        favorites,
        toggleFavorite,
        isFavorite,
        reservations,
        addReservation,
        cancelReservation,
        contactMessages,
        addContactMessage,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
