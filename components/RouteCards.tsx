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
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { get, set } from 'lodash';

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
            {route && <EditRouteDialog route={route} />}
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

export function EditRouteDialog({ route }: { route: Route }) {
    const [modifiedRoute, setRoute] = useState(route);
    let validHosts: any[] = getHosts(route);
    let validUpstreams: any[] = getRouteUpstreams(route).map((upstream) => upstream.dial);

    const form = useForm({
        values: {
            handler: route.handle[0].routes[0].handle[0].handler,
            upstreams: validUpstreams,
            hosts: validHosts,
        }
    });

    const { fields: upstreams, append: appendUpstreams } = useFieldArray({
        control: form.control,
        name: "upstreams",
    })

    const { fields: hosts, append: appendHosts } = useFieldArray({
        control: form.control,
        name: "hosts",
    })
    
    let onSubmit = ((data: any) => {

    })

    console.log(getHosts(route))

    let handleChange = (value: any, path: any) => {
        let updatedRoute = set(modifiedRoute, path, value.target.value);
        setRoute(updatedRoute);
        console.log(value.target.name, value.target.value)
        form.setValue(value.target.name, value.target.value)
    }


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
                                        <Input {...field} onChange={(value) => handleChange(value, `modifiedRoute.handle[0].handler`)} />
                                    </FormControl>
                                </FormItem>
                            )}

                        ></FormField>

                        {upstreams.map((upstream, index) => (
                            <FormField
                                key={upstream.id}
                                control={form.control}
                                name={`upstreams.${index}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upstream {index + 1}</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(value) => handleChange(value, `modifiedRoute.handle[0].upstreams`)} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            >
                            </FormField>
                        ))}

                        {hosts.map((host, index) => (
                            <FormField
                                key={host.id}
                                control={form.control}
                                name={`hosts.${index}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Host {index + 1}</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(value) => handleChange(value, `modifiedRoute.handle[0].hosts`)} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            >
                            </FormField>
                        ))}

                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}