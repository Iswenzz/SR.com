import { Leaderboard } from "@prisma/client";

import { fetchJson } from "@/libs/api";

import Data from "./_components/Data";

export const revalidate = 3600;

const Leaderboards = async ({ params, searchParams }: Props) => {
	const { map = "mp_dr_lolz" } = await params;
	const { mode = "190", way = "normal_0" } = await searchParams;

	const maps = await fetchJson<string[]>(`/api/leaderboards`, revalidate);
	const entries = await fetchJson<Leaderboard[]>(
		`/api/leaderboards/${map}?mode=${mode}&way=${way}`,
		revalidate
	);
	const modes = await fetchJson<string[]>(
		`/api/leaderboards/${map}/modes?map=${map}`,
		revalidate
	);
	const ways = await fetchJson<string[]>(`/api/leaderboards/${map}/ways?map=${map}`, revalidate);

	return (
		<Data
			map={map}
			maps={maps}
			entries={entries}
			mode={mode}
			modes={modes}
			way={way}
			ways={ways}
		/>
	);
};

type Props = {
	params: Promise<{ map: string }>;
	searchParams: Promise<{ mode: string; way: string }>;
};

export default Leaderboards;
