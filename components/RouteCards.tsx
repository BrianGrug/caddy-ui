"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { getHandler, getHosts, getRouteUpstreams } from '@/lib/utils';
import { toast } from './ui/use-toast';
import React, { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { deleteRoute, useRoutes } from '@/lib/clientActions';
import { RouteDialog } from './RouteDialog';
import Error from './Error';
import Loading from './Loading';

export default function RouteCards() {

    const { data: routes, error, isLoading } = useRoutes();
    let routesMap: Route[] = routes as Route[];

    const [route, setRoute] = useState<Route>();
    const [open, setOpen] = useState(false);


    const { trigger: handleDelete } = useSWRMutation("/api/caddy/routes", deleteRoute, {
        onError: () => {
            return toast({
                title: "Error",
                description: "There was an error deleting the route",
                variant: "destructive"
            });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Route deleted successfully!",
                variant: "success"
            });
        }
    });


    let editRoute = (route: Route) => {
        setRoute(route);
    }


    if (error) return <Error />
    if (isLoading) return <Loading />


    return (
        <>
            {route && <RouteDialog open={open} onOpenChange={setOpen} route={route} routesMap={routesMap} />}
            {
                routesMap.map((route, index) => (
                    <div key={index}>
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{getHosts(route)!.values().next().value}</CardTitle>
                                {getHosts(route)!.map((route => <CardDescription key={route}>{route}</ CardDescription>))}
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-grid gap-6 items-center justify-center'>
                                    <div>
                                        <p className='text-sm font-mdeium leading-none'>
                                            Type
                                        </p>
                                        <p className='text-sm text-muted-foreground'>{getHandler(route)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium leading-none">
                                            Destination
                                        </p>
                                        <p className="text-sm text-muted-foreground">{getRouteUpstreams(route)?.map((upstream => upstream.dial))}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button onClick={() => {
                                    editRoute(route)
                                    setOpen(true)
                                }}>Edit</Button>
                                <Button variant="destructive" onClick={() => { handleDelete(route) }}>Delete</Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
        </>
    )
}