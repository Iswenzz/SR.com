import "server-only";

import { Leaderboard, Prisma } from "@/generated/prisma/client";
import connectPrisma from "@/libs/prisma";
import { PlayerEntry } from "@/schemas";

// Every board's best time, which the board index answers a board at a time; join it back on the time.
export const bestTimes = Prisma.sql`
	SELECT map, mode, way, MIN(time) AS time
	FROM leaderboards
	WHERE tas = 0
	GROUP BY map, mode, way
`;

export const getLeaderboard = async (
	map = "mp_dr_lolz",
	mode = "190",
	way = "normal_0"
): Promise<Leaderboard[]> => {
	try {
		const prisma = await connectPrisma();
		return await prisma.leaderboard.findMany({
			where: { map, mode, way, tas: 0 },
			orderBy: { time: "asc" }
		});
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getRecentWorldRecords = async (): Promise<PlayerEntry[]> => {
	try {
		const prisma = await connectPrisma();
		const entries: (Leaderboard & { epic: number | bigint })[] = await prisma.$queryRaw`
			SELECT l.map, l.player, l.name, l.mode, l.way, l.time, l.date,
				e.id IS NOT NULL AS epic
			FROM leaderboards l
			JOIN (${bestTimes}) w ON w.map = l.map AND w.mode = l.mode AND w.way = l.way AND w.time = l.time
			LEFT JOIN epics e ON e.map = l.map AND e.mode = l.mode AND e.way = l.way
			WHERE l.tas = 0
			ORDER BY l.date DESC
			LIMIT 10;
		`;
		return entries.map(entry => ({ ...entry, epic: Number(entry.epic) === 1 }));
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const isEpic = async (map = "mp_dr_lolz", mode = "190", way = "normal_0") => {
	try {
		const prisma = await connectPrisma();
		return (await prisma.epic.count({ where: { map, mode, way } })) > 0;
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const getMaps = async (): Promise<string[]> => {
	try {
		// Prisma's distinct dedupes in memory, after reading the map of every row in the table.
		const prisma = await connectPrisma();
		const entries = await prisma.$queryRaw<{ map: string }[]>`
			SELECT DISTINCT map FROM leaderboards ORDER BY map;
		`;
		return entries.map(entry => entry.map);
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getModes = async (map = "mp_dr_lolz"): Promise<string[]> => {
	try {
		const prisma = await connectPrisma();
		const entries = await prisma.leaderboard.findMany({
			distinct: "mode",
			where: { map },
			orderBy: { mode: "asc" },
			select: { mode: true }
		});
		return entries.map(entry => entry.mode);
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getWays = async (map = "mp_dr_lolz"): Promise<string[]> => {
	try {
		const prisma = await connectPrisma();
		const entries = await prisma.leaderboard.findMany({
			distinct: "way",
			where: { map },
			orderBy: { way: "asc" },
			select: { way: true }
		});
		return entries.map(entry => entry.way);
	} catch (e) {
		console.error(e);
		return [];
	}
};
