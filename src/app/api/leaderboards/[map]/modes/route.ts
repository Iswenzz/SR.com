import { NextRequest, NextResponse } from "next/server";

import connectPrisma from "@/libs/prisma";

export const GET = async (request: NextRequest, { params }: Props) => {
	const { map = "mp_dr_lolz" } = await params;

	const prisma = await connectPrisma();
	const entries = await prisma.leaderboard.findMany({
		distinct: "mode",
		where: { map },
		orderBy: { map: "asc" },
		select: { mode: true }
	});
	const modes = entries.map(entry => entry.mode);
	return NextResponse.json(modes);
};

type Props = {
	params: Promise<{ map: string }>;
};
