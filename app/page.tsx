import { Container, Title, TopBar } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Усі піци" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <div style={{ height: '3000px' }}></div>
    </>
  );
}
