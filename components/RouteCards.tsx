"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { getHosts, getRouteUpstreams } from '@/lib/utils';
import { toast } from './ui/use-toast';
import React, { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { deleteRoute } from '@/lib/clientActions';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';

export default function RouteCards({ routes }: { routes: Route[] }) {

    const [route, setRoute] = useState<Route>();

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

    return (
        <>
            <EditRouteDialog route={route} />
            {
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
                                <Button onClick={() => { editRoute(route) }}>Edit</Button>
                                <Button variant="destructive" onClick={() => { handleDelete(route) }}>Delete</Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
        </>
    )
}

export function EditRouteDialog({ route }: { route?: Route }) {
    const form = useForm({
        defaultValues: {
            handler: route?.handle[0].handler,
            upstreams: route?.handle[0].upstreams,
            //hosts: route?.match[0].host,
        }
    });

    let test: RouteHandle = {
        handle: [
            {
                handler: 'subroutes',
                routes: [
                    {
                        handle: [
                            {
                                handler: 'reverse_proxy',
                                upstreams: [
                                    {
                                        dial: 'localhost:8080'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],

        match: [
            {
                host: [
                    'example.com'
                ]
            }
        ]
    }

    let onSubmit = ((data: any) => {
        console.log('Original Route', JSON.stringify(route))
        console.log(data)
    })

    return (
        <Dialog open={route as Route != null}>
            <DialogContent className='sm:max-w-[425px]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="handler"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Handler</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={route?.handle[0].handler} />
                                    </FormControl>
                                </FormItem>
                            )}

                        ></FormField>

                        {route ? getRouteUpstreams(route)?.map((upstream, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name="upstreams"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upstream {index + 1}</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={upstream.dial} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            >
                            </FormField>
                        )) : <></>}

                        {route ? getHosts(route)?.map((host, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name="hosts"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Host {index + 1}</FormLabel>
                                        <FormControl>
                                            <Input {...field} defaultValue={host} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            >
                            </FormField>
                        )) : <></>}
                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}