import { getServer } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const res = await fetch(`http://192.168.1.69:2019/config/apps/http/servers/`, { cache: 'no-store' });

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