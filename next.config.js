/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isProd ? '/fndbsdgbc.github.io' : '',
  assetPrefix: isProd ? '/fndbsdgbc.github.io' : '',
};

module.exports = nextConfig;

