import { prisma } from '@/prisma/prisma-client';

export const findOrCreateCart = async (token: string) => {
  let userCard = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  if (!userCard) {
    userCard = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  return userCard;
};
