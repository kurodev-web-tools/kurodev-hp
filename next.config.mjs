/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  htmlLimitedBots: /.*/,
  images: {
    unoptimized: true
  },
  experimental: {
    inlineCss: true
  },
  async redirects() {
    return [
      { source: "/tool", destination: "/tools", permanent: true },
      { source: "/web", destination: "/works", permanent: true },
      { source: "/profile", destination: "/about", permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=15552000"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
