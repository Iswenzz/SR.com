import "server-only";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { PrismaClient } from "@/generated/prisma/client";

declare global {
	var prisma: PrismaClient;
	var prismaAdapter: PrismaMariaDb;
}

let prisma: PrismaClient;
let prismaAdapter: PrismaMariaDb;

const connectPrisma = async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error("⚠️ DATABASE_URL missing from .env");
	}
	if (prisma || global.prisma) {
		return prisma || global.prisma;
	}
	try {
		console.log("✅ Initializing Prisma");
		const url = new URL(process.env.DATABASE_URL);
		prismaAdapter = new PrismaMariaDb({
			host: url.hostname,
			port: Number(url.port),
			user: decodeURIComponent(url.username),
			password: decodeURIComponent(url.password),
			database: url.pathname.slice(1),
			connectionLimit: 20
		});
		prisma = new PrismaClient({ adapter: prismaAdapter });
		if (process.env.NODE_ENV === "development") {
			global.prisma = prisma;
			global.prismaAdapter = prismaAdapter;
		}
	} catch (e) {
		console.error(e);
		throw e;
	}
	return prisma;
};

export default connectPrisma;
