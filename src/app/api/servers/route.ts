import { NextResponse } from "next/server";

import { getServers } from "@/libs/servers";

export const GET = async () => {
	return NextResponse.json(await getServers());
};
