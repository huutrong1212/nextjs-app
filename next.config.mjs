/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lms-cdn.banvien.com.vn',
        port: '',
      },
    ],
  },
  publicRuntimeConfig: {
    NEXT_APP_API: process.env.NEXT_APP_API,
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
  },
  env: {
    NEXT_APP_API: process.env.NEXT_APP_API,
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
  },
};

export default nextConfig;
