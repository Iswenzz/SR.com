import { NextResponse } from "next/server";

import { getRecentWorldRecords } from "@/libs/leaderboards";

export const GET = async () => {
	return NextResponse.json(await getRecentWorldRecords());
};
