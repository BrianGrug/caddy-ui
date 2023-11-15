import { getUpstreamRequests } from '@/lib/serverActions';
import { getRouteUpstreams } from '@/lib/utils';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    //TODO, Christ, maybe I'm not a dev
    if (!true) {
        return new NextResponse(JSON.stringify({"error": "An error has occurred. Please check for a valid body and retry."}), {
            status: 400,
            headers: {
                'Content-Type': 'appliation/json',
            },
        });
    }

    let route: Route = await req.json();
    let upstreams: UpstreamRequest[] = await getUpstreamRequests(route);
    let routeUpstreams: Upstream[] = getRouteUpstreams(route);

    let upstreamsRequested: UpstreamRequest[] = upstreams.filter(upstream => {
        return routeUpstreams.find(routeUpstream => routeUpstream.dial === upstream.address);
    });

    return new NextResponse(JSON.stringify(upstreamsRequested), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}