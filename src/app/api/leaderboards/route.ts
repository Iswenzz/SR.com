import { NextResponse } from "next/server";

import connectPrisma from "@/libs/prisma";

export const GET = async () => {
	const prisma = await connectPrisma();
	const entries = await prisma.leaderboard.findMany({
		distinct: "map",
		orderBy: { map: "asc" },
		select: { map: true }
	});
	const maps = entries.map(entry => entry.map);
	return NextResponse.json(maps);
};
