'use client';
import React from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui';

import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
 

  

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине <span className="font-bold">{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Кошик порожній" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Додайте хоча б одну піцу, щоб зробити замовлення
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map(items => (
                  <div key={items.id} className="mb-2">
                    <CartDrawerItem
                      id={items.id}
                      imageUrl={items.imageUrl}
                      details={getCartItemDetails(
                        items.ingredients,
                        items.pizzaType as PizzaType,
                        items.pizzaSize as PizzaSize,
                      )}
                      disabled={items.disabled}
                      name={items.name}
                      price={items.price}
                      quantity={items.quantity}
                      onClickCountButton={type =>
                        onClickCountButton(items.id, items.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(items.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₴</span>
                  </div>

                  <Link href="/cart">
                    <Button type="submit" className="w-full h-12 text-base">
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
