"use client"


import { useRoutes } from '@/lib/clientActions';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useState } from 'react';
import { RouteDialog } from '@/components/RouteDialog';
import Header from '@/components/Header';
import RouteCards from '@/components/RouteCards';


export default function Home() {

  const { data: routes, error, isLoading } = useRoutes();
  let routesMap: Route[] = routes as Route[];

  if (error) return <Error />
  if (isLoading) return <Loading />

  return (
    <main>
      
      <div>
        <Header routes={routesMap} />
      </div>

      <div className='grid grid-flow-row-dense md:grid-cols-6 sm:grid-cols-2 p-2'>
        <RouteCards routes={routesMap} />
      </div>
    </main>
  )
}