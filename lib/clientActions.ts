import useSWR from "swr";

export async function useConfig() {
    const { data, error, isLoading } = useSWR('/api/caddy/servers', fetcher);
    return {
      data,
      error,
      isLoading,
    }
  }
  
  export async function useServer() {
    const { data, error, isLoading } = useSWR('/api/caddy/servers', fetcher);
    return {
      data,
      error,
      isLoading,
    }
  }
  
  export async function useUpstreamRoutes(route: Route) {
    const { data, error, isLoading } = useSWR(`${process.env.CADDY_API}/reverse_proxy/upstreams`, fetcher);
    return {
      data,
      error,
      isLoading,
  
    }
  }
  
  export function useRoutes() {
    const { data, error, isLoading } = useSWR('/api/caddy/routes', fetcher);
    return {
      data,
      error,
      isLoading,
    }
  }

  export function deleteRoute(url: any, { arg }: { arg: Route }) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      body: JSON.stringify(arg)
    }).then((res) => res.json());
  }

  export function updateRoute(url: any, { arg }: { arg: { route: Route, index: number, type: string } }) {
    return fetch(url + `/` + arg.index, {
      method: arg.type,
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      body: JSON.stringify(arg.route)
    }).then((res) => res.json()).catch((err) => console.log(err));
  }

  
  export default async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
  }
  