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
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
};

module.exports = nextConfig;
