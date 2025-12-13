import { NextRequest, NextResponse } from "next/server";

import { getModes } from "@/libs/leaderboards";

export const GET = async (request: NextRequest, { params }: Props) => {
	const { map = "mp_dr_lolz" } = await params;
	return NextResponse.json(await getModes(map));
};

type Props = {
	params: Promise<{ map: string }>;
};
