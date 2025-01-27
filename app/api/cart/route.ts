import { prisma } from '@/prisma/prisma-client';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не вдалося отримати корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const areArraysEqual = (arr1: number[], arr2: number[]): boolean => {
      if (arr1.length !== arr2.length) {
        return false;
      }
      return arr1.every((value, index) => value === arr2[index]);
    };

    const updateCartItem = async (id: number, quantity: number) => {
      await prisma.cartItem.update({
        where: { id },
        data: { quantity: quantity + 1 },
      });
    };

    const createCartItem = async () => {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map(id => ({ id })) },
        },
      });
    };

    // Пошук існуючого товару в корзині
    const findCartItem = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    if (findCartItem.length > 0) {
      console.log('findCartItem', findCartItem);

      let isUpdated = false;

      // Перевірка наявності ідентичного товару з однаковими інгредієнтами
      for (const item of findCartItem) {
        const ingredientIds = item.ingredients.map(ingredient => ingredient.id);

        if (areArraysEqual(ingredientIds, data.ingredients || [])) {
          // console.log('Товар знайдено, оновлюємо кількість:', item.id);
          await updateCartItem(item.id, item.quantity);
          isUpdated = true;
          break; // Виходимо з циклу, якщо оновили товар
        }
      }

      // Якщо схожого товару немає, створюємо новий
      if (!isUpdated) {
        // console.log('Схожого товару немає, створюємо новий');
        await createCartItem();
      }
    } else {
      // console.log('Товар не знайдено, створюємо новий');
      await createCartItem();
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
