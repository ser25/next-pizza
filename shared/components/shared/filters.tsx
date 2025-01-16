'use client';

import { FilterCheckbox } from '@/components/shared/filter-checkbox';
import { Input } from '@/components/ui/input';
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';
import React from 'react';
import { CheckboxFilterGroups } from './checkbox-filter-groups';
import { RangeSlider } from './range-slider';
import { Title } from './title';

interface Props {
  className?: string;
}

export const FIlters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const [newItems, setNewItems] = React.useState<{ value: string; text: string }[]>([
    { value: '', text: '' },
  ]);

  const items =
    filters.selectedIngredients.size <= 0
      ? ingredients.map(item => ({ value: String(item.id), text: item.name }))
      : newItems;

  const ingredientsUp = () => {
    const items = ingredients.map(item => ({ value: String(item.id), text: item.name }));
    console.log('123', items);
    let removeElements: { value: string; text: string }[] = [];
    filters.selectedIngredients.forEach(item => {
      items.find((el, index) => {
        if (el.value === item) {
          removeElements.push(el);
        }
      });
    });
    const uniqueItems = Array.from(
      new Set([...removeElements, ...items].map(item => item.value)),
    ).map(value => {
      return [...removeElements, ...items].find(item => item.value === value);
    });
    setNewItems(uniqueItems as { value: string; text: string }[]);
  };

  const updatePrice = (price: number[]) => {
    filters.setPrice('priceFrom', price[0]);
    filters.setPrice('priceTo', price[1]);
  };

  React.useEffect(() => {
    ingredientsUp();
  }, [filters.selectedIngredients, loading]);

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхні чекбокси  */}
      <CheckboxFilterGroups
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
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
          onClickCheckbox={filters.setSizes}
          selected={filters.sizes}
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
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={e => filters.setPrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={e => filters.setPrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrice}
        />
        {
          <button className="text-primary mt-2" onClick={() => updatePrice([0, 1000])}>
            Очистити ціну
          </button>
        }
      </div>

      {/* Інгредієнти */}
      <CheckboxFilterGroups
        title="Інгредієнти"
        name="ingredients"
        className="mt-5"
        limit={6}
        loading={loading}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
