/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["a0.muscache.com"],
  },
  webpack5: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;
