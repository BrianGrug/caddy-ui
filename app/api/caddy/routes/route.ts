import { getConfig, getServer } from '@/lib/utils';
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
    let routes: Server[] = await getServer();

    let indexOfRoute = routes.findIndex((routeToFind: Route) => route.handle == routeToFind.handle);

    console.log(indexOfRoute)

    return new NextResponse(JSON.stringify("Test"), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    }); 

    const res = await fetch(`http://192.168.1.69:2019/config/apps/http/servers/srv0/routes/${index}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(route)
      });
    
    return new NextResponse(JSON.stringify("Test"), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}