import { create } from 'zustand';
import { API } from '../services/api-client';
import { getCartDetails } from '../lib';
import { CartStateItem } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../services/dto/cart.dto';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Отримання товарів із кошика */
  fetchCartItems: () => Promise<void>;

  /* Запит на оновлення кількості товару*/
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запит на додавання товару до кошика */
  addCartItem: (values: CreateCartItemValues) => Promise<void>;

  /* Запит на видалення товару з кошика */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await API.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await API.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await API.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map(item => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data = await API.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set(state => ({
        loading: false,
        items: state.items.map(items => ({ ...items, disabled: false })),
      }));
    }
  },
}));
