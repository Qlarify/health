import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/videoproduction",
        destination: "https://qlarify-videoproduction.vercel.app/videoproduction",
      },
      {
        source: "/videoproduction/:path*",
        destination: "https://qlarify-videoproduction.vercel.app/videoproduction/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // ── /services/[slug] → top-level service pages ─────────────────────────
      { source: "/services/youtube-for-hospitals",  destination: "/video",  permanent: true },
      { source: "/services/seo-for-hospitals",       destination: "/seo",    permanent: true },
      { source: "/services/performance-marketing",   destination: "/paid",   permanent: true },
      { source: "/services/social-media-marketing",  destination: "/social", permanent: true },
      { source: "/services/content-marketing",       destination: "/video",  permanent: true },
      { source: "/services/email-and-whatsapp",      destination: "/email",  permanent: true },

      // ── Retired standalone routes ───────────────────────────────────────────
      // OPD growth retired as a service offering
      { source: "/opd",       destination: "/services", permanent: true },
      // /campaigns was a planned page; route to services until built
      { source: "/campaigns", destination: "/services", permanent: true },
      // /audit was the free YouTube audit CTA; anchor lives on homepage
      { source: "/audit",     destination: "/#audit",   permanent: true },

      // ── /blog index → /insights ────────────────────────────────────────────
      { source: "/blog", destination: "/insights", permanent: true },

      // ── /blog/[slug] → correct /insights/[slug] (301 — preserve link equity)
      // Exact slug matches
      { source: "/blog/whatsapp-marketing-for-hospitals-india",       destination: "/insights/whatsapp-marketing-for-hospitals-india",       permanent: true },
      { source: "/blog/google-ads-for-hospitals-india",               destination: "/insights/google-ads-for-hospitals-india",               permanent: true },
      { source: "/blog/local-seo-for-hospitals-india",                destination: "/insights/local-seo-for-hospitals-india",                permanent: true },
      { source: "/blog/doctor-youtube-channel-how-to-start-grow-india", destination: "/insights/doctor-youtube-channel-how-to-start-grow-india", permanent: true },
      { source: "/blog/hospital-marketing-budget-allocation-india-2026", destination: "/insights/hospital-marketing-budget-allocation-india-2026", permanent: true },
      // Mapped to closest-intent post
      { source: "/blog/what-is-hospital-marketing",                   destination: "/insights/healthcare-marketing-india-2026-playbook",     permanent: true },
      { source: "/blog/increase-opd-footfall",                        destination: "/insights/how-to-get-more-patients-india",               permanent: true },
      { source: "/blog/video-marketing-hospitals",                    destination: "/insights/video-marketing-hospitals-complete-guide",     permanent: true },
      { source: "/blog/hospital-video-production-india",              destination: "/insights/video-marketing-hospitals-complete-guide",     permanent: true },
      { source: "/blog/hospital-video-marketing-increase-appointments", destination: "/insights/video-marketing-hospitals-complete-guide",   permanent: true },
      { source: "/blog/why-hospital-videos-dont-convert",             destination: "/insights/youtube-brochure-fix",                        permanent: true },
      { source: "/blog/hospital-seo-guide",                           destination: "/insights/hospital-seo-india-zero-to-dominance",        permanent: true },
      { source: "/blog/hospital-content-marketing-strategy",          destination: "/insights/hospital-content-marketing-strategy-patient-intent", permanent: true },
      { source: "/blog/patient-decision-support-videos",              destination: "/insights/hospital-content-marketing-strategy-patient-intent", permanent: true },
      { source: "/blog/healthcare-vs-general-agency",                 destination: "/insights/what-to-look-for-in-a-hospital-marketing-agency", permanent: true },
      { source: "/blog/qlarify-health-vs-generic-agencies",          destination: "/insights/what-to-look-for-in-a-hospital-marketing-agency", permanent: true },
      { source: "/blog/in-house-vs-healthcare-agency",               destination: "/insights/what-to-look-for-in-a-hospital-marketing-agency", permanent: true },
      // No matching insight post — route to the service page
      { source: "/blog/social-media-strategy-hospitals",             destination: "/social",                                               permanent: true },
      // Catch-all for any other /blog/* not listed above
      { source: "/blog/:slug*", destination: "/insights", permanent: true },
    ];
  },
};

export default nextConfig;
