"use client";

import { FC } from "react";
import { Leaderboard } from "@prisma/client";

import { Table } from "@/components";
import { leaderboardColumns } from "./Columns";

const Data: FC<Props> = ({ map = "mp_dr_lolz", entries = [] }) => {
	return (
		<section className="flex flex-col space-y-8">
			<div className="flex items-center bg-base-300/40 backdrop-blur-2xl rounded-box px-8 py-4">
				<h1 className="text-xl font-bold tracking-widest uppercase">{map}</h1>
			</div>
			<Table className="max-h-[75vh]" data={entries} columns={leaderboardColumns} />
		</section>
	);
};

type Props = {
	map: string;
	maps: string[];
	entries: Leaderboard[];
};

export default Data;
