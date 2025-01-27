import { prisma } from '@/prisma/prisma-client';
import {
  ChooseProductForm,
  Container,
  GroupVariants,
  PizzaImage,
  Title,
} from '@/shared/components/shared';
import { ChoosePizzaForm } from '@/shared/components/shared/choose-pizza-form';
import { ProductForm } from '@/shared/components/shared/product-form';
import { useCartStore } from '@/shared/store';
import { notFound } from 'next/navigation';
import toast from 'react-hot-toast';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });
  if (!product) {
    return notFound();
  }

  return <Container className="flex flex-col my-10">{<ProductForm product={product} />}</Container>;
}
