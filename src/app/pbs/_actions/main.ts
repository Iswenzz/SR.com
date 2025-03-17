"use server";

import { Leaderboard } from "@prisma/client";

import connectPrisma from "@/libs/prisma";

export const getEntries = async (type = "pbs", player = "0") => {
	try {
		const prisma = await connectPrisma();
		const pbs = await prisma.pB.findMany({
			where: { player },
			orderBy: { map: "asc" },
			select: { name: true, map: true, mode: true, way: true, time: true }
		});
		const pbsWrs: Leaderboard[] = await prisma.$queryRaw`
			SELECT map, player, mode, way, time, run
			FROM (
				SELECT player, map, mode, way, time, tas, run,
				MIN(time) OVER (PARTITION BY map, mode, way, tas) AS minTime
				FROM leaderboards
			) b
			WHERE time = minTime
			AND player = ${player}
			AND tas = 0;
		`;
		const [entry = {} as Leaderboard] = pbs;
		const wrs = pbsWrs.filter(wr => wr.mode === "190" || wr.mode === "210");
		const wrsModded = pbsWrs.filter(
			wr => wr.mode === "Defrag" || wr.mode === "Portal" || wr.mode === "Bhop"
		);
		const entries = type === "wrs" ? wrs : type === "wrsModded" ? wrsModded : pbs;

		return {
			entries: entries as Leaderboard[],
			name: entry.name,
			pbs: pbs.length,
			wrs: wrs.length,
			wrsModded: wrsModded.length
		};
	} catch (e) {
		console.error(e);
		return { entries: [], name: undefined, pbs: 0, wrs: 0, wrsModded: 0 };
	}
};

export const getPlayers = async (): Promise<string[]> => {
	try {
		const prisma = await connectPrisma();
		const entries = await prisma.pB.findMany({
			distinct: "player",
			orderBy: { player: "asc" },
			select: { player: true }
		});
		return entries.map(entry => entry.player);
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getCount = async (): Promise<number> => {
	try {
		const prisma = await connectPrisma();
		return prisma.pB.count();
	} catch (e) {
		console.error(e);
		return 0;
	}
};
