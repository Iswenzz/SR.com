import { NextResponse } from "next/server";

import { getMaps } from "@/libs/leaderboards";

export const GET = async () => {
	return NextResponse.json(await getMaps());
};
