import { prisma } from '@/prisma/prisma-client';
import { ProductsGroupList, Container, FIlters, Title, TopBar } from '@/shared/components/shared';
import { Suspense } from 'react';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: { products: { include: { items: true, ingredients: true } } },
  });
  return (
    <>
      <Container className="mt-10">
        <Title text="Усі піци" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter(category => category.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фільтер */}
          <div className="w-[250px]">
            <Suspense>
              <FIlters />
            </Suspense>
          </div>
          {/* Список товару */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                category =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
