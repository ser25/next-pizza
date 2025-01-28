import {
  CheckoutItem,
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from '@/shared/components/shared';
import { Button, Input, Textarea } from '@/shared/components/ui';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title text="Оформлення замовлення" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-10">
        {/* Ліва частина */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Кошик">
            <div className="flex flex-col gap-5">
              <CheckoutItem
                id={1}
                imageUrl={'../assets/images/pizza-store/11EE7D610CF7E265B7C72BE5AE757CA7.webp'}
                details={'20 см, традиційна піца'}
                name={'Сирна'}
                price={510}
                quantity={1}
              />
              <CheckoutItem
                id={2}
                imageUrl={'../assets/images/pizza-store/11EE7D610CF7E265B7C72BE5AE757CA7.webp'}
                details={'20 см, традиційна піца'}
                name={'Сирна'}
                price={510}
                quantity={1}
              />
            </div>
          </WhiteBlock>

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

            <CheckoutItemDetails
              title={
                <>
                  <Package size={24} className="mr-1 text-gray-400" />
                  Вартість товарів:
                </>
              }
              value="1200 ₴"
            />
            <CheckoutItemDetails
              title={
                <>
                  <Percent size={24} className="mr-1 text-gray-400" />
                  Податок:
                </>
              }
              value="1200 ₴"
            />
            <CheckoutItemDetails
              title={
                <>
                  <Truck size={24} className="mr-1 text-gray-400" />
                  Доставка:
                </>
              }
              value="1200 ₴"
            />

            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
              Перейти до оплати
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
