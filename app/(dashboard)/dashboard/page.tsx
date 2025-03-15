import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/');
  }

  const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });

  if (user?.role !== 'ADMIN') {
    return redirect('/');
  } else {
    return redirect('/dashboard/overview');
  }
}
