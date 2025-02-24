import React from 'react';
import { WhiteBlock } from '../white-block';
import { Textarea, Input } from '../../ui';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адреса доставки">
      <div className="flex flex-col gap-5">
        <Input name="firstName" className="text-base" placeholder="Ведіть свою адресу..." />
        <Textarea className="text-base" rows={5} placeholder="Комент до замовлення" />
      </div>
    </WhiteBlock>
  );
};
