import { NextRequest, NextResponse } from "next/server";

import connectPrisma from "@/libs/prisma";

export const GET = async (request: NextRequest, { params }: Props) => {
	const { map = "mp_dr_lolz" } = await params;

	const prisma = await connectPrisma();
	const entries = await prisma.leaderboard.findMany({
		distinct: "way",
		where: { map },
		orderBy: { map: "asc" },
		select: { way: true }
	});
	const ways = entries.map(entry => entry.way);
	return NextResponse.json(ways);
};

type Props = {
	params: Promise<{ map: string }>;
};
