import React from 'react';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';
import { WhiteBlock } from './white-block';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  totalAmount: number;
}
const VAT = 15;
const DELIVERY_PRICE = 50;

export const CheckoutSidebar: React.FC<Props> = ({ className, totalAmount }) => {
  const vatPrice = (totalAmount / 100) * VAT;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;
  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Разом:</span>
        <span className="text-[34px] font-extrabold">{totalPrice} ₴</span>
      </div>

      <CheckoutItemDetails
        title={
          <>
            <Package size={24} className="mr-1 text-gray-400" />
            Вартість товарів:
          </>
        }
        value={`${totalAmount} ₴`}
      />
      <CheckoutItemDetails
        title={
          <>
            <Percent size={24} className="mr-1 text-gray-400" />
            Податок:
          </>
        }
        value={`${vatPrice} ₴`}
      />
      <CheckoutItemDetails
        title={
          <>
            <Truck size={24} className="mr-1 text-gray-400" />
            Доставка:
          </>
        }
        value={`${DELIVERY_PRICE} ₴`}
      />

      <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти до оплати
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
