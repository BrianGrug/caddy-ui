"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { getHosts, getRouteUpstreams } from '@/lib/utils';
import { deleteRoute } from '@/lib/serverActions';
import { toast } from './ui/use-toast';
import React, { useState } from 'react';

class RouteCards extends React.Component<{routes: Route[]}> {
    constructor(props: { routes: Route[] }) {
        super(props);
    }

    state = {
        routes: this.props.routes,
    }

    componentDidUpdate(prevProps: Readonly<{ routes: Route[]; }>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.routes !== this.props.routes) {
            this.setState({
                routes: this.props.routes
            })
        }
    }

    handleDelete = async (route: Route) => {
        let res = await deleteRoute(route);

        if (res.error) return toast({
            title: "Error",
            description: res.message,
            variant: "destructive"
        });

        this.state.routes.splice(this.state.routes.indexOf(route), 1)

        this.setState({
            routes: this.state.routes
        });

        return toast({
            title: "Success",
            description: "Route deleted successfully!",
            variant: "success"
        });
    }



    handleClick = (route: Route) => {
        console.log(route);
    }

    render() {
        return (
            this.state.routes.map((route, index) => (
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
                            <Button onClick={() => { this.handleClick(route) }}>Edit</Button>
                            <Button variant="destructive" onClick={() => { this.handleDelete(route) }}>Delete</Button>
                        </CardFooter>
                    </Card>
                </div>
            ))
        )
    }

}

export default RouteCards;