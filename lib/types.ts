interface Server {
    listen: string[];
    routes: Route[];
}

interface Upstream {
    dial: string;
}

interface Handle {
    handler: string;
    upstreams?: Upstream[];
    routes?: Route[];
}

interface Match {
    host: string[];
}

interface Route {
    handle: Handle[];
    match?: Match[];
    terminal?: boolean;
}


interface UpstreamRequest {
    address: string;
    num_requests: number;
    fails: number;
}

interface Provider {
    api_token?: string;
    name: string;
}

interface DNS {
    provider: Provider;
}

interface Challenges {
    dns: DNS;
    email: string;
    module: string;
}

interface Issuer {
    challenges: Challenges;
    email: string;
    module: string;
}

interface Policies {
    subjects: string[];
    issuers: Issuer[];
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
    tls?: {
        automation: {
            policies: Policies[];
        };
    };
}

interface Admin {
    listen: string;

}

interface Logging {
    logs: {
        default: {
            level: string;
        };
    };
}

type CaddyConfig = {
    admin?: Admin;
    apps: Apps;
    logging?: Logging;
};