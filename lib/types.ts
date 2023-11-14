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
}

interface Handle {
    handler: string;
    routes?: Route[];
}

interface Upstream {
    dial: string;
}

interface Provider {
    api_token: string;
    name: string;
}

interface Policies {
    subjects: string[];
    issuer: Issuer;
}

interface Issuer {
    challenges: Challenges;
    email: string;
    module: string;
}

interface Challenges {
    dns: DNS;
}

interface DNS {
    provider: Provider;
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