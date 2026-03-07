import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                // Proxy all /api/* requests to Python backend.
                // Next.js will prioritize existing files (like /api/market-prices) first.
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8000/api/:path*',
            },
        ];
    },
};

export default nextConfig;
