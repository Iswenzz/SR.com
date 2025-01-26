import { FC, use } from "react";

import Data from "./_components/Data";
import { getLeaderboard, getMaps } from "./_actions/main";

const Leaderboards: FC<Props> = ({ params, searchParams }) => {
	const { map } = use(params);
	const { mode, way } = use(searchParams);

	const maps = use(getMaps());
	const entries = use(getLeaderboard(map, mode, way));

	return (
		<main className="relative h-screen flex flex-col items-center p-8 pt-24">
			<div className="absolute size-1/2 rounded-full top-20 right-0 blur-[100px] bg-[conic-gradient(from_2.5rad,#5C16C6,#9E12CA)]" />
			<div className="container mx-auto max-w-7xl w-full z-10">
				<Data map={map} maps={maps} entries={entries} />
			</div>
		</main>
	);
};

type Props = {
	params: Promise<{ map: string }>;
	searchParams: Promise<{ mode: string; way: string }>;
};

export default Leaderboards;
