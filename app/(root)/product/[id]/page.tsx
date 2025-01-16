// 'use client';

import { prisma } from '@/prisma/prisma-client';
import { Container, Title, GroupVariants, PizzaImage } from '@/shared/components/shared';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={40} />
        <div className="w-[490px] bg-[#e2dfdf] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eos odit commodi
            doloremque culpa.
          </p>
          <GroupVariants
            value="2"
            items={[
              { name: 'M', value: '1' },
              { name: 'L', value: '2' },
              { name: 'XL', value: '3', disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
