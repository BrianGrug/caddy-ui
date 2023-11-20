import { updateRoute } from "@/lib/serverActions";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { route: number } }) {
  const slug = params.route;
  const res = await fetch(`http://192.168.1.69:2019/config/apps/http/servers/srv0/routes/${slug}`, { cache: 'no-store' });
  let route: Route = await res.json();

  if (!res.ok)
    throw new Error('Failed to fetch caddy config. Please check the network and try again.');

  return new NextResponse(JSON.stringify(route), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function PATCH(request: Request, { params }: { params: { route: number } }) {
  const slug = params.route;
  let route: Route = await request.json();

  const res = await fetch(`http://192.168.1.69:2019/config/apps/http/servers/srv0/routes/${slug}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    body: JSON.stringify(route)
  })

  if (!res.ok) return new NextResponse(JSON.stringify({ error: true }), {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return new NextResponse(JSON.stringify({ error: false }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function PUT(request: Request, { params }: { params: { route: number } }) {
  const slug = params.route;
  let route: Route = await request.json();

  const res = await fetch(`http://192.168.1.69:2019/config/apps/http/servers/srv0/routes/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    body: JSON.stringify(route)
  })

  if (!res.ok) return new NextResponse(JSON.stringify({ error: true, message: "Could not save route" }), {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return new NextResponse(JSON.stringify({ error: false }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}