'use server';
  
  export async function getConfig() {
    const res = await fetch(`${process.env.CADDY_API}/config/`, {
      cache: 'no-cache',
    }).catch(() => {
      throw new Error('Failed to fetch caddy config. Please check the network and try again.');
    });
  
    let caddyConfig: CaddyConfig = await res.json();
  
    return caddyConfig;
  }
  
  export async function getServer() {
    const res = await fetch(`${process.env.URL}/api/caddy/servers`).catch(() => {
      throw new Error('Failed to fetch caddy servers. Please check the network and try again.');
    });

    let server: Server = await res.json();
    return server;
  }
  
  export async function deleteRoute(url: any, { arg }: { arg: Route }) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      body: JSON.stringify(arg)
    }).then((res) => res.json());
  }
  
  export async function getUpstreamRequests(route: Route) {
    let upstreams: UpstreamRequest[] = await fetch(`${process.env.CADDY_API}/reverse_proxy/upstreams`, {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).catch(() => {
      throw new Error('Failed to fetch upstream requests. Please check the network and try again.');
    });
    
    return upstreams;
  }
  
  export async function getRoutes() {
    let res = await fetch(`${process.env.URL}/api/caddy/routes`, { cache: 'no-cache' }).catch(() => {
      throw new Error('Failed to fetch routes. Please check the network and try again.');
    });

    return await res.json();
  }

  export async function updateRoute(index: number, route: Route) {
    return await fetch(`http://192.168.1.69:2019/config/apps/http/servers/srv0/routes/${index}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      body: JSON.stringify(route)
    }).then((res) => res.json())
  }