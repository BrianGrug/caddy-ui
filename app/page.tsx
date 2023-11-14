import RouteCards from '@/components/RouteCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getHosts, getRouteUpstreams } from '@/lib/utils';

async function getRoutes() {
  let res = await fetch('http://localhost:3000/api/caddy/routes');
  if (!res.ok) throw new Error('Failed to fetch routes');
  return await res.json();
}
function handleClick() {
  console.log('click');
}
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
