"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { getHosts, getRouteUpstreams } from '@/lib/utils';
import { deleteRoute } from '@/lib/serverActions';

export default function RouteCards({ routes }: { routes: Array<Route> }) {

    async function handleDelete(route: Route) {
       await deleteRoute(route);
    }

    
    let handleClick = (route: Route) => {
        console.log(route);
     }

    return (
        routes.map((route, index) => (
            <div key={index}>
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{getHosts(route).values().next().value}</CardTitle>
                        {getHosts(route).map((route => <CardDescription key={route}>{route}</ CardDescription>))}
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm font-medium leading-none">
                            Proxying to
                        </p>
                        <p className="text-sm text-muted-foreground">{getRouteUpstreams(route)?.map((upstream => upstream.dial))}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={() => {handleClick(route)}}>Edit</Button>
                        <Button variant="destructive" onClick={() => {handleDelete(route)}}>Delete</Button>
                    </CardFooter>
                </Card>
            </div>
        ))
    )
}