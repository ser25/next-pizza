import { AreaGraph, BarGraph, Container, PieGraph, RecentSales } from '@/shared/components';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components';

export default function Overview() {
  return (
    <Container className="my-10">
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <div className="col-span-4">
          <BarGraph />
        </div>
        <RecentSales className="col-span-3 md:col-span-2" />
        <div className="col-span-4">
          <AreaGraph />
        </div>
        <div className="col-span-3 md:col-span-2">
          <PieGraph />
        </div>
      </div>
    </Container>
  );
}
