import { getLeaderboard, getMaps, getModes, getWays } from "@/libs/leaderboards";

import Data from "./_components/Data";

export const revalidate = 3600;

const Leaderboards = async ({ params, searchParams }: Props) => {
	const { map = "mp_dr_lolz" } = await params;
	const { mode = "190", way = "normal_0" } = await searchParams;

	const maps = await getMaps();
	const entries = await getLeaderboard(map, mode, way);
	const modes = await getModes(map);
	const ways = await getWays(map);

	return (
		<section className="relative w-full min-h-screen flex flex-col max-w-7xl mx-auto px-8 pt-28 pb-20">
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
	searchParams: Promise<{ mode: string; way: string }>;
};

export default Leaderboards;
