import { SITE_DOMAIN } from "@/lib/config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_DOMAIN}/sitemap.xml`,
  };
}


