import "server-only";

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

declare global {
	var prisma: PrismaClient;
	var prismaAdapter: PrismaMariaDb;
}

let prisma: PrismaClient;
let prismaAdapter: PrismaMariaDb;

const connectPrisma = async () => {
	if (!process.env.DATABASE_HOST) {
		throw new Error("⚠️ DATABASE_HOST missing from .env");
	}
	if (prisma || global.prisma) {
		return prisma || global.prisma;
	}
	try {
		console.log("✅ Initializing Prisma");
		prismaAdapter = new PrismaMariaDb({
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT as string),
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_DB,
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
