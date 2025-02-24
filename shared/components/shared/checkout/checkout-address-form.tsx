import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput, FormTextarea } from '../form';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адреса доставки">
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="Введіть адрес... " />
        <FormTextarea
          name="comment"
          className="text-base"
          rows={5}
          placeholder="Комент до замовлення"
        />
      </div>
    </WhiteBlock>
  );
};
