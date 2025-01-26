"use server";

import { Leaderboard } from "@prisma/client";

import connectPrisma from "@/libs/prisma";

export const getLeaderboard = async (
	map = "mp_dr_lolz",
	mode = "190",
	way = "normal_0"
): Promise<Leaderboard[]> => {
	try {
		const prisma = await connectPrisma();
		return prisma.leaderboard.findMany({
			where: { map, mode, way },
			orderBy: { time: "asc" },
			take: 30
		});
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getMaps = async () => {
	try {
		const prisma = await connectPrisma();
		const entries = await prisma.leaderboard.findMany({
			distinct: "map",
			select: { map: true }
		});
		return entries.map(entry => entry.map);
	} catch (e) {
		console.error(e);
		return [];
	}
};
