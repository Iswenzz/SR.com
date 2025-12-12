import { NextRequest, NextResponse } from "next/server";
import { Filter } from "bad-words";

import connectPrisma from "@/libs/prisma";

const filter = new Filter();

export const GET = async (request: NextRequest, { params }: Props) => {
	const { map = "mp_dr_lolz" } = await params;
	const searchParams = request.nextUrl.searchParams;
	const mode = searchParams.get("mode") || "190";
	const way = searchParams.get("way") || "normal_0";

	const prisma = await connectPrisma();
	const entries = await prisma.leaderboard.findMany({
		where: { map, mode, way, tas: 0 },
		orderBy: { time: "asc" },
		take: 30
	});
	const cleanedEntries = entries.map(entry => ({
		...entry,
		name: filter.clean(entry.name)
	}));
	return NextResponse.json(cleanedEntries);
};

type Props = {
	params: Promise<{
		map: string;
	}>;
};
