import { PB } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { getTime } from "@/utils";

export const pbsColumns: ColumnDef<PB>[] = [
	{
		header: "Map",
		accessorKey: "map"
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
		cell: ({ row }) => <span className="tracking-wider">{getTime(row.original.time)}</span>
	}
];
