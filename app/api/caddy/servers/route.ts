import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const res = await fetch(`${process.env.CADDY_API}/config/apps/http/servers/`, { cache: 'no-store' });

    if (!res.ok) 
      throw new Error('Failed to fetch caddy config. Please check the network and try again.');
  
    let servers: Server = await res.json();
  
    return new NextResponse(JSON.stringify([servers]), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}