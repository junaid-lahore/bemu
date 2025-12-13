/** @type {import('next').NextConfig} */

// Helper functions to parse extensions (from vite.config.ts)
const listExtensions = () => {
  if (process.env.DATABUTTON_EXTENSIONS) {
    try {
      return JSON.parse(process.env.DATABUTTON_EXTENSIONS);
    } catch (err) {
      console.error("Error parsing DATABUTTON_EXTENSIONS", err);
      return [];
    }
  }
  return [];
};

const getExtensionConfig = (name) => {
  const extensions = listExtensions();
  const extension = extensions.find((it) => it.name === name);
  if (!extension) {
    // Return empty object as default - this is valid and expected behavior
    // No warning needed as extensions are optional
    return {};
  }
  // Return the raw config object
  return extension.config || {};
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Allow cross-origin requests in development
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },

  // Webpack configuration for custom aliases and define constants
  webpack: (config, { isServer, webpack }) => {
    // Handle non-node modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Compute extension configs at webpack build time (only for Firebase if needed)
    const firebaseConfig = getExtensionConfig('firebase-auth');

    // Define constants for the application (replacing Vite's define)
    // Note: Stack Auth config is now read from environment variables in the code
    config.plugins.push(
      new webpack.DefinePlugin({
        __APP_ID__: JSON.stringify(process.env.DATABUTTON_PROJECT_ID || ''),
        __API_PATH__: JSON.stringify(''),
        __API_HOST__: JSON.stringify(''),
        __API_PREFIX_PATH__: JSON.stringify(''),
        __API_URL__: JSON.stringify(process.env.API_URL || 'http://localhost:8000'),
        __WS_API_URL__: JSON.stringify(process.env.WS_API_URL || 'ws://localhost:8000'),
        __APP_BASE_PATH__: JSON.stringify('/'),
        __APP_TITLE__: JSON.stringify(process.env.APP_TITLE || 'Beamu World'),
        __APP_FAVICON_LIGHT__: JSON.stringify('/favicon-light.svg'),
        __APP_FAVICON_DARK__: JSON.stringify('/favicon-dark.svg'),
        __APP_DEPLOY_USERNAME__: JSON.stringify(''),
        __APP_DEPLOY_APPNAME__: JSON.stringify(''),
        __APP_DEPLOY_CUSTOM_DOMAIN__: JSON.stringify(''),
        __FIREBASE_CONFIG__: JSON.stringify(firebaseConfig),
      })
    );

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


