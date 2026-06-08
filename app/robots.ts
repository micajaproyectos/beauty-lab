import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login/", "/login", "/api/"],
    },
    sitemap: "https://www.clinicabeautylab.cl/sitemap.xml",
  };
}
