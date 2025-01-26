import Link from "next/link";
import Image from "next/image";
import { Leaderboard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { getTime } from "@/utils";

const icons = ["/images/trophy_gold.png", "/images/trophy_silver.png", "/images/trophy_bronze.png"];

export const leaderboardColumns: ColumnDef<Leaderboard>[] = [
	{
		id: "placement",
		size: 70,
		cell: ({ row }) =>
			row.index <= 2 ? (
				<Image src={icons[row.index]} alt="Trophy" width={60} height={60} priority />
			) : (
				<span className="flex items-center justify-center font-bold">{row.index + 1}</span>
			)
	},
	{
		header: "Name",
		accessorKey: "name",
		cell: ({ row }) => (
			<Link className="link link-hover" href={`/pbs/${row.original.player}`}>
				{row.original.name}
			</Link>
		)
	},
	{
		header: "Time",
		accessorKey: "time",
		size: 150,
		cell: ({ row }) => <span className="tracking-wider">{getTime(row.original.time)}</span>
	}
];
