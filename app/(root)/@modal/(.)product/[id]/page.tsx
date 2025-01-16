import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared/components/shared';
import { notFound } from 'next/navigation';

export default async function ProductModal({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ChooseProductModal product={product} />
    </div>
  );
}
