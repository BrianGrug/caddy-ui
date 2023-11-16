import RouteCards from '@/components/RouteCards';
import { getRoutes } from '@/lib/serverActions';

export default async function Home() {
  let routes: Array<Route> = await getRoutes();

  return (
    <main>
      <div className=''>
        <div className='flex grid grid-cols-6 p-2'>
          <RouteCards routes={routes} />
        </div>
      </div>
    </main>
  )
}
