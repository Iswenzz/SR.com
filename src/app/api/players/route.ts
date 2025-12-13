import { NextResponse } from "next/server";

import { getPlayers } from "@/libs/players";

export const GET = async () => {
	return NextResponse.json(await getPlayers());
};
