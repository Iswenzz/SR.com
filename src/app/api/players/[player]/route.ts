import { NextRequest, NextResponse } from "next/server";
import { Leaderboard } from "@prisma/client";

import connectPrisma from "@/libs/prisma";
import { PlayerEntries } from "@/schemas";

export const GET = async (request: NextRequest, { params }: Props) => {
	const { player } = await params;
	const searchParams = request.nextUrl.searchParams;
	const type = searchParams.get("type") || "pbs";

	const prisma = await connectPrisma();
	const pbs = await prisma.pB.findMany({
		where: { player },
		orderBy: { map: "asc" },
		select: { name: true, map: true, mode: true, way: true, time: true }
	});
	const pbsWrs: Leaderboard[] = await prisma.$queryRaw`
		SELECT map, player, mode, way, time, run
		FROM (
			SELECT player, map, mode, way, time, tas, run,
			MIN(time) OVER (PARTITION BY map, mode, way, tas) AS minTime
			FROM leaderboards
		) b
		WHERE time = minTime
		AND player = ${player}
		AND tas = 0;
	`;
	const [entry = {} as Leaderboard] = pbs;
	const wrs = pbsWrs.filter(wr => wr.mode === "190" || wr.mode === "210");
	const wrsModded = pbsWrs.filter(
		wr => wr.mode === "Defrag" || wr.mode === "Portal" || wr.mode === "Bhop"
	);
	const entries = type === "wrs" ? wrs : type === "wrsModded" ? wrsModded : pbs;
	return NextResponse.json({
		entries: entries as Leaderboard[],
		name: entry.name,
		pbs: pbs.length,
		wrs: wrs.length,
		wrsModded: wrsModded.length
	} as PlayerEntries);
};

type Props = {
	params: Promise<{
		player: string;
	}>;
};
