"use client";

import { FC, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Leaderboard } from "@/generated/prisma/client";
import { Select, Table } from "@/components";

import { leaderboardColumns, RankedEntry } from "./Columns";
import Search from "../../_components/Search";

const Data: FC<Props> = ({ map, maps, entries, mode, modes, way, ways }) => {
	const router = useRouter();

	// Entries arrive sorted by time; equal times share a rank.
	const ranked = useMemo(
		() =>
			entries.reduce<RankedEntry[]>((acc, entry, i) => {
				const previous = acc[i - 1];
				const rank = previous?.time === entry.time ? previous.rank : i + 1;
				acc.push({ ...entry, rank });
				return acc;
			}, []),
		[entries]
	);

	const navigate = (mode: string, way: string) =>
		router.push(`/leaderboards/${map}?${new URLSearchParams({ mode, way })}`);

	return (
		<section className="flex flex-col space-y-8 w-full">
			<div className="grid grid-cols-3 bg-base-300/40 backdrop-blur-2xl rounded-box p-4 gap-4">
				<div className="col-span-3 lg:col-span-1">
					<Search maps={maps} map={map} />
				</div>
				<div className="col-span-3 lg:col-span-1">
					<Select
						name="mode"
						options={modes}
						value={mode}
						onChange={mode => navigate(`${mode}`, way)}
					/>
				</div>
				<div className="col-span-3 lg:col-span-1">
					<Select
						name="way"
						options={ways}
						value={way}
						onChange={way => navigate(mode, `${way}`)}
					/>
				</div>
			</div>
			<Table
				className="max-h-[75vh]"
				data={ranked}
				columns={leaderboardColumns}
				search={entry => entry.name}
			/>
		</section>
	);
};

type Props = {
	map: string;
	maps: string[];
	entries: Leaderboard[];
	mode: string;
	modes: string[];
	way: string;
	ways: string[];
};

export default Data;
