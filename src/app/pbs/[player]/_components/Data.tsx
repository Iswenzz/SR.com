"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaderboard } from "@prisma/client";

import { Table } from "@/components";

import { pbsColumns } from "./Columns";
import Search from "../../_components/Search";

const Data: FC<Props> = ({ type, name, player, players, entries, wrs, wrsModded }) => (
	<section className="flex flex-auto flex-col space-y-8">
		<div className="flex items-center bg-base-300/40 backdrop-blur-2xl rounded-box px-8 py-4 gap-12">
			<Link className="btn btn-md btn-ghost" href={`/pbs/${player}`}>
				<h1 className="text-xl font-bold tracking-wider">{name}</h1>
			</Link>
			<div className="flex items-center gap-2 tooltip tooltip-bottom" data-tip="World Record">
				<Link className="btn btn-md btn-ghost" href={`/pbs/${player}?type=wrs`}>
					<Image
						src="/images/trophy_gold.png"
						alt="World Record"
						width={40}
						height={40}
						priority
					/>
					<span className="font-bold">{wrs}</span>
				</Link>
			</div>
			<div
				className="flex items-center gap-2 tooltip tooltip-bottom"
				data-tip="World Record Modded"
			>
				<Link className="btn btn-md btn-ghost" href={`/pbs/${player}?type=wrsModded`}>
					<Image
						src="/images/trophy_silver.png"
						alt="World Record Modded"
						width={40}
						height={40}
						priority
					/>
					<span className="font-bold">{wrsModded}</span>
				</Link>
			</div>
			<Search className="w-full" player={player} players={players} />
		</div>
		<Table className="max-h-[75vh]" data={entries} columns={pbsColumns(type)} />
	</section>
);

type Props = {
	type?: string;
	name?: string;
	player: string;
	players: string[];
	entries: Leaderboard[];
	wrs: number;
	wrsModded: number;
};

export default Data;
