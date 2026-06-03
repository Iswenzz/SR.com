import { NextResponse } from "next/server";

import { getPBCount } from "@/libs/players";

export const GET = async () => {
	return NextResponse.json(await getPBCount());
};
