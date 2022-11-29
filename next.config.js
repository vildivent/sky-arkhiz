/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "images.unsplash.com", "api.skyarhyz.ru"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
