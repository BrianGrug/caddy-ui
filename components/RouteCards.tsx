"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { getHosts, getRouteUpstreams } from '@/lib/utils';
import { toast } from './ui/use-toast';
import React from 'react';
import useSWRMutation from 'swr/mutation';
import { deleteRoute } from '@/lib/clientActions';

export default function RouteCards({ routes }: { routes: Route[] }) {

    const { trigger } = useSWRMutation("/api/caddy/routes", deleteRoute, {
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

    return (
        routes.map((route, index) => (
            <div key={index} className='p-2'>
                <Card key={index} className='w-[300px]'>
                    <CardHeader>
                        <CardTitle>{getHosts(route).values().next().value}</CardTitle>
                        {getHosts(route).map((route => <CardDescription key={route}>{route}</ CardDescription>))}
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm font-medium leading-none">
                            Tunneling to
                        </p>
                        <p className="text-sm text-muted-foreground">{getRouteUpstreams(route)?.map((upstream => upstream.dial))}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={() => { trigger(route) }}>Edit</Button>
                        <Button variant="destructive" onClick={() => { trigger(route) }}>Delete</Button>
                    </CardFooter>
                </Card>
            </div>
        ))
    )
}



