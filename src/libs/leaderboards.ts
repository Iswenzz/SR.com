import "server-only";

import { Leaderboard } from "@/generated/prisma/client";
import connectPrisma from "@/libs/prisma";
import { PlayerEntry } from "@/schemas";

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
			FROM (
				SELECT map, player, name, mode, way, time, date, tas,
					MIN(time) OVER (PARTITION BY map, mode, way, tas) AS minTime
			 	FROM leaderboards
			) l
			LEFT JOIN epics e ON e.map = l.map AND e.mode = l.mode AND e.way = l.way
			WHERE l.time = l.minTime
			AND l.tas = 0
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
		const prisma = await connectPrisma();
		const entries = await prisma.leaderboard.findMany({
			distinct: "map",
			orderBy: { map: "asc" },
			select: { map: true }
		});
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
