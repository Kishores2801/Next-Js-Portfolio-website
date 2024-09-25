/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
          },
        ],
      },
    experimental: {
        appDir: true,
        taint: true,
    },
};

export default nextConfig;
