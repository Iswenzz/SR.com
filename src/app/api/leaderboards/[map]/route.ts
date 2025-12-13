import { getLeaderboard } from "@/libs/leaderboards";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: Props) => {
	const { map = "mp_dr_lolz" } = await params;
	const searchParams = request.nextUrl.searchParams;
	const mode = searchParams.get("mode") || "190";
	const way = searchParams.get("way") || "normal_0";
	return NextResponse.json(await getLeaderboard(map, mode, way));
};

type Props = {
	params: Promise<{
		map: string;
	}>;
};
