import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';

interface Props {
  imageUrl: string;
  name: string;
  ingredients?: any;
  items?: any;
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
  const totalPrice = 100;
  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{'30 см, традиційне тісто 30, 590 г'}</p>

        <div className="flex flex-col gap-4 mt-5">
          {/* <GroupVariants
                items={availableSizes}
                value={String(size)}
                onClick={(value) => setSize(Number(value) as PizzaSize)}
              />
    
              <GroupVariants
                items={pizzaTypes}
                value={String(type)}
                onClick={(value) => setType(Number(value) as PizzaType)}
              /> */}
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {/* {ingredients.map((ingredient) => (
                  <IngredientItem
                    key={ingredient.id}
                    name={ingredient.name}
                    price={ingredient.price}
                    imageUrl={ingredient.imageUrl}
                    onClick={() => addIngredient(ingredient.id)}
                    active={selectedIngredients.has(ingredient.id)}
                  />
                ))} */}
          </div>
        </div>

        <Button
          // loading={loading}
          // onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
