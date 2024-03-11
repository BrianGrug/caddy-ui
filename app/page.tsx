import { useRoutes } from '@/lib/clientActions';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useState } from 'react';
import { RouteDialog } from '@/components/RouteDialog';
import Header from '@/components/Header';
import RouteCards from '@/components/RouteCards';
import { SWRConfig } from 'swr';


export default function Home() {

  return (
    <main>

      <div>
        <Header />
      </div>

      <div className='flex flex-grid p-2 flex-wrap justify-center gap-2'>
        <RouteCards />
      </div>
    </main>
  )
}