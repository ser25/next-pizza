'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ProfileButton } from './profile-button';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  React.useEffect(() => {
    if (searchParams.has('paid')) {
      toast.success('Замовлення успішно оплачено');
      router.push('/', { scroll: false });
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
          <ProfileButton />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
