import { getUpstreamRequests } from '@/lib/serverActions';
import { getRouteUpstreams } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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