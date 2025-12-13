import "server-only";

import { Leaderboard } from "@prisma/client";
import { Filter } from "bad-words";

import connectPrisma from "@/libs/prisma";

const filter = new Filter();

export const getLeaderboard = async (
	map = "mp_dr_lolz",
	mode = "190",
	way = "normal_0"
): Promise<Leaderboard[]> => {
	try {
		const prisma = await connectPrisma();
		const modes = new Set();
		const ways = new Set();
		const entries = await prisma.leaderboard.findMany({
			where: { map, mode, way, tas: 0 },
			orderBy: { time: "asc" },
			take: 30
		});
		entries.forEach(entry => modes.add(entry.mode));
		entries.forEach(entry => ways.add(entry.way));
		return entries.map(entry => ({ ...entry, name: filter.clean(entry.name) }));
	} catch (e) {
		console.error(e);
		return [];
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
			orderBy: { map: "asc" },
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
			orderBy: { map: "asc" },
			select: { way: true }
		});
		return entries.map(entry => entry.way);
	} catch (e) {
		console.error(e);
		return [];
	}
};
