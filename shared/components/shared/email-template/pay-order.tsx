import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => (
  <div>
    <h1>Заказ #{orderId}</h1>

    <p>
      Сплатіть замовлення на суму <b>{totalAmount} ₴</b>. Перейдіть до{' '}
      <a href={paymentUrl}>за цим посиланням</a> для оплати замовлення.
    </p>
  </div>
);
