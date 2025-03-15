import { Container } from '@/shared/components';

export default function Overview() {
  return (
    <Container className="my-10">
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </Container>
  );
}
