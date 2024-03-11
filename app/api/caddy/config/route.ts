import { getConfig } from '@/lib/serverActions';
import { NextResponse } from 'next/server';

export async function GET() {
    let caddyConfig = await getConfig();

    return new NextResponse(JSON.stringify(caddyConfig), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    }); 
}