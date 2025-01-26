/** @type {import("next-sitemap").IConfig} */
export default {
	siteUrl: "https://sr.iswenzz.com",
	generateRobotsTxt: true,
	// https://nextjs.org/docs/app/api-reference/file-conventions/metadata
	exclude: ["/twitter-image.*", "/opengraph-image.*", "/icon.*"]
};
