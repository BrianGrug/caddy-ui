"use client"

import { CardTitle, Card, CardDescription, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import RouteCards from '@/components/RouteCards';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRoutes } from '@/lib/clientActions';
import Error from './Error';
import Loading from './Loading';
import { RouteDialog } from './RouteDialog';

export default function Header() {
    
    const { data: routes, error, isLoading } = useRoutes();
    let routesMap: Route[] = routes as Route[];

    const [route, setRoute] = useState<Route>();
    const [open, setOpen] = useState(false);

    return (
        <>
            {route && <RouteDialog open={open} onOpenChange={setOpen} route={route} routesMap={routesMap} />}

            <div className='flex items-center justify-center py-6'>
                <Card className='flex'>
                    <CardHeader>
                        <CardTitle>Active Routes</CardTitle>
                        <CardDescription>Amount of configured routes</CardDescription>
                    </CardHeader>
                    <CardContent className='flex items-center'>
                        <div>
                            <p className='text-xl font-semibold translate-y-2'>{routesMap?.length}</p>
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

        </>
    )
}