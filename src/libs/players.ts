import "server-only";

import { cache } from "react";

import { Leaderboard, Player, Prisma } from "@/generated/prisma/client";
import connectPrisma from "@/libs/prisma";
import { PlayerEntry } from "@/schemas";
import { MODES } from "@/utils";

export const getPlayerEntries = cache(async (type = "pbs", player = "0") => {
	try {
		const prisma = await connectPrisma();
		const [pbs, rows, profile] = await Promise.all([
			prisma.pB.findMany({
				where: { player },
				orderBy: { map: "asc" },
				select: { name: true, map: true, mode: true, way: true, time: true, date: true }
			}),
			prisma.$queryRaw<(Leaderboard & { epic: number | bigint })[]>`
				SELECT b.map, b.player, p.name, b.mode, b.way, b.time, b.run, b.date,
					e.id IS NOT NULL AS epic
				FROM (
					SELECT player, map, mode, way, time, tas, run, date,
						MIN(time) OVER (PARTITION BY map, mode, way, tas) AS minTime
					FROM leaderboards
				) b
				JOIN players p ON p.player = b.player
				LEFT JOIN epics e ON e.map = b.map AND e.mode = b.mode AND e.way = b.way
				WHERE b.time = b.minTime
				AND b.player = ${player}
				AND b.tas = 0
				AND b.mode IN (${Prisma.join(MODES)});
			`,
			prisma.player.findUnique({ where: { player }, select: { name: true } })
		]);
		const wrs: PlayerEntry[] = rows.map(wr => ({ ...wr, epic: Number(wr.epic) === 1 }));
		const epics = wrs.filter(wr => wr.epic);
		const entries = type === "wrs" ? wrs : type === "epics" ? epics : pbs;

		return {
			entries: entries as PlayerEntry[],
			name: profile?.name || pbs[0]?.name,
			pbs: pbs.length,
			wrs: wrs.length,
			epics: epics.length
		};
	} catch (e) {
		console.error(e);
		return { entries: [], name: undefined, pbs: 0, wrs: 0, epics: 0 };
	}
});

export const getPlayers = async (): Promise<Player[]> => {
	try {
		const prisma = await connectPrisma();
		const players = await prisma.player.findMany({
			orderBy: { name: "asc" },
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
		const [{ count }] = await prisma.$queryRaw<{ count: bigint }[]>`
			SELECT COUNT(DISTINCT player) AS count FROM pbs;
		`;
		return Number(count);
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
			epics: number;
		}[] = await prisma.$queryRaw`
				SELECT b.player,
					p.name AS name,
					COUNT(*) AS wrs,
					COUNT(e.id) AS epics
				FROM (
					SELECT player, map, mode, way, time, tas,
						MIN(time) OVER (PARTITION BY map, mode, way, tas) AS minTime
					FROM leaderboards
				) b
				JOIN players p ON p.player = b.player
				LEFT JOIN epics e ON e.map = b.map AND e.mode = b.mode AND e.way = b.way
				WHERE b.time = b.minTime
				AND b.tas = 0
				AND b.mode IN (${Prisma.join(MODES)})
				GROUP BY b.player, p.name;
			`;

		return rows
			.map(r => ({
				player: r.player,
				name: r.name,
				wrs: Number(r.wrs),
				epics: Number(r.epics)
			}))
			.sort((a, b) => b.wrs - a.wrs || b.epics - a.epics);
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getPBCount = async (): Promise<number> => {
	try {
		const prisma = await connectPrisma();
		return await prisma.pB.count();
	} catch (e) {
		console.error(e);
		return 0;
	}
};
