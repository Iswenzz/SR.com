import { FC, use } from "react";

import Data from "./_components/Data";
import { getLeaderboard, getMaps, getModes, getWays } from "../_actions/main";

export const revalidate = 3600;

const Leaderboards: FC<Props> = ({ params, searchParams }) => {
	const { map = "mp_dr_lolz" } = use(params);
	const { mode = "190", way = "normal_0" } = use(searchParams);

	const maps = use(getMaps());
	const modes = use(getModes(map));
	const ways = use(getWays(map));
	const entries = use(getLeaderboard(map, mode, way));

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
