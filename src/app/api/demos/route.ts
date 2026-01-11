import { NextRequest, NextResponse } from "next/server";

import { getDemo } from "@/libs/demos";

export const GET = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams;
	const player = searchParams.get("player") || "player";
	const map = searchParams.get("map") || "map";
	const run = searchParams.get("run") || "run";
	const demo = await getDemo(player, map, run);
	if (!demo) return NextResponse.json({ error: "Demo not found" }, { status: 404 });
	return NextResponse.json(await getDemo(player, map, run));
};
