import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async rewrites() {
        // Only proxy for local development. 
        // On Vercel, Python files in /api are automatically mounted by the runtime.
        if (process.env.NODE_ENV === 'production') {
            return [];
        }

        return [
            {
                // Proxy all /api/* requests to Python backend on port 8000
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8000/api/:path*',
            },
        ];
    },
};

export default nextConfig;
