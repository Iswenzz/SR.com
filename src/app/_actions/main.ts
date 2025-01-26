"use server";

import { GameDig } from "gamedig";

import { GameServer } from "@/schemas";

const parseServer = async (type: string, host: string, port: number): Promise<GameServer> => {
	const { name, connect, map, maxplayers, players } = await GameDig.query({ type, host, port });

	return {
		name,
		connect,
		map,
		maxplayers: `${maxplayers}`,
		players: players.map(({ name, ping }) => ({ name, ping }))
	};
};

export const queryServers = async (): Promise<GameServer[]> => {
	try {
		const servers = [];
		servers.push(await parseServer("cod4mw", "iswenzz.com", 28960));
		servers.push(await parseServer("cod4mw", "iswenzz.com", 28962));
		servers.push(await parseServer("cod4mw", "iswenzz.com", 28964));
		return servers;
	} catch (e) {
		console.error(e);
		return [];
	}
};
