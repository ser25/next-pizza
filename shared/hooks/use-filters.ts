import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface PriceRange {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  prices: PriceRange;
  selectedIngredients: Set<string>;
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceRange, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();
  /* Фільтр інгредієнтів */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')),
  );
  /* Фільтр розмірів */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes')?.split(',') || []),
  );
  /* Фільтр видів піц */
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []),
  );
  /* Фільтр цени */
  const [prices, setPriceRange] = React.useState<PriceRange>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });
  const updatePrice = (name: keyof PriceRange, value: number) => {
    setPriceRange(prev => (console.log(prev), { ...prev, [name]: value }));
  };
  return React.useMemo(
    () => ({
      sizes,
      pizzaTypes,
      prices,
      selectedIngredients,
      setPrice: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [sizes, pizzaTypes, prices, selectedIngredients],
  );
};
