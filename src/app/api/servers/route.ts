import { NextResponse } from "next/server";
import { GameDig } from "gamedig";
import { Filter } from "bad-words";

import { GameServer } from "@/schemas";

const filter = new Filter();

const parseServer = async (
	name: string,
	type: string,
	host: string,
	port: number
): Promise<GameServer> => {
	try {
		const {
			name,
			connect,
			map,
			maxplayers,
			players = []
		} = await GameDig.query({ type, host, port });

		return {
			name,
			connect,
			map,
			maxplayers: `${maxplayers}`,
			players: players.map(({ name = "", ping }) => ({ name: filter.clean(name), ping }))
		};
	} catch (e) {
		console.error(e);
		return { name, connect: "Unknown", map: "Unknown", maxplayers: "24", players: [] };
	}
};

export const GET = async () => {
	const servers: GameServer[] = [];
	servers.push(await parseServer("SR Speedrun", "cod4mw", "iswenzz.com", 28960));
	servers.push(await parseServer("SR Deathrun", "cod4mw", "iswenzz.com", 28962));
	servers.push(await parseServer("SR BattleRoyale", "cod4mw", "iswenzz.com", 28964));
	return NextResponse.json(servers);
};
