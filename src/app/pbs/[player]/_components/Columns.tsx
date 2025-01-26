import { Leaderboard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { getDemoURL, getTime } from "@/utils";

export const pbsColumns = (type?: string): ColumnDef<Leaderboard>[] => [
	{
		id: "type",
		size: 70,
		cell: () =>
			type && (
				<>
					{type === "wrs" && (
						<Image
							src="/images/trophy_gold.png"
							alt="Trophy"
							width={60}
							height={60}
							priority
						/>
					)}
					{type === "wrsModded" && (
						<Image
							src="/images/trophy_silver.png"
							alt="Trophy"
							width={60}
							height={60}
							priority
						/>
					)}
				</>
			)
	},
	{
		header: "Map",
		accessorKey: "map",
		cell: ({ row }) => (
			<Link className="link link-hover" href={`/leaderboards/${row.original.map}`}>
				{row.original.map}
			</Link>
		)
	},
	{
		header: "Mode",
		accessorKey: "mode",
		size: 150
	},
	{
		header: "Way",
		accessorKey: "way",
		size: 150
	},
	{
		header: "Time",
		accessorKey: "time",
		size: 150,
		cell: ({ row }) => (
			<div className="grid grid-cols-2 items-center gap-4">
				<span className="tracking-wider">{getTime(row.original.time)}</span>
				{(type === "wrs" || type === "wrsModded") && (
					<Link
						className="btn btn-md btn-circle btn-ghost"
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
