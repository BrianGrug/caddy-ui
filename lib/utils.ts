import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHosts(route: Route) {
  return route.match.map(match => match.host).flatMap(host => host);
}

export function getRouteType(route: Route) {
  return route.handle[0].handler;
}

export function getRouteUpstreams(route: Route, index: number = 0) {
  let test: Upstream[] = route.handle[index].routes?.flat()[index].handle[index].upstreams!;
  return test;
}

export async function getRoutes() {
  const res = await fetch('http://192.168.1.69:2019/config/', { cache: 'no-store' })

  if (!res.ok) {
      throw new Error('Failed to fetch caddy config. Please check the network and try again.')
  }

  let caddyConfig: CaddyConfig = await res.json();

  return caddyConfig;
}

export async function removeRoute(route: Route) {
  console.log(route)
  const res = await fetch('http://192.168.1.69:2019/config/apps/http/servers/srv0/routes/')
}