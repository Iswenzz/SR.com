/** @type {import("next-sitemap").IConfig} */
export default {
	siteUrl: "https://sr-speedrun.com",
	generateRobotsTxt: true,
	// https://nextjs.org/docs/app/api-reference/file-conventions/metadata
	exclude: ["/twitter-image.*", "/opengraph-image.*", "/icon.*"]
};
