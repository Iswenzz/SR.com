import "server-only";

import { Leaderboard, Player } from "@prisma/client";

import connectPrisma from "@/libs/prisma";

export const getPlayerEntries = async (type = "pbs", player = "0") => {
	try {
		const prisma = await connectPrisma();
		const pbs = await prisma.pB.findMany({
			where: { player },
			orderBy: { map: "asc" },
			select: { name: true, map: true, mode: true, way: true, time: true }
		});
		const pbsWrs: Leaderboard[] = await prisma.$queryRaw`
			SELECT b.map, b.player, p.name, b.mode, b.way, b.time, b.run
			FROM (
				SELECT player, map, mode, way, time, tas, run,
					MIN(time) OVER (PARTITION BY map, mode, way, tas) AS minTime
				FROM leaderboards
			) b
			JOIN players p ON p.player = b.player
			WHERE b.time = b.minTime
			AND b.player = ${player}
			AND b.tas = 0;
		`;
		const [entry = {} as Leaderboard] = pbs;
		const wrs = pbsWrs.filter(wr => ["190", "210"].includes(wr.mode));
		const wrms = pbsWrs.filter(wr =>
			[
				"Q3",
				"Q3CPM",
				"Q3CPMW",
				"CS",
				"Portal",
				"LegacyBhop",
				"LegacyDefrag",
				"LegacyPortal"
			].includes(wr.mode)
		);
		const entries = type === "wrs" ? wrs : type === "wrms" ? wrms : pbs;

		return {
			entries: entries as Leaderboard[],
			name: entry.name,
			pbs: pbs.length,
			wrs: wrs.length,
			wrms: wrms.length
		};
	} catch (e) {
		console.error(e);
		return { entries: [], name: undefined, pbs: 0, wrs: 0, wrms: 0 };
	}
};

export const getPlayers = async (): Promise<Player[]> => {
	try {
		const prisma = await connectPrisma();
		const players = await prisma.player.findMany({
			distinct: "player",
			orderBy: { player: "asc" },
			select: { name: true, player: true, role: true, date: true }
		});
		return players as Player[];
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getPlayersCount = async (): Promise<number> => {
	try {
		const prisma = await connectPrisma();
		const players = await prisma.pB.findMany({
			distinct: "player",
			orderBy: { player: "asc" },
			select: { player: true }
		});
		return players.length;
	} catch (e) {
		console.error(e);
		return 0;
	}
};

export const getTopPlayers = async () => {
	try {
		const prisma = await connectPrisma();
		const rows: {
			player: string;
			name: string;
			wrs: number;
			wrms: number;
		}[] = await prisma.$queryRaw`
				SELECT b.player,
					p.name AS name,
					SUM(CASE WHEN b.mode IN ('190', '210') THEN 1 ELSE 0 END) AS wrs,
					SUM(CASE WHEN b.mode IN ('Q3', 'Q3CPM', 'Q3CPMW', 'CS', 'Portal') THEN 1 ELSE 0 END) AS wrms
				FROM (
					SELECT player, map, mode, way, time, tas,
						MIN(time) OVER (PARTITION BY map, mode, way, tas) AS minTime
					FROM leaderboards
				) b
				JOIN players p ON p.player = b.player
				WHERE b.time = b.minTime
				AND b.tas = 0
				GROUP BY b.player, p.name
				HAVING wrs > 0 OR wrms > 0;
			`;

		return rows.map(r => ({
			player: r.player,
			name: r.name,
			wrs: Number(r.wrs),
			wrms: Number(r.wrms)
		}));
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getPBCount = async (): Promise<number> => {
	try {
		const prisma = await connectPrisma();
		return prisma.pB.count();
	} catch (e) {
		console.error(e);
		return 0;
	}
};
