/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        // pathname: "/:path/:widthx:height",
      },
    ],
  },
};

module.exports = nextConfig;
