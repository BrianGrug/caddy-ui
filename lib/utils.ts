import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export async function getConfig() {
  const res = await fetch('http://192.168.1.69:2019/config/', { cache: 'no-store' });

  if (!res.ok)
    throw new Error('Failed to fetch caddy config. Please check the network and try again.');

  let caddyConfig: CaddyConfig = await res.json();

  return caddyConfig;
}

export async function getServer() {
  const res = await fetch('http://localhost:3000/api/caddy/servers', { cache: 'no-store' });

  if (!res.ok)
    throw new Error('Failed to fetch caddy config. Please check the network and try again.');

  let server: Server = await res.json();
  return server;
}

export async function deleteRoute(route: Route, index: number = 0) {
  let server: Server = await getServer();

  console.log(server)
  return true;

  const res = await fetch(`http://192.168.1.69:2019/config/apps/http/servers/srv${index}/routes/${index}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(route)
  });

  if (!res.ok) throw new Error('Failed to remove route. Please check the network and try again.');

  return res.json();
}

export async function getUpstreamRequests(route: Route) {
  let upstreams: UpstreamRequest[] = await fetch(`http://192.168.1.69:2019/reverse_proxy/upstreams`, {
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());

  if (!upstreams) throw new Error('Failed to fetch upstreams. Please check the network and try again.')

  return upstreams;
}