import { getConfig, getRoutes, getServer } from '@/lib/serverActions';
import { NextApiRequest } from 'next';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
    let caddyConfig: CaddyConfig = await getConfig();

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
    let routesMap: Route[] = routes.map(r => r);

    let targetRoute: Route = routesMap.filter((r) => (JSON.stringify(r) === JSON.stringify(route))).values().next().value;
    
    let index = routesMap.indexOf(targetRoute);

    revalidateTag('routes');
    
    if(index == -1) return new NextResponse(JSON.stringify({error: true, message: "Route not found"}), {
        status: 404,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const res = await fetch(`${process.env.CADDY_API}/config/apps/http/servers/srv0/routes/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({route, error: false})
      });

    
    return new NextResponse(JSON.stringify(JSON.stringify(res.body)), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}