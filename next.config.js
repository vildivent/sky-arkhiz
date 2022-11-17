/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.sao.ru"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
