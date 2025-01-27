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
		<section className="flex flex-col space-y-8 w-full">
			<div className="grid grid-cols-3 bg-base-300/40 backdrop-blur-2xl rounded-box p-4 gap-4">
				<div className="col-span-3 lg:col-span-1">
					<Search maps={maps} map={map} />
				</div>
				<div className="col-span-3 lg:col-span-1">
					<Select
						name="mode"
						options={modes}
						defaultValue={mode}
						onClickOption={mode =>
							router.push(`/leaderboards/${map}?mode=${mode}&way=${way}`)
						}
						form={form}
					/>
				</div>
				<div className="col-span-3 lg:col-span-1">
					<Select
						name="way"
						options={ways}
						defaultValue={way}
						onClickOption={way =>
							router.push(`/leaderboards/${map}?mode=${mode}&way=${way}`)
						}
						form={form}
					/>
				</div>
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
