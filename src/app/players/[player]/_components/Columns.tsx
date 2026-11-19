import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";

import { PlayerEntry } from "@/schemas";
import { getDate, getTime } from "@/utils";
import { Demo } from "@/components";

export const pbsColumns = (type: string): ColumnDef<PlayerEntry>[] => [
	{
		id: "type",
		size: 70,
		cell: ({ row }) =>
			(type === "wrs" || type === "epics") && (
				<Image
					src={
						row.original.epic ? "/images/trophy_diamond.png" : "/images/trophy_gold.png"
					}
					alt={row.original.epic ? "Epic World Record" : "World Record"}
					width={60}
					height={60}
					priority
				/>
			)
	},
	{
		header: "Map",
		accessorKey: "map",
		cell: ({ row }) => (
			<Link
				className="link link-hover"
				href={`/leaderboards/${row.original.map}?mode=${row.original.mode}&way=${row.original.way}`}
			>
				{row.original.map}
			</Link>
		)
	},
	{
		header: "Mode",
		accessorKey: "mode",
		size: 100
	},
	{
		header: "Way",
		accessorKey: "way",
		size: 120,
		meta: { className: "hidden sm:table-cell" }
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
				{(type === "wrs" || type === "epics") && <Demo entry={row.original} />}
			</div>
		)
	}
];
