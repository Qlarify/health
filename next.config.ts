import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old /services/[slug] → new top-level service pages
      { source: "/services/youtube-for-hospitals",  destination: "/video",  permanent: true },
      { source: "/services/seo-for-hospitals",       destination: "/seo",    permanent: true },
      { source: "/services/performance-marketing",   destination: "/paid",   permanent: true },
      { source: "/services/social-media-marketing",  destination: "/social", permanent: true },
      { source: "/services/content-marketing",       destination: "/video",  permanent: true },
      { source: "/services/email-and-whatsapp",      destination: "/email",  permanent: true },
      // OPD growth retired as a service offering; preserve link equity by routing to /services
      { source: "/opd",                              destination: "/services", permanent: true },
      // /services index now serves its own hub page — no redirect needed
    ];
  },
};

export default nextConfig;
