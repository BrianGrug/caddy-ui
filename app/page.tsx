"use client"

import { CardTitle, Card, CardDescription, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import RouteCards from '@/components/RouteCards';
import { Button } from '@/components/ui/button';
import { useRoutes } from '@/lib/clientActions';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useState } from 'react';
import { RouteDialog } from '@/components/RouteDialog';


export default function Home() {

  const [route, setRoute] = useState<Route>();
  const [open, setOpen] = useState(false);
  const { data: routes, error, isLoading } = useRoutes();
  let routesMap: Route[] = routes as Route[];

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <main>
      {route && <RouteDialog onOpenChange={setOpen} open={open} route={route} routesMap={routesMap} />}
      <div className='flex items-center justify-center p-6'>
        <Card className='flex'>
          <CardHeader>
            <CardTitle>Active Routes</CardTitle>
            <CardDescription>Amount of configured routes</CardDescription>
          </CardHeader>
          <CardContent className='flex items-center'>
            <div>
              <p className='text-xl font-semibold translate-y-2'>{routesMap.length}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => {
              setRoute({
                "handle": [
                  {
                    "handler": "subroute",
                    "routes": [
                      {
                        "handle": [
                          {
                            "handler": "reverse_proxy",
                            "upstreams": []
                          }
                        ]
                      }
                    ]
                  }
                ],
                "match": [
                  {
                    "host": []
                  }
                ],
                "terminal": true
              })
              setOpen(true);
            }} className='translate-y-2.5'>Create</Button>
          </CardFooter>
        </Card>
      </div>
      <div className='grid grid-flow-row-dense md:grid-cols-6 sm:grid-cols-2 p-2'>
        <RouteCards routes={routesMap} />
      </div>
    </main>
  )
}