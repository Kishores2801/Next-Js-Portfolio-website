import React from 'react';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "api.microlink.io",
        'images.unsplash.com',
        'assets.aceternity.com'
      ],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
        },
      ],
    },

    eslint: {
      ignoreDuringBuilds: true,
  },

  

    reactStrictMode: true,
    experimental : {
      taint: true,
    }
};


export default nextConfig;
