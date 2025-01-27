"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaderboard } from "@prisma/client";

import { Table } from "@/components";

import { pbsColumns } from "./Columns";
import Search from "../../_components/Search";

const Data: FC<Props> = ({ type, name, player, players, entries, wrs, wrsModded }) => (
	<section className="flex flex-col space-y-8 w-full">
		<div className="grid grid-cols-12 bg-base-300/40 backdrop-blur-2xl rounded-box p-4 gap-4">
			<div className="col-span-12 lg:col-span-2">
				<Link className="btn btn-md btn-ghost" href={`/pbs/${player}`}>
					<h1 className="text-xl font-bold tracking-wider">{name}</h1>
				</Link>
			</div>
			<div className="flex items-center justify-center col-span-12 lg:col-span-2 gap-2">
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
			<div className="col-span-12 lg:col-span-8">
				<Search player={player} players={players} />
			</div>
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
