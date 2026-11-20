import "server-only";

import { cache } from "react";

import { Leaderboard, Player, Prisma } from "@/generated/prisma/client";
import { bestTimes } from "@/libs/leaderboards";
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
			// The player's own runs first, each checked against its board's best through the board index;
			// a window over every board would rank the whole table for one player.
			prisma.$queryRaw<(Leaderboard & { epic: number | bigint })[]>`
				SELECT l.map, l.player, p.name, l.mode, l.way, l.time, l.run, l.date,
					e.id IS NOT NULL AS epic
				FROM leaderboards l
				JOIN players p ON p.player = l.player
				LEFT JOIN epics e ON e.map = l.map AND e.mode = l.mode AND e.way = l.way
				WHERE l.player = ${player}
				AND l.tas = 0
				AND l.mode IN (${Prisma.join(MODES)})
				AND l.time = (
					SELECT MIN(m.time) FROM leaderboards m
					WHERE m.map = l.map AND m.mode = l.mode AND m.way = l.way AND m.tas = 0
				)
				ORDER BY l.map, l.mode, l.way;
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
				SELECT l.player,
					p.name AS name,
					COUNT(*) AS wrs,
					COUNT(e.id) AS epics
				FROM leaderboards l
				JOIN (${bestTimes}) w ON w.map = l.map AND w.mode = l.mode AND w.way = l.way AND w.time = l.time
				JOIN players p ON p.player = l.player
				LEFT JOIN epics e ON e.map = l.map AND e.mode = l.mode AND e.way = l.way
				WHERE l.tas = 0
				AND l.mode IN (${Prisma.join(MODES)})
				GROUP BY l.player, p.name;
			`;

		return rows
			.map(r => ({
				player: r.player,
				name: r.name,
				wrs: Number(r.wrs),
				epics: Number(r.epics)
			}))
			.sort((a, b) => b.epics - a.epics || b.wrs - a.wrs);
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
