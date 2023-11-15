import { getConfig, getRoutes, getServer } from '@/lib/serverActions';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET() {
    let caddyConfig = await getConfig();

    let routes: Array<Route> = [];

    caddyConfig.apps.http.servers.srv0.routes.forEach((route: Route) => {
        routes.push(route);
    });

    return new NextResponse(JSON.stringify(routes), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(req: Request) {
    let route: Route = await req.json();
    let routes: Route[] = await getRoutes();
    let routesMap: Match[] = routes.map(r => r.match[0]);

    let index = routesMap.findIndex((r) => (r.host === route.match[0].host))

    if(index = -1) return new NextResponse(JSON.stringify({error: 'Route not found'}), {
        status: 404,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const res = await fetch(`http://192.168.1.69:2019/config/apps/http/servers/srv0/routes/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(route)
      });

    
    return new NextResponse(JSON.stringify(JSON.stringify(res.body)), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}