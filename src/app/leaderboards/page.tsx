import { use } from "react";

import Search from "./_components/Search";
import { getMaps } from "./_actions/main";

export const revalidate = 3600;

const Leaderboards = () => {
	const maps = use(getMaps());

	return (
		<section className="mx-auto max-w-lg flex flex-col flex-auto items-center justify-center space-y-4 -mt-32">
			<h1 className="text-6xl font-bold tracking-widest gap-2 text-center">
				{maps.length} MAPS
			</h1>
			<Search maps={maps} />
		</section>
	);
};

export default Leaderboards;
