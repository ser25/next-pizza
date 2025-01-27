'use client';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChooseProductForm } from './choose-product-form';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product }) => {
  const { addCartItem, loading } = useCartStore(state => state);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      addCartItem({
        productItemId: itemId,
        ingredients,
      });
      toast.success(product.name + ' успішно додана до кошика');
    } catch (error) {
      console.error(error);
      toast.error('Помилка додавання товару до кошика');
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
