// Import the NextJS API route handler
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

async function getRoutes() {
    const res = await fetch('http://192.168.1.69:2019/config/', { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch caddy config. Please check the network and try again.')
    }

    let caddyConfig: CaddyConfig = await res.json();

    return caddyConfig;
}

async function removeRoute(route: Route) {
    const res = await  fetch('http://192.168.1.69:2019/config/apps/http/servers/srv0/routes/0')
}

// Define the route handler function
export async function GET() {
    let caddyConfig = await getRoutes();
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
    return new NextResponse(JSON.stringify("Test"), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    }); 
}