/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },

  // Webpack configuration for custom aliases
  webpack: (config, { isServer }) => {
    // Handle non-node modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Environment variables
  env: {
    __APP_ID__: process.env.DATABUTTON_PROJECT_ID || '',
    __API_PATH__: '',
    __API_HOST__: '',
    __API_PREFIX_PATH__: '',
    __API_URL__: process.env.API_URL || 'http://localhost:8000',
    __WS_API_URL__: process.env.WS_API_URL || 'ws://localhost:8000',
    __APP_BASE_PATH__: '/',
    __APP_TITLE__: process.env.APP_TITLE || 'Databutton',
    __APP_FAVICON_LIGHT__: '/favicon-light.svg',
    __APP_FAVICON_DARK__: '/favicon-dark.svg',
    __APP_DEPLOY_USERNAME__: '',
    __APP_DEPLOY_APPNAME__: '',
    __APP_DEPLOY_CUSTOM_DOMAIN__: '',
  },

  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'cdn.coverr.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Transpile packages if needed
  transpilePackages: [],
};

module.exports = nextConfig;
