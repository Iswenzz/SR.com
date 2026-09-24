"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";

import { sanitize } from "@/utils";

export const topPlayersColumns: ColumnDef<TopPlayer>[] = [
	{
		accessorKey: "rank",
		header: "#",
		size: 60,
		cell: ({ row }) => <span className="font-bold text-white/50">{row.original.rank}</span>
	},
	{
		accessorKey: "name",
		header: "Player",
		enableSorting: false,
		cell: ({ row }) => (
			<Link className="link link-hover font-bold" href={`/players/${row.original.player}`}>
				{sanitize(row.original.name)}
			</Link>
		)
	},
	{
		accessorKey: "wrs",
		size: 200,
		header: () => (
			<div className="tooltip tooltip-bottom normal-case" data-tip="World Record">
				<div className="flex items-center gap-2 text-base">
					<Image
						src="/images/trophy_gold.png"
						alt="World Record"
						width={32}
						height={32}
						priority
					/>
					<span>WR</span>
				</div>
			</div>
		),
		cell: ({ row }) => <span className="inline-block w-8 text-center">{row.original.wrs}</span>
	},
	{
		accessorKey: "wrms",
		size: 240,
		header: () => (
			<div className="tooltip tooltip-bottom normal-case" data-tip="World Record Modded">
				<div className="flex items-center gap-2 text-base">
					<Image
						src="/images/trophy_silver.png"
						alt="World Record Modded"
						width={32}
						height={32}
						priority
					/>
					<span>WRM</span>
				</div>
			</div>
		),
		cell: ({ row }) => <span className="inline-block w-8 text-center">{row.original.wrms}</span>
	}
];

type TopPlayer = {
	rank: number;
	player: string;
	name: string;
	wrs: number;
	wrms: number;
};
