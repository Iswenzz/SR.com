import type { MetadataRoute } from "next";

import config from "@/config";

const robots = (): MetadataRoute.Robots => ({
	rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/media/"] },
	sitemap: `${config.url}/sitemap.xml`,
	host: config.url
});

export default robots;
