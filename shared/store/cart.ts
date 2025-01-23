import { create } from 'zustand';
import { API } from '../services/api-client';
import { getCartDetails } from '../lib';
import { CartStateItem } from '../lib/get-cart-details';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Отримання товарів із кошика */
  fetchCartItems: () => Promise<void>;

  /* Запит на оновлення кількості товару*/
  updateItemQuantity: (id: number, quantity: number) => void;

  /* Запит на додавання товару до кошика */
  addCartItem: (values: any) => void;

  /* Запит на видалення товару з кошика */
  removeCartItem: (id: number) => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await API.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    return {};
  },

  addCartItem: async (values: any) => {
    return {};
  },

  removeCartItem: async (id: number) => {
    return {};
  },
}));
