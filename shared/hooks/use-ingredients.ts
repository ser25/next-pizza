import { API } from '@/shared/services/api-client';
import { Ingredient } from '@prisma/client';
import React from 'react';

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setIsLoading(true);
        const response = await API.ingredients.getAll();
        console.log('s', response);
        setIngredients(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchIngredients();
  }, []);
  return {
    ingredients,
    loading: isLoading,
  };
};
