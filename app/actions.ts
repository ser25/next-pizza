'use server';
import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';

export const createOrder = async (data: CheckoutFormValues) => {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Якщо кошик не знайдено повертаємо помилку */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* Якщо кошик порожній повертаємо помилку */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* Створюємо замовлення */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });
    /* Очищаємо кошик */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({ amount: order.totalAmount, orderId: order.id });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.paymentURL, // paymentId треба переробити nodejs
      },
    });

    const paymentUrl = paymentData.paymentURL;

    await sendEmail(
      data.email,
      'Next Pizza / Сплатіть замовлення #' + order.id,
      PayOrderTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl }),
    );

    return paymentUrl;
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
};

export async function updateUserInfo(body: Prisma.UserUpdateInput) {}
