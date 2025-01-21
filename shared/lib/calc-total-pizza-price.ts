import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

/**
 * Функція для підрахунку загальної вартості піци
 *
 * @param type - тип тіста обраної піци
 * @param size - розмір обраної піци
 * @param items - список варіацій
 * @param ingredients - список інгредієнтів
 * @param selectedIngredients - вибрані інгредієнти
 *
 * @returns number загальну вартість
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0;

  const totalIngredientPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientPrice;
};
