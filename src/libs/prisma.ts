/* eslint-disable no-var */
import "server-only";

import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient;
}

let prisma: PrismaClient;

const connectPrisma = async () => {
	if (!process.env.PRISMA_URL) {
		throw new Error("⚠️ PRISMA_URL missing from .env");
	}
	if (prisma || global.prisma) {
		return prisma || global.prisma;
	}
	try {
		console.log("✅ Initializing Prisma");
		prisma = new PrismaClient();
		if (process.env.NODE_ENV === "development") {
			global.prisma = prisma;
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
	return prisma;
};

export default connectPrisma;
