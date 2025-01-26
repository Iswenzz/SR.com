const config: Config = {
	title: "Speedrun",
	domain: "sr.iswenzz.com",
	url: "https://sr.iswenzz.com",
	theme: "dark",
	description: "The official CoD4 multiplayer SR speedrun website.",
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
