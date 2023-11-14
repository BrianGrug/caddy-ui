"use client"

import { getHosts, getRouteUpstreams } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { randomInt } from "crypto";


export default function RouteCards({ routes }: { routes: Array<Route> }) {

    let handleClick = () => {
        console.log('click');
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
                        <Button variant="secondary" onClick={handleClick}>Edit</Button>
                        <Button variant="destructive" onClick={handleClick}>Delete</Button>
                    </CardFooter>
                </Card>
            </div>
        ))
    )
}