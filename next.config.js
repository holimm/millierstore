/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_BE_URL: process.env.MONGO_BE_URL,
  },
};

module.exports = nextConfig;
