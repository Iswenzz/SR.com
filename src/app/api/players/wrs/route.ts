import { NextResponse } from "next/server";

import { getTopPlayers } from "@/libs/players";

export const GET = async () => {
	return NextResponse.json(await getTopPlayers());
};
