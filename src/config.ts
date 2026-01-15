const config: Config = {
	title: "Speedrun",
	domain: "sr.iswenzz.com",
	url: "https://sr.iswenzz.com",
	theme: "dark",
	description:
		"The official CoD4 multiplayer speedrun mod. A complete speedrunning server experience including leaderboards, anti-cheats, character customization, with over 12,000 unique players and over 100,000 unique records set on the leaderboards.",
	keywords: [
		"Iswenzz",
		"SR Speedrun",
		"SR Deathrun",
		"SR BattleRoyale",
		"IW3SR",
		"CoD4 Speedrun",
		"CoD4 Deathrun",
		"CoD4 BattleRoyale"
	]
};

type Config = {
	title: string;
	domain: string;
	url: string;
	theme: string;
	description: string;
	keywords: string[];
};

export default config;
