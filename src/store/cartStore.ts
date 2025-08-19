import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size?: string;
  extras?: string[];
}

interface CartStore {
  items: CartItem[];
  deliveryAddress: {
    type: 'home' | 'work' | 'other';
    address: string;
    label: string;
  };
  paymentMethod: 'card' | 'wallet' | 'cash';
  promoCode: string;
  discount: number;
  deliveryFee: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryAddress: (address: CartStore['deliveryAddress']) => void;
  setPaymentMethod: (method: CartStore['paymentMethod']) => void;
  setPromoCode: (code: string) => void;
  applyDiscount: (discount: number) => void;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [
    {
      id: '1',
      name: 'Mixed Vegetable Salad',
      price: 12.00,
      quantity: 1,
      imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
      size: 'Medium',
      extras: ['Extra Avocado']
    },
    {
      id: '2',
      name: 'Special Pasta Salad',
      price: 8.00,
      quantity: 1,
      imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=200',
      size: 'Large'
    },
    {
      id: '3',
      name: 'Fresh Avocado Juice',
      price: 4.00,
      quantity: 1,
      imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=200',
      size: '500ml'
    }
  ],
  deliveryAddress: {
    type: 'home',
    address: 'Times Square NYC, Manhattan',
    label: 'Home'
  },
  paymentMethod: 'wallet',
  promoCode: 'DISCOUNT20',
  discount: 4.80,
  deliveryFee: 2.00,

  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      };
    }
    return { items: [...state.items, item] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    items: quantity <= 0 
      ? state.items.filter(item => item.id !== id)
      : state.items.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
  })),

  clearCart: () => set({ items: [] }),

  setDeliveryAddress: (address) => set({ deliveryAddress: address }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  setPromoCode: (code) => set({ promoCode: code }),

  applyDiscount: (discount) => set({ discount }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTotal: () => {
    const { deliveryFee, discount } = get();
    const subtotal = get().getSubtotal();
    return subtotal + deliveryFee - discount;
  }
}));