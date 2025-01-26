"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Leaderboard } from "@prisma/client";
import { z } from "zod";

import { Select, Table } from "@/components";
import { useForm } from "@/hooks";

import { leaderboardColumns } from "./Columns";
import Search from "../../_components/Search";

const schema = z.object({
	mode: z.string(),
	way: z.string()
});

const Data: FC<Props> = ({ map, maps, entries, mode, modes, way, ways }) => {
	const router = useRouter();
	const form = useForm(schema);

	return (
		<section className="flex flex-auto flex-col space-y-8">
			<div className="flex items-center justify-stretch bg-base-300/40 backdrop-blur-2xl rounded-box px-8 py-4 gap-4">
				<Search className="w-full" maps={maps} map={map} />
				<Select
					className="w-full"
					name="mode"
					options={modes}
					defaultValue={mode}
					onClickOption={mode =>
						router.push(`/leaderboards/${map}?mode=${mode}&way=${way}`)
					}
					form={form}
				/>
				<Select
					className="w-full"
					name="way"
					options={ways}
					defaultValue={way}
					onClickOption={way =>
						router.push(`/leaderboards/${map}?mode=${mode}&way=${way}`)
					}
					form={form}
				/>
			</div>
			<Table className="max-h-[75vh]" data={entries} columns={leaderboardColumns} />
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
