import "server-only";

import { GameDig } from "gamedig";

import { GameServer } from "@/schemas";

const SERVERS = [
	{ name: "SR Speedrun", type: "cod4mw", host: "sr-speedrun.com", port: 28960 },
	{ name: "SR Deathrun", type: "cod4mw", host: "sr-speedrun.com", port: 28962 },
	{ name: "SR BattleRoyale", type: "cod4mw", host: "sr-speedrun.com", port: 28964 }
];

const parseServer = async (
	name: string,
	type: string,
	host: string,
	port: number
): Promise<GameServer> => {
	try {
		const {
			name: hostname,
			connect,
			map,
			maxplayers,
			players = []
		} = await GameDig.query({ type, host, port, attemptTimeout: 3000 });

		return {
			name,
			hostname,
			online: true,
			connect,
			map,
			maxplayers: `${maxplayers}`,
			players: players.map(({ name = "", ping }) => ({ name, ping }))
		};
	} catch (e) {
		console.error(e);
		return {
			name,
			hostname: name,
			online: false,
			connect: `${host}:${port}`,
			map: "Unknown",
			maxplayers: "24",
			players: []
		};
	}
};

export const getServers = async (): Promise<GameServer[]> =>
	Promise.all(SERVERS.map(({ name, type, host, port }) => parseServer(name, type, host, port)));
