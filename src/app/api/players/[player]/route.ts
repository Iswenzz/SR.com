import { NextRequest, NextResponse } from "next/server";

import { getEntries } from "@/libs/players";

export const GET = async (request: NextRequest, { params }: Props) => {
	const { player } = await params;
	const searchParams = request.nextUrl.searchParams;
	const type = searchParams.get("type") || "pbs";
	return NextResponse.json(await getEntries(type, player));
};

type Props = {
	params: Promise<{
		player: string;
	}>;
};
