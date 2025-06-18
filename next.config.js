/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use the custom server instead of Next.js built-in server
  // This is needed for WebSocket support
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent errors
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      };
    }
    return config;
  },
  // Disable React StrictMode for now to prevent double-rendering in development
  reactStrictMode: false,
  // Enable experimental features if needed
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Add custom headers for WebSocket upgrade
  async headers() {
    return [
      {
        source: "/api/socket/io",
        headers: [
          { key: "Connection", value: "Upgrade" },
          { key: "Upgrade", value: "websocket" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
