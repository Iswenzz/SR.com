import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { Leaderboard } from "@/generated/prisma/client";
import { getDate, getTime, sanitize } from "@/utils";
import { Demo } from "@/components";

const icons = ["/images/trophy_gold.png", "/images/trophy_silver.png", "/images/trophy_bronze.png"];

export type RankedEntry = Leaderboard & { rank: number };

export const leaderboardColumns: ColumnDef<RankedEntry>[] = [
	{
		id: "placement",
		accessorKey: "rank",
		size: 70,
		cell: ({ row }) =>
			row.original.rank <= 3 ? (
				<Image
					src={icons[row.original.rank - 1]}
					alt={`Rank ${row.original.rank}`}
					width={60}
					height={60}
					priority
				/>
			) : (
				<span className="flex items-center justify-center font-bold">
					{row.original.rank}
				</span>
			)
	},
	{
		header: "Name",
		accessorKey: "name",
		cell: ({ row }) => (
			<Link className="link link-hover" href={`/players/${row.original.player}`}>
				{sanitize(row.original.name)}
			</Link>
		)
	},
	{
		header: "Date",
		accessorKey: "date",
		size: 120,
		meta: { className: "hidden md:table-cell" },
		cell: ({ row }) => <span className="text-white/50">{getDate(row.original.date)}</span>
	},
	{
		header: "Time",
		accessorKey: "time",
		size: 160,
		cell: ({ row }) => (
			<div className="grid grid-cols-2 items-center">
				<span className="tracking-wider">{getTime(row.original.time)}</span>
				{row.original.rank === 1 && <Demo entry={row.original} />}
			</div>
		)
	}
];
