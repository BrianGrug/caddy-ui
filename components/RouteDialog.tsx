import { updateRoute } from "@/lib/clientActions";
import { getHandler, getHosts, getRouteUpstreams } from "@/lib/utils";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "./ui/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { get, set } from "lodash";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

//TODO one day, I'll clean this up
export function RouteDialog({ route, routesMap, open, onOpenChange }: { route: Route, routesMap: Route[], open: boolean, onOpenChange: (open: boolean) => void }) {
    let index = routesMap.indexOf(route);

    const [modifiedRoute, setRoute] = useState<Route>(route);



    const { trigger: pushUpdate } = useSWRMutation(`/api/caddy/routes`, updateRoute, {
        onError: (err) => {
            return toast({
                title: "Error",
                description: "There was an error updating the route. " + err.message,
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

    let validHosts: any[] = [];
    let validUpstreams: any[] = [];
    let handler: string = "reverse_proxy";

    if (index != -1) {
        validHosts = getHosts(modifiedRoute)!;
        validUpstreams = getRouteUpstreams(route).map((upstream) => upstream.dial);
        handler = getHandler(route)!;
    }

    const form = useForm({
        values: {
            handler: handler,
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

        if (index == -1) update.index = routesMap.length - 1;
        console.log(JSON.stringify(update.route), update.index)
        pushUpdate(update);

    })

    let handleChange = (value: any, path: any) => {
        let updatedRoute = set(modifiedRoute, path, value.target.value);
        setRoute(updatedRoute);
        form.setValue(value.target.name, value.target.value)
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                                            <Input {...field} placeholder="127.0.0.1" onChange={(value) => handleChange(value, `handle[0].routes[0].handle[0].upstreams[${index}].dial`)} />
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
                                            <Input {...field} placeholder="example.com" onChange={(value) => handleChange(value, `match[0].host[${index}]`)} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <DialogFooter className="translate-y-2">
                        <Button variant="outline" disabled={upstreams.length >= 1} type='button' onClick={() => {appendUpstreams('')}}>Add Upstream</Button>
                            <Button variant="outline" type='button' onClick={() => {appendHosts('')}}>Add Host</Button>
                            <DialogClose asChild><Button onClick={() => onOpenChange(false)} type="submit">Save</Button></DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}