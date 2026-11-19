import { Leaderboard } from "@/generated/prisma/client";

export type GameServer = {
	name: string;
	hostname: string;
	online: boolean;
	connect: string;
	map: string;
	maxplayers: string;
	players: Player[];
};

export type Player = {
	name?: string;
	ping?: number;
};

export type PlayerEntry = Leaderboard & { epic?: boolean };

export type PlayerEntries = {
	entries: PlayerEntry[];
	name?: string;
	pbs: number;
	wrs: number;
	epics: number;
};
