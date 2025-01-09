'use client';

import { Title } from './title';
import { Input } from '@/components/ui/input';
import { FilterCheckbox } from '@/components/shared/filter-checkbox';
import { RangeSlider } from './range-slider';
import { CheckboxFilterGroups } from './checkbox-filter-groups';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import React from 'react';
import { useSet } from 'react-use';

interface Props {
  className?: string;
}

interface PriceRange {
  priceFrom: number;
  priceTo: number;
}

export const FIlters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]));
  const [prices, setPriceRange] = React.useState<PriceRange>({
    priceFrom: 0,
    priceTo: 1000,
  });

  const updatePrice = (name: keyof PriceRange, value: number) => {
    setPriceRange({ ...prices, [name]: value });
  };

  const items = ingredients.map(item => ({ value: String(item.id), text: item.name }));

  React.useEffect(() => {
    console.log({ sizes, pizzaTypes, prices, selectedIngredients });
  }, [sizes, pizzaTypes, prices, selectedIngredients]);

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхні чекбокси  */}
      <CheckboxFilterGroups
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <div className="flex flex-col gap-4">
        <CheckboxFilterGroups
          title="Размеры"
          name="sizes"
          className="mb-5"
          onClickCheckbox={toggleSizes}
          selected={sizes}
          items={[
            { text: '20 см', value: '20' },
            { text: '30 см', value: '30' },
            { text: '40 см', value: '40' },
          ]}
        />
        <FilterCheckbox name="up2" text="Новинки" value="2" />
      </div>

      {/* Фільтер цін */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={e => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            value={String(prices.priceTo)}
            onChange={e => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPriceRange({ priceFrom, priceTo })}
        />
      </div>

      <CheckboxFilterGroups
        title="Інгредієнти"
        name="ingredients"
        className="mt-5"
        limit={6}
        loading={loading}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
      />
    </div>
  );
};
