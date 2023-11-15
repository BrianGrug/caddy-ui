import { getConfig } from '@/lib/utils';
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
    return new NextResponse(JSON.stringify("Test"), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}