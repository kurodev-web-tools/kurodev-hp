/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/tools", destination: "/#tools", permanent: false },
      { source: "/creator-site", destination: "/#creator-websites", permanent: false },
      { source: "/works", destination: "/#work", permanent: false },
      { source: "/guide", destination: "/#guide", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/en/tools", destination: "/en#tools", permanent: false },
      { source: "/en/creator-site", destination: "/en#creator-websites", permanent: false },
      { source: "/en/works", destination: "/en#work", permanent: false },
      { source: "/en/guide", destination: "/en#guide", permanent: false },
      { source: "/en/about", destination: "/en#about", permanent: false },
      { source: "/en/contact", destination: "/contact", permanent: false }
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
