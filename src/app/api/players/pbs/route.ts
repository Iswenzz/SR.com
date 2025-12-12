import { NextResponse } from "next/server";

import connectPrisma from "@/libs/prisma";

export const GET = async () => {
	const prisma = await connectPrisma();
	const count = await prisma.pB.count();
	return NextResponse.json(count);
};
