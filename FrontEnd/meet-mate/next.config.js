/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        destination: 'https://naveropenapi.apigw.ntruss.com/:path*',
        source: '/example/:path*',
      },
    ];
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
