import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {server: string}}) {
    const slug = params.server;
    const res = await fetch(`http://192.168.1.69:2019/config/apps/http/servers/${slug}`, { cache: 'no-store' });

    if (!res.ok) 
      throw new Error('Failed to fetch caddy config. Please check the network and try again.');
  
    let server: Server = await res.json();
  
    return new NextResponse(JSON.stringify(server), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}