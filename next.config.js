/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      "@react-pdf/renderer",
      "@react-email/components",
      "@react-email/render",
      "@react-email/tailwind",
      "resend",
    ],
  },
};

module.exports = nextConfig;
