import { Container, Title, WhiteBlock } from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title text="Оформлення замовлення" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-10">
        {/* Ліва частина */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Кошик">11222</WhiteBlock>

          <WhiteBlock title="2. Персональні дані">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Ім'я" />
              <Input name="lastName" className="text-base" placeholder="Прізвище" />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адреса доставки">
            <div className="flex flex-col gap-5">
              <Input name="firstName" className="text-base" placeholder="Ведіть свою адресу..." />
              <Textarea className="text-base" rows={5} placeholder="Комент до замовлення" />
            </div>
          </WhiteBlock>
        </div>

        {/* Права частина */}
        <div className="w-[450px]">
          <WhiteBlock className={'p-6 sticky top-4'}>
            <div className="flex flex-col gap-1">
              <span className="text-xl">Разом:</span>
              <span className="text-[34px] font-extrabold">1300 ₴</span>
            </div>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
