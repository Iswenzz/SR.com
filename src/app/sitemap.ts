import type { MetadataRoute } from "next";

import config from "@/config";
import { getMaps } from "@/libs/leaderboards";
import { getTopPlayers } from "@/libs/players";

import members from "./members/members.json";

export const revalidate = 86400;

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const [maps, topPlayers] = await Promise.all([getMaps(), getTopPlayers()]);
	const players = new Set([...Object.values(members), ...topPlayers.map(p => p.player)]);

	const pages = ["", "/leaderboards", "/players", "/members", "/servers", "/play"].map(path => ({
		url: `${config.url}${path}`,
		changeFrequency: "daily" as const,
		priority: path ? 0.8 : 1
	}));
	const mapPages = maps.map(map => ({
		url: `${config.url}/leaderboards/${encodeURIComponent(map)}`,
		changeFrequency: "daily" as const,
		priority: 0.6
	}));
	const playerPages = [...players].map(player => ({
		url: `${config.url}/players/${encodeURIComponent(player)}`,
		changeFrequency: "weekly" as const,
		priority: 0.4
	}));
	return [...pages, ...mapPages, ...playerPages];
};

export default sitemap;
