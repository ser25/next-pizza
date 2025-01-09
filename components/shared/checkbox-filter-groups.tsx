'use client';

import React, { useEffect, useState } from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  name?: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  loading?: boolean;
  onClickCheckbox?: (di: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
}

export const CheckboxFilterGroups: React.FC<Props> = ({
  title,
  name,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  loading,
  onClickCheckbox,
  selected,
  defaultValue,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const list = showAll
    ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    : (defaultItems || items).slice(0, limit);
  if (loading) {
    return (
      <>
        <div className={className}>
          <p className="font-bold mb-3">{title}</p>
          {...Array(limit)
            .fill(0)
            .map((_, index) => <Skeleton key={index} className="h-6 mb-4 rounded-[8px] " />)}
        </div>
        <Skeleton className="h-8 w-28 mb-4 rounded-[8px] " />
      </>
    );
  }
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map(item => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            key={item.text}
            value={item.value}
            name={name}
            text={item.text}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
