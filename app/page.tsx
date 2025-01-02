import { Container, FIlters, Title, TopBar } from '@/components/shared';
import { ProductCard } from '@/components/shared/product-card';
import { ProductsGroupList } from '@/components/shared/products-group-list';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Усі піци" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фільтер */}
          <div className="w-[250px]">
            <FIlters />
          </div>
          {/* Список товару */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={'Піци'}
                items={[
                  {
                    id: 1,
                    name: 'Піца Гавайська',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2Fhavaiska-300dpi-min.webp&w=480&q=75',
                    price: 301,
                    items: [{ price: 360 }],
                  },
                  {
                    id: 2,
                    name: 'Піца Гавайська',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2Fhavaiska-300dpi-min.webp&w=480&q=75',
                    price: 301,
                    items: [{ price: 360 }],
                  },
                  {
                    id: 3,
                    name: 'Піца Гавайська',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2Fhavaiska-300dpi-min.webp&w=480&q=75',
                    price: 301,
                    items: [{ price: 360 }],
                  },
                  {
                    id: 4,
                    name: 'Піца Гавайська',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2Fhavaiska-300dpi-min.webp&w=480&q=75',
                    price: 301,
                    items: [{ price: 360 }],
                  },
                  {
                    id: 5,
                    name: 'Піца Гавайська',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2Fhavaiska-300dpi-min.webp&w=480&q=75',
                    price: 301,
                    items: [{ price: 360 }],
                  },
                  {
                    id: 6,
                    name: 'Піца Гавайська',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2Fhavaiska-300dpi-min.webp&w=480&q=75',
                    price: 301,
                    items: [{ price: 360 }],
                  },
                  {
                    id: 7,
                    name: 'Піца Гавайська',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2Fhavaiska-300dpi-min.webp&w=480&q=75',
                    price: 301,
                    items: [{ price: 360 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title={'Комбо'}
                items={[
                  {
                    id: 1,
                    name: 'Coca-Cola Cherry',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FNapoi%2Fbezalkoholni%20hazovani%20napoi%2Fcheri%2Fcola-cherry-website-main.webp&w=480&q=75',
                    price: 57,
                    items: [{ price: 57 }],
                  },
                  {
                    id: 2,
                    name: 'Coca-Cola Cherry',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FNapoi%2Fbezalkoholni%20hazovani%20napoi%2Fcheri%2Fcola-cherry-website-main.webp&w=480&q=75',
                    price: 57,
                    items: [{ price: 57 }],
                  },
                  {
                    id: 3,
                    name: 'Coca-Cola Cherry',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FNapoi%2Fbezalkoholni%20hazovani%20napoi%2Fcheri%2Fcola-cherry-website-main.webp&w=480&q=75',
                    price: 57,
                    items: [{ price: 57 }],
                  },
                  {
                    id: 4,
                    name: 'Coca-Cola Cherry',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FNapoi%2Fbezalkoholni%20hazovani%20napoi%2Fcheri%2Fcola-cherry-website-main.webp&w=480&q=75',
                    price: 57,
                    items: [{ price: 57 }],
                  },
                  {
                    id: 5,
                    name: 'Coca-Cola Cherry',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FNapoi%2Fbezalkoholni%20hazovani%20napoi%2Fcheri%2Fcola-cherry-website-main.webp&w=480&q=75',
                    price: 57,
                    items: [{ price: 57 }],
                  },
                  {
                    id: 6,
                    name: 'Coca-Cola Cherry',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FNapoi%2Fbezalkoholni%20hazovani%20napoi%2Fcheri%2Fcola-cherry-website-main.webp&w=480&q=75',
                    price: 57,
                    items: [{ price: 57 }],
                  },
                  {
                    id: 7,
                    name: 'Coca-Cola Cherry',
                    imageUrl:
                      'https://dominos.ua/_next/image/?url=https%3A%2F%2Fmedia-v3.dominos.ua%2FProducts%2FNapoi%2Fbezalkoholni%20hazovani%20napoi%2Fcheri%2Fcola-cherry-website-main.webp&w=480&q=75',
                    price: 57,
                    items: [{ price: 57 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>

      <div style={{ height: '3000px' }}></div>
    </>
  );
}
