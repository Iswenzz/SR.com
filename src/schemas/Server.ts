import { Leaderboard } from "@prisma/client";

export type GameServer = {
	name: string;
	connect: string;
	map: string;
	maxplayers: string;
	players: Player[];
};

export type Player = {
	name?: string;
	ping?: number;
};

export type PlayerEntries = {
	entries: Leaderboard[];
	name?: string;
	pbs: number;
	wrs: number;
	wrsModded: number;
};
