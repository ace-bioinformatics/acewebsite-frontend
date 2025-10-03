/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude .d.ts files from being processed
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: 'ignore-loader',
    });

    // Alternative: exclude esbuild's TypeScript files
    config.resolve.alias = {
      ...config.resolve.alias,
      // Prevent esbuild from being bundled on the client side
      ...(isServer ? {} : { esbuild: false }),
    };

    return config;
  },
  compiler: {
    styledComponents: true, // Enable styled-components SWC transform
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;