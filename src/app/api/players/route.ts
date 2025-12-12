import { NextResponse } from "next/server";

import connectPrisma from "@/libs/prisma";

export const GET = async () => {
	const prisma = await connectPrisma();
	const entries = await prisma.pB.findMany({
		distinct: "player",
		orderBy: { player: "asc" },
		select: { player: true }
	});
	const players = entries.map(entry => entry.player);
	return NextResponse.json(players);
};
