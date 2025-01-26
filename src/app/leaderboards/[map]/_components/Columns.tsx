import Link from "next/link";
import { Leaderboard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { getTime } from "@/utils";

export const leaderboardColumns: ColumnDef<Leaderboard>[] = [
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
		cell: ({ row }) => <span>{getTime(row.original.time)}</span>
	}
];
