import React from 'react';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { WhiteBlock } from './white-block';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  loading: boolean;
  totalAmount: number;
}
const VAT = 15;
const DELIVERY_PRICE = 50;

export const CheckoutSidebar: React.FC<Props> = ({ className, totalAmount, loading }) => {
  const vatPrice = (totalAmount / 100) * VAT;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;
  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Разом:</span>
        {loading ? (
          <Skeleton className="w-full h-11" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₴</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <>
            <Package size={24} className="mr-1 text-gray-400" />
            Вартість товарів:
          </>
        }
        value={loading ? <Skeleton className="w-16 h-6" /> : `${totalAmount} ₴`}
      />
      <CheckoutItemDetails
        title={
          <>
            <Percent size={24} className="mr-1 text-gray-400" />
            Податок:
          </>
        }
        value={loading ? <Skeleton className="w-16 h-6" /> : `${vatPrice} ₴`}
      />
      <CheckoutItemDetails
        title={
          <>
            <Truck size={24} className="mr-1 text-gray-400" />
            Доставка:
          </>
        }
        value={loading ? <Skeleton className="w-16 h-6" /> : `${DELIVERY_PRICE} ₴`}
      />

      <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти до оплати
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
