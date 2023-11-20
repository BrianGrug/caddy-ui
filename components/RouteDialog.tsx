import { updateRoute } from "@/lib/clientActions";
import { getHosts, getRouteUpstreams } from "@/lib/utils";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "./ui/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { get, set } from "lodash";
import { Dialog, DialogContent } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function RouteDialog({ route, routesMap }: { route: Route, routesMap: Route[] }) {
    let index = routesMap.indexOf(route);

    const [modifiedRoute, setRoute] = useState(route);
    const { trigger: pushUpdate } = useSWRMutation(`/api/caddy/routes/${index}`, updateRoute, {
        onError: () => {
            return toast({
                title: "Error",
                description: "There was an error updating the route",
                variant: "destructive"
            });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Route updated successfully!",
                variant: "success"
            });
        }
    });

    let validHosts: any[] = getHosts(route);
    let validUpstreams: any[] = getRouteUpstreams(route).map((upstream) => upstream.dial);

    const form = useForm({
        values: {
            handler: route.handle[0].routes[0].handle[0].handler ?? "",
            upstreams: validUpstreams ?? [],
            hosts: validHosts ?? [],
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

    let onSubmit = (() => {
        let update = {
            route: modifiedRoute,
            index: index,
            type: index == -1 ? 'PUT' : 'PATCH'
        }
        if (index == -1) update.index = routesMap.length + 1;
        pushUpdate(update);
    })


    let handleChange = (value: any, path: any) => {
        let updatedRoute = set(modifiedRoute, path, value.target.value);
        setRoute(updatedRoute);
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
                                        <Input {...field} onChange={(value) => handleChange(value, `handle[0].handler`)} />
                                    </FormControl>
                                </FormItem>
                            )}

                        ></FormField>

                        {upstreams.map((upstream, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={`upstreams.${index}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upstream {index + 1}</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(value) => handleChange(value, `handle[0].routes[0].handle[0].upstreams[${index}].dial`)} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}

                        {hosts.map((host, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={`hosts.${index}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Host {index + 1}</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(value) => handleChange(value, `match[0].host[${index}]`)} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit">Save</Button>
                        <Button type='button' onClick={() => { appendUpstreams('') }}>Add Host</Button>
                        <Button type='button' onClick={() => { appendHosts('') }}>Add Upstream</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}