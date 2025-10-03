/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/acewebsite-frontend',
  assetPrefix: '/acewebsite-frontend',
  
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: 'ignore-loader',
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      ...(isServer ? {} : { esbuild: false }),
    };

    return config;
  },
  
  compiler: {
    styledComponents: true,
  },
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;