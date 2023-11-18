import useSWR from "swr";

export async function useConfig() {
    const { data, error, isLoading } = useSWR('/api/caddy/servers', fetcher, {
      refreshInterval: 1000,
    });
    return {
      data,
      error,
      isLoading,
    }
  }
  
  export async function useServer() {
    const { data, error, isLoading } = useSWR('/api/caddy/servers', fetcher, {
      refreshInterval: 1000,
    });
  
    return {
      data,
      error,
      isLoading,
    }
  }
  
  export async function useUpstreamRoutes(route: Route) {
    const { data, error, isLoading } = useSWR('http://192.168.1.69:2019/reverse_proxy/upstreams', fetcher, {
      refreshInterval: 1000,
    });
  
    return {
      data,
      error,
      isLoading,
  
    }
  }
  
  export function useRoutes() {
    const { data, error, isLoading } = useSWR('/api/caddy/routes', fetcher, {
      refreshInterval: 1000,
    });

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

  
  export default async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
  }
  