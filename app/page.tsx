"use client"

import { CardTitle, Card, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { getRoutes } from '@/lib/serverActions';
import RouteCards from '@/components/RouteCards';
import { useEffect, useState } from 'react';

async function fetchRoutes() {
  let routes: Route[] = await getRoutes();
  return routes;
}

export default function Home() {

  useEffect(() => {
    async function fetchData() {
      const data: Route[] = await fetchRoutes();
      setRoutes(data);
    }
    fetchData();
  }, []);

  const [routes, setRoutes] = useState<Route[]>([])

  return (
    <main>
      <div className='flex items-center justify-center p-2'>
        <Card className='flex'>
          <CardHeader>
            <CardTitle>Active Routes</CardTitle>
            <CardDescription>Amount of configured routes</CardDescription>
          </CardHeader>
          <CardContent className='flex items-center'>
            <div className=''>
              <p className='text-xl font-semibold translate-y-2'>{routes.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid grid-flow-row-dense md:grid-cols-6 sm:grid-cols-2 p-2'>
        <RouteCards routes={routes} />
      </div>
    </main>
  )
}
