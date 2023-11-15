// Import the NextJS API route handler
import { getConfig } from '@/lib/utils';
import { NextResponse } from 'next/server';

// Define the route handler function
export async function GET() {
    let caddyConfig = await getConfig();

    return new NextResponse(JSON.stringify(caddyConfig), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    }); 
}