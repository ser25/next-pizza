import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { pizzaTypes } from '@/shared/constants/pizza';
import { GroupVariants } from './group-variants';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onSubmit: () => void;
  className?: string;
  loading?: boolean;
}

/**
 * 
  Форма вибору продукту
 */
export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  onSubmit,
  className,
  loading,
}) => {
  const handleClickAdd = () => {
    onSubmit();
  };
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className={'flex items-center justify-center flex-1 relative w-full'}>
        <img
          src={imageUrl}
          alt="Logo"
          className={'relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'}
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400"></p>

        <div className="flex flex-col gap-4 mt-5">
          {/* <GroupVariants
                items={availableSizes}
                value={String(size)}
                onClick={(value) => setSize(Number(value) as PizzaSize)}
              /> */}

          {/* <GroupVariants
            items={pizzaTypes}
            // value={String(type)}
            // onClick={(value) => setType(Number(value) as PizzaType)}
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
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₴
        </Button>
      </div>
    </div>
  );
};
