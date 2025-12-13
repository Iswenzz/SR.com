import { NextResponse } from "next/server";

import { getPBs } from "@/libs/players";

export const GET = async () => {
	return NextResponse.json(await getPBs());
};
