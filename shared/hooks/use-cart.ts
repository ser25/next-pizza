import React from 'react';
import { useCartStore } from '../store';
import { CartStateItem } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../services/dto/cart.dto';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const {
    items,
    loading,
    totalAmount,
    fetchCartItems,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore(state => state);
  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return { items, loading, totalAmount, updateItemQuantity, removeCartItem, addCartItem };
};
