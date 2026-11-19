"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Timer } from "lucide-react";
import clsx from "clsx";

import { Table } from "@/components";
import { PlayerEntry } from "@/schemas";
import { sanitize } from "@/utils";

import { pbsColumns } from "./Columns";
import Search, { SearchPlayer } from "../../_components/Search";

const Data: FC<Props> = ({ type, name, player, players, entries, pbs, wrs, epics }) => {
	const tab = type === "wrs" || type === "epics" ? type : "pbs";

	return (
		<section className="flex flex-col space-y-8 w-full">
			<div className="grid grid-cols-12 bg-base-300/40 backdrop-blur-2xl rounded-box p-4 gap-4">
				<div className="flex items-center justify-center lg:justify-start col-span-12 lg:col-span-3 min-w-0">
					<h1 className="text-xl font-bold tracking-wider px-4 truncate">
						{sanitize(name)}
					</h1>
				</div>
				<div className="flex flex-wrap items-center justify-center col-span-12 lg:col-span-5 gap-1">
					<div className="flex tooltip tooltip-bottom" data-tip="Personal Bests">
						<Link
							className={clsx("btn btn-md btn-ghost", {
								"btn-active": tab === "pbs"
							})}
							href={`/players/${player}`}
						>
							<Timer size={28} />
							<span className="font-bold">{pbs}</span>
						</Link>
					</div>
					<div className="flex tooltip tooltip-bottom" data-tip="World Record">
						<Link
							className={clsx("btn btn-md btn-ghost", {
								"btn-active": tab === "wrs"
							})}
							href={`/players/${player}?type=wrs`}
						>
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
					<div className="flex tooltip tooltip-bottom" data-tip="Epic World Record">
						<Link
							className={clsx("btn btn-md btn-ghost", {
								"btn-active": tab === "epics"
							})}
							href={`/players/${player}?type=epics`}
						>
							<Image
								src="/images/trophy_diamond.png"
								alt="Epic World Record"
								width={40}
								height={40}
								priority
							/>
							<span className="font-bold">{epics}</span>
						</Link>
					</div>
				</div>
				<div className="flex items-center justify-center col-span-12 lg:col-span-4">
					<Search player={player} players={players} />
				</div>
			</div>
			<Table
				className="max-h-[75vh]"
				data={entries}
				columns={pbsColumns(tab)}
				search={entry => entry.map}
			/>
		</section>
	);
};

type Props = {
	type?: string;
	name?: string;
	player: string;
	players: SearchPlayer[];
	entries: PlayerEntry[];
	pbs: number;
	wrs: number;
	epics: number;
};

export default Data;
