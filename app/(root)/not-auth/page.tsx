import { InfoBlock } from '@/shared/components';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ заборонено"
        text="Цю сторінку можуть переглядати тільки авторизовані користувачі"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
