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

export default nextConfig;

