"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaderboard, Player } from "@prisma/client";

import { Table } from "@/components";

import { pbsColumns } from "./Columns";
import Search from "../../_components/Search";

const Data: FC<Props> = ({ type, name, player, players, entries, wrs, wrms }) => (
	<section className="flex flex-col space-y-8 w-full">
		<div className="grid grid-cols-12 bg-base-300/40 backdrop-blur-2xl rounded-box p-4 gap-4">
			<div className="flex items-center justify-start col-span-12 lg:col-span-2">
				<Link className="btn btn-md btn-ghost" href={`/players/${player}`}>
					<h1 className="text-xl font-bold tracking-wider">{name}</h1>
				</Link>
			</div>
			<div className="flex items-center justify-center col-span-12 lg:col-span-2 gap-2">
				<div className="flex tooltip tooltip-bottom" data-tip="World Record">
					<Link className="btn btn-md btn-ghost" href={`/players/${player}?type=wrs`}>
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
				<div className="flex tooltip tooltip-bottom" data-tip="World Record Modded">
					<Link className="btn btn-md btn-ghost" href={`/players/${player}?type=wrms`}>
						<Image
							src="/images/trophy_silver.png"
							alt="World Record Modded"
							width={40}
							height={40}
							priority
						/>
						<span className="font-bold">{wrms}</span>
					</Link>
				</div>
			</div>
			<div className="flex item-center justify-center col-span-12 lg:col-span-8">
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
	players: Player[];
	entries: Leaderboard[];
	wrs: number;
	wrms: number;
};

export default Data;
