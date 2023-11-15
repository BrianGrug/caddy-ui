import RouteCards from '@/components/RouteCards';
import { getRoutes } from '@/lib/serverActions';

export default async function Home() {
  let routes: Array<Route> = await getRoutes();

  return (
    <main className="flex min-h-screen">
      <div className='grid grid-rows-4 grid-flow-col gap-4'>
        <RouteCards routes={routes} />
      </div>
    </main>
  )
}
