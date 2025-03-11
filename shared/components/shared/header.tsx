'use client';

import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { CartButton } from './cart-button';
import { Container } from './container';
import { AuthModal } from './modals';
import { ProfileButton } from './profile-button';
import { SearchInput } from './search-input';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  React.useEffect(() => {
    let toastMessage = '';
    if (searchParams.has('paid')) {
      toastMessage = 'Замовлення успішно оплачено';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Пошту успішно підтверджено!';
    }

    if (toastMessage) {
      toast.success(toastMessage);
      router.replace('/');
    }
  }, []);
  return (
    <header className={cn(' border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35}></Image>
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">смачніше вже нікуди</p>
            </div>
          </div>
        </Link>

        {/* Center */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right */}

        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
