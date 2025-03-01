import { LiqpayPayment } from '@/@types/liqpay';
import axios from 'axios';

interface Props {
  description?: string;
  orderId: number;
  amount: number;
}

export const createPayment = async ({ amount, orderId }: Props) => {
  const response = await axios.post<LiqpayPayment>('http://localhost:3333/initiate-payment', {
    orderId,
    amount,
  });
  console.log(response.data);
  return response.data;
};
