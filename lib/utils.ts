
import { type ClassValue, clsx } from "clsx"
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHosts(route: Route) {
  return route?.match?.map(match => match.host).flatMap(host => host);
}

export function getRouteType(route: Route) {
  return route.handle[0].handler;
}

export function getRouteUpstreams(route: Route, index: number = 0) {
  let upstreams: Upstream[] = route.handle[index].routes?.flat()[index].handle[index].upstreams!;
  return upstreams;
}

export function getHandler(route: Route) {
  if(route.handle[0].routes) {
    let handle: string = route?.handle[0]?.routes[0]?.handle[0]?.handler
    return handle;
  }
}

export function onError(message: string, status: number = 500) {
  return new NextResponse(JSON.stringify({ error: true, message: message }), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}