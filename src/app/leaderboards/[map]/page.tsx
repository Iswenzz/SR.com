import { notFound } from "next/navigation";

import { getLeaderboard, getMaps, getModes, getWays } from "@/libs/leaderboards";
import { getSEO } from "@/libs/seo";

import Data from "./_components/Data";

export const revalidate = 3600;

export const generateMetadata = async ({ params }: Props) => {
	const { map } = await params;
	return getSEO({
		url: `/leaderboards/${map}`,
		title: `SR Speedrun - ${map}`,
		description: `World records and fastest times on ${map} for every movement mode and way.`
	});
};

const Leaderboards = async ({ params, searchParams }: Props) => {
	const { map = "mp_dr_lolz" } = await params;
	const { mode = "190", way = "normal_0" } = await searchParams;

	const [maps, entries, modes, ways] = await Promise.all([
		getMaps(),
		getLeaderboard(map, mode, way),
		getModes(map),
		getWays(map)
	]);
	// An empty list means the database is unreachable, which should not look like a missing map.
	if (maps.length && !maps.includes(map)) notFound();

	return (
		<section className="relative w-full min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-20">
			<Data
				map={map}
				maps={maps}
				entries={entries}
				mode={mode}
				modes={modes}
				way={way}
				ways={ways}
			/>
		</section>
	);
};

type Props = {
	params: Promise<{ map: string }>;
	searchParams: Promise<{ mode?: string; way?: string }>;
};

export default Leaderboards;
