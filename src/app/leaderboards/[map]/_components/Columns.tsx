import Link from "next/link";
import Image from "next/image";
import { Leaderboard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { getDemoURL, getTime } from "@/utils";

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
			<Link className="link link-hover" href={`/players/${row.original.player}`}>
				{row.original.name}
			</Link>
		)
	},
	{
		header: "Time",
		accessorKey: "time",
		size: 150,
		cell: ({ row }) => (
			<div className="grid grid-cols-2 items-center">
				<span className="tracking-wider">{getTime(row.original.time)}</span>
				{row.index === 0 && (
					<Link
						className="btn btn-md btn-circle btn-ghost mx-4"
						href={getDemoURL(row.original)}
						target="_blank"
					>
						<Download className="text-[#2baeff]" />
					</Link>
				)}
			</div>
		)
	}
];
