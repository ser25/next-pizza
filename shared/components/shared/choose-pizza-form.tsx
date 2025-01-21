import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/shared/constants/pizza';
import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import React from 'react';
import { useSet } from 'react-use';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { IngredientItem } from './ingredient-item';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { calcTotalPizzaPrice, getAvailablePizzaSizes } from '@/shared/lib';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit?: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availablePizzasSizes = getAvailablePizzaSizes(type, items);

  console.log('items', items);

  console.log('availableSizes', availablePizzasSizes);

  React.useEffect(() => {
    const isAvailableSize = availablePizzasSizes?.find(
      item => Number(item.value) === size && !item.disabled,
    );
    const availableSize = availablePizzasSizes.find(item => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);

  const textDetails = `${size} см, ${mapPizzaType[type]} піца`;

  const handlerSubmit = () => {
    console.log('handlerSubmit', { size, type, selectedIngredients });
  };
  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzasSizes}
            value={String(size)}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={value => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map(ingredient => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          // loading={loading}
          onClick={handlerSubmit}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
