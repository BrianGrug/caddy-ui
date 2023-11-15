interface Server {
    listen: string[];
    routes: Route[];
}

interface Route {
    match: Match[];
    handle: Handle[];
}

interface Match {
    host: string[];
}

interface Handle {
    handler: string;
    upstreams?: Upstream[];
    routes?: Route[];
}

interface Upstream {
    dial: string;
}

interface UpstreamRequest {
    address: string;
    num_requests: number;
    fails: number;
}

interface Provider {
    api_token: string;
    name: string;
}

interface DNS {
    provider: Provider;
}

interface Challenges {
    dns: DNS;
}

interface Issuer {
    challenges: Challenges;
    email: string;
    module: string;
}

interface Policies {
    subjects: string[];
    issuer: Issuer;
}

interface Server {
    listen: string[];
    routes: Route[];
}

interface Apps {
    http: {
        servers: {
            [key: string]: Server;
        };
    };
    tls: {
        automation: {
            policies: Policies[];
        };
    };
}

type CaddyConfig = {
    apps: Apps;
};