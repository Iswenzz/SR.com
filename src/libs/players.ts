import "server-only";

import { cache } from "react";

import { Leaderboard, Player, Prisma } from "@/generated/prisma/client";
import connectPrisma from "@/libs/prisma";
import { MODES_MODDED, MODES_VANILLA } from "@/utils";

export const getPlayerEntries = cache(async (type = "pbs", player = "0") => {
	try {
		const prisma = await connectPrisma();
		const [pbs, pbsWrs, profile] = await Promise.all([
			prisma.pB.findMany({
				where: { player },
				orderBy: { map: "asc" },
				select: { name: true, map: true, mode: true, way: true, time: true, date: true }
			}),
			prisma.$queryRaw<Leaderboard[]>`
				SELECT b.map, b.player, p.name, b.mode, b.way, b.time, b.run, b.date
				FROM (
					SELECT player, map, mode, way, time, tas, run, date,
						MIN(time) OVER (PARTITION BY map, mode, way, tas) AS minTime
					FROM leaderboards
				) b
				JOIN players p ON p.player = b.player
				WHERE b.time = b.minTime
				AND b.player = ${player}
				AND b.tas = 0;
			`,
			prisma.player.findUnique({ where: { player }, select: { name: true } })
		]);
		const wrs = pbsWrs.filter(wr => MODES_VANILLA.includes(wr.mode));
		const wrms = pbsWrs.filter(wr => MODES_MODDED.includes(wr.mode));
		const entries = type === "wrs" ? wrs : type === "wrms" ? wrms : pbs;

		return {
			entries: entries as Leaderboard[],
			name: profile?.name || pbs[0]?.name,
			pbs: pbs.length,
			wrs: wrs.length,
			wrms: wrms.length
		};
	} catch (e) {
		console.error(e);
		return { entries: [], name: undefined, pbs: 0, wrs: 0, wrms: 0 };
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
			wrms: number;
		}[] = await prisma.$queryRaw`
				SELECT b.player,
					p.name AS name,
					SUM(CASE WHEN b.mode IN (${Prisma.join(MODES_VANILLA)}) THEN 1 ELSE 0 END) AS wrs,
					SUM(CASE WHEN b.mode IN (${Prisma.join(MODES_MODDED)}) THEN 1 ELSE 0 END) AS wrms
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

		return rows
			.map(r => ({
				player: r.player,
				name: r.name,
				wrs: Number(r.wrs),
				wrms: Number(r.wrms)
			}))
			.sort((a, b) => b.wrs - a.wrs || b.wrms - a.wrms);
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
